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
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
  Print as PrintIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '../../utils/formatters';

const PayrollPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(response.data);
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
      const response = await axios.get(`/api/attendance-groups/client/${selectedClient}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendanceGroups(response.data);
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
        const response = await axios.get(`/api/attendance-groups/years`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
        const groupsResponse = await axios.get(`/api/attendance-groups`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
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
        const response = await axios.get(`/api/attendance-groups/periods/${selectedYear}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPeriods(response.data);
        
        // Select the first period by default
        if (response.data.length > 0) {
          setSelectedPeriod(response.data[0]);
        }
      } catch (periodsError) {
        console.error('Primary periods endpoint failed, trying fallback:', periodsError);
        
        // Fallback to getting periods from existing attendance groups
        const groupsResponse = await axios.get(`/api/attendance-groups`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
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
      const response = await axios.get(
        `/api/payroll/drafts/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPayslipDrafts(response.data);
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
    try {
      const response = await axios.post(
        `/api/payroll/generate/${selectedGroup}`, 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setGeneratingPayroll(false);
      setShowPayrollDialog(false);
      
      // Refresh the payslip drafts list
      fetchPayslipDrafts();
      
    } catch (error) {
      console.error('Error generating payroll:', error);
      setError('Failed to generate payroll. Please try again.');
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
    if (selectedDrafts.length === payslipDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(payslipDrafts.map(draft => draft.payslip_draft_id));
    }
  };
  
  const handleFinalizePayroll = async () => {
    if (selectedDrafts.length === 0) {
      setError('Please select at least one payslip draft to finalize.');
      return;
    }
    
    setFinalizingDrafts(true);
    try {
      await axios.post(
        '/api/payroll/finalize',
        { drafts: selectedDrafts },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setFinalizingDrafts(false);
      
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
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Payroll Management
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
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
            >
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">
            Payslip Drafts
          </Typography>
          
          <Box>
            {selectedDrafts.length > 0 && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                onClick={handleFinalizePayroll}
                disabled={finalizingDrafts}
                sx={{ mr: 1 }}
              >
                {finalizingDrafts ? 'Finalizing...' : 'Finalize Selected'}
              </Button>
            )}
          </Box>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1100 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Tooltip title="Select All">
                      <IconButton onClick={handleSelectAllDrafts}>
                        <CheckIcon color={selectedDrafts.length === payslipDrafts.length ? 'primary' : 'action'} />
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
                {payslipDrafts.length > 0 ? (
                  payslipDrafts.map((draft) => (
                    <TableRow 
                      key={draft.payslip_draft_id}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: selectedDrafts.includes(draft.payslip_draft_id) ? 'rgba(25, 118, 210, 0.08)' : 'inherit'
                      }}
                      hover
                    >
                      <TableCell padding="checkbox">
                        <IconButton 
                          onClick={() => handleSelectDraft(draft.payslip_draft_id)}
                          color={selectedDrafts.includes(draft.payslip_draft_id) ? 'primary' : 'default'}
                        >
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {draft.employee_name}
                      </TableCell>
                      <TableCell align="right">{formatCurrency(draft.basic_pay)}</TableCell>
                      <TableCell align="right">{formatCurrency(draft.gross_pay)}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          parseFloat(draft.part1) + 
                          parseFloat(draft.part2) + 
                          parseFloat(draft.others)
                        )}
                      </TableCell>
                      <TableCell align="right">{formatCurrency(draft.netpay)}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="primary" 
                          onClick={() => viewPayslipDraft(draft)}
                        >
                          <AssignmentIcon />
                        </IconButton>
                        <IconButton color="secondary">
                          <PrintIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No payslip drafts found for the selected criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      
      {/* Generate Payroll Dialog */}
      <Dialog
        open={showPayrollDialog}
        onClose={() => setShowPayrollDialog(false)}
        maxWidth="md"
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
                disabled={loading}
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
          <Button onClick={() => setShowPayrollDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleGeneratePayroll}
            disabled={generatingPayroll || !selectedGroup}
          >
            {generatingPayroll ? 'Generating...' : 'Generate Payroll'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PayrollPage; 