const pool = require('../config/database');

// Constants for attendance types
const ATTENDANCE_TYPES = {
  REGULAR: 0,
  OT: 1,
  REST_DAY: 2,
  LEGAL_HOLIDAY: 3,
  LEGAL_HOLIDAY_OT: 4,
  NIGHT_DIFF: 5,
  SPECIAL_HOLIDAY: 6,
  SPECIAL_HOLIDAY_OT: 7
};

// Constants for service deduction types
const SERVICE_DEDUCTION_TYPES = {
  SSS: 1,
  PHILHEALTH: 2,
  PAGIBIG: 3
};

// Constants for month periods
const MONTH_PERIOD = {
  ONETO15: 1,
  SIXTEENTOEND: 2
};

// Constants for employment position types
const EMPLOYMENT_POSITION_TYPES = {
  HEAD_GUARD: 'Head Guard',
  GUARD: 'Guard'
};

class PayrollAnalyzer {
  constructor(groupId) {
    this.groupId = groupId;
    this.group = null;
    this.attendances = null;
  }

  async init() {
    // Get the attendance group and its associated data
    const [groupResults] = await pool.query(
      `SELECT ag.*, c.* 
       FROM attendance_groups ag
       LEFT JOIN clients c ON ag.client_id = c.client_id
       WHERE ag.attendance_group_id = ?`,
      [this.groupId]
    );

    if (groupResults.length === 0) {
      throw new Error('Attendance group not found');
    }

    this.group = groupResults[0];

    // Get all attendances for this group - only select fields that exist in database
    const [attendanceResults] = await pool.query(
      `SELECT a.*, e.employee_id, e.firstname, e.lastname,
              em.employment_id, em.position
       FROM attendance a
       JOIN employees e ON a.employee_id = e.employee_id
       LEFT JOIN employments em ON e.employee_id = em.employee_id
       WHERE a.attendance_group_id = ? AND a.archive_id IS NULL
       ORDER BY e.lastname, e.firstname, a.day`,
      [this.groupId]
    );

    // Group attendances by employee
    this.attendances = this.groupAttendancesByEmployee(attendanceResults);
  }

  groupAttendancesByEmployee(attendanceRecords) {
    const groupedAttendances = {};

    for (const record of attendanceRecords) {
      if (!groupedAttendances[record.employee_id]) {
        groupedAttendances[record.employee_id] = {
          employee: {
            employee_id: record.employee_id,
            firstname: record.firstname,
            lastname: record.lastname,
            name: `${record.firstname} ${record.lastname}`
          },
          employment: {
            employment_id: record.employment_id,
            position: record.position || ''  // Use empty string as default
          },
          attendance: [],
          ndw: 0, // Number of days worked
          daysWorked: new Set() // Track unique days worked
        };
      }

      groupedAttendances[record.employee_id].attendance.push(record);

      // Track any day with hours > 0 as a working day, regardless of type
      const hours = parseFloat(record.hours || 0);
      if (hours > 0) {
        groupedAttendances[record.employee_id].daysWorked.add(parseInt(record.day));
      }
    }

    // Calculate ndw from the unique days worked
    Object.values(groupedAttendances).forEach(employeeData => {
      employeeData.ndw = employeeData.daysWorked.size;
      delete employeeData.daysWorked; // Remove the temporary set
    });

    return Object.values(groupedAttendances);
  }

  async getAttendanceOfEmployee(employeeId) {
    return this.attendances.find(a => a.employee.employee_id === parseInt(employeeId));
  }

  async computeAttendanceOf(employeeId) {
    const employeeAttendance = await this.getAttendanceOfEmployee(employeeId);
    if (!employeeAttendance) {
      throw new Error('Employee attendance not found');
    }
    return await this.compute(employeeAttendance);
  }

