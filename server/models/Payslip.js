const BaseModel = require('./BaseModel');

/**
 * Payslip model
 * Represents the payslips table from database
 * @class Payslip
 * @extends BaseModel
 */
class Payslip extends BaseModel {
  /**
   * Create a new Payslip instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('payslips');
    this.payslip_id = data.payslip_id || null;
    this.employee_id = data.employee_id || null;
    this.client_id = data.client_id || null;
    this.payslip_rates_id = data.payslip_rates_id || null;
    this.year = data.year || null;
    this.period = data.period || null;
    this.ndw = data.ndw || null;
    this.nhw = data.nhw || null;
    this.rest_day = data.rest_day || null;
    this.basic_pay = data.basic_pay || null;
    this.nsd = data.nsd || null;
    this.nsd_basic_pay = data.nsd_basic_pay || null;
    this.nhw_sh = data.nhw_sh || null;
    this.sh_basic_pay = data.sh_basic_pay || null;
    this.nhw_shot = data.nhw_shot || null;
    this.shot_basic_pay = data.shot_basic_pay || null;
    this.sss = data.sss || null;
    this.phil = data.phil || null;
    this.insurance = data.insurance || null;
    this.gross_pay = data.gross_pay || null;
    this.part1 = data.part1 || null;
    this.death = data.death || null;
    this.pagibig = data.pagibig || null;
    this.part2 = data.part2 || null;
    this.netpay = data.netpay || null;
    this.regular_hours = data.regular_hours || null;
    this.total_hours = data.total_hours || null;
    this.ot_hours = data.ot_hours || null;
    this.night_diff_hours = data.night_diff_hours || null;
    this.special_holiday_ot_hours = data.special_holiday_ot_hours || null;
    this.special_holiday_hours = data.special_holiday_hours || null;
    this.legal_holiday_hours = data.legal_holiday_hours || null;
    this.legal_holiday_ot_hours = data.legal_holiday_ot_hours || null;
    this.nhw_lh = data.nhw_lh || null;
    this.nhw_lhot = data.nhw_lhot || null;
    this.lh_basic_pay = data.lh_basic_pay || null;
    this.lhot_basic_pay = data.lhot_basic_pay || null;
    this.nhw_ot = data.nhw_ot || null;
    this.others = data.others || null;
    this.beneficiaries = data.beneficiaries || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find payslip by ID
   * @param {number} id - Payslip ID
   * @returns {Promise<Payslip>}
   */
  async findById(id) {
    return super.findById('payslip_id', id);
  }

  /**
   * Update payslip
   * @param {number} id - Payslip ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('payslip_id', id, data);
  }

  /**
   * Delete payslip
   * @param {number} id - Payslip ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('payslip_id', id);
  }
}

module.exports = Payslip; 