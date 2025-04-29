const BaseModel = require('./BaseModel');

/**
 * Loan model
 * Represents the loans table from database
 * @class Loan
 * @extends BaseModel
 */
class Loan extends BaseModel {
  /**
   * Create a new Loan instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('loans');
    this.loan_id = data.loan_id || null;
    this.employee_id = data.employee_id || null;
    this.amount = data.amount || null;
    this.balance = data.balance || null;
    this.target_date = data.target_date || null;
    this.loan_type = data.loan_type || null;
    this.payment_type = data.payment_type || null;
    this.principal = data.principal || null;
    this.interest_rate = data.interest_rate || null;
    this.interest_value = data.interest_value || null;
    this.payable_by = data.payable_by || null;
    this.description = data.description || null;
    this.advance = data.advance || null;
    this.status = data.status || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find loan by ID
   * @param {number} id - Loan ID
   * @returns {Promise<Loan>}
   */
  async findById(id) {
    return super.findById('loan_id', id);
  }

  /**
   * Update loan
   * @param {number} id - Loan ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('loan_id', id, data);
  }

  /**
   * Delete loan
   * @param {number} id - Loan ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('loan_id', id);
  }
}

module.exports = Loan; 