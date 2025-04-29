import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Button,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Tab,
  Tabs,
  Divider,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import LoanStatementsTable from './LoanStatementsTable';

const LoansList = ({ loans, onRefresh, onPayment }) => {
  const { token } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [statements, setStatements] = useState([]);
  const [loadingStatements, setLoadingStatements] = useState(false);
  const [detailTabValue, setDetailTabValue] = useState(0);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open view dialog
  const handleViewLoan = async (loan) => {
    setSelectedLoan(loan);
    setViewDialogOpen(true);
    setDetailTabValue(0);
    
    // If this is an advanced loan, fetch statements
    if (loan.advance === 1) {
      await fetchLoanStatements(loan.loan_id);
    }
  };

  // Fetch loan statements
  const fetchLoanStatements = async (loanId) => {
    setLoadingStatements(true);
    try {
      const response = await axios.get(`/api/loan-statements/loan/${loanId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatements(response.data);
    } catch (err) {
      console.error('Failed to fetch loan statements:', err);
      setStatements([]);
    } finally {
      setLoadingStatements(false);
    }
  };

  // Handle tab change in loan details dialog
  const handleTabChange = (event, newValue) => {
    setDetailTabValue(newValue);
  };

  // Open delete dialog
  const handleDeleteClick = (loan) => {
    setSelectedLoan(loan);
    setDeleteDialogOpen(true);
  };

  // Delete loan
  const handleDeleteConfirm = async () => {
    if (!selectedLoan) return;
    
    setDeleting(true);
    setError(null);
    
    try {
      await axios.delete(`/api/loans/${selectedLoan.loan_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Notify parent component to refresh the list
      onRefresh();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Failed to delete loan:', err);
      setError(err.response?.data?.message || 'Failed to delete loan. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Handle payment for a loan
  const handlePaymentClick = (loan) => {
    setSelectedLoan(loan);
    if (onPayment) {
      onPayment(loan);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Filter loans based on search term
  const filteredLoans = loans.filter(loan => {
    const searchStr = searchTerm.toLowerCase();
    return (
      loan.employee_name?.toLowerCase().includes(searchStr) ||
      loan.description?.toLowerCase().includes(searchStr) ||
      loan.loan_type_name?.toLowerCase().includes(searchStr) ||
      String(loan.amount).includes(searchStr)
    );
  });

  // Get paginated loans
  const paginatedLoans = filteredLoans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle statement refresh
  const handleStatementRefresh = async () => {
    if (selectedLoan) {
      await fetchLoanStatements(selectedLoan.loan_id);
    }
  };

  // Display empty state
  if (!loans || loans.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No loans found. Create a new loan to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Search loans..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Advanced</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLoans.map((loan) => (
                <TableRow key={loan.loan_id} hover>
                  <TableCell>
                    {loan.employee_name || (
                      <Typography variant="body2" color="textSecondary">
                        ID: {loan.employee_id}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(loan.amount)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={parseFloat(loan.balance) > 0 ? 'error' : 'success.main'}
                      fontWeight="500"
                    >
                      {formatCurrency(loan.balance)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={loan.loan_type_name || 'Unknown'} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: 200, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}
                    >
                      {loan.description || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {loan.advance === 1 ? (
                      <Chip 
                        label="Yes" 
                        size="small" 
                        color="info" 
                        variant="filled"
                        icon={<AssignmentIcon />}
                      />
                    ) : (
                      <Chip 
                        label="No" 
                        size="small" 
                        color="default" 
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDate(loan.date_created)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View details">
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewLoan(loan)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {parseFloat(loan.balance) > 0 && (
                      <Tooltip title="Add payment">
                        <IconButton 
                          size="small" 
                          onClick={() => handlePaymentClick(loan)}
                          color="primary"
                        >
                          <PaymentIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete loan">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteClick(loan)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredLoans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Confirm Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Loan
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this loan
            {selectedLoan?.employee_name ? ` for ${selectedLoan.employee_name}` : ''}? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={deleting}
            startIcon={deleting && <CircularProgress size={20} />}
            autoFocus
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Loan Dialog */}
      {selectedLoan && (
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              Loan Details
              <IconButton onClick={() => setViewDialogOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={detailTabValue} onChange={handleTabChange} aria-label="loan details tabs">
                <Tab label="Basic Information" />
                {selectedLoan.advance === 1 && <Tab label="Payment Schedule" />}
              </Tabs>
            </Box>
            
            {detailTabValue === 0 ? (
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  {selectedLoan.employee_name}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Loan Type:
                      </Typography>
                      <Typography variant="body1">
                        {selectedLoan.loan_type_name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatCurrency(selectedLoan.amount)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Balance:
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium"
                        color={parseFloat(selectedLoan.balance) > 0 ? 'error.main' : 'success.main'}
                      >
                        {formatCurrency(selectedLoan.balance)}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Type:
                      </Typography>
                      <Typography variant="body1">
                        {selectedLoan.payment_type}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Date Created:
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(selectedLoan.date_created)}
                      </Typography>
                    </Box>
                    
                    {selectedLoan.target_date && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Target Date:
                        </Typography>
                        <Typography variant="body1">
                          {formatDate(selectedLoan.target_date)}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
                
                {selectedLoan.advance === 1 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Advanced Loan Details
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Principal:
                          </Typography>
                          <Typography variant="body1">
                            {formatCurrency(selectedLoan.principal || 0)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Interest Rate:
                          </Typography>
                          <Typography variant="body1">
                            {selectedLoan.interest_rate || 0}%
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Interest Amount:
                          </Typography>
                          <Typography variant="body1">
                            {formatCurrency(selectedLoan.interest_value || 0)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Payment Periods:
                          </Typography>
                          <Typography variant="body1">
                            {selectedLoan.payable_by || 0}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Description:
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="body2">
                      {selectedLoan.description || 'No description provided'}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ) : (
              <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button 
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={handleStatementRefresh}
                  >
                    Refresh
                  </Button>
                </Box>
                
                <LoanStatementsTable 
                  statements={statements}
                  loading={loadingStatements}
                  onRefresh={handleStatementRefresh}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
            {parseFloat(selectedLoan.balance) > 0 && (
              <Button 
                onClick={() => {
                  setViewDialogOpen(false);
                  handlePaymentClick(selectedLoan);
                }} 
                variant="contained" 
                color="primary"
                startIcon={<PaymentIcon />}
              >
                Add Payment
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default LoansList; 