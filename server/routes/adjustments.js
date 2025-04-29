const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all adjustments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT a.*, e.firstname, e.lastname 
      FROM adjustment a
      JOIN employees e ON a.employee_id = e.employee_id
      WHERE a.archive_id IS NULL
      ORDER BY a.date_created DESC
    `;
    
    const [rows] = await pool.query(query);
    
    // Format response
    const formattedRows = rows.map(row => ({
      ...row,
      employee_name: `${row.firstname} ${row.lastname}`,
      posted_status: row.posted === 1 ? 'Posted' : 'Not Posted',
      paid_status: row.paid === 1 ? 'Paid' : 'Not Paid'
    }));
    
    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching adjustments:', error);
    res.status(500).json({ message: 'Error fetching adjustments', error: error.message });
  }
});

// Get adjustment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT a.*, e.firstname, e.lastname 
      FROM adjustment a
      JOIN employees e ON a.employee_id = e.employee_id
      WHERE a.adjustment_id = ? AND a.archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }
    
    // Format response
    const adjustment = {
      ...rows[0],
      employee_name: `${rows[0].firstname} ${rows[0].lastname}`,
      posted_status: rows[0].posted === 1 ? 'Posted' : 'Not Posted',
      paid_status: rows[0].paid === 1 ? 'Paid' : 'Not Paid'
    };
    
    res.json(adjustment);
  } catch (error) {
    console.error('Error fetching adjustment:', error);
    res.status(500).json({ message: 'Error fetching adjustment', error: error.message });
  }
});

// Get adjustments for a specific employee
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const query = `
      SELECT a.* 
      FROM adjustment a
      WHERE a.employee_id = ? AND a.archive_id IS NULL
      ORDER BY a.date_created DESC
    `;
    
    const [rows] = await pool.query(query, [employeeId]);
    
    // Format response
    const formattedRows = rows.map(row => ({
      ...row,
      posted_status: row.posted === 1 ? 'Posted' : 'Not Posted',
      paid_status: row.paid === 1 ? 'Paid' : 'Not Paid'
    }));
    
    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching employee adjustments:', error);
    res.status(500).json({ message: 'Error fetching employee adjustments', error: error.message });
  }
});

// Create new adjustment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      employee_id, 
      amount,
      type_id, 
      date,
      status,
      posted = 2, // Default to not posted
      paid = 2     // Default to not paid
    } = req.body;

    // Validate required fields
    if (!employee_id || amount === undefined) {
      return res.status(400).json({ message: 'Employee ID and amount are required' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    const query = `
      INSERT INTO adjustment (
        employee_id, 
        amount,
        type_id, 
        date,
        status,
        posted,
        paid,
        date_created
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    
    const values = [
      employee_id, 
      amount,
      type_id || null, 
      date || null,
      status || null,
      posted,
      paid
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Adjustment created successfully', 
      adjustment_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating adjustment:', error);
    res.status(500).json({ message: 'Error creating adjustment', error: error.message });
  }
});

// Update adjustment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      employee_id, 
      amount,
      type_id, 
      date,
      status,
      posted,
      paid
    } = req.body;

    // Check if adjustment exists
    const checkQuery = 'SELECT adjustment_id FROM adjustment WHERE adjustment_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }

    // Build update query dynamically
    let updateQuery = 'UPDATE adjustment SET ';
    const updateValues = [];
    const updateFields = [];

    if (employee_id !== undefined) {
      // Check if employee exists
      const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
      const [employeeRows] = await pool.query(employeeCheckQuery, [employee_id]);
      
      if (employeeRows.length === 0) {
        return res.status(400).json({ message: 'Employee does not exist' });
      }
      
      updateFields.push('employee_id = ?');
      updateValues.push(employee_id);
    }

    if (amount !== undefined) {
      updateFields.push('amount = ?');
      updateValues.push(amount);
    }

    if (type_id !== undefined) {
      updateFields.push('type_id = ?');
      updateValues.push(type_id);
    }

    if (date !== undefined) {
      updateFields.push('date = ?');
      updateValues.push(date);
    }

    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    if (posted !== undefined) {
      updateFields.push('posted = ?');
      updateValues.push(posted);
    }

    if (paid !== undefined) {
      updateFields.push('paid = ?');
      updateValues.push(paid);
    }

    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE adjustment_id = ?';
    updateValues.push(id);

    await pool.query(updateQuery, updateValues);
    
    res.json({ message: 'Adjustment updated successfully' });
  } catch (error) {
    console.error('Error updating adjustment:', error);
    res.status(500).json({ message: 'Error updating adjustment', error: error.message });
  }
});

