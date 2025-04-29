const BaseModel = require('./BaseModel');

/**
 * Bank model
 * Represents the banks table from database
 * @class Bank
 * @extends BaseModel
 */
class Bank extends BaseModel {
  /**
   * Create a new Bank instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('banks');
    this.bank_id = data.bank_id || null;
    this.name = data.name || null;
    this.branch = data.branch || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
    this.db_status = data.db_status || 1;
  }

  /**
   * Find bank by ID
   * @param {number} id - Bank ID
   * @returns {Promise<Bank>}
   */
  async findById(id) {
    return super.findById('bank_id', id);
  }

  /**
   * Update bank
   * @param {number} id - Bank ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('bank_id', id, data);
  }

  /**
   * Delete bank
   * @param {number} id - Bank ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('bank_id', id);
  }
}

module.exports = Bank; 