const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const PayrollAnalyzer = require('../services/PayrollAnalyzer');
const { Payslip, Employee, Bank, LoanPayment, Loan, SystemType, MortuaryPayment, Mortuary, Beneficiary, BankAccount } = require('../models');

// Get all payslips
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT p.*, 
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             c.name as client_name
      FROM payslips p
      JOIN employees e ON p.employee_id = e.employee_id
      LEFT JOIN clients c ON p.client_id = c.client_id
      WHERE p.archive_id IS NULL
      ORDER BY p.date_created DESC
    `;
    
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching payslips:', error);
    res.status(500).json({ message: 'Failed to fetch payslips', error: error.message });
  }
});

// Get payslip by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT p.*, 
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             c.name as client_name,
             pr.regular, pr.overtime, pr.night_diff, pr.special_holiday, 
             pr.special_holiday_ot, pr.legal_holiday, pr.legal_holiday_ot,
             pr.rest_day, pr.allowance, pr.head_guard_allowance, pr.uniform,
             pr.sea, pr.ctpa, pr.cola
      FROM payslips p
      JOIN employees e ON p.employee_id = e.employee_id
      LEFT JOIN clients c ON p.client_id = c.client_id
      LEFT JOIN payslip_rates pr ON p.payslip_rates_id = pr.rate_id
      WHERE p.payslip_id = ? AND p.archive_id IS NULL
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payslip not found' });
    }

    // Get beneficiaries information if any
    let beneficiariesData = [];
    if (results[0].beneficiaries) {
      const beneficiariesIds = results[0].beneficiaries.split(',').filter(id => id.trim());
      
      if (beneficiariesIds.length > 0) {
        const beneficiariesQuery = `
          SELECT * FROM beneficiaries
          WHERE beneficiary_id IN (?)
        `;
        
        const [beneficiaries] = await pool.query(beneficiariesQuery, [beneficiariesIds]);
        beneficiariesData = beneficiaries;
      }
    }
    
    const result = {
      ...results[0],
      beneficiaries_data: beneficiariesData
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching payslip:', error);
    res.status(500).json({ message: 'Failed to fetch payslip', error: error.message });
  }
});

// Get payslips by employee ID
router.get('/employee/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const query = `
      SELECT p.*, 
             c.name as client_name
      FROM payslips p
      LEFT JOIN clients c ON p.client_id = c.client_id
      WHERE p.employee_id = ? AND p.archive_id IS NULL
      ORDER BY p.year DESC, p.period DESC
    `;
    
    const [results] = await pool.query(query, [employeeId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching employee payslips:', error);
    res.status(500).json({ message: 'Failed to fetch employee payslips', error: error.message });
  }
});

// Get payslips by client and period
router.get('/client/:clientId/period/:period/year/:year', authenticateToken, async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    const query = `
      SELECT p.*, 
             CONCAT(e.firstname, ' ', e.lastname) as employee_name
      FROM payslips p
      JOIN employees e ON p.employee_id = e.employee_id
      WHERE p.client_id = ? AND p.period = ? AND p.year = ? AND p.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [results] = await pool.query(query, [clientId, period, year]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching client period payslips:', error);
    res.status(500).json({ message: 'Failed to fetch client period payslips', error: error.message });
  }
});

