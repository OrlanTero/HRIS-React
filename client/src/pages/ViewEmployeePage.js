import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import EmployeeForm from '../components/employees/EmployeeForm';

const ViewEmployeePage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
  
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/employees')}
              sx={{ mr: 2 }}
            >
              Back to List
            </Button>
            <Typography variant="h4" component="h1">
              Employee Details
            </Typography>
          </Box>
          
          {employee && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/employees/edit/${id}`)}
            >
              Edit
            </Button>
          )}
        </Box>
        
        {error && (
          <Box mb={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : employee ? (
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                {`${employee.firstname} ${employee.lastname}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {employee.position} {employee.department ? `- ${employee.department}` : ''}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <EmployeeForm 
                employee={employee}
                readOnly={true}
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

export default ViewEmployeePage; 