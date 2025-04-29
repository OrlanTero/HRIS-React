import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  IconButton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

const PaymentList = ({ payments, loading, error, onDelete, onAddPayment, beneficiaryInfo }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    status: 'PAID'
  });

  const handleDeleteClick = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedPaymentId);
    setShowDeleteModal(false);
  };

  const handleAddPaymentClick = () => {
    setNewPayment({
      amount: '',
      status: 'PAID'
    });
    setShowAddModal(true);
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    onAddPayment(newPayment);
    setShowAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {beneficiaryInfo && (
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardHeader 
            title="Beneficiary Information"
            sx={{ bgcolor: 'info.main', color: 'white' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Typography variant="body1">
                  <strong>Name:</strong> {beneficiaryInfo.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {beneficiaryInfo.type}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="body1">
                  <strong>Employee:</strong> {beneficiaryInfo.employee_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Period:</strong> {beneficiaryInfo.period}, {beneficiaryInfo.year}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Card elevation={3}>
        <CardHeader
          title="Payments"
          action={
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddPaymentClick}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Payment
            </Button>
          }
          sx={{ 
            bgcolor: 'success.main', 
            color: 'white',
            '& .MuiCardHeader-action': { color: 'white' }
          }}
        />
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No payments recorded
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map(payment => (
                    <TableRow key={payment.payment_id}>
                      <TableCell>
                        ₱{parseFloat(payment.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={payment.status}
                          color={payment.status === 'PAID' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(payment.date_created).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteClick(payment.payment_id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this payment record? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <DialogTitle>Add New Payment</DialogTitle>
        <form onSubmit={handleAddPaymentSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={newPayment.amount}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={newPayment.status}
                onChange={handleInputChange}
                label="Status"
                required
              >
                <MenuItem value="PAID">PAID</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" color="success">
              Add Payment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PaymentList; 