const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const PayrollAnalyzer = require('../services/PayrollAnalyzer');

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
            comp.lh_basic_pay || 0, comp.lhot_basic_pay || 0, comp.others || 0,
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
    const query = `
      SELECT pd.*,
             CONCAT(e.firstname, ' ', e.lastname) as employee_name,
             c.name as client_name
      FROM payslip_drafts pd
      JOIN employees e ON pd.employee_id = e.employee_id
      LEFT JOIN clients c ON pd.client_id = c.client_id
      WHERE pd.archive_id IS NULL
      ORDER BY pd.date_created DESC
    `;
    
    const [results] = await pool.query(query);
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
             c.name as client_name
      FROM payslip_drafts pd
      JOIN employees e ON pd.employee_id = e.employee_id
      LEFT JOIN clients c ON pd.client_id = c.client_id
      WHERE pd.payslip_draft_id = ? AND pd.archive_id IS NULL
    `;
    
    const [results] = await pool.query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payslip draft not found' });
    }
    
    res.json(results[0]);
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
      
      // Insert as official payslip
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
          `SELECT * FROM cash_advances 
           WHERE employee_id = ? AND status = 1 AND balance > 0`,
          [draft.employee_id]
        );
        
        for (const advance of cashAdvances) {
          await connection.query(
            'UPDATE cash_advances SET status = 0, balance = 0 WHERE cash_advance_id = ?',
            [advance.cash_advance_id]
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

module.exports = router; 