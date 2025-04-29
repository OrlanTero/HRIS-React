const BaseModel = require('./BaseModel');

/**
 * UserProfile model
 * Represents the user_profile table from database
 * @class UserProfile
 * @extends BaseModel
 */
class UserProfile extends BaseModel {
  /**
   * Create a new UserProfile instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('user_profile');
    this.id = data.id || null;
    this.name = data.name || null;
    this.description = data.description || null;
    this.owner = data.owner || null;
    this.address = data.address || null;
    this.tell_no = data.tell_no || null;
    this.tin = data.tin || null;
    this.email = data.email || null;
    this.company_logo = data.company_logo || null;
    this.main_logo = data.main_logo || null;
    this.year = data.year || null;
    this.period = data.period || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find user profile by ID
   * @param {number} id - User profile ID
   * @returns {Promise<UserProfile>}
   */
  async findById(id) {
    return super.findById('id', id);
  }

  /**
   * Update user profile
   * @param {number} id - User profile ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('id', id, data);
  }

  /**
   * Delete user profile
   * @param {number} id - User profile ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('id', id);
  }
}

module.exports = UserProfile; 