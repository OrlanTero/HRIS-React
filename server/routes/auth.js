const express = require('express');
const jwt = require('jsonwebtoken');
const { UserAuthentication, User, UserProfile } = require('../models');
const pool = require('../config/database');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/auth');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Get the UserAuthentication model
    const userAuthModel = new UserAuthentication();
    
    // Find user with the given username
    const [authUsers] = await pool.query(
      'SELECT * FROM user_authentication WHERE username = ?',
      [username]
    );
    
    if (authUsers.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    const authUser = authUsers[0];
    
    // Simple password comparison (plain text in this case, but in a real app you should use bcrypt)
    if (authUser.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Get user details
    const userModel = new User();
    const [users] = await pool.query(
      'SELECT * FROM users WHERE db_status = 1 LIMIT 1'
    );
    
    if (users.length === 0) {
      return res.status(500).json({ message: 'User not found' });
    }
    
    const user = users[0];
    
    // Get user profile
    const userProfileModel = new UserProfile();
    const [profiles] = await pool.query(
      'SELECT * FROM user_profile LIMIT 1'
    );
    
    const profile = profiles.length > 0 ? profiles[0] : {};
    
    // Create token
    const token = jwt.sign(
      { 
        userId: user.user_id,
        isAdmin: true
      }, 
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
    
    // Return user data and token
    res.json({
      token,
      user: {
        id: user.user_id,
        name: user.displayName || `${user.firstname} ${user.lastname}`,
        email: user.email,
        isAdmin: true,
        profile: profile
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router; 