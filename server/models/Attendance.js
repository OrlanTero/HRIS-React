const BaseModel = require('./BaseModel');

/**
 * Attendance model
 * Represents the attendance table from database
 * @class Attendance
 * @extends BaseModel
 */
class Attendance extends BaseModel {
  /**
   * Create a new Attendance instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('attendance');
    this.attendance_id = data.attendance_id || null;
    this.attendance_group_id = data.attendance_group_id || null;
    this.employee_id = data.employee_id || null;
    this.type = data.type || null;
    this.day = data.day || null;
    this.hours = data.hours || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
    this.date_created = data.date_created || null;
  }

  /**
   * Find attendance by ID
   * @param {number} id - Attendance ID
   * @returns {Promise<Attendance>}
   */
  async findById(id) {
    return super.findById('attendance_id', id);
  }

  /**
   * Update attendance
   * @param {number} id - Attendance ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('attendance_id', id, data);
  }

  /**
   * Delete attendance
   * @param {number} id - Attendance ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('attendance_id', id);
  }
}

module.exports = Attendance; 