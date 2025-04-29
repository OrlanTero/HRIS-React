const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get summary of petty cash
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT 
        COALESCE(SUM(CASE WHEN type = 1 THEN cash_in ELSE 0 END), 0) as total_cash_in,
        COALESCE(SUM(CASE WHEN type = 2 THEN cash_out ELSE 0 END), 0) as total_cash_out,
        COALESCE(SUM(CASE WHEN type = 1 THEN cash_in ELSE -cash_out END), 0) as balance
      FROM petty_cash_reports
      WHERE archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query);
    
    if (rows.length === 0) {
      return res.json({
        total_cash_in: 0,
        total_cash_out: 0,
        balance: 0
      });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching petty cash summary:', error);
    res.status(500).json({ message: 'Error fetching petty cash summary', error: error.message });
  }
});

// Get petty cash reports
router.get('/reports/all', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT pcr.*, 
             COALESCE(SUM(CASE WHEN pcr.type = 1 THEN pcr.cash_in ELSE 0 END), 0) as total_in,
             COALESCE(SUM(CASE WHEN pcr.type = 2 THEN pcr.cash_out ELSE 0 END), 0) as total_out
      FROM petty_cash_reports pcr
      WHERE pcr.archive_id IS NULL
      GROUP BY pcr.petty_cash_report_id
      ORDER BY pcr.date_created DESC
    `;
    
    const [rows] = await pool.query(query);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching petty cash reports:', error);
    res.status(500).json({ message: 'Error fetching petty cash reports', error: error.message });
  }
});

// Get petty cash transactions by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const query = `
      SELECT p.* 
      FROM pettycash p
      WHERE p.requested_by = ? AND p.archive_id IS NULL
      ORDER BY p.date DESC
    `;
    
    const [rows] = await pool.query(query, [employeeId]);
    
    // Format response
    const formattedRows = rows.map(row => ({
      ...row,
      posted_status: row.posted === 1 ? 'Posted' : 'Not Posted'
    }));
    
    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching employee petty cash transactions:', error);
    res.status(500).json({ message: 'Error fetching employee petty cash transactions', error: error.message });
  }
});

// Create petty cash report
router.post('/reports', authenticateToken, async (req, res) => {
  try {
    const { 
      voucher, 
      type,
      remarks,
      cash_in,
      cash_out
    } = req.body;

    // Validate required fields
    if (!voucher || type === undefined) {
      return res.status(400).json({ message: 'Voucher and type are required' });
    }

    // Validate type - 1 for cash in, 2 for cash out
    if (type !== 1 && type !== 2) {
      return res.status(400).json({ message: 'Type must be 1 (cash in) or 2 (cash out)' });
    }

    // Validate amounts based on type
    if (type === 1 && (!cash_in || cash_in <= 0)) {
      return res.status(400).json({ message: 'For cash in transactions, cash_in amount must be positive' });
    }

    if (type === 2 && (!cash_out || cash_out <= 0)) {
      return res.status(400).json({ message: 'For cash out transactions, cash_out amount must be positive' });
    }
    
    const query = `
      INSERT INTO petty_cash_reports (
        voucher,
        type,
        remarks,
        cash_in,
        cash_out,
        date_created,
        db_status
      ) VALUES (?, ?, ?, ?, ?, NOW(), 1)
    `;
    
    const values = [
      voucher,
      type,
      remarks || null,
      type === 1 ? cash_in : 0,
      type === 2 ? cash_out : 0
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Petty cash report created successfully', 
      petty_cash_report_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating petty cash report:', error);
    res.status(500).json({ message: 'Error creating petty cash report', error: error.message });
  }
});

// Get all petty cash transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT p.*, e.firstname, e.lastname 
      FROM pettycash p
      LEFT JOIN employees e ON p.requested_by = e.employee_id
      WHERE p.archive_id IS NULL
      ORDER BY p.date DESC
    `;
    
    const [rows] = await pool.query(query);
    
    // Format response
    const formattedRows = rows.map(row => ({
      ...row,
      requester_name: row.firstname && row.lastname ? `${row.firstname} ${row.lastname}` : 'N/A',
      posted_status: row.posted === 1 ? 'Posted' : 'Not Posted'
    }));
    
    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching petty cash transactions:', error);
    res.status(500).json({ message: 'Error fetching petty cash transactions', error: error.message });
  }
});

