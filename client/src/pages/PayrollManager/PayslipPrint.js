import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import { formatCurrency, formatHours, formatDate } from '../../utils/formatters';
import { useReactToPrint } from 'react-to-print';

const PayslipPrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const api = useApi();
  const printRef = useRef();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [draft, setDraft] = useState(null);
  const [client, setClient] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [rates, setRates] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    console.log("Draft ID from URL (Print):", id);
    
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
      console.log(`Fetching draft with ID (Print): ${id}`);
      
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
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Payslip-${employee?.lastname}-${draft?.period}-${draft?.year}`,
  });
  
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
  
  const totalDeductions = parseFloat(draft.part1) + 
                          parseFloat(draft.part2) + 
                          parseFloat(draft.others);
  
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
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print Payslip
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Paper sx={{ p: 4, mb: 4 }} ref={printRef}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              {client?.name || 'Company Name'}
            </Typography>
            <Typography variant="body1">
              {client?.address || 'Company Address'}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              PAYSLIP
            </Typography>
            <Typography variant="body2">
              Period: {draft.period}, {draft.year}
            </Typography>
          </Box>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Employee:</strong> {employee?.firstname} {employee?.lastname}
              </Typography>
              <Typography variant="body1">
                <strong>Position:</strong> {employee?.position || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
              <Typography variant="body1">
                <strong>Date:</strong> {formatDate(draft.date_created)}
              </Typography>
              <Typography variant="body1">
                <strong>Payslip #:</strong> {draft.payslip_draft_id}
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Earnings
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Regular Hours ({formatHours(draft.regular_hours)})</TableCell>
                      <TableCell align="right">{formatCurrency(draft.basic_pay)}</TableCell>
                    </TableRow>
                    
                    {parseFloat(draft.rest_day) > 0 && (
                      <TableRow>
                        <TableCell>Rest Day Pay</TableCell>
                        <TableCell align="right">{formatCurrency(draft.rest_day)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.nsd_basic_pay) > 0 && (
                      <TableRow>
                        <TableCell>Night Differential ({formatHours(draft.night_diff_hours)})</TableCell>
                        <TableCell align="right">{formatCurrency(draft.nsd_basic_pay)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.sh_basic_pay) > 0 && (
                      <TableRow>
                        <TableCell>Special Holiday ({formatHours(draft.special_holiday_hours)})</TableCell>
                        <TableCell align="right">{formatCurrency(draft.sh_basic_pay)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.lh_basic_pay) > 0 && (
                      <TableRow>
                        <TableCell>Legal Holiday ({formatHours(draft.legal_holiday_hours)})</TableCell>
                        <TableCell align="right">{formatCurrency(draft.lh_basic_pay)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.adjustments) > 0 && (
                      <TableRow>
                        <TableCell>Adjustments</TableCell>
                        <TableCell align="right">{formatCurrency(draft.adjustments)}</TableCell>
                      </TableRow>
                    )}
                    
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Gross Pay</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                        {formatCurrency(draft.gross_pay)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Deductions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {parseFloat(draft.sss) > 0 && (
                      <TableRow>
                        <TableCell>SSS</TableCell>
                        <TableCell align="right">{formatCurrency(draft.sss)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.phil) > 0 && (
                      <TableRow>
                        <TableCell>PhilHealth</TableCell>
                        <TableCell align="right">{formatCurrency(draft.phil)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.pagibig) > 0 && (
                      <TableRow>
                        <TableCell>Pag-IBIG</TableCell>
                        <TableCell align="right">{formatCurrency(draft.pagibig)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.insurance) > 0 && (
                      <TableRow>
                        <TableCell>Insurance</TableCell>
                        <TableCell align="right">{formatCurrency(draft.insurance)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.death) > 0 && (
                      <TableRow>
                        <TableCell>Death Contribution</TableCell>
                        <TableCell align="right">{formatCurrency(draft.death)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.cash_advances) > 0 && (
                      <TableRow>
                        <TableCell>Cash Advances</TableCell>
                        <TableCell align="right">{formatCurrency(draft.cash_advances)}</TableCell>
                      </TableRow>
                    )}
                    
                    {parseFloat(draft.loan_statement) > 0 && (
                      <TableRow>
                        <TableCell>Loan Payment</TableCell>
                        <TableCell align="right">{formatCurrency(draft.loan_statement)}</TableCell>
                      </TableRow>
                    )}
                    
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Total Deductions</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                        {formatCurrency(totalDeductions)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Grid container>
              <Grid item xs={7}>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    This is an official payslip. Total hours worked: {formatHours(draft.total_hours)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Pay period: {draft.period}, {draft.year}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ p: 2, border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Net Pay:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {formatCurrency(draft.netpay)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {beneficiaries.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Beneficiaries
              </Typography>
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
                        <TableCell>{beneficiary.relationship || beneficiary.type}</TableCell>
                        <TableCell align="right">{formatCurrency(50)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          <Grid container spacing={2} sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Grid item xs={6}>
              <Box sx={{ mt: 4 }}>
                <Divider sx={{ width: '80%' }} />
                <Typography variant="body2" sx={{ mt: 1 }}>Employee Signature</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Divider sx={{ width: '80%', ml: 'auto' }} />
                <Typography variant="body2" sx={{ mt: 1 }}>Authorized Signature</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default PayslipPrint; 