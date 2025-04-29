import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button, CircularProgress } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AdjustmentForm from '../../components/adjustments/AdjustmentForm';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const EditAdjustmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [adjustment, setAdjustment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch adjustment data
  useEffect(() => {
    const fetchAdjustment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/adjustments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdjustment(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching adjustment:', err);
        setError(err.message || 'Failed to fetch adjustment');
        setLoading(false);
      }
    };
    
    if (token && id) {
      fetchAdjustment();
    }
  }, [token, id]);
  
  // Handle successful update
  const handleSuccess = () => {
    navigate('/adjustments');
  };
  
  // Handle cancellation
  const handleCancel = () => {
    navigate('/adjustments');
  };
  
  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/adjustments')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Edit Adjustment
          </Typography>
        </Box>
        
        <Paper sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ backgroundColor: '#feeeee', p: 2, borderRadius: 1 }}>
              <Typography color="error">{error}</Typography>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/adjustments')}
                sx={{ mt: 2 }}
              >
                Return to Adjustments
              </Button>
            </Box>
          ) : (
            <AdjustmentForm 
              adjustmentId={id}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default EditAdjustmentPage; 