// Generate payroll from attendance group
router.post('/generate/:groupId', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    const { groupId } = req.params;
    
    // Validate the attendance group exists
    const [groupCheck] = await pool.query(
      'SELECT * FROM attendance_groups WHERE attendance_group_id = ? AND archive_id IS NULL',
      [groupId]
    );
    
    if (groupCheck.length === 0) {
      return res.status(404).json({ message: 'Attendance group not found' });
    }
    
    // Initialize the payroll analyzer
    const analyzer = new PayrollAnalyzer(groupId);
    try {
      await analyzer.init();
    } catch (error) {
      console.error('Error initializing PayrollAnalyzer:', error);
      return res.status(500).json({ 
        message: 'Failed to initialize payroll analyzer', 
        error: error.message,
        details: 'There may be missing attendance records or client data'
      });
    }
    
    // Compute payrolls for all employees in the group
    let computations;
    try {
      computations = await analyzer.computeAll();
      if (!computations || computations.length === 0) {
        return res.status(404).json({ 
          message: 'No valid payroll computations found',
          details: 'There may be no employees with attendance records in this group'
        });
      }
    } catch (error) {
      console.error('Error computing payrolls:', error);
      return res.status(500).json({ 
        message: 'Failed to compute payrolls', 
        error: error.message,
        details: 'Payroll computation error - check attendance data'
      });
    }
    
    // Start a transaction
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction();
    } catch (error) {
      console.error('Error starting database transaction:', error);
      return res.status(500).json({ 
        message: 'Failed to start database transaction', 
        error: error.message,
        details: 'Database connection error'
      });
    }
    
    try {
      // Save payslip rates
      const rates = analyzer.group;
      const [ratesResult] = await connection.query(
        `INSERT INTO payslip_rates (
          client_id, regular, overtime, night_diff, special_holiday, 
          special_holiday_ot, uniform, rest_day, sea, cola, leave_rate,
          allowance, head_guard_allowance, ctpa, legal_holiday, legal_holiday_ot
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          rates.client_id,
          rates.regular || 0,
          rates.overtime || 0,
          rates.nightdiff || 0,
          rates.special_holiday || 0,
          rates.special_holiday_ot || 0,
          rates.uniform || 0,
          rates.restday || 0,
          rates.sea || 0,
          rates.cola || 0,
          rates.leave_rate || 0,
          rates.allowance || 0,
          rates.head_guard_allowance || 0,
          rates.ctpa || 0,
          rates.legal_holiday || 0,
          rates.legal_holiday_ot || 0
        ]
      );
      
      const rateId = ratesResult.insertId;
      
      // Save as payslip drafts
      const savedDrafts = [];
      
      for (const comp of computations) {
        // Skip invalid computations
        if (!comp || !comp.employee_id || !comp.client_id) {
          console.warn('Skipping invalid computation:', comp);
          continue;
        }
        
        const [draftResult] = await connection.query(
          `INSERT INTO payslip_drafts (
            employee_id, client_id, year, period,
            ndw, nhw, rest_day, basic_pay, nsd, nsd_basic_pay,
            nhw_sh, sh_basic_pay, nhw_shot, shot_basic_pay,
            sss, phil, insurance, gross_pay, part1, death,
            pagibig, part2, netpay, regular_hours, total_hours,
            ot_hours, night_diff_hours, special_holiday_hours,
            special_holiday_ot_hours, legal_holiday_hours,
            legal_holiday_ot_hours, nhw_lh, nhw_lhot,
            lh_basic_pay, lhot_basic_pay, nhw_ot, others,
            payslip_rates_id, cash_advances, loan_statement, adjustments,
            beneficiaries
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?
          )`,
          [
            comp.employee_id, comp.client_id, comp.year, comp.period,
            comp.ndw || 0, comp.nhw || 0, comp.rest_day || 0, 
            comp.basic_pay || 0, comp.nsd || 0, comp.nsd_basic_pay || 0,
            comp.nhw_sh || 0, comp.sh_basic_pay || 0, comp.nhw_shot || 0, 
            comp.shot_basic_pay || 0, comp.sss || 0, comp.phil || 0, 
            comp.insurance || 0, comp.gross_pay || 0, comp.part1 || 0, 
            comp.death || 0, comp.pagibig || 0, comp.part2 || 0, 
            comp.netpay || 0, comp.regular_hours || 0, comp.total_hours || 0,
            comp.ot_hours || 0, comp.night_diff_hours || 0, comp.special_holiday_hours || 0,
            comp.special_holiday_ot_hours || 0, comp.legal_holiday_hours || 0,
            comp.legal_holiday_ot_hours || 0, comp.nhw_lh || 0, comp.nhw_lhot || 0,
            comp.lh_basic_pay || 0, comp.lhot_basic_pay || 0, comp.nhw_ot || 0, comp.others || 0,
            rateId, comp.cash_advances || 0, comp.loan_statement || 0, comp.adjustments || 0,
            comp.beneficiaries || ''
          ]
        );
        
        savedDrafts.push({
          ...comp,
          payslip_draft_id: draftResult.insertId,
          payslip_rates_id: rateId
        });
      }
      
      await connection.commit();
      
      res.status(201).json({
        message: 'Payroll generated successfully',
        drafts: savedDrafts,
        payslip_rates_id: rateId
      });
    } catch (error) {
      if (connection) await connection.rollback();
      console.error('Error in payroll generation database operations:', error);
      res.status(500).json({ 
        message: 'Failed to generate payroll', 
        error: error.message,
        details: 'Database error while saving payroll data' 
      });
    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error generating payroll:', error);
    res.status(500).json({ 
      message: 'Failed to generate payroll', 
      error: error.message,
      details: 'Unexpected error in payroll generation process'
    });
  } finally {
    if (connection) connection.release();
  }
});

// Get payslip drafts
router.get('/drafts', authenticateToken, async (req, res) => {
  try {
    // Get date filter parameters from query string
    const { startDate, endDate } = req.query;
    
    let query = `
      SELECT pd.*,
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             c.name as client_name,
             pr.regular, pr.overtime, pr.night_diff, pr.special_holiday, 
             pr.special_holiday_ot, pr.legal_holiday, pr.legal_holiday_ot,
             pr.rest_day, pr.allowance, pr.head_guard_allowance, pr.uniform,
             pr.sea, pr.ctpa, pr.cola
      FROM payslip_drafts pd
      JOIN employees e ON pd.employee_id = e.employee_id
      LEFT JOIN clients c ON pd.client_id = c.client_id
      LEFT JOIN payslip_rates pr ON pd.payslip_rates_id = pr.rate_id
      WHERE pd.archive_id IS NULL
    `;
    
    const queryParams = [];
    
    // Add date filtering if parameters are provided
    if (startDate && endDate) {
      query += ` AND pd.date_created BETWEEN ? AND ?`;
      // Add one day to endDate to include the full day
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      queryParams.push(new Date(startDate), endDateObj);
    } else if (startDate) {
      query += ` AND pd.date_created >= ?`;
      queryParams.push(new Date(startDate));
    } else if (endDate) {
      query += ` AND pd.date_created <= ?`;
      // Add one day to endDate to include the full day
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      queryParams.push(endDateObj);
    }
    
    query += ` ORDER BY pd.date_created DESC`;
    
    const [results] = await pool.query(query, queryParams);
    res.json(results);
  } catch (error) {
    console.error('Error fetching payslip drafts:', error);
    res.status(500).json({ message: 'Failed to fetch payslip drafts', error: error.message });
  }
});

// Get payslip draft by ID
router.get('/drafts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT pd.*,
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             e.firstname, e.lastname, e.tin_number, e.position, e.rate, e.employee_id,
             c.name as client_name, c.client_id,
             pr.regular, pr.overtime, pr.night_diff, pr.special_holiday, 
             pr.special_holiday_ot, pr.legal_holiday, pr.legal_holiday_ot,
             pr.rest_day, pr.allowance, pr.head_guard_allowance, pr.uniform,
             pr.sea, pr.ctpa, pr.cola, pr.leave_rate
      FROM payslip_drafts pd
      JOIN employees e ON pd.employee_id = e.employee_id
      LEFT JOIN clients c ON pd.client_id = c.client_id
      LEFT JOIN payslip_rates pr ON pd.payslip_rates_id = pr.rate_id
      WHERE pd.payslip_draft_id = ? AND pd.archive_id IS NULL
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payslip draft not found' });
    }
    
    // Get bank account information if available
    const [bankAccounts] = await pool.query(
      `SELECT ba.*, b.name as bank_name 
       FROM bank_accounts ba 
       LEFT JOIN banks b ON ba.bank_id = b.bank_id
       WHERE ba.employee_id = ? AND ba.archive_id IS NULL
       ORDER BY ba.is_primary DESC
       LIMIT 1`,
      [results[0].employee_id]
    );
    
    // Get active loan information if available
    const [loans] = await pool.query(
      `SELECT l.*, lt.type as loan_type_name
       FROM loans l
       LEFT JOIN system_types lt ON l.loan_type = lt.type_id
       WHERE l.employee_id = ? AND l.status = 1 AND l.balance > 0
       AND lt.category = 'loan_type'
       ORDER BY l.date_created DESC`,
      [results[0].employee_id]
    );
    
    const payslipData = {
      ...results[0],
      bank_account: bankAccounts.length > 0 ? bankAccounts[0] : null,
      active_loans: loans,
      // Format dates for frontend display
      date_created: results[0].date_created ? new Date(results[0].date_created).toISOString() : null,
      // Parse numeric values to ensure correct format
      basic_pay: parseFloat(results[0].basic_pay || 0),
      gross_pay: parseFloat(results[0].gross_pay || 0),
      netpay: parseFloat(results[0].netpay || 0),
      part1: parseFloat(results[0].part1 || 0),
      part2: parseFloat(results[0].part2 || 0),
      sss: parseFloat(results[0].sss || 0),
      phil: parseFloat(results[0].phil || 0),
      pagibig: parseFloat(results[0].pagibig || 0)
    };
    
    res.json(payslipData);
  } catch (error) {
    console.error('Error fetching payslip draft:', error);
    res.status(500).json({ message: 'Failed to fetch payslip draft', error: error.message });
  }
});

// Get payslip drafts by client, period, and year
router.get('/drafts/client/:clientId/period/:period/year/:year', authenticateToken, async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    const query = `
      SELECT pd.*,
             CONCAT(e.firstname, ' ', e.lastname) as employee_name
      FROM payslip_drafts pd
      JOIN employees e ON pd.employee_id = e.employee_id
      WHERE pd.client_id = ? AND pd.period = ? AND pd.year = ? AND pd.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [results] = await pool.query(query, [clientId, period, year]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching client period payslip drafts:', error);
    res.status(500).json({ message: 'Failed to fetch client period payslip drafts', error: error.message });
  }
});

