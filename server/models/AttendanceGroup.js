const BaseModel = require('./BaseModel');

/**
 * AttendanceGroup model
 * Represents the attendance_groups table from database
 * @class AttendanceGroup
 * @extends BaseModel
 */
class AttendanceGroup extends BaseModel {
  /**
   * Create a new AttendanceGroup instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('attendance_groups');
    this.attendance_group_id = data.attendance_group_id || null;
    this.period = data.period || null;
    this.year = data.year || null;
    this.client_id = data.client_id || null;
    this.active = data.active || null;
    this.finished = data.finished || null;
    this.archive_id = data.archive_id || null;
    this.db_status = data.db_status || 1;
  }

  /**
   * Find attendance group by ID
   * @param {number} id - Attendance group ID
   * @returns {Promise<AttendanceGroup>}
   */
  async findById(id) {
    return super.findById('attendance_group_id', id);
  }

  /**
   * Update attendance group
   * @param {number} id - Attendance group ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('attendance_group_id', id, data);
  }

  /**
   * Delete attendance group
   * @param {number} id - Attendance group ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('attendance_group_id', id);
  }
}

module.exports = AttendanceGroup; 