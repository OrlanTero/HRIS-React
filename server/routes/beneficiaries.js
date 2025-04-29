const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all beneficiaries
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT b.*, e.firstname, e.lastname, e.employee_no,
        m.period, m.year
      FROM beneficiaries b
      JOIN employees e ON b.employee_id = e.employee_id
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE b.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [beneficiaries] = await pool.query(query);
    res.json(beneficiaries);
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get beneficiary by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT b.*, e.firstname, e.lastname, e.employee_no,
        m.period, m.year
      FROM beneficiaries b
      JOIN employees e ON b.employee_id = e.employee_id
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE b.beneficiary_id = ? AND b.archive_id IS NULL
    `;
    
    const [beneficiaries] = await pool.query(query, [id]);
    
    if (beneficiaries.length === 0) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    
    res.json(beneficiaries[0]);
  } catch (error) {
    console.error(`Error fetching beneficiary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get beneficiaries by mortuary ID
router.get('/mortuary/:mortuaryId', authenticateToken, async (req, res) => {
  try {
    const { mortuaryId } = req.params;
    
    // First check if mortuary exists
    const mortuaryQuery = `
      SELECT * FROM mortuaries WHERE mortuary_id = ? AND archive_id IS NULL
    `;
    
    const [mortuaries] = await pool.query(mortuaryQuery, [mortuaryId]);
    
    if (mortuaries.length === 0) {
      return res.status(404).json({ message: 'Mortuary not found' });
    }
    
    const query = `
      SELECT b.*, e.firstname, e.lastname, e.employee_no
      FROM beneficiaries b
      JOIN employees e ON b.employee_id = e.employee_id
      WHERE b.mortuary_id = ? AND b.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [beneficiaries] = await pool.query(query, [mortuaryId]);
    res.json(beneficiaries);
  } catch (error) {
    console.error(`Error fetching beneficiaries for mortuary ${req.params.mortuaryId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get beneficiaries by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // First check if employee exists
    const employeeQuery = `
      SELECT * FROM employees WHERE employee_id = ?
    `;
    
    const [employees] = await pool.query(employeeQuery, [employeeId]);
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    const query = `
      SELECT b.*, m.period, m.year
      FROM beneficiaries b
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE b.employee_id = ? AND b.archive_id IS NULL
      ORDER BY m.year DESC, m.period DESC
    `;
    
    const [beneficiaries] = await pool.query(query, [employeeId]);
    res.json(beneficiaries);
  } catch (error) {
    console.error(`Error fetching beneficiaries for employee ${req.params.employeeId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new beneficiary
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { mortuary_id, employee_id, type, name } = req.body;
    
    // Validate required fields
    if (!mortuary_id || !employee_id || !type || !name) {
      return res.status(400).json({ 
        message: 'Mortuary ID, employee ID, type, and name are required'
      });
    }
    
    // Check if mortuary exists
    const mortuaryQuery = `
      SELECT * FROM mortuaries WHERE mortuary_id = ? AND archive_id IS NULL
    `;
    
    const [mortuaries] = await pool.query(mortuaryQuery, [mortuary_id]);
    
    if (mortuaries.length === 0) {
      return res.status(404).json({ message: 'Mortuary not found' });
    }
    
    // Check if employee exists
    const employeeQuery = `
      SELECT * FROM employees WHERE employee_id = ?
    `;
    
    const [employees] = await pool.query(employeeQuery, [employee_id]);
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Check if beneficiary already exists for this employee in this mortuary
    const checkQuery = `
      SELECT * FROM beneficiaries 
      WHERE mortuary_id = ? AND employee_id = ? AND archive_id IS NULL
    `;
    
    const [existingBeneficiaries] = await pool.query(checkQuery, [mortuary_id, employee_id]);
    
    if (existingBeneficiaries.length > 0) {
      return res.status(400).json({ 
        message: 'A beneficiary for this employee already exists in this mortuary'
      });
    }
    
    // Insert beneficiary
    const insertQuery = `
      INSERT INTO beneficiaries (mortuary_id, employee_id, type, name, date_created)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    const [result] = await pool.query(
      insertQuery, 
      [mortuary_id, employee_id, type, name]
    );
    
    res.status(201).json({
      message: 'Beneficiary created successfully',
      beneficiary_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating beneficiary:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update beneficiary
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name } = req.body;
    
    // Validate required fields
    if (!type || !name) {
      return res.status(400).json({ message: 'Type and name are required' });
    }
    
    // Check if beneficiary exists
    const checkQuery = `
      SELECT * FROM beneficiaries WHERE beneficiary_id = ? AND archive_id IS NULL
    `;
    
    const [beneficiaries] = await pool.query(checkQuery, [id]);
    
    if (beneficiaries.length === 0) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    
    // Update beneficiary
    const updateQuery = `
      UPDATE beneficiaries SET
        type = ?,
        name = ?
      WHERE beneficiary_id = ?
    `;
    
    await pool.query(updateQuery, [type, name, id]);
    
    res.json({ message: 'Beneficiary updated successfully' });
  } catch (error) {
    console.error(`Error updating beneficiary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete beneficiary (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if beneficiary exists
    const checkQuery = `
      SELECT * FROM beneficiaries WHERE beneficiary_id = ? AND archive_id IS NULL
    `;
    
    const [beneficiaries] = await pool.query(checkQuery, [id]);
    
    if (beneficiaries.length === 0) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    
    // Soft delete the beneficiary
    const deleteQuery = `
      UPDATE beneficiaries SET
        archive_id = 1
      WHERE beneficiary_id = ?
    `;
    
    await pool.query(deleteQuery, [id]);
    
    res.json({ message: 'Beneficiary deleted successfully' });
  } catch (error) {
    console.error(`Error deleting beneficiary ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 