import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const periods = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const LoanPaymentForm = ({ open, onClose, onSubmit, editPayment = null }) => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEmployees, setFetchingEmployees] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    amount: '',
    note: '',
    period: '',
    year: new Date().getFullYear(),
    payment_date: formatDateForInput(new Date())
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Format date for input field (YYYY-MM-DD)
  function formatDateForInput(date) {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    setFetchingEmployees(true);
    try {
      const response = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError('Failed to load employees. Please try again.');
    } finally {
      setFetchingEmployees(false);
    }
  };

  // Set up form when opened or when editing
  useEffect(() => {
    if (open) {
      fetchEmployees();
      
      // If editing, populate the form
      if (editPayment) {
        setFormData({
          employee_id: editPayment.employee_id,
          amount: editPayment.amount,
          note: editPayment.note || '',
          period: editPayment.period,
          year: editPayment.year,
          payment_date: editPayment.payment_date ? formatDateForInput(new Date(editPayment.payment_date)) : formatDateForInput(new Date())
        });
      } else {
        // Reset form for new payment
        setFormData({
          employee_id: '',
          amount: '',
          note: '',
          period: new Date().getMonth(),
          year: new Date().getFullYear(),
          payment_date: formatDateForInput(new Date())
        });
      }
      
      setFormErrors({});
      setError(null);
    }
  }, [open, editPayment]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.employee_id) errors.employee_id = 'Employee is required';
    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be a positive number';
    }
    if (!formData.period && formData.period !== 0) errors.period = 'Period is required';
    if (!formData.year) errors.year = 'Year is required';
    if (!formData.payment_date) errors.payment_date = 'Payment date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = editPayment 
        ? `/api/loan-payments/${editPayment.id}` 
        : '/api/loan-payments';
      
      const method = editPayment ? 'put' : 'post';
      
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      onSubmit(response.data);
    } catch (err) {
      console.error('Failed to save loan payment:', err);
      setError(err.response?.data?.message || 'Failed to save loan payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get current available years (5 years back and 2 years ahead)
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <Dialog open={open} onClose={loading ? null : onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editPayment ? 'Edit Loan Payment' : 'Add New Loan Payment'}
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth 
              error={!!formErrors.employee_id}
              disabled={fetchingEmployees || loading}
            >
              <InputLabel>Employee</InputLabel>
              <Select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                label="Employee"
              >
                {fetchingEmployees ? (
                  <MenuItem disabled>Loading employees...</MenuItem>
                ) : (
                  employees.map(employee => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name}
                    </MenuItem>
                  ))
                )}
              </Select>
              {formErrors.employee_id && (
                <FormHelperText>{formErrors.employee_id}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              error={!!formErrors.amount}
              helperText={formErrors.amount}
              disabled={loading}
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth 
              error={!!formErrors.period}
              disabled={loading}
            >
              <InputLabel>Period</InputLabel>
              <Select
                name="period"
                value={formData.period}
                onChange={handleChange}
                label="Period"
              >
                {periods.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.period && (
                <FormHelperText>{formErrors.period}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth 
              error={!!formErrors.year}
              disabled={loading}
            >
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={formData.year}
                onChange={handleChange}
                label="Year"
              >
                {getYearOptions().map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.year && (
                <FormHelperText>{formErrors.year}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Payment Date"
              name="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={handleChange}
              error={!!formErrors.payment_date}
              helperText={formErrors.payment_date}
              disabled={loading}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              error={!!formErrors.note}
              helperText={formErrors.note}
              disabled={loading}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Saving...' : (editPayment ? 'Update' : 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanPaymentForm; 