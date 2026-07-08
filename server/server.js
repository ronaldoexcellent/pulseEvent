require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const pool = require('./config/db');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(cookieParser()); // Required to read cookies in incoming requests

// Auth & Token Constants
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==========================================
// 1. JWT AUTHENTICATION MIDDLEWARE
// ==========================================
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// ==========================================
// 2. GOOGLE AUTHENTICATION ROUTE
// ==========================================
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, name, sub: googleId } = ticket.getPayload();
    const [firstname, ...lastnameParts] = name.split(' ');
    const lastname = lastnameParts.join(' ') || '';
    const generatedUsername = email.split('@')[0] + Math.floor(1000 + Math.random() * 9000);

    // 2. Check if user exists in DB
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = rows[0];

    if (!user) {
      // 3a. New User: Create them as a Google-only account (Automatically Verified)
      const insertQuery = `
        INSERT INTO users (firstname, lastname, username, email, google_id, auth_providers, is_verified) 
        VALUES ($1, $2, $3, $4, $5, ARRAY['google']::VARCHAR[], TRUE) 
        RETURNING *;
      `;
      const newResult = await pool.query(insertQuery, [firstname, lastname, generatedUsername, email, googleId]);
      user = newResult.rows[0];
    } else if (!user.auth_providers || !user.auth_providers.includes('google')) {
      // 3b. Existing User: Link Google account and mark as verified (since Google verifies emails)
      const updateQuery = `
        UPDATE users 
        SET google_id = $1,
            is_verified = TRUE,
            auth_providers = array_append(COALESCE(auth_providers, ARRAY[]::VARCHAR[]), 'google')
        WHERE id = $2
        RETURNING *;
      `;
      const updateResult = await pool.query(updateQuery, [googleId, user.id]);
      user = updateResult.rows[0];
    }

    // 4. Generate your app's standard JWT
    const appToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({ 
      message: 'Authentication successful', 
      token: appToken,
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

// ==========================================
// 3. ACCOUNT LINKING (ADD PASSWORD)
// ==========================================
app.post('/api/auth/set-password', verifyToken, async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;

  try {
    const { rows } = await pool.query('SELECT password, auth_providers FROM users WHERE id = $1', [userId]);
    const user = rows[0];

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.auth_providers && user.auth_providers.includes('local') && user.password) {
      return res.status(400).json({ message: 'Account already has a password.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updateQuery = `
      UPDATE users 
      SET password = $1,
<<<<<<< HEAD
          auth_providers = array_append(COALESCE(auth_providers, ARRAY['google']::VARCHAR[]), 'local')
=======
          auth_providers = array_append(COALESCE(auth_providers, ARRAY[]::VARCHAR[]), 'local')
>>>>>>> cb31904d2f10998f16d05772583d6449cd51f100
      WHERE id = $2;
    `;
    await pool.query(updateQuery, [hashedPassword, userId]);

    res.status(200).json({ message: 'Password added successfully. You can now log in with email/password.' });

  } catch (error) {
    console.error('Set Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Make sure you have 'crypto' required at the top if you want more secure random numbers, 
// or Math.random() works fine for a basic 6-digit OTP.

// ==========================================
// 4. SIGNUP ROUTE (Generates OTP, doesn't save to DB yet)
// ==========================================
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { firstname, lastname, username, email, password } = req.body;

//     // 1. Check if user already exists
//     const userCheck = await pool.query(
//       'SELECT * FROM users WHERE email = $1 OR username = $2', 
//       [email, username]
//     );

//     if (userCheck.rows.length > 0) {
//       const existingUser = userCheck.rows[0];
//       if (existingUser.email === email) return res.status(400).json({ message: 'Email already registered.' });
//       if (existingUser.username === username) return res.status(400).json({ message: 'Username is already taken.' });
//     }

//     // 2. Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // 3. SECURITY UPDATE: Generate cryptographically secure OTP
//     const otp = crypto.randomInt(100000, 1000000).toString();

//     // 4. SECURITY UPDATE: Hash the OTP before saving to DB (Defense in depth)
//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     // 5. SECURITY UPDATE: Remove OTP from JWT payload. 
//     // The JWT now acts ONLY as a secure temporary hold for user details.
//     const pendingUserToken = jwt.sign(
//       { firstname, lastname, username, email, hashedPassword }, 
//       JWT_SECRET, 
//       { expiresIn: '10' } // Buffer time: Token lasts 15m, but OTP expires in 5m
//     );

//     // 6. SECURITY UPDATE: Save hashed OTP to PostgreSQL with a 5-min expiration
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    
//     // Clear any existing OTPs for this email to prevent clutter/spam
//     await pool.query('DELETE FROM otps WHERE email = $1', [email]);
//     await pool.query(
//       'INSERT INTO otps (email, otp_hash, expires_at) VALUES ($1, $2, $3)', 
//       [email, hashedOtp, expiresAt]
//     );

//     // 7. Send the OTP email (Code remains exactly the same)
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Your Verification Code - Pulse-Event',
//       html: `
//         <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
//           <h2>Welcome to Our App, ${firstname}!</h2>
//           <p>Your 6-digit verification code is:</p>
//           <h1 style="font-size: 36px; letter-spacing: 5px; color: #6d28d9; background: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block;">
//             ${otp}
//           </h1>
//           <p style="color: #444; margin-top: 20px;">Or click this link to verify your email: <a href="${process.env.FRONTEND_URL}/verify-email?token=${otp}">Verify Email</a></p>
//           <p style="color: #666; margin-top: 20px;">This code will expire in 5 minutes.</p>
//         </div>
//       `
//     });

//     // 8. Respond to frontend
//     res.status(200).json({ 
//       message: 'OTP sent to your email. Please enter it to complete registration.',
//       pendingToken: pendingUserToken 
//     });

//   } catch (err) {
//     console.error('Signup Error:', err.message);
//     res.status(500).json({ error: 'Server error during signup.' });
//   }
// });

// // ==========================================
// // 5. VERIFY EMAIL ROUTE (Validates OTP & Saves to DB)
// // ==========================================
// app.post('/api/verify-email', async (req, res) => {
//   const { otp, pendingToken } = req.body;

//   if (!otp || !pendingToken) {
//     return res.status(400).json({ message: 'Missing verification code or session token.' });
//   }

//   try {
//     // 1. Verify the token and extract user details
//     const decoded = jwt.verify(pendingToken, JWT_SECRET);

//     // 2. SECURITY UPDATE: Fetch the OTP record from PostgreSQL
//     const otpRecord = await pool.query('SELECT * FROM otps WHERE email = $1', [decoded.email]);

//     if (otpRecord.rows.length === 0) {
//       return res.status(400).json({ message: 'No pending verification found or OTP expired.' });
//     }

//     const dbOtp = otpRecord.rows[0];

//     // 3. SECURITY UPDATE: Enforce strict 5-minute database expiration
//     if (new Date() > new Date(dbOtp.expires_at)) {
//       await pool.query('DELETE FROM otps WHERE email = $1', [decoded.email]);
//       return res.status(400).json({ message: 'Verification code has expired. Please sign up again.' });
//     }

//     // 4. SECURITY UPDATE: Hash the user input and compare it to the database hash
//     const inputHashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
//     if (dbOtp.otp_hash !== inputHashedOtp) {
//       return res.status(400).json({ message: 'Invalid verification code.' });
//     }

//     // 5. Check if the username/email was taken during verification
//     const userCheck = await pool.query(
//       'SELECT * FROM users WHERE email = $1 OR username = $2', 
//       [decoded.email, decoded.username]
//     );

//     if (userCheck.rows.length > 0) {
//       // Clean up OTP even on failure
//       await pool.query('DELETE FROM otps WHERE email = $1', [decoded.email]);
//       return res.status(400).json({ message: 'This email or username was taken during verification. Please sign up again.' });
//     }

//     // 6. Insert user into the database
//     const newUser = await pool.query(
//       `INSERT INTO users (firstname, lastname, username, email, password, auth_providers, is_verified) 
//        VALUES ($1, $2, $3, $4, $5, ARRAY['local']::VARCHAR[], TRUE) 
//        RETURNING id, firstname, lastname, username, email`, 
//        [decoded.firstname, decoded.lastname, decoded.username, decoded.email, decoded.hashedPassword]
//     );

//     // 7. SECURITY UPDATE: Delete the used OTP so it cannot be reused (Replay Attack Prevention)
//     await pool.query('DELETE FROM otps WHERE email = $1', [decoded.email]);

//     res.status(201).json({ 
//       message: 'Account verified and created successfully! You can now log in.' 
//     });

//   } catch (error) {
//     console.error('Verification Error:', error);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(400).json({ message: 'Your session has timed out. Please sign up again.' });
//     }
//     res.status(400).json({ message: 'Invalid verification session.' });
//   }
// });

// ==========================================
// UNIFIED SIGNUP & VERIFY ROUTE
// ==========================================
app.post('/api/signup', async (req, res) => {
  const { firstname, lastname, username, email, password, otp } = req.body;

  try {
    // ==========================================
    // STEP 2: VERIFICATION PHASE
    // ==========================================
    if (otp) {
      // 1. Fetch OTP record
      const otpRecord = await pool.query('SELECT * FROM otps WHERE email = $1', [email]);
      if (otpRecord.rows.length === 0) {
        return res.status(400).json({ message: 'Session expired or not found.' });
      }

      const otpData = otpRecord.rows[0];

      // 2. Check Expiration (CRITICAL FIX)
      if (new Date() > new Date(otpData.expires_at)) {
        // Optional: Clean up the expired OTP
        await pool.query('DELETE FROM otps WHERE email = $1', [email]);
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
      }

      // 3. Validate OTP
      const inputHashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
      if (otpData.otp_hash !== inputHashedOtp) {
        return res.status(400).json({ message: 'Invalid code.' });
      }

      // 4. Get pending data from DB
      const pendingUser = await pool.query('SELECT * FROM pending_registrations WHERE email = $1', [email]);
      if (pendingUser.rows.length === 0) {
        return res.status(400).json({ message: 'Session data not found.' });
      }

      const p = pendingUser.rows[0];

      // 5. Atomic Transaction (CRITICAL FIX: Use dedicated client)
      const client = await pool.connect(); // Get a single, dedicated connection
      try {
        await client.query('BEGIN'); // Start transaction on this specific client
        
        await client.query(
          'INSERT INTO users (firstname, lastname, username, email, password, auth_providers, is_verified, id_verified) VALUES ($1, $2, $3, $4, $5, "LOCAL", TRUE, FALSE)',
          [p.firstname, p.lastname, p.username, p.email, p.hashed_password]
        );
        await client.query('DELETE FROM pending_registrations WHERE email = $1', [email]);
        await client.query('DELETE FROM otps WHERE email = $1', [email]);
        
        await client.query('COMMIT'); // Commit on this specific client
      } catch (txError) {
        await client.query('ROLLBACK'); // Rollback on this specific client if it fails
        throw txError; // Throw to the outer catch block to handle the response
      } finally {
        client.release(); // ALWAYS release the client back to the pool!
      }

      return res.status(200).json({ message: 'Account created successfully!' });
    } 

    // ==========================================
    // STEP 1: INITIAL SIGNUP PHASE
    // ==========================================
    else {
      // 1. Check if user exists
      const userCheck = await pool.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
      if (userCheck.rows.length > 0) return res.status(400).json({ message: 'User already exists.' });

      // 2. Save to pending_registrations
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO pending_registrations (email, firstname, lastname, username, hashed_password) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET hashed_password = $5',
        [email, firstname, lastname, username, hashedPassword]
      );

      // 3. Generate and store OTP
      const generatedOtp = crypto.randomInt(100000, 1000000).toString();
      const hashedOtp = crypto.createHash('sha256').update(generatedOtp).digest('hex');
      
      await pool.query(
        'INSERT INTO otps (email, otp_hash, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET otp_hash = $2, expires_at = $3',
        [email, hashedOtp, new Date(Date.now() + 10 * 60000)]
      );

      // 4. Send Email... (nodemailer logic here)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code - Pulse-Event',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Welcome to Our App, ${firstname}!</h2>
            <p>Your 6-digit verification code is:</p>
            <h1 style="font-size: 36px; letter-spacing: 5px; color: #6d28d9; background: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block;">
              ${generatedOtp}
            </h1>
            
            <p style="color: #666; margin-top: 20px;">This code will expire in 5 minutes.</p>
          </div>
        `
      }); // <p style="color: #444; margin-top: 20px;">Or click this link to verify your email: <a href="${process.env.FRONTEND_URL}/verify-email?token=${otp}">Verify Email</a></p>
      
      return res.status(200).json({ message: 'OTP sent to your email.' });
    }
  } catch (err) {
    // Removed the global `pool.query('ROLLBACK')` from here. 
    // Transactions are now handled safely in their own localized try/catch blocks.
    res.status(500).json({ message: 'Server error during signup.' });
    console.error('DATABASE ERROR:', err.stack);
  }
});

// ==========================================
// 6. LOGIN ROUTE
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2', 
      [identifier, identifier]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
    }

    const user = userResult.rows[0];

    // Enforce Google-only accounts
    if (user.auth_providers && !user.auth_providers.includes('local')) {
      return res.status(400).json({ message: 'This account was created via Google. Please log in using Google Auth.' });
    }

    // Enforce Email Verification
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify your email address before logging in.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
    }

    // Generate standard auth token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ==========================================
    // NEW: SECURE AUTHENTICATION (Set HttpOnly Cookie)
    // ==========================================
    res.cookie('token', token, {
      httpOnly: true, // Prevents XSS attacks (JS cannot read it)
      secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds (matches token expiry)
    });

    // Remove the token from the JSON payload so the frontend doesn't need to handle it
    res.status(200).json({ 
      message: 'Login successful!', 
      user: { id: user.id, username: user.username, email: user.email } 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ==========================================
// 7. LOGOUT ROUTE
// ==========================================
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// // Middleware to protect routes
// const requireAuth = (req, res, next) => {
//   const token = req.cookies.token; // Automatically sent by the browser

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }

//   try {
//     // Verify the token and extract the payload
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Attach the user ID to the request object for the next function
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//   }
// };

// // Protected Route Example
// app.post('/api/events/create', requireAuth, async (req, res) => {
//   const { eventName, date } = req.body;
  
//   // The ID comes securely from the HttpOnly cookie token, NOT the frontend payload
//   const userId = req.user.id; 

//   try {
//     // Insert into PostgreSQL ensuring the action is bound to this exact user
//     // const result = await pool.query(
//     //   'INSERT INTO pulse_events (user_id, name, date) VALUES ($1, $2, $3) RETURNING *',
//     //   [userId, eventName, date]
//     // );
    
//     res.status(201).json({ message: 'Event created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// const createEvent = async (eventData) => {
//   try {
//     const response = await fetch('https://your-api.com/api/events/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // CRITICAL: This tells the browser to send the HttpOnly cookie
//       credentials: 'include', 
//       body: JSON.stringify(eventData),
//     });

//     if (response.ok) {
//       console.log('Action successfully securely bound to the user account.');
//     }
//   } catch (error) {
//     console.error('Failed to perform action', error);
//   }
// };

// import axios from 'axios';

// // Set this once in your main App setup
// axios.defaults.withCredentials = true;

// // Now, every request automatically sends the HttpOnly cookie
// axios.post('https://your-api.com/api/events/create', eventData);