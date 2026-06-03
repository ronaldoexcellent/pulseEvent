// controllers/donationController.js
const db = require('../config/db');

const recordDonation = async (req, res) => {
  const { donorName, amount, eventId } = req.body;

  try {
    const queryText = `
      INSERT INTO donations (donor_name, amount, event_id, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [donorName, amount, eventId];

    // Execute query safely using parameterized arrays to prevent SQL injection
    const result = await db.query(queryText, values);
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Database error processing donation.' });
  }
};

module.exports = { recordDonation };