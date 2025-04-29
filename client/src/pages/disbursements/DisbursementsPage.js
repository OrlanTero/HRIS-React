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
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DisbursementForm from '../../components/disbursements/DisbursementForm';

const DisbursementsPage = () => {
  const { token } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [disbursements, setDisbursements] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDisbursementId, setCurrentDisbursementId] = useState(null);
  const [currentRequisitionId, setCurrentRequisitionId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    posted: '',
    payments: '',
    fromDate: '',
    toDate: ''
  });

  const fetchDisbursements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/disbursements', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDisbursements(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching disbursements:', err);
      setError('Failed to load disbursements. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDisbursements();
    }
  }, [token, refreshKey]);

  useEffect(() => {
    // Check URL for requisitionId parameter
    const params = new URLSearchParams(location.search);
    const requisitionId = params.get('requisitionId');
    
    if (requisitionId) {
      setCurrentRequisitionId(requisitionId);
      setDialogOpen(true);
    }
  }, [location]);

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

  // Get posted status chip
  const getPostedChip = (posted) => {
    let color = 'default';
    let icon = null;
    let label = 'Unknown';
    
    switch (parseInt(posted)) {
      case 1:
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        label = 'Posted';
        break;
      case 2:
        color = 'warning';
        icon = <PendingIcon fontSize="small" />;
        label = 'Unposted';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={label} 
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
    setCurrentDisbursementId(id);
    setCurrentRequisitionId(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentDisbursementId(null);
    setCurrentRequisitionId(null);
  };

  // Handle delete dialog
  const handleOpenDeleteDialog = (id) => {
    setCurrentDisbursementId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
    setCurrentDisbursementId(null);
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
      posted: '',
      payments: '',
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

  // Handle update status (post/unpost)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/disbursements/${id}/status`, { posted: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error updating disbursement status:', err);
      setError('Failed to update disbursement status. Please try again.');
    }
  };

  // Handle delete disbursement
  const handleDeleteDisbursement = async () => {
    try {
      await axios.delete(`/api/disbursements/${currentDisbursementId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      handleCloseDeleteDialog();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting disbursement:', err);
      setError('Failed to delete disbursement. Please try again.');
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

  // Filter disbursements
  const filteredDisbursements = disbursements.filter(disbursement => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (disbursement.voucher && disbursement.voucher.toLowerCase().includes(searchLower)) ||
      (disbursement.req_id && disbursement.req_id.toLowerCase().includes(searchLower)) ||
      (disbursement.paid_to && disbursement.paid_to.toLowerCase().includes(searchLower)) ||
      (disbursement.bank_name && disbursement.bank_name.toLowerCase().includes(searchLower)) ||
      (disbursement.payments && disbursement.payments.toLowerCase().includes(searchLower));
    
    // Other filters
    const matchesPosted = filters.posted === '' || disbursement.posted === parseInt(filters.posted);
    const matchesPayments = filters.payments === '' || disbursement.payments === filters.payments;
    
    // Date filters
    let matchesFromDate = true;
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      const disbursementDate = new Date(disbursement.date);
      matchesFromDate = disbursementDate >= fromDate;
    }
    
    let matchesToDate = true;
    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      const disbursementDate = new Date(disbursement.date);
      matchesToDate = disbursementDate <= toDate;
    }
    
    return matchesSearch && matchesPosted && matchesPayments && matchesFromDate && matchesToDate;
  });

  // Paginate disbursements
  const paginatedDisbursements = filteredDisbursements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Disbursements
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Disbursement
          </Button>
        </Box>

        {error && (
          <Paper
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: '#fdeded',
              color: '#5f2120',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography>{error}</Typography>
            <IconButton
              size="small"
              sx={{ ml: 'auto' }}
              onClick={() => setError(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        )}

        <Paper sx={{ mb: 2, p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search by voucher, requisition ID, payee..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                size="small"
              />
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={handleOpenFilterDialog}
                  size="small"
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  size="small"
                >
                  Refresh
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.posted && (
                  <Chip 
                    label={`Status: ${filters.posted === '1' ? 'Posted' : 'Unposted'}`} 
                    onDelete={() => setFilters({...filters, posted: ''})}
                    size="small"
                  />
                )}
                {filters.payments && (
                  <Chip 
                    label={`Payment: ${filters.payments}`} 
                    onDelete={() => setFilters({...filters, payments: ''})}
                    size="small"
                  />
                )}
                {filters.fromDate && (
                  <Chip 
                    label={`From: ${formatDateForDisplay(filters.fromDate)}`} 
                    onDelete={() => setFilters({...filters, fromDate: ''})}
                    size="small"
                  />
                )}
                {filters.toDate && (
                  <Chip 
                    label={`To: ${formatDateForDisplay(filters.toDate)}`} 
                    onDelete={() => setFilters({...filters, toDate: ''})}
                    size="small"
                  />
                )}
                {(filters.posted || filters.payments || filters.fromDate || filters.toDate) && (
                  <Button 
                    variant="text" 
                    size="small" 
                    onClick={handleClearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Voucher #</TableCell>
                    <TableCell>Requisition #</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Payee</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedDisbursements.length > 0 ? (
                    paginatedDisbursements.map((disbursement) => (
                      <TableRow key={disbursement.disbursement_id}>
                        <TableCell>{disbursement.voucher}</TableCell>
                        <TableCell>{disbursement.req_id}</TableCell>
                        <TableCell>{formatDate(disbursement.date)}</TableCell>
                        <TableCell>{disbursement.paid_to}</TableCell>
                        <TableCell>
                          {disbursement.payments}
                          {disbursement.payments === 'Check' && disbursement.cheque_number && (
                            <Typography variant="caption" display="block">
                              Check #: {disbursement.cheque_number}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{formatCurrency(disbursement.amount)}</TableCell>
                        <TableCell>{getPostedChip(disbursement.posted)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex' }}>
                            {parseInt(disbursement.posted) === 2 ? (
                              <Tooltip title="Post">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleUpdateStatus(disbursement.disbursement_id, 1)}
                                >
                                  <CheckIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Unpost">
                                <IconButton
                                  size="small"
                                  color="warning"
                                  onClick={() => handleUpdateStatus(disbursement.disbursement_id, 2)}
                                >
                                  <CancelIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDialog(disbursement.disbursement_id)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleOpenDeleteDialog(disbursement.disbursement_id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No disbursements found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredDisbursements.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Box>

      {/* Disbursement Form Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentDisbursementId ? 'Edit Disbursement' : 'New Disbursement'}
          <IconButton
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DisbursementForm
            disbursementId={currentDisbursementId}
            requisitionId={currentRequisitionId}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={handleCloseFilterDialog}>
        <DialogTitle>
          Filter Disbursements
          <IconButton
            onClick={handleCloseFilterDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="posted"
                  value={filters.posted}
                  label="Status"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="1">Posted</MenuItem>
                  <MenuItem value="2">Unposted</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="payments"
                  value={filters.payments}
                  label="Payment Method"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Check">Check</MenuItem>
                  <MenuItem value="Transfer">Bank Transfer</MenuItem>
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
                size="small"
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
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear All</Button>
          <Button onClick={handleCloseFilterDialog} variant="contained">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this disbursement? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteDisbursement} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DisbursementsPage; 