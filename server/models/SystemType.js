const BaseModel = require('./BaseModel');

/**
 * SystemType model
 * Represents the system_types table from database
 * @class SystemType
 * @extends BaseModel
 */
class SystemType extends BaseModel {
  /**
   * Create a new SystemType instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('system_types');
    this.type_id = data.type_id || null;
    this.type = data.type || null;
    this.category = data.category || null;
    this.affects_in = data.affects_in || null;
    this.affects_value = data.affects_value || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find system type by ID
   * @param {number} id - System type ID
   * @returns {Promise<SystemType>}
   */
  async findById(id) {
    return super.findById('type_id', id);
  }

  /**
   * Update system type
   * @param {number} id - System type ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('type_id', id, data);
  }

  /**
   * Delete system type
   * @param {number} id - System type ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('type_id', id);
  }
}

module.exports = SystemType; 