const BaseModel = require('./BaseModel');

/**
 * PayslipRates model
 * Represents the payslip_rates table from database
 * @class PayslipRates
 * @extends BaseModel
 */
class PayslipRates extends BaseModel {
  /**
   * Create a new PayslipRates instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('payslip_rates');
    this.rate_id = data.rate_id || null;
    this.client_id = data.client_id || null;
    this.regular = data.regular || null;
    this.ot = data.ot || null;
    this.night_diff = data.night_diff || null;
    this.special_holiday = data.special_holiday || null;
    this.special_holiday_ot = data.special_holiday_ot || null;
    this.uniform = data.uniform || null;
    this.rest_day = data.rest_day || null;
    this.sea = data.sea || null;
    this.cola = data.cola || null;
    this.leave_rate = data.leave_rate || null;
    this.allowance = data.allowance || null;
    this.head_guard_allowance = data.head_guard_allowance || null;
    this.ctpa = data.ctpa || null;
    this.legal_holiday = data.legal_holiday || null;
    this.legal_holiday_ot = data.legal_holiday_ot || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find payslip rates by ID
   * @param {number} id - Rate ID
   * @returns {Promise<PayslipRates>}
   */
  async findById(id) {
    return super.findById('rate_id', id);
  }

  /**
   * Update payslip rates
   * @param {number} id - Rate ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('rate_id', id, data);
  }

  /**
   * Delete payslip rates
   * @param {number} id - Rate ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('rate_id', id);
  }
}

module.exports = PayslipRates; 