// Finalize payslip drafts (convert to official payslips)
router.post('/finalize', authenticateToken, async (req, res) => {
  let connection;
  
  try {
    const { drafts } = req.body;
    
    if (!drafts || !Array.isArray(drafts) || drafts.length === 0) {
      return res.status(400).json({ message: 'No drafts provided for finalization' });
    }
    
    // Start a transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const finalizedPayslips = [];
    
    for (const draftId of drafts) {
      // Get draft details
      const [draftResults] = await connection.query(
        'SELECT * FROM payslip_drafts WHERE payslip_draft_id = ? AND archive_id IS NULL',
        [draftId]
      );
      
      if (draftResults.length === 0) {
        continue; // Skip if draft not found
      }
      
      const draft = draftResults[0];
      
      // Insert as official payslip - make sure column count matches values count
      const [payslipResult] = await connection.query(
        `INSERT INTO payslips (
          employee_id, client_id, year, period,
          ndw, nhw, rest_day, basic_pay, nsd, nsd_basic_pay,
          nhw_sh, sh_basic_pay, nhw_shot, shot_basic_pay,
          sss, phil, insurance, gross_pay, part1, death,
          pagibig, part2, netpay, regular_hours, total_hours,
          ot_hours, night_diff_hours, special_holiday_hours,
          special_holiday_ot_hours, legal_holiday_hours,
          legal_holiday_ot_hours, nhw_lh, nhw_lhot,
          lh_basic_pay, lhot_basic_pay, others,
          payslip_rates_id, cash_advances, loan_statement, adjustments,
          beneficiaries
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?
        )`,
        [
          draft.employee_id, draft.client_id, draft.year, draft.period,
          draft.ndw, draft.nhw, draft.rest_day, draft.basic_pay, draft.nsd, draft.nsd_basic_pay,
          draft.nhw_sh, draft.sh_basic_pay, draft.nhw_shot, draft.shot_basic_pay,
          draft.sss, draft.phil, draft.insurance, draft.gross_pay, draft.part1, draft.death,
          draft.pagibig, draft.part2, draft.netpay, draft.regular_hours, draft.total_hours,
          draft.ot_hours, draft.night_diff_hours, draft.special_holiday_hours,
          draft.special_holiday_ot_hours, draft.legal_holiday_hours,
          draft.legal_holiday_ot_hours, draft.nhw_lh, draft.nhw_lhot,
          draft.lh_basic_pay, draft.lhot_basic_pay, draft.others,
          draft.payslip_rates_id, draft.cash_advances, draft.loan_statement, draft.adjustments,
          draft.beneficiaries
        ]
      );
      
      finalizedPayslips.push({
        payslip_id: payslipResult.insertId,
        employee_id: draft.employee_id
      });
      
      // Update loan statements if any
      if (draft.loan_statement > 0) {
        const [loanStatements] = await connection.query(
          `SELECT ls.* 
           FROM loan_statements ls
           JOIN loans l ON ls.loan_id = l.loan_id
           WHERE ls.employee_id = ? AND ls.status = 0 AND ls.db_status = 1
           ORDER BY ls.end_date ASC`,
          [draft.employee_id]
        );
        
        for (const statement of loanStatements) {
          await connection.query(
            'UPDATE loan_statements SET status = 1 WHERE statement_id = ?',
            [statement.statement_id]
          );
        }
      }
      
      // Update cash advances if any
      if (draft.cash_advances > 0) {
        const [cashAdvances] = await connection.query(
          `SELECT * FROM loans 
           WHERE employee_id = ? AND status = 1 AND balance > 0 AND loan_type = 'Cash Advance'`,
          [draft.employee_id]
        );
        
        for (const advance of cashAdvances) {
          await connection.query(
            'UPDATE loans SET status = 0, balance = 0 WHERE loan_id = ?',
            [advance.loan_id]
          );
        }
      }
    }
    
    await connection.commit();
    
    res.status(200).json({
      message: 'Payslips finalized successfully',
      payslips: finalizedPayslips
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Error finalizing payslips:', error);
    res.status(500).json({ message: 'Failed to finalize payslips', error: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Update a payslip draft
router.put('/drafts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    
    // Check which fields to update
    const allowedFields = [
      'ndw', 'nhw', 'rest_day', 'basic_pay', 'nsd', 'nsd_basic_pay',
      'nhw_sh', 'sh_basic_pay', 'nhw_shot', 'shot_basic_pay',
      'sss', 'phil', 'insurance', 'gross_pay', 'part1', 'death',
      'pagibig', 'part2', 'netpay', 'regular_hours', 'total_hours',
      'ot_hours', 'night_diff_hours', 'special_holiday_hours',
      'special_holiday_ot_hours', 'legal_holiday_hours',
      'legal_holiday_ot_hours', 'nhw_lh', 'nhw_lhot',
      'lh_basic_pay', 'lhot_basic_pay', 'others',
      'cash_advances', 'loan_statement', 'adjustments'
    ];
    
    // Filter out fields that aren't allowed
    const validFields = Object.entries(updatedFields)
      .filter(([key]) => allowedFields.includes(key))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    
    if (Object.keys(validFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
    
    // Build the SET part of the query
    const setClause = Object.keys(validFields)
      .map(key => `${key} = ?`)
      .join(', ');
    
    const values = [...Object.values(validFields), id];
    
    const query = `
      UPDATE payslip_drafts
      SET ${setClause}
      WHERE payslip_draft_id = ?
    `;
    
    const [result] = await pool.query(query, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payslip draft not found' });
    }
    
    res.json({ message: 'Payslip draft updated successfully' });
  } catch (error) {
    console.error('Error updating payslip draft:', error);
    res.status(500).json({ message: 'Failed to update payslip draft', error: error.message });
  }
});

// Delete a payslip draft
router.delete('/drafts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Soft delete by setting archive_id
    const archiveId = Date.now().toString();
    const query = 'UPDATE payslip_drafts SET archive_id = ? WHERE payslip_draft_id = ?';
    
    const [result] = await pool.query(query, [archiveId, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payslip draft not found' });
    }
    
    res.json({ message: 'Payslip draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting payslip draft:', error);
    res.status(500).json({ message: 'Failed to delete payslip draft', error: error.message });
  }
});

// Get payslip rates by ID
router.get('/rates/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT * FROM payslip_rates
      WHERE rate_id = ?
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payslip rates not found' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching payslip rates:', error);
    res.status(500).json({ message: 'Failed to fetch payslip rates', error: error.message });
  }
});

// Get payroll computations by client, period, and year
router.get('/computations/client/:clientId/period/:period/year/:year', authenticateToken, async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Create a new PayrollAnalyzer instance
    const analyzer = new PayrollAnalyzer(null); // We'll set the group manually
    
    // Find the attendance group for this client, period and year
    const [groups] = await pool.query(
      `SELECT * FROM attendance_groups 
       WHERE client_id = ? AND period = ? AND year = ? AND archive_id IS NULL
       LIMIT 1`,
      [clientId, period, year]
    );
    
    if (groups.length === 0) {
      return res.status(404).json({ 
        message: 'No attendance group found for the specified criteria'
      });
    }
    
    // Use the first matching group
    analyzer.groupId = groups[0].attendance_group_id;
    
    try {
      // Initialize the analyzer
      await analyzer.init();
      
      // Compute payroll for all employees in the group
      const computations = await analyzer.computeAll();
      
      res.json(computations);
    } catch (error) {
      console.error('Error computing payroll:', error);
      res.status(500).json({ 
        message: 'Failed to compute payroll', 
        error: error.message
      });
    }
  } catch (error) {
    console.error('Error in payroll computations:', error);
    res.status(500).json({ 
      message: 'Error retrieving payroll computations', 
      error: error.message
    });
  }
});

// Print payroll for client, period, and year
router.get('/print/client/:clientId/period/:period/year/:year', authenticateToken, async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Find the client
    const [clients] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [clientId]
    );
    
    if (clients.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Get the payroll computations
    const analyzer = new PayrollAnalyzer(null);
    
    // Find the attendance group for this client, period and year
    const [groups] = await pool.query(
      `SELECT * FROM attendance_groups 
       WHERE client_id = ? AND period = ? AND year = ? AND archive_id IS NULL
       LIMIT 1`,
      [clientId, period, year]
    );
    
    if (groups.length === 0) {
      return res.status(404).json({ 
        message: 'No attendance group found for the specified criteria'
      });
    }
    
    // Use the first matching group
    analyzer.groupId = groups[0].attendance_group_id;
    
    // Initialize the analyzer
    await analyzer.init();
    
    // Compute payroll for all employees in the group
    const computations = await analyzer.computeAll();
    
    // Create a simple HTML for printing
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payroll Report - ${clients[0].name} - ${period} ${year}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          h1 { text-align: center; margin-bottom: 10px; }
          h2 { text-align: center; margin-top: 0; margin-bottom: 20px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; position: sticky; top: 0; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
          .print-button { 
            padding: 10px 20px; 
            background-color: #4CAF50; 
            color: white; 
            border: none; 
            border-radius: 4px; 
            cursor: pointer; 
            margin-bottom: 20px; 
            display: block; 
            margin-left: auto; 
            margin-right: auto; 
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" class="print-button">Print Report</button>
        <h1>Payroll Report</h1>
        <h2>${clients[0].name} - ${period} ${year}</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Days Worked</th>
              <th>Hours Worked</th>
              <th>Basic Pay</th>
              <th>NSD</th>
              <th>SH</th>
              <th>LH</th>
              <th>Rest Day</th>
              <th>Adj.</th>
              <th>Gross Pay</th>
              <th>SSS</th>
              <th>Phil</th>
              <th>Pag-Ibig</th>
              <th>Others</th>
              <th>Net Pay</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    computations.forEach((comp, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${comp.name}</td>
          <td class="text-center">${comp.ndw}</td>
          <td class="text-center">${comp.total_hours}</td>
          <td class="text-right">${formatCurrency(comp.basic_pay)}</td>
          <td class="text-right">${formatCurrency(comp.nsd_basic_pay)}</td>
          <td class="text-right">${formatCurrency(comp.sh_basic_pay)}</td>
          <td class="text-right">${formatCurrency(comp.lh_basic_pay)}</td>
          <td class="text-right">${formatCurrency(comp.rest_day)}</td>
          <td class="text-right">${formatCurrency(comp.adjustments)}</td>
          <td class="text-right">${formatCurrency(comp.gross_pay)}</td>
          <td class="text-right">${formatCurrency(comp.sss)}</td>
          <td class="text-right">${formatCurrency(comp.phil)}</td>
          <td class="text-right">${formatCurrency(comp.pagibig)}</td>
          <td class="text-right">${formatCurrency(comp.others)}</td>
          <td class="text-right">${formatCurrency(comp.netpay)}</td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    // Utility function to format currency
    function formatCurrency(amount) {
      if (amount === undefined || amount === null) return '₱0.00';
      return '₱' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Send the HTML response
    res.send(html);
  } catch (error) {
    console.error('Error generating printable payroll:', error);
    res.status(500).json({ 
      message: 'Error generating printable payroll', 
      error: error.message
    });
  }
});

// API endpoint for Account Credited report (public)
router.get('/public/reports/account-credited/client/:clientId/period/:period/year/:year', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Get payslips for the specified client, period, and year
    const payslipsQuery = `
      SELECT p.*, 
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             e.firstname, e.lastname, e.position, e.tin_number, e.employee_id
      FROM payslips p
      JOIN employees e ON p.employee_id = e.employee_id
      WHERE p.client_id = ? AND p.period = ? AND p.year = ? AND p.archive_id IS NULL
      ORDER BY e.lastname, e.firstname
    `;
    
    const [payslips] = await pool.query(payslipsQuery, [clientId, period, year]);
    
    if (!payslips.length) {
      return res.json([]);
    }
    
    // Get bank accounts for these employees
    const employeeIds = payslips.map(p => p.employee_id);
    const bankAccountsQuery = `
      SELECT ba.*, b.name as bank_name, b.bank_id, b.swift_code, b.branch,
             ba.employee_id, ba.is_primary
      FROM bank_accounts ba
      LEFT JOIN banks b ON ba.bank_id = b.bank_id
      WHERE ba.employee_id IN (?) AND ba.archive_id IS NULL
      ORDER BY ba.is_primary DESC
    `;
    
    let bankAccounts = [];
    if (employeeIds.length > 0) {
      [bankAccounts] = await pool.query(bankAccountsQuery, [employeeIds]);
    }
    
    // Create lookup map for bank accounts (prioritizing primary accounts)
    const bankAccountMap = {};
    bankAccounts.forEach(acct => {
      // Only add if no account exists yet or if this is a primary account
      if (!bankAccountMap[acct.employee_id] || acct.is_primary) {
        bankAccountMap[acct.employee_id] = {
          bank_name: acct.bank_name || 'N/A',
          account_number: acct.account_number || 'N/A',
          account_name: acct.account_name || 'N/A',
          bank_id: acct.bank_id,
          swift_code: acct.swift_code,
          branch: acct.branch,
          is_primary: acct.is_primary
        };
      }
    });
    
    // Get the client information
    const [clientInfo] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ?',
      [clientId]
    );
    
    const clientName = clientInfo.length > 0 ? clientInfo[0].name : 'Unknown Client';
    
    // Format the date for the report
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Format the data for the account credited report
    const accountCreditedData = payslips.map(payslip => {
      const bankInfo = bankAccountMap[payslip.employee_id] || { 
        bank_name: 'N/A', 
        account_number: 'N/A',
        account_name: 'N/A',
        bank_id: null,
        swift_code: 'N/A',
        branch: 'N/A',
        is_primary: 0
      };
      
      return {
        employee_id: payslip.employee_id,
        employee_name: payslip.employee_name || 'N/A',
        firstname: payslip.firstname,
        lastname: payslip.lastname,
        position: payslip.position,
        tin_number: payslip.tin_number,
        bank_name: bankInfo.bank_name,
        bank_id: bankInfo.bank_id,
        account_number: bankInfo.account_number,
        account_name: bankInfo.account_name,
        swift_code: bankInfo.swift_code,
        branch: bankInfo.branch,
        is_primary_account: bankInfo.is_primary === 1,
        net_pay: parseFloat(payslip.netpay || 0),
        credit_date: currentDate, // Using current date as credit date
        period: payslip.period,
        year: payslip.year,
        client_name: clientName,
        client_id: clientId,
        payslip_id: payslip.payslip_id
      };
    });
    
    res.json({
      report_title: "Account Credited Report",
      client_name: clientName,
      period: period,
      year: year,
      report_date: currentDate,
      total_amount: accountCreditedData.reduce((sum, item) => sum + item.net_pay, 0),
      employee_count: accountCreditedData.length,
      data: accountCreditedData
    });
  } catch (error) {
    console.error('Error fetching account credited data:', error);
    res.status(500).json({
      message: 'Error fetching account credited data',
      error: error.message
    });
  }
});

// API endpoint for Loan Payments report (public)
router.get('/public/reports/loan-payments/client/:clientId/period/:period/year/:year', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Get loan payments for the specified client, period, and year
    const loanPaymentsQuery = `
      SELECT lp.*, l.amount as loan_amount, l.balance, l.loan_type,
             CONCAT(e.firstname, ' ', e.lastname) as employee_name
      FROM loan_payments lp
      JOIN loans l ON lp.loan_id = l.loan_id
      JOIN employees e ON l.employee_id = e.employee_id
      JOIN payslips p ON e.employee_id = p.employee_id AND p.period = ? AND p.year = ? AND p.client_id = ?
      WHERE lp.archive_id IS NULL
      GROUP BY lp.payment_id
    `;
    
    const [loanPayments] = await pool.query(loanPaymentsQuery, [period, year, clientId]);
    
    if (!loanPayments.length) {
      // Return an empty array instead of 404 error
      return res.json([]);
    }
    
    // Get loan types from SystemType
    const loanTypesQuery = `
      SELECT * FROM system_types WHERE category = 'loan_type' AND archive_id IS NULL
    `;
    
    const [loanTypes] = await pool.query(loanTypesQuery);
    
    // Build lookup for loan types
    const loanTypesMap = {};
    loanTypes.forEach(type => {
      loanTypesMap[type.type_id] = type.type;
    });
    
    // Format the data for the loan payments report
    const loanPaymentsData = loanPayments.map(payment => ({
      employee_id: payment.employee_id,
      employee_name: payment.employee_name,
      loan_type: loanTypesMap[payment.loan_type] || 'Unknown',
      loan_type_id: payment.loan_type,
      loan_amount: parseFloat(payment.loan_amount || 0),
      payment_amount: parseFloat(payment.amount || 0),
      balance: parseFloat(payment.balance || 0),
      payment_date: payment.date_created ? new Date(payment.date_created).toISOString().split('T')[0] : 'N/A'
    }));
    
    res.json(loanPaymentsData);
  } catch (error) {
    console.error('Error fetching loan payments data:', error);
    res.status(500).json({
      message: 'Error fetching loan payments data',
      error: error.message
    });
  }
});

