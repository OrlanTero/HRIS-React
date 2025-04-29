const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all attendance records
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT a.*, e.first_name, e.last_name, ag.period, ag.year, ag.client_id, 
      c.name as client_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.employee_id
      JOIN attendance_groups ag ON a.attendance_group_id = ag.attendance_group_id
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE a.archive_id IS NULL
      ORDER BY a.date_created DESC
    `;
    
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
  }
});

// Get attendance by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT a.*, e.first_name, e.last_name, ag.period, ag.year, ag.client_id, 
      c.name as client_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.employee_id
      JOIN attendance_groups ag ON a.attendance_group_id = ag.attendance_group_id
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE a.attendance_id = ? AND a.archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching attendance record:', error);
    res.status(500).json({ message: 'Error fetching attendance record', error: error.message });
  }
});

// Get attendance by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const query = `
      SELECT a.*, ag.period, ag.year, ag.client_id, c.name as client_name
      FROM attendance a
      JOIN attendance_groups ag ON a.attendance_group_id = ag.attendance_group_id
      LEFT JOIN clients c ON ag.client_id = c.client_id
      WHERE a.employee_id = ? AND a.archive_id IS NULL
      ORDER BY ag.year DESC, ag.period DESC, a.day ASC
    `;
    
    const [rows] = await pool.query(query, [employeeId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    res.status(500).json({ message: 'Error fetching employee attendance records', error: error.message });
  }
});

// Get attendance by attendance group ID
router.get('/group/:groupId', authenticateToken, async (req, res) => {
  try {
    const { groupId } = req.params;
    const query = `
      SELECT a.*, e.first_name, e.last_name, ag.period, ag.year
      FROM attendance a
      JOIN employees e ON a.employee_id = e.employee_id
      JOIN attendance_groups ag ON a.attendance_group_id = ag.attendance_group_id
      WHERE a.attendance_group_id = ? AND a.archive_id IS NULL
      ORDER BY e.last_name ASC, a.day ASC
    `;
    
    const [rows] = await pool.query(query, [groupId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching attendance group records:', error);
    res.status(500).json({ message: 'Error fetching attendance group records', error: error.message });
  }
});

// Create new attendance
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      attendance_group_id, 
      employee_id, 
      type, 
      day, 
      hours 
    } = req.body;

    // Validate required fields
    if (!attendance_group_id || !employee_id || !type || !day) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    // Check if attendance group exists
    const groupCheckQuery = 'SELECT attendance_group_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [groupRows] = await pool.query(groupCheckQuery, [attendance_group_id]);
    
    if (groupRows.length === 0) {
      return res.status(400).json({ message: 'Attendance group does not exist' });
    }
    
    // Check if this attendance record already exists
    const checkQuery = `
      SELECT attendance_id FROM attendance 
      WHERE attendance_group_id = ? AND employee_id = ? AND day = ? AND type = ? AND archive_id IS NULL
    `;
    const [checkRows] = await pool.query(checkQuery, [attendance_group_id, employee_id, day, type]);
    
    if (checkRows.length > 0) {
      return res.status(400).json({ 
        message: 'Attendance record already exists for this employee, day, and type',
        attendance_id: checkRows[0].attendance_id
      });
    }
    
    const query = `
      INSERT INTO attendance (
        attendance_group_id, employee_id, type, day, hours, db_status, date_created
      ) VALUES (?, ?, ?, ?, ?, 1, NOW())
    `;
    
    const values = [
      attendance_group_id, 
      employee_id, 
      type, 
      day, 
      hours || 8 // Default to 8 hours if not specified
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Attendance record created successfully', 
      attendance_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json({ message: 'Error creating attendance record', error: error.message });
  }
});

// Bulk create/update attendance records
router.post('/batch', authenticateToken, async (req, res) => {
  try {
    const { records } = req.body;
    
    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: 'No attendance records provided' });
    }
    
    const results = [];
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      for (const record of records) {
        const { 
          attendance_id,
          attendance_group_id, 
          employee_id, 
          type, 
          day, 
          hours,
          action // 'add', 'update', or 'delete'
        } = record;
        
        // Validate required fields based on action
        if (!attendance_group_id || !employee_id || !type || !day) {
          results.push({ 
            success: false, 
            record, 
            message: 'Missing required fields' 
          });
          continue;
        }
        
        if (action === 'delete' && attendance_id) {
          // Delete record (soft delete)
          const deleteQuery = `
            UPDATE attendance SET 
              archive_id = 1 
            WHERE attendance_id = ?
          `;
          
          await connection.query(deleteQuery, [attendance_id]);
          
          results.push({ 
            success: true, 
            record, 
            message: 'Attendance record deleted' 
          });
        } else if (action === 'update' && attendance_id) {
          // Update record
          const updateQuery = `
            UPDATE attendance SET 
              attendance_group_id = ?, 
              employee_id = ?,
              type = ?,
              day = ?,
              hours = ?
            WHERE attendance_id = ?
          `;
          
          await connection.query(updateQuery, [
            attendance_group_id,
            employee_id,
            type,
            day,
            hours || 8,
            attendance_id
          ]);
          
          results.push({ 
            success: true, 
            record, 
            message: 'Attendance record updated',
            attendance_id
          });
        } else if (action === 'add' || !action) {
          // Check if record exists
          const checkQuery = `
            SELECT attendance_id FROM attendance 
            WHERE attendance_group_id = ? AND employee_id = ? AND day = ? AND type = ? AND archive_id IS NULL
          `;
          
          const [checkRows] = await connection.query(checkQuery, [
            attendance_group_id, 
            employee_id, 
            day, 
            type
          ]);
          
          if (checkRows.length > 0) {
            // Update existing record
            const updateQuery = `
              UPDATE attendance SET 
                hours = ?
              WHERE attendance_id = ?
            `;
            
            await connection.query(updateQuery, [
              hours || 8,
              checkRows[0].attendance_id
            ]);
            
            results.push({ 
              success: true, 
              record, 
              message: 'Existing attendance record updated',
              attendance_id: checkRows[0].attendance_id
            });
          } else {
            // Insert new record
            const insertQuery = `
              INSERT INTO attendance (
                attendance_group_id, employee_id, type, day, hours, db_status, date_created
              ) VALUES (?, ?, ?, ?, ?, 1, NOW())
            `;
            
            const [insertResult] = await connection.query(insertQuery, [
              attendance_group_id,
              employee_id,
              type,
              day,
              hours || 8
            ]);
            
            results.push({ 
              success: true, 
              record, 
              message: 'New attendance record created',
              attendance_id: insertResult.insertId
            });
          }
        }
      }
      
      // Commit the transaction
      await connection.commit();
      
      res.status(200).json({ 
        message: 'Batch attendance operation completed', 
        results 
      });
    } catch (error) {
      // Rollback in case of error
      await connection.rollback();
      throw error;
    } finally {
      // Release connection
      connection.release();
    }
  } catch (error) {
    console.error('Error in batch attendance operation:', error);
    res.status(500).json({ 
      message: 'Error in batch attendance operation', 
      error: error.message 
    });
  }
});

// Update attendance
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      attendance_group_id, 
      employee_id, 
      type, 
      day, 
      hours 
    } = req.body;

    // Validate required fields
    if (!attendance_group_id || !employee_id || !type || !day) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if attendance record exists
    const checkQuery = 'SELECT attendance_id FROM attendance WHERE attendance_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    // Check if attendance group exists
    const groupCheckQuery = 'SELECT attendance_group_id FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL';
    const [groupRows] = await pool.query(groupCheckQuery, [attendance_group_id]);
    
    if (groupRows.length === 0) {
      return res.status(400).json({ message: 'Attendance group does not exist' });
    }
    
    const query = `
      UPDATE attendance SET 
        attendance_group_id = ?, 
        employee_id = ?,
        type = ?,
        day = ?,
        hours = ?
      WHERE attendance_id = ?
    `;
    
    const values = [
      attendance_group_id, 
      employee_id, 
      type, 
      day, 
      hours || 8, // Default to 8 hours if not specified
      id
    ];
    
    await pool.query(query, values);
    
    res.json({ message: 'Attendance record updated successfully' });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ message: 'Error updating attendance record', error: error.message });
  }
});

// Delete attendance (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if attendance record exists
    const checkQuery = 'SELECT attendance_id FROM attendance WHERE attendance_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    const query = `
      UPDATE attendance SET 
        archive_id = 1
      WHERE attendance_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ message: 'Error deleting attendance record', error: error.message });
  }
});

module.exports = router; 