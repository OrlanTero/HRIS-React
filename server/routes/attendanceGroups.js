const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all attendance groups
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT ag.*, c.name as client_name, c.branch as client_branch
      FROM attendance_groups ag
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE ag.archive_id IS NULL
      ORDER BY ag.year DESC, ag.period DESC
    `;
    
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching attendance groups:', error);
    res.status(500).json({ message: 'Error fetching attendance groups', error: error.message });
  }
});

// Get attendance group by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT ag.*, c.name as client_name, c.branch as client_branch
      FROM attendance_groups ag
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE ag.attendance_group_id = ? AND ag.archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }
    
    // Get the deployed employees for this client
    const employeeQuery = `
      SELECT de.*, e.firstname as first_name, e.lastname as last_name, e.employee_id
      FROM deployed_employees de
      JOIN employments em ON de.employment_id = em.employment_id
      JOIN employees e ON em.employee_id = e.employee_id
      WHERE de.client_id = ? AND de.archive_id IS NULL
      AND (de.date_to IS NULL OR de.date_to >= CURDATE())
    `;
    
    const [employees] = await pool.query(employeeQuery, [rows[0].client_id]);
    
    // Get attendance records for this group
    const attendanceQuery = `
      SELECT a.*, e.firstname as first_name, e.lastname as last_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.employee_id
      WHERE a.attendance_group_id = ? AND a.archive_id IS NULL
    `;
    
    const [attendance] = await pool.query(attendanceQuery, [id]);
    
    // Group attendance by employee
    const attendanceByEmployee = {};
    for (const record of attendance) {
      if (!attendanceByEmployee[record.employee_id]) {
        attendanceByEmployee[record.employee_id] = [];
      }
      attendanceByEmployee[record.employee_id].push(record);
    }
    
    const result = {
      ...rows[0],
      deployed_employees: employees,
      attendance: attendanceByEmployee
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching attendance group:', error);
    res.status(500).json({ message: 'Error fetching attendance group', error: error.message });
  }
});

// Get attendance groups by client ID
router.get('/client/:clientId', authenticateToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    const query = `
      SELECT ag.*, c.name as client_name, c.branch as client_branch
      FROM attendance_groups ag
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE ag.client_id = ? AND ag.archive_id IS NULL
      ORDER BY ag.year DESC, ag.period DESC
    `;
    
    const [rows] = await pool.query(query, [clientId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching client attendance groups:', error);
    res.status(500).json({ message: 'Error fetching client attendance groups', error: error.message });
  }
});

// Get latest attendance group for a client
router.get('/client/:clientId/latest', authenticateToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    const query = `
      SELECT ag.*, c.name as client_name, c.branch as client_branch
      FROM attendance_groups ag
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE ag.client_id = ? AND ag.archive_id IS NULL
      ORDER BY ag.year DESC, ag.period DESC
      LIMIT 1
    `;
    
    const [rows] = await pool.query(query, [clientId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No attendance groups found for this client' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching latest client attendance group:', error);
    res.status(500).json({ message: 'Error fetching latest client attendance group', error: error.message });
  }
});

// Get attendance periods by year
router.get('/periods/:year', authenticateToken, async (req, res) => {
  try {
    const { year } = req.params;
    const query = `
      SELECT DISTINCT period 
      FROM attendance_groups 
      WHERE year = ? AND archive_id IS NULL
      ORDER BY date_created DESC
    `;
    
    const [rows] = await pool.query(query, [year]);
    
    // Extract just the period values
    const periods = rows.map(row => row.period);
    
    res.json(periods);
  } catch (error) {
    console.error('Error fetching attendance periods:', error);
    res.status(500).json({ message: 'Error fetching attendance periods', error: error.message });
  }
});

// Get years with attendance records
router.get('/years', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT year 
      FROM attendance_groups 
      WHERE archive_id IS NULL
      ORDER BY year DESC
    `;
    
    const [rows] = await pool.query(query);
    
    // Extract just the year values
    const years = rows.map(row => row.year);
    
    // If no years are found, return an empty array instead of a 404
    res.json(years || []);
  } catch (error) {
    console.error('Error fetching attendance years:', error);
    // Return an empty array with status 200 instead of 500 to prevent client errors
    res.json([]);
  }
});

