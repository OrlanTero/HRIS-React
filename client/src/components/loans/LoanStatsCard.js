import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar
} from '@mui/material';

const LoanStatsCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: 'background.paper',
              color: 'primary.main',
              width: 48,
              height: 48,
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanStatsCard; 