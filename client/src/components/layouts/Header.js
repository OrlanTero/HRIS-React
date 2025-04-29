import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Avatar,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Dashboard as DashboardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSidebarToggle }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/administrator/data-management');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
      elevation={0}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box 
          component="img" 
          src="/logo192.png" 
          alt="HRIS Logo" 
          sx={{ 
            height: 40,
            width: 40, 
            mr: 1,
            display: { xs: 'none', sm: 'block' }
          }}
        />
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: { xs: 0, md: 1 },
            display: { xs: 'none', sm: 'block' },
            fontWeight: 'bold',
            color: 'primary.main',
            mr: 4
          }}
        >
          HRIS System
        </Typography>

        

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton 
              size="large"
              aria-label="show new notifications"
              aria-controls="menu-notifications"
              aria-haspopup="true"
              onClick={handleNotificationMenu}
              color="inherit"
              sx={{
                backgroundColor: notificationAnchorEl ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-notifications"
            anchorEl={notificationAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
                mt: 1.5,
                width: 320,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
          >
            <MenuItem onClick={handleNotificationClose} sx={{ py: 1.5 }}>
              <Typography variant="subtitle2">Payroll processing complete</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationClose} sx={{ py: 1.5 }}>
              <Typography variant="subtitle2">New employee added</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationClose} sx={{ py: 1.5 }}>
              <Typography variant="subtitle2">System update available</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationClose} sx={{ py: 1, textAlign: 'center' }}>
              <Typography variant="subtitle2" color="primary">View all notifications</Typography>
            </MenuItem>
          </Menu>

          {/* User profile */}
          <Tooltip title="Account settings">
            <Button
              onClick={handleMenu}
              color="inherit"
              sx={{ 
                ml: 2,
                borderRadius: '24px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.875rem',
                  mr: 1
                }}
              >
                {currentUser?.username?.charAt(0)?.toUpperCase() || 'A'}
              </Avatar>
              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {currentUser?.username || 'Admin User'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                  Administrator
                </Typography>
              </Box>
            </Button>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  mx: 0.5,
                  my: 0.25
                },
              },
            }}
          >
            <MenuItem onClick={handleSettings}>
              <SettingsIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 