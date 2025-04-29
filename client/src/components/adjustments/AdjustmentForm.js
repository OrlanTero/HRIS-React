import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  FormHelperText,
  InputAdornment,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const AdjustmentForm = ({ 
  adjustmentId = null, 
  onSuccess, 
  onCancel 
}) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    amount: '',
    type_id: '',
    date: new Date().toISOString().split('T')[0],
    status: '',
    posted: 2, // Default to not posted
    paid: 2    // Default to not paid
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Fetch the list of employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees. Please try again.');
        setLoading(false);
      }
    };
    
    if (token) {
      fetchEmployees();
    }
  }, [token]);
  
  // Fetch adjustment data if editing
  useEffect(() => {
    const fetchAdjustment = async () => {
      if (!adjustmentId) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`/api/adjustments/${adjustmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Format date for the form
        const adjustment = response.data;
        if (adjustment.date) {
          adjustment.date = new Date(adjustment.date).toISOString().split('T')[0];
        }
        
        setFormData(adjustment);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching adjustment:', err);
        setError('Failed to load adjustment data. Please try again.');
        setLoading(false);
      }
    };
    
    if (token && adjustmentId) {
      fetchAdjustment();
    }
  }, [token, adjustmentId]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.employee_id) {
      errors.employee_id = 'Please select an employee';
    }
    
    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid positive amount';
    }
    
    if (!formData.date) {
      errors.date = 'Please enter a date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      
      // Format data for API
      const adjustmentData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      if (adjustmentId) {
        // Update existing adjustment
        await axios.put(`/api/adjustments/${adjustmentId}`, adjustmentData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Create new adjustment
        await axios.post('/api/adjustments', adjustmentData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      setSubmitting(false);
      
      // Notify parent of success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error saving adjustment:', err);
      setError(err.response?.data?.message || 'Failed to save adjustment');
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!formErrors.employee_id}>
            <InputLabel>Employee</InputLabel>
            <Select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              label="Employee"
            >
              {employees.map(employee => (
                <MenuItem 
                  key={employee.employee_id} 
                  value={employee.employee_id}
                >
                  {employee.firstname} {employee.lastname}
                </MenuItem>
              ))}
            </Select>
            {formErrors.employee_id && (
              <FormHelperText>{formErrors.employee_id}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            error={!!formErrors.amount}
            helperText={formErrors.amount}
            InputProps={{
              startAdornment: <InputAdornment position="start">₱</InputAdornment>,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={!!formErrors.date}
            helperText={formErrors.date}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              name="type_id"
              value={formData.type_id || ''}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">Salary Adjustment</MenuItem>
              <MenuItem value="2">Bonus</MenuItem>
              <MenuItem value="3">Incentive</MenuItem>
              <MenuItem value="4">Deduction</MenuItem>
              <MenuItem value="5">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Posted Status</InputLabel>
            <Select
              name="posted"
              value={formData.posted}
              onChange={handleChange}
              label="Posted Status"
            >
              <MenuItem value={1}>Posted</MenuItem>
              <MenuItem value={2}>Not Posted</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Paid Status</InputLabel>
            <Select
              name="paid"
              value={formData.paid}
              onChange={handleChange}
              label="Paid Status"
            >
              <MenuItem value={1}>Paid</MenuItem>
              <MenuItem value={2}>Not Paid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={20} /> : null}
        >
          {adjustmentId ? 'Update Adjustment' : 'Create Adjustment'}
        </Button>
      </Box>
    </Box>
  );
};

export default AdjustmentForm; 