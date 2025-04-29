import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoanStatementsTable = ({ statements, onRefresh, loading }) => {
  const { token } = useAuth();
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);

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

  // Open confirmation dialog
  const handleMarkAsPaid = (statement) => {
    setSelectedStatement(statement);
    setConfirmDialogOpen(true);
  };

  // Mark statement as paid
  const handleConfirmPayment = async () => {
    if (!selectedStatement) return;
    
    setProcessingId(selectedStatement.statement_id);
    setError(null);
    
    try {
      await axios.patch(`/api/loan-statements/${selectedStatement.statement_id}/status`, {
        status: 1 // Mark as paid
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setConfirmDialogOpen(false);
      setSelectedStatement(null);
      
      // Refresh data
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to update statement status:', err);
      setError('Failed to mark statement as paid. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Show loader if loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={3}>
        <CircularProgress />
      </Box>
    );
  }

  // Show empty state if no statements
  if (!statements || statements.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No loan statements found for this loan.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Period</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Balance</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statements.map((statement) => (
              <TableRow 
                key={statement.statement_id} 
                hover
                sx={{
                  bgcolor: statement.status === 1 ? 'success.50' : undefined
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {statement.label || `Payment ${statement.num}`}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(statement.start_date)}</TableCell>
                <TableCell>{formatDate(statement.end_date)}</TableCell>
                <TableCell>{formatCurrency(statement.amount)}</TableCell>
                <TableCell>{formatCurrency(statement.balance)}</TableCell>
                <TableCell>
                  <Chip
                    label={statement.status === 1 ? 'Paid' : 'Unpaid'}
                    color={statement.status === 1 ? 'success' : 'default'}
                    size="small"
                    variant={statement.status === 1 ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell>
                  {statement.status === 0 && (
                    <Tooltip title="Mark as paid">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleMarkAsPaid(statement)}
                        disabled={!!processingId}
                        sx={{ ml: 1 }}
                      >
                        {processingId === statement.statement_id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <CheckIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Confirm Payment Dialog */}
      <Dialog 
        open={confirmDialogOpen} 
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Confirm Payment
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark this payment as paid?
            {selectedStatement && (
              <>
                <Box component="span" display="block" mt={1}>
                  <strong>Period:</strong> {selectedStatement.label}
                </Box>
                <Box component="span" display="block">
                  <strong>Amount:</strong> {formatCurrency(selectedStatement.amount)}
                </Box>
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmDialogOpen(false)} 
            disabled={!!processingId}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmPayment} 
            color="success" 
            variant="contained"
            disabled={!!processingId}
            startIcon={processingId ? <CircularProgress size={20} /> : <PaymentIcon />}
          >
            {processingId ? 'Processing...' : 'Mark as Paid'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanStatementsTable; 