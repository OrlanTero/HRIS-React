const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all deployed employees with details
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT 
        de.deployed_employee_id, 
        de.employment_id, 
        de.client_id, 
        de.date_from, 
        de.date_to, 
        de.date_created,
        e.employee_id,
        emp.firstname,
        emp.lastname,
        emp.employee_no,
        e.position,
        e.status,
        e.department,
        e.e_type,
        c.name as client_name,
        c.branch as client_branch
      FROM deployed_employees de
      JOIN employments e ON de.employment_id = e.employment_id
      JOIN employees emp ON e.employee_id = emp.employee_id
      JOIN clients c ON de.client_id = c.client_id
      WHERE de.archive_id IS NULL
      ORDER BY de.date_created DESC
    `;
    
    const [deployments] = await pool.query(query);
    res.json(deployments);
  } catch (error) {
    console.error('Error fetching deployed employees:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get deployment by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        de.deployed_employee_id, 
        de.employment_id, 
        de.client_id, 
        de.date_from, 
        de.date_to, 
        de.date_created,
        e.employee_id,
        emp.firstname,
        emp.lastname,
        emp.employee_no,
        e.position,
        e.status,
        e.department,
        e.e_type,
        c.name as client_name,
        c.branch as client_branch
      FROM deployed_employees de
      JOIN employments e ON de.employment_id = e.employment_id
      JOIN employees emp ON e.employee_id = emp.employee_id
      JOIN clients c ON de.client_id = c.client_id
      WHERE de.deployed_employee_id = ? AND de.archive_id IS NULL
    `;
    
    const [deployments] = await pool.query(query, [id]);
    
    if (deployments.length === 0) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    
    res.json(deployments[0]);
  } catch (error) {
    console.error(`Error fetching deployment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get deployments by client ID
router.get('/client/:clientId', authenticateToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const query = `
      SELECT 
        de.deployed_employee_id, 
        de.employment_id, 
        de.client_id, 
        de.date_from, 
        de.date_to, 
        de.date_created,
        e.employee_id,
        emp.firstname,
        emp.lastname,
        emp.employee_no,
        e.position,
        e.status,
        e.department,
        e.e_type
      FROM deployed_employees de
      JOIN employments e ON de.employment_id = e.employment_id
      JOIN employees emp ON e.employee_id = emp.employee_id
      WHERE de.client_id = ? AND de.archive_id IS NULL
      ORDER BY emp.lastname, emp.firstname
    `;
    
    const [deployments] = await pool.query(query, [clientId]);
    res.json(deployments);
  } catch (error) {
    console.error(`Error fetching deployments for client ${req.params.clientId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get deployments by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const query = `
      SELECT 
        de.deployed_employee_id, 
        de.employment_id, 
        de.client_id, 
        de.date_from, 
        de.date_to, 
        de.date_created,
        e.position,
        e.status,
        e.department,
        e.e_type,
        c.name as client_name,
        c.branch as client_branch
      FROM deployed_employees de
      JOIN employments e ON de.employment_id = e.employment_id
      JOIN clients c ON de.client_id = c.client_id
      WHERE e.employee_id = ? AND de.archive_id IS NULL
      ORDER BY de.date_from DESC
    `;
    
    const [deployments] = await pool.query(query, [employeeId]);
    res.json(deployments);
  } catch (error) {
    console.error(`Error fetching deployments for employee ${req.params.employeeId}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new deployment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      employment_id,
      client_id,
      date_from,
      date_to
    } = req.body;
    
    // Validate required fields
    if (!employment_id || !client_id || !date_from) {
      return res.status(400).json({ message: 'Employment ID, client ID, and start date are required' });
    }
    
    // Check if employment exists
    const [employments] = await pool.query(
      'SELECT * FROM employments WHERE employment_id = ? AND archive_id IS NULL',
      [employment_id]
    );
    
    if (employments.length === 0) {
      return res.status(400).json({ message: 'Employment record not found' });
    }
    
    // Check if client exists
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [client_id]
    );
    
    if (clients.length === 0) {
      return res.status(400).json({ message: 'Client not found' });
    }
    
    // Check if employee is already deployed to this client
    const [existingDeployments] = await pool.query(
      `SELECT * FROM deployed_employees 
       WHERE employment_id = ? AND client_id = ? AND archive_id IS NULL`,
      [employment_id, client_id]
    );
    
    if (existingDeployments.length > 0) {
      return res.status(400).json({ message: 'Employee is already deployed to this client' });
    }
    
    const query = `
      INSERT INTO deployed_employees (
        employment_id, client_id, date_from, date_to, date_created
      ) VALUES (?, ?, ?, ?, NOW())
    `;
    
    const values = [
      employment_id,
      client_id,
      date_from,
      date_to || null
    ];
    
    const [result] = await pool.query(query, values);
    
    res.status(201).json({
      message: 'Employee deployed successfully',
      deployed_employee_id: result.insertId
    });
  } catch (error) {
    console.error('Error creating deployment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update deployment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employment_id,
      client_id,
      date_from,
      date_to
    } = req.body;
    
    // Validate required fields
    if (!employment_id || !client_id || !date_from) {
      return res.status(400).json({ message: 'Employment ID, client ID, and start date are required' });
    }
    
    // Check if deployment exists
    const [deployments] = await pool.query(
      'SELECT * FROM deployed_employees WHERE deployed_employee_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (deployments.length === 0) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    
    // Check if employment exists
    const [employments] = await pool.query(
      'SELECT * FROM employments WHERE employment_id = ? AND archive_id IS NULL',
      [employment_id]
    );
    
    if (employments.length === 0) {
      return res.status(400).json({ message: 'Employment record not found' });
    }
    
    // Check if client exists
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [client_id]
    );
    
    if (clients.length === 0) {
      return res.status(400).json({ message: 'Client not found' });
    }
    
    // Check if employee is already deployed to this client (excluding current deployment)
    const [existingDeployments] = await pool.query(
      `SELECT * FROM deployed_employees 
       WHERE employment_id = ? AND client_id = ? AND deployed_employee_id != ? AND archive_id IS NULL`,
      [employment_id, client_id, id]
    );
    
    if (existingDeployments.length > 0) {
      return res.status(400).json({ message: 'Employee is already deployed to this client' });
    }
    
    const query = `
      UPDATE deployed_employees SET
        employment_id = ?,
        client_id = ?,
        date_from = ?,
        date_to = ?
      WHERE deployed_employee_id = ?
    `;
    
    const values = [
      employment_id,
      client_id,
      date_from,
      date_to || null,
      id
    ];
    
    await pool.query(query, values);
    
    res.json({ message: 'Deployment updated successfully' });
  } catch (error) {
    console.error(`Error updating deployment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete deployment (soft delete)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if deployment exists
    const [deployments] = await pool.query(
      'SELECT * FROM deployed_employees WHERE deployed_employee_id = ? AND archive_id IS NULL',
      [id]
    );
    
    if (deployments.length === 0) {
      return res.status(404).json({ message: 'Deployment not found' });
    }
    
    const query = `
      UPDATE deployed_employees SET
        archive_id = 1
      WHERE deployed_employee_id = ?
    `;
    
    await pool.query(query, [id]);
    
    res.json({ message: 'Deployment deleted successfully' });
  } catch (error) {
    console.error(`Error deleting deployment ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 