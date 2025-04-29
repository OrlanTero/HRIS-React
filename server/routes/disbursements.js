const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { generateDisbursementID } = require('../utils/idGenerator');

// Get all disbursements
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT d.*, r.req_id, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as paid_to
      FROM disbursement d
      LEFT JOIN requisition r ON d.requisition_id = r.requisition_id
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE d.cancelled = 2
      ORDER BY d.date DESC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching disbursements:', error);
    res.status(500).json({ message: 'Failed to fetch disbursements', error: error.message });
  }
});

// Get disbursement by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT d.*, r.req_id, r.remarks as requisition_remarks, r.amount as requisition_amount,
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as paid_to
      FROM disbursement d
      LEFT JOIN requisition r ON d.requisition_id = r.requisition_id
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE d.disbursement_id = ? AND d.cancelled = 2
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Disbursement not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching disbursement:', error);
    res.status(500).json({ message: 'Failed to fetch disbursement', error: error.message });
  }
});

// Get disbursements by requisition ID
router.get('/requisition/:requisitionId', authenticateToken, async (req, res) => {
  try {
    const { requisitionId } = req.params;
    
    const query = `
      SELECT d.*, r.req_id, 
             CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as paid_to
      FROM disbursement d
      LEFT JOIN requisition r ON d.requisition_id = r.requisition_id
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE d.requisition_id = ? AND d.cancelled = 2
      ORDER BY d.date DESC
    `;
    
    const [results] = await pool.query(query, [requisitionId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching disbursements by requisition:', error);
    res.status(500).json({ message: 'Failed to fetch disbursements', error: error.message });
  }
});

// Create a new disbursement
router.post('/', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    let { 
      requisition_id, 
      voucher, 
      date, 
      posted, 
      payments, 
      amount, 
      request, 
      bank_id, 
      cheque_number, 
      cheque_date 
    } = req.body;
    
    // Auto-generate voucher if not provided
    if (!voucher) {
      voucher = await generateDisbursementID();
    }
    
    // Validate required fields
    if (!requisition_id || !date || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if requisition exists
    const [requisition] = await connection.query(
      'SELECT * FROM requisition WHERE requisition_id = ? AND db_status = 1',
      [requisition_id]
    );
    
    if (requisition.length === 0) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    
    // Insert disbursement
    const [result] = await connection.query(
      `INSERT INTO disbursement (
        requisition_id, voucher, date, posted, cancelled, payments, amount, request, 
        bank_id, cheque_number, cheque_date
      ) VALUES (?, ?, ?, ?, 2, ?, ?, ?, ?, ?, ?)`,
      [
        requisition_id, 
        voucher, 
        date, 
        posted || 2, // Default to not posted (2)
        payments || '',
        amount,
        request || '',
        bank_id || 0,
        cheque_number || '',
        cheque_date || null
      ]
    );
    
    // Update requisition status if needed
    if (requisition[0].status === 'pending' || requisition[0].status === 'approved') {
      await connection.query(
        'UPDATE requisition SET status = ? WHERE requisition_id = ?',
        ['processing', requisition_id]
      );
    }
    
    await connection.commit();
    
    res.status(201).json({ 
      message: 'Disbursement created successfully', 
      disbursementId: result.insertId,
      voucher
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating disbursement:', error);
    res.status(500).json({ message: 'Failed to create disbursement', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update a disbursement
router.put('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { 
      requisition_id, 
      voucher, 
      date, 
      posted, 
      payments, 
      amount, 
      request, 
      bank_id, 
      cheque_number, 
      cheque_date 
    } = req.body;
    
    // Check if disbursement exists
    const [existing] = await connection.query(
      'SELECT * FROM disbursement WHERE disbursement_id = ? AND cancelled = 2',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Disbursement not found' });
    }
    
    // Update disbursement
    await connection.query(
      `UPDATE disbursement SET
        requisition_id = ?,
        voucher = ?,
        date = ?,
        posted = ?,
        payments = ?,
        amount = ?,
        request = ?,
        bank_id = ?,
        cheque_number = ?,
        cheque_date = ?
      WHERE disbursement_id = ?`,
      [
        requisition_id, 
        voucher, 
        date, 
        posted || 2,
        payments || '',
        amount,
        request || '',
        bank_id || 0,
        cheque_number || '',
        cheque_date || null,
        id
      ]
    );
    
    await connection.commit();
    
    res.json({ message: 'Disbursement updated successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating disbursement:', error);
    res.status(500).json({ message: 'Failed to update disbursement', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update disbursement status (post/unpost)
router.put('/:id/status', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { posted } = req.body;
    
    if (posted === undefined) {
      return res.status(400).json({ message: 'Posted status is required' });
    }
    
    // Check if disbursement exists
    const [existing] = await connection.query(
      'SELECT d.*, r.requisition_id FROM disbursement d LEFT JOIN requisition r ON d.requisition_id = r.requisition_id WHERE d.disbursement_id = ? AND d.cancelled = 2',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Disbursement not found' });
    }
    
    // Update disbursement
    await connection.query(
      'UPDATE disbursement SET posted = ? WHERE disbursement_id = ?',
      [posted, id]
    );
    
    // Update requisition status if disbursement is posted
    if (posted === 1 && existing[0].requisition_id) {
      await connection.query(
        'UPDATE requisition SET status = ? WHERE requisition_id = ?',
        ['completed', existing[0].requisition_id]
      );
    }
    
    await connection.commit();
    
    res.json({ message: 'Disbursement status updated successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating disbursement status:', error);
    res.status(500).json({ message: 'Failed to update disbursement status', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Cancel a disbursement (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    
    // Check if disbursement exists
    const [existing] = await connection.query(
      'SELECT d.*, r.requisition_id FROM disbursement d LEFT JOIN requisition r ON d.requisition_id = r.requisition_id WHERE d.disbursement_id = ? AND d.cancelled = 2',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Disbursement not found' });
    }
    
    // Soft delete disbursement by setting cancelled to 1
    await connection.query(
      'UPDATE disbursement SET cancelled = 1 WHERE disbursement_id = ?',
      [id]
    );
    
    // If the disbursement was for a requisition, update the requisition status back to approved
    if (existing[0].requisition_id) {
      await connection.query(
        'UPDATE requisition SET status = ? WHERE requisition_id = ?',
        ['approved', existing[0].requisition_id]
      );
    }
    
    await connection.commit();
    
    res.json({ message: 'Disbursement cancelled successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error cancelling disbursement:', error);
    res.status(500).json({ message: 'Failed to cancel disbursement', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router; 