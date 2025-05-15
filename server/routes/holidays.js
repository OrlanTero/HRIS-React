const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { Holiday, ClientHoliday } = require('../models');

const router = express.Router();

// Get all holidays
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT h.*, c.name as client_name 
      FROM holidays h
      LEFT JOIN client_holidays ch ON h.holiday_id = ch.holiday_id
      LEFT JOIN clients c ON ch.client_id = c.client_id
      WHERE h.archive_id IS NULL
      ORDER BY h.holiday_date DESC
    `;
    
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ message: 'Error fetching holidays', error: error.message });
  }
});

// Get holiday by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT h.*, c.name as client_name 
      FROM holidays h
      LEFT JOIN client_holidays ch ON h.holiday_id = ch.holiday_id
      LEFT JOIN clients c ON ch.client_id = c.client_id
      WHERE h.holiday_id = ? AND h.archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching holiday:', error);
    res.status(500).json({ message: 'Error fetching holiday', error: error.message });
  }
});

// Get holidays by client, year, and month
router.get('/client/:clientId/year/:year/month/:month', authenticateToken, async (req, res) => {
  try {
    const { clientId, year, month } = req.params;
    
    // Convert month name to month number
    const months = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    
    const monthNum = months[month];
    
    if (!monthNum) {
      return res.status(400).json({ message: 'Invalid month name' });
    }
    
    // Format the date pattern for SQL
    const datePattern = `${year}-${monthNum}-%`;
    
    // Query both national holidays and client-specific holidays using a join
    const query = `
      SELECT h.*, 
             DATE_FORMAT(h.holiday_date, '%d') as day,
             c.name as client_name 
      FROM holidays h
      LEFT JOIN client_holidays ch ON h.holiday_id = ch.holiday_id
      LEFT JOIN clients c ON ch.client_id = c.client_id
      WHERE h.archive_id IS NULL
      AND (ch.client_id = ? OR ch.client_id IS NULL)
      AND h.holiday_date LIKE ?
      ORDER BY h.holiday_date ASC
    `;
    
    const [rows] = await pool.query(query, [clientId, datePattern]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching holidays by client and date:', error);
    res.status(500).json({ 
      message: 'Error fetching holidays by client and date', 
      error: error.message 
    });
  }
});

// Create new holiday
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      name, 
      date, 
      type, 
      client_id, 
      description
    } = req.body;

    // Validate required fields
    if (!name || !date || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Start a transaction to handle both holiday and client_holiday
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // First insert the holiday
      const holidayQuery = `
        INSERT INTO holidays (
          holiday, holiday_date, national_local, description, date_created
        ) VALUES (?, ?, ?, ?, NOW())
      `;
      
      const holidayValues = [
        name, 
        date, 
        type, 
        description || null
      ];
      
      const [holidayResult] = await connection.query(holidayQuery, holidayValues);
      const holidayId = holidayResult.insertId;
      
      // If client_id is specified, also create the client_holiday association
      if (client_id) {
        const clientHolidayQuery = `
          INSERT INTO client_holidays (
            client_id, holiday_id, date_created
          ) VALUES (?, ?, NOW())
        `;
        
        await connection.query(clientHolidayQuery, [client_id, holidayId]);
      }
      
      // Commit the transaction
      await connection.commit();
      
      res.status(201).json({ 
        message: 'Holiday created successfully', 
        holiday_id: holidayId 
      });
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      // Release the connection
      connection.release();
    }
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(500).json({ message: 'Error creating holiday', error: error.message });
  }
});

// Update holiday
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      date, 
      type, 
      client_id, 
      description
    } = req.body;

    // Validate required fields
    if (!name || !date || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if holiday exists
    const checkQuery = 'SELECT holiday_id FROM holidays WHERE holiday_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Update the holiday record
      const holidayQuery = `
        UPDATE holidays SET 
          holiday = ?, 
          holiday_date = ?,
          national_local = ?,
          description = ?
        WHERE holiday_id = ?
      `;
      
      const holidayValues = [
        name, 
        date, 
        type, 
        description || null,
        id
      ];
      
      await connection.query(holidayQuery, holidayValues);
      
      // Check if there's an existing client_holiday association
      const checkClientQuery = `
        SELECT client_holiday_id FROM client_holidays 
        WHERE holiday_id = ? AND archive_id IS NULL
      `;
      
      const [clientHolidayRows] = await connection.query(checkClientQuery, [id]);
      
      if (client_id) {
        // If client_id is provided and association exists, update it
        if (clientHolidayRows.length > 0) {
          const updateClientQuery = `
            UPDATE client_holidays SET 
              client_id = ?
            WHERE holiday_id = ? AND archive_id IS NULL
          `;
          
          await connection.query(updateClientQuery, [client_id, id]);
        } else {
          // If no association exists, create a new one
          const createClientQuery = `
            INSERT INTO client_holidays (
              client_id, holiday_id, date_created
            ) VALUES (?, ?, NOW())
          `;
          
          await connection.query(createClientQuery, [client_id, id]);
        }
      } else if (clientHolidayRows.length > 0) {
        // If client_id is not provided but association exists, soft delete it
        const deleteClientQuery = `
          UPDATE client_holidays SET 
            archive_id = 1
          WHERE holiday_id = ?
        `;
        
        await connection.query(deleteClientQuery, [id]);
      }
      
      // Commit the transaction
      await connection.commit();
      
      res.json({ message: 'Holiday updated successfully' });
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      // Release the connection
      connection.release();
    }
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(500).json({ message: 'Error updating holiday', error: error.message });
  }
});

// Delete holiday (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if holiday exists
    const checkQuery = 'SELECT holiday_id FROM holidays WHERE holiday_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // First, soft delete any client_holiday associations
      const clientHolidayQuery = `
        UPDATE client_holidays SET 
          archive_id = 1
        WHERE holiday_id = ? AND archive_id IS NULL
      `;
      
      await connection.query(clientHolidayQuery, [id]);
      
      // Then, soft delete the holiday itself
      const holidayQuery = `
        UPDATE holidays SET 
          archive_id = 1
        WHERE holiday_id = ?
      `;
      
      await connection.query(holidayQuery, [id]);
      
      // Commit the transaction
      await connection.commit();
      
      res.json({ message: 'Holiday deleted successfully' });
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      // Release the connection
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ message: 'Error deleting holiday', error: error.message });
  }
});

module.exports = router; 