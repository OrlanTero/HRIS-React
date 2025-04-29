const pool = require('./config/database');

async function addLoanTypes() {
  try {
    // Check if loan types already exist
    const [existingTypes] = await pool.query(
      'SELECT * FROM system_types WHERE category = "loan_type" AND db_status = 1'
    );
    
    console.log(`Found ${existingTypes.length} existing loan types`);
    
    if (existingTypes.length > 0) {
      console.log('Existing loan types:');
      existingTypes.forEach(type => {
        console.log(`- ${type.type_id}: ${type.type}`);
      });
      console.log('No need to add loan types as they already exist.');
      return;
    }
    
    // Insert loan types if none exist
    const insertQuery = `
      INSERT INTO system_types (type, category, affects_in, affects_value, db_status) 
      VALUES 
        ('Cash Advance', 'loan_type', 1, 1, 1),
        ('Salary Loan', 'loan_type', 0, 0, 1),
        ('Emergency Loan', 'loan_type', 0, 0, 1),
        ('Calamity Loan', 'loan_type', 0, 0, 1),
        ('Multi-Purpose Loan', 'loan_type', 0, 0, 1)
    `;
    
    const [result] = await pool.query(insertQuery);
    console.log('Successfully added loan types to the database.');
    console.log(`Affected rows: ${result.affectedRows}`);
  } catch (error) {
    console.error('Error adding loan types:', error.message);
  } finally {
    process.exit();
  }
}

addLoanTypes(); 