const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { User, UserProfile } = require('../models');

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user details
    const [users] = await pool.query(
      'SELECT * FROM users WHERE user_id = ? AND db_status = 1',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user profile
    const [profiles] = await pool.query(
      'SELECT * FROM user_profile WHERE user_id = ?',
      [userId]
    );
    
    const user = users[0];
    user.profile = profiles.length > 0 ? profiles[0] : {};
    
    // Remove sensitive information
    delete user.password;
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstname, lastname, email, avatar } = req.body;
    
    // Update user
    await pool.query(
      `UPDATE users SET
        firstname = ?,
        lastname = ?,
        email = ?,
        updated_at = NOW()
       WHERE user_id = ?`,
      [firstname, lastname, email, userId]
    );
    
    // Check if profile exists
    const [profiles] = await pool.query(
      'SELECT * FROM user_profile WHERE user_id = ?',
      [userId]
    );
    
    if (profiles.length > 0) {
      // Update profile
      await pool.query(
        `UPDATE user_profile SET
          avatar = ?,
          updated_at = NOW()
         WHERE user_id = ?`,
        [avatar || null, userId]
      );
    } else {
      // Create profile
      await pool.query(
        `INSERT INTO user_profile (
          user_id, avatar, created_at, updated_at
        ) VALUES (?, ?, NOW(), NOW())`,
        [userId, avatar || null]
      );
    }
    
    // Get updated user
    const [updatedUsers] = await pool.query(
      'SELECT * FROM users WHERE user_id = ? AND db_status = 1',
      [userId]
    );
    
    // Get updated profile
    const [updatedProfiles] = await pool.query(
      'SELECT * FROM user_profile WHERE user_id = ?',
      [userId]
    );
    
    const user = updatedUsers[0];
    user.profile = updatedProfiles.length > 0 ? updatedProfiles[0] : {};
    
    // Remove sensitive information
    delete user.password;
    
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 