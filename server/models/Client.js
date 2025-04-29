const BaseModel = require('./BaseModel');

/**
 * Client model
 * Represents the clients table from database
 * @class Client
 * @extends BaseModel
 */
class Client extends BaseModel {
  /**
   * Create a new Client instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('clients');
    this.client_id = data.client_id || null;
    this.name = data.name || null;
    this.branch = data.branch || null;
    this.region = data.region || null;
    this.mobile = data.mobile || null;
    this.telephone = data.telephone || null;
    this.email = data.email || null;
    this.person = data.person || null;
    this.w_pagibig = data.w_pagibig || null;
    this.address = data.address || null;
    this.vat = data.vat || null;
    this.swfee_1 = data.swfee_1 || null;
    this.swfee_2 = data.swfee_2 || null;
    this.swfee_3 = data.swfee_3 || null;
    this.agency_1 = data.agency_1 || null;
    this.agency_2 = data.agency_2 || null;
    this.agency_3 = data.agency_3 || null;
    this.regular = data.regular || null;
    this.overtime = data.overtime || null;
    this.month = data.month || null;
    this.regular_1 = data.regular_1 || null;
    this.overtime_1 = data.overtime_1 || null;
    this.month_1 = data.month_1 || null;
    this.regular_2 = data.regular_2 || null;
    this.overtime_2 = data.overtime_2 || null;
    this.nightdiff = data.nightdiff || null;
    this.sea = data.sea || null;
    this.cola = data.cola || null;
    this.leave_1 = data.leave_1 || null;
    this.uniform = data.uniform || null;
    this.allowance = data.allowance || null;
    this.head_guard_allowance = data.head_guard_allowance || null;
    this.ctpa = data.ctpa || null;
    this.legal_holiday = data.legal_holiday || null;
    this.special_holiday = data.special_holiday || null;
    this.restday = data.restday || null;
    this.legal_holiday_ot = data.legal_holiday_ot || null;
    this.special_holiday_ot = data.special_holiday_ot || null;
    this.restday_ot = data.restday_ot || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find client by ID
   * @param {number} id - Client ID
   * @returns {Promise<Client>}
   */
  async findById(id) {
    return super.findById('client_id', id);
  }

  /**
   * Update client
   * @param {number} id - Client ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('client_id', id, data);
  }

  /**
   * Delete client
   * @param {number} id - Client ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('client_id', id);
  }
}

module.exports = Client; 