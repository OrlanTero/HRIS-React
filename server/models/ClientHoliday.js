const BaseModel = require('./BaseModel');

/**
 * ClientHoliday model
 * Represents the client_holidays table from database
 * @class ClientHoliday
 * @extends BaseModel
 */
class ClientHoliday extends BaseModel {
  /**
   * Create a new ClientHoliday instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('client_holidays');
    this.client_holiday_id = data.client_holiday_id || null;
    this.client_id = data.client_id || null;
    this.holiday_id = data.holiday_id || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find client holiday by ID
   * @param {number} id - Client holiday ID
   * @returns {Promise<ClientHoliday>}
   */
  async findById(id) {
    return super.findById('client_holiday_id', id);
  }

  /**
   * Update client holiday
   * @param {number} id - Client holiday ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('client_holiday_id', id, data);
  }

  /**
   * Delete client holiday
   * @param {number} id - Client holiday ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('client_holiday_id', id);
  }
}

module.exports = ClientHoliday; 