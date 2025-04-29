const BaseModel = require('./BaseModel');

/**
 * RequisitionInfo model
 * Represents the requisition_info table from database
 * @class RequisitionInfo
 * @extends BaseModel
 */
class RequisitionInfo extends BaseModel {
  /**
   * Create a new RequisitionInfo instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('requisition_info');
    this.requisition_info_id = data.requisition_info_id || null;
    this.requisition_type = data.requisition_type || null;
    this.requisition_id = data.requisition_id || null;
    this.particulars = data.particulars || null;
    this.type = data.type || null;
    this.basic_unit = data.basic_unit || null;
    this.quantity = data.quantity || null;
    this.unit_price = data.unit_price || null;
    this.amount = data.amount || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find requisition info by ID
   * @param {number} id - Requisition info ID
   * @returns {Promise<RequisitionInfo>}
   */
  async findById(id) {
    return super.findById('requisition_info_id', id);
  }

  /**
   * Update requisition info
   * @param {number} id - Requisition info ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('requisition_info_id', id, data);
  }

  /**
   * Delete requisition info
   * @param {number} id - Requisition info ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('requisition_info_id', id);
  }
}

module.exports = RequisitionInfo; 