// API endpoint for Mortuary Control report (public)
router.get('/public/reports/mortuary/client/:clientId/period/:period/year/:year', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Get mortuary payments for the specified client, period, and year
    const mortuaryPaymentsQuery = `
      SELECT mp.*, CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             e.employee_id
      FROM mortuary_payments mp
      JOIN employees e ON mp.employee_id = e.employee_id
      JOIN payslips p ON e.employee_id = p.employee_id AND p.period = ? AND p.year = ? AND p.client_id = ?
      WHERE mp.archive_id IS NULL
      GROUP BY mp.payment_id
    `;
    
    const [mortuaryPayments] = await pool.query(mortuaryPaymentsQuery, [period, year, clientId]);
    
    if (!mortuaryPayments.length) {
      // Return empty array instead of 404
      return res.json([]);
    }
    
    // Get beneficiaries for these employees
    const employeeIds = mortuaryPayments.map(mp => mp.employee_id);
    
    // Format the data for the mortuary report - without beneficiaries for now
    const mortuaryData = mortuaryPayments.map(payment => {
      return {
        employee_id: payment.employee_id,
        employee_name: payment.employee_name,
        beneficiary_name: 'N/A', // Simplified without beneficiary lookup
        relationship: 'N/A',
        amount: parseFloat(payment.amount || 0)
      };
    });
    
    res.json(mortuaryData);
  } catch (error) {
    console.error('Error fetching mortuary data:', error);
    res.status(500).json({
      message: 'Error fetching mortuary data',
      error: error.message
    });
  }
});

