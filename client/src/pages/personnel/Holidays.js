import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
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
  TablePagination,
  Card,
  alpha,
  useTheme,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  InputAdornment,
  Chip,
  DialogContentText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Event as EventIcon,
  FilterList as FilterListIcon,
  SortByAlpha as SortIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../../components/layouts/MainLayout';
import PageLayout from '../../components/layouts/PageLayout';

const Holidays = () => {
  const { currentUser } = useAuth();
  const api = useApi();
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
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  // Fetch holidays on component mount
  useEffect(() => {
    if (currentUser) {
      fetchHolidays();
    }
  }, [currentUser]);

  // Fetch holidays from API
  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/holidays');
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      showNotification('Failed to load holidays', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter holidays based on search term
  const filteredHolidays = holidays.filter(holiday => {
    return holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (holiday.national_local && holiday.national_local.toLowerCase().includes(searchTerm.toLowerCase()));
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
  const paginatedHolidays = filteredHolidays.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

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
        await api.put(`/api/holidays/${currentHoliday.holiday_id}`, currentHoliday);
        showNotification('Holiday updated successfully');
      } else {
        // Create new holiday
        await api.post('/api/holidays', currentHoliday);
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

  // Handle action menu
  const handleActionMenuOpen = (event, holiday) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedHoliday(holiday);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedHoliday(null);
  };
  
  // Delete holiday dialog
  const handleDeleteClick = (holiday) => {
    setHolidayToDelete(holiday);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };
  
  // Delete holiday confirm
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/holidays/${holidayToDelete.holiday_id}`);
      showNotification('Holiday deleted successfully');
      fetchHolidays();
      setDeleteDialogOpen(false);
      setHolidayToDelete(null);
    } catch (error) {
      console.error('Error deleting holiday:', error);
      if (error.response && error.response.status === 400) {
        showNotification(error.response.data.message || 'Cannot delete holiday as it is in use', 'error');
      } else {
        showNotification('Failed to delete holiday', 'error');
      }
    }
  };
  
  // Get holiday type color
  const getHolidayTypeColor = (type) => {
    if (!type) return { color: 'default', bgColor: alpha(theme.palette.grey[500], 0.1) };
    
    switch(type.toLowerCase()) {
      case 'national holiday':
        return { 
          color: theme.palette.primary.main, 
          bgColor: alpha(theme.palette.primary.main, 0.1) 
        };
      case 'local holiday':
        return { 
          color: theme.palette.secondary.main, 
          bgColor: alpha(theme.palette.secondary.main, 0.1) 
        };
      case 'special holiday':
        return { 
          color: theme.palette.info.main, 
          bgColor: alpha(theme.palette.info.main, 0.1) 
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
    { text: 'Holidays', link: '/personnel/holidays' }
  ];

  return (
    <MainLayout>
      <PageLayout
        title="Holiday Management"
        subtitle="View and manage all holidays in the system"
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
            Add Holiday
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
              placeholder="Search holidays..."
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
                onClick={fetchHolidays}
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
          ) : paginatedHolidays.length > 0 ? (
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
                      <TableCell sx={{ fontWeight: 600 }}>Holiday</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedHolidays.map((holiday) => {
                      const typeInfo = getHolidayTypeColor(holiday.national_local);
                      
                      return (
                        <TableRow 
                          key={holiday.holiday_id}
                          hover
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <Box display="flex" alignItems="center">
                              <EventIcon 
                                sx={{ 
                                  mr: 2, 
                                  color: typeInfo.color
                                }}
                              />
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {holiday.holiday}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {formatDate(holiday.holiday_date)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={holiday.national_local || 'Not Specified'} 
                              size="small"
                              sx={{ 
                                backgroundColor: typeInfo.bgColor,
                                color: typeInfo.color,
                                fontWeight: 500
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box display="flex" justifyContent="flex-end">
                              <Tooltip title="Edit Holiday">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleOpenEditDialog(holiday)}
                                  sx={{ color: theme.palette.primary.main }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="More Actions">
                                <IconButton 
                                  size="small"
                                  onClick={(e) => handleActionMenuOpen(e, holiday)}
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
                count={filteredHolidays.length}
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
              <EventIcon 
                sx={{ 
                  fontSize: 64, 
                  color: alpha(theme.palette.text.secondary, 0.3),
                  mb: 2
                }} 
              />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {searchTerm ? 'No holidays match your search' : 'No holidays found'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
                {searchTerm 
                  ? 'Try adjusting your search criteria or clear the search field to see all holidays.' 
                  : 'Get started by adding a holiday to the system. Click the button below to create your first holiday record.'}
              </Typography>
              
              {!searchTerm && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateDialog}
                  sx={{ borderRadius: 2 }}
                >
                  Add Holiday
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
            handleOpenEditDialog(selectedHoliday);
            handleActionMenuClose();
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Edit Holiday" />
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={() => handleDeleteClick(selectedHoliday)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Holiday" sx={{ color: 'error.main' }} />
          </MenuItem>
        </Menu>
        
        {/* Holiday Form Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
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
                {isEdit ? 'Edit Holiday' : 'Add New Holiday'}
              </Typography>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Holiday Name"
                name="holiday"
                value={currentHoliday.holiday}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Date"
                name="holiday_date"
                type="date"
                value={currentHoliday.holiday_date}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Holiday Type</InputLabel>
                <Select
                  name="national_local"
                  value={currentHoliday.national_local}
                  onChange={handleInputChange}
                  label="Holiday Type"
                >
                  <MenuItem value="National Holiday">National Holiday</MenuItem>
                  <MenuItem value="Local Holiday">Local Holiday</MenuItem>
                  <MenuItem value="Special Holiday">Special Holiday</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
              Are you sure you want to delete {holidayToDelete ? `"${holidayToDelete.holiday}"` : 'this holiday'}? 
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
      </PageLayout>
    </MainLayout>
  );
};

export default Holidays; 