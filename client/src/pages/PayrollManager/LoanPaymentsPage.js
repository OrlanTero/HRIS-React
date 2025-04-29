import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import LoanPaymentsList from '../../components/loans/LoanPaymentsList';
import LoanPaymentForm from '../../components/loans/LoanPaymentForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LoanPaymentsPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const [tabValue, setTabValue] = useState(0);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  // Get all loan payments
  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/loan-payments');
      setPayments(response.data);
    } catch (err) {
      console.error('Failed to fetch loan payments:', err);
      setError('Failed to load loan payments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Open form dialog
  const handleOpenForm = () => {
    setFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setFormOpen(false);
  };

  // Refresh data after form submission
  const handleFormSubmit = () => {
    fetchPayments();
    handleCloseForm();
  };

  // Initial data load
  useEffect(() => {
    fetchPayments();
  }, [currentUser]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" component="h1" fontWeight="500">
            Loan Payments
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            New Payment
          </Button>
        </Box>
        <Divider sx={{ mt: 2 }} />
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label="loan payments tabs"
          >
            <Tab label="All Payments" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : payments.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No loan payments found. Create a new payment to get started.
              </Typography>
            </Box>
          ) : (
            <LoanPaymentsList 
              payments={payments} 
              onRefresh={fetchPayments}
            />
          )}
        </TabPanel>
      </Paper>

      {/* Loan Payment Form Dialog */}
      <LoanPaymentForm 
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};

export default LoanPaymentsPage; 