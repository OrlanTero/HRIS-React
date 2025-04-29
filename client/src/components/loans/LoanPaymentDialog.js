import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoanPaymentDialog = ({ open, onClose, loan, onSuccess }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [currentStatement, setCurrentStatement] = useState(null);
  const [pendingStatements, setPendingStatements] = useState([]);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  
  const [formData, setFormData] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_type: 'CASH',
    description: ''
  });

  useEffect(() => {
    if (open && loan) {
      if (loan.advance === 1) {
        fetchCurrentStatement();
      }
      setFormData(prev => ({
        ...prev,
        amount: loan.advance === 1 ? '' : loan.balance.toString()
      }));
    }
  }, [open, loan]);

  const fetchCurrentStatement = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/loan-statements/loan/${loan.loan_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const pending = response.data.filter(s => s.status === 0);
      setPendingStatements(pending);
      
      if (pending.length > 0) {
        setCurrentStatement(pending[0]);
        const total = pending.reduce((sum, stmt) => sum + parseFloat(stmt.amount), 0);
        setTotalPendingAmount(total);
        setFormData(prev => ({
          ...prev,
          amount: total.toString()
        }));
      } else {
        setError('No pending statements to pay');
      }
    } catch (err) {
      console.error('Error fetching current statement:', err);
      setError('Failed to load current statement');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axios.post(`/api/loans/${loan.loan_id}/pay`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(err.response?.data?.message || 'Failed to process payment');
    } finally {
      setSaving(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Process Loan Payment</Typography>
      </DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {loan.advance === 1 && pendingStatements.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Pending Statements
                    </Typography>
                    <Box sx={{ mt: 1, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Total Pending Amount:</strong> {formatCurrency(totalPendingAmount)}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Number of Pending Statements:</strong> {pendingStatements.length}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Next Statement Due:</strong> {formatDate(pendingStatements[0].start_date)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: <span>₱</span>
                  }}
                  helperText={loan.advance === 1 ? `Maximum payment: ${formatCurrency(totalPendingAmount)}` : ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Payment Date"
                  name="payment_date"
                  type="date"
                  value={formData.payment_date}
                  onChange={handleInputChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Type</InputLabel>
                  <Select
                    name="payment_type"
                    value={formData.payment_type}
                    onChange={handleInputChange}
                    label="Payment Type"
                    required
                  >
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
                    <MenuItem value="CHECK">Check</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={saving || loading || (loan.advance === 1 && pendingStatements.length === 0)}
        >
          {saving ? 'Processing...' : 'Process Payment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanPaymentDialog; 