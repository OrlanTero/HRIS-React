const BaseModel = require('./BaseModel');

/**
 * LoanStatement model
 * Represents the loan_statements table from database
 * @class LoanStatement
 * @extends BaseModel
 */
class LoanStatement extends BaseModel {
  /**
   * Create a new LoanStatement instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('loan_statements');
    this.statement_id = data.statement_id || null;
    this.employee_id = data.employee_id || null;
    this.loan_id = data.loan_id || null;
    this.start_date = data.start_date || null;
    this.end_date = data.end_date || null;
    this.amount = data.amount || null;
    this.balance = data.balance || null;
    this.num = data.num || null;
    this.label = data.label || null;
    this.status = data.status || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find loan statement by ID
   * @param {number} id - Statement ID
   * @returns {Promise<LoanStatement>}
   */
  async findById(id) {
    return super.findById('statement_id', id);
  }

  /**
   * Update loan statement
   * @param {number} id - Statement ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('statement_id', id, data);
  }

  /**
   * Delete loan statement
   * @param {number} id - Statement ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('statement_id', id);
  }
}

module.exports = LoanStatement; 