// Delete adjustment (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if adjustment exists
    const checkQuery = 'SELECT adjustment_id FROM adjustment WHERE adjustment_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }
    
    // Soft delete by setting archive_id
    const query = `
      UPDATE adjustment SET 
        archive_id = 1
      WHERE adjustment_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Adjustment deleted successfully' });
  } catch (error) {
    console.error('Error deleting adjustment:', error);
    res.status(500).json({ message: 'Error deleting adjustment', error: error.message });
  }
});

// Update adjustment status (posted/paid)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { posted, paid } = req.body;
    
    // Check if adjustment exists
    const checkQuery = 'SELECT adjustment_id FROM adjustment WHERE adjustment_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }
    
    // Build update query based on provided fields
    let updateQuery = 'UPDATE adjustment SET ';
    const updateFields = [];
    const updateValues = [];
    
    if (posted !== undefined) {
      updateFields.push('posted = ?');
      updateValues.push(posted);
    }
    
    if (paid !== undefined) {
      updateFields.push('paid = ?');
      updateValues.push(paid);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No status fields provided to update' });
    }
    
    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE adjustment_id = ?';
    updateValues.push(id);
    
    await pool.query(updateQuery, updateValues);
    
    res.json({ message: 'Adjustment status updated successfully' });
  } catch (error) {
    console.error('Error updating adjustment status:', error);
    res.status(500).json({ message: 'Error updating adjustment status', error: error.message });
  }
});

// Batch update adjustments
router.post('/batch', authenticateToken, async (req, res) => {
  // Get connection for transaction
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { adjustments } = req.body;
    
    if (!adjustments || !Array.isArray(adjustments) || adjustments.length === 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'No adjustments provided for batch update' });
    }
    
    const results = [];
    
    for (const adjustment of adjustments) {
      const { adjustment_id, posted, paid } = adjustment;
      
      if (!adjustment_id) {
        results.push({ success: false, adjustment_id, message: 'Missing adjustment_id' });
        continue;
      }
      
      // Check if adjustment exists
      const [checkRows] = await connection.query(
        'SELECT adjustment_id FROM adjustment WHERE adjustment_id = ? AND archive_id IS NULL',
        [adjustment_id]
      );
      
      if (checkRows.length === 0) {
        results.push({ success: false, adjustment_id, message: 'Adjustment not found' });
        continue;
      }
      
      // Build update query
      let updateQuery = 'UPDATE adjustment SET ';
      const updateFields = [];
      const updateValues = [];
      
      if (posted !== undefined) {
        updateFields.push('posted = ?');
        updateValues.push(posted);
      }
      
      if (paid !== undefined) {
        updateFields.push('paid = ?');
        updateValues.push(paid);
      }
      
      if (updateFields.length === 0) {
        results.push({ success: false, adjustment_id, message: 'No status fields provided to update' });
        continue;
      }
      
      updateQuery += updateFields.join(', ');
      updateQuery += ' WHERE adjustment_id = ?';
      updateValues.push(adjustment_id);
      
      await connection.query(updateQuery, updateValues);
      
      results.push({ success: true, adjustment_id, message: 'Adjustment updated successfully' });
    }
    
    await connection.commit();
    
    res.json({ 
      message: 'Batch adjustment update completed', 
      results 
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error in batch adjustment update:', error);
    res.status(500).json({ message: 'Error in batch adjustment update', error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router; 