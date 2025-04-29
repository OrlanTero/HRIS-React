import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create the context
export const ApiContext = createContext();

// Custom hook to use the API context
export const useApi = () => useContext(ApiContext);

// Provider component
export const ApiProvider = ({ children }) => {
  const { token } = useAuth();
  
  // Create API client with configuration
  const api = useMemo(() => {
    // Create a new instance of axios with custom configuration
    const apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Request interceptor to add auth token to all requests
    apiClient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Helper methods for common API operations
    return {
      // Raw axios instance for advanced usage
      client: apiClient,
      
      // GET request
      get: (url, config) => apiClient.get(url, config),
      
      // POST request
      post: (url, data, config) => apiClient.post(url, data, config),
      
      // PUT request
      put: (url, data, config) => apiClient.put(url, data, config),
      
      // PATCH request
      patch: (url, data, config) => apiClient.patch(url, data, config),
      
      // DELETE request
      delete: (url, config) => apiClient.delete(url, config),
      
      // Change base URL (useful for switching environments)
      setBaseUrl: (url) => {
        apiClient.defaults.baseURL = url;
      },
    };
  }, [token]);

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};