  async compute(AI) {
    try {
      // Validate that required data exists
      if (!AI || !AI.employee) {
        throw new Error('Missing employee data in attendance record');
      }

      const client = this.group;
      const employee = AI.employee;
      const employment = AI.employment || {}; // Provide default empty object if missing
      const attendance = AI.attendance || []; // Provide default empty array if missing
      const ndw = AI.ndw || 0;

      // Get cash advances
      let cashAdvances = [];
      try {
        [cashAdvances] = await pool.query(
          `SELECT * FROM loans 
           WHERE employee_id = ? AND status = 1 AND balance > 0 AND loan_type = 'Cash Advance'`,
          [employee.employee_id]
        );
      } catch (error) {
        console.error(`Error fetching cash advances for employee ${employee.employee_id}:`, error);
        // Continue with empty array
      }

      // Get loan statements
      let loanStatements = [];
      try {
        [loanStatements] = await pool.query(
          `SELECT ls.*, l.loan_type, l.description 
           FROM loan_statements ls
           JOIN loans l ON ls.loan_id = l.loan_id
           WHERE ls.employee_id = ? AND ls.status = 0 AND ls.db_status = 1
           ORDER BY ls.end_date ASC`,
          [employee.employee_id]
        );
      } catch (error) {
        console.error(`Error fetching loan statements for employee ${employee.employee_id}:`, error);
        // Continue with empty array
      }

      // Get separate loans (group by loan_id)
      const separateLoans = {};
      for (const statement of loanStatements) {
        if (!separateLoans[statement.loan_id]) {
          separateLoans[statement.loan_id] = statement;
        }
      }

      // Get loan descriptions
      const loanDescriptions = Object.values(separateLoans)
        .map(statement => statement.description)
        .filter(desc => desc)
        .join(',');

      // Calculate total loan balance - safely handle null/undefined
      const totalLoanBalance = loanStatements.reduce((sum, statement) => {
        return sum + parseFloat(statement.balance || 0);
      }, 0);

      // Get adjustments
      let adjustments = [];
      try {
        [adjustments] = await pool.query(
          `SELECT * FROM adjustment 
           WHERE employee_id = ? AND status = 1 AND db_status = 1`,
          [employee.employee_id]
        );
      } catch (error) {
        console.error(`Error fetching adjustments for employee ${employee.employee_id}:`, error);
        // Continue with empty array
      }

      // Get beneficiaries - handle with try/catch
      let beneficiaries = [];
      try {
        [beneficiaries] = await pool.query(
          `SELECT b.* FROM beneficiaries b
           JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
           WHERE m.year = ? AND m.period = ?`,
          [this.group.year, this.group.period]
        );
      } catch (error) {
        console.error(`Error fetching beneficiaries:`, error);
        // Continue with empty array
      }

      // Calculate totals
      const cashAdvanceBalance = this.calculateTotalBalance(cashAdvances);
      const totalAdjustments = this.calculateTotalAdjustments(adjustments);

      // Get rates - handle potential null client
      const rates = this.getRates(client, employment);

      // Calculate hours
      const hours = this.calculateHours(attendance);

      // Calculate pay values
      const payValues = this.calculatePayValues(hours, rates);

      // Calculate gross pay
      const GP = this.calculateGrossPay(payValues, rates, totalAdjustments);

      // Calculate deductions
      const deductions = await this.calculateDeductions(
        GP, 
        this.group.period, 
        beneficiaries, 
        cashAdvanceBalance, 
        totalLoanBalance, 
        rates
      );

      // Create payroll computation object
      const computation = this.createPayrollComputation(
        employee,
        hours,
        payValues,
        rates,
        deductions,
        GP,
        ndw,
        cashAdvanceBalance,
        totalAdjustments,
        totalLoanBalance,
        beneficiaries,
        loanDescriptions
      );

      return computation;
    } catch (error) {
      console.error('Error computing payroll:', error);
      throw error;
    }
  }

  calculateTotalBalance(records) {
    return records.reduce((sum, record) => sum + parseFloat(record.balance || 0), 0);
  }

  calculateTotalAdjustments(adjustments) {
    return adjustments.reduce((sum, adj) => sum + parseFloat(adj.amount || 0), 0);
  }

  getRates(client, employment) {
    // Ensure client is not null and has required properties
    if (!client) {
      console.error('Client is null or undefined');
      return {
        REGULAR: 0, REGULAR_OT: 0, SPECIAL_HOLIDAY: 0, SPECIAL_HOLIDAY_OT: 0,
        LEGAL_HOLIDAY: 0, LEGAL_HOLIDAY_OT: 0, NIGHT_DIFF: 0, REST_DAY: 0,
        UNIFORM: 0, SEA: 0, ALLOWANCE: 0, HEAD_GUARD_ALLOWANCE: 0, CTPA: 0, COLA: 0, LEAVE: 0
      };
    }

    // Check if employee is a head guard by position field only
    const isHeadGuard = employment && employment.position === 'Head Guard';

    return {
      REGULAR: parseFloat(client.regular || 0),
      REGULAR_OT: parseFloat(client.overtime || 0),
      SPECIAL_HOLIDAY: parseFloat(client.special_holiday || 0),
      SPECIAL_HOLIDAY_OT: parseFloat(client.special_holiday_ot || 0),
      LEGAL_HOLIDAY: parseFloat(client.legal_holiday || 0),
      LEGAL_HOLIDAY_OT: parseFloat(client.legal_holiday_ot || 0),
      NIGHT_DIFF: parseFloat(client.nightdiff || 0),
      REST_DAY: parseFloat(client.restday || 0),
      UNIFORM: parseFloat(client.uniform || 0),
      SEA: parseFloat(client.sea || 0),
      ALLOWANCE: parseFloat(client.allowance || 0),
      HEAD_GUARD_ALLOWANCE: isHeadGuard ? parseFloat(client.head_guard_allowance || 0) : 0,
      CTPA: parseFloat(client.ctpa || 0),
      COLA: parseFloat(client.cola || 0),
      LEAVE: parseFloat(client.leave_rate || 0)
    };
  }

