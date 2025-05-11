import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Tooltip,
  Collapse,
  alpha,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ClipboardIcon,
  Business as ClientIcon,
  AttachMoney as MoneyIcon,
  PieChart as ChartPieIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  Fingerprint as FingerprintIcon,
  Tune as FadersIcon,
  Group as PolygonIcon,
  Extension as PuzzleIcon,
  AccountBalance as BuildingsIcon,
  DirectionsRun as PersonRunIcon,
  EventNote as CalendarIcon,
  Receipt as NoteIcon,
  Book as NotebookIcon,
  MenuBook as NotepadIcon,
  ToggleOff as ToggleLeftIcon,
  ToggleOn as ToggleRightIcon,
  AttachMoney as AttachMoneyIcon,
  Wallet as WalletIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Drawer width
const drawerWidth = 260;

// Navigation structure based on App.js routes
const navLinks = [
  { 
    text: "Dashboard", 
    path: "/dashboard", 
    icon: <DashboardIcon />
  },
  { 
    text: "Attendance", 
    path: "/attendance", 
    icon: <ClipboardIcon />
  },
  { 
    text: "Personnel", 
    path: "/personnel", 
    icon: <FingerprintIcon />,
    subContent: [
      { 
        text: "Employees", 
        path: "/personnel/employees", 
        icon: <PolygonIcon />
      },
      { 
        text: "Employment", 
        path: "/personnel/employment", 
        icon: <PersonIcon />
      },
      { 
        text: "Adjustments", 
        path: "/adjustments", 
        icon: <FadersIcon />
      },
      { 
        text: "Mortuary", 
        path: "/mortuaries", 
        icon: <AttachMoneyIcon />
      },
      { 
        text: "Banks", 
        path: "/personnel/banks", 
        icon: <BuildingsIcon />
      },
      { 
        text: "Holidays", 
        path: "/personnel/holidays", 
        icon: <CalendarIcon />
      }
    ]
  },
  { 
    text: "Client Manager", 
    path: "/client-manager", 
    icon: <ClientIcon />,
    subContent: [
      { 
        text: "Clients", 
        path: "/client-manager/clients", 
        icon: <PeopleIcon />
      },
      { 
        text: "Assign Employee", 
        path: "/client-manager/assign", 
        icon: <PersonRunIcon />
      }
    ]
  },
  { 
    text: "Financial", 
    path: "/financial", 
    icon: <MoneyIcon />,
    subContent: [
      { 
        text: "Payroll", 
        path: "/payroll", 
        icon: <MoneyIcon />
      },
      { 
        text: "Reports", 
        path: "/reports", 
        icon: <AssessmentIcon />
      },
      { 
        text: "Loan Manager", 
        path: "/financial/loan-manager", 
        icon: <AttachMoneyIcon />
      },
      { 
        text: "Loan Payments", 
        path: "/financial/loan-payments", 
        icon: <WalletIcon />
      },
      { 
        text: "Requisition", 
        path: "/requisitions", 
        icon: <NoteIcon />
      },
      { 
        text: "Disbursement", 
        path: "/disbursements", 
        icon: <NotebookIcon />
      },
      { 
        text: "Petty Cash", 
        path: "/petty-cash", 
        icon: <WalletIcon />,
        subContent: [
          {
            text: "Dashboard",
            path: "/petty-cash/dashboard",
            icon: <DashboardIcon />
          }
        ]
      }
    ]
  },
  { 
    text: "Administrator", 
    path: "/administrator", 
    icon: <SettingsIcon />,
    subContent: [
      { 
        text: "Data Management", 
        path: "/administrator/data-management", 
        icon: <ToggleLeftIcon />
      }
    ]
  }
];

const Sidebar = ({ open, onClose, variant }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Automatically open submenu for active path on load
  useEffect(() => {
    if (location.pathname) {
      navLinks.forEach(link => {
        if (link.subContent && (location.pathname.startsWith(link.path) || 
            link.subContent.some(sub => location.pathname.startsWith(sub.path)))) {
          setOpenSubmenus(prev => ({ ...prev, [link.path]: true }));
        }
      });
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleSubmenuToggle = (path) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if a path or any of its sub-items is active
  const isPathActive = (path) => {
    if (location.pathname === path) return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Sidebar content
  const drawerContent = (
    <>
      <Box
        sx={{
          py: 3,
          px: 2,
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white'
        }}
      >
       
        <Avatar
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 1.5, 
            bgcolor: alpha(theme.palette.common.white, 0.2),
            color: 'white',
            fontWeight: 'bold',
            border: '2px solid white'
          }}
        >
          {currentUser?.username?.charAt(0)?.toUpperCase() || 'A'}
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
          {currentUser?.username || 'Admin User'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Administrator
        </Typography>
      </Box>

      <Divider />
      
      <Box sx={{ py: 2, px: 1 }}>
        <List component="nav" sx={{ py: 0 }}>
          {navLinks.map((link) => (
            <React.Fragment key={link.text}>
              {link.subContent ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleSubmenuToggle(link.path)}
                      sx={{
                        px: 2,
                        py: 1.2,
                        borderRadius: '8px',
                        mx: 1,
                        mb: 0.5,
                        color: isPathActive(link.path) ? 'primary.main' : 'text.primary',
                        fontWeight: isPathActive(link.path) ? 600 : 400,
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                        },
                        ...(isPathActive(link.path) && {
                          bgcolor: 'primary.light',
                        }),
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          minWidth: 40,
                          color: isPathActive(link.path) ? 'primary.main' : 'inherit',
                        }}
                      >
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={link.text}
                        primaryTypographyProps={{ 
                          fontWeight: isPathActive(link.path) ? 600 : 500 
                        }} 
                      />
                      {openSubmenus[link.path] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={openSubmenus[link.path]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {link.subContent.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding>
                          <ListItemButton
                            sx={{
                              pl: 5,
                              pr: 2,
                              py: 1,
                              borderRadius: '8px',
                              mx: 1,
                              mb: 0.5,
                              color: location.pathname === subItem.path ? 'primary.main' : 'text.secondary',
                              fontWeight: location.pathname === subItem.path ? 600 : 400,
                              '&:hover': {
                                bgcolor: 'primary.light',
                                color: 'primary.main',
                              },
                              ...(location.pathname === subItem.path && {
                                bgcolor: 'primary.light',
                              }),
                            }}
                            onClick={() => handleNavigation(subItem.path)}
                          >
                            <ListItemIcon 
                              sx={{ 
                                minWidth: 36,
                                color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={subItem.text} 
                              primaryTypographyProps={{ 
                                fontSize: '0.9rem', 
                                fontWeight: location.pathname === subItem.path ? 600 : 400 
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(link.path)}
                    sx={{
                      px: 2,
                      py: 1.2,
                      borderRadius: '8px',
                      mx: 1,
                      mb: 0.5,
                      color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === link.path ? 600 : 400,
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                      },
                      ...(location.pathname === link.path && {
                        bgcolor: 'primary.light',
                      }),
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 40,
                        color: location.pathname === link.path ? 'primary.main' : 'inherit',
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={link.text} 
                      primaryTypographyProps={{ 
                        fontWeight: location.pathname === link.path ? 600 : 500 
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <List>
        <Tooltip title="Logout">
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout} 
              sx={{ 
                px: 2,
                py: 1.2,
                borderRadius: '8px',
                mx: 1,
                my: 1,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.light, 0.1),
                  color: 'error.main',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ExitToAppIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ color: 'error' }}
              />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.03)'
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar; 