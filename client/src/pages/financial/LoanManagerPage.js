import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon,
  Payment as PaymentIcon,
  Assessment as AssessmentIcon,
  AccountBalance as LoanIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import LoansList from '../../components/loans/LoansList';
import LoanPaymentsList from '../../components/loans/LoanPaymentsList';
import LoanStatsCard from '../../components/loans/LoanStatsCard';
import NewLoanDialog from '../../components/loans/NewLoanDialog';
import NewLoanPaymentDialog from '../../components/loans/NewLoanPaymentDialog';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`loan-tabpanel-${index}`}
      aria-labelledby={`loan-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LoanManagerPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalLoans: 0,
    totalAmount: 0,
    totalBalance: 0,
    activeLoans: 0
  });
  const [newLoanDialogOpen, setNewLoanDialogOpen] = useState(false);
  const [newPaymentDialogOpen, setNewPaymentDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);


  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser, refreshKey]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch loans and payments in parallel
      const [loansResponse, paymentsResponse] = await Promise.all([
        api.get('/api/loans'),
        api.get('/api/loan-payments')
      ]);

      setLoans(loansResponse.data);
      setPayments(paymentsResponse.data);

      // Calculate stats
      const activeLoanCount = loansResponse.data.filter(loan => parseFloat(loan.balance) > 0).length;
      const totalAmount = loansResponse.data.reduce((sum, loan) => sum + parseFloat(loan.amount), 0);
      const totalBalance = loansResponse.data.reduce((sum, loan) => sum + parseFloat(loan.balance), 0);

      setStats({
        totalLoans: loansResponse.data.length,
        totalAmount,
        totalBalance,
        activeLoans: activeLoanCount
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan data:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNewLoanSuccess = () => {
    setNewLoanDialogOpen(false);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleNewPaymentSuccess = () => {
    setNewPaymentDialogOpen(false);
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Loan Manager
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              onClick={() => setNewPaymentDialogOpen(true)}
              sx={{ ml: 1 }}
            >
              New Payment
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setNewLoanDialogOpen(true)}
              sx={{ ml: 1 }}
            >
              New Loan
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <LoanStatsCard
              title="Total Loans"
              value={stats.totalLoans}
              icon={<LoanIcon color="primary" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <LoanStatsCard
              title="Active Loans"
              value={stats.activeLoans}
              icon={<AssessmentIcon color="success" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <LoanStatsCard
              title="Total Amount"
              value={`₱${stats.totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
              icon={<PaymentIcon color="info" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <LoanStatsCard
              title="Outstanding Balance"
              value={`₱${stats.totalBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
              icon={<PaymentIcon color="error" />}
            />
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Loans" icon={<LoanIcon />} iconPosition="start" />
            <Tab label="Payments" icon={<PaymentIcon />} iconPosition="start" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <LoansList
                loans={loans}
                onRefresh={() => setRefreshKey(prevKey => prevKey + 1)}
                onPayment={() => setNewPaymentDialogOpen(true)}
              />
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <LoanPaymentsList
                payments={payments}
                onRefresh={() => setRefreshKey(prevKey => prevKey + 1)}
              />
            )}
          </TabPanel>
        </Paper>
      </Box>
      
      {/* New Loan Dialog */}
      <NewLoanDialog
        open={newLoanDialogOpen}
        onClose={() => setNewLoanDialogOpen(false)}
        onSuccess={handleNewLoanSuccess}
      />
      
      {/* New Payment Dialog */}
      <NewLoanPaymentDialog
        open={newPaymentDialogOpen}
        onClose={() => setNewPaymentDialogOpen(false)}
        onSuccess={handleNewPaymentSuccess}
      />
    </Container>
  );
};

export default LoanManagerPage; 