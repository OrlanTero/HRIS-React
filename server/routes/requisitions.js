const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { generateRequisitionID } = require('../utils/idGenerator');

// Get all requisitions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT r.*, CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as requested_by
      FROM requisition r
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE r.db_status = 1
      ORDER BY r.date DESC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ message: 'Failed to fetch requisitions', error: error.message });
  }
});

// Get requisition by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get the requisition
    const query = `
      SELECT r.*, CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as requested_by
      FROM requisition r
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE r.requisition_id = ? AND r.db_status = 1
    `;
    
    const [requisition] = await pool.query(query, [id]);
    
    if (requisition.length === 0) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    
    // Get requisition info (items/details)
    const infoQuery = `
      SELECT * FROM requisition_info
      WHERE requisition_id = ? AND db_status = 1
    `;
    
    const [requisitionInfo] = await pool.query(infoQuery, [id]);
    
    // Combine the results
    const result = {
      ...requisition[0],
      items: requisitionInfo
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching requisition:', error);
    res.status(500).json({ message: 'Failed to fetch requisition', error: error.message });
  }
});

// Get requisitions by type
router.get('/type/:type', authenticateToken, async (req, res) => {
  try {
    const { type } = req.params;
    
    const query = `
      SELECT r.*, CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as requested_by
      FROM requisition r
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE r.type = ? AND r.db_status = 1
      ORDER BY r.date DESC
    `;
    
    const [results] = await pool.query(query, [type]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching requisitions by type:', error);
    res.status(500).json({ message: 'Failed to fetch requisitions', error: error.message });
  }
});

// Get requisitions by status
router.get('/status/:status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.params;
    
    const query = `
      SELECT r.*, CONCAT(IFNULL(e.firstname, ''), ' ', IFNULL(e.lastname, '')) as requested_by
      FROM requisition r
      LEFT JOIN employees e ON r.paid_to = e.employee_id
      WHERE r.status = ? AND r.db_status = 1
      ORDER BY r.date DESC
    `;
    
    const [results] = await pool.query(query, [status]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching requisitions by status:', error);
    res.status(500).json({ message: 'Failed to fetch requisitions', error: error.message });
  }
});

// Create a new requisition with items
router.post('/', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    let { 
      req_id, 
      date, 
      remarks, 
      type, 
      status, 
      paid_to, 
      amount, 
      req_date, 
      items 
    } = req.body;
    
    // Auto-generate req_id if not provided
    if (!req_id) {
      req_id = await generateRequisitionID();
    }
    
    // Check required fields
    if (!date || !type || !status || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Insert requisition
    const [result] = await connection.query(
      `INSERT INTO requisition (
        req_id, date, remarks, type, status, paid_to, amount, req_date, db_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [req_id, date, remarks, type, status, paid_to, amount, req_date || date]
    );
    
    const requisitionId = result.insertId;
    
    // Insert requisition items if provided
    if (items && items.length > 0) {
      for (const item of items) {
        await connection.query(
          `INSERT INTO requisition_info (
            requisition_id, requisition_type, particulars, quantity, unit, unit_price, amount, db_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            requisitionId,
            item.requisition_type || 0, // 0 for expense, 1 for less
            item.particulars,
            item.quantity,
            item.unit,
            item.unit_price,
            item.amount,
          ]
        );
      }
    }
    
    await connection.commit();
    
    res.status(201).json({ 
      message: 'Requisition created successfully', 
      requisitionId,
      req_id
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error creating requisition:', error);
    res.status(500).json({ message: 'Failed to create requisition', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update an existing requisition
router.put('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { 
      req_id, 
      date, 
      remarks, 
      type, 
      status, 
      paid_to, 
      amount, 
      req_date, 
      items 
    } = req.body;
    
    // Check if requisition exists
    const [existing] = await connection.query(
      'SELECT * FROM requisition WHERE requisition_id = ? AND db_status = 1',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    
    // Update requisition
    await connection.query(
      `UPDATE requisition SET
        req_id = ?,
        date = ?,
        remarks = ?,
        type = ?,
        status = ?,
        paid_to = ?,
        amount = ?,
        req_date = ?
      WHERE requisition_id = ?`,
      [req_id, date, remarks, type, status, paid_to, amount, req_date || date, id]
    );
    
    // If items are provided, update them
    if (items) {
      // First, mark all existing items as deleted
      await connection.query(
        'UPDATE requisition_info SET db_status = 0 WHERE requisition_id = ?',
        [id]
      );
      
      // Then insert the new items
      for (const item of items) {
        if (item.requisition_info_id) {
          // Update existing item
          await connection.query(
            `UPDATE requisition_info SET
              requisition_type = ?,
              particulars = ?,
              quantity = ?,
              unit = ?,
              unit_price = ?,
              amount = ?,
              db_status = 1
            WHERE requisition_info_id = ?`,
            [
              item.requisition_type || 0,
              item.particulars,
              item.quantity,
              item.unit,
              item.unit_price,
              item.amount,
              item.requisition_info_id
            ]
          );
        } else {
          // Insert new item
          await connection.query(
            `INSERT INTO requisition_info (
              requisition_id, requisition_type, particulars, quantity, unit, unit_price, amount, db_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
            [
              id,
              item.requisition_type || 0,
              item.particulars,
              item.quantity,
              item.unit,
              item.unit_price,
              item.amount
            ]
          );
        }
      }
    }
    
    await connection.commit();
    
    res.json({ message: 'Requisition updated successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error updating requisition:', error);
    res.status(500).json({ message: 'Failed to update requisition', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update requisition status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    // Check if requisition exists
    const [existing] = await pool.query(
      'SELECT * FROM requisition WHERE requisition_id = ? AND db_status = 1',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    
    // Update status
    await pool.query(
      'UPDATE requisition SET status = ? WHERE requisition_id = ?',
      [status, id]
    );
    
    res.json({ message: 'Requisition status updated successfully' });
  } catch (error) {
    console.error('Error updating requisition status:', error);
    res.status(500).json({ message: 'Failed to update requisition status', error: error.message });
  }
});

// Delete a requisition (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const { id } = req.params;
    
    // Check if requisition exists
    const [existing] = await connection.query(
      'SELECT * FROM requisition WHERE requisition_id = ? AND db_status = 1',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    
    // Soft delete requisition
    await connection.query(
      'UPDATE requisition SET db_status = 0 WHERE requisition_id = ?',
      [id]
    );
    
    // Soft delete all related requisition info
    await connection.query(
      'UPDATE requisition_info SET db_status = 0 WHERE requisition_id = ?',
      [id]
    );
    
    await connection.commit();
    
    res.json({ message: 'Requisition deleted successfully' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error deleting requisition:', error);
    res.status(500).json({ message: 'Failed to delete requisition', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router; 