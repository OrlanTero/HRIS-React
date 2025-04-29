const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./config/database');
const { UserAuthentication, User, UserProfile, Employee, BankAccount, Bank, Client } = require('./models');

// Import route files
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const userRoutes = require('./routes/users');
const bankRoutes = require('./routes/banks');
const clientRoutes = require('./routes/clients');
const holidayRoutes = require('./routes/holidays');
const clientHolidayRoutes = require('./routes/clientHolidays');
const employmentRoutes = require('./routes/employments');
const deployedEmployeeRoutes = require('./routes/deployedEmployees');
const mortuaryRoutes = require('./routes/mortuaries');
const beneficiaryRoutes = require('./routes/beneficiaries');
const mortuaryPaymentRoutes = require('./routes/mortuaryPayments');
const attendanceRoutes = require('./routes/attendance');
const attendanceGroupsRoutes = require('./routes/attendanceGroups');
const adjustmentsRoutes = require('./routes/adjustments');
const pettyCashRoutes = require('./routes/pettyCash');
const requisitionsRoutes = require('./routes/requisitions');
const disbursementsRoutes = require('./routes/disbursements');
const loanRoutes = require('./routes/loans');
const loanPaymentRoutes = require('./routes/loanPayments');
const loanStatementRoutes = require('./routes/loanStatements');
const payrollRoutes = require('./routes/payroll');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'hris-secret-key';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React client
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});
// Authentication routes
app.post('/api/auth/login', async (req, res) => {
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
      { expiresIn: '24h' }
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

// Protected route example
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user details
    const userModel = new User();
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/client-holidays', clientHolidayRoutes);
app.use('/api/employments', employmentRoutes);
app.use('/api/deployments', deployedEmployeeRoutes);
app.use('/api/mortuaries', mortuaryRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/mortuary-payments', mortuaryPaymentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/attendance-groups', attendanceGroupsRoutes);
app.use('/api/attendanceGroups', attendanceGroupsRoutes);
app.use('/api/adjustments', adjustmentsRoutes);
app.use('/api/pettyCash', pettyCashRoutes);
app.use('/api/requisitions', requisitionsRoutes);
app.use('/api/disbursements', disbursementsRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/loan-payments', loanPaymentRoutes);
app.use('/api/loan-statements', loanStatementRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 