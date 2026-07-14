const cron = require('node-cron');
const pool = require('../config/db'); // Make sure this path points to your actual database config

// Run silently every night at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    await pool.query('DELETE FROM password_resets WHERE expires_at < NOW()');
  } catch (err) {
    console.error('CRON ERROR: Failed to clean tokens.', err.message);
  }
});