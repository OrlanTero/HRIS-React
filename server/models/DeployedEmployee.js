const BaseModel = require('./BaseModel');

/**
 * DeployedEmployee model
 * Represents the deployed_employees table from database
 * @class DeployedEmployee
 * @extends BaseModel
 */
class DeployedEmployee extends BaseModel {
  /**
   * Create a new DeployedEmployee instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('deployed_employees');
    this.deployed_employee_id = data.deployed_employee_id || null;
    this.employment_id = data.employment_id || null;
    this.client_id = data.client_id || null;
    this.date_from = data.date_from || null;
    this.date_to = data.date_to || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find deployed employee by ID
   * @param {number} id - Deployed employee ID
   * @returns {Promise<DeployedEmployee>}
   */
  async findById(id) {
    return super.findById('deployed_employee_id', id);
  }

  /**
   * Find deployed employees by client ID
   * @param {number} clientId - Client ID
   * @returns {Promise<Array<DeployedEmployee>>}
   */
  async findByClientId(clientId) {
    const query = `
      SELECT * FROM ${this.tableName} 
      WHERE client_id = ? AND archive_id IS NULL
    `;
    
    return this.executeQuery(query, [clientId]);
  }

  /**
   * Find deployed employees by employment ID
   * @param {number} employmentId - Employment ID
   * @returns {Promise<Array<DeployedEmployee>>}
   */
  async findByEmploymentId(employmentId) {
    const query = `
      SELECT * FROM ${this.tableName} 
      WHERE employment_id = ? AND archive_id IS NULL
    `;
    
    return this.executeQuery(query, [employmentId]);
  }

  /**
   * Update deployed employee
   * @param {number} id - Deployed employee ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('deployed_employee_id', id, data);
  }

  /**
   * Delete deployed employee
   * @param {number} id - Deployed employee ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('deployed_employee_id', id);
  }
}

module.exports = DeployedEmployee; 