import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  TextField,
  InputAdornment,
  Card,
  alpha,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  SortByAlpha as SortIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdjustmentsList from '../../components/adjustments/AdjustmentsList';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../../components/layouts/MainLayout';
import PageLayout from '../../components/layouts/PageLayout';

const AdjustmentsPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const theme = useTheme();
  const navigate = useNavigate();
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Fetch adjustments data
  const fetchAdjustments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/adjustments');
      setAdjustments(response.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching adjustments:', err);
      setError(err.message || 'Failed to fetch adjustments');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentUser) {
      fetchAdjustments();
    }
  }, [currentUser]);
  
  // Handle adjustment status update
  const handleStatusUpdate = async (id, statusData) => {
    try {
      await api.patch(`/api/adjustments/${id}/status`, statusData);
      fetchAdjustments(); // Refresh the list
      showNotification('Status updated successfully');
    } catch (err) {
      console.error('Error updating adjustment status:', err);
      showNotification('Failed to update adjustment status', 'error');
    }
  };
  
  // Handle adjustment deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/adjustments/${id}`);
      fetchAdjustments(); // Refresh the list
      showNotification('Adjustment deleted successfully');
    } catch (err) {
      console.error('Error deleting adjustment:', err);
      showNotification('Failed to delete adjustment', 'error');
    }
  };

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  // Filter adjustments based on search term
  const filteredAdjustments = adjustments.filter(adjustment => {
    return adjustment.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           adjustment.amount?.toString().includes(searchTerm) ||
           adjustment.date_created?.includes(searchTerm);
  });

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination
  const paginatedAdjustments = filteredAdjustments.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  // Breadcrumbs for the page
  const breadcrumbs = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Payroll', link: '/payroll' },
    { text: 'Adjustments', link: '/adjustments' }
  ];
  
  return (
    <MainLayout>
      <PageLayout
        title="Adjustments Management"
        subtitle="View and manage all payroll adjustments in the system"
        breadcrumbs={breadcrumbs}
        action={
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/adjustments/create')}
            size="large"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            Add Adjustment
          </Button>
        }
      >
        <Box mb={3}>
          <Box 
            display="flex" 
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            gap={2}
            mb={3}
          >
            <TextField
              placeholder="Search adjustments..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: { xs: '100%', sm: '60%', md: '40%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.default',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box display="flex" gap={1}>
              <Button 
                startIcon={<FilterListIcon />} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Filter
              </Button>
              <Button 
                startIcon={<SortIcon />} 
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Sort By
              </Button>
              <Button 
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchAdjustments}
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: 'background.default'
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
          
          {notification.open && (
            <Snackbar
              open={notification.open}
              autoHideDuration={6000}
              onClose={handleCloseNotification}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
              </Alert>
            </Snackbar>
          )}
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={8}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box 
              my={8} 
              py={6}
              display="flex" 
              flexDirection="column" 
              alignItems="center"
              textAlign="center"
              bgcolor="background.paper"
              borderRadius={2}
              border={`1px dashed ${alpha(theme.palette.divider, 0.2)}`}
            >
              <Typography variant="h6" color="error.main" sx={{ mb: 1 }}>
                {error}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<RefreshIcon />}
                onClick={fetchAdjustments}
                sx={{ borderRadius: 2, mt: 2 }}
              >
                Try Again
              </Button>
            </Box>
          ) : (
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <AdjustmentsList 
                adjustments={paginatedAdjustments}
                loading={false}
                error={null}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
                onRefresh={fetchAdjustments}
              />
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredAdjustments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ 
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    color: 'text.secondary'
                  }
                }}
              />
            </Card>
          )}
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

export default AdjustmentsPage; 