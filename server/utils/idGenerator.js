const pool = require('../config/database');

/**
 * Generate a unique requisition ID
 * Format: REQ-YYYY-XXXX (e.g., REQ-2024-0001)
 */
async function generateRequisitionID() {
  try {
    const currentYear = new Date().getFullYear();
    
    // Get the latest requisition ID for this year
    const [results] = await pool.query(
      `SELECT req_id FROM requisition 
       WHERE req_id LIKE 'REQ-${currentYear}-%' 
       ORDER BY requisition_id DESC LIMIT 1`
    );
    
    let newNumber = 1;
    
    if (results.length > 0) {
      // Extract the numeric part from the latest ID and increment
      const latestId = results[0].req_id;
      const matches = latestId.match(/REQ-\d{4}-(\d{4})/);
      
      if (matches && matches[1]) {
        newNumber = parseInt(matches[1], 10) + 1;
      }
    }
    
    // Format the new ID with padded zeros
    return `REQ-${currentYear}-${newNumber.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating requisition ID:', error);
    // Fallback with timestamp as part of ID to ensure uniqueness
    const timestamp = new Date().getTime().toString().slice(-4);
    return `REQ-${new Date().getFullYear()}-${timestamp}`;
  }
}

/**
 * Generate a unique disbursement ID
 * Format: DIS-YYYY-XXXX (e.g., DIS-2024-0001)
 */
async function generateDisbursementID() {
  try {
    const currentYear = new Date().getFullYear();
    
    // Get the latest disbursement ID for this year
    const [results] = await pool.query(
      `SELECT voucher FROM disbursement 
       WHERE voucher LIKE 'DIS-${currentYear}-%' 
       ORDER BY disbursement_id DESC LIMIT 1`
    );
    
    let newNumber = 1;
    
    if (results.length > 0) {
      // Extract the numeric part from the latest ID and increment
      const latestId = results[0].voucher;
      const matches = latestId.match(/DIS-\d{4}-(\d{4})/);
      
      if (matches && matches[1]) {
        newNumber = parseInt(matches[1], 10) + 1;
      }
    }
    
    // Format the new ID with padded zeros
    return `DIS-${currentYear}-${newNumber.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating disbursement ID:', error);
    // Fallback with timestamp as part of ID to ensure uniqueness
    const timestamp = new Date().getTime().toString().slice(-4);
    return `DIS-${new Date().getFullYear()}-${timestamp}`;
  }
}

module.exports = {
  generateRequisitionID,
  generateDisbursementID
}; 