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
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Matches your frontend URL exactly
  credentials: true, // This MUST be true to allow cookies
}));
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
        INSERT INTO users (firstname, lastname, username, email, google_id, auth_providers, is_verified, id_verified) 
        VALUES ($1, $2, $3, $4, $5, ARRAY['google']::VARCHAR[], TRUE, FALSE) 
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
    const appToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // ==========================================
    // NEW: SECURE AUTHENTICATION (Set HttpOnly Cookie)
    // ==========================================
    res.cookie('token', appToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    
    // 5. Return success without the token in the JSON payload
    res.status(200).json({ 
      message: 'Authentication successful', 
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

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
      let newUser; // Variable to hold the newly created user data

      // 5. Atomic Transaction (CRITICAL FIX: Use dedicated client)
      const client = await pool.connect(); // Get a single, dedicated connection
      try {
        await client.query('BEGIN'); // Start transaction on this specific client
        
        // FIX: Added 'RETURNING id, username, email' to instantly grab the new user's info
        const insertResult = await client.query(
          'INSERT INTO users (firstname, lastname, username, email, password, auth_providers, is_verified, id_verified) VALUES ($1, $2, $3, $4, $5, ARRAY[\'local\']::VARCHAR[], TRUE, FALSE) RETURNING id, firstname, lastname, username, email',
          [p.firstname, p.lastname, p.username, p.email, p.hashed_password]
        );
        newUser = insertResult.rows[0];

        await client.query('DELETE FROM pending_registrations WHERE email = $1', [email]);
        await client.query('DELETE FROM otps WHERE email = $1', [email]);
        await client.query('COMMIT'); // Commit on this specific client
      } catch (txError) {
        await client.query('ROLLBACK'); // Rollback on this specific client if it fails
        throw txError; // Throw to the outer catch block to handle the response
      } finally {
        client.release(); // ALWAYS release the client back to the pool!
      }

      try {
        await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
          to: newUser.email,
          subject: 'Welcome to Pulse-Event! 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h1 style="color: #6d28d9; text-align: center;">Welcome to Pulse-Event!</h1>
              <p>Hi ${newUser.firstname},</p>
              <p>Your account has been successfully verified and created. We are thrilled to have you on board!</p>
              
              <h3 style="color: #444; margin-top: 30px;">At Pulse Event, you can;</h3>
              <ul style="line-height: 1.6; padding-left: 20px;">
                <li> Create & manage events. </li>
                <li> Sell tickets </li>
                <li> Buy tickets </li>
                <li> Open donations </li>
                <li> Make donations </li>
                <li> And withdraw the money to your local bank account. </li>
              </ul>
              
              <p style="margin-top: 30px;">If you ever have any questions, just reply to this email.</p>
              <p>See you inside,<br><strong style="color: #444;">The Pulse-Event Team</strong></p>
            </div>
          `
        });
      } catch (emailError) {
        // We catch this so that if the email fails, it DOES NOT stop the user from logging in.
        console.error('Welcome email failed to send:', emailError);
      }
      
      // ==========================================
      // NEW: INSTANT LOGIN AFTER VERIFICATION
      // ==========================================
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      });

      return res.status(200).json({ 
        message: 'Account created successfully!',
        user: newUser // Pass the user back to the frontend state
      });
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
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
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
      }); 
      
      return res.status(200).json({ message: 'OTP sent to your email.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup.' });
    console.error('DATABASE ERROR:', err.stack);
  }
});

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

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
    }

    // Generate standard auth token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ==========================================
    // FIXED: Adjusted Cookie configuration
    // ==========================================
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
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

// A simple profile verification endpoint
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    // req.user was attached by your requireAuth middleware after verifying the JWT
    const userResult = await pool.query(
      'SELECT id, firstname, username, email FROM users WHERE id = $1', 
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User no longer exists.' });
    }

    res.status(200).json({ user: userResult.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/logout', (req, res) => {
  // Clearing the cookie with the same options used during creation
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// // Import your auth context hook
// // import { useAuth } from '../context/AuthContext'; 

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   // const { setUser } = useAuth(); 

//   const handleLogout = async () => {
//     try {
//       // 1. Tell backend to clear the HttpOnly cookie
//       await axios.post('http://localhost:5000/api/logout', {}, {
//         withCredentials: true // Required to send the cookie for deletion
//       });

//       // 2. Clear local React state
//       // setUser(null); 

//       // 3. Notify user and redirect
//       toast.success('Logged out successfully');
//       navigate('/signin');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       toast.error('Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <button 
//       onClick={handleLogout}
//       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;

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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});