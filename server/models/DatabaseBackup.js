const BaseModel = require('./BaseModel');

/**
 * DatabaseBackup model
 * Represents the database_backups table from database
 * @class DatabaseBackup
 * @extends BaseModel
 */
class DatabaseBackup extends BaseModel {
  /**
   * Create a new DatabaseBackup instance
   * @param {Object} data - Initial data
   */
  constructor(data = {}) {
    super('database_backups');
    this.backup_id = data.backup_id || null;
    this.title = data.title || null;
    this.description = data.description || null;
    this.file = data.file || null;
    this.date_created = data.date_created || null;
    this.archive_id = data.archive_id || null;
  }

  /**
   * Find database backup by ID
   * @param {number} id - Backup ID
   * @returns {Promise<DatabaseBackup>}
   */
  async findById(id) {
    return super.findById('backup_id', id);
  }

  /**
   * Update database backup
   * @param {number} id - Backup ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return super.update('backup_id', id, data);
  }

  /**
   * Delete database backup
   * @param {number} id - Backup ID
   * @returns {Promise<Object>}
   */
  async delete(id) {
    return super.delete('backup_id', id);
  }
}

module.exports = DatabaseBackup; 