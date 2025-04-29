const BaseModel = require('./BaseModel');

/**
 * Disbursement model
 * Represents the disbursement table from database
 * @class Disbursement
 * @extends BaseModel
 */
class Disbursement extends BaseModel {
  /**
   * Create a new Disbursement instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('disbursement');
    this.disbursement_id = data.disbursement_id || null;
    this.requisition_id = data.requisition_id || null;
    this.voucher = data.voucher || null;
    this.date = data.date || null;
    this.paid_to = data.paid_to || null;
    this.type = data.type || null;
    this.posted = data.posted || null;
    this.cancelled = data.cancelled || null;
    this.payments = data.payments || null;
    this.amount = data.amount || null;
    this.remarks = data.remarks || null;
    this.request = data.request || null;
    this.db_status = data.db_status || 1;
    this.cheque_number = data.cheque_number || null;
    this.cheque_date = data.cheque_date || null;
    this.bank_id = data.bank_id || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find disbursement by ID
   * @param {number} id - Disbursement ID
   * @returns {Promise<Disbursement>}
   */
  async findById(id) {
    return super.findById('disbursement_id', id);
  }

  /**
   * Update disbursement
   * @param {number} id - Disbursement ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('disbursement_id', id, data);
  }

  /**
   * Delete disbursement
   * @param {number} id - Disbursement ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('disbursement_id', id);
  }
}

module.exports = Disbursement; 