const BaseModel = require('./BaseModel');
const pool = require('../config/database');

/**
 * Mortuary model
 * Represents the mortuaries table from database
 * @class Mortuary
 * @extends BaseModel
 */
class Mortuary extends BaseModel {
  /**
   * Create a new Mortuary instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('mortuaries');
    this.mortuary_id = data.mortuary_id || null;
    this.period = data.period || null;
    this.year = data.year || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find mortuary by ID
   * @param {number} id - Mortuary ID
   * @returns {Promise<Mortuary>}
   */
  async findById(id) {
    return super.findById('mortuary_id', id);
  }

  /**
   * Get all beneficiaries for a mortuary
   * @param {number} mortuaryId - Mortuary ID
   * @returns {Promise<Array>} Beneficiaries
   */
  async getBeneficiaries(mortuaryId) {
    try {
      const query = `
        SELECT b.*, e.firstname, e.lastname 
        FROM beneficiaries b
        JOIN employees e ON b.employee_id = e.employee_id
        WHERE b.mortuary_id = ? AND b.archive_id IS NULL
      `;
      
      const [rows] = await pool.query(query, [mortuaryId]);
      return rows;
    } catch (error) {
      console.error('Error getting beneficiaries:', error);
      throw error;
    }
  }

  /**
   * Get mortuaries with beneficiary counts
   * @returns {Promise<Array>} Mortuaries with counts
   */
  async getAllWithCounts() {
    try {
      const query = `
        SELECT m.*, 
          COUNT(b.beneficiary_id) as beneficiary_count
        FROM mortuaries m
        LEFT JOIN beneficiaries b ON m.mortuary_id = b.mortuary_id AND b.archive_id IS NULL
        WHERE m.archive_id IS NULL
        GROUP BY m.mortuary_id
        ORDER BY m.year DESC, m.period DESC
      `;
      
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error getting mortuaries with counts:', error);
      throw error;
    }
  }

  /**
   * Get periods of a year
   * @param {string} year - Year
   * @returns {Promise<Array>} Periods
   */
  async getPeriodsOfYear(year) {
    try {
      const query = `
        SELECT DISTINCT period 
        FROM mortuaries 
        WHERE year = ? AND archive_id IS NULL
        ORDER BY period
      `;
      
      const [rows] = await pool.query(query, [year]);
      return rows.map(row => row.period);
    } catch (error) {
      console.error('Error getting periods of year:', error);
      throw error;
    }
  }

  /**
   * Update mortuary
   * @param {number} id - Mortuary ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('mortuary_id', id, data);
  }

  /**
   * Delete mortuary
   * @param {number} id - Mortuary ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('mortuary_id', id);
  }
}

module.exports = Mortuary; 