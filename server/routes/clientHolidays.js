const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { ClientHoliday } = require('../models');

const router = express.Router();

// Get all holidays for a client
router.get('/client/:clientId', authenticateToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const [holidays] = await pool.query(`
      SELECT ch.client_holiday_id, ch.client_id, ch.holiday_id, 
             h.holiday, h.holiday_date, h.national_local
      FROM client_holidays ch
      JOIN holidays h ON ch.holiday_id = h.holiday_id
      WHERE ch.client_id = ? 
      AND ch.archive_id IS NULL
      AND h.archive_id IS NULL
      ORDER BY h.holiday_date ASC
    `, [clientId]);
    
    res.json(holidays);
  } catch (error) {
    console.error(`Error fetching holidays for client ${req.params.clientId}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign a holiday to a client
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { client_id, holiday_id } = req.body;
    
    if (!client_id || !holiday_id) {
      return res.status(400).json({ message: 'Client ID and Holiday ID are required' });
    }
    
    // Check if client exists
    const [clientCheck] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [client_id]
    );
    
    if (clientCheck.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Check if holiday exists
    const [holidayCheck] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ? AND archive_id IS NULL',
      [holiday_id]
    );
    
    if (holidayCheck.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    // Check if assignment already exists
    const [existingAssignment] = await pool.query(
      'SELECT * FROM client_holidays WHERE client_id = ? AND holiday_id = ? AND archive_id IS NULL',
      [client_id, holiday_id]
    );
    
    if (existingAssignment.length > 0) {
      return res.status(400).json({ message: 'Holiday is already assigned to this client' });
    }
    
    const query = `
      INSERT INTO client_holidays (
        client_id, holiday_id, date_created
      ) VALUES (
        ?, ?, NOW()
      )
    `;
    
    const values = [client_id, holiday_id];
    
    const [result] = await pool.query(query, values);
    
    const newAssignmentId = result.insertId;
    
    // Fetch the holiday details to return in response
    const [assignment] = await pool.query(`
      SELECT ch.client_holiday_id, ch.client_id, ch.holiday_id, 
             h.holiday, h.holiday_date, h.national_local
      FROM client_holidays ch
      JOIN holidays h ON ch.holiday_id = h.holiday_id
      WHERE ch.client_holiday_id = ?
    `, [newAssignmentId]);
    
    res.status(201).json(assignment[0]);
  } catch (error) {
    console.error('Error assigning holiday to client:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a holiday assignment from a client
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const archiveId = `archived_${Date.now()}`;
    
    const [checkResult] = await pool.query(
      'SELECT * FROM client_holidays WHERE client_holiday_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Holiday assignment not found' });
    }
    
    // Soft delete by setting archive_id
    await pool.query(
      'UPDATE client_holidays SET archive_id = ? WHERE client_holiday_id = ?',
      [archiveId, id]
    );
    
    res.json({ message: 'Holiday assignment removed successfully' });
  } catch (error) {
    console.error(`Error removing holiday assignment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all available holidays for a client (holidays not yet assigned)
router.get('/available/:clientId', authenticateToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const [holidays] = await pool.query(`
      SELECT h.* 
      FROM holidays h
      WHERE h.archive_id IS NULL
      AND NOT EXISTS (
        SELECT 1 
        FROM client_holidays ch 
        WHERE ch.holiday_id = h.holiday_id 
        AND ch.client_id = ?
        AND ch.archive_id IS NULL
      )
      ORDER BY h.holiday_date ASC
    `, [clientId]);
    
    res.json(holidays);
  } catch (error) {
    console.error(`Error fetching available holidays for client ${req.params.clientId}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 