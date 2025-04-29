const BaseModel = require('./BaseModel');

/**
 * PettyCashReport model
 * Represents the petty_cash_reports table from database
 * @class PettyCashReport
 * @extends BaseModel
 */
class PettyCashReport extends BaseModel {
  /**
   * Create a new PettyCashReport instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('petty_cash_reports');
    this.petty_cash_report_id = data.petty_cash_report_id || null;
    this.voucher = data.voucher || null;
    this.type = data.type || null;
    this.remarks = data.remarks || null;
    this.date_modify = data.date_modify || null;
    this.cash_in = data.cash_in || null;
    this.cash_out = data.cash_out || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find petty cash report by ID
   * @param {number} id - Petty cash report ID
   * @returns {Promise<PettyCashReport>}
   */
  async findById(id) {
    return super.findById('petty_cash_report_id', id);
  }

  /**
   * Update petty cash report
   * @param {number} id - Petty cash report ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('petty_cash_report_id', id, data);
  }

  /**
   * Delete petty cash report
   * @param {number} id - Petty cash report ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('petty_cash_report_id', id);
  }
}

module.exports = PettyCashReport; 