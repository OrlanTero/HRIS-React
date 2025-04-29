const BaseModel = require('./BaseModel');

/**
 * ServiceDeduction model
 * Represents the service_deductions table from database
 * @class ServiceDeduction
 * @extends BaseModel
 */
class ServiceDeduction extends BaseModel {
  /**
   * Create a new ServiceDeduction instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('service_deductions');
    this.service_deduction_id = data.service_deduction_id || null;
    this.price_from = data.price_from || null;
    this.price_to = data.price_to || null;
    this.msc = data.msc || null;
    this.er = data.er || null;
    this.ee = data.ee || null;
    this.category = data.category || null;
    this.db_status = data.db_status || 1;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find service deduction by ID
   * @param {number} id - Service deduction ID
   * @returns {Promise<ServiceDeduction>}
   */
  async findById(id) {
    return super.findById('service_deduction_id', id);
  }

  /**
   * Update service deduction
   * @param {number} id - Service deduction ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('service_deduction_id', id, data);
  }

  /**
   * Delete service deduction
   * @param {number} id - Service deduction ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('service_deduction_id', id);
  }
}

module.exports = ServiceDeduction; 