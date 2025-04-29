const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { Client } = require('../models');

const router = express.Router();

// Get all clients
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE archive_id IS NULL'
    );
    
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (clients.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json(clients[0]);
  } catch (error) {
    console.error(`Error fetching client ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new client
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name, branch, region, mobile, telephone, email, person,
      w_pagibig, address, vat, swfee_1, swfee_2, swfee_3,
      agency_1, agency_2, agency_3, regular, overtime, month,
      regular_1, overtime_1, month_1, regular_2, overtime_2,
      nightdiff, sea, cola, leave_1, uniform, allowance,
      head_guard_allowance, ctpa, legal_holiday, special_holiday,
      restday, legal_holiday_ot, special_holiday_ot, restday_ot
    } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Client name is required' });
    }
    
    const query = `
      INSERT INTO clients (
        name, branch, region, mobile, telephone, email, person,
        w_pagibig, address, vat, swfee_1, swfee_2, swfee_3,
        agency_1, agency_2, agency_3, regular, overtime, month,
        regular_1, overtime_1, month_1, regular_2, overtime_2,
        nightdiff, sea, cola, leave_1, uniform, allowance,
        head_guard_allowance, ctpa, legal_holiday, special_holiday,
        restday, legal_holiday_ot, special_holiday_ot, restday_ot, date_created
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, NOW()
      )
    `;
    
    const values = [
      name, branch || '', region || '', mobile || '', telephone || '', email || '', person || '',
      w_pagibig || '', address || '', vat || '', swfee_1 || 0, swfee_2 || 0, swfee_3 || 0,
      agency_1 || 0, agency_2 || 0, agency_3 || 0, regular || 0, overtime || 0, month || 0,
      regular_1 || 0, overtime_1 || 0, month_1 || 0, regular_2 || 0, overtime_2 || 0,
      nightdiff || 0, sea || 0, cola || 0, leave_1 || 0, uniform || 0, allowance || 0,
      head_guard_allowance || 0, ctpa || 0, legal_holiday || 0, special_holiday || 0,
      restday || 0, legal_holiday_ot || 0, special_holiday_ot || 0, restday_ot || 0
    ];
    
    const [result] = await pool.query(query, values);
    
    const newClientId = result.insertId;
    
    const [newClient] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ?',
      [newClientId]
    );
    
    res.status(201).json(newClient[0]);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a client
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, branch, region, mobile, telephone, email, person,
      w_pagibig, address, vat, swfee_1, swfee_2, swfee_3,
      agency_1, agency_2, agency_3, regular, overtime, month,
      regular_1, overtime_1, month_1, regular_2, overtime_2,
      nightdiff, sea, cola, leave_1, uniform, allowance,
      head_guard_allowance, ctpa, legal_holiday, special_holiday,
      restday, legal_holiday_ot, special_holiday_ot, restday_ot
    } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Client name is required' });
    }
    
    const [checkResult] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    const query = `
      UPDATE clients SET
        name = ?, branch = ?, region = ?, mobile = ?, telephone = ?, email = ?, person = ?,
        w_pagibig = ?, address = ?, vat = ?, swfee_1 = ?, swfee_2 = ?, swfee_3 = ?,
        agency_1 = ?, agency_2 = ?, agency_3 = ?, regular = ?, overtime = ?, month = ?,
        regular_1 = ?, overtime_1 = ?, month_1 = ?, regular_2 = ?, overtime_2 = ?,
        nightdiff = ?, sea = ?, cola = ?, leave_1 = ?, uniform = ?, allowance = ?,
        head_guard_allowance = ?, ctpa = ?, legal_holiday = ?, special_holiday = ?,
        restday = ?, legal_holiday_ot = ?, special_holiday_ot = ?, restday_ot = ?
      WHERE client_id = ?
    `;
    
    const values = [
      name, branch || '', region || '', mobile || '', telephone || '', email || '', person || '',
      w_pagibig || '', address || '', vat || '', swfee_1 || 0, swfee_2 || 0, swfee_3 || 0,
      agency_1 || 0, agency_2 || 0, agency_3 || 0, regular || 0, overtime || 0, month || 0,
      regular_1 || 0, overtime_1 || 0, month_1 || 0, regular_2 || 0, overtime_2 || 0,
      nightdiff || 0, sea || 0, cola || 0, leave_1 || 0, uniform || 0, allowance || 0,
      head_guard_allowance || 0, ctpa || 0, legal_holiday || 0, special_holiday || 0,
      restday || 0, legal_holiday_ot || 0, special_holiday_ot || 0, restday_ot || 0,
      id
    ];
    
    await pool.query(query, values);
    
    const [updatedClient] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ?',
      [id]
    );
    
    res.json(updatedClient[0]);
  } catch (error) {
    console.error(`Error updating client ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a client
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const archiveId = `archived_${Date.now()}`;
    
    const [checkResult] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Check if client has deployed employees
    const [deployedEmployees] = await pool.query(
      'SELECT * FROM deployed_employees WHERE client_id = ? AND archive_id IS NULL LIMIT 1',
      [id]
    );
    
    if (deployedEmployees.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete client as it has deployed employees'
      });
    }
    
    // Soft delete by setting archive_id
    await pool.query(
      'UPDATE clients SET archive_id = ? WHERE client_id = ?',
      [archiveId, id]
    );
    
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error(`Error deleting client ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 