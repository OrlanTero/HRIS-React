import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Breadcrumbs, Link as MuiLink,
  CircularProgress, Alert 
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentList from '../../components/mortuary/PaymentList';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [beneficiary, setBeneficiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch beneficiary details
      const beneficiaryResponse = await axios.get(`/api/beneficiaries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setBeneficiary(beneficiaryResponse.data);
      
      // Fetch payments for this beneficiary
      const paymentsResponse = await axios.get(`/api/mortuary-payments/beneficiary/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPayments(paymentsResponse.data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching data for beneficiary ${id}:`, err);
      setError('Failed to load payment data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`/api/mortuary-payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the payments list
      fetchData();
    } catch (err) {
      console.error(`Error deleting payment ${paymentId}:`, err);
      setError('Failed to delete payment. Please try again later.');
      setLoading(false);
    }
  };

  const handleAddPayment = async (paymentData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const data = {
        ...paymentData,
        beneficiary_id: id,
        employee_id: beneficiary.employee_id
      };
      
      await axios.post('/api/mortuary-payments', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the payments list
      fetchData();
    } catch (err) {
      console.error('Error adding payment:', err);
      setError('Failed to add payment. Please try again later.');
      setLoading(false);
    }
  };

  if (loading && !beneficiary) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  const beneficiaryInfo = beneficiary ? {
    name: beneficiary.name,
    type: beneficiary.type,
    employee_name: `${beneficiary.firstname} ${beneficiary.lastname}`,
    period: beneficiary.period,
    year: beneficiary.year
  } : null;

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
          Dashboard
        </MuiLink>
        <MuiLink component={Link} to="/mortuaries" underline="hover" color="inherit">
          Mortuary Periods
        </MuiLink>
        <MuiLink 
          component={Link} 
          to={`/mortuaries/${beneficiary?.mortuary_id}`} 
          underline="hover" 
          color="inherit"
        >
          Mortuary Details
        </MuiLink>
        <Typography color="text.primary">Payments</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Beneficiary Payments
      </Typography>
      
      <PaymentList 
        payments={payments}
        loading={loading}
        error={error}
        onDelete={handleDeletePayment}
        onAddPayment={handleAddPayment}
        beneficiaryInfo={beneficiaryInfo}
      />
    </Box>
  );
};

export default PaymentPage; 