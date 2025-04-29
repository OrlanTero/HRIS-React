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
  Chip,
  TablePagination,
  Card,
  useTheme,
  alpha,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  InputAdornment,
  DialogContentText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  SortByAlpha as SortIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../../components/layouts/MainLayout';
import PageLayout from '../../components/layouts/PageLayout';

// Set the base URL for axios

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
  const { currentUser } = useAuth();
  const api = useApi();
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
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedEmployment, setSelectedEmployment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employmentToDelete, setEmploymentToDelete] = useState(null);

  // Fetch employments on component mount

  // Fetch employments on component mount
  useEffect(() => {
    if (currentUser) {
      fetchEmployments();
      fetchEmployees();
    }
  }, [currentUser]);

  // Fetch employments from API
  const fetchEmployments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/employments');
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
      const response = await api.get('/api/employees');
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
        await api.put(`/api/employments/${currentEmployment.employment_id}`, currentEmployment);
        showNotification('Employment record updated successfully');
      } else {
        // Create new employment
        await api.post('/api/employments', currentEmployment);
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

  // Filter employments based on search term
  const filteredEmployments = employments.filter(employment => {
    // Get employee name for searching
    const employeeName = getEmployeeName(employment.employee_id).toLowerCase();
    
    return employeeName.includes(searchTerm.toLowerCase()) ||
           (employment.position && employment.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (employment.department && employment.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (employment.status && employment.status.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination
  const paginatedEmployments = filteredEmployments.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
  
  // Handle action menu
  const handleActionMenuOpen = (event, employment) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedEmployment(employment);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedEmployment(null);
  };
  
  // Delete employment dialog
  const handleDeleteClick = (employment) => {
    setEmploymentToDelete(employment);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };
  
  // Delete employment confirm
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/employments/${employmentToDelete.employment_id}`);
      showNotification('Employment record deleted successfully');
      fetchEmployments();
      setDeleteDialogOpen(false);
      setEmploymentToDelete(null);
    } catch (error) {
      console.error('Error deleting employment:', error);
      showNotification('Failed to delete employment record', 'error');
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    if (!status) return { color: 'default', bgColor: alpha(theme.palette.grey[500], 0.1) };
    
    switch(status.toLowerCase()) {
      case 'regular':
        return { 
          color: theme.palette.success.main, 
          bgColor: alpha(theme.palette.success.main, 0.1) 
        };
      case 'probationary':
        return { 
          color: theme.palette.warning.main, 
          bgColor: alpha(theme.palette.warning.main, 0.1) 
        };
      case 'contractual':
        return { 
          color: theme.palette.info.main, 
          bgColor: alpha(theme.palette.info.main, 0.1) 
        };
      case 'resigned':
        return { 
          color: theme.palette.error.main, 
          bgColor: alpha(theme.palette.error.main, 0.1) 
        };
      default:
        return { 
          color: theme.palette.grey[700], 
          bgColor: alpha(theme.palette.grey[500], 0.1) 
        };
    }
  };
  
  // Breadcrumbs for the page
  const breadcrumbs = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Personnel', link: '/personnel' },
    { text: 'Employment Records', link: '/personnel/employment' }
  ];

  return (
    <MainLayout>
      <PageLayout
        title="Employment Records"
        subtitle="View and manage all employment records in the system"
        breadcrumbs={breadcrumbs}
        action={
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            size="large"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            Add Employment Record
          </Button>
        }
      >
        <Box mb={3}>
          <Box 
            display="flex" 
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            gap={2}
            mb={3}
          >
            <TextField
              placeholder="Search employment records..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: { xs: '100%', sm: '60%', md: '40%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.default',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box display="flex" gap={1}>
              <Button 
                startIcon={<FilterListIcon />} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Filter
              </Button>
              <Button 
                startIcon={<SortIcon />} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Sort By
              </Button>
              <Button 
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchEmployments}
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
          
          {notification.open && (
            <Snackbar
              open={notification.open}
              autoHideDuration={6000}
              onClose={handleCloseNotification}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
              </Alert>
            </Snackbar>
          )}
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={8}>
              <CircularProgress />
            </Box>
          ) : paginatedEmployments.length > 0 ? (
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Hire Date</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedEmployments.map((employment) => {
                      const statusInfo = getStatusColor(employment.status);
                      const employeeName = getEmployeeName(employment.employee_id);
                      
                      return (
                        <TableRow 
                          key={employment.employment_id}
                          hover
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <Box display="flex" alignItems="center">
                              <WorkIcon 
                                sx={{ 
                                  mr: 2, 
                                  color: theme.palette.primary.main
                                }}
                              />
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {employeeName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {employment.position || 'Not Assigned'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {employment.department || 'Not Assigned'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={employment.status || 'Not Specified'} 
                              size="small"
                              sx={{ 
                                backgroundColor: statusInfo.bgColor,
                                color: statusInfo.color,
                                fontWeight: 500
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {formatDate(employment.date_hired)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Box display="flex" justifyContent="flex-end">
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleOpenViewDialog(employment)}
                                  sx={{ color: theme.palette.info.main }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Record">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleOpenEditDialog(employment)}
                                  sx={{ color: theme.palette.primary.main }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Actions">
                                <IconButton 
                                  size="small"
                                  onClick={(e) => handleActionMenuOpen(e, employment)}
                                  color="inherit"
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredEmployments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ 
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    color: 'text.secondary'
                  }
                }}
              />
            </Card>
          ) : (
            <Box 
              my={8} 
              py={6}
              display="flex" 
              flexDirection="column" 
              alignItems="center"
              textAlign="center"
              bgcolor="background.paper"
              borderRadius={2}
              border={`1px dashed ${alpha(theme.palette.divider, 0.2)}`}
            >
              <WorkIcon 
                sx={{ 
                  fontSize: 64, 
                  color: alpha(theme.palette.text.secondary, 0.3),
                  mb: 2
                }} 
              />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {searchTerm ? 'No employment records match your search' : 'No employment records found'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
                {searchTerm 
                  ? 'Try adjusting your search criteria or clear the search field to see all records.' 
                  : 'Get started by adding an employment record to the system. Click the button below to create your first record.'}
              </Typography>
              
              {!searchTerm && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateDialog}
                  sx={{ borderRadius: 2 }}
                >
                  Add Employment Record
                </Button>
              )}
            </Box>
          )}
        </Box>
        
        {/* Action Menu */}
        <Menu
          id="action-menu"
          anchorEl={actionMenuAnchor}
          open={Boolean(actionMenuAnchor)}
          onClose={handleActionMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
              mt: 1.5,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
                borderRadius: 1,
                mx: 0.5,
                my: 0.25
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {
            handleOpenViewDialog(selectedEmployment);
            handleActionMenuClose();
          }}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="View Details" />
          </MenuItem>
          
          <MenuItem onClick={() => {
            handleOpenEditDialog(selectedEmployment);
            handleActionMenuClose();
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Edit Record" />
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={() => handleDeleteClick(selectedEmployment)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Record" sx={{ color: 'error.main' }} />
          </MenuItem>
        </Menu>
        
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Confirm Delete
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the employment record for {employmentToDelete ? getEmployeeName(employmentToDelete.employee_id) : 'this employee'}? 
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setDeleteDialogOpen(false)} 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error"
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* View Dialog */}
        <Dialog
          open={openViewDialog}
          onClose={handleCloseViewDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Employment Details
              </Typography>
              <IconButton onClick={handleCloseViewDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
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
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={handleCloseViewDialog} 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                handleCloseViewDialog();
                handleOpenEditDialog(currentEmployment);
              }} 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Edit/Create Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {isEdit ? 'Edit Employment Record' : 'Add New Employment Record'}
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
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
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={handleCloseDialog} 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </PageLayout>
    </MainLayout>
  );
};

export default Employment; 