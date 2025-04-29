import React, { useState } from 'react';
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
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const PettyCashReportForm = ({ onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    voucher: '',
    type: 1, // Default to cash in
    remarks: '',
    cash_in: '',
    cash_out: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
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
    
    // If type changes, reset the opposite cash field
    if (name === 'type') {
      if (value === 1) {
        setFormData(prev => ({ ...prev, cash_out: '' }));
      } else {
        setFormData(prev => ({ ...prev, cash_in: '' }));
      }
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.voucher) {
      errors.voucher = 'Please enter a voucher number';
    }
    
    if (formData.type === 1 && (!formData.cash_in || isNaN(formData.cash_in) || parseFloat(formData.cash_in) <= 0)) {
      errors.cash_in = 'Please enter a valid positive amount for cash in';
    }
    
    if (formData.type === 2 && (!formData.cash_out || isNaN(formData.cash_out) || parseFloat(formData.cash_out) <= 0)) {
      errors.cash_out = 'Please enter a valid positive amount for cash out';
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
      const reportData = {
        ...formData,
        cash_in: formData.type === 1 ? parseFloat(formData.cash_in) : 0,
        cash_out: formData.type === 2 ? parseFloat(formData.cash_out) : 0,
        type: parseInt(formData.type)
      };
      
      await axios.post('/api/pettyCash/reports', reportData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSubmitting(false);
      
      // Notify parent of success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error saving petty cash report:', err);
      setError(err.response?.data?.message || 'Failed to save petty cash report');
      setSubmitting(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Voucher Number"
            name="voucher"
            value={formData.voucher}
            onChange={handleChange}
            error={!!formErrors.voucher}
            helperText={formErrors.voucher}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography variant="subtitle2" gutterBottom>
              Transaction Type
            </Typography>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel value={1} control={<Radio />} label="Cash In" />
              <FormControlLabel value={2} control={<Radio />} label="Cash Out" />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        {formData.type === 1 ? (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cash In Amount"
              name="cash_in"
              value={formData.cash_in}
              onChange={handleChange}
              error={!!formErrors.cash_in}
              helperText={formErrors.cash_in}
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cash Out Amount"
              name="cash_out"
              value={formData.cash_out}
              onChange={handleChange}
              error={!!formErrors.cash_out}
              helperText={formErrors.cash_out}
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
            />
          </Grid>
        )}
        
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
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PettyCashReportForm; 