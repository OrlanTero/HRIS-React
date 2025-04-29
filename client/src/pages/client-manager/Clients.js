import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
  Grid,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  EventNote as EventNoteIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../../components/layouts/MainLayout';

// Set the base URL for axios if it's not already set

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`client-tabpanel-${index}`}
      aria-labelledby={`client-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Clients = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    name: '',
    branch: '',
    region: '',
    mobile: '',
    telephone: '',
    email: '',
    person: '',
    address: '',
    vat: '',
    swfee_1: '',
    swfee_2: '',
    swfee_3: '',
    agency_1: '',
    agency_2: '',
    agency_3: '',
    regular: '',
    overtime: '',
    month: '',
    regular_1: '',
    overtime_1: '',
    month_1: '',
    regular_2: '',
    overtime_2: '',
    nightdiff: '',
    sea: '',
    cola: '',
    leave_1: '',
    uniform: '',
    allowance: '',
    head_guard_allowance: '',
    ctpa: '',
    legal_holiday: '',
    special_holiday: '',
    restday: '',
    legal_holiday_ot: '',
    special_holiday_ot: '',
    restday_ot: '',
    w_pagibig: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [tabValue, setTabValue] = useState(0);
  const [viewClient, setViewClient] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [clientHolidays, setClientHolidays] = useState([]);
  const [availableHolidays, setAvailableHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState('');
  const [loadingHolidays, setLoadingHolidays] = useState(false);
  const [openHolidayDialog, setOpenHolidayDialog] = useState(false);

  // Fetch clients on component mount

  // Fetch clients on component mount
  useEffect(() => {
    if (currentUser) {
      fetchClients();
    }
  }, [currentUser]);

  // Fetch clients from API
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      showNotification('Failed to load clients', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle dialog open for create
  const handleOpenCreateDialog = () => {
    setCurrentClient({
      name: '',
      branch: '',
      region: '',
      mobile: '',
      telephone: '',
      email: '',
      person: '',
      address: '',
      vat: '',
      swfee_1: '',
      swfee_2: '',
      swfee_3: '',
      agency_1: '',
      agency_2: '',
      agency_3: '',
      regular: '',
      overtime: '',
      month: '',
      regular_1: '',
      overtime_1: '',
      month_1: '',
      regular_2: '',
      overtime_2: '',
      nightdiff: '',
      sea: '',
      cola: '',
      leave_1: '',
      uniform: '',
      allowance: '',
      head_guard_allowance: '',
      ctpa: '',
      legal_holiday: '',
      special_holiday: '',
      restday: '',
      legal_holiday_ot: '',
      special_holiday_ot: '',
      restday_ot: '',
      w_pagibig: ''
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleOpenEditDialog = (client) => {
    setCurrentClient({
      client_id: client.client_id,
      name: client.name || '',
      branch: client.branch || '',
      region: client.region || '',
      mobile: client.mobile || '',
      telephone: client.telephone || '',
      email: client.email || '',
      person: client.person || '',
      address: client.address || '',
      vat: client.vat || '',
      swfee_1: client.swfee_1 || '',
      swfee_2: client.swfee_2 || '',
      swfee_3: client.swfee_3 || '',
      agency_1: client.agency_1 || '',
      agency_2: client.agency_2 || '',
      agency_3: client.agency_3 || '',
      regular: client.regular || '',
      overtime: client.overtime || '',
      month: client.month || '',
      regular_1: client.regular_1 || '',
      overtime_1: client.overtime_1 || '',
      month_1: client.month_1 || '',
      regular_2: client.regular_2 || '',
      overtime_2: client.overtime_2 || '',
      nightdiff: client.nightdiff || '',
      sea: client.sea || '',
      cola: client.cola || '',
      leave_1: client.leave_1 || '',
      uniform: client.uniform || '',
      allowance: client.allowance || '',
      head_guard_allowance: client.head_guard_allowance || '',
      ctpa: client.ctpa || '',
      legal_holiday: client.legal_holiday || '',
      special_holiday: client.special_holiday || '',
      restday: client.restday || '',
      legal_holiday_ot: client.legal_holiday_ot || '',
      special_holiday_ot: client.special_holiday_ot || '',
      restday_ot: client.restday_ot || '',
      w_pagibig: client.w_pagibig || ''
    });
    setIsEdit(true);
    setOpenDialog(true);
  };

  // Handle dialog open for view
  const handleOpenViewDialog = (client) => {
    setViewClient(client);
    setOpenViewDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle view dialog close
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewClient(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({
      ...currentClient,
      [name]: value
    });
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Update existing client
        await api.put(`/api/clients/${currentClient.client_id}`, currentClient);
        showNotification('Client updated successfully');
      } else {
        // Create new client
        await api.post('/api/clients', currentClient);
        showNotification('Client created successfully');
      }
      // Refresh clients list
      fetchClients();
      // Close dialog
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving client:', error);
      showNotification('Failed to save client', 'error');
    }
  };

  // Delete client
  const handleDelete = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await api.delete(`/api/clients/${clientId}`);
        showNotification('Client deleted successfully');
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        if (error.response && error.response.status === 400) {
          showNotification(error.response.data.message || 'Cannot delete client as it is in use', 'error');
        } else {
          showNotification('Failed to delete client', 'error');
        }
      }
    }
  };

  // Handle dialog open for client holidays
  const handleOpenHolidayDialog = (client) => {
    setViewClient(client);
    setOpenHolidayDialog(true);
    fetchClientHolidays(client.client_id);
    fetchAvailableHolidays(client.client_id);
  };

  // Handle holiday dialog close
  const handleCloseHolidayDialog = () => {
    setOpenHolidayDialog(false);
    setViewClient(null);
    setClientHolidays([]);
    setAvailableHolidays([]);
    setSelectedHoliday('');
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Fetch client holidays
  const fetchClientHolidays = async (clientId) => {
    setLoadingHolidays(true);
    try {
      const response = await api.get(`/api/client-holidays/client/${clientId}`);
      setClientHolidays(response.data);
    } catch (error) {
      console.error('Error fetching client holidays:', error);
      showNotification('Failed to load client holidays', 'error');
    } finally {
      setLoadingHolidays(false);
    }
  };

  // Fetch available holidays
  const fetchAvailableHolidays = async (clientId) => {
    try {
      const response = await api.get(`/api/client-holidays/available/${clientId}`);
      setAvailableHolidays(response.data);
    } catch (error) {
      console.error('Error fetching available holidays:', error);
      showNotification('Failed to load available holidays', 'error');
    }
  };

  // Assign holiday to client
  const handleAssignHoliday = async () => {
    if (!selectedHoliday || !viewClient) return;
    
    try {
      await api.post('/api/client-holidays', {
        client_id: viewClient.client_id,
        holiday_id: selectedHoliday
      });
      
      showNotification('Holiday assigned successfully');
      fetchClientHolidays(viewClient.client_id);
      fetchAvailableHolidays(viewClient.client_id);
      setSelectedHoliday('');
    } catch (error) {
      console.error('Error assigning holiday:', error);
      showNotification('Failed to assign holiday', 'error');
    }
  };

  // Remove holiday from client
  const handleRemoveHoliday = async (clientHolidayId) => {
    if (window.confirm('Are you sure you want to remove this holiday?')) {
      try {
        await api.delete(`/api/client-holidays/${clientHolidayId}`);
        showNotification('Holiday removed successfully');
        if (viewClient) {
          fetchClientHolidays(viewClient.client_id);
          fetchAvailableHolidays(viewClient.client_id);
        }
      } catch (error) {
        console.error('Error removing holiday:', error);
        showNotification('Failed to remove holiday', 'error');
      }
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            Clients Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchClients}
              sx={{ mr: 1 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
            >
              Add Client
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No clients found
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client, index) => (
                    <TableRow key={client.client_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.branch}</TableCell>
                      <TableCell>{client.region}</TableCell>
                      <TableCell>{client.mobile || client.telephone}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                            color="info"
                            onClick={() => handleOpenViewDialog(client)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(client)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(client.client_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Manage Holidays">
                          <IconButton
                            color="secondary"
                            onClick={() => handleOpenHolidayDialog(client)}
                          >
                            <CalendarIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Client Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{isEdit ? 'Edit Client' : 'Add New Client'}</DialogTitle>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="client tabs">
                <Tab label="Basic Information" />
                <Tab label="Contact Information" />
                <Tab label="Fees & Rates" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Client Name"
                    name="name"
                    value={currentClient.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    value={currentClient.branch}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="region"
                    label="Region"
                    name="region"
                    value={currentClient.region}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="vat"
                    label="VAT Registration"
                    name="vat"
                    value={currentClient.vat}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="person"
                    label="Contact Person"
                    name="person"
                    value={currentClient.person}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={currentClient.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="mobile"
                    label="Mobile"
                    name="mobile"
                    value={currentClient.mobile}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="telephone"
                    label="Telephone"
                    name="telephone"
                    value={currentClient.telephone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={currentClient.address}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="w_pagibig"
                    label="W/ Pagibig"
                    name="w_pagibig"
                    value={currentClient.w_pagibig}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Salaries and Wages (Reports)</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="vat"
                    label="12% VAT"
                    name="vat"
                    value={currentClient.vat}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="swfee_1"
                    label="SW Fee 1"
                    name="swfee_1"
                    value={currentClient.swfee_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="swfee_2"
                    label="SW Fee 2"
                    name="swfee_2"
                    value={currentClient.swfee_2}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="swfee_3"
                    label="SW Fee 3"
                    name="swfee_3"
                    value={currentClient.swfee_3}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="agency_1"
                    label="Agency Fee 1"
                    name="agency_1"
                    value={currentClient.agency_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="agency_2"
                    label="Agency Fee 2"
                    name="agency_2"
                    value={currentClient.agency_2}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="agency_3"
                    label="Agency Fee 3"
                    name="agency_3"
                    value={currentClient.agency_3}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Salaries And Wages</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="regular"
                    label="Regular"
                    name="regular"
                    value={currentClient.regular}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="overtime"
                    label="Overtime"
                    name="overtime"
                    value={currentClient.overtime}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="month"
                    label="13 Month"
                    name="month"
                    value={currentClient.month}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Agency Fee</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="regular_1"
                    label="Regular"
                    name="regular_1"
                    value={currentClient.regular_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="overtime_1"
                    label="Overtime"
                    name="overtime_1"
                    value={currentClient.overtime_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="month_1"
                    label="13 Month"
                    name="month_1"
                    value={currentClient.month_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Rates</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="regular_2"
                    label="Regular"
                    name="regular_2"
                    value={currentClient.regular_2}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="overtime_2"
                    label="Overtime"
                    name="overtime_2"
                    value={currentClient.overtime_2}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="nightdiff"
                    label="Night Differential"
                    name="nightdiff"
                    value={currentClient.nightdiff}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="sea"
                    label="SEA"
                    name="sea"
                    value={currentClient.sea}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="cola"
                    label="COLA"
                    name="cola"
                    value={currentClient.cola}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="leave_1"
                    label="Leave"
                    name="leave_1"
                    value={currentClient.leave_1}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="uniform"
                    label="Uniform"
                    name="uniform"
                    value={currentClient.uniform}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="allowance"
                    label="Allowance"
                    name="allowance"
                    value={currentClient.allowance}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="head_guard_allowance"
                    label="Head Guard Allowance"
                    name="head_guard_allowance"
                    value={currentClient.head_guard_allowance}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="ctpa"
                    label="CTPA"
                    name="ctpa"
                    value={currentClient.ctpa}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="legal_holiday"
                    label="Legal Holiday"
                    name="legal_holiday"
                    value={currentClient.legal_holiday}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="special_holiday"
                    label="Special Holiday"
                    name="special_holiday"
                    value={currentClient.special_holiday}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="restday"
                    label="Rest Day"
                    name="restday"
                    value={currentClient.restday}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="legal_holiday_ot"
                    label="Legal Holiday OT"
                    name="legal_holiday_ot"
                    value={currentClient.legal_holiday_ot}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="special_holiday_ot"
                    label="Special Holiday OT"
                    name="special_holiday_ot"
                    value={currentClient.special_holiday_ot}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    id="restday_ot"
                    label="Rest Day OT"
                    name="restday_ot"
                    value={currentClient.restday_ot}
                    onChange={handleInputChange}
                    InputProps={{ inputProps: { step: 'any' } }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!currentClient.name}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Client Dialog */}
        {viewClient && (
          <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
            <DialogTitle>Client Details</DialogTitle>
            <DialogContent>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="client view tabs" sx={{ mb: 2 }}>
                <Tab label="Basic Information" />
                <Tab label="Fees & Rates" />
              </Tabs>
              
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Client Name
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Branch
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.branch || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Region
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.region || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Person
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.person || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.email || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mobile
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.mobile || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Telephone
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.telephone || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      VAT Registration
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.vat || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {viewClient.address || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>Salaries and Wages (Reports)</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">12% VAT</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.vat || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">SW Fee 1</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.swfee_1 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">SW Fee 2</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.swfee_2 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">SW Fee 3</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.swfee_3 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Agency Fee 1</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.agency_1 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Agency Fee 2</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.agency_2 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Agency Fee 3</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.agency_3 || 'N/A'}</Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 3 }}>Rates</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Regular</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.regular_2 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Overtime</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.overtime_2 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Night Differential</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.nightdiff || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">SEA</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.sea || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">COLA</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.cola || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Leave</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.leave_1 || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Uniform</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.uniform || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Allowance</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.allowance || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Head Guard Allowance</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.head_guard_allowance || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">CTPA</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.ctpa || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Legal Holiday</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.legal_holiday || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Special Holiday</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.special_holiday || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Rest Day</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.restday || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Legal Holiday OT</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.legal_holiday_ot || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Special Holiday OT</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.special_holiday_ot || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="text.secondary">Rest Day OT</Typography>
                    <Typography variant="body1" gutterBottom>{viewClient.restday_ot || 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </TabPanel>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
              <Button 
                color="primary" 
                onClick={() => {
                  handleCloseViewDialog();
                  handleOpenEditDialog(viewClient);
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Client Holiday Dialog */}
        {viewClient && (
          <Dialog open={openHolidayDialog} onClose={handleCloseHolidayDialog} maxWidth="md" fullWidth>
            <DialogTitle>
              Manage Client Holidays - {viewClient.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Assign Local Holiday to Client
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl fullWidth sx={{ flexGrow: 1 }}>
                    <InputLabel>Select Holiday</InputLabel>
                    <Select
                      value={selectedHoliday}
                      onChange={(e) => setSelectedHoliday(e.target.value)}
                      label="Select Holiday"
                      disabled={availableHolidays.length === 0}
                    >
                      {availableHolidays.map((holiday) => (
                        <MenuItem key={holiday.holiday_id} value={holiday.holiday_id}>
                          {holiday.holiday} ({formatDate(holiday.holiday_date)}) - {holiday.national_local}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAssignHoliday}
                    disabled={!selectedHoliday}
                  >
                    Assign
                  </Button>
                </Box>
                {availableHolidays.length === 0 && !loadingHolidays && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    No holidays available to assign. Add more holidays in the Holidays management page.
                  </Typography>
                )}
              </Box>

              <Typography variant="h6" gutterBottom>
                Client Holidays
              </Typography>
              
              {loadingHolidays ? (
                <Box display="flex" justifyContent="center" my={3}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Holiday</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clientHolidays.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No holidays assigned to this client
                          </TableCell>
                        </TableRow>
                      ) : (
                        clientHolidays.map((holiday, index) => (
                          <TableRow key={holiday.client_holiday_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{formatDate(holiday.holiday_date)}</TableCell>
                            <TableCell>{holiday.holiday}</TableCell>
                            <TableCell>{holiday.national_local || 'National Holiday'}</TableCell>
                            <TableCell>
                              <Tooltip title="Remove">
                                <IconButton
                                  color="error"
                                  onClick={() => handleRemoveHoliday(holiday.client_holiday_id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseHolidayDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
};

export default Clients; 