// API endpoint for Bank Summary report (public)
router.get('/public/reports/bank-summary/client/:clientId/period/:period/year/:year', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Get payslips for the specified client, period, and year
    const payslipsQuery = `
      SELECT p.*, CONCAT(e.firstname, ' ', e.lastname) as employee_name
      FROM payslips p
      JOIN employees e ON p.employee_id = e.employee_id
      WHERE p.client_id = ? AND p.period = ? AND p.year = ? AND p.archive_id IS NULL
    `;
    
    const [payslips] = await pool.query(payslipsQuery, [clientId, period, year]);
    
    if (!payslips.length) {
      return res.status(404).json({ message: 'No payslips found for this criteria' });
    }
    
    // Get bank accounts for these employees
    const employeeIds = payslips.map(p => p.employee_id);
    const bankAccountsQuery = `
      SELECT ba.*, b.name as bank_name, ba.employee_id
      FROM bank_accounts ba
      LEFT JOIN banks b ON ba.bank_id = b.bank_id
      WHERE ba.employee_id IN (?) AND ba.archive_id IS NULL
    `;
    
    const [bankAccounts] = await pool.query(bankAccountsQuery, [employeeIds]);
    
    // Create lookup map for bank accounts
    const bankAccountMap = {};
    bankAccounts.forEach(acct => {
      bankAccountMap[acct.employee_id] = {
        bank_name: acct.bank_name || 'No Bank'
      };
    });
    
    // Group data by bank
    const bankSummary = {};
    
    payslips.forEach(payslip => {
      const bankInfo = bankAccountMap[payslip.employee_id] || { bank_name: 'No Bank' };
      const bankName = bankInfo.bank_name;
      
      if (!bankSummary[bankName]) {
        bankSummary[bankName] = {
          bank_name: bankName,
          total_employees: 0,
          total_amount: 0
        };
      }
      
      bankSummary[bankName].total_employees += 1;
      bankSummary[bankName].total_amount += parseFloat(payslip.netpay || 0);
    });
    
    const bankSummaryArray = Object.values(bankSummary);
    
    res.json(bankSummaryArray);
  } catch (error) {
    console.error('Error fetching bank summary data:', error);
    res.status(500).json({
      message: 'Error fetching bank summary data',
      error: error.message
    });
  }
});

