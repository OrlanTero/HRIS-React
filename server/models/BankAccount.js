const BaseModel = require('./BaseModel');

/**
 * BankAccount model
 * Represents the bank_accounts table from database
 * @class BankAccount
 * @extends BaseModel
 */
class BankAccount extends BaseModel {
  /**
   * Create a new BankAccount instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('bank_accounts');
    this.bank_account_id = data.bank_account_id || null;
    this.employee_id = data.employee_id || null;
    this.bank_id = data.bank_id || null;
    this.account_number = data.account_number || null;
    this.active = data.active || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find bank account by ID
   * @param {number} id - Bank account ID
   * @returns {Promise<BankAccount>}
   */
  async findById(id) {
    return super.findById('bank_account_id', id);
  }

  /**
   * Find bank accounts by employee ID
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>}
   */
  async findByEmployeeId(employeeId) {
    try {
      const [rows] = await this.pool.query(
        'SELECT * FROM bank_accounts WHERE employee_id = ? AND active = 1 AND archive_id IS NULL',
        [employeeId]
      );
      return rows;
    } catch (error) {
      console.error(`Error finding bank accounts for employee ${employeeId}:`, error);
      throw error;
    }
  }

  /**
   * Update bank account
   * @param {number} id - Bank account ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('bank_account_id', id, data);
  }

  /**
   * Deactivate bank account
   * @param {number} id - Bank account ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    try {
      const [result] = await this.pool.query(
        'UPDATE bank_accounts SET active = 0 WHERE bank_account_id = ?',
        [id]
      );
      
      return {
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error deactivating bank account ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deactivate all bank accounts for an employee
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Object>}
   */
  async deleteByEmployeeId(employeeId) {
    try {
      const [result] = await this.pool.query(
        'UPDATE bank_accounts SET active = 0 WHERE employee_id = ?',
        [employeeId]
      );
      
      return {
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error deactivating bank accounts for employee ${employeeId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get all banks for dropdown
   * @returns {Promise<Array>}
   */
  async getAllBanks() {
    try {
      const [rows] = await this.pool.query('SELECT * FROM banks');
      return rows;
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
    }
  }
}

module.exports = BankAccount; 