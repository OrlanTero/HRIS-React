const BaseModel = require('./BaseModel');
const pool = require('../config/database');

/**
 * Beneficiary model
 * Represents the beneficiaries table from database
 * @class Beneficiary
 * @extends BaseModel
 */
class Beneficiary extends BaseModel {
  /**
   * Create a new Beneficiary instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('beneficiaries');
    this.beneficiary_id = data.beneficiary_id || null;
    this.mortuary_id = data.mortuary_id || null;
    this.employee_id = data.employee_id || null;
    this.type = data.type || null;
    this.name = data.name || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find beneficiary by ID
   * @param {number} id - Beneficiary ID
   * @returns {Promise<Beneficiary>}
   */
  async findById(id) {
    return super.findById('beneficiary_id', id);
  }

  /**
   * Find beneficiaries by mortuary ID
   * @param {number} mortuaryId - Mortuary ID
   * @returns {Promise<Array>} Beneficiaries
   */
  async findByMortuaryId(mortuaryId) {
    try {
      const query = `
        SELECT b.*, e.firstname, e.lastname, e.employee_no
        FROM beneficiaries b
        JOIN employees e ON b.employee_id = e.employee_id
        WHERE b.mortuary_id = ? AND b.archive_id IS NULL
        ORDER BY e.lastname, e.firstname
      `;
      
      const [rows] = await pool.query(query, [mortuaryId]);
      return rows;
    } catch (error) {
      console.error(`Error finding beneficiaries for mortuary ${mortuaryId}:`, error);
      throw error;
    }
  }

  /**
   * Find beneficiaries by employee ID
   * @param {number} employeeId - Employee ID
   * @returns {Promise<Array>} Beneficiaries
   */
  async findByEmployeeId(employeeId) {
    try {
      const query = `
        SELECT b.*, m.period, m.year
        FROM beneficiaries b
        JOIN mortuaries m ON b.mortuary_id = m.mortuary_id
        WHERE b.employee_id = ? AND b.archive_id IS NULL
        ORDER BY m.year DESC, m.period DESC
      `;
      
      const [rows] = await pool.query(query, [employeeId]);
      return rows;
    } catch (error) {
      console.error(`Error finding beneficiaries for employee ${employeeId}:`, error);
      throw error;
    }
  }

  /**
   * Update beneficiary
   * @param {number} id - Beneficiary ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('beneficiary_id', id, data);
  }

  /**
   * Delete beneficiary
   * @param {number} id - Beneficiary ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('beneficiary_id', id);
  }
}

module.exports = Beneficiary; 