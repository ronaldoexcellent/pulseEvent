const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Assume you have middleware that extracts the user ID from the JWT token
const { authenticateToken } = require('../routes/auth'); 

// POST /api/tickets/scan
router.post('/scan', authenticateToken, async (req, res) => {
    const { ticket_code } = req.body;
    const scannerId = req.user.id; // From your JWT token

    try {
        // 1. Find the ticket and check scanner permissions in one query
        const ticketQuery = await pool.query(`
            SELECT 
                t.id AS ticket_id, 
                t.status, 
                e.id AS event_id, 
                e.creator_id,
                (SELECT COUNT(*) FROM event_scanners es WHERE es.event_id = e.id AND es.user_id = $2) as is_assigned_scanner
            FROM tickets t
            JOIN events e ON t.event_id = e.id
            WHERE t.ticket_code = $1;
        `, [ticket_code, scannerId]);

        if (ticketQuery.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'fake_ticket', message: 'Ticket not found in system.' });
        }

        const ticket = ticketQuery.rows[0];

        // 2. Check Permissions: Is this user the event creator OR an assigned scanner?
        const isCreator = ticket.creator_id === scannerId;
        const isAssigned = parseInt(ticket.is_assigned_scanner) > 0;

        if (!isCreator && !isAssigned) {
            return res.status(403).json({ success: false, message: 'You do not have permission to scan tickets for this event.' });
        }

        // 3. Check Ticket Status
        if (ticket.status === 'scanned') {
            return res.status(400).json({ success: false, error: 'fake_ticket', message: 'Ticket has already been used.' });
        }
        if (ticket.status === 'revoked') {
            return res.status(400).json({ success: false, error: 'fake_ticket', message: 'Ticket is invalid or revoked.' });
        }

        // 4. Approve Ticket: Update status and log who scanned it
        await pool.query(`
            UPDATE tickets 
            SET status = 'scanned', scanned_by = $1, scanned_at = CURRENT_TIMESTAMP
            WHERE id = $2
        `, [scannerId, ticket.ticket_id]);

        // 5. Get Attendee Info to send back to the scanner screen
        // (Assuming you join with users or attendees table to get the name)
        
        res.json({
            success: true,
            message: 'Access Granted',
            data: {
                ticketId: ticket.ticket_id,
                status: 'scanned'
            }
        });

    } catch (err) {
        console.error("Scanning Error:", err);
        res.status(500).json({ success: false, error: 'network', message: 'Server error during scan.' });
    }
});

module.exports = router;