// Get petty cash transaction by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT p.*, e.firstname, e.lastname 
      FROM pettycash p
      LEFT JOIN employees e ON p.requested_by = e.employee_id
      WHERE p.pettycash_id = ? AND p.archive_id IS NULL
    `;
    
    const [rows] = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Petty cash transaction not found' });
    }
    
    // Format response
    const transaction = {
      ...rows[0],
      requester_name: rows[0].firstname && rows[0].lastname ? `${rows[0].firstname} ${rows[0].lastname}` : 'N/A',
      posted_status: rows[0].posted === 1 ? 'Posted' : 'Not Posted'
    };
    
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching petty cash transaction:', error);
    res.status(500).json({ message: 'Error fetching petty cash transaction', error: error.message });
  }
});

// Create new petty cash transaction
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      requested_by, 
      amount,
      date,
      remarks,
      posted = 2 // Default to not posted
    } = req.body;

    // Validate required fields
    if (!requested_by || amount === undefined) {
      return res.status(400).json({ message: 'Employee ID and amount are required' });
    }

    // Check if employee exists
    const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
    const [employeeRows] = await pool.query(employeeCheckQuery, [requested_by]);
    
    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }
    
    const query = `
      INSERT INTO pettycash (
        requested_by, 
        amount,
        date,
        remarks,
        posted,
        db_status,
        date_created
      ) VALUES (?, ?, ?, ?, ?, 1, NOW())
    `;
    
    const values = [
      requested_by, 
      amount,
      date || new Date().toISOString().split('T')[0],
      remarks || null,
      posted
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Petty cash transaction created successfully', 
      pettycash_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating petty cash transaction:', error);
    res.status(500).json({ message: 'Error creating petty cash transaction', error: error.message });
  }
});

// Update petty cash transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      requested_by, 
      amount,
      date,
      remarks,
      posted
    } = req.body;

    // Check if petty cash transaction exists
    const checkQuery = 'SELECT pettycash_id FROM pettycash WHERE pettycash_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Petty cash transaction not found' });
    }

    // Build update query dynamically
    let updateQuery = 'UPDATE pettycash SET ';
    const updateValues = [];
    const updateFields = [];

    if (requested_by !== undefined) {
      // Check if employee exists
      const employeeCheckQuery = 'SELECT employee_id FROM employees WHERE employee_id = ? AND archive_id IS NULL';
      const [employeeRows] = await pool.query(employeeCheckQuery, [requested_by]);
      
      if (employeeRows.length === 0) {
        return res.status(400).json({ message: 'Employee does not exist' });
      }
      
      updateFields.push('requested_by = ?');
      updateValues.push(requested_by);
    }

    if (amount !== undefined) {
      updateFields.push('amount = ?');
      updateValues.push(amount);
    }

    if (date !== undefined) {
      updateFields.push('date = ?');
      updateValues.push(date);
    }

    if (remarks !== undefined) {
      updateFields.push('remarks = ?');
      updateValues.push(remarks);
    }

    if (posted !== undefined) {
      updateFields.push('posted = ?');
      updateValues.push(posted);
    }

    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE pettycash_id = ?';
    updateValues.push(id);

    await pool.query(updateQuery, updateValues);
    
    res.json({ message: 'Petty cash transaction updated successfully' });
  } catch (error) {
    console.error('Error updating petty cash transaction:', error);
    res.status(500).json({ message: 'Error updating petty cash transaction', error: error.message });
  }
});

// Delete petty cash transaction (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if petty cash transaction exists
    const checkQuery = 'SELECT pettycash_id FROM pettycash WHERE pettycash_id = ? AND archive_id IS NULL';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Petty cash transaction not found' });
    }
    
    // Soft delete by setting archive_id
    const query = `
      UPDATE pettycash SET 
        archive_id = 1
      WHERE pettycash_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Petty cash transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting petty cash transaction:', error);
    res.status(500).json({ message: 'Error deleting petty cash transaction', error: error.message });
  }
});

module.exports = router; 