// Create new attendance group
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      period, 
      year, 
      client_id, 
      active = 2, 
      finished = 2 
    } = req.body;

    // Validate required fields
    if (!period || !year || !client_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if client exists
    const clientCheckQuery = 'SELECT client_id FROM clients WHERE client_id = ? AND archive_id IS NULL';
    const [clientRows] = await pool.query(clientCheckQuery, [client_id]);
    
    if (clientRows.length === 0) {
      return res.status(400).json({ message: 'Client does not exist' });
    }
    
    // Check if this attendance group already exists
    const checkQuery = `
      SELECT attendance_group_id FROM attendance_groups 
      WHERE period = ? AND year = ? AND client_id = ? AND archive_id IS NULL
    `;
    const [checkRows] = await pool.query(checkQuery, [period, year, client_id]);
    
    if (checkRows.length > 0) {
      return res.status(400).json({ 
        message: 'Attendance group already exists for this period, year, and client',
        attendance_group_id: checkRows[0].attendance_group_id
      });
    }
    
    const query = `
      INSERT INTO attendance_groups (
        period, year, client_id, active, finished, date_created
      ) VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    const values = [
      period, 
      year, 
      client_id, 
      active, 
      finished
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Attendance group created successfully', 
      attendance_group_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating attendance group:', error);
    res.status(500).json({ message: 'Error creating attendance group', error: error.message });
  }
});

// Update attendance group
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      period, 
      year, 
      client_id, 
      active, 
      finished 
    } = req.body;

    // Validate required fields
    if (!period || !year || !client_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if attendance group exists
    const checkQuery = 'SELECT attendance_group_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }

    // Check if client exists
    const clientCheckQuery = 'SELECT client_id FROM clients WHERE client_id = ? AND archive_id IS NULL';
    const [clientRows] = await pool.query(clientCheckQuery, [client_id]);
    
    if (clientRows.length === 0) {
      return res.status(400).json({ message: 'Client does not exist' });
    }
    
    const query = `
      UPDATE attendance_groups SET 
        period = ?, 
        year = ?,
        client_id = ?,
        active = ?,
        finished = ?
      WHERE attendance_group_id = ?
    `;
    
    const values = [
      period, 
      year, 
      client_id, 
      active !== undefined ? active : 2, 
      finished !== undefined ? finished : 2,
      id
    ];
    
    await pool.query(query, values);
    
    res.json({ message: 'Attendance group updated successfully' });
  } catch (error) {
    console.error('Error updating attendance group:', error);
    res.status(500).json({ message: 'Error updating attendance group', error: error.message });
  }
});

// Mark attendance group as active
router.put('/:id/activate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attendance group exists
    const checkQuery = 'SELECT attendance_group_id, client_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }
    
    const clientId = checkRows[0].client_id;
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // First, deactivate all attendance groups for this client
      const deactivateQuery = `
        UPDATE attendance_groups SET 
          active = 2
        WHERE client_id = ?
      `;
      
      await connection.query(deactivateQuery, [clientId]);
      
      // Then, activate the specified group
      const activateQuery = `
        UPDATE attendance_groups SET 
          active = 1
        WHERE attendance_group_id = ?
      `;
      
      await connection.query(activateQuery, [id]);
      
      // Commit the transaction
      await connection.commit();
      
      res.json({ message: 'Attendance group activated successfully' });
    } catch (error) {
      // Rollback in case of error
      await connection.rollback();
      throw error;
    } finally {
      // Release connection
      connection.release();
    }
  } catch (error) {
    console.error('Error activating attendance group:', error);
    res.status(500).json({ message: 'Error activating attendance group', error: error.message });
  }
});

// Mark attendance group as finished
router.put('/:id/finish', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attendance group exists
    const checkQuery = 'SELECT attendance_group_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }
    
    const query = `
      UPDATE attendance_groups SET 
        finished = 1
      WHERE attendance_group_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Attendance group marked as finished' });
  } catch (error) {
    console.error('Error finishing attendance group:', error);
    res.status(500).json({ message: 'Error finishing attendance group', error: error.message });
  }
});

// Delete attendance group (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attendance group exists
    const checkQuery = 'SELECT attendance_group_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // First, soft delete all attendance records for this group
      const deleteAttendanceQuery = `
        UPDATE attendance SET 
          archive_id = 1
        WHERE attendance_group_id = ?
      `;
      
      await connection.query(deleteAttendanceQuery, [id]);
      
      // Then, soft delete the attendance group
      const deleteGroupQuery = `
        UPDATE attendance_groups SET 
          archive_id = 1
        WHERE attendance_group_id = ?
      `;
      
      await connection.query(deleteGroupQuery, [id]);
      
      // Commit the transaction
      await connection.commit();
      
      res.json({ message: 'Attendance group and related records deleted successfully' });
    } catch (error) {
      // Rollback in case of error
      await connection.rollback();
      throw error;
    } finally {
      // Release connection
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting attendance group:', error);
    res.status(500).json({ message: 'Error deleting attendance group', error: error.message });
  }
});

module.exports = router; 