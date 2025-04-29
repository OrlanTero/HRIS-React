const BaseModel = require('./BaseModel');

/**
 * MortuaryPayment model
 * Represents the mortuary_payments table from database
 * @class MortuaryPayment
 * @extends BaseModel
 */
class MortuaryPayment extends BaseModel {
  /**
   * Create a new MortuaryPayment instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('mortuary_payments');
    this.payment_id = data.payment_id || null;
    this.beneficiary_id = data.beneficiary_id || null;
    this.employee_id = data.employee_id || null;
    this.amount = data.amount || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find mortuary payment by ID
   * @param {number} id - Payment ID
   * @returns {Promise<MortuaryPayment>}
   */
  async findById(id) {
    return super.findById('payment_id', id);
  }

  /**
   * Update mortuary payment
   * @param {number} id - Payment ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('payment_id', id, data);
  }

  /**
   * Delete mortuary payment
   * @param {number} id - Payment ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('payment_id', id);
  }
}

module.exports = MortuaryPayment; 