import React, { useState, useEffect } from 'react';
import {
  Box, 
  Button, 
  Card, 
  Container, 
  Typography, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Print as PrintIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { formatCurrency } from '../../utils/formatters';

const PayrollPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  
  const [years, setYears] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  
  const [payrollData, setPayrollData] = useState([]);
  const [filteredPayrollData, setFilteredPayrollData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add state for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Load initial data on component mount
  useEffect(() => {
    fetchClients();
    fetchYears();
  }, []);
  
  // Update attendance groups when client changes
  useEffect(() => {
    if (selectedClient && selectedYear && selectedPeriod) {
      fetchPayrollData();
    }
  }, [selectedClient, selectedYear, selectedPeriod]);
  
  // Filter payroll data based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPayrollData(payrollData);
    } else {
      const filtered = payrollData.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPayrollData(filtered);
    }
  }, [searchTerm, payrollData]);
  
  // Fetch years when year changes
  useEffect(() => {
    if (selectedYear) {
      fetchPeriods();
    }
  }, [selectedYear]);
  
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
      
      // Auto-select first client if available
      if (response.data.length > 0 && !selectedClient) {
        setSelectedClient(response.data[0].client_id);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError('Failed to load clients. Please try again.');
      setLoading(false);
    }
  };
  
  const fetchYears = async () => {
    setLoading(true);
    try {
      // Try first route
      try {
        const response = await api.get(`/api/attendance-groups/years`);
        setYears(response.data);
        
        // Select current year by default
        const currentYear = new Date().getFullYear().toString();
        if (response.data.includes(currentYear)) {
          setSelectedYear(currentYear);
        } else if (response.data.length > 0) {
          setSelectedYear(response.data[0]);
        }
      } catch (yearError) {
        console.error('Primary years endpoint failed, trying fallback:', yearError);
        
        // Fallback to getting years from existing attendance groups
        const groupsResponse = await api.get(`/api/attendance-groups`);
        
        // Extract unique years from attendance groups
        const uniqueYears = [...new Set(groupsResponse.data.map(group => group.year))];
        setYears(uniqueYears);
        
        // Select current year by default or first available
        const currentYear = new Date().getFullYear().toString();
        if (uniqueYears.includes(currentYear)) {
          setSelectedYear(currentYear);
        } else if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching years:', error);
      // Graceful degradation - provide default years
      const currentYear = new Date().getFullYear().toString();
      const lastYear = (new Date().getFullYear() - 1).toString();
      const defaultYears = [currentYear, lastYear];
      setYears(defaultYears);
      setSelectedYear(currentYear);
      setLoading(false);
    }
  };
  
  const fetchPeriods = async () => {
    if (!selectedYear) return;
    
    setLoading(true);
    try {
      try {
        const response = await api.get(`/api/attendance-groups/periods/${selectedYear}`);
        setPeriods(response.data);
        
        // Select the first period by default
        if (response.data.length > 0) {
          setSelectedPeriod(response.data[0]);
        }
      } catch (periodsError) {
        console.error('Primary periods endpoint failed, trying fallback:', periodsError);
        
        // Fallback to getting periods from existing attendance groups
        const groupsResponse = await api.get(`/api/attendance-groups`);
        
        // Filter by year and extract unique periods
        const filteredGroups = groupsResponse.data.filter(group => group.year === selectedYear);
        const uniquePeriods = [...new Set(filteredGroups.map(group => group.period))];
        setPeriods(uniquePeriods);
        
        // Select the first period by default
        if (uniquePeriods.length > 0) {
          setSelectedPeriod(uniquePeriods[0]);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching periods:', error);
      // Provide default periods
      const defaultPeriods = ['January 1 to 15', 'January 16 to 31'];
      setPeriods(defaultPeriods);
      setSelectedPeriod(defaultPeriods[0]);
      setLoading(false);
    }
  };
  
  const fetchPayrollData = async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(
        `/api/payroll/computations/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      
      setPayrollData(response.data);
      setFilteredPayrollData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payroll data:', error);
      setError('Failed to load payroll data. Please try again.');
      setPayrollData([]);
      setFilteredPayrollData([]);
      setLoading(false);
    }
  };
  
  const handlePrintPayroll = () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) {
      setError('Please select client, year and period first');
      return;
    }
    
    window.open(
      `/payroll/print/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`,
      '_blank'
    );
  };
  
  const formatHours = (hours) => {
    if (hours === null || hours === undefined) return '0h';
    return `${Number(hours).toFixed(0)}h`;
  };
  
  // Add function to open modal with employee details
  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  // Add function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payroll Management
        </Typography>
        
        <Box>
                <Button 
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrintPayroll}
            sx={{ ml: 1 }}
            disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
          >
            Print Payroll
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
            {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
          </Alert>
        )}
        
      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filter Payroll Data
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="client-select-label">Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  value={selectedClient}
                  label="Client"
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.client_id} value={client.client_id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="period-select-label">Period</InputLabel>
                <Select
                  labelId="period-select-label"
                  id="period-select"
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Search Employee"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                  ),
                }}
              />
            </Grid>
              
            <Grid item xs={12} md={1}>
                <Button
                fullWidth
                  variant="contained"
                color="primary"
                onClick={fetchPayrollData}
                startIcon={<RefreshIcon />}
                disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
              >
                Refresh
                </Button>
            </Grid>
          </Grid>
            </Box>
      </Card>
          
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress />
            </Box>
          ) : filteredPayrollData.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                No payroll data available. Select a client, year, and period, then click Refresh.
              </Typography>
            </Box>
          ) : (
            <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Days Worked</TableCell>
                      <TableCell>Hours Worked</TableCell>
                      <TableCell>Rest Day</TableCell>
                      <TableCell>BASIC PAY</TableCell>
                      <TableCell>NSD</TableCell>
                      <TableCell>NSD(BP)</TableCell>
                      <TableCell>NHW(SH)</TableCell>
                      <TableCell>SH(BP)</TableCell>
                      <TableCell>NHW(SHOT)</TableCell>
                      <TableCell>SHOT(BP)</TableCell>
                      <TableCell>NHW(LH)</TableCell>
                      <TableCell>LH(BP)</TableCell>
                      <TableCell>NHW(LHOT)</TableCell>
                      <TableCell>LHOT(BP)</TableCell>
                      <TableCell>Head Guard Allowance</TableCell>
                      <TableCell>Rest Day</TableCell>
                      <TableCell>Adjustments</TableCell>
                      <TableCell>Gross Pay</TableCell>
                      <TableCell>SSS</TableCell>
                      <TableCell>PHIL</TableCell>
                      <TableCell>INSURANCE</TableCell>
                      <TableCell>P1</TableCell>
                      <TableCell>Death</TableCell>
                      <TableCell>Pag-Ibig</TableCell>
                      <TableCell>P2</TableCell>
                      <TableCell>P3</TableCell>
                      <TableCell>Uniform</TableCell>
                      <TableCell>Cash Advances</TableCell>
                      <TableCell>Loan Statement</TableCell>
                      <TableCell>Loan Purpose</TableCell>
                      <TableCell>Beneficiaries</TableCell>
                      <TableCell>Net Pay</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                {filteredPayrollData.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name || item.employee_name}</TableCell>
                    <TableCell>{item.ndw}</TableCell>
                    <TableCell>{formatHours(item.total_hours)}</TableCell>
                    <TableCell>{formatCurrency(item.rest_day)}</TableCell>
                    <TableCell>{formatCurrency(item.basic_pay)}</TableCell>
                    <TableCell>{item.nsd}</TableCell>
                    <TableCell>{formatCurrency(item.nsd_basic_pay)}</TableCell>
                    <TableCell>{item.nhw_sh}</TableCell>
                    <TableCell>{formatCurrency(item.sh_basic_pay)}</TableCell>
                    <TableCell>{item.nhw_shot}</TableCell>
                    <TableCell>{formatCurrency(item.shot_basic_pay)}</TableCell>
                    <TableCell>{item.nhw_lh}</TableCell>
                    <TableCell>{formatCurrency(item.lh_basic_pay)}</TableCell>
                    <TableCell>{item.nhw_lhot}</TableCell>
                    <TableCell>{formatCurrency(item.lhot_basic_pay)}</TableCell>
                    <TableCell>{formatCurrency(item.head_guard_allowance || 0)}</TableCell>
                    <TableCell>{formatCurrency(item.rest_day)}</TableCell>
                    <TableCell>{formatCurrency(item.adjustments)}</TableCell>
                    <TableCell>{formatCurrency(item.gross_pay)}</TableCell>
                    <TableCell>{formatCurrency(item.sss)}</TableCell>
                    <TableCell>{formatCurrency(item.phil)}</TableCell>
                    <TableCell>{formatCurrency(item.insurance)}</TableCell>
                    <TableCell>{formatCurrency(item.part1)}</TableCell>
                    <TableCell>{formatCurrency(item.death)}</TableCell>
                    <TableCell>{formatCurrency(item.pagibig)}</TableCell>
                    <TableCell>{formatCurrency(item.part2)}</TableCell>
                    <TableCell>{formatCurrency(item.others || 0)}</TableCell>
                    <TableCell>{formatCurrency(item.uniform_deduction || 0)}</TableCell>
                    <TableCell>{formatCurrency(item.cash_advances)}</TableCell>
                    <TableCell>{formatCurrency(item.loan_statement)}</TableCell>
                    <TableCell>{item.loan_purpose || '-'}</TableCell>
                    <TableCell>{item.beneficiaries || '-'}</TableCell>
                    <TableCell>{formatCurrency(item.netpay)}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Payslip Details">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<SearchIcon />}
                          onClick={() => handleOpenModal(item)}
                          sx={{ minWidth: '100px' }}
                        >
                          View
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                  </TableBody>
                </Table>
          )}
        </TableContainer>
        </Paper>

      {/* Add the Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Employee Payroll Details
          </Typography>
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedEmployee.name || selectedEmployee.employee_name}
                  </Typography>
                  <Typography variant="body2">
                    Days Worked: {selectedEmployee.ndw || '0'}
                  </Typography>
                  <Typography variant="body2">
                    Hours Worked: {formatHours(selectedEmployee.total_hours)}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>Earnings</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.basic_pay)}</Grid>
                    
                    <Grid item xs={6}>Rest Day:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.rest_day)}</Grid>
                    
                    <Grid item xs={6}>NSD Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.nsd_basic_pay)}</Grid>
                    
                    <Grid item xs={6}>SH Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.sh_basic_pay)}</Grid>
                    
                    <Grid item xs={6}>SHOT Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.shot_basic_pay)}</Grid>
                    
                    <Grid item xs={6}>LH Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.lh_basic_pay)}</Grid>
                    
                    <Grid item xs={6}>LHOT Basic Pay:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.lhot_basic_pay)}</Grid>
                    
                    <Grid item xs={6}>Head Guard Allowance:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.head_guard_allowance || 0)}</Grid>
                    
                    <Grid item xs={6}>Adjustments:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.adjustments)}</Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container>
                    <Grid item xs={6}><Typography variant="subtitle1" fontWeight="bold">Gross Pay:</Typography></Grid>
                    <Grid item xs={6} align="right">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {formatCurrency(selectedEmployee.gross_pay)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>Deductions</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>SSS:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.sss)}</Grid>
                    
                    <Grid item xs={6}>PhilHealth:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.phil)}</Grid>
                    
                    <Grid item xs={6}>Insurance:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.insurance)}</Grid>
                    
                    <Grid item xs={6}>P1:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.part1)}</Grid>
                    
                    <Grid item xs={6}>Death:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.death)}</Grid>
                    
                    <Grid item xs={6}>Pag-Ibig:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.pagibig)}</Grid>
                    
                    <Grid item xs={6}>P2:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.part2)}</Grid>
                    
                    <Grid item xs={6}>P3:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.others || 0)}</Grid>
                    
                    <Grid item xs={6}>Uniform:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.uniform_deduction || 0)}</Grid>
                    
                    <Grid item xs={6}>Cash Advances:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.cash_advances)}</Grid>
                    
                    <Grid item xs={6}>Loan Statement:</Grid>
                    <Grid item xs={6} align="right">{formatCurrency(selectedEmployee.loan_statement)}</Grid>
                    
                    {/* Display additional loan information for advance loans */}
                    {selectedEmployee.loan_details && selectedEmployee.loan_details.length > 0 && (
                      <Grid item xs={12}>
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Loan Payment Details:
                          </Typography>
                          {selectedEmployee.loan_details.map((loan, index) => (
                            <Typography key={index} variant="body2">
                              {loan.description || 'Loan'}: {loan.advance === 1 ? 
                                `Term ${loan.current_term} of ${loan.total_terms} (${formatCurrency(loan.term_amount)})` : 
                                formatCurrency(loan.balance)}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container>
                    <Grid item xs={6}><Typography variant="subtitle1" fontWeight="bold">Total Deductions:</Typography></Grid>
                    <Grid item xs={6} align="right">
                      <Typography variant="subtitle1" fontWeight="bold">
                        {formatCurrency(
                          parseFloat(selectedEmployee.part1 || 0) + 
                          parseFloat(selectedEmployee.part2 || 0) + 
                          parseFloat(selectedEmployee.others || 0) +
                          parseFloat(selectedEmployee.sss || 0) +
                          parseFloat(selectedEmployee.phil || 0) +
                          parseFloat(selectedEmployee.pagibig || 0) +
                          parseFloat(selectedEmployee.death || 0) +
                          parseFloat(selectedEmployee.insurance || 0) +
                          parseFloat(selectedEmployee.uniform_deduction || 0) +
                          parseFloat(selectedEmployee.cash_advances || 0) +
                          parseFloat(selectedEmployee.loan_statement || 0)
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, bgcolor: '#e3f2fd', textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    Net Pay
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {formatCurrency(selectedEmployee.netpay)}
                  </Typography>
                </Paper>
              </Grid>

              {selectedEmployee.loan_purpose && (
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Loan Purpose:</Typography>
                    <Typography variant="body1">{selectedEmployee.loan_purpose}</Typography>
                  </Paper>
                </Grid>
              )}
              
              {selectedEmployee.beneficiaries && (
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Beneficiaries:</Typography>
                    <Typography variant="body1">{selectedEmployee.beneficiaries}</Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<PrintIcon />}
            onClick={() => window.print()} // Simple print function, can be enhanced
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PayrollPage; 