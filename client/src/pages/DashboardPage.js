import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  useTheme,
  alpha,
  Stack,
  Chip
} from '@mui/material';
import { 
  People as PeopleIcon, 
  AccountBalance as BankIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Assignment as ClipboardIcon,
  AttachMoney as MoneyIcon,
  EventNote as CalendarIcon,
  Business as BusinessIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StatsCard = ({ icon, title, value, description, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'visible'
    }}>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -20, 
          left: 20, 
          zIndex: 9,
          width: 64,
          height: 64,
          borderRadius: 2,
          bgcolor: color || theme.palette.primary.main,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px ${alpha(color || theme.palette.primary.main, 0.4)}`
        }}
      >
        {icon}
      </Box>
      <CardContent sx={{ pt: 5, pb: 2, px: 3 }}>
        <Box sx={{ ml: 8, mb: 2 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {value}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const ActionCard = ({ icon, title, description, primaryAction, secondaryAction, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box 
            sx={{ 
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(color || theme.palette.primary.main, 0.1),
              color: color || theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ p: 2, pt: 1.5, pb: 1.5 }}>
        {primaryAction && (
          <Button 
            startIcon={<ArrowForwardIcon />}
            color="primary"
            onClick={primaryAction.onClick}
            sx={{ fontWeight: 500 }}
          >
            {primaryAction.label}
          </Button>
        )}
        
        {secondaryAction && (
          <Button 
            startIcon={<AddIcon />}
            color="secondary"
            onClick={secondaryAction.onClick}
            sx={{ fontWeight: 500, ml: 'auto' }}
          >
            {secondaryAction.label}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  
  return (
    <Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {currentUser?.username || 'Admin'}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Chip 
            label="Today" 
            color="primary" 
            variant="filled"
            sx={{ fontWeight: 500 }} 
          />
          <Chip 
            label="This Month" 
            color="default"
            variant="outlined"
            sx={{ fontWeight: 500 }} 
          />
          <Chip 
            label="This Year" 
            color="default"
            variant="outlined"
            sx={{ fontWeight: 500 }} 
          />
        </Stack>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard 
            icon={<PeopleIcon sx={{ fontSize: 32 }} />}
            title="Total Employees" 
            value="248" 
            color={theme.palette.primary.main}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard 
            icon={<ClipboardIcon sx={{ fontSize: 32 }} />}
            title="Attendance Rate" 
            value="96%" 
            color={theme.palette.success.main}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard 
            icon={<BusinessIcon sx={{ fontSize: 32 }} />}
            title="Active Clients" 
            value="12" 
            color={theme.palette.secondary.main}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <StatsCard 
            icon={<MoneyIcon sx={{ fontSize: 32 }} />}
            title="Pending Payroll" 
            value="3" 
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>
      
      <Box my={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<PeopleIcon fontSize="medium" />}
              title="Employee Management"
              description="Manage employee information, including personal details and bank accounts."
              primaryAction={{
                label: "View Employees",
                onClick: () => navigate('/personnel/employees')
              }}
              secondaryAction={{
                label: "Add Employee",
                onClick: () => navigate('/employees/create')
              }}
              color={theme.palette.primary.main}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<ClipboardIcon fontSize="medium" />}
              title="Attendance"
              description="Track employee attendance, manage shifts and generate reports."
              primaryAction={{
                label: "View Attendance",
                onClick: () => navigate('/attendance')
              }}
              secondaryAction={{
                label: "New Entry",
                onClick: () => navigate('/attendance/new')
              }}
              color={theme.palette.success.main}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<MoneyIcon fontSize="medium" />}
              title="Payroll"
              description="Process payroll, generate payslips and manage employee compensation."
              primaryAction={{
                label: "View Payroll",
                onClick: () => navigate('/payroll')
              }}
              color={theme.palette.warning.main}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<AssessmentIcon fontSize="medium" />}
              title="Loans & Advances"
              description="Manage employee loans, advances and repayment schedules."
              primaryAction={{
                label: "Loan Manager",
                onClick: () => navigate('/financial/loan-manager')
              }}
              color={theme.palette.info.main}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<BusinessIcon fontSize="medium" />}
              title="Client Management"
              description="Manage client information and assign employees to clients."
              primaryAction={{
                label: "View Clients",
                onClick: () => navigate('/client-manager/clients')
              }}
              secondaryAction={{
                label: "Assign Staff",
                onClick: () => navigate('/client-manager/assign')
              }}
              color={theme.palette.secondary.main}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <ActionCard
              icon={<CalendarIcon fontSize="medium" />}
              title="Holiday Management"
              description="Set up and manage company holidays and employee leave."
              primaryAction={{
                label: "View Holidays",
                onClick: () => navigate('/personnel/holidays')
              }}
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage; 