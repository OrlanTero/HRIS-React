const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all loan payments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT lp.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description
      FROM loan_payments lp
      LEFT JOIN employees e ON lp.employee_id = e.employee_id
      LEFT JOIN loans l ON lp.loan_id = l.loan_id
      WHERE lp.status = 1
      ORDER BY lp.payment_date DESC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loan payments:', error);
    res.status(500).json({ message: 'Failed to fetch loan payments', error: error.message });
  }
});

// Get loan payment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT lp.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description
      FROM loan_payments lp
      LEFT JOIN employees e ON lp.employee_id = e.employee_id
      LEFT JOIN loans l ON lp.loan_id = l.loan_id
      WHERE lp.payment_id = ? AND lp.status = 1
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Loan payment not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching loan payment:', error);
    res.status(500).json({ message: 'Failed to fetch loan payment', error: error.message });
  }
});

// Get loan payments by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const query = `
      SELECT lp.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description
      FROM loan_payments lp
      LEFT JOIN employees e ON lp.employee_id = e.employee_id
      LEFT JOIN loans l ON lp.loan_id = l.loan_id
      WHERE lp.employee_id = ? AND lp.status = 1
      ORDER BY lp.payment_date DESC
    `;
    
    const [results] = await pool.query(query, [employeeId]);
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching employee loan payments:', error);
    res.status(500).json({ message: 'Failed to fetch employee loan payments', error: error.message });
  }
});

// Get loan payments by loan ID
router.get('/loan/:loanId', authenticateToken, async (req, res) => {
  try {
    const { loanId } = req.params;
    
    const query = `
      SELECT lp.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             l.description as loan_description
      FROM loan_payments lp
      LEFT JOIN employees e ON lp.employee_id = e.employee_id
      LEFT JOIN loans l ON lp.loan_id = l.loan_id
      WHERE lp.loan_id = ? AND lp.status = 1
      ORDER BY lp.payment_date DESC
    `;
    
    const [results] = await pool.query(query, [loanId]);
    
    // Calculate total paid amount
    let totalPaid = 0;
    
    results.forEach(payment => {
      totalPaid += parseFloat(payment.amount);
    });
    
    res.json({
      payments: results,
      totalPaid,
      count: results.length
    });
  } catch (error) {
    console.error('Error fetching loan payments:', error);
    res.status(500).json({ message: 'Failed to fetch loan payments', error: error.message });
  }
});

// Create a new loan payment
router.post('/', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const {
      employee_id,
      loan_id,
      amount,
      payment_type,
      payment_date,
      notes,
      statement_id
    } = req.body;

    // Validate required fields
    if (!employee_id || !loan_id || !amount || !payment_date) {
      return res.status(400).json({ message: 'Employee, loan, amount, and payment date are required' });
    }

    // Check if employee exists
    const [employee] = await connection.query(
      'SELECT * FROM employees WHERE employee_id = ?',
      [employee_id]
    );
    
    if (employee.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Check if loan exists
    const [loan] = await connection.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [loan_id]
    );
    
    if (loan.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Insert payment
    const [result] = await connection.query(
      `INSERT INTO loan_payments (
        employee_id,
        loan_id,
        amount,
        payment_type,
        payment_date,
        notes,
        status,
        date_created
      ) VALUES (?, ?, ?, ?, ?, ?, 1, NOW())`,
      [
        employee_id,
        loan_id,
        amount,
        payment_type || 'CASH',
        payment_date,
        notes || ''
      ]
    );
    
    const paymentId = result.insertId;
    
    // Update loan balance
    const currentBalance = parseFloat(loan[0].balance);
    const newBalance = Math.max(0, currentBalance - parseFloat(amount));
    
    await connection.query(
      'UPDATE loans SET balance = ? WHERE loan_id = ?',
      [newBalance, loan_id]
    );
    
    // If payment is for a specific statement, update it
    if (statement_id) {
      const [statement] = await connection.query(
        'SELECT * FROM loan_statements WHERE statement_id = ? AND db_status = 1',
        [statement_id]
      );
      
      if (statement.length > 0) {
        const currentStatementBalance = parseFloat(statement[0].balance);
        const newStatementBalance = Math.max(0, currentStatementBalance - parseFloat(amount));
        const newStatus = newStatementBalance === 0 ? 1 : 0; // 1 = Paid, 0 = Not paid
        
        await connection.query(
          'UPDATE loan_statements SET balance = ?, status = ? WHERE statement_id = ?',
          [newStatementBalance, newStatus, statement_id]
        );
      }
    }
    
    await connection.commit();
    
    res.status(201).json({
      message: 'Loan payment created successfully',
      paymentId
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating loan payment:', error);
    res.status(500).json({ message: 'Failed to create loan payment', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update a loan payment
router.put('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    const {
      employee_id,
      loan_id,
      amount,
      payment_type,
      payment_date,
      notes
    } = req.body;

    // Validate required fields
    if (!employee_id || !loan_id || !amount || !payment_date) {
      return res.status(400).json({ message: 'Employee, loan, amount, and payment date are required' });
    }

    // Check if payment exists
    const [existingPayment] = await connection.query(
      'SELECT * FROM loan_payments WHERE payment_id = ? AND status = 1',
      [id]
    );
    
    if (existingPayment.length === 0) {
      return res.status(404).json({ message: 'Loan payment not found' });
    }
    
    // Get the original amount to calculate the difference
    const originalAmount = parseFloat(existingPayment[0].amount);
    const newAmount = parseFloat(amount);
    const amountDifference = newAmount - originalAmount;
    
    // Get the loan to update balance
    const [loan] = await connection.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [existingPayment[0].loan_id]
    );
    
    if (loan.length === 0) {
      return res.status(404).json({ message: 'Original loan not found' });
    }
    
    // Update payment
    await connection.query(
      `UPDATE loan_payments SET
        employee_id = ?,
        loan_id = ?,
        amount = ?,
        payment_type = ?,
        payment_date = ?,
        notes = ?
      WHERE payment_id = ?`,
      [
        employee_id,
        loan_id,
        amount,
        payment_type || 'CASH',
        payment_date,
        notes || '',
        id
      ]
    );
    
    // If the loan changed, update both loans' balances
    if (existingPayment[0].loan_id !== loan_id) {
      // Restore balance to the old loan
      await connection.query(
        'UPDATE loans SET balance = balance + ? WHERE loan_id = ?',
        [originalAmount, existingPayment[0].loan_id]
      );
      
      // Update balance of the new loan
      await connection.query(
        'UPDATE loans SET balance = balance - ? WHERE loan_id = ?',
        [newAmount, loan_id]
      );
    } else {
      // Update the balance of the same loan with the difference
      const currentBalance = parseFloat(loan[0].balance);
      const newBalance = Math.max(0, currentBalance - amountDifference);
      
      await connection.query(
        'UPDATE loans SET balance = ? WHERE loan_id = ?',
        [newBalance, loan_id]
      );
    }
    
    await connection.commit();
    
    res.json({
      message: 'Loan payment updated successfully',
      paymentId: id
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating loan payment:', error);
    res.status(500).json({ message: 'Failed to update loan payment', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Delete a loan payment (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;

    // Check if payment exists
    const [payment] = await connection.query(
      'SELECT * FROM loan_payments WHERE payment_id = ? AND status = 1',
      [id]
    );
    
    if (payment.length === 0) {
      return res.status(404).json({ message: 'Loan payment not found' });
    }
    
    // Get the loan to update balance
    const [loan] = await connection.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [payment[0].loan_id]
    );
    
    if (loan.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Soft delete the payment
    await connection.query(
      'UPDATE loan_payments SET status = 0 WHERE payment_id = ?',
      [id]
    );
    
    // Restore the amount to the loan balance
    const paymentAmount = parseFloat(payment[0].amount);
    const currentBalance = parseFloat(loan[0].balance);
    const newBalance = currentBalance + paymentAmount;
    
    await connection.query(
      'UPDATE loans SET balance = ? WHERE loan_id = ?',
      [newBalance, payment[0].loan_id]
    );
    
    await connection.commit();
    
    res.json({ message: 'Loan payment deleted successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error deleting loan payment:', error);
    res.status(500).json({ message: 'Failed to delete loan payment', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router; 