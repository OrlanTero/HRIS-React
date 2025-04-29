import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Breadcrumbs, Link as MuiLink, 
  Card, CardHeader, CardContent, Grid, 
  CircularProgress, Alert 
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BeneficiaryList from '../../components/mortuary/BeneficiaryList';

const MortuaryDetailPage = () => {
  const { id } = useParams();
  const [mortuary, setMortuary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [beneficiariesLoading, setBeneficiariesLoading] = useState(false);
  const [beneficiaryError, setBeneficiaryError] = useState(null);

  useEffect(() => {
    fetchMortuary();
  }, [id]);

  const fetchMortuary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/mortuaries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMortuary(response.data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching mortuary ${id}:`, err);
      setError('Failed to load mortuary details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBeneficiary = async (beneficiaryId) => {
    try {
      setBeneficiariesLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`/api/beneficiaries/${beneficiaryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the mortuary to get updated beneficiaries
      fetchMortuary();
      setBeneficiaryError(null);
    } catch (err) {
      console.error(`Error deleting beneficiary ${beneficiaryId}:`, err);
      setBeneficiaryError('Failed to delete beneficiary. Please try again later.');
    } finally {
      setBeneficiariesLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
          Dashboard
        </MuiLink>
        <MuiLink component={Link} to="/mortuaries" underline="hover" color="inherit">
          Mortuary Periods
        </MuiLink>
        <Typography color="text.primary">Mortuary Details</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Mortuary Period Details
      </Typography>
      
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader 
          title="Period Information" 
          sx={{ bgcolor: 'primary.main', color: 'white' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography variant="body1">
                <strong>Period:</strong> {mortuary.period}
              </Typography>
              <Typography variant="body1">
                <strong>Year:</strong> {mortuary.year}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="body1">
                <strong>Date Created:</strong> {new Date(mortuary.date_created).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Beneficiaries:</strong> {mortuary.beneficiaries ? mortuary.beneficiaries.length : 0}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <BeneficiaryList 
        beneficiaries={mortuary.beneficiaries || []}
        loading={beneficiariesLoading}
        error={beneficiaryError}
        onDelete={handleDeleteBeneficiary}
        mortuaryId={id}
      />
    </Box>
  );
};

export default MortuaryDetailPage; 