const BaseModel = require('./BaseModel');

/**
 * UserAuthentication model
 * Represents the user_authentication table from database
 * @class UserAuthentication
 * @extends BaseModel
 */
class UserAuthentication extends BaseModel {
  /**
   * Create a new UserAuthentication instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('user_authentication');
    this.id = data.id || null;
    this.auth_type = data.auth_type || null;
    this.username = data.username || null;
    this.password = data.password || null;
    this.pin = data.pin || null;
    this.email_address = data.email_address || null;
    this.active = data.active || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find user authentication by ID
   * @param {number} id - User authentication ID
   * @returns {Promise<UserAuthentication>}
   */
  async findById(id) {
    return super.findById('id', id);
  }

  /**
   * Update user authentication
   * @param {number} id - User authentication ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('id', id, data);
  }

  /**
   * Delete user authentication
   * @param {number} id - User authentication ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('id', id);
  }
}

module.exports = UserAuthentication; 