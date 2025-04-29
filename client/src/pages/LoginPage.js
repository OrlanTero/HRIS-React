import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, useTheme, alpha, Paper, Grid } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  
  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        backgroundImage: `linear-gradient(to right bottom, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.1)})`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={0} sx={{ minHeight: '80vh' }}>
          <Grid 
            item 
            xs={12} 
            md={7} 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              backgroundColor: 'primary.main',
              borderRadius: '16px 0 0 16px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                p: 6,
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              <Box 
                component="img" 
                src="/logo192.png" 
                alt="HRIS Logo" 
                sx={{ 
                  width: 100,
                  height: 100,
                  mb: 3,
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                HRIS System
              </Typography>
              <Typography variant="h6" gutterBottom>
                Human Resource Information System
              </Typography>
              <Box sx={{ mt: 4, maxWidth: 500 }}>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  Streamline your HR operations with our comprehensive system.
                  Manage employees, attendance, payroll and more in one place.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
                backgroundImage: 'url(/images/hr-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1,
              }}
            />
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={5} 
            sx={{ 
              backgroundColor: 'background.paper',
              borderRadius: { xs: '16px', md: '0 16px 16px 0' },
              boxShadow: { xs: '0 8px 32px rgba(0, 0, 0, 0.12)', md: 'none' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: { xs: 3, sm: 6 },
            }}
          >
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage; 