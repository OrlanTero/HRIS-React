import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import BeneficiaryForm from '../../components/mortuary/BeneficiaryForm';

const AddBeneficiaryPage = () => {
  const { mortuaryId } = useParams();

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
        <Typography color="text.primary">Add Beneficiary</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Add New Beneficiary
      </Typography>
      
      <BeneficiaryForm mortuaryId={mortuaryId} />
    </Box>
  );
};

export default AddBeneficiaryPage; 