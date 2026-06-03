const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { sendOTP, verifyOTP, handleContactForm } = require('../controllers/authController');

// Anti-spam security throttling
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: "Too many attempts. Try again in 15 mins." }
});

router.post('/send-otp', limiter, sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/send-email', handleContactForm);

module.exports = router;