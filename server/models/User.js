const BaseModel = require('./BaseModel');

/**
 * User model
 * Represents the users table from database
 * @class User
 * @extends BaseModel
 */
class User extends BaseModel {
  /**
   * Create a new User instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('users');
    this.user_id = data.user_id || null;
    this.firstname = data.firstname || null;
    this.lastname = data.lastname || null;
    this.email = data.email || null;
    this.phone = data.phone || null;
    this.image = data.image || null;
    this.signin_with = data.signin_with || null;
    this.user_type = data.user_type || null;
    this.date_created = data.date_created || null;
    this.displayName = data.displayName || null;
    this.facebook = data.facebook || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>}
   */
  async findById(id) {
    return super.findById('user_id', id);
  }

  /**
   * Update user
   * @param {number} id - User ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('user_id', id, data);
  }

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('user_id', id);
  }
}

module.exports = User; 