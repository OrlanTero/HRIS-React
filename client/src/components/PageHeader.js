import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="500" gutterBottom>
            {title}
          </Typography>
          
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {children}
      </Box>
      
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default PageHeader; 