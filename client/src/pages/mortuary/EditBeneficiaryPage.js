import React, { useState, useEffect } from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink, CircularProgress, Alert } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import BeneficiaryForm from '../../components/mortuary/BeneficiaryForm';
import axios from 'axios';

const EditBeneficiaryPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mortuaryId, setMortuaryId] = useState(null);

  useEffect(() => {
    const fetchBeneficiaryDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/beneficiaries/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMortuaryId(response.data.mortuary_id);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching beneficiary details: ${err}`);
        setError('Failed to load beneficiary details. Please try again later.');
        setLoading(false);
      }
    };

    fetchBeneficiaryDetails();
  }, [id]);

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
        <MuiLink component={Link} to={`/mortuaries/${mortuaryId}`} underline="hover" color="inherit">
          Mortuary Details
        </MuiLink>
        <Typography color="text.primary">Edit Beneficiary</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Edit Beneficiary
      </Typography>
      
      <BeneficiaryForm mortuaryId={mortuaryId} beneficiaryId={id} />
    </Box>
  );
};

export default EditBeneficiaryPage; 