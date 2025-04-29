import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Divider, Paper, useTheme, alpha, Chip } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const PageLayout = ({ 
  title, 
  breadcrumbs = [], 
  action = null, 
  children, 
  subtitle = null,
  stats = null,
  tabs = null,
  noPadding = false
}) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with breadcrumbs, title and action button */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3
        }}
      >
        <Box>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ mb: 1 }}
            >
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                
                return isLast ? (
                  <Typography key={item.text} color="text.primary" fontWeight={500}>
                    {item.text}
                  </Typography>
                ) : (
                  <Link 
                    key={item.text} 
                    component={RouterLink} 
                    to={item.link} 
                    color="inherit"
                    underline="hover"
                  >
                    {item.text}
                  </Link>
                );
              })}
            </Breadcrumbs>
          )}
          
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom={!!subtitle}>
            {title}
          </Typography>
          
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {action && (
          <Box mt={{ xs: 2, sm: 0 }}>
            {action}
          </Box>
        )}
      </Box>
      
      {/* Stats row above content */}
      {stats && (
        <Box mb={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              display: 'flex',
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: { xs: 'center', sm: 'space-around' },
              backgroundColor: alpha(theme.palette.primary.main, 0.02)
            }}
          >
            {stats.map((stat, index) => (
              <Box 
                key={index} 
                sx={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  px: 2
                }}
              >
                {stat.icon && (
                  <Box 
                    sx={{ 
                      color: stat.color || 'primary.main',
                      mb: 1,
                      display: 'flex',
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: alpha(stat.color || theme.palette.primary.main, 0.1)
                    }}
                  >
                    {stat.icon}
                  </Box>
                )}
                <Typography variant="h5" fontWeight="bold" color={stat.color || 'primary.main'}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      )}
      
      {/* Tabs navigation */}
      {tabs && (
        <Box mb={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            {tabs}
          </Paper>
        </Box>
      )}
      
      {/* Main content */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box 
          sx={{ 
            p: noPadding ? 0 : 3,
            flexGrow: 1
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default PageLayout; 