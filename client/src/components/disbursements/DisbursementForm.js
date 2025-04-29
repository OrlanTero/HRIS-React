import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  Autocomplete,
  CircularProgress,
  Divider
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const DisbursementForm = ({ disbursementId, requisitionId, onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [banks, setBanks] = useState([]);
  const [requisitionDetails, setRequisitionDetails] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    requisition_id: requisitionId || '',
    voucher: '',
    date: new Date().toISOString().split('T')[0],
    posted: 2, // Default to not posted
    payments: 'Cash',
    amount: 0,
    request: '',
    bank_id: '',
    cheque_number: '',
    cheque_date: null
  });

  // Format date as YYYY-MM-DD for input field
  function formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('/api/banks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    const fetchRequisitions = async () => {
      try {
        // Get approved and pending requisitions
        const response = await axios.get('/api/requisitions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filter requisitions that are pending or approved
        const filteredRequisitions = response.data.filter(
          req => req.status === 'pending' || req.status === 'approved'
        );
        setRequisitions(filteredRequisitions);
      } catch (error) {
        console.error('Error fetching requisitions:', error);
      }
    };

    fetchBanks();
    fetchRequisitions();

    if (disbursementId) {
      fetchDisbursement();
    } else if (requisitionId) {
      fetchRequisitionDetails(requisitionId);
    }
  }, [disbursementId, requisitionId, token]);

  const fetchDisbursement = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/disbursements/${disbursementId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const disbursement = response.data;
      
      setFormData({
        requisition_id: disbursement.requisition_id || '',
        voucher: disbursement.voucher || '',
        date: disbursement.date ? formatDateForInput(new Date(disbursement.date)) : formatDateForInput(new Date()),
        posted: disbursement.posted || 2,
        payments: disbursement.payments || 'Cash',
        amount: Number(disbursement.amount || 0),
        request: disbursement.request || '',
        bank_id: disbursement.bank_id || '',
        cheque_number: disbursement.cheque_number || '',
        cheque_date: disbursement.cheque_date ? formatDateForInput(new Date(disbursement.cheque_date)) : null
      });
      
      if (disbursement.requisition_id) {
        fetchRequisitionDetails(disbursement.requisition_id);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching disbursement:', error);
      setLoading(false);
    }
  };

  const fetchRequisitionDetails = async (reqId) => {
    try {
      const response = await axios.get(`/api/requisitions/${reqId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setRequisitionDetails(response.data);
      
      // Update amount based on requisition
      setFormData(prev => ({
        ...prev,
        requisition_id: reqId,
        amount: Number(response.data.amount || 0),
        request: response.data.req_id || ''
      }));
    } catch (error) {
      console.error('Error fetching requisition details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // If payment method changed to check, ensure bank is required
    if (name === 'payments' && value === 'Check') {
      setFormErrors(prev => ({ 
        ...prev, 
        bank_id: !formData.bank_id ? 'Required for check payments' : null,
        cheque_number: !formData.cheque_number ? 'Required for check payments' : null,
        cheque_date: !formData.cheque_date ? 'Required for check payments' : null
      }));
    }
  };

  const handleRequisitionChange = (event, newValue) => {
    if (newValue) {
      fetchRequisitionDetails(newValue.requisition_id);
    } else {
      setRequisitionDetails(null);
      setFormData(prev => ({
        ...prev,
        requisition_id: '',
        amount: 0,
        request: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.requisition_id) errors.requisition_id = 'Required';
    if (!formData.date) errors.date = 'Required';
    if (!formData.amount || formData.amount <= 0) errors.amount = 'Amount must be greater than 0';
    
    // Check specific fields based on payment method
    if (formData.payments === 'Check') {
      if (!formData.bank_id) errors.bank_id = 'Required for check payments';
      if (!formData.cheque_number) errors.cheque_number = 'Required for check payments';
      if (!formData.cheque_date) errors.cheque_date = 'Required for check payments';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaveLoading(true);
    
    try {
      const dataToSend = {
        ...formData,
        date: formData.date,
        cheque_date: formData.cheque_date
      };
      
      if (disbursementId) {
        await axios.put(`/api/disbursements/${disbursementId}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/disbursements', dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setSaveLoading(false);
      onSuccess();
    } catch (error) {
      console.error('Error saving disbursement:', error);
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            {disbursementId ? 'Edit Disbursement' : 'Create New Disbursement'}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={requisitions}
            getOptionLabel={(option) => `${option.req_id} - ${option.amount}`}
            value={requisitions.find(r => r.requisition_id === formData.requisition_id) || null}
            onChange={handleRequisitionChange}
            disabled={!!disbursementId}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Requisition"
                fullWidth
                required
                error={!!formErrors.requisition_id}
                helperText={formErrors.requisition_id}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="voucher"
            label="Voucher Number"
            value={formData.voucher}
            onChange={handleInputChange}
            disabled={!!disbursementId}
            InputProps={{
              readOnly: !!disbursementId,
            }}
            helperText="Auto-generated if left blank"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="date"
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleInputChange}
            error={!!formErrors.date}
            helperText={formErrors.date}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="payments"
              value={formData.payments}
              label="Payment Method"
              onChange={handleInputChange}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Check">Check</MenuItem>
              <MenuItem value="Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="number"
            name="amount"
            label="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            error={!!formErrors.amount}
            helperText={formErrors.amount}
            InputProps={{
              startAdornment: <InputAdornment position="start">₱</InputAdornment>,
            }}
            inputProps={{ min: 0, step: 0.01 }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="request"
            label="Request Reference"
            value={formData.request}
            onChange={handleInputChange}
          />
        </Grid>
        
        {(formData.payments === 'Check' || formData.payments === 'Transfer') && (
          <>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Bank Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required={formData.payments === 'Check'} error={!!formErrors.bank_id}>
                <InputLabel>Bank</InputLabel>
                <Select
                  name="bank_id"
                  value={formData.bank_id}
                  label="Bank"
                  onChange={handleInputChange}
                >
                  {banks.map(bank => (
                    <MenuItem key={bank.bank_id} value={bank.bank_id}>
                      {bank.bank_name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.bank_id && (
                  <Typography variant="caption" color="error">
                    {formErrors.bank_id}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            {formData.payments === 'Check' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="cheque_number"
                    label="Check Number"
                    value={formData.cheque_number}
                    onChange={handleInputChange}
                    required
                    error={!!formErrors.cheque_number}
                    helperText={formErrors.cheque_number}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    name="cheque_date"
                    label="Check Date"
                    value={formData.cheque_date || ''}
                    onChange={handleInputChange}
                    required
                    error={!!formErrors.cheque_date}
                    helperText={formErrors.cheque_date}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}
          </>
        )}
        
        {requisitionDetails && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Requisition Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Requisition ID:</strong> {requisitionDetails.req_id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Status:</strong> {requisitionDetails.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Amount:</strong> ₱{Number(requisitionDetails.amount).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    <strong>Type:</strong> {requisitionDetails.type}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Remarks:</strong> {requisitionDetails.remarks || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        
        <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            onClick={onCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={saveLoading}
            startIcon={saveLoading ? <CircularProgress size={20} /> : null}
          >
            {disbursementId ? 'Update' : 'Create'} Disbursement
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisbursementForm; 