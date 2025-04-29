// Script to check the structure of tables in the database
const pool = require('../config/database');

async function checkTables() {
  const connection = await pool.getConnection();
  
  try {
    // Check users table
    console.log("Checking users table structure:");
    const [usersColumns] = await connection.query(`
      SHOW COLUMNS FROM users
    `);
    console.log(usersColumns.map(col => `${col.Field} (${col.Type})`).join('\n'));
    
    console.log("\n-------------------------------\n");
    
    // Check user_profile table
    console.log("Checking user_profile table structure:");
    const [profileColumns] = await connection.query(`
      SHOW COLUMNS FROM user_profile
    `);
    console.log(profileColumns.map(col => `${col.Field} (${col.Type})`).join('\n'));
    
    console.log("\n-------------------------------\n");
    
    // Check user_authentication table
    console.log("Checking user_authentication table structure:");
    const [authColumns] = await connection.query(`
      SHOW COLUMNS FROM user_authentication
    `);
    console.log(authColumns.map(col => `${col.Field} (${col.Type})`).join('\n'));
    
  } catch (error) {
    console.error('Error checking tables:', error);
  } finally {
    // Release connection
    connection.release();
    // Close pool
    process.exit(0);
  }
}

// Run the function
checkTables(); 