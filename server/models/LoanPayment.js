const BaseModel = require('./BaseModel');

/**
 * LoanPayment model
 * Represents the loan_payments table from database
 * @class LoanPayment
 * @extends BaseModel
 */
class LoanPayment extends BaseModel {
  /**
   * Create a new LoanPayment instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('loan_payments');
    this.payment_id = data.payment_id || null;
    this.employee_id = data.employee_id || null;
    this.loans = data.loans || null;
    this.loan_types = data.loan_types || null;
    this.note = data.note || null;
    this.to_pay = data.to_pay || null;
    this.period = data.period || null;
    this.year = data.year || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find loan payment by ID
   * @param {number} id - Payment ID
   * @returns {Promise<LoanPayment>}
   */
  async findById(id) {
    return super.findById('payment_id', id);
  }

  /**
   * Update loan payment
   * @param {number} id - Payment ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('payment_id', id, data);
  }

  /**
   * Delete loan payment
   * @param {number} id - Payment ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('payment_id', id);
  }
}

module.exports = LoanPayment; 