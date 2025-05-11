const express = require('express');
const router = express.Router();
const pool = require('../config/database.js');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Get all loan types
router.get('/loanTypes', async (req, res) => {
  const query = `
    SELECT type_id as id, type as name, category, affects_in, affects_value, date_created as created_at 
    FROM system_types 
    WHERE category = 'loan_type'
    ORDER BY type
  `;
  
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching loan types:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch loan types', 
      details: error.message 
    });
  }
});

// Add new loan type
router.post('/loanTypes', async (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const query = `
    INSERT INTO system_types (type, category, affects_in, affects_value)
    VALUES (?, 'loan_type', 0, 0)
  `;
  
  try {
    const [results] = await pool.query(query, [name]);
    res.status(201).json({ 
      id: results.insertId,
      message: 'Loan type added successfully' 
    });
  } catch (error) {
    console.error('Error adding loan type:', error);
    return res.status(500).json({ 
      error: 'Failed to add loan type', 
      details: error.message 
    });
  }
});

// Delete loan type
router.delete('/loanTypes/:id', async (req, res) => {
  const id = req.params.id;
  
  // First check if loan type is used in loans
  const checkQuery = `
    SELECT COUNT(*) as count 
    FROM loans 
    WHERE loan_type_id = ?
  `;
  
  try {
    const [checkResults] = await pool.query(checkQuery, [id]);
    
    if (checkResults[0].count > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete loan type that is in use by existing loans' 
      });
    }
    
    // If not in use, proceed with deletion
    const deleteQuery = `
      DELETE FROM system_types 
      WHERE type_id = ? AND category = 'loan_type'
    `;
    
    const [deleteResults] = await pool.query(deleteQuery, [id]);
    
    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ error: 'Loan type not found' });
    }
    
    res.json({ message: 'Loan type deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan type:', error);
    return res.status(500).json({ 
      error: 'Failed to delete loan type', 
      details: error.message 
    });
  }
});

// Get all expense types
router.get('/expenseTypes', async (req, res) => {
  const query = `
    SELECT type_id as id, type as name, category, affects_in, affects_value, date_created as created_at 
    FROM system_types 
    WHERE category = 'expense_type'
    ORDER BY type
  `;
  
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching expense types:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch expense types', 
      details: error.message 
    });
  }
});

// Add new expense type
router.post('/expenseTypes', async (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const query = `
    INSERT INTO system_types (type, category, affects_in, affects_value)
    VALUES (?, 'expense_type', 0, 0)
  `;
  
  try {
    const [results] = await pool.query(query, [name]);
    res.status(201).json({ 
      id: results.insertId,
      message: 'Expense type added successfully' 
    });
  } catch (error) {
    console.error('Error adding expense type:', error);
    return res.status(500).json({ 
      error: 'Failed to add expense type', 
      details: error.message 
    });
  }
});

// Delete expense type
router.delete('/expenseTypes/:id', async (req, res) => {
  const id = req.params.id;
  
  // Check if expense type is in use
  const checkQuery = `
    SELECT COUNT(*) as count 
    FROM expenses 
    WHERE expense_type_id = ?
  `;
  
  try {
    const [checkResults] = await pool.query(checkQuery, [id]);
    
    if (checkResults[0].count > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete expense type that is in use by existing expenses' 
      });
    }
    
    // If not in use, proceed with deletion
    const deleteQuery = `
      DELETE FROM system_types 
      WHERE type_id = ? AND category = 'expense_type'
    `;
    
    const [deleteResults] = await pool.query(deleteQuery, [id]);
    
    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ error: 'Expense type not found' });
    }
    
    res.json({ message: 'Expense type deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense type:', error);
    return res.status(500).json({ 
      error: 'Failed to delete expense type', 
      details: error.message 
    });
  }
});

