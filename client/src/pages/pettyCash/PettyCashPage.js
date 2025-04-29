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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import PettyCashForm from '../../components/pettyCash/PettyCashForm';

const PettyCashPage = () => {
  const { token } = useAuth();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    posted: '',
    fromDate: '',
    toDate: ''
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/api/pettyCash');

      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching petty cash transactions:', err);
      setError('Failed to load transactions. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTransactions();
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
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
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
    setCurrentTransactionId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentTransactionId(null);
  };

  // Handle delete dialog
  const handleOpenDeleteDialog = (id) => {
    setCurrentTransactionId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteDialogOpen(false);
    setCurrentTransactionId(null);
  };

  // Handle filter dialog
  const handleOpenFilterDialog = () => {
    setFilterOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterOpen(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      posted: '',
      fromDate: '',
      toDate: ''
    });
  };

  // Handle delete transaction
  const handleDeleteTransaction = async () => {
    try {
      await api.delete(`/api/pettyCash/${currentTransactionId}`);
      
      handleCloseDeleteDialog();
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction. Please try again.');
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

  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Search term filter
    const searchMatch = 
      transaction.requester_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.amount + '').includes(searchTerm);
    
    // Posted status filter
    const postedMatch = 
      filters.posted === '' || 
      (filters.posted === '1' && transaction.posted === 1) ||
      (filters.posted === '2' && transaction.posted === 2);
    
    // Date range filter
    let dateMatch = true;
    if (filters.fromDate && transaction.date) {
      dateMatch = dateMatch && new Date(transaction.date) >= new Date(filters.fromDate);
    }
    if (filters.toDate && transaction.date) {
      dateMatch = dateMatch && new Date(transaction.date) <= new Date(filters.toDate);
    }
    
    return searchMatch && postedMatch && dateMatch;
  });

  // Pagination
  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Loading state
  if (loading && refreshKey === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Petty Cash Transactions
        </Typography>
        <Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Transaction
          </Button>
        </Box>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 4, backgroundColor: '#FFF4F4' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleOpenFilterDialog}
          >
            Filters
            {(filters.posted || filters.fromDate || filters.toDate) && ' (Active)'}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Requested By</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map(transaction => (
                  <TableRow key={transaction.pettycash_id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.requester_name}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.remarks || 'N/A'}</TableCell>
                    <TableCell>{transaction.posted_status}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenDialog(transaction.pettycash_id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenDeleteDialog(transaction.pettycash_id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Transaction Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentTransactionId ? 'Edit Transaction' : 'New Transaction'}
        </DialogTitle>
        <DialogContent>
          <PettyCashForm
            pettyCashId={currentTransactionId}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onClose={handleCloseFilterDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Filter Transactions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Posted Status</InputLabel>
                <Select
                  name="posted"
                  value={filters.posted}
                  onChange={handleFilterChange}
                  label="Posted Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="1">Posted</MenuItem>
                  <MenuItem value="2">Not Posted</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="From Date"
                name="fromDate"
                type="date"
                value={filters.fromDate}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="To Date"
                name="toDate"
                type="date"
                value={filters.toDate}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              <Button 
                variant="contained" 
                onClick={handleCloseFilterDialog}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
            <Button onClick={handleCloseDeleteDialog} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleDeleteTransaction} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PettyCashPage; 