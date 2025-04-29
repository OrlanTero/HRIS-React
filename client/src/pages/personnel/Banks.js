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
  useTheme,
  alpha,
  InputAdornment,
  Card,
  TablePagination,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
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
  FilterList as FilterListIcon,
  SortByAlpha as SortIcon,
  AccountBalance as BankIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import PageLayout from '../../components/layouts/PageLayout';
import MainLayout from '../../components/layouts/MainLayout';

const Banks = () => {
  const { currentUser } = useAuth();
  const api = useApi();
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
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);

  // Fetch banks on component mount
  useEffect(() => {
    if (currentUser) {
      fetchBanks();
    }
  }, [currentUser]);

  // Fetch banks from API
  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/banks');
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
      showNotification('Failed to load banks', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter banks based on search term
  const filteredBanks = banks.filter(bank => {
    return bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           bank.branch.toLowerCase().includes(searchTerm.toLowerCase());
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
  const paginatedBanks = filteredBanks.slice(
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
        await api.put(`/api/banks/${currentBank.bank_id}`, currentBank);
        showNotification('Bank updated successfully');
      } else {
        // Create new bank
        await api.post('/api/banks', currentBank);
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

  // Handle action menu
  const handleActionMenuOpen = (event, bank) => {
    setActionMenuAnchor(event.currentTarget);
    setSelectedBank(bank);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setSelectedBank(null);
  };

  // Delete bank dialog
  const handleDeleteClick = (bank) => {
    setBankToDelete(bank);
    setDeleteDialogOpen(true);
    handleActionMenuClose();
  };

  // Delete bank confirm
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/banks/${bankToDelete.bank_id}`);
      showNotification('Bank deleted successfully');
      fetchBanks();
      setDeleteDialogOpen(false);
      setBankToDelete(null);
    } catch (error) {
      console.error('Error deleting bank:', error);
      if (error.response && error.response.status === 400) {
        showNotification(error.response.data.message || 'Cannot delete bank as it is in use', 'error');
      } else {
        showNotification('Failed to delete bank', 'error');
      }
    }
  };

  // Breadcrumbs for the page
  const breadcrumbs = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Personnel', link: '/personnel' },
    { text: 'Banks', link: '/personnel/banks' }
  ];

  return (
    <MainLayout>
      <PageLayout
        title="Bank Management"
        subtitle="View and manage all banks in the system"
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
            Add Bank
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
              placeholder="Search banks..."
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
                onClick={fetchBanks}
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
          ) : paginatedBanks.length > 0 ? (
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
                      <TableCell sx={{ fontWeight: 600 }}>Bank</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Branch</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedBanks.map((bank) => (
                      <TableRow 
                        key={bank.bank_id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Box display="flex" alignItems="center">
                            <BankIcon 
                              sx={{ 
                                mr: 2, 
                                color: theme.palette.primary.main
                              }}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {bank.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {bank.branch}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box display="flex" justifyContent="flex-end">
                            <Tooltip title="Edit Bank">
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenEditDialog(bank)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More Actions">
                              <IconButton 
                                size="small"
                                onClick={(e) => handleActionMenuOpen(e, bank)}
                                color="inherit"
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredBanks.length}
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
              <BankIcon 
                sx={{ 
                  fontSize: 64, 
                  color: alpha(theme.palette.text.secondary, 0.3),
                  mb: 2
                }} 
              />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {searchTerm ? 'No banks match your search' : 'No banks found'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
                {searchTerm 
                  ? 'Try adjusting your search criteria or clear the search field to see all banks.' 
                  : 'Get started by adding a bank to the system. Click the button below to create your first bank record.'}
              </Typography>
              
              {!searchTerm && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateDialog}
                  sx={{ borderRadius: 2 }}
                >
                  Add Bank
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
            handleOpenEditDialog(selectedBank);
            handleActionMenuClose();
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Edit Bank" />
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={() => handleDeleteClick(selectedBank)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Delete Bank" sx={{ color: 'error.main' }} />
          </MenuItem>
        </Menu>
        
        {/* Bank Form Dialog */}
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
                {isEdit ? 'Edit Bank' : 'Add New Bank'}
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
                label="Bank Name"
                name="name"
                value={currentBank.name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Branch"
                name="branch"
                value={currentBank.branch}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
              />
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
              Are you sure you want to delete {bankToDelete ? bankToDelete.name : 'this bank'}? 
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

export default Banks; 