// Script to create a new user, user profile, and user authentication record
const pool = require('../config/database');

async function createNewUser() {
  const connection = await pool.getConnection();
  
  try {
    // Start transaction
    await connection.beginTransaction();
    
    // 1. Insert user record
    const [userResult] = await connection.query(`
      INSERT INTO users (
        firstname, lastname, email, phone, displayName, user_type, db_status
      ) VALUES (
        'Admin', 'User', 'admin@example.com', '1234567890', 'Admin User', 1, 1
      )
    `);
    
    const userId = userResult.insertId;
    console.log(`Created user with ID: ${userId}`);
    
    // 2. Insert user profile
    const [profileResult] = await connection.query(`
      INSERT INTO user_profile (
        id, name, description, owner, email
      ) VALUES (
        '1', 'HRIS System', 'Human Resource Information System', 'Admin', 'admin@example.com'
      )
    `);
    
    console.log(`Created user profile`);
    
    // 3. Insert user authentication
    const [authResult] = await connection.query(`
      INSERT INTO user_authentication (
        auth_type, username, password, active
      ) VALUES (
        'USERNAME_PASSWORD', 'admin', 'password123', 2
      )
    `);
    
    const authId = authResult.insertId;
    console.log(`Created user authentication with ID: ${authId}`);
    
    // Commit transaction
    await connection.commit();
    
    console.log('Successfully created new user account!');
    console.log('Login with username: admin and password: password123');
    
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    console.error('Error creating user:', error);
  } finally {
    // Release connection
    connection.release();
    // Close pool
    process.exit(0);
  }
}

// Run the function
createNewUser(); 