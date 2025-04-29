import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import PettyCashForm from '../../components/pettyCash/PettyCashForm';
import PettyCashReportForm from '../../components/pettyCash/PettyCashReportForm';

const PettyCashDashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [summary, setSummary] = useState({
    total_cash_in: 0,
    total_cash_out: 0,
    balance: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch summary
        const summaryResponse = await axios.get('/api/pettyCash/summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(summaryResponse.data);

        // Fetch transactions
        const transactionsResponse = await axios.get('/api/pettyCash', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTransactions(transactionsResponse.data);

        // Fetch reports
        const reportsResponse = await axios.get('/api/pettyCash/reports/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(reportsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching petty cash data:', err);
        setError('Failed to load petty cash data. Please try again.');
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
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

  // Handle refresh
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

  // Handle report dialog open/close
  const handleOpenReportDialog = () => {
    setReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
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

  // Handle delete transaction
  const handleDeleteTransaction = async () => {
    try {
      await axios.delete(`/api/pettyCash/${currentTransactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      handleCloseDeleteDialog();
      handleRefresh();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction. Please try again.');
    }
  };

  // Handle form success
  const handleFormSuccess = () => {
    handleCloseDialog();
    handleCloseReportDialog();
    handleRefresh();
  };

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
          Petty Cash Management
        </Typography>
        <Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MoneyIcon />}
            onClick={handleOpenReportDialog}
            sx={{ mr: 2 }}
          >
            Cash In/Out
          </Button>
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Cash In
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {formatCurrency(summary.total_cash_in)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Cash Out
              </Typography>
              <Typography variant="h4" component="div" color="error.main">
                {formatCurrency(summary.total_cash_out)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Current Balance
              </Typography>
              <Typography 
                variant="h4" 
                component="div" 
                color={summary.balance >= 0 ? "primary.main" : "error.main"}
              >
                {formatCurrency(summary.balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Transactions" />
          <Tab label="Cash In/Out Reports" />
        </Tabs>

        <Divider sx={{ mb: 2 }} />

        {tabValue === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
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
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.slice(0, 10).map(transaction => (
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
          </>
        )}

        {tabValue === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Cash In/Out Reports
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Voucher</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Cash In</TableCell>
                    <TableCell>Cash Out</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No reports found
                      </TableCell>
                    </TableRow>
                  ) : (
                    reports.slice(0, 10).map(report => (
                      <TableRow key={report.petty_cash_report_id}>
                        <TableCell>{formatDate(report.date_created)}</TableCell>
                        <TableCell>{report.voucher}</TableCell>
                        <TableCell>
                          {report.type === 1 ? 'Cash In' : 'Cash Out'}
                        </TableCell>
                        <TableCell>
                          {report.cash_in > 0 ? formatCurrency(report.cash_in) : '-'}
                        </TableCell>
                        <TableCell>
                          {report.cash_out > 0 ? formatCurrency(report.cash_out) : '-'}
                        </TableCell>
                        <TableCell>{report.remarks || 'N/A'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
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

      {/* Cash In/Out Report Dialog */}
      <Dialog open={reportDialogOpen} onClose={handleCloseReportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          New Cash In/Out Report
        </DialogTitle>
        <DialogContent>
          <PettyCashReportForm
            onSuccess={handleFormSuccess}
            onCancel={handleCloseReportDialog}
          />
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

export default PettyCashDashboard; 