// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const pool = require('./config/db');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // // Google Auth
// // const jwt = require('jsonwebtoken');
// // const { OAuth2Client } = require('google-auth-library');
// // const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// // const JWT_SECRET = process.env.JWT_SECRET;

// // // ==========================================
// // // 2. JWT AUTHENTICATION MIDDLEWARE
// // // ==========================================
// // const verifyToken = (req, res, next) => {
// //   const token = req.header('Authorization')?.split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

// //   try {
// //     const verified = jwt.verify(token, JWT_SECRET);
// //     req.user = verified;
// //     next();
// //   } catch (error) {
// //     res.status(403).json({ message: 'Invalid or expired token.' });
// //   }
// // };


// // // ==========================================
// // // 4. GOOGLE AUTHENTICATION ROUTE
// // // ==========================================

// // app.post('/api/auth/google', async (req, res) => {
// //   const { token } = req.body;

// //   try {
// //     // 1. Verify token with Google
// //     const ticket = await googleClient.verifyIdToken({
// //       idToken: token,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
    
// //     const { email, name, picture, sub: googleId } = ticket.getPayload();

// //     // 2. Check if user exists in DB
// //     const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
// //     let user = rows[0];

// //     if (!user) {
// //       // 3a. New User: Create them as a Google-only account
// //       const insertQuery = `
// //         INSERT INTO users (name, email, google_id, profile_picture, auth_providers) 
// //         VALUES ($1, $2, $3, $4, ARRAY['google']::VARCHAR[]) 
// //         RETURNING *;
// //       `;
// //       const newResult = await pool.query(insertQuery, [name, email, googleId, picture]);
// //       user = newResult.rows[0];
// //     } else if (!user.auth_providers.includes('google')) {
// //       // 3b. Existing User (Local), but logging in with Google for the first time: Link accounts
// //       const updateQuery = `
// //         UPDATE users 
// //         SET google_id = $1, 
// //             auth_providers = array_append(auth_providers, 'google')
// //         WHERE id = $2 
// //         RETURNING *;
// //       `;
// //       const updateResult = await pool.query(updateQuery, [googleId, user.id]);
// //       user = updateResult.rows[0];
// //     }

// //     // 4. Generate your app's standard JWT
// //     const appToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
// //     res.status(200).json({ 
// //       message: 'Authentication successful', 
// //       token: appToken,
// //       user: { id: user.id, name: user.name, email: user.email, picture: user.profile_picture }
// //     });

// //   } catch (error) {
// //     console.error('Google Auth Error:', error);
// //     res.status(401).json({ message: 'Invalid Google token' });
// //   }
// // });

// // // ==========================================
// // // 5. ACCOUNT LINKING (ADD PASSWORD)
// // // ==========================================

// // app.post('/api/auth/set-password', verifyToken, async (req, res) => {
// //   const { newPassword } = req.body;
// //   const userId = req.user.id;

// //   try {
// //     const { rows } = await pool.query('SELECT password_hash, auth_providers FROM users WHERE id = $1', [userId]);
// //     const user = rows[0];

// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     if (user.auth_providers.includes('local') && user.password_hash) {
// //       return res.status(400).json({ message: 'Account already has a password.' });
// //     }

// //     // Hash the password and update the database
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(newPassword, salt);

// //     const updateQuery = `
// //       UPDATE users 
// //       SET password_hash = $1,
// //           auth_providers = array_append(auth_providers, 'local')
// //       WHERE id = $2;
// //     `;
// //     await pool.query(updateQuery, [hashedPassword, userId]);

// //     res.status(200).json({ message: 'Password added successfully. You can now log in with email/password.' });

// //   } catch (error) {
// //     console.error('Set Password Error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });


// // ====================
// // SIGNUP ROUTE
// // ====================
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { firstname, lastname, username, email, password } = req.body;

//     // 1. Check if user already exists
//     const userCheck = await pool.query(
//       'SELECT * FROM users WHERE email = $1 OR username = $2', 
//       [email, username]
//     );

//   if (userCheck.rows.length > 0) {
//         // Figure out exactly what was taken to give a helpful error message
//         const existingUser = userCheck.rows[0];
//         if (existingUser.email === email) {
//              res.status(400).json({ message: 'Email already registered.' });
//         }
//         if (existingUser.username === username) {
//             return res.status(400).json({ message: 'Username is already taken.' });
//         }
//     }

//     // 2. Hash the password securely
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // 3. Insert user into PostgreSQL
//     const newUser = await pool.query(
//       'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, username, email, password',
//       [firstname, lastname, username, email, hashedPassword]
//     );

//     res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error during signup.' });
//   }
// });

// // ====================
// // LOGIN ROUTE
// // ====================
// app.post('/api/login', async (req, res) => {
//   try {
//     // React will send 'identifier' (which could be the email OR the username)
//     const { identifier, password } = req.body;

//     // Search for a user where the email matches OR the username matches
//     const userResult = await pool.query(
//       'SELECT * FROM users WHERE email = $1 OR username = $2', 
//       [identifier, identifier]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
//     }

//     const user = userResult.rows[0];

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
//     }

//     res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Server error during login.' });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const pool = require('./config/db');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

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
          auth_providers = array_append(COALESCE(auth_providers, ARRAY[]::VARCHAR[]), 'local')
      WHERE id = $2;
    `;
    await pool.query(updateQuery, [hashedPassword, userId]);

    res.status(200).json({ message: 'Password added successfully. You can now log in with email/password.' });

  } catch (error) {
    console.error('Set Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==========================================
// 4. SIGNUP ROUTE (REQUIRES EMAIL VERIFICATION)
// ==========================================
app.post('/api/signup', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2', 
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      const existingUser = userCheck.rows[0];
      if (existingUser.email === email) return res.status(400).json({ message: 'Email already registered.' });
      if (existingUser.username === username) return res.status(400).json({ message: 'Username is already taken.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user (Defaults to FALSE for is_verified, tracked as 'local')
    const newUser = await pool.query(
      `INSERT INTO users (firstname, lastname, username, email, password, auth_providers, is_verified) 
       VALUES ($1, $2, $3, $4, $5, ARRAY['local']::VARCHAR[], FALSE) 
       RETURNING id, firstname, lastname, username, email`, 
       [firstname, lastname, username, email, hashedPassword]
    );

    const user = newUser.rows[0];

    // Generate short-lived Verification Token (1 hour)
    const verificationToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your account - Pulse-Event',
      html: `
        <h2>Welcome to Our App, ${firstname}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `
    });

    // Notice we do NOT send the standard login token here!
    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account before logging in.'
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// ==========================================
// 5. VERIFY EMAIL ROUTE
// ==========================================
app.post('/api/verify-email', async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: 'Missing verification token.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const updateQuery = `
      UPDATE users 
      SET is_verified = TRUE 
      WHERE id = $1 AND is_verified = FALSE 
      RETURNING id;
    `;
    const result = await pool.query(updateQuery, [decoded.id]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'User already verified or not found.' });
    }

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });

  } catch (error) {
    console.error('Verification Error:', error);
    res.status(400).json({ message: 'Invalid or expired verification link.' });
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
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      message: 'Login successful!', 
      token,
      user: { id: user.id, username: user.username, email: user.email } 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});