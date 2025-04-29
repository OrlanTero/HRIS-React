import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoanViewDialog = ({ open, onClose, loan }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && loan) {
      fetchLoanDetails();
    }
  }, [open, loan]);

  const fetchLoanDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/loans/${loan.loan_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLoanDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan details:', error);
      setError('Failed to load loan details');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount || 0);
  };

  const getPaymentStatusChip = (status) => {
    return status === 1 ? (
      <Chip label="Paid" size="small" color="success" />
    ) : (
      <Chip label="Unpaid" size="small" color="error" />
    );
  };

  if (!loan) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Loan Details
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {loan.description || 'Loan'} - {formatCurrency(loan.amount)}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {loan.employee_name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Loan ID
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {loan.loan_id}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  <Chip 
                    label={loan.loan_type_name || 'Unknown'} 
                    size="small" 
                    color="primary" 
                  />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Amount
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatCurrency(loan.amount)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Current Balance
                </Typography>
                <Typography 
                  variant="body1" 
                  fontWeight="medium"
                  color={parseFloat(loan.balance) > 0 ? 'error.main' : 'success.main'}
                >
                  {formatCurrency(loan.balance)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Payment Type
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {loan.payment_type || 'CASH'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Target Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(loan.target_date)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Date Created
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(loan.date_created)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Loan Type
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {loan.advance === 1 ? 'Advanced Loan' : 'Regular Loan'}
                </Typography>
              </Grid>
              
              {loan.advance === 1 && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }}>
                      <Typography variant="subtitle2">
                        Advanced Loan Details
                      </Typography>
                    </Divider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Principal Amount
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formatCurrency(loan.principal)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Interest Rate
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {loan.interest_rate}%
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Interest Value
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formatCurrency(loan.interest_value)}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>

            {loanDetails && loanDetails.statements && loanDetails.statements.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Payment Schedule
                </Typography>
                
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loanDetails.statements.map((statement) => (
                        <TableRow key={statement.statement_id}>
                          <TableCell>{statement.num}</TableCell>
                          <TableCell>
                            {formatDate(statement.start_date)} to {formatDate(statement.end_date)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(statement.amount)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(statement.balance)}
                          </TableCell>
                          <TableCell align="center">
                            {getPaymentStatusChip(statement.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanViewDialog; 