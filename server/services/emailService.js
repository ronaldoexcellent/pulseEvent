const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify configuration on boot
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer Setup Error:", error.message);
  } else {
    console.log("✅ Nodemailer engine is online");
  }
});

module.exports = transporter;