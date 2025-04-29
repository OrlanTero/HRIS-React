import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, Box, Typography, IconButton,
  CircularProgress,
  TablePagination,
  Checkbox,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import AttendanceFilter from './AttendanceFilter';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AttendanceList = () => {
  const [attendanceGroups, setAttendanceGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [years, setYears] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [filterParams, setFilterParams] = useState({
    year: '',
    period: '',
    client_id: ''
  });
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // Fetch attendance groups
  const fetchAttendanceGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/attendance-groups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      const response = await axios.get('/api/attendance-groups/years', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      const response = await axios.get(`/api/attendance-groups/periods/${year}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPeriods(response.data);
    } catch (err) {
      console.error('Error fetching periods:', err);
    }
  };
  
  useEffect(() => {
    fetchAttendanceGroups();
    fetchYears();
  }, []);
  
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
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });
      
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
        for (const id of selectedGroups) {
          await axios.delete(`/api/attendance-groups/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
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
      group.client_branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.period?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.year?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'finished':
        return 'default';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ mt: 4, p: 2, bgcolor: '#fce4e4', borderRadius: 1 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Manage Attendance
        </Typography>
        
        <Link to="/attendance/new" style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            sx={{ 
              bgcolor: '#1976d2', 
              '&:hover': { bgcolor: '#1565c0' }, 
              textTransform: 'none',
              borderRadius: '4px',
              px: 2
            }}
          >
            NEW ATTENDANCE GROUP
          </Button>
        </Link>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', width: '50%' }}>
          <TextField
            placeholder="Search attendance groups..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ ml: 1, position: 'absolute', left: 0 }} />,
              sx: { pl: 4 }
            }}
          />
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          sx={{ 
            borderColor: '#1976d2', 
            color: '#1976d2',
            textTransform: 'none',
            borderRadius: '4px'
          }}
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTER
        </Button>
      </Box>
      
      {showFilter && (
        <AttendanceFilter
          years={years}
          periods={periods}
          filterParams={filterParams}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />
      )}
      
      <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedGroups.length > 0 && selectedGroups.length < attendanceGroups.length}
                    checked={attendanceGroups.length > 0 && selectedGroups.length === attendanceGroups.length}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedGroups(attendanceGroups.map(group => group.attendance_group_id));
                      } else {
                        setSelectedGroups([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGroups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((group) => {
                const isSelected = selectedGroups.indexOf(group.attendance_group_id) !== -1;
                return (
                  <TableRow 
                    hover 
                    key={group.attendance_group_id}
                    selected={isSelected}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => handleSelectRow(group.attendance_group_id)}
                      />
                    </TableCell>
                    <TableCell>
                      {group.year} - {group.period}
                    </TableCell>
                    <TableCell>
                      {group.client_name} {group.client_branch && `- ${group.client_branch}`}
                    </TableCell>
                    <TableCell>
                      {group.start_date ? format(new Date(group.start_date), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {group.end_date ? format(new Date(group.end_date), 'MMM dd, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={group.status} 
                        size="small" 
                        color={getStatusColor(group.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          onClick={() => navigate(`/attendance/${group.attendance_group_id}`)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small" 
                          onClick={() => navigate(`/attendance/${group.attendance_group_id}/edit`)}
                          disabled={group.status === 'finished'}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDelete()}
                          disabled={group.status === 'active'}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGroups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default AttendanceList;