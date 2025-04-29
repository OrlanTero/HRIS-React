import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';
import EmployeeForm from '../components/employees/EmployeeForm';
import { useApi } from '../contexts/ApiContext';
const CreateEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const api = useApi();
  const navigate = useNavigate();
  
  const handleSubmit = async (employeeData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);
      
      await api.post('/api/employees', employeeData);
      
      setSuccess(true);
      
      // Navigate back to employee list after short delay
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
      
    } catch (err) {
      console.error('Error creating employee:', err);
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box mb={4} display="flex" alignItems="center">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/employees')}
            sx={{ mr: 2 }}
          >
            Back to List
          </Button>
          <Typography variant="h4" component="h1">
            Add New Employee
          </Typography>
        </Box>
        
        {error && (
          <Box mb={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        
        {success && (
          <Box mb={3}>
            <Alert severity="success">
              Employee created successfully! Redirecting to employee list...
            </Alert>
          </Box>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3}>
            <Box p={3}>
              <EmployeeForm 
                onSubmit={handleSubmit} 
                submitButtonText="Create Employee"
              />
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default CreateEmployeePage; 