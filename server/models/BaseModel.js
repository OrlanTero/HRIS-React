const pool = require('../config/database');

/**
 * Base model for database operations
 * @class BaseModel
 */
class BaseModel {
  /**
   * Create a new BaseModel instance
   * @param {string} tableName - Database table name
   */
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * Find all records
   * @param {string} condition - WHERE clause condition
   * @param {Array} params - Parameters for prepared statement
   * @returns {Promise<Array>}
   */
  async findAll(condition = '', params = []) {
    try {
      const sql = `SELECT * FROM ${this.tableName} ${condition ? 'WHERE ' + condition : ''}`;
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error(`Error in findAll for ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Find record by ID
   * @param {string} idField - ID field name
   * @param {number|string} id - ID value
   * @returns {Promise<Object>}
   */
  async findById(idField, id) {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE ${idField} = ?`,
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error(`Error in findById for ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Create new record
   * @param {Object} data - Data to insert
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      const fields = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);

      const [result] = await pool.query(
        `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`,
        values
      );

      return {
        id: result.insertId,
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error in create for ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Update record
   * @param {string} idField - ID field name
   * @param {number|string} id - ID value
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(idField, id, data) {
    try {
      const fields = Object.keys(data)
        .map(key => `${key} = ?`)
        .join(', ');
      
      const values = [...Object.values(data), id];

      const [result] = await pool.query(
        `UPDATE ${this.tableName} SET ${fields} WHERE ${idField} = ?`,
        values
      );

      return {
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error in update for ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Delete record
   * @param {string} idField - ID field name
   * @param {number|string} id - ID value
   * @returns {Promise<Object>}
   */
  async delete(idField, id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM ${this.tableName} WHERE ${idField} = ?`,
        [id]
      );

      return {
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error in delete for ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Soft delete (mark as deleted)
   * @param {string} idField - ID field name
   * @param {number|string} id - ID value
   * @returns {Promise<Object>}
   */
  async softDelete(idField, id) {
    try {
      const [result] = await pool.query(
        `UPDATE ${this.tableName} SET db_status = 0 WHERE ${idField} = ?`,
        [id]
      );

      return {
        affected: result.affectedRows,
        success: result.affectedRows > 0
      };
    } catch (error) {
      console.error(`Error in softDelete for ${this.tableName}:`, error);
      throw error;
    }
  }

  async hardDelete(idField, id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM ${this.tableName} WHERE ${idField} = ?`,
        [id]
      );
      return result;
    } catch (error) {
      console.error(`Error in hardDelete for ${this.tableName}:`, error);
      throw error;
    }
  }

  async findByFilter(filters) {
    try {
      let whereClause = Object.keys(filters)
        .map(key => `${key} = ?`)
        .join(' AND ');
      
      if (whereClause) {
        whereClause = `WHERE ${whereClause}`;
      }

      const values = Object.values(filters);
      const [rows] = await pool.query(
        `SELECT * FROM ${this.tableName} ${whereClause}`,
        values
      );
      return rows;
    } catch (error) {
      console.error(`Error in findByFilter for ${this.tableName}:`, error);
      throw error;
    }
  }
}

module.exports = BaseModel; 