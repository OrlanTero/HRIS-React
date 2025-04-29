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

const PettyCashForm = ({ 
  pettyCashId = null, 
  onSuccess, 
  onCancel 
}) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    requested_by: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    remarks: '',
    posted: 2 // Default to not posted
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
  
  // Fetch petty cash data if editing
  useEffect(() => {
    const fetchPettyCash = async () => {
      if (!pettyCashId) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`/api/pettyCash/${pettyCashId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Format date for the form
        const pettyCash = response.data;
        if (pettyCash.date) {
          pettyCash.date = new Date(pettyCash.date).toISOString().split('T')[0];
        }
        
        setFormData(pettyCash);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching petty cash transaction:', err);
        setError('Failed to load petty cash data. Please try again.');
        setLoading(false);
      }
    };
    
    if (token && pettyCashId) {
      fetchPettyCash();
    }
  }, [token, pettyCashId]);
  
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
    
    if (!formData.requested_by) {
      errors.requested_by = 'Please select an employee';
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
      const pettyCashData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      if (pettyCashId) {
        // Update existing petty cash
        await axios.put(`/api/pettyCash/${pettyCashId}`, pettyCashData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Create new petty cash
        await axios.post('/api/pettyCash', pettyCashData, {
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
      console.error('Error saving petty cash transaction:', err);
      setError(err.response?.data?.message || 'Failed to save petty cash transaction');
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
          <FormControl fullWidth error={!!formErrors.requested_by}>
            <InputLabel>Requested By</InputLabel>
            <Select
              name="requested_by"
              value={formData.requested_by}
              onChange={handleChange}
              label="Requested By"
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
            {formErrors.requested_by && (
              <FormHelperText>{formErrors.requested_by}</FormHelperText>
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
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Remarks"
            name="remarks"
            multiline
            rows={3}
            value={formData.remarks || ''}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
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
          {pettyCashId ? 'Update Transaction' : 'Create Transaction'}
        </Button>
      </Box>
    </Box>
  );
};

export default PettyCashForm; 