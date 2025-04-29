const BaseModel = require('./BaseModel');

/**
 * Requisition model
 * Represents the requisition table from database
 * @class Requisition
 * @extends BaseModel
 */
class Requisition extends BaseModel {
  /**
   * Create a new Requisition instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('requisition');
    this.requisition_id = data.requisition_id || null;
    this.req_id = data.req_id || null;
    this.date = data.date || null;
    this.remarks = data.remarks || null;
    this.type = data.type || null;
    this.status = data.status || null;
    this.paid_to = data.paid_to || null;
    this.amount = data.amount || null;
    this.req_date = data.req_date || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find requisition by ID
   * @param {number} id - Requisition ID
   * @returns {Promise<Requisition>}
   */
  async findById(id) {
    return super.findById('requisition_id', id);
  }

  /**
   * Update requisition
   * @param {number} id - Requisition ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('requisition_id', id, data);
  }

  /**
   * Delete requisition
   * @param {number} id - Requisition ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('requisition_id', id);
  }
}

module.exports = Requisition; 