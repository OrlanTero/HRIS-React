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
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import MainLayout from '../../components/layouts/MainLayout';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5000';

const Banks = () => {
  const { currentUser, token } = useAuth();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBank, setCurrentBank] = useState({
    name: '',
    branch: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch banks on component mount
  useEffect(() => {
    if (token) {
      fetchBanks();
    }
  }, [token]);

  // Configure axios with auth header
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch banks from API
  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/api/banks');
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
      showNotification('Failed to load banks', 'error');
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

  // Handle dialog open for create
  const handleOpenCreateDialog = () => {
    setCurrentBank({
      name: '',
      branch: ''
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleOpenEditDialog = (bank) => {
    setCurrentBank({
      bank_id: bank.bank_id,
      name: bank.name,
      branch: bank.branch
    });
    setIsEdit(true);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBank({
      ...currentBank,
      [name]: value
    });
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Update existing bank
        await authAxios.put(`/api/banks/${currentBank.bank_id}`, currentBank);
        showNotification('Bank updated successfully');
      } else {
        // Create new bank
        await authAxios.post('/api/banks', currentBank);
        showNotification('Bank created successfully');
      }
      // Refresh banks list
      fetchBanks();
      // Close dialog
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving bank:', error);
      showNotification('Failed to save bank', 'error');
    }
  };

  // Delete bank
  const handleDelete = async (bankId) => {
    if (window.confirm('Are you sure you want to delete this bank?')) {
      try {
        await authAxios.delete(`/api/banks/${bankId}`);
        showNotification('Bank deleted successfully');
        fetchBanks();
      } catch (error) {
        console.error('Error deleting bank:', error);
        if (error.response && error.response.status === 400) {
          showNotification(error.response.data.message || 'Cannot delete bank as it is in use', 'error');
        } else {
          showNotification('Failed to delete bank', 'error');
        }
      }
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            Banks Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchBanks}
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
              Add Bank
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {banks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No banks found
                    </TableCell>
                  </TableRow>
                ) : (
                  banks.map((bank, index) => (
                    <TableRow key={bank.bank_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{bank.name}</TableCell>
                      <TableCell>{bank.branch}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(bank)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(bank.bank_id)}
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

        {/* Add/Edit Bank Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{isEdit ? 'Edit Bank' : 'Add New Bank'}</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Bank Name"
                name="name"
                value={currentBank.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="branch"
                label="Branch"
                name="branch"
                value={currentBank.branch}
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!currentBank.name || !currentBank.branch}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

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

export default Banks; 