import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Chip,
  Avatar,
  Typography,
  Tooltip,
  Card,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as ViewIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  SortByAlpha as SortIcon,
  Person as PersonIcon,
  BusinessCenter as PositionIcon,
  Apartment as DepartmentIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import EmployeeForm from '../components/employees/EmployeeForm';
import PageLayout from '../components/layouts/PageLayout';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [error, setError] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const api = useApi();
  const theme = useTheme();
  
  // Fetch employees from the API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/api/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  // Handle search
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
           (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (employee.department && employee.department.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  // Handle delete
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/employees/${employeeToDelete.employee_id}`);
      
      // Remove from state
      setEmployees(employees.filter(emp => emp.employee_id !== employeeToDelete.employee_id));
      
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee');
    }
  };
  
  // Handle employee creation
  const handleCreateEmployee = async (formData) => {
    try {
      setFormSubmitting(true);
      const response = await api.post('/api/employees', formData);
      
      // Add the new employee to the state
      setEmployees([...employees, response.data]);
      
      // Close the dialog
      setCreateDialogOpen(false);
    } catch (err) {
      console.error('Error creating employee:', err);
      setError('Failed to create employee');
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle action menu
  const handleActionMenuOpen = (event, employee) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedEmployee(employee);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedEmployee(null);
  };
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Pagination
  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );
  
  // Get status color
  const getStatusColor = (status) => {
    if (!status) return { color: 'default', label: 'Unknown' };
    
    switch(status.toLowerCase()) {
      case 'active':
        return { color: 'success', label: 'Active' };
      case 'inactive':
        return { color: 'error', label: 'Inactive' };
      case 'on leave':
        return { color: 'warning', label: 'On Leave' };
      default:
        return { color: 'default', label: status };
    }
  };
  
  // Calculate statistics for the page header
  const stats = employees.length > 0 ? [
    {
      icon: <PersonIcon fontSize="medium" />,
      value: employees.length,
      label: 'Total Employees',
      color: theme.palette.primary.main
    },
    {
      icon: <DepartmentIcon fontSize="medium" />,
      value: new Set(employees.filter(e => e.department).map(e => e.department)).size,
      label: 'Departments',
      color: theme.palette.secondary.main
    },
    {
      icon: <PositionIcon fontSize="medium" />,
      value: new Set(employees.filter(e => e.position).map(e => e.position)).size,
      label: 'Positions',
      color: theme.palette.info.main
    },
    {
      icon: <PersonIcon fontSize="medium" />,
      value: employees.filter(e => e.status && e.status.toLowerCase() === 'active').length,
      label: 'Active Employees',
      color: theme.palette.success.main
    }
  ] : null;
  
  // Breadcrumbs for the page
  const breadcrumbs = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Personnel', link: '/personnel' },
    { text: 'Employees', link: '/personnel/employees' }
  ];
  
  return (
    <PageLayout
      title="Employee Management"
      subtitle="View and manage all employees in the system"
      breadcrumbs={breadcrumbs}
      stats={stats}
      action={
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
          size="large"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          Add Employee
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
            placeholder="Search employees..."
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
          </Box>
        </Box>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress />
          </Box>
        ) : paginatedEmployees.length > 0 ? (
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
                    <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployees.map((employee) => {
                    const statusInfo = getStatusColor(employee.status);
                    const firstInitial = employee.firstname ? employee.firstname[0] : '';
                    const lastInitial = employee.lastname ? employee.lastname[0] : '';
                    
                    return (
                      <TableRow 
                        key={employee.employee_id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Box display="flex" alignItems="center">
                            <Avatar 
                              sx={{ 
                                mr: 2, 
                                bgcolor: parseInt(employee.employee_id) % 2 === 0 ? 'primary.main' : 'secondary.main',
                                width: 40,
                                height: 40,
                                fontSize: '1rem'
                              }}
                            >
                              {firstInitial}{lastInitial}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {`${employee.firstname} ${employee.lastname}`}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {employee.employee_id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            icon={<PositionIcon />} 
                            label={employee.position || 'Not Assigned'} 
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                              color: 'secondary.main',
                              fontWeight: 500,
                              '& .MuiChip-icon': {
                                color: 'secondary.main',
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'text.secondary'
                            }}
                          >
                            <DepartmentIcon fontSize="small" color="action" />
                            {employee.department || 'Not Assigned'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={statusInfo.label} 
                            color={statusInfo.color} 
                            size="small"
                            variant="filled"
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'text.secondary'
                            }}
                          >
                            <PhoneIcon fontSize="small" color="action" />
                            {employee.contact_number || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box display="flex" justifyContent="flex-end">
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small" 
                                onClick={() => navigate(`/employees/view/${employee.employee_id}`)}
                                sx={{ color: theme.palette.info.main }}
                              >
                                <ViewIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Employee">
                              <IconButton 
                                size="small" 
                                onClick={() => navigate(`/employees/edit/${employee.employee_id}`)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More Actions">
                              <IconButton 
                                size="small"
                                onClick={(e) => handleActionMenuOpen(e, employee)}
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
              count={filteredEmployees.length}
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
            <PersonIcon 
              sx={{ 
                fontSize: 64, 
                color: alpha(theme.palette.text.secondary, 0.3),
                mb: 2
              }} 
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              {searchTerm ? 'No employees match your search' : 'No employees found'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
              {searchTerm 
                ? 'Try adjusting your search criteria or clear the search field to see all employees.' 
                : 'Get started by adding an employee to the system. Click the button below to create your first employee record.'}
            </Typography>
            
            {!searchTerm && (
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
                sx={{ borderRadius: 2 }}
              >
                Add Employee
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
          navigate(`/employees/view/${selectedEmployee?.employee_id}`);
          handleActionMenuClose();
        }}>
          <ListItemIcon>
            <ViewIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </MenuItem>
        
        <MenuItem onClick={() => {
          navigate(`/employees/edit/${selectedEmployee?.employee_id}`);
          handleActionMenuClose();
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Edit Employee" />
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem onClick={() => {
          handleDeleteClick(selectedEmployee);
          handleActionMenuClose();
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete Employee" sx={{ color: 'error.main' }} />
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
            Are you sure you want to delete {employeeToDelete ? `${employeeToDelete.firstname} ${employeeToDelete.lastname}` : 'this employee'}? 
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
      
      {/* Create Employee Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => !formSubmitting && setCreateDialogOpen(false)}
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
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Add New Employee</Typography>
            {!formSubmitting && (
              <IconButton onClick={() => setCreateDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <EmployeeForm 
            onSubmit={handleCreateEmployee} 
            submitButtonText={formSubmitting ? "Saving..." : "Save Employee"}
          />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default EmployeeListPage; 