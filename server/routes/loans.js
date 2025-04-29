const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all loans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT l.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             st.type as loan_type_name
      FROM loans l
      LEFT JOIN employees e ON l.employee_id = e.employee_id
      LEFT JOIN system_types st ON l.loan_type = st.type_id
      WHERE l.status = 1
      ORDER BY l.date_created DESC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Failed to fetch loans', error: error.message });
  }
});

// Get loan by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT l.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             st.type as loan_type_name
      FROM loans l
      LEFT JOIN employees e ON l.employee_id = e.employee_id
      LEFT JOIN system_types st ON l.loan_type = st.type_id
      WHERE l.loan_id = ? AND l.status = 1
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Get loan statements
    const statementsQuery = `
      SELECT * FROM loan_statements
      WHERE loan_id = ? AND db_status = 1
      ORDER BY num ASC
    `;
    
    const [statements] = await pool.query(statementsQuery, [id]);
    
    const result = {
      ...results[0],
      statements: statements
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ message: 'Failed to fetch loan', error: error.message });
  }
});

// Get loans by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const query = `
      SELECT l.*, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as employee_name,
             st.type as loan_type_name
      FROM loans l
      LEFT JOIN employees e ON l.employee_id = e.employee_id
      LEFT JOIN system_types st ON l.loan_type = st.type_id
      WHERE l.employee_id = ? AND l.status = 1
      ORDER BY l.date_created DESC
    `;
    
    const [results] = await pool.query(query, [employeeId]);
    
    // Calculate total loan amount and balance
    let totalAmount = 0;
    let totalBalance = 0;
    
    results.forEach(loan => {
      totalAmount += parseFloat(loan.amount);
      totalBalance += parseFloat(loan.balance);
    });
    
    res.json({
      loans: results,
      totalAmount,
      totalBalance,
      count: results.length
    });
  } catch (error) {
    console.error('Error fetching employee loans:', error);
    res.status(500).json({ message: 'Failed to fetch employee loans', error: error.message });
  }
});

// Create a new loan
router.post('/', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { 
      employee_id, 
      description, 
      amount, 
      target_date, 
      loan_type, 
      payment_type,
      principal,
      interest_rate,
      interest_value,
      payable_by,
      advance,
      statements
    } = req.body;
    
    // Validate required fields
    if (!employee_id || !amount || !loan_type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if employee exists
    const [employee] = await connection.query(
      'SELECT * FROM employees WHERE employee_id = ?',
      [employee_id]
    );
    
    if (employee.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Insert loan
    const [result] = await connection.query(
      `INSERT INTO loans (
        employee_id, description, amount, balance, target_date, loan_type, 
        payment_type, principal, interest_rate, interest_value, payable_by, advance, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        employee_id,
        description || '',
        amount,
        amount, // Initial balance is the full amount
        target_date || null,
        loan_type,
        payment_type || 'CASH',
        principal || 0,
        interest_rate || 0,
        interest_value || 0,
        payable_by || 0,
        advance || 0
      ]
    );
    
    const loanId = result.insertId;
    
    // If statements are provided for advanced loans, insert them
    if (statements && statements.length > 0 && advance == 1) {
      for (const statement of statements) {
        await connection.query(
          `INSERT INTO loan_statements (
            employee_id, loan_id, start_date, end_date, amount, balance, 
            num, label, status, db_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            employee_id,
            loanId,
            statement.start_date,
            statement.end_date,
            statement.amount,
            statement.amount, // Initial balance is the full amount
            statement.num,
            statement.label || `Payment ${statement.num}`,
            0 // Not paid
          ]
        );
      }
    }
    // If this is an advanced loan but no statements are provided, generate them automatically
    else if (advance == 1 && payable_by > 0) {
      // Calculate payment schedule
      const totalAmount = parseFloat(amount);
      const periods = parseInt(payable_by);
      const amountPerPeriod = totalAmount / periods;
      
      // Get current date
      const currentDate = new Date();
      
      // Generate statements for each period
      for (let i = 0; i < periods; i++) {
        const periodNum = i + 1;
        
        // Calculate period dates
        // For the 1st-15th period or 16th-end of month period
        const startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() + Math.floor(i/2));
        
        if (i % 2 === 0) {
          // 1st period of month
          startDate.setDate(1);
        } else {
          // 2nd period of month
          startDate.setDate(16);
        }
        
        const endDate = new Date(startDate);
        if (i % 2 === 0) {
          // 1st period ends on 15th
          endDate.setDate(15);
        } else {
          // 2nd period ends on last day of month
          endDate.setMonth(endDate.getMonth() + 1);
          endDate.setDate(0);
        }
        
        // Format dates for SQL
        const formattedStartDate = startDate.toISOString().slice(0, 10);
        const formattedEndDate = endDate.toISOString().slice(0, 10);
        
        // Create ordinal suffix
        let suffix = 'th';
        if (periodNum === 1) suffix = 'st';
        else if (periodNum === 2) suffix = 'nd';
        else if (periodNum === 3) suffix = 'rd';
        
        await connection.query(
          `INSERT INTO loan_statements (
            employee_id, loan_id, start_date, end_date, amount, balance, 
            num, label, status, db_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            employee_id,
            loanId,
            formattedStartDate,
            formattedEndDate,
            amountPerPeriod.toFixed(2),
            amountPerPeriod.toFixed(2),
            periodNum,
            `${periodNum}${suffix} Payment`,
            0 // Not paid
          ]
        );
      }
    }
    
    await connection.commit();
    
    res.status(201).json({
      message: 'Loan created successfully',
      loanId
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating loan:', error);
    res.status(500).json({ message: 'Failed to create loan', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update a loan
router.put('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { 
      employee_id,
      description,
      amount,
      balance,
      target_date,
      loan_type,
      payment_type,
      principal,
      interest_rate,
      interest_value,
      payable_by,
      advance
    } = req.body;
    
    // Check if loan exists
    const [existing] = await connection.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Update loan
    await connection.query(
      `UPDATE loans SET
        employee_id = ?,
        description = ?,
        amount = ?,
        balance = ?,
        target_date = ?,
        loan_type = ?,
        payment_type = ?,
        principal = ?,
        interest_rate = ?,
        interest_value = ?,
        payable_by = ?,
        advance = ?
      WHERE loan_id = ?`,
      [
        employee_id,
        description || '',
        amount,
        balance || amount,
        target_date || null,
        loan_type,
        payment_type || 'CASH',
        principal || 0,
        interest_rate || 0,
        interest_value || 0,
        payable_by || 0,
        advance || 0,
        id
      ]
    );
    
    await connection.commit();
    
    res.json({ message: 'Loan updated successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating loan:', error);
    res.status(500).json({ message: 'Failed to update loan', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Delete a loan (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if loan exists
    const [existing] = await pool.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    
    // Soft delete by setting status to 0
    await pool.query(
      'UPDATE loans SET status = 0 WHERE loan_id = ?',
      [id]
    );
    
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan:', error);
    res.status(500).json({ message: 'Failed to delete loan', error: error.message });
  }
});

// Get loan types
router.get('/types/all', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT * FROM system_types
      WHERE category = 'loan_type' AND db_status = 1
      ORDER BY type ASC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loan types:', error);
    res.status(500).json({ message: 'Failed to fetch loan types', error: error.message });
  }
});

router.post('/:id/pay', authenticateToken, async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    const { amount, payment_date, payment_type, description } = req.body;
    
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Get the loan details
    const [loans] = await connection.query(
      'SELECT * FROM loans WHERE loan_id = ? AND status = 1',
      [id]
    );

    if (loans.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: 'Loan not found or already paid' });
    }

    const loan = loans[0];

    // For advance loans, distribute payment across all pending statements
    if (loan.advance === 1) {
      // Get all pending statements
      const [statements] = await connection.query(
        `SELECT * FROM loan_statements 
         WHERE loan_id = ? AND status = 0 AND db_status = 1
         ORDER BY num ASC`,
        [id]
      );

      if (statements.length === 0) {
        await connection.rollback();
        return res.status(400).json({ message: 'No pending statements to pay' });
      }

      const totalPendingAmount = statements.reduce((sum, stmt) => sum + parseFloat(stmt.balance), 0);
      
      // Check if payment amount is valid
      if (parseFloat(amount) > totalPendingAmount) {
        await connection.rollback();
        return res.status(400).json({ 
          message: `Payment amount exceeds total pending amount of ${totalPendingAmount}` 
        });
      }

      let remainingPayment = parseFloat(amount);
      
      // Distribute payment across statements
      for (const statement of statements) {
        if (remainingPayment <= 0) break;

        const statementBalance = parseFloat(statement.balance);
        const paymentForStatement = Math.min(remainingPayment, statementBalance);
        
        // Update statement balance and status
        const newBalance = statementBalance - paymentForStatement;
        const isPaid = newBalance <= 0;
        
        await connection.query(
          `UPDATE loan_statements 
           SET balance = ?, 
               status = ?,
               payment_date = ?
           WHERE statement_id = ? AND db_status = 1`,
          [newBalance, isPaid ? 1 : 0, isPaid ? payment_date : null, statement.statement_id]
        );

        remainingPayment -= paymentForStatement;
      }

      // Update loan balance
      const newBalance = parseFloat(loan.balance) - parseFloat(amount);
      await connection.query(
        'UPDATE loans SET balance = ? WHERE loan_id = ?',
        [newBalance, id]
      );

      // Check if all statements are paid
      const [remainingStatements] = await connection.query(
        'SELECT COUNT(*) as count FROM loan_statements WHERE loan_id = ? AND status = 0 AND db_status = 1',
        [id]
      );

      if (remainingStatements[0].count === 0) {
        await connection.query(
          'UPDATE loans SET status = 0 WHERE loan_id = ?',
          [id]
        );
      }
    } else {
      // For regular loans, just update the balance
      const newBalance = parseFloat(loan.balance) - parseFloat(amount);
      await connection.query(
        'UPDATE loans SET balance = ? WHERE loan_id = ?',
        [newBalance, id]
      );

      // If balance is 0, mark loan as paid
      if (newBalance <= 0) {
        await connection.query(
          'UPDATE loans SET status = 0 WHERE loan_id = ?',
          [id]
        );
      }
    }

    // Insert payment record
    const [result] = await connection.query(
      `INSERT INTO loan_payments (
        loan_id, employee_id, amount, payment_date, payment_type, 
        description, status, db_status
      ) VALUES (?, ?, ?, ?, ?, ?, 1, 1)`,
      [id, loan.employee_id, amount, payment_date, payment_type, description]
    );

    await connection.commit();
    res.json({ message: 'Payment recorded successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error processing loan payment:', error);
    res.status(500).json({ message: 'Error processing payment' });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router; 