// Get SSS contributions
router.get('/sss', async (req, res) => {
  const query = `
    SELECT service_deduction_id as id, price_from as minimum, price_to as maximum, 
           er as employer_share, ee as employee_share, created_at 
    FROM service_deductions 
    WHERE category = 'sss'
    ORDER BY price_from
  `;
  
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching SSS contributions:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch SSS contributions', 
      details: error.message 
    });
  }
});

// Add new SSS contribution
router.post('/sss', async (req, res) => {
  const { minimum, maximum, employee_share, employer_share } = req.body;
  
  if (!minimum || !maximum || !employee_share || !employer_share) {
    return res.status(400).json({ 
      error: 'All fields (minimum, maximum, employee_share, employer_share) are required' 
    });
  }
  
  const query = `
    INSERT INTO service_deductions (price_from, price_to, er, ee, category, msc)
    VALUES (?, ?, ?, ?, 'sss', ?)
  `;
  
  try {
    // MSC is often the average of the range for SSS
    const msc = (parseFloat(minimum) + parseFloat(maximum)) / 2;
    
    const [results] = await pool.query(
      query, 
      [minimum, maximum, employer_share, employee_share, msc]
    );
    res.status(201).json({ 
      id: results.insertId,
      message: 'SSS contribution added successfully' 
    });
  } catch (error) {
    console.error('Error adding SSS contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to add SSS contribution', 
      details: error.message 
    });
  }
});

// Delete SSS contribution
router.delete('/sss/:id', async (req, res) => {
  const id = req.params.id;
  
  const deleteQuery = `
    DELETE FROM service_deductions 
    WHERE service_deduction_id = ? AND category = 'sss'
  `;
  
  try {
    const [deleteResults] = await pool.query(deleteQuery, [id]);
    
    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ error: 'SSS contribution not found' });
    }
    
    res.json({ message: 'SSS contribution deleted successfully' });
  } catch (error) {
    console.error('Error deleting SSS contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to delete SSS contribution', 
      details: error.message 
    });
  }
});

// Get PhilHealth contributions
router.get('/ph', async (req, res) => {
  const query = `
    SELECT service_deduction_id as id, price_from as minimum, price_to as maximum, 
           msc as percentage, created_at 
    FROM service_deductions 
    WHERE category = 'phil'
    ORDER BY price_from
  `;
  
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching PhilHealth contributions:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch PhilHealth contributions', 
      details: error.message 
    });
  }
});

// Add new PhilHealth contribution
router.post('/ph', async (req, res) => {
  const { minimum, maximum, percentage } = req.body;
  
  if (!minimum || !maximum || !percentage) {
    return res.status(400).json({ 
      error: 'All fields (minimum, maximum, percentage) are required' 
    });
  }
  
  const query = `
    INSERT INTO service_deductions (price_from, price_to, msc, category, er, ee)
    VALUES (?, ?, ?, 'phil', ?, ?)
  `;
  
  try {
    // For Philhealth, we typically split the percentage between employer and employee
    const halfPercentage = parseFloat(percentage) / 2;
    
    const [results] = await pool.query(
      query, 
      [minimum, maximum, percentage, halfPercentage, halfPercentage]
    );
    res.status(201).json({ 
      id: results.insertId,
      message: 'PhilHealth contribution added successfully' 
    });
  } catch (error) {
    console.error('Error adding PhilHealth contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to add PhilHealth contribution', 
      details: error.message 
    });
  }
});

// Delete PhilHealth contribution
router.delete('/ph/:id', async (req, res) => {
  const id = req.params.id;
  
  const deleteQuery = `
    DELETE FROM service_deductions 
    WHERE service_deduction_id = ? AND category = 'phil'
  `;
  
  try {
    const [deleteResults] = await pool.query(deleteQuery, [id]);
    
    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ error: 'PhilHealth contribution not found' });
    }
    
    res.json({ message: 'PhilHealth contribution deleted successfully' });
  } catch (error) {
    console.error('Error deleting PhilHealth contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to delete PhilHealth contribution', 
      details: error.message 
    });
  }
});

