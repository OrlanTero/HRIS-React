import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
];

const civilStatusOptions = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Widowed', label: 'Widowed' },
  { value: 'Separated', label: 'Separated' }
];

const EmployeeForm = ({ 
  employee = {
    firstname: '',
    lastname: '',
    middlename: '',
    gender: '',
    civil_status: '',
    telephone: '',
    mobile: '',
    email: '',
    address: '',
    sss: '',
    phil: '',
    pagibig: '',
    tin: '',
    ctc: '',
    rfid: '',
    gsis: '',
    bankAccounts: []
  }, 
  onSubmit,
  submitButtonText = 'Save',
  readOnly = false
}) => {
  const [formData, setFormData] = useState(employee);
  const [errors, setErrors] = useState({});
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  // Fetch banks for dropdown
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const response = await axios.get('/api/employees/banks/all');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBankAccountChange = (index, field, value) => {
    const updatedAccounts = [...formData.bankAccounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value
    };

    setFormData({
      ...formData,
      bankAccounts: updatedAccounts
    });
  };

  const addBankAccount = () => {
    setFormData({
      ...formData,
      bankAccounts: [
        ...formData.bankAccounts,
        { bank_id: '', account_number: '', active: 1 }
      ]
    });
  };

  const removeBankAccount = (index) => {
    const updatedAccounts = [...formData.bankAccounts];
    updatedAccounts.splice(index, 1);
    
    setFormData({
      ...formData,
      bankAccounts: updatedAccounts
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstname) newErrors.firstname = 'First name is required';
    if (!formData.lastname) newErrors.lastname = 'Last name is required';
    
    // Bank account validation
    if (formData.bankAccounts.length > 0) {
      formData.bankAccounts.forEach((account, index) => {
        if (!account.bank_id) {
          newErrors[`bank_id_${index}`] = 'Bank is required';
        }
        if (!account.account_number) {
          newErrors[`account_number_${index}`] = 'Account number is required';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.firstname}
                helperText={errors.firstname}
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.lastname}
                helperText={errors.lastname}
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middlename"
                value={formData.middlename || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                select
                value={formData.gender || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Civil Status"
                name="civil_status"
                select
                value={formData.civil_status || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              >
                {civilStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                disabled={readOnly}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Telephone"
                name="telephone"
                value={formData.telephone || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Government IDs
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SSS"
                name="sss"
                value={formData.sss || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="TIN"
                name="tin"
                value={formData.tin || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PhilHealth"
                name="phil"
                value={formData.phil || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pag-IBIG"
                name="pagibig"
                value={formData.pagibig || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CTC"
                name="ctc"
                value={formData.ctc || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GSIS"
                name="gsis"
                value={formData.gsis || ''}
                onChange={handleChange}
                variant="outlined"
                disabled={readOnly}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Bank Accounts</Typography>
            {!readOnly && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addBankAccount}
                disabled={loadingBanks}
              >
                Add Bank Account
              </Button>
            )}
          </Box>
          
          {loadingBanks ? (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress size={30} />
            </Box>
          ) : formData.bankAccounts.length > 0 ? (
            formData.bankAccounts.map((account, index) => (
              <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius={1}>
                <Grid container spacing={2}>
                  <Grid item xs={11}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Bank"
                          select
                          value={account.bank_id || ''}
                          onChange={(e) => handleBankAccountChange(index, 'bank_id', e.target.value)}
                          variant="outlined"
                          required
                          error={!!errors[`bank_id_${index}`]}
                          helperText={errors[`bank_id_${index}`]}
                          disabled={readOnly}
                        >
                          {banks.map((bank) => (
                            <MenuItem key={bank.bank_id} value={bank.bank_id}>
                              {bank.name} - {bank.branch}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Account Number"
                          value={account.account_number || ''}
                          onChange={(e) => handleBankAccountChange(index, 'account_number', e.target.value)}
                          variant="outlined"
                          required
                          error={!!errors[`account_number_${index}`]}
                          helperText={errors[`account_number_${index}`]}
                          disabled={readOnly}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {!readOnly && (
                    <Grid item xs={1} display="flex" alignItems="center">
                      <IconButton 
                        color="error" 
                        onClick={() => removeBankAccount(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No bank accounts added yet.
            </Typography>
          )}
        </CardContent>
        {!readOnly && (
          <Box p={2} display="flex" justifyContent="flex-end">
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              type="submit"
            >
              {submitButtonText}
            </Button>
          </Box>
        )}
      </Card>
    </form>
  );
};

export default EmployeeForm; 