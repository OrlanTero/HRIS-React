const BaseModel = require('./BaseModel');

/**
 * Archive model
 * Represents the archives table from database
 * @class Archive
 * @extends BaseModel
 */
class Archive extends BaseModel {
  /**
   * Create a new Archive instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('archives');
    this.archive_id = data.archive_id || null;
    this.type = data.type || null;
    this.message = data.message || null;
    this.date_created = data.date_created || null;
    this.db_status = data.db_status || 1;
  }

  /**
   * Find archive by ID
   * @param {number} id - Archive ID
   * @returns {Promise<Archive>}
   */
  async findById(id) {
    return super.findById('archive_id', id);
  }

  /**
   * Update archive
   * @param {number} id - Archive ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('archive_id', id, data);
  }

  /**
   * Delete archive
   * @param {number} id - Archive ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('archive_id', id);
  }
}

module.exports = Archive; 