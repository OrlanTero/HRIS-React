import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Typography, Button, TextField, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, CircularProgress, Checkbox, TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import AttendanceFilter from '../../components/attendance/AttendanceFilter';
import { useAuth } from '../../contexts/AuthContext';

const AttendanceListPage = () => {
  const { token } = useAuth();
  const [attendanceGroups, setAttendanceGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [years, setYears] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filterParams, setFilterParams] = useState({
    year: '',
    period: '',
    client_id: ''
  });
  
  // Fetch attendance groups
  const fetchAttendanceGroups = async () => {
    try {
      setLoading(true);
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await authAxios.get('/api/attendance-groups');
      setAttendanceGroups(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching attendance groups');
      setLoading(false);
    }
  };
  
  // Fetch years for filter
  const fetchYears = async () => {
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await authAxios.get('/api/attendance-groups/years');
      setYears(response.data);
    } catch (err) {
      console.error('Error fetching years:', err);
    }
  };
  
  // Fetch periods for a selected year
  const fetchPeriods = async (year) => {
    if (!year) {
      setPeriods([]);
      return;
    }
    
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await authAxios.get(`/api/attendance-groups/periods/${year}`);
      setPeriods(response.data);
    } catch (err) {
      console.error('Error fetching periods:', err);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchAttendanceGroups();
      fetchYears();
    }
  }, [token]);
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    if (name === 'year') {
      fetchPeriods(value);
      setFilterParams(prev => ({ ...prev, period: '', [name]: value }));
    } else {
      setFilterParams(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Apply filters
  const applyFilters = async () => {
    try {
      setLoading(true);
      let url = '/api/attendance-groups';
      let params = {};
      
      if (filterParams.client_id) {
        url = `/api/attendance-groups/client/${filterParams.client_id}`;
      }
      
      if (filterParams.year) {
        params.year = filterParams.year;
      }
      
      if (filterParams.period) {
        params.period = filterParams.period;
      }
      
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const response = await authAxios.get(url, { params });
      
      setAttendanceGroups(response.data);
      setShowFilter(false);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred while applying filters');
      setLoading(false);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilterParams({
      year: '',
      period: '',
      client_id: ''
    });
    fetchAttendanceGroups();
    setShowFilter(false);
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle row selection
  const handleSelectRow = (id) => {
    const isSelected = selectedGroups.includes(id);
    if (isSelected) {
      setSelectedGroups(selectedGroups.filter(groupId => groupId !== id));
    } else {
      setSelectedGroups([...selectedGroups, id]);
    }
  };
  
  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected attendance group(s)?')) {
      try {
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        for (const id of selectedGroups) {
          await authAxios.delete(`/api/attendance-groups/${id}`);
        }
        
        fetchAttendanceGroups();
        setSelectedGroups([]);
      } catch (err) {
        setError(err.message || 'An error occurred while deleting attendance groups');
      }
    }
  };
  
  // Filter attendance groups based on search term
  const filteredGroups = attendanceGroups.filter(group => {
    return (
      group.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.period?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(group.year)?.includes(searchTerm.toLowerCase())
    );
  });
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      p: 0
    }}>
      {/* Header section - reduced spacing */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        pt: 1,
        px: 2
      }}>
        <Typography variant="h5" component="h1">
          Manage Attendance
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {selectedGroups.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ textTransform: 'none' }}
            >
              Delete ({selectedGroups.length})
            </Button>
          )}
          
          <Link to="/attendance/new" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="small" 
              startIcon={<AddIcon />}
              sx={{ textTransform: 'none' }}
            >
              New Attendance Group
            </Button>
          </Link>
        </Box>
      </Box>
      
      {/* Search and filter section - reduced spacing */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        px: 2
      }}>
        <Box sx={{ position: 'relative', width: '50%' }}>
          <TextField
            placeholder="Search attendance groups..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ ml: 1, mr: 1 }} />,
              sx: { pl: 4 }
            }}
          />
        </Box>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<FilterIcon />}
          onClick={() => setShowFilter(!showFilter)}
          sx={{ textTransform: 'none' }}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>
      
      {/* Filter component - reduced spacing */}
      {showFilter && (
        <Box sx={{ px: 2, mb: 1 }}>
          <AttendanceFilter
            years={years}
            periods={periods}
            filterParams={filterParams}
            onFilterChange={handleFilterChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />
        </Box>
      )}
      
      {/* Loading indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mt: 1, mx: 2, p: 2, bgcolor: '#fce4e4', borderRadius: 1 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      ) : (
        /* Table section - taking maximum space */
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          px: 2,
          height: 'calc(100vh - 120px)'  
        }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              overflow: 'auto'
            }}
          >
            <Table stickyHeader size="small">
              <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ py: 1 }}>
                    <Checkbox
                      size="small"
                      indeterminate={
                        selectedGroups.length > 0 && 
                        selectedGroups.length < filteredGroups.length
                      }
                      checked={
                        filteredGroups.length > 0 && 
                        selectedGroups.length === filteredGroups.length
                      }
                      onChange={() => {
                        if (selectedGroups.length === filteredGroups.length) {
                          setSelectedGroups([]);
                        } else {
                          setSelectedGroups(filteredGroups.map(g => g.attendance_group_id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Branch</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Period</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', py: 1 }}>Created</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', py: 1 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGroups
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((group) => (
                    <TableRow 
                      key={group.attendance_group_id}
                      hover
                      onClick={() => handleSelectRow(group.attendance_group_id)}
                      selected={selectedGroups.includes(group.attendance_group_id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox" sx={{ py: 1 }}>
                        <Checkbox 
                          size="small"
                          checked={selectedGroups.includes(group.attendance_group_id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGroups([...selectedGroups, group.attendance_group_id]);
                            } else {
                              setSelectedGroups(selectedGroups.filter(id => id !== group.attendance_group_id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>{group.client_name}</TableCell>
                      <TableCell sx={{ py: 1 }}>{group.branch}</TableCell>
                      <TableCell sx={{ py: 1 }}>{group.year}</TableCell>
                      <TableCell sx={{ py: 1 }}>{group.period}</TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.3,
                            borderRadius: '4px',
                            backgroundColor: 
                              group.status === 'Active' ? '#e8f5e9' : 
                              group.status === 'Finished' ? '#e3f2fd' : '#fafafa',
                            color: 
                              group.status === 'Active' ? '#2e7d32' : 
                              group.status === 'Finished' ? '#1565c0' : '#424242',
                            fontWeight: 'medium',
                            fontSize: '0.75rem'
                          }}
                        >
                          {group.status}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        {new Date(group.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <IconButton 
                            color="primary" 
                            component={Link} 
                            to={`/attendance/${group.attendance_group_id}`}
                            onClick={(e) => e.stopPropagation()}
                            size="small"
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            color="secondary"
                            component={Link}
                            to={`/attendance/${group.attendance_group_id}/edit`}
                            onClick={(e) => e.stopPropagation()}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredGroups.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 2 }}>
                      No attendance groups found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredGroups.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 15, 25, 50]}
            sx={{ py: 0, minHeight: '40px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AttendanceListPage; 