// Public route for previewing payslips before saving as drafts
router.get('/public/preview/client/:clientId/period/:period/year/:year', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Make sure client exists
    const [clientCheck] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [clientId]
    );
    
    if (clientCheck.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Get employees for this client using deployed_employees table
    const [employees] = await pool.query(
      `SELECT DISTINCT e.*, CONCAT(e.lastname, ', ', e.firstname) as employee_name 
       FROM employees e
       JOIN employments emp ON e.employee_id = emp.employee_id
       JOIN deployed_employees de ON emp.employment_id = de.employment_id
       WHERE de.client_id = ? AND e.archive_id IS NULL AND de.archive_id IS NULL
       ORDER BY e.lastname, e.firstname`,
      [clientId]
    );
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found for this client' });
    }
    
    // Find existing attendance group for this client/period/year
    const [existingGroup] = await pool.query(
      `SELECT attendance_group_id FROM attendance_groups 
       WHERE client_id = ? AND period = ? AND year = ? AND archive_id IS NULL
       LIMIT 1`,
      [clientId, period, year]
    );
    
    let previewData = [];
    let tempGroupId = null;
    let tempGroupCreated = false;
    let connection = null;
    
    try {
      // Start a transaction for temporary data
      connection = await pool.getConnection();
      await connection.beginTransaction();
      
      let attendanceGroupId;
      
      // If we have an existing group, use it
      if (existingGroup.length > 0) {
        attendanceGroupId = existingGroup[0].attendance_group_id;
        console.log('Preview: Using existing attendance group:', attendanceGroupId);
      } else {
        // Create a temporary attendance group for preview calculations
        console.log('Preview: Creating temporary attendance group');
        
        const [tempGroup] = await connection.query(
          `INSERT INTO attendance_groups (
            client_id, period, year, active, finished, db_status, date_created
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            clientId,
            period,
            year,
            1, // active
            0, // not finished
            1, // db_status
            new Date()
          ]
        );
        
        attendanceGroupId = tempGroup.insertId;
        tempGroupId = attendanceGroupId;
        tempGroupCreated = true;
        
        console.log('Preview: Created temporary group ID:', attendanceGroupId);
        
        // Create sample attendance data for preview
        for (const employee of employees) {
          // Create attendance entries (8 hours per day for 15 days)
          for (let day = 1; day <= 15; day++) {
            await connection.query(
              `INSERT INTO attendance (
                attendance_group_id, employee_id, type, day, hours, db_status, date_created
              ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                attendanceGroupId,
                employee.employee_id,
                'regular',
                day,
                8, // 8 hours per day
                1, // db_status
                new Date()
              ]
            );
          }
        }
      }
      
      // Use PayrollAnalyzer for consistent calculations
      const analyzer = new PayrollAnalyzer(attendanceGroupId);
      
      try {
        // Initialize the analyzer with client rates
        await analyzer.init();
        
        // If temporary group, make sure rates are set properly
        if (tempGroupCreated) {
          analyzer.group.regular = clientCheck[0].regular || 0;
          analyzer.group.overtime = clientCheck[0].overtime || 0;
          analyzer.group.nightdiff = clientCheck[0].nightdiff || 0;
          analyzer.group.special_holiday = clientCheck[0].special_holiday || 0;
          analyzer.group.special_holiday_ot = clientCheck[0].special_holiday_ot || 0;
          analyzer.group.restday = clientCheck[0].restday || 0;
          analyzer.group.sea = clientCheck[0].sea || 0;
          analyzer.group.cola = clientCheck[0].cola || 0;
          analyzer.group.leave_rate = clientCheck[0].leave_1 || 0;
          analyzer.group.allowance = clientCheck[0].allowance || 0;
          analyzer.group.head_guard_allowance = clientCheck[0].head_guard_allowance || 0;
          analyzer.group.ctpa = clientCheck[0].ctpa || 0;
          analyzer.group.legal_holiday = clientCheck[0].legal_holiday || 0;
          analyzer.group.legal_holiday_ot = clientCheck[0].legal_holiday_ot || 0;
        }
        
        // Compute payroll for all employees
        const computations = await analyzer.computeAll();
        
        // Format for preview data
        previewData = computations.map(comp => ({
          employee_id: comp.employee_id,
          employee_name: comp.name || '',
          basic_pay: parseFloat(comp.basic_pay || 0),
          gross_pay: parseFloat(comp.gross_pay || 0),
          deductions: parseFloat(comp.part1 || 0) + parseFloat(comp.part2 || 0) + parseFloat(comp.others || 0),
          net_pay: parseFloat(comp.netpay || 0),
          client_id: clientId,
          period: period,
          year: year,
          // Include all detailed fields for debugging
          regular_hours: comp.regular_hours || 0,
          ot_hours: comp.ot_hours || 0,
          ndw: comp.ndw || 0,
          sss: parseFloat(comp.sss || 0),
          phil: parseFloat(comp.phil || 0),
          pagibig: parseFloat(comp.pagibig || 0)
        }));
        
      } catch (analyzerError) {
        console.error('Preview: Error using PayrollAnalyzer:', analyzerError);
        throw analyzerError;
      }
      
      // If we created a temporary group, clean it up
      if (tempGroupCreated && tempGroupId) {
        await connection.query(
          'DELETE FROM attendance WHERE attendance_group_id = ?',
          [tempGroupId]
        );
        
        await connection.query(
          'DELETE FROM attendance_groups WHERE attendance_group_id = ?',
          [tempGroupId]
        );
        
        console.log('Preview: Cleaned up temporary attendance group');
      }
      
      await connection.commit();
      console.log('Preview: Transaction committed');
      
    } catch (error) {
      if (connection) {
        await connection.rollback();
        console.log('Preview: Transaction rolled back');
      }
      throw error;
    } finally {
      if (connection) {
        connection.release();
        console.log('Preview: Connection released');
      }
    }
    
    res.json(previewData);
  } catch (error) {
    console.error('Error generating payslip previews:', error);
    res.status(500).json({ message: 'Failed to generate payslip previews', error: error.message });
  }
});

