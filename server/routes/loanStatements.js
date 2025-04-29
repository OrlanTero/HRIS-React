const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all loan statements
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT ls.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description,
             l.amount as loan_amount,
             l.balance as loan_balance
      FROM loan_statements ls
      LEFT JOIN employees e ON ls.employee_id = e.employee_id
      LEFT JOIN loans l ON ls.loan_id = l.loan_id
      WHERE ls.db_status = 1
      ORDER BY ls.loan_id ASC, ls.num ASC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loan statements:', error);
    res.status(500).json({ message: 'Failed to fetch loan statements', error: error.message });
  }
});

// Get loan statements for a specific loan
router.get('/loan/:loanId', authenticateToken, async (req, res) => {
  try {
    const { loanId } = req.params;
    
    const query = `
      SELECT ls.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name
      FROM loan_statements ls
      LEFT JOIN employees e ON ls.employee_id = e.employee_id
      WHERE ls.loan_id = ? AND ls.db_status = 1
      ORDER BY ls.num ASC
    `;
    
    const [results] = await pool.query(query, [loanId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loan statements:', error);
    res.status(500).json({ message: 'Failed to fetch loan statements', error: error.message });
  }
});

// Get loan statement by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT ls.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description,
             l.amount as loan_amount,
             l.balance as loan_balance
      FROM loan_statements ls
      LEFT JOIN employees e ON ls.employee_id = e.employee_id
      LEFT JOIN loans l ON ls.loan_id = l.loan_id
      WHERE ls.statement_id = ? AND ls.db_status = 1
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Loan statement not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching loan statement:', error);
    res.status(500).json({ message: 'Failed to fetch loan statement', error: error.message });
  }
});

// Create a new loan statement
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      employee_id, 
      loan_id, 
      start_date, 
      end_date, 
      amount,
      num,
      label,
      status = 0 
    } = req.body;

    // Validate required fields
    if (!employee_id || !loan_id || !amount) {
      return res.status(400).json({ message: 'Employee ID, loan ID, and amount are required' });
    }

    // Check if loan exists
    const loanCheckQuery = 'SELECT * FROM loans WHERE loan_id = ? AND status = 1';
    const [loanRows] = await pool.query(loanCheckQuery, [loan_id]);
    
    if (loanRows.length === 0) {
      return res.status(400).json({ message: 'Loan does not exist' });
    }
    
    const query = `
      INSERT INTO loan_statements (
        employee_id, 
        loan_id,
        start_date,
        end_date,
        amount,
        balance,
        num,
        label,
        status,
        db_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;
    
    const values = [
      employee_id, 
      loan_id,
      start_date,
      end_date,
      amount,
      amount, // Initial balance is the full amount
      num,
      label,
      status
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Loan statement created successfully', 
      statement_id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating loan statement:', error);
    res.status(500).json({ message: 'Error creating loan statement', error: error.message });
  }
});

// Update loan statement
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      start_date, 
      end_date,
      amount,
      balance,
      num,
      label,
      status
    } = req.body;

    // Check if loan statement exists
    const checkQuery = 'SELECT * FROM loan_statements WHERE statement_id = ? AND db_status = 1';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Loan statement not found' });
    }

    // Build update query dynamically
    let updateQuery = 'UPDATE loan_statements SET ';
    const updateValues = [];
    const updateFields = [];

    if (start_date !== undefined) {
      updateFields.push('start_date = ?');
      updateValues.push(start_date);
    }

    if (end_date !== undefined) {
      updateFields.push('end_date = ?');
      updateValues.push(end_date);
    }

    if (amount !== undefined) {
      updateFields.push('amount = ?');
      updateValues.push(amount);
    }

    if (balance !== undefined) {
      updateFields.push('balance = ?');
      updateValues.push(balance);
    }

    if (num !== undefined) {
      updateFields.push('num = ?');
      updateValues.push(num);
    }

    if (label !== undefined) {
      updateFields.push('label = ?');
      updateValues.push(label);
    }

    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    // If no fields to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateQuery += updateFields.join(', ');
    updateQuery += ' WHERE statement_id = ?';
    updateValues.push(id);

    await pool.query(updateQuery, updateValues);
    
    res.json({ message: 'Loan statement updated successfully' });
  } catch (error) {
    console.error('Error updating loan statement:', error);
    res.status(500).json({ message: 'Error updating loan statement', error: error.message });
  }
});

// Delete loan statement (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if loan statement exists
    const checkQuery = 'SELECT * FROM loan_statements WHERE statement_id = ? AND db_status = 1';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Loan statement not found' });
    }
    
    // Soft delete by setting db_status to 0
    const query = 'UPDATE loan_statements SET db_status = 0 WHERE statement_id = ?';
    await pool.query(query, [id]);
    
    res.json({ message: 'Loan statement deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan statement:', error);
    res.status(500).json({ message: 'Error deleting loan statement', error: error.message });
  }
});

// Update statement status (mark as paid)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (status === undefined) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    // Check if loan statement exists
    const checkQuery = 'SELECT * FROM loan_statements WHERE statement_id = ? AND db_status = 1';
    const [checkRows] = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ message: 'Loan statement not found' });
    }
    
    const statement = checkRows[0];
    
    // Update statement status
    await pool.query(
      'UPDATE loan_statements SET status = ? WHERE statement_id = ?',
      [status, id]
    );
    
    // If marking as paid (status = 1), update balance to 0
    if (status === 1) {
      await pool.query(
        'UPDATE loan_statements SET balance = 0 WHERE statement_id = ?',
        [id]
      );
      
      // Update loan balance
      const [loanRows] = await pool.query(
        'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
        [statement.loan_id]
      );
      
      if (loanRows.length > 0) {
        const loan = loanRows[0];
        const newBalance = Math.max(0, parseFloat(loan.balance) - parseFloat(statement.balance));
        
        await pool.query(
          'UPDATE loans SET balance = ? WHERE loan_id = ?',
          [newBalance, statement.loan_id]
        );
      }
    }
    
    res.json({ message: 'Loan statement status updated successfully' });
  } catch (error) {
    console.error('Error updating loan statement status:', error);
    res.status(500).json({ message: 'Error updating loan statement status', error: error.message });
  }
});

module.exports = router; 