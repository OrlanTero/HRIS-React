import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';
import EmployeeForm from '../components/employees/EmployeeForm';

const EditEmployeePage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get(`/api/employees/${id}`);
        
        // Ensure bankAccounts is an array
        const employeeData = {
          ...response.data,
          bankAccounts: response.data.bankAccounts || []
        };
        
        setEmployee(employeeData);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [id]);
  
  const handleSubmit = async (employeeData) => {
    try {
      setSubmitting(true);
      setError('');
      setSuccess(false);
      
      await axios.put(`/api/employees/${id}`, employeeData);
      
      setSuccess(true);
      
      // Navigate back to employee list after short delay
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
      
    } catch (err) {
      console.error('Error updating employee:', err);
      setError(err.response?.data?.message || 'Failed to update employee');
    } finally {
      setSubmitting(false);
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
            Edit Employee
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
              Employee updated successfully! Redirecting to employee list...
            </Alert>
          </Box>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : employee ? (
          <Paper elevation={3}>
            <Box p={3}>
              <EmployeeForm 
                employee={employee}
                onSubmit={handleSubmit} 
                submitButtonText="Update Employee"
              />
            </Box>
          </Paper>
        ) : (
          <Box my={4} textAlign="center">
            <Typography variant="body1">
              Employee not found or was deleted.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EditEmployeePage; 