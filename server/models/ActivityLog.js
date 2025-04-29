const BaseModel = require('./BaseModel');

/**
 * ActivityLog model
 * Represents the activity_logs table from database
 * @class ActivityLog
 * @extends BaseModel
 */
class ActivityLog extends BaseModel {
  /**
   * Create a new ActivityLog instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('activity_logs');
    this.log_id = data.log_id || null;
    this.category = data.category || null;
    this.action = data.action || null;
    this.status = data.status || null;
    this.user = data.user || null;
    this.message = data.message || null;
    this.id = data.id || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
    this.date_created = data.date_created || null;
  }

  /**
   * Find activity log by ID
   * @param {number} id - Activity log ID
   * @returns {Promise<ActivityLog>}
   */
  async findById(id) {
    return super.findById('log_id', id);
  }

  /**
   * Update activity log
   * @param {number} id - Activity log ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('log_id', id, data);
  }

  /**
   * Delete activity log
   * @param {number} id - Activity log ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('log_id', id);
  }
}

module.exports = ActivityLog; 