  calculateHours(attendance) {
    const hours = {};
    
    // Initialize with 0 for all types
    Object.values(ATTENDANCE_TYPES).forEach(type => {
      hours[type] = 0;
    });

    // Sum up hours by type
    for (const record of attendance) {
      const type = parseInt(record.type);
      hours[type] += parseFloat(record.hours || 0);
    }

    return hours;
  }

  calculatePayValues(hours, rates) {
    return {
      BP: (hours[ATTENDANCE_TYPES.REGULAR] * rates.REGULAR) + 
          (hours[ATTENDANCE_TYPES.OT] * rates.REGULAR_OT),
      RR: hours[ATTENDANCE_TYPES.REST_DAY] * rates.REST_DAY,
      NSDBP: rates.NIGHT_DIFF * hours[ATTENDANCE_TYPES.NIGHT_DIFF],
      NHWSHBP: rates.SPECIAL_HOLIDAY * hours[ATTENDANCE_TYPES.SPECIAL_HOLIDAY],
      SHOTBP: rates.SPECIAL_HOLIDAY_OT * hours[ATTENDANCE_TYPES.SPECIAL_HOLIDAY_OT],
      NHWLHBP: rates.LEGAL_HOLIDAY * hours[ATTENDANCE_TYPES.LEGAL_HOLIDAY],
      LHOTBP: rates.LEGAL_HOLIDAY_OT * hours[ATTENDANCE_TYPES.LEGAL_HOLIDAY_OT],
      OTBP: rates.REGULAR_OT * hours[ATTENDANCE_TYPES.OT]
    };
  }

  calculateGrossPay(payValues, rates, totalAdjustments) {
    return Object.values(payValues).reduce((sum, value) => sum + value, 0) + 
           rates.ALLOWANCE + 
           rates.HEAD_GUARD_ALLOWANCE + 
           totalAdjustments;
  }

  async calculateDeductions(GP, period, beneficiaries, cashAdvanceBalance, totalLoanBalance, rates) {
    // Get service deductions for SSS, Philhealth, Pagibig
    const sssDeduction = await this.getDeductionOf(GP, SERVICE_DEDUCTION_TYPES.SSS);
    const philDeduction = await this.getDeductionOf(GP, SERVICE_DEDUCTION_TYPES.PHILHEALTH);
    const pagibigDeduction = await this.getDeductionOf(GP, SERVICE_DEDUCTION_TYPES.PAGIBIG);

    // Apply deductions
    const _SSS = sssDeduction ? sssDeduction.ee : 0;
    
    // For Philhealth and Pagibig, only apply in the second half of the month
    const isSecondHalf = this.getMonthPeriod(period) === MONTH_PERIOD.SIXTEENTOEND;
    const _PHIL = isSecondHalf ? (philDeduction ? philDeduction.ee : 0) : 0;
    const _PAGIBIG = isSecondHalf ? (pagibigDeduction ? pagibigDeduction.ee : 0) : 0;

    const _UNIFORM_DEDUCTION = Math.max(rates.UNIFORM, 0);
    const _INSURANCE = 20; // Fixed value
    const _DEATH_CONTRI = 50; // Fixed value per beneficiary
    const _DEATH = beneficiaries.length * _DEATH_CONTRI;

    const _PART1 = parseFloat(_SSS) + parseFloat(_PHIL) + parseFloat(_INSURANCE);
    const _PART2 = parseFloat(_DEATH) + parseFloat(_PAGIBIG);
    const _PART3 = parseFloat(_UNIFORM_DEDUCTION) + 
                  parseFloat(rates.SEA) + 
                  parseFloat(rates.CTPA) + 
                  parseFloat(rates.COLA) + 
                  parseFloat(totalLoanBalance) + 
                  parseFloat(cashAdvanceBalance);

    return {
      SSS: _SSS,
      PHIL: _PHIL,
      PAGIBIG: _PAGIBIG,
      INSURANCE: _INSURANCE,
      OTHERS: _PART3,
      PART1: _PART1,
      PART2: _PART2,
      DEATH: _DEATH
    };
  }

