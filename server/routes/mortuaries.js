const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all mortuaries with beneficiary counts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT m.*, 
        COUNT(b.beneficiary_id) as beneficiary_count
      FROM mortuaries m
      LEFT JOIN beneficiaries b ON m.mortuary_id = b.mortuary_id AND b.archive_id IS NULL
      WHERE m.archive_id IS NULL
      GROUP BY m.mortuary_id
      ORDER BY m.year DESC, m.period DESC
    `;
    
    const [mortuaries] = await pool.query(query);
    res.json(mortuaries);
  } catch (error) {
    console.error('Error fetching mortuaries:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get mortuary by ID with beneficiaries
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get mortuary details
    const mortuaryQuery = `
      SELECT * FROM mortuaries WHERE mortuary_id = ? AND archive_id IS NULL
    `;
    
    const [mortuaries] = await pool.query(mortuaryQuery, [id]);
    
    if (mortuaries.length === 0) {
      return res.status(404).json({ message: 'Mortuary not found' });
    }
    
    const mortuary = mortuaries[0];
    
    // Get beneficiaries for this mortuary
    const beneficiariesQuery = `
      SELECT b.*, e.firstname, e.lastname, e.employee_no 
      FROM beneficiaries b
      JOIN employees e ON b.employee_id = e.employee_id
      WHERE b.mortuary_id = ? AND b.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [beneficiaries] = await pool.query(beneficiariesQuery, [id]);
    
    mortuary.beneficiaries = beneficiaries;
    
    res.json(mortuary);
  } catch (error) {
    console.error(`Error fetching mortuary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get periods for a specific year
router.get('/periods/:year', authenticateToken, async (req, res) => {
  try {
    const { year } = req.params;
    
    // Get standard periods
    const standardPeriods = [
      'January 1 to 15',
      'January 16 to 31',
      'February 1 to 15',
      'February 16 to 28',
      'March 1 to 15',
      'March 16 to 31',
      'April 1 to 15',
      'April 16 to 30',
      'May 1 to 15',
      'May 16 to 31',
      'June 1 to 15',
      'June 16 to 30',
      'July 1 to 15',
      'July 16 to 31',
      'August 1 to 15',
      'August 16 to 31',
      'September 1 to 15',
      'September 16 to 30',
      'October 1 to 15',
      'October 16 to 31',
      'November 1 to 15',
      'November 16 to 30',
      'December 1 to 15',
      'December 16 to 31'
    ];
    
    // Get used periods for this year
    const query = `
      SELECT DISTINCT period FROM mortuaries 
      WHERE year = ? AND archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [year]);
    const usedPeriods = rows.map(row => row.period);
    
    // Return all periods with a flag indicating if they're already used
    const periods = standardPeriods.map(period => ({
      period,
      used: usedPeriods.includes(period)
    }));
    
    res.json(periods);
  } catch (error) {
    console.error(`Error fetching periods for year ${req.params.year}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new mortuary
router.post('/', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { period, year, beneficiaries = [] } = req.body;
    
    // Validate required fields
    if (!period || !year) {
      return res.status(400).json({ message: 'Period and year are required' });
    }
    
    // Check if mortuary for this period and year already exists
    const checkQuery = `
      SELECT * FROM mortuaries 
      WHERE period = ? AND year = ? AND archive_id IS NULL
    `;
    
    const [existingMortuaries] = await connection.query(checkQuery, [period, year]);
    
    if (existingMortuaries.length > 0) {
      return res.status(400).json({ message: 'Mortuary for this period and year already exists' });
    }
    
    // Insert mortuary
    const insertQuery = `
      INSERT INTO mortuaries (period, year, date_created)
      VALUES (?, ?, NOW())
    `;
    
    const [result] = await connection.query(insertQuery, [period, year]);
    const mortuaryId = result.insertId;
    
    // Insert beneficiaries if provided
    if (beneficiaries.length > 0) {
      const beneficiaryValues = beneficiaries.map(b => [
        mortuaryId,
        b.employee_id,
        b.type,
        b.name
      ]);
      
      const beneficiaryQuery = `
        INSERT INTO beneficiaries (mortuary_id, employee_id, type, name, date_created)
        VALUES ?
      `;
      
      await connection.query(beneficiaryQuery, [beneficiaryValues]);
    }
    
    await connection.commit();
    
    res.status(201).json({
      message: 'Mortuary created successfully',
      mortuary_id: mortuaryId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating mortuary:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

// Update mortuary
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { period, year } = req.body;
    
    // Validate required fields
    if (!period || !year) {
      return res.status(400).json({ message: 'Period and year are required' });
    }
    
    // Check if mortuary exists
    const checkQuery = `
      SELECT * FROM mortuaries WHERE mortuary_id = ? AND archive_id IS NULL
    `;
    
    const [existingMortuaries] = await pool.query(checkQuery, [id]);
    
    if (existingMortuaries.length === 0) {
      return res.status(404).json({ message: 'Mortuary not found' });
    }
    
    // Check if update would create a duplicate
    const duplicateQuery = `
      SELECT * FROM mortuaries 
      WHERE period = ? AND year = ? AND mortuary_id != ? AND archive_id IS NULL
    `;
    
    const [duplicates] = await pool.query(duplicateQuery, [period, year, id]);
    
    if (duplicates.length > 0) {
      return res.status(400).json({ message: 'Mortuary for this period and year already exists' });
    }
    
    // Update mortuary
    const updateQuery = `
      UPDATE mortuaries SET
        period = ?,
        year = ?
      WHERE mortuary_id = ?
    `;
    
    await pool.query(updateQuery, [period, year, id]);
    
    res.json({ message: 'Mortuary updated successfully' });
  } catch (error) {
    console.error(`Error updating mortuary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete mortuary (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    
    // Check if mortuary exists
    const checkQuery = `
      SELECT * FROM mortuaries WHERE mortuary_id = ? AND archive_id IS NULL
    `;
    
    const [mortuaries] = await connection.query(checkQuery, [id]);
    
    if (mortuaries.length === 0) {
      return res.status(404).json({ message: 'Mortuary not found' });
    }
    
    // Soft delete all beneficiaries associated with this mortuary
    const deleteBeneficiariesQuery = `
      UPDATE beneficiaries SET
        archive_id = 1
      WHERE mortuary_id = ?
    `;
    
    await connection.query(deleteBeneficiariesQuery, [id]);
    
    // Soft delete the mortuary
    const deleteMortuaryQuery = `
      UPDATE mortuaries SET
        archive_id = 1
      WHERE mortuary_id = ?
    `;
    
    await connection.query(deleteMortuaryQuery, [id]);
    
    await connection.commit();
    
    res.json({ message: 'Mortuary deleted successfully' });
  } catch (error) {
    await connection.rollback();
    console.error(`Error deleting mortuary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router; 