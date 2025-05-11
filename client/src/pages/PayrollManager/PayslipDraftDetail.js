import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  Check as CheckIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import { formatCurrency, formatHours, formatDate } from '../../utils/formatters';

const PayslipDraftDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const api = useApi();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const [draft, setDraft] = useState(null);
  const [client, setClient] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [rates, setRates] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [showFinalizeDialog, setShowFinalizeDialog] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    console.log("Draft ID from URL:", id);
    
    if (id && id !== "undefined") {
      fetchDraftDetails();
    } else {
      setLoading(false);
      setError('No payslip draft ID provided. Please go back and select a valid draft.');
    }
  }, [id]);
  
  const fetchDraftDetails = async () => {
    if (!id || id === "undefined") {
      setLoading(false);
      setError('No payslip draft ID provided. Please go back and select a valid draft.');
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Fetching draft with ID: ${id}`);
      
      // Get draft details
      const draftResponse = await api.get(`/api/payroll/drafts/${id}`);
      
      if (!draftResponse.data) {
        setError('Payslip draft not found. Please go back and select a valid draft.');
        setLoading(false);
        return;
      }
      
      setDraft(draftResponse.data);
      
      // Get employee details
      const employeeResponse = await api.get(`/api/employees/${draftResponse.data.employee_id}`);
      
      setEmployee(employeeResponse.data);
      
      // Get client details
      const clientResponse = await api.get(`/api/clients/${draftResponse.data.client_id}`);
      
      setClient(clientResponse.data);
      
      // Get rates details
      const ratesResponse = await api.get(`/api/payroll/rates/${draftResponse.data.payslip_rates_id}`);
      
      setRates(ratesResponse.data);
      
      // Get beneficiaries if any
      if (draftResponse.data.beneficiaries) {
        const beneficiaryIds = draftResponse.data.beneficiaries.split(',').filter(Boolean);
        
        if (beneficiaryIds.length > 0) {
          const beneficiariesPromises = beneficiaryIds.map(id => 
            api.get(`/api/beneficiaries/${id}`)
          );
          
          const beneficiariesResponses = await Promise.all(beneficiariesPromises);
          setBeneficiaries(beneficiariesResponses.map(response => response.data));
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching draft details:', error);
      setError(`Failed to load draft details: ${error.message || 'Unknown error'}`);
      setLoading(false);
    }
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset edited values
      setEditedValues({});
    } else {
      // Start editing - initialize edited values with current values
      setEditedValues({
        basic_pay: draft.basic_pay,
        sss: draft.sss,
        phil: draft.phil,
        pagibig: draft.pagibig,
        cash_advances: draft.cash_advances,
        loan_statement: draft.loan_statement,
        adjustments: draft.adjustments,
        regular_hours: draft.regular_hours || 0,
        ot_hours: draft.ot_hours || 0,
        night_diff_hours: draft.night_diff_hours || 0,
        special_holiday_hours: draft.special_holiday_hours || 0,
        legal_holiday_hours: draft.legal_holiday_hours || 0,
        total_hours: draft.total_hours || 0,
        ndw: draft.ndw || 0
      });
    }
    
    setIsEditing(!isEditing);
  };
  
  const handleChange = (field, value) => {
    setEditedValues({
      ...editedValues,
      [field]: value
    });
  };
  
  const calculateUpdatedNetpay = () => {
    // Get the edited values or the original values if not edited
    const basicPay = parseFloat(editedValues.basic_pay || draft.basic_pay);
    const sss = parseFloat(editedValues.sss || draft.sss);
    const phil = parseFloat(editedValues.phil || draft.phil);
    const pagibig = parseFloat(editedValues.pagibig || draft.pagibig);
    const insurance = parseFloat(draft.insurance);
    const death = parseFloat(draft.death);
    const cashAdvances = parseFloat(editedValues.cash_advances || draft.cash_advances);
    const loanStatement = parseFloat(editedValues.loan_statement || draft.loan_statement);
    const adjustments = parseFloat(editedValues.adjustments || draft.adjustments);
    
    // Get the hours values
    const regularHours = parseFloat(editedValues.regular_hours || draft.regular_hours || 0);
    const otHours = parseFloat(editedValues.ot_hours || draft.ot_hours || 0);
    const nightDiffHours = parseFloat(editedValues.night_diff_hours || draft.night_diff_hours || 0);
    const specialHolidayHours = parseFloat(editedValues.special_holiday_hours || draft.special_holiday_hours || 0);
    const legalHolidayHours = parseFloat(editedValues.legal_holiday_hours || draft.legal_holiday_hours || 0);
    const totalHours = regularHours + otHours + nightDiffHours + specialHolidayHours + legalHolidayHours;
    const daysWorked = parseFloat(editedValues.ndw || draft.ndw || 0);
    
    // Calculate the updated gross pay
    const originalGrossPay = parseFloat(draft.gross_pay);
    const originalBasicPay = parseFloat(draft.basic_pay);
    const grossPay = originalGrossPay - originalBasicPay + basicPay;
    
    // Calculate deductions
    const part1 = sss + phil + insurance;
    const part2 = death + pagibig;
    const others = cashAdvances + loanStatement + parseFloat(draft.others) - 
                  parseFloat(draft.cash_advances) - parseFloat(draft.loan_statement);
    
    // Calculate net pay
    const netpay = grossPay - part1 - part2 - others;
    
    return {
      basic_pay: basicPay,
      gross_pay: grossPay,
      sss,
      phil,
      pagibig,
      part1,
      part2,
      others,
      netpay,
      cash_advances: cashAdvances,
      loan_statement: loanStatement,
      adjustments,
      regular_hours: regularHours,
      ot_hours: otHours,
      night_diff_hours: nightDiffHours,
      special_holiday_hours: specialHolidayHours,
      legal_holiday_hours: legalHolidayHours,
      total_hours: totalHours,
      ndw: daysWorked
    };
  };
  
  const handleSave = async () => {
    setSaving(true);
    
    try {
      const updatedValues = calculateUpdatedNetpay();
      
      await api.put(
        `/api/payroll/drafts/${id}`,
        updatedValues
      );
      
      setSuccessMessage('Payslip draft updated successfully');
      setSaving(false);
      setIsEditing(false);
      
      // Refresh the data
      fetchDraftDetails();
    } catch (error) {
      console.error('Error updating draft:', error);
      setError('Failed to update draft. Please try again.');
      setSaving(false);
    }
  };
  
  const handleFinalize = async () => {
    setSaving(true);
    
    try {
      await api.post(
        '/api/payroll/finalize',
        { drafts: [id] }
      );
      
      setSuccessMessage('Payslip finalized successfully');
      setSaving(false);
      setShowFinalizeDialog(false);
      
      // Stay on this page after finalizing instead of navigating away
      fetchDraftDetails();
    } catch (error) {
      console.error('Error finalizing draft:', error);
      setError('Failed to finalize draft. Please try again.');
      setSaving(false);
      setShowFinalizeDialog(false);
    }
  };
  
  const handleGoBack = () => {
    navigate('/payroll');
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (!draft && !loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ pt: 3, pb: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ mb: 2 }}
          >
            Back to Payroll
          </Button>
          <Alert severity="error">
            {error || "Payslip draft not found. Please go back and select a valid draft."}
          </Alert>
        </Box>
      </Container>
    );
  }
  
  const updatedValues = isEditing ? calculateUpdatedNetpay() : draft;
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Back to Payroll
          </Button>
          
          <Stack direction="row" spacing={1}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={() => setShowFinalizeDialog(true)}
                  disabled={saving}
                >
                  Finalize
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PrintIcon />}
                >
                  Print
                </Button>
              </>
            )}
          </Stack>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        )}
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Payslip Draft
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Employee:</strong> {employee?.firstname} {employee?.lastname}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Client:</strong> {client?.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Position:</strong> {employee?.position || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Period:</strong> {draft.period}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Year:</strong> {draft.year}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Date Created:</strong> {formatDate(draft.date_created)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pay Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Regular Hours:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.regular_hours}
                          onChange={(e) => handleChange('regular_hours', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatHours(draft.regular_hours)}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Overtime Hours:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.ot_hours}
                          onChange={(e) => handleChange('ot_hours', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatHours(draft.ot_hours)}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Night Diff Hours:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.night_diff_hours}
                          onChange={(e) => handleChange('night_diff_hours', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatHours(draft.night_diff_hours)}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Special Holiday Hours:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.special_holiday_hours}
                          onChange={(e) => handleChange('special_holiday_hours', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatHours(draft.special_holiday_hours)}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Legal Holiday Hours:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.legal_holiday_hours}
                          onChange={(e) => handleChange('legal_holiday_hours', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatHours(draft.legal_holiday_hours)}</Typography>
                      )}
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Days Worked:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.ndw}
                          onChange={(e) => handleChange('ndw', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 1 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{draft.ndw}</Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Total Hours:</Typography>
                      <Typography>
                        {isEditing 
                          ? formatHours(
                              parseFloat(editedValues.regular_hours || 0) +
                              parseFloat(editedValues.ot_hours || 0) +
                              parseFloat(editedValues.night_diff_hours || 0) +
                              parseFloat(editedValues.special_holiday_hours || 0) +
                              parseFloat(editedValues.legal_holiday_hours || 0)
                            )
                          : formatHours(draft.total_hours)
                        }
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontWeight="bold">Basic Pay:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.basic_pay}
                          onChange={(e) => handleChange('basic_pay', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography fontWeight="bold">{formatCurrency(draft.basic_pay)}</Typography>
                      )}
                    </Box>
                    
                    {parseFloat(draft.rest_day) > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Rest Day Pay:</Typography>
                        <Typography>{formatCurrency(draft.rest_day)}</Typography>
                      </Box>
                    )}
                    
                    {parseFloat(draft.nsd_basic_pay) > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Night Differential Pay:</Typography>
                        <Typography>{formatCurrency(draft.nsd_basic_pay)}</Typography>
                      </Box>
                    )}
                    
                    {parseFloat(draft.sh_basic_pay) > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Special Holiday Pay:</Typography>
                        <Typography>{formatCurrency(draft.sh_basic_pay)}</Typography>
                      </Box>
                    )}
                    
                    {parseFloat(draft.lh_basic_pay) > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Legal Holiday Pay:</Typography>
                        <Typography>{formatCurrency(draft.lh_basic_pay)}</Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Adjustments:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.adjustments}
                          onChange={(e) => handleChange('adjustments', e.target.value)}
                          InputProps={{ inputProps: { step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.adjustments)}</Typography>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontWeight="bold" variant="subtitle1">Gross Pay:</Typography>
                      <Typography fontWeight="bold" variant="subtitle1">
                        {formatCurrency(updatedValues.gross_pay)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Deductions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>SSS:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.sss}
                          onChange={(e) => handleChange('sss', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.sss)}</Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>PhilHealth:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.phil}
                          onChange={(e) => handleChange('phil', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.phil)}</Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Insurance:</Typography>
                      <Typography>{formatCurrency(draft.insurance)}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Pag-IBIG:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.pagibig}
                          onChange={(e) => handleChange('pagibig', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.pagibig)}</Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Death Contribution:</Typography>
                      <Typography>{formatCurrency(draft.death)}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Cash Advances:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.cash_advances}
                          onChange={(e) => handleChange('cash_advances', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.cash_advances)}</Typography>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Loan Payments:</Typography>
                      {isEditing ? (
                        <TextField
                          type="number"
                          size="small"
                          value={editedValues.loan_statement}
                          onChange={(e) => handleChange('loan_statement', e.target.value)}
                          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                          sx={{ width: '150px' }}
                        />
                      ) : (
                        <Typography>{formatCurrency(draft.loan_statement)}</Typography>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontWeight="bold">Total Deductions:</Typography>
                      <Typography fontWeight="bold">
                        {formatCurrency(
                          parseFloat(updatedValues.part1) + 
                          parseFloat(updatedValues.part2) + 
                          parseFloat(updatedValues.others)
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Net Pay
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h5" fontWeight="bold">Total Net Pay:</Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {formatCurrency(updatedValues.netpay)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {beneficiaries.length > 0 && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Beneficiaries
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Relationship</TableCell>
                    <TableCell align="right">Contribution</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {beneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary.beneficiary_id}>
                      <TableCell>{beneficiary.name}</TableCell>
                      <TableCell>{beneficiary.relationship}</TableCell>
                      <TableCell align="right">{formatCurrency(50)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
      
      {/* Finalize Confirmation Dialog */}
      <Dialog open={showFinalizeDialog} onClose={() => setShowFinalizeDialog(false)}>
        <DialogTitle>Finalize Payslip</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to finalize this payslip? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Finalizing will create an official payslip record and mark any associated loans and cash advances as paid.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFinalizeDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleFinalize}
            disabled={saving}
          >
            {saving ? 'Finalizing...' : 'Finalize'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PayslipDraftDetail; 