// Public route for previewing payslips A-Z before saving as drafts
router.get('/public/preview/client/:clientId/period/:period/year/:year/az', async (req, res) => {
  try {
    const { clientId, period, year } = req.params;
    
    // Make sure client exists
    const [clientCheck] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [clientId]
    );
    
    if (clientCheck.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Get employees for this client using deployed_employees table
    const [employees] = await pool.query(
      `SELECT DISTINCT e.*, CONCAT(e.lastname, ', ', e.firstname) as employee_name 
       FROM employees e
       JOIN employments emp ON e.employee_id = emp.employee_id
       JOIN deployed_employees de ON emp.employment_id = de.employment_id
       WHERE de.client_id = ? AND e.archive_id IS NULL AND de.archive_id IS NULL
       ORDER BY e.lastname, e.firstname`,
      [clientId]
    );
    
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found for this client' });
    }
    
    // Find existing attendance group for this client/period/year
    const [existingGroup] = await pool.query(
      `SELECT attendance_group_id FROM attendance_groups 
       WHERE client_id = ? AND period = ? AND year = ? AND archive_id IS NULL
       LIMIT 1`,
      [clientId, period, year]
    );
    
    let previewData = [];
    let tempGroupId = null;
    let tempGroupCreated = false;
    let connection = null;
    
    try {
      // Start a transaction for temporary data
      connection = await pool.getConnection();
      await connection.beginTransaction();
      
      let attendanceGroupId;
      
      // If we have an existing group, use it
      if (existingGroup.length > 0) {
        attendanceGroupId = existingGroup[0].attendance_group_id;
        console.log('Preview AZ: Using existing attendance group:', attendanceGroupId);
      } else {
        // Create a temporary attendance group for preview calculations
        console.log('Preview AZ: Creating temporary attendance group');
        
        const [tempGroup] = await connection.query(
          `INSERT INTO attendance_groups (
            client_id, period, year, active, finished, db_status, date_created
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            clientId,
            period,
            year,
            1, // active
            0, // not finished
            1, // db_status
            new Date()
          ]
        );
        
        attendanceGroupId = tempGroup.insertId;
        tempGroupId = attendanceGroupId;
        tempGroupCreated = true;
        
        console.log('Preview AZ: Created temporary group ID:', attendanceGroupId);
        
        // Create sample attendance data for preview
        for (const employee of employees) {
          // Create attendance entries (8 hours per day for 15 days)
          for (let day = 1; day <= 15; day++) {
            await connection.query(
              `INSERT INTO attendance (
                attendance_group_id, employee_id, type, day, hours, db_status, date_created
              ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                attendanceGroupId,
                employee.employee_id,
                'regular',
                day,
                8, // 8 hours per day
                1, // db_status
                new Date()
              ]
            );
          }
        }
      }
      
      // Use PayrollAnalyzer for consistent calculations
      const analyzer = new PayrollAnalyzer(attendanceGroupId);
      
      try {
        // Initialize the analyzer with client rates
        await analyzer.init();
        
        // If temporary group, make sure rates are set properly
        if (tempGroupCreated) {
          analyzer.group.regular = clientCheck[0].regular || 0;
          analyzer.group.overtime = clientCheck[0].overtime || 0;
          analyzer.group.nightdiff = clientCheck[0].nightdiff || 0;
          analyzer.group.special_holiday = clientCheck[0].special_holiday || 0;
          analyzer.group.special_holiday_ot = clientCheck[0].special_holiday_ot || 0;
          analyzer.group.restday = clientCheck[0].restday || 0;
          analyzer.group.sea = clientCheck[0].sea || 0;
          analyzer.group.cola = clientCheck[0].cola || 0;
          analyzer.group.leave_rate = clientCheck[0].leave_1 || 0;
          analyzer.group.allowance = clientCheck[0].allowance || 0;
          analyzer.group.head_guard_allowance = clientCheck[0].head_guard_allowance || 0;
          analyzer.group.ctpa = clientCheck[0].ctpa || 0;
          analyzer.group.legal_holiday = clientCheck[0].legal_holiday || 0;
          analyzer.group.legal_holiday_ot = clientCheck[0].legal_holiday_ot || 0;
        }
        
        // Compute payroll for all employees
        const computations = await analyzer.computeAll();
        
        // Format for preview data (A-Z)
        previewData = computations.map(comp => ({
          employee_id: comp.employee_id,
          employee_name: comp.name || '',
          basic_pay: parseFloat(comp.basic_pay || 0),
          gross_pay: parseFloat(comp.gross_pay || 0),
          deductions: parseFloat(comp.part1 || 0) + parseFloat(comp.part2 || 0) + parseFloat(comp.others || 0),
          net_pay: parseFloat(comp.netpay || 0),
          client_id: clientId,
          period: period,
          year: year,
          is_az: true,
          // Include all detailed fields for debugging
          regular_hours: comp.regular_hours || 0,
          ot_hours: comp.ot_hours || 0,
          ndw: comp.ndw || 0,
          sss: parseFloat(comp.sss || 0),
          phil: parseFloat(comp.phil || 0),
          pagibig: parseFloat(comp.pagibig || 0)
        }));
        
      } catch (analyzerError) {
        console.error('Preview AZ: Error using PayrollAnalyzer:', analyzerError);
        throw analyzerError;
      }
      
      // If we created a temporary group, clean it up
      if (tempGroupCreated && tempGroupId) {
        await connection.query(
          'DELETE FROM attendance WHERE attendance_group_id = ?',
          [tempGroupId]
        );
        
        await connection.query(
          'DELETE FROM attendance_groups WHERE attendance_group_id = ?',
          [tempGroupId]
        );
        
        console.log('Preview AZ: Cleaned up temporary attendance group');
      }
      
      await connection.commit();
      console.log('Preview AZ: Transaction committed');
      
    } catch (error) {
      if (connection) {
        await connection.rollback();
        console.log('Preview AZ: Transaction rolled back');
      }
      throw error;
    } finally {
      if (connection) {
        connection.release();
        console.log('Preview AZ: Connection released');
      }
    }
    
    res.json(previewData);
  } catch (error) {
    console.error('Error generating A-Z payslip previews:', error);
    res.status(500).json({ message: 'Failed to generate A-Z payslip previews', error: error.message });
  }
});

