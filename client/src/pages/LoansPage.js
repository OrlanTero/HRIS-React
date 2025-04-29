import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import LoanPaymentForm from '../components/loans/LoanPaymentForm';
import LoanPaymentsList from '../components/loans/LoanPaymentsList';
import axios from 'axios';

const LoansPage = () => {
  const { token } = useAuth();
  const api = useApi();
  const [tabValue, setTabValue] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/loan-payments');
      setPayments(response.data);
    } catch (err) {
      console.error('Failed to fetch loan payments:', err);
      setError(err.response?.data?.message || 'Failed to load loan payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenForm = () => {
    setEditingPayment(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingPayment(null);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setOpenForm(true);
  };

  const handlePaymentSubmitted = () => {
    fetchPayments();
    handleCloseForm();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loans Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
        >
          New Loan Payment
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Loan Payments" />
          <Tab label="Loan Reports" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <>
          <LoanPaymentsList
            payments={payments}
            onEditPayment={handleEditPayment}
            loading={loading}
            onPaymentsChange={fetchPayments}
          />
        </>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Loan Reports
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            Loan reports functionality will be implemented soon.
          </Typography>
        </Paper>
      )}

      <LoanPaymentForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handlePaymentSubmitted}
        payment={editingPayment}
      />
    </Container>
  );
};

export default LoansPage; 