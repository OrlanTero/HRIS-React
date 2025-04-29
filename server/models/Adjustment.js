const BaseModel = require('./BaseModel');

/**
 * Adjustment model
 * Represents the adjustment table from database
 * @class Adjustment
 * @extends BaseModel
 */
class Adjustment extends BaseModel {
  /**
   * Create a new Adjustment instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('adjustment');
    this.adjustment_id = data.adjustment_id || null;
    this.employee_id = data.employee_id || null;
    this.amount = data.amount || null;
    this.type_id = data.type_id || null;
    this.date = data.date || null;
    this.status = data.status || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find adjustment by ID
   * @param {number} id - Adjustment ID
   * @returns {Promise<Adjustment>}
   */
  async findById(id) {
    return super.findById('adjustment_id', id);
  }

  /**
   * Update adjustment
   * @param {number} id - Adjustment ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('adjustment_id', id, data);
  }

  /**
   * Delete adjustment
   * @param {number} id - Adjustment ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('adjustment_id', id);
  }
}

module.exports = Adjustment; 