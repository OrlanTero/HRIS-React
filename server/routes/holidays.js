const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { Holiday, ClientHoliday } = require('../models');

const router = express.Router();

// Get all holidays
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [holidays] = await pool.query(
      'SELECT * FROM holidays WHERE archive_id IS NULL ORDER BY holiday_date ASC'
    );
    
    res.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get holiday by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [holidays] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (holidays.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    res.json(holidays[0]);
  } catch (error) {
    console.error(`Error fetching holiday ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new holiday
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { holiday, holiday_date, national_local } = req.body;
    
    if (!holiday || !holiday_date) {
      return res.status(400).json({ message: 'Holiday name and date are required' });
    }
    
    const query = `
      INSERT INTO holidays (
        holiday, holiday_date, national_local, date_created
      ) VALUES (
        ?, ?, ?, NOW()
      )
    `;
    
    const values = [
      holiday, holiday_date, national_local || 'National Holiday'
    ];
    
    const [result] = await pool.query(query, values);
    
    const newHolidayId = result.insertId;
    
    const [newHoliday] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ?',
      [newHolidayId]
    );
    
    res.status(201).json(newHoliday[0]);
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a holiday
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { holiday, holiday_date, national_local } = req.body;
    
    if (!holiday || !holiday_date) {
      return res.status(400).json({ message: 'Holiday name and date are required' });
    }
    
    const [checkResult] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    const query = `
      UPDATE holidays SET
        holiday = ?, holiday_date = ?, national_local = ?
      WHERE holiday_id = ?
    `;
    
    const values = [
      holiday, holiday_date, national_local || 'National Holiday', id
    ];
    
    await pool.query(query, values);
    
    const [updatedHoliday] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ?',
      [id]
    );
    
    res.json(updatedHoliday[0]);
  } catch (error) {
    console.error(`Error updating holiday ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a holiday
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const archiveId = `archived_${Date.now()}`;
    
    const [checkResult] = await pool.query(
      'SELECT * FROM holidays WHERE holiday_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    // Check if holiday is assigned to any clients
    const [assignedClients] = await pool.query(
      'SELECT * FROM client_holidays WHERE holiday_id = ? AND archive_id IS NULL LIMIT 1',
      [id]
    );
    
    if (assignedClients.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete holiday as it is assigned to clients'
      });
    }
    
    // Soft delete by setting archive_id
    await pool.query(
      'UPDATE holidays SET archive_id = ? WHERE holiday_id = ?',
      [archiveId, id]
    );
    
    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error(`Error deleting holiday ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 