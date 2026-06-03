const bcrypt = require('bcrypt');
const db = require('../config/db');
const transporter = require('../services/emailService');

// 1. SEND OTP
const sendOTP = async (req, res) => {
  const { email, firstname } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

  try {
    await db.query(`
      INSERT INTO temp_registrations (email, otp_hash, expires_at, registration_data)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET 
      otp_hash = $2, expires_at = $3, attempts = 0, registration_data = $4`,
      [email, otpHash, expiresAt, JSON.stringify(req.body)]
    );

    await transporter.sendMail({
      from: `"Stelynk Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="padding:20px; border:1px solid #eee;">
          <h2>Code: <span style="color:#2563eb">${otp}</span></h2>
          <p>This code expires in 10 minutes. Do not share it.</p>
        </div>`
    });

    res.status(200).send('OTP Sent');
  } catch (err) {
    console.error('Error during OTP Generation:', err);
    res.status(500).send('Server Error');
  }
};

// 2. VERIFY OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await db.query("SELECT * FROM temp_registrations WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user || new Date() > user.expires_at) {
      return res.status(400).json({ error: "Expired/Invalid OTP" });
    }
    if (user.attempts >= 3) {
      return res.status(429).json({ error: "Account locked. Resend OTP." });
    }

    const match = await bcrypt.compare(otp, user.otp_hash);
    if (!match) {
      await db.query("UPDATE temp_registrations SET attempts = attempts + 1 WHERE email = $1", [email]);
      return res.status(400).json({ error: "Wrong OTP" });
    }

    // TODO: Add logic to migrate user.registration_data to your main users table
    await db.query("DELETE FROM temp_registrations WHERE email = $1", [email]);
    
    res.status(200).json({ message: "Verified", data: user.registration_data });
  } catch (err) {
    console.error('Error during OTP verification:', err);
    res.status(500).json({ error: "Verification failed" });
  }
};

// 3. CONTACT FORM EMAIL HANDLER
const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `${name} Via Stelynk Contact Form`,
    text: `New message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    res.status(500).send('Error');
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  handleContactForm
};