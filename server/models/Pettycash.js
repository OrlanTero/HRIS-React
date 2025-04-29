const BaseModel = require('./BaseModel');

/**
 * Pettycash model
 * Represents the pettycash table from database
 * @class Pettycash
 * @extends BaseModel
 */
class Pettycash extends BaseModel {
  /**
   * Create a new Pettycash instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('pettycash');
    this.pettycash_id = data.pettycash_id || null;
    this.date = data.date || null;
    this.requested_by = data.requested_by || null;
    this.remarks = data.remarks || null;
    this.posted = data.posted || null;
    this.amount = data.amount || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find pettycash by ID
   * @param {number} id - Pettycash ID
   * @returns {Promise<Pettycash>}
   */
  async findById(id) {
    return super.findById('pettycash_id', id);
  }

  /**
   * Update pettycash
   * @param {number} id - Pettycash ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('pettycash_id', id, data);
  }

  /**
   * Delete pettycash
   * @param {number} id - Pettycash ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('pettycash_id', id);
  }
}

module.exports = Pettycash; 