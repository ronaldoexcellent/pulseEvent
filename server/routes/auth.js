const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const pool = require('../config/db');
const transporter = require('../services/emailService');
const { requireAuth } = require('../middleware/authMiddleware');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const express = require('express');
const router = express.Router();

// Auth & Token Constants
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/auth/google', async (req, res) => {
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

      try {
        await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Welcome to Pulse-Event! 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <h1 style="color: #6d28d9; text-align: center;">Welcome to Pulse-Event!</h1>
              <p>Hi ${user.firstname},</p>
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
    } else if (!user.auth_providers || !user.auth_providers.includes('google')) {
      const updateQuery = `
        UPDATE users 
        SET google_id = $1,
            is_verified = TRUE
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

    // Check if the error message contains the specific clock mismatch string
    if (error.message && error.message.includes('used too early')) {
      return res.status(401).json({ 
        message: 'Update your time/date' 
      });
    }

    // Fallback for any other type of Google token error
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
        max: 5, 
        standardHeaders: true, 
        legacyHeaders: false, 
  message: { 
    message: 'Too many signup or verification attempts. Please try again in 15 minutes.' 
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  }
});

router.post('/signup', signupLimiter, async (req, res) => {
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

router.post('/login', async (req, res) => {
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
router.get('/me', requireAuth, async (req, res) => {
  try {
    // req.user was attached by your requireAuth middleware after verifying the JWT
    const userResult = await pool.query(
      'SELECT id, firstname, lastname, username, email FROM users WHERE id = $1', 
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

router.post('/logout', (req, res) => {
  // Clearing the cookie with the same options used during creation
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 3, // Only 3 requests per hour to prevent mail spam
  message: { message: 'Too many requests. Please try again later.' }
});

router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
  const { email } = req.body;
  
  try {
    const userResult = await pool.query('SELECT id, email FROM users WHERE email = $1', [email]);
    
    // Always return success even if user not found to prevent user enumeration
    if (userResult.rows.length === 0) {
      return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
    }

    const user = userResult.rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await pool.query(
      'INSERT INTO password_resets (email, token_hash, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET token_hash = $2, expires_at = $3',
      [user.email, resetTokenHash, expiresAt]
    );

    const resetUrl = `${process.env.FRONTEND_URL}/resetpwd?token=${resetToken}&email=${user.email}`;

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Valid for 1 hour.</p>`
    });

    res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Rate limiter for executing the reset to prevent brute-forcing the new password
const executeResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: { message: 'Too many reset attempts. Please try again later.' }
});

router.post('/reset-password', executeResetLimiter, async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // 1. Hash the incoming token
    const inputTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Find the token in the database
    const resetRecord = await pool.query(
      'SELECT * FROM password_resets WHERE email = LOWER($1) AND token_hash = $2',
      [email, inputTokenHash]
    );

    if (resetRecord.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset link.' });
    }

    const resetData = resetRecord.rows[0];

    // 3. Verify expiration
    if (new Date() > new Date(resetData.expires_at)) {
      await pool.query('DELETE FROM password_resets WHERE email = LOWER($1)', [email]);
      return res.status(400).json({ message: 'Reset link has expired. Please request a new one.' });
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Atomic Transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Update the user's password
      const updateResult = await client.query(
        'UPDATE users SET password = $1, auth_providers = ARRAY[\'local\']::VARCHAR[] WHERE email = LOWER($2)',
        [hashedPassword, email]
      );
      
      // CRITICAL: Check if a user was actually found and updated
      if (updateResult.rowCount === 0) {
        throw new Error('User record not found in users table.');
      }
      
      // Destroy the token
      await client.query('DELETE FROM password_resets WHERE email = LOWER($1)', [email]);
      
      await client.query('COMMIT');
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (txError) {
      await client.query('ROLLBACK');
      throw txError;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Password reset error:', err.message);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
});

// Export the router so server.js can require it
module.exports = router;