// Save selected payslips as drafts
router.post('/save-drafts', async (req, res) => {
  let connection;
  let tempGroupCreated = false;
  let tempGroupId = null;
  
  try {
    const { client_id, period, year, employee_ids } = req.body;
    
    console.log('REQUEST DATA:', { client_id, period, year, employee_ids: employee_ids?.length });
    
    if (!client_id || !period || !year || !employee_ids || !Array.isArray(employee_ids) || employee_ids.length === 0) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
    
    // Get the client and its rates
    const [clientCheck] = await pool.query(
      'SELECT * FROM clients WHERE client_id = ? AND archive_id IS NULL',
      [client_id]
    );
    
    if (clientCheck.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    console.log('Client found:', { client_id, client_name: clientCheck[0].name });
    
    // Start a transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();
    console.log('Transaction started');
    
    // Insert payslip rates first
    try {
      const [ratesResult] = await connection.query(
        `INSERT INTO payslip_rates (
          client_id, regular, overtime, night_diff, special_holiday, 
          special_holiday_ot, uniform, rest_day, sea, cola, leave_rate,
          allowance, head_guard_allowance, ctpa, legal_holiday, legal_holiday_ot
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          client_id,
          clientCheck[0].regular || 0,
          clientCheck[0].overtime || 0,
          clientCheck[0].nightdiff || 0,
          clientCheck[0].special_holiday || 0,
          clientCheck[0].special_holiday_ot || 0,
          clientCheck[0].uniform || 0,
          clientCheck[0].restday || 0,
          clientCheck[0].sea || 0,
          clientCheck[0].cola || 0,
          clientCheck[0].leave_1 || 0,
          clientCheck[0].allowance || 0,
          clientCheck[0].head_guard_allowance || 0,
          clientCheck[0].ctpa || 0,
          clientCheck[0].legal_holiday || 0,
          clientCheck[0].legal_holiday_ot || 0
        ]
      );
      
      const payslipRatesId = ratesResult.insertId;
      console.log('Payslip rates inserted with ID:', payslipRatesId);
      
      // Find any existing attendance group for this client/period/year
      const [attendanceGroups] = await connection.query(
        `SELECT attendance_group_id FROM attendance_groups 
         WHERE client_id = ? AND period = ? AND year = ? AND archive_id IS NULL
         LIMIT 1`,
        [client_id, period, year]
      );
      
      let attendanceGroupId;
      
      // If we have an existing attendance group, use it
      if (attendanceGroups.length > 0) {
        attendanceGroupId = attendanceGroups[0].attendance_group_id;
        console.log('Using existing attendance group:', attendanceGroupId);
      } else {
        // Create a temporary attendance group for calculation purposes
        console.log('No existing attendance group found, creating temporary group');
        
        // Insert temporary attendance group
        const [tempGroupResult] = await connection.query(
          `INSERT INTO attendance_groups (
            client_id, period, year, active, finished, db_status, date_created
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            client_id,
            period,
            year,
            1, // active
            0, // not finished
            1, // db_status
            new Date()
          ]
        );
        
        attendanceGroupId = tempGroupResult.insertId;
        tempGroupId = attendanceGroupId;
        tempGroupCreated = true;
        
        console.log('Created temporary attendance group ID:', attendanceGroupId);
      }
      
      // ALWAYS use PayrollAnalyzer for consistent calculations
      const analyzer = new PayrollAnalyzer(attendanceGroupId);
      
      try {
        // Initialize the analyzer
        await analyzer.init();
        
        // If we created a temporary group, we need to set some properties manually
        if (tempGroupCreated) {
          // Set client rates to ensure proper calculations
          analyzer.group.regular = clientCheck[0].regular || 0;
          analyzer.group.overtime = clientCheck[0].overtime || 0;
          analyzer.group.nightdiff = clientCheck[0].nightdiff || 0;
          analyzer.group.special_holiday = clientCheck[0].special_holiday || 0;
          analyzer.group.special_holiday_ot = clientCheck[0].special_holiday_ot || 0;
          analyzer.group.restday = clientCheck[0].restday || 0;
          analyzer.group.sea = clientCheck[0].sea || 0;
          analyzer.group.cola = clientCheck[0].cola || 0;
          analyzer.group.leave_rate = clientCheck[0].leave_1 || 0;
          analyzer.group.allowance = clientCheck[0].allowance || 0;
          analyzer.group.head_guard_allowance = clientCheck[0].head_guard_allowance || 0;
          analyzer.group.ctpa = clientCheck[0].ctpa || 0;
          analyzer.group.legal_holiday = clientCheck[0].legal_holiday || 0;
          analyzer.group.legal_holiday_ot = clientCheck[0].legal_holiday_ot || 0;
          
          // Set default 8 hours per day for 15 days if no attendance data
          for (const employeeId of employee_ids) {
            // Create attendance entries for regular hours
            for (let day = 1; day <= 15; day++) {
              await connection.query(
                `INSERT INTO attendance (
                  attendance_group_id, employee_id, type, day, hours, db_status, date_created
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  attendanceGroupId,
                  employeeId,
                  'regular',
                  day,
                  8, // 8 hours per day
                  1, // db_status
                  new Date()
                ]
              );
            }
          }
        }
        
        // Compute payroll for all employees
        const computations = await analyzer.computeAll();
        
        // Filter to just the selected employees
        const filteredComputations = computations.filter(comp => 
          employee_ids.includes(parseInt(comp.employee_id))
        );
        
        console.log(`Computed payroll for ${filteredComputations.length} employees using PayrollAnalyzer`);
        
        if (filteredComputations.length === 0) {
          throw new Error('PayrollAnalyzer failed to compute any payslips');
        }
        
        // Insert draft for each selected employee
        const now = new Date();
        const results = [];
        
        for (const comp of filteredComputations) {
          // Get employee name for the response
          const [employeeInfo] = await connection.query(
            `SELECT CONCAT(firstname, ' ', lastname) as employee_name 
             FROM employees WHERE employee_id = ?`,
            [comp.employee_id]
          );
          
          const employeeName = employeeInfo.length > 0 
            ? employeeInfo[0].employee_name 
            : 'Unknown';
            
          console.log('PayrollAnalyzer calculations:', { 
            employeeId: comp.employee_id,
            employeeName: employeeName,
            basicPay: comp.basic_pay,
            grossPay: comp.gross_pay,
            netPay: comp.netpay
          });
            
          try {
            // Let's check for all required fields from the database schema
            const sql = `
              INSERT INTO payslip_drafts (
                employee_id, client_id, period, year,
                basic_pay, gross_pay, netpay,
                part1, part2, others,
                regular_hours, total_hours, ot_hours,
                night_diff_hours, special_holiday_hours, legal_holiday_hours,
                special_holiday_ot_hours, legal_holiday_ot_hours,
                ndw, nhw, rest_day, nsd, nsd_basic_pay,
                nhw_sh, sh_basic_pay, nhw_shot, shot_basic_pay,
                sss, phil, insurance, pagibig, death,
                adjustments, beneficiaries,
                date_created, payslip_rates_id
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            // Convert numbers to strings for varchar fields
            const params = [
              comp.employee_id,
              client_id,
              period.toString(),
              year.toString(),
              (comp.basic_pay || 0).toString(),
              (comp.gross_pay || 0).toString(),
              (comp.netpay || 0).toString(),
              (comp.part1 || 0).toString(),
              (comp.part2 || 0).toString(),
              (comp.others || 0).toString(),
              comp.regular_hours || 0,
              comp.total_hours || 0,
              comp.ot_hours || 0,
              comp.night_diff_hours || 0,
              comp.special_holiday_hours || 0,
              comp.legal_holiday_hours || 0,
              comp.special_holiday_ot_hours || 0,
              comp.legal_holiday_ot_hours || 0,
              (comp.ndw || 0).toString(),
              (comp.nhw || 0).toString(),
              comp.rest_day || 0,
              (comp.nsd || 0).toString(),
              (comp.nsd_basic_pay || 0).toString(),
              (comp.nhw_sh || 0).toString(),
              (comp.sh_basic_pay || 0).toString(),
              (comp.nhw_shot || 0).toString(),
              (comp.shot_basic_pay || 0).toString(),
              (comp.sss || 0).toString(),
              (comp.phil || 0).toString(),
              (comp.insurance || 0).toString(),
              (comp.pagibig || 0).toString(),
              (comp.death || 0).toString(),
              comp.adjustments || 0,
              comp.beneficiaries || '',
              now,
              payslipRatesId
            ];
            
            console.log('SQL:', sql);
            console.log('Parameters count:', params.length);
            
            // Execute the insert query
            const [draftResult] = await connection.query(sql, params);
            
            console.log('Draft inserted with ID:', draftResult.insertId);
            
            results.push({
              payslip_draft_id: draftResult.insertId,
              employee_id: comp.employee_id,
              employee_name: employeeName
            });
          } catch (draftError) {
            console.error('Error inserting draft for employee:', comp.employee_id);
            console.error('SQL Error:', draftError.code, draftError.errno, draftError.sqlMessage);
            console.error('SQL State:', draftError.sqlState);
            throw draftError;
          }
        }
        
        // If we created a temporary group and need to clean up
        if (tempGroupCreated && tempGroupId) {
          // Delete the temporary attendance group and its associated data
          await connection.query(
            'DELETE FROM attendance WHERE attendance_group_id = ?',
            [tempGroupId]
          );
          
          await connection.query(
            'DELETE FROM attendance_groups WHERE attendance_group_id = ?',
            [tempGroupId]
          );
          
          console.log('Cleaned up temporary attendance group');
        }
        
        // Commit the transaction
        await connection.commit();
        console.log('Transaction committed');
        
        res.status(201).json({
          message: `Successfully created ${results.length} payslip drafts`,
          drafts: results
        });
      } catch (analyzerError) {
        console.error('Error using PayrollAnalyzer:', analyzerError);
        throw analyzerError;
      }
    } catch (innerError) {
      console.error('Inner error, rolling back:', innerError);
      if (connection) await connection.rollback();
      throw innerError;
    }
  } catch (error) {
    console.error('Error saving payslip drafts:', error);
    
    // Rollback if there was an error
    if (connection) {
      try {
        await connection.rollback();
        console.log('Transaction rolled back');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }
    
    res.status(500).json({ 
      message: 'Failed to save payslip drafts', 
      error: error.message,
      stack: error.stack 
    });
  } finally {
    // Release connection
    if (connection) {
      connection.release();
      console.log('Connection released');
    }
  }
});

module.exports = router; 