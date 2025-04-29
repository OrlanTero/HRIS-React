const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { Bank } = require('../models');

const router = express.Router();

// Get all banks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [banks] = await pool.query(
      'SELECT * FROM banks WHERE archive_id IS NULL'
    );
    
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bank by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [banks] = await pool.query(
      'SELECT * FROM banks WHERE bank_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (banks.length === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    
    res.json(banks[0]);
  } catch (error) {
    console.error(`Error fetching bank ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new bank
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, branch } = req.body;
    
    if (!name || !branch) {
      return res.status(400).json({ message: 'Bank name and branch are required' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO banks (name, branch, date_created) VALUES (?, ?, NOW())',
      [name, branch]
    );
    
    const newBankId = result.insertId;
    
    const [newBank] = await pool.query(
      'SELECT * FROM banks WHERE bank_id = ?',
      [newBankId]
    );
    
    res.status(201).json(newBank[0]);
  } catch (error) {
    console.error('Error creating bank:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a bank
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, branch } = req.body;
    
    if (!name || !branch) {
      return res.status(400).json({ message: 'Bank name and branch are required' });
    }
    
    const [checkResult] = await pool.query(
      'SELECT * FROM banks WHERE bank_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    
    await pool.query(
      'UPDATE banks SET name = ?, branch = ? WHERE bank_id = ?',
      [name, branch, id]
    );
    
    const [updatedBank] = await pool.query(
      'SELECT * FROM banks WHERE bank_id = ?',
      [id]
    );
    
    res.json(updatedBank[0]);
  } catch (error) {
    console.error(`Error updating bank ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a bank
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const archiveId = `archived_${Date.now()}`;
    
    const [checkResult] = await pool.query(
      'SELECT * FROM banks WHERE bank_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    
    // Check if bank is used in any bank accounts
    const [bankAccounts] = await pool.query(
      'SELECT * FROM bank_accounts WHERE bank_id = ? AND active = 1 LIMIT 1',
      [id]
    );
    
    if (bankAccounts.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete bank as it is being used by one or more employees'
      });
    }
    
    // Soft delete by setting archive_id
    await pool.query(
      'UPDATE banks SET archive_id = ? WHERE bank_id = ?',
      [archiveId, id]
    );
    
    res.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    console.error(`Error deleting bank ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 