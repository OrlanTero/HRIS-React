import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import AdjustmentsList from '../../components/adjustments/AdjustmentsList';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AdjustmentsPage = () => {
  const { token } = useAuth();
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch adjustments data
  const fetchAdjustments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/adjustments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdjustments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching adjustments:', err);
      setError(err.message || 'Failed to fetch adjustments');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchAdjustments();
    }
  }, [token]);
  
  // Handle adjustment status update
  const handleStatusUpdate = async (id, statusData) => {
    try {
      await axios.patch(`/api/adjustments/${id}/status`, statusData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchAdjustments(); // Refresh the list
    } catch (err) {
      console.error('Error updating adjustment status:', err);
      setError(err.message || 'Failed to update adjustment status');
    }
  };
  
  // Handle adjustment deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/adjustments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchAdjustments(); // Refresh the list
    } catch (err) {
      console.error('Error deleting adjustment:', err);
      setError(err.message || 'Failed to delete adjustment');
    }
  };
  
  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" gutterBottom>
          Adjustments Management
        </Typography>
        
        <AdjustmentsList 
          adjustments={adjustments}
          loading={loading}
          error={error}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
          onRefresh={fetchAdjustments}
        />
      </Container>
    </Box>
  );
};

export default AdjustmentsPage; 