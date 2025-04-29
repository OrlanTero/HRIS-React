const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:5000/api';
let token = '';

// Test data
const testBank = {
  name: 'Test Bank',
  branch: 'Test Branch'
};

let createdBankId = null;

// Login to get token
async function login() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: 'admin', // Replace with actual username
      password: 'password' // Replace with actual password
    });
    
    token = response.data.token;
    console.log('Login successful, token obtained');
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Test creating a bank
async function testCreateBank() {
  try {
    const response = await axios.post(`${API_URL}/banks`, testBank, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    createdBankId = response.data.bank_id;
    console.log('Bank created successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Failed to create bank:', error.response?.data || error.message);
    return false;
  }
}

// Test getting all banks
async function testGetAllBanks() {
  try {
    const response = await axios.get(`${API_URL}/banks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('All banks retrieved successfully. Count:', response.data.length);
    return true;
  } catch (error) {
    console.error('Failed to get banks:', error.response?.data || error.message);
    return false;
  }
}

// Test getting a bank by ID
async function testGetBankById() {
  if (!createdBankId) {
    console.error('No bank ID to test with');
    return false;
  }
  
  try {
    const response = await axios.get(`${API_URL}/banks/${createdBankId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Bank retrieved by ID successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Failed to get bank by ID:', error.response?.data || error.message);
    return false;
  }
}

// Test updating a bank
async function testUpdateBank() {
  if (!createdBankId) {
    console.error('No bank ID to test with');
    return false;
  }
  
  const updatedBank = {
    name: 'Updated Test Bank',
    branch: 'Updated Test Branch'
  };
  
  try {
    const response = await axios.put(`${API_URL}/banks/${createdBankId}`, updatedBank, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Bank updated successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Failed to update bank:', error.response?.data || error.message);
    return false;
  }
}

// Test deleting a bank
async function testDeleteBank() {
  if (!createdBankId) {
    console.error('No bank ID to test with');
    return false;
  }
  
  try {
    const response = await axios.delete(`${API_URL}/banks/${createdBankId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Bank deleted successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Failed to delete bank:', error.response?.data || error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  try {
    await login();
    
    // Create a bank
    const createSuccess = await testCreateBank();
    if (!createSuccess) return;
    
    // Get all banks
    await testGetAllBanks();
    
    // Get bank by ID
    await testGetBankById();
    
    // Update bank
    await testUpdateBank();
    
    // Delete bank
    await testDeleteBank();
    
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Test execution error:', error);
  }
}

// Run the tests
runTests(); 