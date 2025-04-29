const BaseModel = require('./BaseModel');

/**
 * Employment model
 * Represents the employments table from database
 * @class Employment
 * @extends BaseModel
 */
class Employment extends BaseModel {
  /**
   * Create a new Employment instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('employments');
    this.employment_id = data.employment_id || null;
    this.date_hired = data.date_hired || null;
    this.date_end = data.date_end || null;
    this.employee_id = data.employee_id || null;
    this.position = data.position || null;
    this.department = data.department || null;
    this.e_type = data.e_type || null;
    this.status = data.status || null;
    this.rest_day_1 = data.rest_day_1 || null;
    this.rest_day_2 = data.rest_day_2 || null;
    this.active = data.active || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find employment by ID
   * @param {number} id - Employment ID
   * @returns {Promise<Employment>}
   */
  async findById(id) {
    return super.findById('employment_id', id);
  }

  /**
   * Update employment
   * @param {number} id - Employment ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('employment_id', id, data);
  }

  /**
   * Delete employment
   * @param {number} id - Employment ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('employment_id', id);
  }
}

module.exports = Employment; 