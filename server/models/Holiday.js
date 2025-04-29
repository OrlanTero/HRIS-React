const BaseModel = require('./BaseModel');

/**
 * Holiday model
 * Represents the holidays table from database
 * @class Holiday
 * @extends BaseModel
 */
class Holiday extends BaseModel {
  /**
   * Create a new Holiday instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('holidays');
    this.holiday_id = data.holiday_id || null;
    this.holiday_date = data.holiday_date || null;
    this.holiday = data.holiday || null;
    this.national_local = data.national_local || "";
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find holiday by ID
   * @param {number} id - Holiday ID
   * @returns {Promise<Holiday>}
   */
  async findById(id) {
    return super.findById('holiday_id', id);
  }

  /**
   * Update holiday
   * @param {number} id - Holiday ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('holiday_id', id, data);
  }

  /**
   * Delete holiday
   * @param {number} id - Holiday ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('holiday_id', id);
  }
}

module.exports = Holiday; 