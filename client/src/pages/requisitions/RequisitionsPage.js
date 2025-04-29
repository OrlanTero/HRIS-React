import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HourglassEmpty as PendingIcon,
  LocalAtm as PaymentIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RequisitionForm from '../../components/requisitions/RequisitionForm';

const RequisitionsPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [requisitions, setRequisitions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRequisitionId, setCurrentRequisitionId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    fromDate: '',
    toDate: ''
  });

  const fetchRequisitions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/requisitions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRequisitions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching requisitions:', err);
      setError('Failed to load requisitions. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequisitions();
    }
  }, [token, refreshKey]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return dateString;
    }
  };

  // Get status chip
  const getStatusChip = (status) => {
    let color = 'default';
    let icon = null;
    
    switch (status?.toLowerCase()) {
      case 'approved':
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'rejected':
        color = 'error';
        icon = <CancelIcon fontSize="small" />;
        break;
      case 'pending':
        color = 'warning';
        icon = <PendingIcon fontSize="small" />;
        break;
      case 'processing':
        color = 'info';
        icon = <RefreshIcon fontSize="small" />;
        break;
      case 'completed':
        color = 'primary';
        icon = <CheckIcon fontSize="small" />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status || 'Unknown'} 
        color={color} 
        size="small" 
        icon={icon}
      />
    );
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle dialog open/close
  const handleOpenDialog = (id = null) => {
    setCurrentRequisitionId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentRequisitionId(null);
  };

  // Handle delete dialog
  const handleOpenDeleteDialog = (id) => {
    setCurrentRequisitionId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
    setCurrentRequisitionId(null);
  };

  // Handle filter dialog
  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      status: '',
      type: '',
      fromDate: '',
      toDate: ''
    });
  };

  // Format date for display in the filter chip
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle delete requisition
  const handleDeleteRequisition = async () => {
    try {
      await axios.delete(`/api/requisitions/${currentRequisitionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      handleCloseDeleteDialog();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting requisition:', err);
      setError('Failed to delete requisition. Please try again.');
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Handle form success
  const handleFormSuccess = () => {
    handleCloseDialog();
    setRefreshKey(prev => prev + 1);
  };

  // Handle redirect to create disbursement
  const handleCreateDisbursement = (requisitionId) => {
    navigate(`/disbursements?requisitionId=${requisitionId}`);
  };

  // Filter requisitions based on search term and filters
  const filteredRequisitions = requisitions.filter(req => {
    // Search filter
    const searchFields = [
      req.req_id,
      req.remarks,
      req.requested_by,
      req.type,
      req.status
    ].filter(Boolean).map(field => field.toString().toLowerCase());
    
    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => field.includes(searchTerm.toLowerCase()));
      
    // Status filter
    const matchesStatus = filters.status === '' || req.status === filters.status;
    
    // Type filter
    const matchesType = filters.type === '' || req.type === filters.type;
    
    // Date filters
    let matchesDateRange = true;
    if (filters.fromDate && filters.toDate) {
      const reqDate = new Date(req.date);
      const fromDate = new Date(filters.fromDate);
      const toDate = new Date(filters.toDate);
      
      // Set time to beginning/end of day for accurate comparison
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      
      matchesDateRange = reqDate >= fromDate && reqDate <= toDate;
    } else if (filters.fromDate) {
      const reqDate = new Date(req.date);
      const fromDate = new Date(filters.fromDate);
      fromDate.setHours(0, 0, 0, 0);
      matchesDateRange = reqDate >= fromDate;
    } else if (filters.toDate) {
      const reqDate = new Date(req.date);
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      matchesDateRange = reqDate <= toDate;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  // Calculate pagination
  const paginatedRequisitions = filteredRequisitions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Requisitions
        </Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search requisitions..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={handleOpenFilterDialog}
                sx={{ mr: 1 }}
              >
                Filter
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{ mr: 1 }}
              >
                Refresh
              </Button>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                New Requisition
              </Button>
            </Grid>
            
            {Object.values(filters).some(filter => filter !== '') && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Active Filters:
                  </Typography>
                  
                  {filters.status && (
                    <Chip 
                      label={`Status: ${filters.status}`} 
                      onDelete={() => setFilters(prev => ({ ...prev, status: '' }))}
                      size="small"
                    />
                  )}
                  
                  {filters.type && (
                    <Chip 
                      label={`Type: ${filters.type}`} 
                      onDelete={() => setFilters(prev => ({ ...prev, type: '' }))}
                      size="small"
                    />
                  )}
                  
                  {filters.fromDate && (
                    <Chip 
                      label={`From: ${formatDateForDisplay(filters.fromDate)}`} 
                      onDelete={() => setFilters(prev => ({ ...prev, fromDate: '' }))}
                      size="small"
                    />
                  )}
                  
                  {filters.toDate && (
                    <Chip 
                      label={`To: ${formatDateForDisplay(filters.toDate)}`} 
                      onDelete={() => setFilters(prev => ({ ...prev, toDate: '' }))}
                      size="small"
                    />
                  )}
                  
                  <Chip 
                    label="Clear All" 
                    onClick={handleClearFilters}
                    size="small"
                    color="primary"
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
        
        {error && (
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Requisition ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Paid To</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : paginatedRequisitions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    No requisitions found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRequisitions.map((requisition) => (
                  <TableRow key={requisition.requisition_id}>
                    <TableCell>{requisition.req_id}</TableCell>
                    <TableCell>{formatDate(requisition.date)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={requisition.type || 'Unknown'} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{requisition.requested_by || 'N/A'}</TableCell>
                    <TableCell align="right">{formatCurrency(requisition.amount)}</TableCell>
                    <TableCell>{getStatusChip(requisition.status)}</TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Tooltip title={requisition.remarks || 'No remarks'}>
                        <span>{requisition.remarks || 'No remarks'}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex' }}>
                        {(requisition.status === 'pending' || requisition.status === 'approved') && (
                          <Tooltip title="Create Disbursement">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleCreateDisbursement(requisition.requisition_id)}
                            >
                              <PaymentIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(requisition.requisition_id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenDeleteDialog(requisition.requisition_id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredRequisitions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      
      {/* Create/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {currentRequisitionId ? 'Edit Requisition' : 'Create New Requisition'}
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <RequisitionForm 
            requisitionId={currentRequisitionId}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this requisition? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={handleDeleteRequisition} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog
        open={filterDialogOpen}
        onClose={handleCloseFilterDialog}
      >
        <DialogTitle>Filter Requisitions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  label="Status"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={filters.type}
                  label="Type"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="check">Check</MenuItem>
                  <MenuItem value="reimbursement">Reimbursement</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="From Date"
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="To Date"
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear All</Button>
          <Button onClick={handleCloseFilterDialog}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RequisitionsPage; 