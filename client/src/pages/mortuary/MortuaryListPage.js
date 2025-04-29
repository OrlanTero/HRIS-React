import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import MortuaryList from '../../components/mortuary/MortuaryList';

const MortuaryListPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/dashboard" underline="hover" color="inherit">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Mortuary Periods</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Mortuary Periods
      </Typography>
      
      <MortuaryList />
    </Box>
  );
};

export default MortuaryListPage;