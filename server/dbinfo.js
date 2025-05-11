const pool = require('./config/database');

async function checkDatabase() {
  try {
    console.log('Checking database...');
    
    // Check if payslip_drafts table exists
    const [tables] = await pool.query("SHOW TABLES LIKE 'payslip_drafts'");
    if (tables.length === 0) {
      console.log('payslip_drafts table does not exist');
      return;
    }
    
    console.log('Checking payslip_drafts table structure...');
    const [columns] = await pool.query('DESCRIBE payslip_drafts');
    
    console.log('Columns in payslip_drafts:');
    columns.forEach(col => {
      console.log(`${col.Field}: ${col.Type} (${col.Null === 'YES' ? 'nullable' : 'not nullable'})`);
    });
    
    // Count records
    const [countResult] = await pool.query('SELECT COUNT(*) as count FROM payslip_drafts');
    console.log(`Total records in payslip_drafts: ${countResult[0].count}`);
    
    // Try to get the SQL CREATE statement
    const [createTable] = await pool.query('SHOW CREATE TABLE payslip_drafts');
    console.log('Table creation SQL:');
    console.log(createTable[0]['Create Table']);
    
  } catch (error) {
    console.error('Database check error:', error);
  } finally {
    process.exit();
  }
}

checkDatabase(); 