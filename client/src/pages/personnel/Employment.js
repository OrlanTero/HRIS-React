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
  MenuItem,
  Grid,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import MainLayout from '../../components/layouts/MainLayout';

// Set the base URL for axios
if (!axios.defaults.baseURL) {
  axios.defaults.baseURL = 'http://localhost:5000';
}

// Employment status options
const EMPLOYMENT_STATUS = [
  'Contractual',
  'Probationary',
  'Regular',
  'Resigned'
];

// Employment types options
const EMPLOYMENT_TYPES = [
  'Field',
  'Staff'
];

// Department options
const DEPARTMENTS = [
  'Field',
  'Office'
];

// Position options
const EMPLOYMENT_POSITIONS = [
  'Administrator',
  'Cashier',
  'General Services',
  'Head Guard',
  'IT Consultant',
  'Payroll Officer',
  'Security Guard'
];

// Rest day options
const RESTDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'No Rest Day'
];

const Employment = () => {
  const { currentUser, token } = useAuth();
  const [employments, setEmployments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [currentEmployment, setCurrentEmployment] = useState({
    date_hired: '',
    date_end: '',
    employee_id: '',
    position: '',
    department: '',
    e_type: '',
    status: '',
    rest_day_1: '',
    rest_day_2: '',
    active: 'YES'
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

  // Fetch employments on component mount
  useEffect(() => {
    if (token) {
      fetchEmployments();
      fetchEmployees();
    }
  }, [token]);

  // Fetch employments from API
  const fetchEmployments = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get('/api/employments');
      setEmployments(response.data);
    } catch (error) {
      console.error('Error fetching employments:', error);
      showNotification('Failed to load employments', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    try {
      const response = await authAxios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      showNotification('Failed to load employees', 'error');
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
    setCurrentEmployment({
      date_hired: formatDateForInput(new Date()),
      date_end: '',
      employee_id: '',
      position: '',
      department: '',
      e_type: '',
      status: '',
      rest_day_1: '',
      rest_day_2: '',
      active: 'YES'
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleOpenEditDialog = (employment) => {
    setCurrentEmployment({
      employment_id: employment.employment_id,
      date_hired: formatDateForInput(new Date(employment.date_hired)),
      date_end: employment.date_end ? formatDateForInput(new Date(employment.date_end)) : '',
      employee_id: employment.employee_id,
      position: employment.position || '',
      department: employment.department || '',
      e_type: employment.e_type || '',
      status: employment.status || '',
      rest_day_1: employment.rest_day_1 || '',
      rest_day_2: employment.rest_day_2 || '',
      active: employment.active || 'YES'
    });
    setIsEdit(true);
    setOpenDialog(true);
  };

  // Handle dialog open for view
  const handleOpenViewDialog = (employment) => {
    setCurrentEmployment({
      employment_id: employment.employment_id,
      date_hired: employment.date_hired,
      date_end: employment.date_end,
      employee_id: employment.employee_id,
      employee_name: getEmployeeName(employment.employee_id),
      position: employment.position || '',
      department: employment.department || '',
      e_type: employment.e_type || '',
      status: employment.status || '',
      rest_day_1: employment.rest_day_1 || '',
      rest_day_2: employment.rest_day_2 || '',
      active: employment.active || 'YES'
    });
    setOpenViewDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle view dialog close
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployment({
      ...currentEmployment,
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

  // Format date for input field
  const formatDateForInput = (date) => {
    if (!date) return '';
    
    try {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    } catch (error) {
      return '';
    }
  };

  // Get employee name by ID
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.employee_id === employeeId);
    if (employee) {
      return `${employee.firstname} ${employee.lastname}`;
    }
    return 'Unknown Employee';
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // Update existing employment
        await authAxios.put(`/api/employments/${currentEmployment.employment_id}`, currentEmployment);
        showNotification('Employment record updated successfully');
      } else {
        // Create new employment
        await authAxios.post('/api/employments', currentEmployment);
        showNotification('Employment record created successfully');
      }
      // Refresh employments list
      fetchEmployments();
      // Close dialog
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving employment:', error);
      showNotification('Failed to save employment record', 'error');
    }
  };

  // Delete employment
  const handleDelete = async (employmentId) => {
    if (window.confirm('Are you sure you want to delete this employment record?')) {
      try {
        await authAxios.delete(`/api/employments/${employmentId}`);
        showNotification('Employment record deleted successfully');
        fetchEmployments();
      } catch (error) {
        console.error('Error deleting employment:', error);
        if (error.response && error.response.status === 400) {
          showNotification(error.response.data.message || 'Cannot delete employment record as it is in use', 'error');
        } else {
          showNotification('Failed to delete employment record', 'error');
        }
      }
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            Employment Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchEmployments}
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
              Add Employment
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
                  <TableCell>Employee</TableCell>
                  <TableCell>Date Hired</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No employment records found
                    </TableCell>
                  </TableRow>
                ) : (
                  employments.map((employment, index) => (
                    <TableRow key={employment.employment_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{getEmployeeName(employment.employee_id)}</TableCell>
                      <TableCell>{formatDate(employment.date_hired)}</TableCell>
                      <TableCell>{employment.position}</TableCell>
                      <TableCell>{employment.status}</TableCell>
                      <TableCell>{employment.e_type}</TableCell>
                      <TableCell>
                        <Chip 
                          label={employment.active} 
                          color={employment.active === 'YES' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                            color="info"
                            onClick={() => handleOpenViewDialog(employment)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(employment)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(employment.employment_id)}
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

        {/* Add/Edit Employment Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{isEdit ? 'Edit Employment Record' : 'Add New Employment Record'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="employee-label">Employee</InputLabel>
                  <Select
                    labelId="employee-label"
                    id="employee_id"
                    name="employee_id"
                    value={currentEmployment.employee_id}
                    onChange={handleInputChange}
                    label="Employee"
                    required
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.employee_id} value={employee.employee_id}>
                        {employee.firstname} {employee.lastname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="none"
                  required
                  fullWidth
                  id="date_hired"
                  label="Date Hired"
                  name="date_hired"
                  type="date"
                  value={currentEmployment.date_hired}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="none"
                  fullWidth
                  id="date_end"
                  label="End Date"
                  name="date_end"
                  type="date"
                  value={currentEmployment.date_end}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="Leave blank for ongoing employment"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="position-label">Position</InputLabel>
                  <Select
                    labelId="position-label"
                    id="position"
                    name="position"
                    value={currentEmployment.position}
                    onChange={handleInputChange}
                    label="Position"
                    required
                  >
                    {EMPLOYMENT_POSITIONS.map((position) => (
                      <MenuItem key={position} value={position}>
                        {position}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department"
                    name="department"
                    value={currentEmployment.department}
                    onChange={handleInputChange}
                    label="Department"
                    required
                  >
                    {DEPARTMENTS.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={currentEmployment.status}
                    onChange={handleInputChange}
                    label="Status"
                    required
                  >
                    {EMPLOYMENT_STATUS.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Employment Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="e_type"
                    name="e_type"
                    value={currentEmployment.e_type}
                    onChange={handleInputChange}
                    label="Employment Type"
                    required
                  >
                    {EMPLOYMENT_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="active-label">Active</InputLabel>
                  <Select
                    labelId="active-label"
                    id="active"
                    name="active"
                    value={currentEmployment.active}
                    onChange={handleInputChange}
                    label="Active"
                  >
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Rest Days
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="rest-day-1-label">Rest Day 1</InputLabel>
                  <Select
                    labelId="rest-day-1-label"
                    id="rest_day_1"
                    name="rest_day_1"
                    value={currentEmployment.rest_day_1}
                    onChange={handleInputChange}
                    label="Rest Day 1"
                  >
                    {RESTDAYS.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="rest-day-2-label">Rest Day 2</InputLabel>
                  <Select
                    labelId="rest-day-2-label"
                    id="rest_day_2"
                    name="rest_day_2"
                    value={currentEmployment.rest_day_2}
                    onChange={handleInputChange}
                    label="Rest Day 2"
                  >
                    <MenuItem value="">None</MenuItem>
                    {RESTDAYS.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!currentEmployment.employee_id || !currentEmployment.date_hired || !currentEmployment.position}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Employment Dialog */}
        {currentEmployment.employment_id && (
          <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
            <DialogTitle>Employment Record Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Employee
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.employee_name || getEmployeeName(currentEmployment.employee_id)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date Hired
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDate(currentEmployment.date_hired)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    End Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.date_end ? formatDate(currentEmployment.date_end) : 'Ongoing'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Position
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.position}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.department}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Employment Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.e_type}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active
                  </Typography>
                  <Chip 
                    label={currentEmployment.active} 
                    color={currentEmployment.active === 'YES' ? 'success' : 'default'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                    Rest Days
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rest Day 1
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.rest_day_1 || 'None'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rest Day 2
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentEmployment.rest_day_2 || 'None'}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
              <Button 
                color="primary" 
                onClick={() => {
                  handleCloseViewDialog();
                  handleOpenEditDialog(currentEmployment);
                }}
              >
                Edit
              </Button>
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

export default Employment; 