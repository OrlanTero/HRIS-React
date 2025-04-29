const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { Employee, BankAccount } = require('../models');

const router = express.Router();

// Get all employees
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [employees] = await pool.query(
      'SELECT * FROM employees WHERE archive_id IS NULL'
    );
    
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const [employees] = await pool.query(
      'SELECT * FROM employees WHERE employee_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Get employee's bank accounts
    const [bankAccounts] = await pool.query(
      'SELECT * FROM bank_accounts WHERE employee_id = ? AND active = 1',
      [id]
    );
    
    const employee = employees[0];
    employee.bankAccounts = bankAccounts;
    
    res.json(employee);
  } catch (error) {
    console.error(`Error fetching employee ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new employee
router.post('/', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const {
      firstname,
      lastname,
      middlename = '',
      gender = '',
      civil_status = '',
      telephone = '',
      mobile = '',
      email = '',
      address = '',
      sss = '',
      phil = '',
      pagibig = '',
      tin = '',
      ctc = '',
      rfid = '',
      gsis = '',
      bankAccounts
    } = req.body;
    
    // Generate employee number
    const employeeNo = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Insert employee
    const [employeeResult] = await connection.query(
      `INSERT INTO employees (
        employee_no, firstname, lastname, middlename, gender, civil_status, 
        telephone, mobile, email, address, sss, phil, pagibig, tin, ctc, rfid, gsis,
        date_created
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        employeeNo, firstname, lastname, middlename, gender, civil_status,
        telephone, mobile, email, address, sss, phil, pagibig, tin, ctc, rfid, gsis
      ]
    );
    
    const employeeId = employeeResult.insertId;
    
    // Insert bank accounts if provided
    if (bankAccounts && bankAccounts.length > 0) {
      for (const account of bankAccounts) {
        await connection.query(
          `INSERT INTO bank_accounts (
            employee_id, bank_id, account_number, active, db_status, date_created
          ) VALUES (?, ?, ?, 1, 1, NOW())`,
          [employeeId, account.bank_id, account.account_number]
        );
      }
    }
    
    await connection.commit();
    
    // Return the new employee with bankAccounts
    const [newEmployee] = await pool.query(
      'SELECT * FROM employees WHERE employee_id = ?',
      [employeeId]
    );
    
    const [newBankAccounts] = await pool.query(
      'SELECT * FROM bank_accounts WHERE employee_id = ? AND active = 1',
      [employeeId]
    );
    
    const employee = newEmployee[0];
    employee.bankAccounts = newBankAccounts;
    
    res.status(201).json(employee);
  } catch (error) {
    await connection.rollback();
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Update an employee
router.put('/:id', authenticateToken, async (req, res) => {
  const employeeId = req.params.id;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const {
      firstname,
      lastname,
      middlename = '',
      gender = '',
      civil_status = '',
      telephone = '',
      mobile = '',
      email = '',
      address = '',
      sss = '',
      phil = '',
      pagibig = '',
      tin = '',
      ctc = '',
      rfid = '',
      gsis = '',
      bankAccounts
    } = req.body;
    
    // Update employee
    await connection.query(
      `UPDATE employees SET
        firstname = ?, lastname = ?, middlename = ?, gender = ?, civil_status = ?,
        telephone = ?, mobile = ?, email = ?, address = ?, sss = ?, phil = ?, 
        pagibig = ?, tin = ?, ctc = ?, rfid = ?, gsis = ?
       WHERE employee_id = ?`,
      [
        firstname, lastname, middlename, gender, civil_status,
        telephone, mobile, email, address, sss, phil,
        pagibig, tin, ctc, rfid, gsis,
        employeeId
      ]
    );
    
    // Handle bank accounts if provided
    if (bankAccounts && bankAccounts.length > 0) {
      // Deactivate existing bank accounts
      await connection.query(
        'UPDATE bank_accounts SET active = 0 WHERE employee_id = ?',
        [employeeId]
      );
      
      // Insert new bank accounts
      for (const account of bankAccounts) {
        if (account.bank_account_id) {
          // Update existing account
          await connection.query(
            `UPDATE bank_accounts SET
              bank_id = ?, account_number = ?, active = 1
             WHERE bank_account_id = ? AND employee_id = ?`,
            [account.bank_id, account.account_number, account.bank_account_id, employeeId]
          );
        } else {
          // Insert new account
          await connection.query(
            `INSERT INTO bank_accounts (
              employee_id, bank_id, account_number, active, db_status, date_created
            ) VALUES (?, ?, ?, 1, 1, NOW())`,
            [employeeId, account.bank_id, account.account_number]
          );
        }
      }
    }
    
    await connection.commit();
    
    // Return the updated employee with bankAccounts
    const [updatedEmployee] = await pool.query(
      'SELECT * FROM employees WHERE employee_id = ?',
      [employeeId]
    );
    
    if (updatedEmployee.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    const [updatedBankAccounts] = await pool.query(
      'SELECT * FROM bank_accounts WHERE employee_id = ? AND active = 1',
      [employeeId]
    );
    
    const employee = updatedEmployee[0];
    employee.bankAccounts = updatedBankAccounts;
    
    res.json(employee);
  } catch (error) {
    await connection.rollback();
    console.error(`Error updating employee ${employeeId}:`, error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    connection.release();
  }
});

// Delete an employee
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const archiveId = `archived_${Date.now()}`;
    
    // Soft delete (update archive_id)
    await pool.query(
      'UPDATE employees SET archive_id = ? WHERE employee_id = ?',
      [archiveId, employeeId]
    );
    
    // Soft delete related bank accounts
    await pool.query(
      'UPDATE bank_accounts SET active = 0 WHERE employee_id = ?',
      [employeeId]
    );
    
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(`Error deleting employee ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all banks for dropdown
router.get('/banks/all', authenticateToken, async (req, res) => {
  try {
    const [banks] = await pool.query('SELECT * FROM banks');
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 