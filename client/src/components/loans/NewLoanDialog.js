import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  CircularProgress,
  Divider,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  useTheme
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const NewLoanDialog = ({ open, onClose, onSuccess }) => {
  const theme = useTheme();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isAdvancedLoan, setIsAdvancedLoan] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [generatedStatements, setGeneratedStatements] = useState([]);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    description: '',
    amount: '',
    target_date: '',
    loan_type: '',
    payment_type: 'CASH',
    principal: '',
    interest_rate: 0,
    interest_value: 0,
    payable_by: 1,
    advance: 0
  });

  useEffect(() => {
    if (open) {
      fetchData();
      setActiveStep(0);
      setGeneratedStatements([]);
    }
  }, [open, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch employees and loan types in parallel
      const [employeesResponse, loanTypesResponse] = await Promise.all([
        axios.get('/api/employees', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/loans/types/all', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setEmployees(employeesResponse.data);
      setLoanTypes(loanTypesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load required data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // When changing principal or payable_by, reset generated statements
    if (isAdvancedLoan && (name === 'principal' || name === 'interest_rate' || name === 'payable_by')) {
      setGeneratedStatements([]);
    }
  };

  const handleSwitchChange = (e) => {
    const { checked } = e.target;
    setIsAdvancedLoan(checked);
    
    // When switching to advanced loan, initialize principal with amount if it exists
    // When switching back, update amount with the calculated total from principal+interest
    if (checked) {
      setFormData(prev => ({ 
        ...prev, 
        advance: 1,
        principal: prev.amount && parseFloat(prev.amount) > 0 ? prev.amount : '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        advance: 0,
        principal: '',
        interest_rate: 0,
        interest_value: 0,
      }));
      setGeneratedStatements([]);
      setActiveStep(0);
    }
  };

  const validateBasicInfo = () => {
    if (!formData.employee_id) return 'Employee is required';
    if (!formData.loan_type) return 'Loan type is required';
    
    if (isAdvancedLoan) {
      if (!formData.principal || parseFloat(formData.principal) <= 0) return 'Principal amount is required';
      if (!formData.payable_by || parseInt(formData.payable_by) <= 0) return 'Payment periods is required';
    } else {
      if (!formData.amount || parseFloat(formData.amount) <= 0) return 'Valid amount is required';
    }
    
    return null;
  };

  const handleNextStep = () => {
    // For advance loans, generate payment schedule first to set the amount
    if (isAdvancedLoan) {
      generatePaymentSchedule();
    }
    
    const validationError = validateBasicInfo();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (isAdvancedLoan) {
      setActiveStep(1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    setActiveStep(0);
  };

  const generatePaymentSchedule = () => {
    const principal = parseFloat(formData.principal);
    const interestRate = parseFloat(formData.interest_rate || 0);
    const periods = parseInt(formData.payable_by);
    
    // Calculate interest amount
    const interestAmount = principal * (interestRate / 100);
    
    // Calculate total amount with interest
    const totalAmount = principal + interestAmount;
    
    // Calculate amount per payment period
    const amountPerPeriod = totalAmount / periods;
    
    // Get current date
    const currentDate = new Date();
    
    // Create statements
    const statements = [];
    
    for (let i = 0; i < periods; i++) {
      const periodNum = i + 1;
      
      // Calculate period dates (alternating between 1st-15th and 16th-end of month)
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() + Math.floor(i/2));
      
      if (i % 2 === 0) {
        // 1st period of month
        startDate.setDate(1);
      } else {
        // 2nd period of month
        startDate.setDate(16);
      }
      
      const endDate = new Date(startDate);
      if (i % 2 === 0) {
        // 1st period ends on 15th
        endDate.setDate(15);
      } else {
        // 2nd period ends on last day of month
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
      }
      
      // Create ordinal suffix
      let suffix = 'th';
      if (periodNum === 1) suffix = 'st';
      else if (periodNum === 2) suffix = 'nd';
      else if (periodNum === 3) suffix = 'rd';
      
      statements.push({
        num: periodNum,
        label: `${periodNum}${suffix} Payment`,
        amount: amountPerPeriod.toFixed(2),
        start_date: startDate.toISOString().slice(0, 10),
        end_date: endDate.toISOString().slice(0, 10),
        status: 0
      });
    }
    
    setGeneratedStatements(statements);
    
    // Update form data with calculated values
    setFormData(prev => ({
      ...prev,
      amount: totalAmount.toFixed(2),
      interest_value: interestAmount.toFixed(2)
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    
    try {
      const dataToSend = { ...formData };
      
      // If this is an advanced loan, include the statements
      if (isAdvancedLoan && generatedStatements.length > 0) {
        dataToSend.statements = generatedStatements;
      }
      
      await axios.post('/api/loans', dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSaving(false);
      handleClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating loan:', error);
      setError('Failed to create loan. Please try again.');
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const handleClose = () => {
    setFormData({
      employee_id: '',
      description: '',
      amount: '',
      target_date: '',
      loan_type: '',
      payment_type: 'CASH',
      principal: '',
      interest_rate: 0,
      interest_value: 0,
      payable_by: 1,
      advance: 0
    });
    setIsAdvancedLoan(false);
    setError(null);
    setActiveStep(0);
    setGeneratedStatements([]);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          New Loan
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      {isAdvancedLoan && (
        <Box sx={{ px: 3, pt: 1 }}>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Loan Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment Schedule</StepLabel>
            </Step>
          </Stepper>
        </Box>
      )}
      
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {activeStep === 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={isAdvancedLoan} 
                        onChange={handleSwitchChange}
                      />
                    }
                    label="Advanced Loan with Payment Schedule"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Employee</InputLabel>
                    <Select
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleInputChange}
                      label="Employee"
                    >
                      {employees.map(employee => (
                        <MenuItem key={employee.employee_id} value={employee.employee_id}>
                          {employee.firstname} {employee.lastname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Loan Type</InputLabel>
                    <Select
                      name="loan_type"
                      value={formData.loan_type}
                      onChange={handleInputChange}
                      label="Loan Type"
                    >
                      {loanTypes.map(type => (
                        <MenuItem key={type.type_id} value={type.type_id}>
                          {type.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                {isAdvancedLoan ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Principal Amount"
                        name="principal"
                        type="number"
                        value={formData.principal}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Interest Rate (%)"
                        name="interest_rate"
                        type="number"
                        value={formData.interest_rate}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Payment Periods"
                        name="payable_by"
                        type="number"
                        value={formData.payable_by}
                        onChange={handleInputChange}
                        helperText="Number of payment periods"
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Amount"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                      }}
                    />
                  </Grid>
                )}
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                      name="payment_type"
                      value={formData.payment_type}
                      onChange={handleInputChange}
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
                    label="Target Date"
                    name="target_date"
                    type="date"
                    value={formData.target_date}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            ) : (
              // Payment Schedule Step
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2, p: 2, bgcolor: theme.palette.grey[50], borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Loan Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                          Principal Amount:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatCurrency(formData.principal)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                          Interest Amount:
                        </Typography>
                        <Typography variant="body1">
                          {formatCurrency(formData.interest_value)} ({formData.interest_rate}%)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                          Total Amount:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {formatCurrency(formData.amount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="textSecondary">
                          Payment Periods:
                        </Typography>
                        <Typography variant="body1">
                          {formData.payable_by}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="body2" color="textSecondary">
                          Selected Employee:
                        </Typography>
                        <Typography variant="body1">
                          {employees.find(e => e.employee_id === formData.employee_id)?.firstname} {employees.find(e => e.employee_id === formData.employee_id)?.lastname}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Payment Schedule
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Payment</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>End Date</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {generatedStatements.map((statement, index) => (
                          <TableRow key={index}>
                            <TableCell>{statement.label}</TableCell>
                            <TableCell>{formatDate(statement.start_date)}</TableCell>
                            <TableCell>{formatDate(statement.end_date)}</TableCell>
                            <TableCell align="right">{formatCurrency(statement.amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        {activeStep === 1 && (
          <Button 
            onClick={handlePrevStep}
            startIcon={<ArrowBackIcon />}
            disabled={loading || saving}
          >
            Back
          </Button>
        )}
        <Button 
          onClick={handleClose} 
          disabled={loading || saving}
        >
          Cancel
        </Button>
        {activeStep === 0 ? (
          <Button 
            onClick={handleNextStep} 
            variant="contained" 
            color="primary"
            disabled={loading || saving}
          >
            {isAdvancedLoan ? 'Next: Payment Schedule' : 'Create Loan'}
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={loading || saving}
            startIcon={saving && <CircularProgress size={20} />}
          >
            {saving ? 'Creating...' : 'Create Advanced Loan'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NewLoanDialog; 