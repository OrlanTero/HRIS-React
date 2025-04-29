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
  Alert,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const NewLoanPaymentDialog = ({ open, onClose, onSuccess, selectedLoan = null }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    loan_id: '',
    amount: '',
    payment_type: 'CASH',
    payment_date: formatDateForInput(new Date()),
    notes: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Format date for input field (YYYY-MM-DD)
  function formatDateForInput(date) {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  // Format date for API (YYYY-MM-DD)
  function formatDateForAPI(dateString) {
    const d = new Date(dateString);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  // Load data when dialog opens or selected loan changes
  useEffect(() => {
    if (open) {
      fetchEmployees();
      resetForm();
      
      // If a loan is pre-selected, set the relevant form data
      if (selectedLoan) {
        setFormData(prev => ({
          ...prev,
          employee_id: selectedLoan.employee_id,
          loan_id: selectedLoan.loan_id
        }));
        
        fetchEmployeeLoan(selectedLoan.employee_id);
      }
    }
  }, [open, selectedLoan]);

  const resetForm = () => {
    setFormData({
      employee_id: selectedLoan?.employee_id || '',
      loan_id: selectedLoan?.loan_id || '',
      amount: '',
      payment_type: 'CASH',
      payment_date: formatDateForInput(new Date()),
      notes: ''
    });
    setFormErrors({});
    setError(null);
    setSelectedEmployee(null);
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError('Failed to load employees data');
      setLoading(false);
    }
  };

  // Fetch loans for a specific employee
  const fetchEmployeeLoan = async (employeeId) => {
    if (!employeeId) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`/api/loans/employee/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Only include loans with remaining balance
      const activeLoans = response.data.loans.filter(loan => parseFloat(loan.balance) > 0);
      setLoans(activeLoans);
      
      // Find the employee in our list
      const employee = employees.find(e => e.employee_id === employeeId);
      setSelectedEmployee(employee || null);
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch employee loans:', err);
      setError('Failed to load employee loan data');
      setLoading(false);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'employee_id' && value !== formData.employee_id) {
      fetchEmployeeLoan(value);
      setFormData({
        ...formData,
        employee_id: value,
        loan_id: '' // Reset loan selection when employee changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!formData.employee_id) errors.employee_id = 'Employee is required';
    if (!formData.loan_id) errors.loan_id = 'Loan is required';
    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be greater than zero';
    }
    
    // Check if amount is greater than loan balance
    if (formData.loan_id && formData.amount) {
      const selectedLoan = loans.find(loan => loan.loan_id === formData.loan_id);
      if (selectedLoan && parseFloat(formData.amount) > parseFloat(selectedLoan.balance)) {
        errors.amount = 'Amount cannot exceed the remaining loan balance';
      }
    }
    
    if (!formData.payment_date) errors.payment_date = 'Payment date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit the form
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        ...formData,
        payment_date: formData.payment_date // Already formatted as YYYY-MM-DD
      };
      
      const response = await axios.post('/api/loan-payments', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      console.error('Failed to create loan payment:', err);
      setError(err.response?.data?.message || 'Failed to create payment. Please try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? null : handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          New Loan Payment
          <IconButton onClick={handleClose} size="small" disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl 
              fullWidth 
              required
              error={!!formErrors.employee_id}
              disabled={loading || !!selectedLoan}
            >
              <InputLabel>Employee</InputLabel>
              <Select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                label="Employee"
              >
                {employees.map(employee => (
                  <MenuItem key={employee.employee_id} value={employee.employee_id}>
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
            <FormControl 
              fullWidth 
              required
              error={!!formErrors.loan_id}
              disabled={loading || !formData.employee_id || !!selectedLoan}
            >
              <InputLabel>Loan</InputLabel>
              <Select
                name="loan_id"
                value={formData.loan_id}
                onChange={handleChange}
                label="Loan"
              >
                {loans.length === 0 ? (
                  <MenuItem disabled>No active loans</MenuItem>
                ) : (
                  loans.map(loan => (
                    <MenuItem key={loan.loan_id} value={loan.loan_id}>
                      {loan.description || `Loan #${loan.loan_id}`} - Balance: ₱{parseFloat(loan.balance).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </MenuItem>
                  ))
                )}
              </Select>
              {formErrors.loan_id && (
                <FormHelperText>{formErrors.loan_id}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          {formData.loan_id && (
            <Grid item xs={12}>
              <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1, mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Selected Loan Details:
                </Typography>
                {(() => {
                  const loan = loans.find(l => l.loan_id === formData.loan_id);
                  if (!loan) return null;
                  
                  return (
                    <Grid container spacing={1} sx={{ mt: 0.5 }}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                          Type: <strong>{loan.loan_type_name}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                          Total: <strong>₱{parseFloat(loan.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                          Balance: <strong>₱{parseFloat(loan.balance).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })()}
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
              error={!!formErrors.amount}
              helperText={formErrors.amount}
              disabled={loading}
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Payment Type</InputLabel>
              <Select
                name="payment_type"
                value={formData.payment_type}
                onChange={handleChange}
                label="Payment Type"
              >
                <MenuItem value="CASH">Cash</MenuItem>
                <MenuItem value="CHECK">Check</MenuItem>
                <MenuItem value="TRANSFER">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Payment Date"
              name="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={handleChange}
              required
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
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={2}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={handleClose} 
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Processing...' : 'Create Payment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLoanPaymentDialog; 