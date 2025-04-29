const BaseModel = require('./BaseModel');
const db = require('../config/database');

/**
 * Employee model
 * Represents the employees table from database
 * @class Employee
 * @extends BaseModel
 */
class Employee extends BaseModel {
  /**
   * Create a new Employee instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('employees');
    this.employee_id = data.employee_id || null;
    this.firstname = data.firstname || null;
    this.lastname = data.lastname || null;
    this.birthdate = data.birthdate || null;
    this.address = data.address || null;
    this.contact_number = data.contact_number || null;
    this.emergency_contact = data.emergency_contact || null;
    this.gender = data.gender || null;
    this.civil_status = data.civil_status || null;
    this.sss_id = data.sss_id || null;
    this.tin_id = data.tin_id || null;
    this.philhealth_id = data.philhealth_id || null;
    this.pagibig_id = data.pagibig_id || null;
    this.position = data.position || null;
    this.department = data.department || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Get full name of employee
   * @returns {string} Full name (lastname, firstname middleinitial)
   */
  getFullName() {
    const middleInitial = this.middlename ? this.middlename.charAt(0) : '';
    return `${this.lastname}, ${this.firstname} ${middleInitial}`;
  }

  /**
   * Find employee by ID
   * @param {number} id - Employee ID
   * @returns {Promise<Employee>}
   */
  async findById(id) {
    return super.findById('employee_id', id);
  }

  /**
   * Update employee
   * @param {number} id - Employee ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('employee_id', id, data);
  }

  /**
   * Delete employee
   * @param {number} id - Employee ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    // Soft delete by setting db_status to 0
    return this.softDelete('employee_id', id);
  }

  /**
   * Get cash advances for employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>} Cash advances
   */
  async getCashAdvances(employeeId) {
    try {
      const [rows] = await db.query(
        `SELECT l.*, st.affects_in, st.affects_value 
         FROM loans l
         JOIN system_types st ON l.type_id = st.type_id
         WHERE l.status = 1 AND l.advance = '0' AND l.employee_id = ? 
         AND st.affects_in = 1 AND st.affects_value = 1`,
        [employeeId]
      );
      return rows;
    } catch (error) {
      console.error('Error in getCashAdvances:', error);
      throw error;
    }
  }

  /**
   * Get loan statements for employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>} Loan statements
   */
  async getLoanStatements(employeeId) {
    try {
      const [loans] = await db.query(
        `SELECT * FROM loans 
         WHERE status = 1 AND advance = '1' AND employee_id = ?`,
        [employeeId]
      );

      // Get the current period statements for each loan
      const statements = [];
      for (const loan of loans) {
        const [currentStatements] = await db.query(
          `SELECT * FROM loan_statements 
           WHERE loan_id = ? 
           ORDER BY payment_date ASC`,
          [loan.loan_id]
        );
        
        if (currentStatements.length > 0) {
          statements.push(currentStatements[0]);
        }
      }
      
      return statements;
    } catch (error) {
      console.error('Error in getLoanStatements:', error);
      throw error;
    }
  }

  /**
   * Get adjustments for employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>} Adjustments
   */
  async getAdjustments(employeeId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM adjustment WHERE employee_id = ?`,
        [employeeId]
      );
      return rows;
    } catch (error) {
      console.error('Error in getAdjustments:', error);
      throw error;
    }
  }

  /**
   * Get bank accounts for employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>} Bank accounts
   */
  async getBanks(employeeId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM bank_accounts WHERE employee_id = ?`,
        [employeeId]
      );
      return rows;
    } catch (error) {
      console.error('Error in getBanks:', error);
      throw error;
    }
  }

  /**
   * Get beneficiaries for employee
   * @param {number} employeeId - Employee ID
   * @param {string} period - Period
   * @param {string} year - Year
   * @returns {Promise<Array>} Beneficiaries
   */
  async getBeneficiary(employeeId, period, year) {
    try {
      const [rows] = await db.query(
        `SELECT a.* FROM beneficiaries as a 
         WHERE a.employee_id = ? AND a.mortuary_id IN 
         (SELECT b.mortuary_id FROM mortuaries as b 
          WHERE b.period = ? AND b.year = ?)`,
        [employeeId, period, year]
      );
      return rows[0];
    } catch (error) {
      console.error('Error in getBeneficiary:', error);
      throw error;
    }
  }

  /**
   * Get all beneficiaries for employee
   * @param {number} employeeId - Employee ID
   * @param {string} period - Period
   * @param {string} year - Year
   * @returns {Promise<Array>} All beneficiaries
   */
  async getAllBeneficiary(employeeId, period, year) {
    try {
      const [rows] = await db.query(
        `SELECT a.* FROM beneficiaries as a 
         WHERE a.employee_id = ? AND a.mortuary_id IN 
         (SELECT b.mortuary_id FROM mortuaries as b 
          WHERE b.period = ? AND b.year = ?)`,
        [employeeId, period, year]
      );
      return rows;
    } catch (error) {
      console.error('Error in getAllBeneficiary:', error);
      throw error;
    }
  }

  /**
   * Get bank accounts associated with an employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>}
   */
  async getBankAccounts(employeeId) {
    try {
      const [rows] = await this.pool.query(
        'SELECT * FROM bank_accounts WHERE employee_id = ? AND db_status = 1',
        [employeeId]
      );
      return rows;
    } catch (error) {
      console.error(`Error getting bank accounts for employee ${employeeId}:`, error);
      throw error;
    }
  }
}

module.exports = Employee; 