  async getDeductionOf(grossPay, type) {
    // Get the appropriate deduction for the given gross pay and type
    const [deductions] = await pool.query(
      `SELECT * FROM service_deductions 
       WHERE type = ? AND min_range <= ? AND max_range >= ?
       ORDER BY min_range ASC`,
      [type, grossPay, grossPay]
    );

    if (deductions.length > 0) {
      return deductions[0];
    }
    
    return null;
  }

  getMonthPeriod(periodString) {
    // Check if period contains "16 to" to determine if it's the second half
    return periodString.includes('16 to') ? MONTH_PERIOD.SIXTEENTOEND : MONTH_PERIOD.ONETO15;
  }

  createPayrollComputation(
    employee, 
    hours, 
    payValues, 
    rates, 
    deductions, 
    GP, 
    ndw, 
    cashAdvanceBalance, 
    totalAdjustments, 
    totalLoanBalance, 
    beneficiaries, 
    loanPurpose
  ) {
    // Create the payroll computation object with all calculated values
    const computation = {
      // Employee info
      employee_id: employee.employee_id,
      client_id: this.group.client_id,
      name: employee.name,
      year: this.group.year,
      period: this.group.period,
      
      // Hours
      regular_hours: hours[ATTENDANCE_TYPES.REGULAR],
      ot_hours: hours[ATTENDANCE_TYPES.OT],
      night_diff_hours: hours[ATTENDANCE_TYPES.NIGHT_DIFF],
      special_holiday_hours: hours[ATTENDANCE_TYPES.SPECIAL_HOLIDAY],
      special_holiday_ot_hours: hours[ATTENDANCE_TYPES.SPECIAL_HOLIDAY_OT],
      legal_holiday_hours: hours[ATTENDANCE_TYPES.LEGAL_HOLIDAY],
      legal_holiday_ot_hours: hours[ATTENDANCE_TYPES.LEGAL_HOLIDAY_OT],
      total_hours: Object.values(hours).reduce((sum, value) => sum + value, 0),
      
      // Work metrics
      ndw: ndw,
      nhw: hours[ATTENDANCE_TYPES.REGULAR],
      nhw_ot: hours[ATTENDANCE_TYPES.OT],
      
      // Rest day
      rest_day: payValues.RR,
      
      // Pay values
      basic_pay: payValues.BP,
      nsd: rates.NIGHT_DIFF !== 0 ? payValues.NSDBP / rates.NIGHT_DIFF : 0,
      nsd_basic_pay: payValues.NSDBP,
      
      // Special holiday
      nhw_sh: rates.SPECIAL_HOLIDAY !== 0 ? payValues.NHWSHBP / rates.SPECIAL_HOLIDAY : 0,
      sh_basic_pay: payValues.NHWSHBP,
      nhw_shot: rates.SPECIAL_HOLIDAY_OT !== 0 ? payValues.SHOTBP / rates.SPECIAL_HOLIDAY_OT : 0,
      shot_basic_pay: payValues.SHOTBP,
      
      // Legal holiday
      nhw_lh: rates.LEGAL_HOLIDAY !== 0 ? payValues.NHWLHBP / rates.LEGAL_HOLIDAY : 0,
      lh_basic_pay: payValues.NHWLHBP,
      nhw_lhot: rates.LEGAL_HOLIDAY_OT !== 0 ? payValues.LHOTBP / rates.LEGAL_HOLIDAY_OT : 0,
      lhot_basic_pay: payValues.LHOTBP,
      
      // Gross pay
      gross_pay: GP,
      
      // Deductions
      sss: deductions.SSS,
      phil: deductions.PHIL,
      insurance: deductions.INSURANCE,
      part1: deductions.PART1,
      death: deductions.DEATH,
      pagibig: deductions.PAGIBIG,
      part2: deductions.PART2,
      others: deductions.OTHERS,
      
      // Net pay
      netpay: GP - (deductions.PART1 + deductions.PART2 + deductions.OTHERS),
      
      // Additional
      cash_advances: cashAdvanceBalance,
      adjustments: totalAdjustments,
      loan_statement: totalLoanBalance,
      loan_purpose: loanPurpose,
      
      // Beneficiaries
      beneficiaries: beneficiaries.map(b => b.beneficiary_id).join(','),
      beneficiaries_data: beneficiaries
    };
    
    return computation;
  }

  async computeAll() {
    const computations = [];
    
    for (const attendance of this.attendances) {
      try {
        const computation = await this.compute(attendance);
        computations.push(computation);
      } catch (error) {
        console.error(`Error computing payroll for employee ${attendance.employee.employee_id}:`, error);
      }
    }
    
    return computations;
  }
}

module.exports = PayrollAnalyzer; 