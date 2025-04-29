const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all mortuary payments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT mp.*, b.name as beneficiary_name, 
        CONCAT(e.firstname, ' ', e.lastname) as employee_name,
        e.employee_no, m.period, m.year
      FROM mortuary_payments mp
      JOIN beneficiaries b ON mp.beneficiary_id = b.beneficiary_id
      JOIN employees e ON mp.employee_id = e.employee_id
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE mp.archive_id IS NULL
      ORDER BY mp.date_created DESC
    `;
    
    const [payments] = await pool.query(query);
    res.json(payments);
  } catch (error) {
    console.error('Error fetching mortuary payments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get mortuary payment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT mp.*, b.name as beneficiary_name, 
        CONCAT(e.firstname, ' ', e.lastname) as employee_name,
        e.employee_no, m.period, m.year
      FROM mortuary_payments mp
      JOIN beneficiaries b ON mp.beneficiary_id = b.beneficiary_id
      JOIN employees e ON mp.employee_id = e.employee_id
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE mp.payment_id = ? AND mp.archive_id IS NULL
    `;
    
    const [payments] = await pool.query(query, [id]);
    
    if (payments.length === 0) {
      return res.status(404).json({ message: 'Mortuary payment not found' });
    }
    
    res.json(payments[0]);
  } catch (error) {
    console.error(`Error fetching mortuary payment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get payments by beneficiary ID
router.get('/beneficiary/:beneficiaryId', authenticateToken, async (req, res) => {
  try {
    const { beneficiaryId } = req.params;
    
    // First check if beneficiary exists
    const beneficiaryQuery = `
      SELECT * FROM beneficiaries WHERE beneficiary_id = ? AND archive_id IS NULL
    `;
    
    const [beneficiaries] = await pool.query(beneficiaryQuery, [beneficiaryId]);
    
    if (beneficiaries.length === 0) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    
    const query = `
      SELECT mp.*, b.name as beneficiary_name, 
        CONCAT(e.firstname, ' ', e.lastname) as employee_name,
        e.employee_no
      FROM mortuary_payments mp
      JOIN beneficiaries b ON mp.beneficiary_id = b.beneficiary_id
      JOIN employees e ON mp.employee_id = e.employee_id
      WHERE mp.beneficiary_id = ? AND mp.archive_id IS NULL
      ORDER BY mp.date_created DESC
    `;
    
    const [payments] = await pool.query(query, [beneficiaryId]);
    res.json(payments);
  } catch (error) {
    console.error(`Error fetching mortuary payments for beneficiary ${req.params.beneficiaryId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get payments by employee ID
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
      SELECT mp.*, b.name as beneficiary_name, 
        CONCAT(e.firstname, ' ', e.lastname) as employee_name,
        e.employee_no, m.period, m.year
      FROM mortuary_payments mp
      JOIN beneficiaries b ON mp.beneficiary_id = b.beneficiary_id
      JOIN employees e ON mp.employee_id = e.employee_id
      JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
      WHERE mp.employee_id = ? AND mp.archive_id IS NULL
      ORDER BY mp.date_created DESC
    `;
    
    const [payments] = await pool.query(query, [employeeId]);
    res.json(payments);
  } catch (error) {
    console.error(`Error fetching mortuary payments for employee ${req.params.employeeId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new mortuary payment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { beneficiary_id, employee_id, amount, status = 'PAID' } = req.body;
    
    // Validate required fields
    if (!beneficiary_id || !employee_id || !amount) {
      return res.status(400).json({ 
        message: 'Beneficiary ID, employee ID, and amount are required'
      });
    }
    
    // Check if beneficiary exists
    const beneficiaryQuery = `
      SELECT * FROM beneficiaries WHERE beneficiary_id = ? AND archive_id IS NULL
    `;
    
    const [beneficiaries] = await pool.query(beneficiaryQuery, [beneficiary_id]);
    
    if (beneficiaries.length === 0) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    
    // Check if employee exists
    const employeeQuery = `
      SELECT * FROM employees WHERE employee_id = ?
    `;
    
    const [employees] = await pool.query(employeeQuery, [employee_id]);
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Insert payment
    const insertQuery = `
      INSERT INTO mortuary_payments (beneficiary_id, employee_id, amount, status, date_created)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    const [result] = await pool.query(
      insertQuery, 
      [beneficiary_id, employee_id, amount, status]
    );
    
    res.status(201).json({
      message: 'Mortuary payment created successfully',
      payment_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating mortuary payment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update mortuary payment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, status } = req.body;
    
    // Validate required fields
    if (!amount || !status) {
      return res.status(400).json({ message: 'Amount and status are required' });
    }
    
    // Check if payment exists
    const checkQuery = `
      SELECT * FROM mortuary_payments WHERE payment_id = ? AND archive_id IS NULL
    `;
    
    const [payments] = await pool.query(checkQuery, [id]);
    
    if (payments.length === 0) {
      return res.status(404).json({ message: 'Mortuary payment not found' });
    }
    
    // Update payment
    const updateQuery = `
      UPDATE mortuary_payments SET
        amount = ?,
        status = ?
      WHERE payment_id = ?
    `;
    
    await pool.query(updateQuery, [amount, status, id]);
    
    res.json({ message: 'Mortuary payment updated successfully' });
  } catch (error) {
    console.error(`Error updating mortuary payment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete mortuary payment (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if payment exists
    const checkQuery = `
      SELECT * FROM mortuary_payments WHERE payment_id = ? AND archive_id IS NULL
    `;
    
    const [payments] = await pool.query(checkQuery, [id]);
    
    if (payments.length === 0) {
      return res.status(404).json({ message: 'Mortuary payment not found' });
    }
    
    // Soft delete the payment
    const deleteQuery = `
      UPDATE mortuary_payments SET
        archive_id = 1
      WHERE payment_id = ?
    `;
    
    await pool.query(deleteQuery, [id]);
    
    res.json({ message: 'Mortuary payment deleted successfully' });
  } catch (error) {
    console.error(`Error deleting mortuary payment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 