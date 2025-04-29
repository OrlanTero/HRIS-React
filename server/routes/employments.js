const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all employments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT employment_id, date_hired, date_end, employee_id, position, department, 
      e_type, status, rest_day_1, rest_day_2, active, created_at, updated_at
      FROM employments 
      WHERE archive_id IS NULL 
      ORDER BY date_hired DESC
    `;
    
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employments:', error);
    res.status(500).json({ message: 'Error fetching employments', error: error.message });
  }
});

// Get employment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT employment_id, date_hired, date_end, employee_id, position, department, 
      e_type, status, rest_day_1, rest_day_2, active, created_at, updated_at
      FROM employments 
      WHERE employment_id = ? AND archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employment record not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching employment:', error);
    res.status(500).json({ message: 'Error fetching employment record', error: error.message });
  }
});

// Get employments by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const query = `
      SELECT employment_id, date_hired, date_end, employee_id, position, department, 
      e_type, status, rest_day_1, rest_day_2, active, created_at, updated_at
      FROM employments 
      WHERE employee_id = ? AND archive_id IS NULL
      ORDER BY date_hired DESC
    `;
    
    const [rows] = await pool.query(query, [employeeId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employee employments:', error);
    res.status(500).json({ message: 'Error fetching employee employment records', error: error.message });
  }
});

// Create new employment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      date_hired, 
      date_end, 
      employee_id, 
      position, 
      department, 
      e_type, 
      status, 
      rest_day_1, 
      rest_day_2, 
      active = 'YES'
    } = req.body;

    // Validate required fields
    if (!date_hired || !employee_id || !position || !status || !e_type || !department) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    const query = `
      INSERT INTO employments (
        date_hired, date_end, employee_id, position, department, 
        e_type, status, rest_day_1, rest_day_2, active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    const values = [
      date_hired, 
      date_end || null, 
      employee_id, 
      position, 
      department, 
      e_type, 
      status, 
      rest_day_1 || null, 
      rest_day_2 || null, 
      active
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Employment record created successfully', 
      employment_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating employment record:', error);
    res.status(500).json({ message: 'Error creating employment record', error: error.message });
  }
});

// Update employment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      date_hired, 
      date_end, 
      employee_id, 
      position, 
      department, 
      e_type, 
      status, 
      rest_day_1, 
      rest_day_2, 
      active
    } = req.body;

    // Validate required fields
    if (!date_hired || !employee_id || !position || !status || !e_type || !department) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if employment record exists
    const checkQuery = 'SELECT employment_id FROM employments WHERE employment_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Employment record not found' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    const query = `
      UPDATE employments SET 
        date_hired = ?, 
        date_end = ?, 
        employee_id = ?,
        position = ?,
        department = ?, 
        e_type = ?, 
        status = ?, 
        rest_day_1 = ?, 
        rest_day_2 = ?, 
        active = ?,
        updated_at = NOW()
      WHERE employment_id = ?
    `;
    
    const values = [
      date_hired, 
      date_end || null, 
      employee_id, 
      position, 
      department, 
      e_type, 
      status,
      rest_day_1 || null, 
      rest_day_2 || null, 
      active,
      id
    ];
    
    await pool.query(query, values);
    
    res.json({ message: 'Employment record updated successfully' });
  } catch (error) {
    console.error('Error updating employment record:', error);
    res.status(500).json({ message: 'Error updating employment record', error: error.message });
  }
});

// Delete employment (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if employment record exists
    const checkQuery = 'SELECT employment_id FROM employments WHERE employment_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Employment record not found' });
    }
    
    const query = `
      UPDATE employments SET 
        archive_id = 1, 
        updated_at = NOW()
      WHERE employment_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Employment record deleted successfully' });
  } catch (error) {
    console.error('Error deleting employment record:', error);
    res.status(500).json({ message: 'Error deleting employment record', error: error.message });
  }
});

module.exports = router; 