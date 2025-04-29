import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
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
import { Link } from 'react-router-dom';
import MortuaryList from '../../components/mortuary/MortuaryList';
import MainLayout from '../../components/layouts/MainLayout';
import PageLayout from '../../components/layouts/PageLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';

const MortuaryListPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const theme = useTheme();
  const [mortuaries, setMortuaries] = useState([]);
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

  // Fetch mortuary data
  const fetchMortuaries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/mortuaries');
      setMortuaries(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching mortuaries:', err);
      setError('Failed to load mortuaries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchMortuaries();
    }
  }, [currentUser]);

  // Filter mortuaries based on search term
  const filteredMortuaries = mortuaries.filter(mortuary => {
    return mortuary.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
           mortuary.year.toString().includes(searchTerm);
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
  const paginatedMortuaries = filteredMortuaries.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

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

  // Handle delete
  const handleDelete = async (mortuaryId) => {
    try {
      await api.delete(`/api/mortuaries/${mortuaryId}`);
      fetchMortuaries();
      showNotification('Mortuary period deleted successfully');
    } catch (error) {
      console.error('Error deleting mortuary period:', error);
      showNotification('Failed to delete mortuary period', 'error');
    }
  };

  // Breadcrumbs for the page
  const breadcrumbs = [
    { text: 'Dashboard', link: '/dashboard' },
    { text: 'Mortuary', link: '/mortuary' },
    { text: 'Periods', link: '/mortuary/periods' }
  ];

  return (
    <MainLayout>
      <PageLayout
        title="Mortuary Periods"
        subtitle="View and manage all mortuary periods in the system"
        breadcrumbs={breadcrumbs}
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
              placeholder="Search mortuary periods..."
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
                onClick={fetchMortuaries}
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
          ) : (
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <MortuaryList 
                mortuaries={paginatedMortuaries} 
                onDelete={handleDelete}
                theme={theme}
              />
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredMortuaries.length}
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

export default MortuaryListPage;