import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import MortuaryForm from '../../components/mortuary/MortuaryForm';

const EditMortuaryPage = () => {
  const { id } = useParams();

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
          Dashboard
        </MuiLink>
        <MuiLink component={Link} to="/mortuaries" underline="hover" color="inherit">
          Mortuary Periods
        </MuiLink>
        <Typography color="text.primary">Edit Mortuary Period</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Edit Mortuary Period
      </Typography>
      
      <MortuaryForm mortuaryId={id} />
    </Box>
  );
};

export default EditMortuaryPage; 