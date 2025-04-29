import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  BusinessCenter as BusinessIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import MainLayout from '../../components/layouts/MainLayout';

// Set the base URL for axios
if (!axios.defaults.baseURL) {
  axios.defaults.baseURL = 'http://localhost:5000';
}

// Format date helper functions
const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return 'Ongoing';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const AssignEmployees = () => {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [employments, setEmployments] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [formData, setFormData] = useState({
    client_id: '',
    employment_id: '',
    date_from: formatDateForInput(new Date()),
    date_to: ''
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Configure axios with auth header
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Load clients on component mount
  useEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token]);

  // Load deployments when a client is selected
  useEffect(() => {
    if (selectedClient) {
      fetchDeployments(selectedClient.client_id);
    }
  }, [selectedClient]);

  // Fetch clients from API
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/api/clients');
      setClients(response.data);
      if (response.data.length > 0 && !selectedClient) {
        setSelectedClient(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      showNotification('Failed to load clients', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch deployments for a client
  const fetchDeployments = async (clientId) => {
    setLoading(true);
    try {
      const response = await authAxios.get(`/api/deployments/client/${clientId}`);
      setDeployments(response.data);
    } catch (error) {
      console.error(`Error fetching deployments for client ${clientId}:`, error);
      showNotification('Failed to load deployments', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch available employments (not already deployed to selected client)
  const fetchAvailableEmployments = async () => {
    try {
      const response = await authAxios.get('/api/employments');
      setEmployments(response.data);
    } catch (error) {
      console.error('Error fetching employments:', error);
      showNotification('Failed to load employments', 'error');
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
    setNotification({ ...notification, open: false });
  };

  // Handle client selection
  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  // Handle open add deployment dialog
  const handleOpenAddDialog = () => {
    setFormData({
      client_id: selectedClient?.client_id || '',
      employment_id: '',
      date_from: formatDateForInput(new Date()),
      date_to: ''
    });
    setIsEditing(false);
    fetchAvailableEmployments();
    setDialogOpen(true);
  };

  // Handle open edit deployment dialog
  const handleOpenEditDialog = (deployment) => {
    fetchAvailableEmployments();
    
    setFormData({
      client_id: deployment.client_id,
      employment_id: deployment.employment_id,
      date_from: formatDateForInput(new Date(deployment.date_from)),
      date_to: deployment.date_to ? formatDateForInput(new Date(deployment.date_to)) : ''
    });
    
    setIsEditing(true);
    setEditId(deployment.deployed_employee_id);
    setDialogOpen(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await authAxios.put(`/api/deployments/${editId}`, formData);
        showNotification('Deployment updated successfully');
      } else {
        await authAxios.post('/api/deployments', formData);
        showNotification('Employee assigned successfully');
      }
      
      setDialogOpen(false);
      
      if (selectedClient) {
        fetchDeployments(selectedClient.client_id);
      }
    } catch (error) {
      console.error('Error saving deployment:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save deployment';
      showNotification(errorMessage, 'error');
    }
  };

  // Handle delete deployment
  const handleDeleteDeployment = async (deploymentId) => {
    if (window.confirm('Are you sure you want to remove this employee from the client?')) {
      try {
        await authAxios.delete(`/api/deployments/${deploymentId}`);
        showNotification('Deployment removed successfully');
        
        if (selectedClient) {
          fetchDeployments(selectedClient.client_id);
        }
      } catch (error) {
        console.error(`Error deleting deployment ${deploymentId}:`, error);
        showNotification('Failed to remove deployment', 'error');
      }
    }
  };

  // Filter clients by search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    (client.branch && client.branch.toLowerCase().includes(clientSearch.toLowerCase()))
  );

  // Get employee name from employment ID
  const getEmploymentDetails = (employmentId) => {
    const employment = employments.find(e => e.employment_id === employmentId);
    return employment || {};
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Assign Employees to Clients
        </Typography>
        
        <Grid container spacing={2}>
          {/* Client List */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Clients
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Search clients..."
                variant="outlined"
                margin="normal"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              
              <List sx={{ maxHeight: 500, overflow: 'auto', mt: 2 }}>
                {filteredClients.map((client) => (
                  <React.Fragment key={client.client_id}>
                    <ListItem 
                      button 
                      selected={selectedClient?.client_id === client.client_id}
                      onClick={() => handleSelectClient(client)}
                    >
                      <ListItemText 
                        primary={client.name} 
                        secondary={client.branch || 'No branch specified'}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                
                {filteredClients.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No clients found" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
          
          {/* Deployments List */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  {selectedClient ? `Employees Assigned to ${selectedClient.name}` : 'Select a client'}
                </Typography>
                
                <Box>
                  <Button 
                    variant="outlined" 
                    startIcon={<RefreshIcon />}
                    onClick={() => selectedClient && fetchDeployments(selectedClient.client_id)}
                    sx={{ mr: 1 }}
                    disabled={!selectedClient}
                  >
                    Refresh
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                    disabled={!selectedClient}
                  >
                    Assign Employee
                  </Button>
                </Box>
              </Box>
              
              {loading ? (
                <Box display="flex" justifyContent="center" my={5}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Date From</TableCell>
                        <TableCell>Date To</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!selectedClient ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">Please select a client</TableCell>
                        </TableRow>
                      ) : deployments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">No employees assigned to this client</TableCell>
                        </TableRow>
                      ) : (
                        deployments.map((deployment) => (
                          <TableRow key={deployment.deployed_employee_id}>
                            <TableCell>{`${deployment.firstname} ${deployment.lastname}`}</TableCell>
                            <TableCell>{deployment.position}</TableCell>
                            <TableCell>{formatDateForDisplay(deployment.date_from)}</TableCell>
                            <TableCell>
                              {deployment.date_to 
                                ? formatDateForDisplay(deployment.date_to)
                                : 'Ongoing'}
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={deployment.date_to && new Date(deployment.date_to) < new Date() ? 'Ended' : 'Active'} 
                                color={deployment.date_to && new Date(deployment.date_to) < new Date() ? 'default' : 'success'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton 
                                color="primary" 
                                size="small" 
                                onClick={() => handleOpenEditDialog(deployment)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                size="small" 
                                onClick={() => handleDeleteDeployment(deployment.deployed_employee_id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
        
        {/* Add/Edit Deployment Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {isEditing ? 'Update Employee Assignment' : 'Assign Employee to Client'}
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="employment-label">Employee</InputLabel>
                  <Select
                    labelId="employment-label"
                    id="employment_id"
                    name="employment_id"
                    value={formData.employment_id}
                    onChange={handleInputChange}
                    label="Employee"
                    disabled={isEditing}
                    required
                  >
                    {employments.map((employment) => (
                      <MenuItem key={employment.employment_id} value={employment.employment_id}>
                        {`${employment.firstname || ''} ${employment.lastname || ''} - ${employment.position || 'No position'}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  name="date_from"
                  value={formData.date_from}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date (optional)"
                  type="date"
                  name="date_to"
                  value={formData.date_to}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              color="primary"
              disabled={!formData.employment_id || !formData.date_from}
            >
              {isEditing ? 'Update' : 'Assign'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Notifications */}
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

export default AssignEmployees; 