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
  Chip,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
  Print as PrintIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon
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
  const [attendanceGroups, setAttendanceGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  
  const [payslipDrafts, setPayslipDrafts] = useState([]);
  const [finalizingDrafts, setFinalizingDrafts] = useState(false);
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  
  const [years, setYears] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  
  const [generatingPayroll, setGeneratingPayroll] = useState(false);
  const [showPayrollDialog, setShowPayrollDialog] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  
  useEffect(() => {
    fetchClients();
    fetchYears();
  }, []);
  
  useEffect(() => {
    if (selectedClient) {
      fetchAttendanceGroups();
    }
  }, [selectedClient]);
  
  useEffect(() => {
    if (selectedYear) {
      fetchPeriods();
    }
  }, [selectedYear]);
  
  useEffect(() => {
    if (selectedClient && selectedYear && selectedPeriod) {
      fetchPayslipDrafts();
    }
  }, [selectedClient, selectedYear, selectedPeriod]);
  
  useEffect(() => {
    // Filter drafts based on search term
    if (searchTerm.trim() === '') {
      setFilteredDrafts(payslipDrafts);
    } else {
      const filtered = payslipDrafts.filter(draft => 
        draft.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrafts(filtered);
    }
  }, [searchTerm, payslipDrafts]);
  
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
  
  const fetchAttendanceGroups = async () => {
    if (!selectedClient) return;
    
    setLoading(true);
    try {
      const response = await api.get(`/api/attendance-groups/client/${selectedClient}`);
      setAttendanceGroups(response.data);
      
      // Auto-select first group if available
      if (response.data.length > 0 && !selectedGroup) {
        setSelectedGroup(response.data[0].attendance_group_id);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance groups:', error);
      setError('Failed to load attendance groups. Please try again.');
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
  
  const fetchPayslipDrafts = async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/drafts/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      setPayslipDrafts(response.data);
      setFilteredDrafts(response.data);
      setSelectedDrafts([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payslip drafts:', error);
      setError('Failed to load payslip drafts. Please try again.');
      setLoading(false);
    }
  };
  
  const handleGeneratePayroll = async () => {
    if (!selectedGroup) {
      setError('Please select an attendance group first.');
      return;
    }
    
    setGeneratingPayroll(true);
    setError(null);
    setErrorDetails(null);
    
    try {
      const response = await api.post(
        `/api/payroll/generate/${selectedGroup}`, 
        {}
      );
      
      setGeneratingPayroll(false);
      setShowPayrollDialog(false);
      setSuccess(`Successfully generated ${response.data.drafts.length} payslip drafts.`);
      
      // Refresh the payslip drafts list
      fetchPayslipDrafts();
      
    } catch (error) {
      console.error('Error generating payroll:', error);
      
      // Extract detailed error message if available
      const errorMessage = error.response?.data?.message || 'Failed to generate payroll.';
      const details = error.response?.data?.details || error.message || 'Unknown error occurred.';
      
      setError(errorMessage);
      setErrorDetails(details);
      setGeneratingPayroll(false);
    }
  };
  
  const handleSelectDraft = (draftId) => {
    if (selectedDrafts.includes(draftId)) {
      setSelectedDrafts(selectedDrafts.filter(id => id !== draftId));
    } else {
      setSelectedDrafts([...selectedDrafts, draftId]);
    }
  };
  
  const handleSelectAllDrafts = () => {
    if (selectedDrafts.length === filteredDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(filteredDrafts.map(draft => draft.payslip_draft_id));
    }
  };
  
  const handleFinalizePayroll = async () => {
    if (selectedDrafts.length === 0) {
      setError('Please select at least one payslip draft to finalize.');
      return;
    }
    
    setFinalizingDrafts(true);
    setError(null);
    
    try {
      const response = await api.post(
        '/api/payroll/finalize',
        { drafts: selectedDrafts }
      );
      
      setFinalizingDrafts(false);
      setSuccess(`Successfully finalized ${selectedDrafts.length} payslips.`);
      setSelectedDrafts([]);
      
      // Refresh the list after finalization
      fetchPayslipDrafts();
      
    } catch (error) {
      console.error('Error finalizing payroll:', error);
      setError('Failed to finalize payroll. Please try again.');
      setFinalizingDrafts(false);
    }
  };
  
  const viewPayslipDraft = (draft) => {
    // Navigate to payslip view
    navigate(`/payroll/draft/${draft.payslip_draft_id}`);
  };
  
  const handlePrint = (draft) => {
    // Implement printing functionality
    navigate(`/payroll/print/${draft.payslip_draft_id}`);
  };
  
  const handleCloseSuccess = () => {
    setSuccess(null);
  };
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Payroll Management
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }} 
            onClose={() => setError(null)}
            action={
              errorDetails && (
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => setShowErrorDetails(!showErrorDetails)}
                >
                  {showErrorDetails ? 'Hide Details' : 'Show Details'}
                </Button>
              )
            }
          >
            {error}
            {showErrorDetails && errorDetails && (
              <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {errorDetails}
                </Typography>
              </Box>
            )}
          </Alert>
        )}
        
        <Snackbar 
          open={!!success}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          message={success}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  label="Client"
                  disabled={loading}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.client_id} value={client.client_id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Year"
                  disabled={loading}
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
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  label="Period"
                  disabled={loading || !selectedYear}
                >
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowPayrollDialog(true)}
                disabled={!selectedClient}
                sx={{ mr: 1 }}
              >
                Generate Payroll
              </Button>
              
              <IconButton
                color="primary"
                onClick={fetchPayslipDrafts}
                disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                title="Refresh"
              >
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
            <Typography variant="h5">
              Payslip Drafts
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mr: 2, width: '250px' }}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              
              {selectedDrafts.length > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={handleFinalizePayroll}
                  disabled={finalizingDrafts}
                  sx={{ mr: 1 }}
                >
                  {finalizingDrafts ? 'Finalizing...' : `Finalize (${selectedDrafts.length})`}
                </Button>
              )}
            </Box>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 1100 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Tooltip title="Select All">
                          <IconButton onClick={handleSelectAllDrafts}>
                            <CheckIcon color={selectedDrafts.length === filteredDrafts.length && filteredDrafts.length > 0 ? 'primary' : 'action'} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>Employee</TableCell>
                      <TableCell align="right">Basic Pay</TableCell>
                      <TableCell align="right">Gross Pay</TableCell>
                      <TableCell align="right">Deductions</TableCell>
                      <TableCell align="right">Net Pay</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDrafts.length > 0 ? (
                      filteredDrafts.map((draft) => {
                        const isSelected = selectedDrafts.includes(draft.payslip_draft_id);
                        const totalDeductions = parseFloat(draft.part1) + 
                                              parseFloat(draft.part2) + 
                                              parseFloat(draft.others);
                  
                        return (
                          <TableRow 
                            key={draft.payslip_draft_id}
                            sx={{ 
                              '&:last-child td, &:last-child th': { border: 0 },
                              backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                              cursor: 'pointer'
                            }}
                            hover
                            onClick={() => handleSelectDraft(draft.payslip_draft_id)}
                          >
                            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                              <IconButton 
                                onClick={() => handleSelectDraft(draft.payslip_draft_id)}
                                color={isSelected ? 'primary' : 'default'}
                              >
                                <CheckIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {draft.employee_name}
                            </TableCell>
                            <TableCell align="right">{formatCurrency(draft.basic_pay)}</TableCell>
                            <TableCell align="right">{formatCurrency(draft.gross_pay)}</TableCell>
                            <TableCell align="right">{formatCurrency(totalDeductions)}</TableCell>
                            <TableCell align="right">{formatCurrency(draft.netpay)}</TableCell>
                            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                              <Tooltip title="View Details">
                                <IconButton 
                                  color="primary" 
                                  onClick={() => viewPayslipDraft(draft)}
                                >
                                  <AssignmentIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Print Payslip">
                                <IconButton 
                                  color="secondary"
                                  onClick={() => handlePrint(draft)}
                                >
                                  <PrintIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                          {searchTerm ? (
                            <>No payslip drafts match your search criteria.</>
                          ) : (
                            <>
                              No payslip drafts found for the selected period. 
                              {selectedClient && selectedYear && selectedPeriod && (
                                <Button 
                                  color="primary" 
                                  sx={{ ml: 1 }}
                                  onClick={() => setShowPayrollDialog(true)}
                                >
                                  Generate Payroll
                                </Button>
                              )}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body2" color="text.secondary">
                  {filteredDrafts.length} 
                  {searchTerm && payslipDrafts.length !== filteredDrafts.length 
                    ? ` of ${payslipDrafts.length}` 
                    : ''} 
                  payslip drafts
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Box>
      
      {/* Generate Payroll Dialog */}
      <Dialog
        open={showPayrollDialog}
        onClose={() => !generatingPayroll && setShowPayrollDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Generate Payroll</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <Typography variant="body1" gutterBottom>
              Select an attendance group to generate payroll from:
            </Typography>
            
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Attendance Group</InputLabel>
              <Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                label="Attendance Group"
                disabled={loading || generatingPayroll}
              >
                {attendanceGroups.map((group) => (
                  <MenuItem key={group.attendance_group_id} value={group.attendance_group_id}>
                    {group.period} - {group.year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This will calculate payroll for all employees in the selected attendance group based on 
              their attendance records, rates, adjustments, loans, and other factors.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowPayrollDialog(false)}
            disabled={generatingPayroll}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleGeneratePayroll}
            disabled={generatingPayroll || !selectedGroup}
            startIcon={generatingPayroll ? <CircularProgress size={20} /> : null}
          >
            {generatingPayroll ? 'Generating...' : 'Generate Payroll'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PayrollPage; 