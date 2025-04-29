import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Set base URL for API calls
axios.defaults.baseURL = 'http://localhost:5000';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (storedToken && userData) {
      setCurrentUser(JSON.parse(userData));
      setToken(storedToken);
      // Set default auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    } else {
      // Clear any existing auth header if not logged in
      delete axios.defaults.headers.common['Authorization'];
    }
    
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });
      
      const { token: newToken, user } = response.data;
      
      // Save to localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set for current session
      setCurrentUser(user);
      setToken(newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      return user;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 