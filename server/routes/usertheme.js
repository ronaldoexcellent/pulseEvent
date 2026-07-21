// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Your pg pool connection

// Get user theme preference
router.get('/users/:id/theme', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT theme_preference FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ theme: result.rows[0].theme_preference });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user theme preference
router.put('/users/:id/theme', async (req, res) => {
  try {
    const { id } = req.params;
    const { theme } = req.body; // 'light' or 'dark'
    await pool.query('UPDATE users SET theme_preference = $1 WHERE id = $2', [theme, id]);
    res.json({ success: true, theme });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;