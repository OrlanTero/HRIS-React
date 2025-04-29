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
  FormControl,
  InputLabel,
  Select,
  MenuItem
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
if (!axios.defaults.baseURL) {
  axios.defaults.baseURL = 'http://localhost:5000';
}

const Holidays = () => {
  const { currentUser, token } = useAuth();
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentHoliday, setCurrentHoliday] = useState({
    holiday: '',
    holiday_date: '',
    national_local: 'National Holiday'
  });
  const [isEdit, setIsEdit] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Configure axios with auth header
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch holidays on component mount
  useEffect(() => {
    if (token) {
      fetchHolidays();
    }
  }, [token]);

  // Fetch holidays from API
  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/api/holidays');
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      showNotification('Failed to load holidays', 'error');
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
    setCurrentHoliday({
      holiday: '',
      holiday_date: '',
      national_local: 'National Holiday'
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleOpenEditDialog = (holiday) => {
    setCurrentHoliday({
      holiday_id: holiday.holiday_id,
      holiday: holiday.holiday,
      holiday_date: holiday.holiday_date,
      national_local: holiday.national_local || 'National Holiday'
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
    setCurrentHoliday({
      ...currentHoliday,
      [name]: value
    });
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

  // Submit form
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Update existing holiday
        await authAxios.put(`/api/holidays/${currentHoliday.holiday_id}`, currentHoliday);
        showNotification('Holiday updated successfully');
      } else {
        // Create new holiday
        await authAxios.post('/api/holidays', currentHoliday);
        showNotification('Holiday created successfully');
      }
      // Refresh holidays list
      fetchHolidays();
      // Close dialog
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving holiday:', error);
      showNotification('Failed to save holiday', 'error');
    }
  };

  // Delete holiday
  const handleDelete = async (holidayId) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        await authAxios.delete(`/api/holidays/${holidayId}`);
        showNotification('Holiday deleted successfully');
        fetchHolidays();
      } catch (error) {
        console.error('Error deleting holiday:', error);
        if (error.response && error.response.status === 400) {
          showNotification(error.response.data.message || 'Cannot delete holiday as it is in use', 'error');
        } else {
          showNotification('Failed to delete holiday', 'error');
        }
      }
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            Holidays Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchHolidays}
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
              Add Holiday
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
                  <TableCell>Date</TableCell>
                  <TableCell>Holiday</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holidays.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No holidays found
                    </TableCell>
                  </TableRow>
                ) : (
                  holidays.map((holiday, index) => (
                    <TableRow key={holiday.holiday_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatDate(holiday.holiday_date)}</TableCell>
                      <TableCell>{holiday.holiday}</TableCell>
                      <TableCell>{holiday.national_local || 'National Holiday'}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(holiday)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(holiday.holiday_id)}
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

        {/* Add/Edit Holiday Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{isEdit ? 'Edit Holiday' : 'Add New Holiday'}</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="holiday"
                label="Holiday Name"
                name="holiday"
                value={currentHoliday.holiday}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="holiday_date"
                label="Date"
                name="holiday_date"
                type="date"
                value={currentHoliday.holiday_date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="holiday-type-label">Holiday Type</InputLabel>
                <Select
                  labelId="holiday-type-label"
                  id="national_local"
                  name="national_local"
                  value={currentHoliday.national_local || 'National Holiday'}
                  onChange={handleInputChange}
                  label="Holiday Type"
                >
                  <MenuItem value="National Holiday">National Holiday</MenuItem>
                  <MenuItem value="Local Holiday">Local Holiday</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!currentHoliday.holiday || !currentHoliday.holiday_date}
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

export default Holidays; 