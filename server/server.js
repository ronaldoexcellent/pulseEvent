// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());
// const config = require('./config');


// // Set up Nodemailer transporter
// // index.js

// console.log("Config loaded for user:", config.email.user);

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: config.email.user,
//     pass: config.email.pass
//   }
// });

// // // CRITICAL: Add this to find the exact error in your terminal
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error("❌ Nodemailer Setup Error:", error.message);
// //   } else {
// //     console.log("✅ Server is ready to send emails");
// //   }
// // });

// // Endpoint to handle email sending
// app.post('/send-email', async (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Sender must be your verified Gmail address
//     to: process.env.EMAIL_USER,   // Where you want to receive the mail
//     replyTo: email,               // This allows you to reply directly to the user
//     subject: `${name} Via Stelynk Contact Form`,
//     text: `New message from ${name}, via Stelynk contact form (${email}):\n\n${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully");
//     res.status(200).send('Email sent');
//   } catch (error) {
//     console.error("❌ Nodemailer Error:", error);
//     res.status(500).send('Error');
//   }
// });

// // Admin only
// // const supabaseAdmin = require('./config/supabaseAdmin');

// // // Middleware to check if the requester is an admin
// // const isAdmin = async (req, res, next) => {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) return res.status(401).json({ error: 'Unauthorized' });

// //   // Use the standard client (NOT admin) to verify the user's identity
// //   const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  
// //   if (error || !user || user.app_metadata.role !== 'admin') {
// //     return res.status(403).json({ error: 'Forbidden: Admins only' });
// //   }
// //   next();
// // };

// // // Admin-only route: Example deleting a user
// // app.delete('/admin/delete-user/:id', isAdmin, async (req, res) => {
// //   const { id } = req.params;
  
// //   // .auth.admin requires the SERVICE_ROLE_KEY
// //   const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  
// //   if (error) return res.status(400).json(error);
// //   res.json({ message: `User ${id} deleted successfully` });
// // });


// app.listen(5000, () => console.log('Server running on port 5000'));







// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',           // Your default username
//   host: 'localhost',
//   database: 'pulseevent',     // The name we just created
//   password: '636996',  // Your DB password
//   port: 5432,
// });

// module.exports = pool;


// Setup PG Pool connection
// const pool = new Pool({
//   user: 'your_db_user',
//   host: 'localhost',
//   database: 'your_db_name',
//   password: 'your_db_password',
//   port: 5432,
// });


// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const rateLimit = require('express-rate-limit');
// const { Pool } = require('pg');
// const config = require('./config');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool(config.db); // Ensure your config has DB credentials

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: { user: config.email.user, pass: config.email.pass }
// });

// // 🛡️ Security: Limit OTP requests to prevent spam
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 5,
//     message: { error: "Too many attempts. Try again in 15 mins." }
// });

// // 1. SEND OTP
// app.post('/api/send-otp', limiter, async (req, res) => {
//     const { email, firstname } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
//     const otpHash = await bcrypt.hash(otp, 10);
//     const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

//     try {
//         await pool.query(`
//             INSERT INTO temp_registrations (email, otp_hash, expires_at, registration_data)
//             VALUES ($1, $2, $3, $4)
//             ON CONFLICT (email) DO UPDATE SET 
//             otp_hash = $2, expires_at = $3, attempts = 0, registration_data = $4`,
//             [email, otpHash, expiresAt, JSON.stringify(req.body)]
//         );

//         await transporter.sendMail({
//             from: `"Stelynk Security" <${config.email.user}>`,
//             to: email,
//             subject: "Your Verification Code",
//             html: `<div style="padding:20px; border:1px solid #eee;">
//                     <h2>Code: <span style="color:#2563eb">${otp}</span></h2>
//                     <p>This code expires in 10 minutes. Do not share it.</p>
//                    </div>`
//         });
//         res.status(200).send('OTP Sent');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// // 2. VERIFY OTP
// app.post('/api/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;
//     try {
//         const result = await pool.query("SELECT * FROM temp_registrations WHERE email = $1", [email]);
//         const user = result.rows[0];

//         if (!user || new Date() > user.expires_at) return res.status(400).json({ error: "Expired/Invalid OTP" });
//         if (user.attempts >= 3) return res.status(429).json({ error: "Account locked. Resend OTP." });

//         const match = await bcrypt.compare(otp, user.otp_hash);
//         if (!match) {
//             await pool.query("UPDATE temp_registrations SET attempts = attempts + 1 WHERE email = $1", [email]);
//             return res.status(400).json({ error: "Wrong OTP" });
//         }

//         // Logic to move user.registration_data to your MAIN users table goes here
//         await pool.query("DELETE FROM temp_registrations WHERE email = $1", [email]);
//         res.status(200).json({ message: "Verified", data: user.registration_data });
//     } catch (err) {
//         res.status(500).json({ error: "Verification failed" });
//     }
// });

// app.listen(5000, () => console.log('Server running on port 5000'));




const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows Express to read JSON data from React

// DIAGNOSTIC LOG: Put this right before your routes
// pool.query("SELECT current_database(), current_schema();")
//   .then(res => {
//     console.log(`--- DB DIAGNOSTICS ---`);
//     console.log(`Connected to Database: ${res.rows[0].current_database}`);
//     console.log(`Current Schema: ${res.rows[0].current_schema}`);
    
//     // Now let's list all tables in this database
//     return pool.query(`
//       SELECT table_name 
//       FROM information_schema.tables 
//       WHERE table_schema = 'public';
//     `);
//   })
//   .then(res => {
//     const tables = res.rows.map(r => r.table_name);
//     console.log(`Tables found in public schema:`, tables);
//     console.log(`----------------------`);
//   })
//   .catch(err => console.error("Diagnostic failed:", err.message));

// ====================
// SIGNUP ROUTE
// ====================
app.post('/api/signup', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // 1. Check if user already exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2', 
      [email, username]
    );

  if (userCheck.rows.length > 0) {
        // Figure out exactly what was taken to give a helpful error message
        const existingUser = userCheck.rows[0];
        if (existingUser.email === email) {
             res.status(400).json({ message: 'Email already registered.' });
        }
        if (existingUser.username === username) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }
    }

    // 2. Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Insert user into PostgreSQL
    const newUser = await pool.query(
      'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, username, email, password',
      [firstname, lastname, username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!', user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// ====================
// LOGIN ROUTE
// ====================
app.post('/api/login', async (req, res) => {
  try {
    // React will send 'identifier' (which could be the email OR the username)
    const { identifier, password } = req.body;

    // Search for a user where the email matches OR the username matches
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2', 
      [identifier, identifier]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
    }

    const user = userResult.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Username/Email or Password.' });
    }

    res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });

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