import React, { useState } from 'react';
import { Box, Toolbar, Container, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Header onSidebarToggle={handleDrawerToggle} />
      
      {/* Sidebar */}
      <Sidebar 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
      />
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 260px)` },
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar /> {/* This adds spacing below the fixed app bar */}
        
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 3,
            px: { xs: 2, sm: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
              p: { xs: 2, sm: 3 },
              overflow: 'auto'
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 