// Get Pag-ibig contributions
router.get('/pagibig', async (req, res) => {
  const query = `
    SELECT service_deduction_id as id, price_from as minimum, price_to as maximum, 
           er as employer_share, ee as employee_share, created_at 
    FROM service_deductions 
    WHERE category = 'pagibig'
    ORDER BY price_from
  `;
  
  try {
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching Pag-ibig contributions:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Pag-ibig contributions', 
      details: error.message 
    });
  }
});

// Add new Pag-ibig contribution
router.post('/pagibig', async (req, res) => {
  const { minimum, maximum, employee_share, employer_share } = req.body;
  
  if (!minimum || !maximum || !employee_share || !employer_share) {
    return res.status(400).json({ 
      error: 'All fields (minimum, maximum, employee_share, employer_share) are required' 
    });
  }
  
  const query = `
    INSERT INTO service_deductions (price_from, price_to, er, ee, category, msc)
    VALUES (?, ?, ?, ?, 'pagibig', ?)
  `;
  
  try {
    // MSC can be calculated similarly to SSS
    const msc = (parseFloat(minimum) + parseFloat(maximum)) / 2;
    
    const [results] = await pool.query(
      query, 
      [minimum, maximum, employer_share, employee_share, msc]
    );
    res.status(201).json({ 
      id: results.insertId,
      message: 'Pag-ibig contribution added successfully' 
    });
  } catch (error) {
    console.error('Error adding Pag-ibig contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to add Pag-ibig contribution', 
      details: error.message 
    });
  }
});

// Delete Pag-ibig contribution
router.delete('/pagibig/:id', async (req, res) => {
  const id = req.params.id;
  
  const deleteQuery = `
    DELETE FROM service_deductions 
    WHERE service_deduction_id = ? AND category = 'pagibig'
  `;
  
  try {
    const [deleteResults] = await pool.query(deleteQuery, [id]);
    
    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ error: 'Pag-ibig contribution not found' });
    }
    
    res.json({ message: 'Pag-ibig contribution deleted successfully' });
  } catch (error) {
    console.error('Error deleting Pag-ibig contribution:', error);
    return res.status(500).json({ 
      error: 'Failed to delete Pag-ibig contribution', 
      details: error.message 
    });
  }
});

// Create a database backup
router.post('/database/backup', async (req, res) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups');
  const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);
  
  // Create the backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  try {
    // Get database config values from pool
    const connection = await pool.getConnection();
    const dbConfig = connection.config;
    connection.release();
    
    // Create the database backup command
    const { host, user, password, database } = dbConfig;
    const cmd = `mysqldump -h ${host} -u ${user} ${password ? `-p${password}` : ''} ${database} > ${backupFile}`;
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Error creating database backup:', error);
        return res.status(500).json({ 
          error: 'Failed to create database backup', 
          details: error.message 
        });
      }
      
      if (stderr && !stderr.includes('Warning')) {
        console.error('Error in backup stderr:', stderr);
        return res.status(500).json({ 
          error: 'Error occurred during backup', 
          details: stderr 
        });
      }
      
      res.json({ 
        message: 'Database backup created successfully',
        file: backupFile 
      });
    });
  } catch (error) {
    console.error('Error creating database backup:', error);
    return res.status(500).json({ 
      error: 'Failed to create database backup', 
      details: error.message 
    });
  }
});

// Get system types by category
router.get('/types/:category', async (req, res) => {
  const { category } = req.params;
  
  if (!category) {
    return res.status(400).json({ error: 'Category parameter is required' });
  }
  
  const query = `
    SELECT type_id as id, type as name, category, affects_in, affects_value, date_created as created_at 
    FROM system_types 
    WHERE category = ?
    ORDER BY type
  `;
  
  try {
    const [results] = await pool.query(query, [category]);
    res.json(results);
  } catch (error) {
    console.error(`Error fetching ${category} types:`, error);
    return res.status(500).json({ 
      error: `Failed to fetch ${category} types`, 
      details: error.message 
    });
  }
});

module.exports = router; 