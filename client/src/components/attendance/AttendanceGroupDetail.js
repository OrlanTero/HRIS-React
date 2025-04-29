import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, Typography, Grid,
  Divider, CircularProgress, Alert, Paper, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import AttendanceTable from './AttendanceTable';

const attendanceTypes = [
  "Regular Day",
  "Regular OT",
  "Special Holiday",
  "Legal Holiday",
  "Rest Day",
  "Legal Holiday OT",
  "Special Holiday OT",
  "Rest Day OT",
  "Night Differential"
];

const AttendanceGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [attendanceGroup, setAttendanceGroup] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [changes, setChanges] = useState({});
  
  // Fetch attendance group data
  const fetchAttendanceGroup = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/attendance-groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setAttendanceGroup(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching attendance group: ' + error.message);
      setLoading(false);
    }
  }, [id, token]);
  
  useEffect(() => {
    fetchAttendanceGroup();
  }, [fetchAttendanceGroup]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle attendance cell click
  const handleAttendanceChange = (employeeId, day, type, value, attendanceId = null) => {
    const key = `${employeeId}-${day}-${type}`;
    
    setChanges(prev => ({
      ...prev,
      [key]: {
        attendance_group_id: parseInt(id),
        employee_id: employeeId,
        day: parseInt(day),
        type: parseInt(type),
        hours: value ? parseInt(value) : 8,
        attendance_id: attendanceId,
        action: attendanceId ? 'update' : 'add'
      }
    }));
  };
  
  // Handle removing an attendance entry
  const handleRemoveAttendance = (employeeId, day, type, attendanceId) => {
    if (!attendanceId) return;
    
    const key = `${employeeId}-${day}-${type}`;
    
    setChanges(prev => ({
      ...prev,
      [key]: {
        attendance_id: attendanceId,
        action: 'delete'
      }
    }));
  };
  
  // Save attendance changes
  const handleSaveChanges = async () => {
    if (Object.keys(changes).length === 0) {
      setError('No changes to save');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const records = Object.values(changes);
      
      await axios.post('/api/attendance/batch', { records }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess(true);
      setChanges({});
      setSaving(false);
      
      // Refresh data
      fetchAttendanceGroup();
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError('Error saving attendance: ' + (error.response?.data?.message || error.message));
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error && !attendanceGroup) {
    return (
      <Box sx={{ mt: 4, p: 2, bgcolor: '#fce4e4', borderRadius: 1 }}>
        <Typography color="error">Error: {error}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/attendance')}
          sx={{ mt: 2 }}
        >
          Back to Attendance List
        </Button>
      </Box>
    );
  }
  
  // Count days in period (e.g., "January 1 to 15" has 15 days)
  const getDaysInPeriod = () => {
    if (!attendanceGroup?.period) return [];
    
    const parts = attendanceGroup.period.split(' ');
    const startDay = parseInt(parts[1]);
    const endDay = parseInt(parts[3]);
    
    return Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
  };
  
  const days = getDaysInPeriod();
  
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/attendance')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h5" component="h1">
          Attendance Group Details
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Attendance saved successfully!
        </Alert>
      )}
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Client</Typography>
                <Typography variant="body1">{attendanceGroup?.client_name}</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Branch</Typography>
                <Typography variant="body1">{attendanceGroup?.client_branch}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Year / Period</Typography>
                <Typography variant="body1">
                  {attendanceGroup?.year} - {attendanceGroup?.period}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Typography variant="body1">
                  {attendanceGroup?.active === 1 ? (
                    <span style={{ color: 'green' }}>Active</span>
                  ) : attendanceGroup?.finished === 1 ? (
                    <span style={{ color: 'orange' }}>Finished</span>
                  ) : (
                    <span style={{ color: 'gray' }}>Inactive</span>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              component={Link}
              to={`/attendance/${id}/edit`}
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
            >
              Edit Details
            </Button>
            
            {Object.keys(changes).length > 0 && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      
      {attendanceGroup?.deployed_employees?.length > 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {attendanceGroup.deployed_employees.map((employee, index) => (
              <Tab 
                key={employee.employee_id} 
                label={`${employee.first_name} ${employee.last_name}`}
                id={`attendance-tab-${index}`}
                aria-controls={`attendance-tabpanel-${index}`}
              />
            ))}
          </Tabs>
          
          {attendanceGroup.deployed_employees.map((employee, index) => (
            <div
              key={employee.employee_id}
              role="tabpanel"
              hidden={activeTab !== index}
              id={`attendance-tabpanel-${index}`}
              aria-labelledby={`attendance-tab-${index}`}
            >
              {activeTab === index && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {employee.first_name} {employee.last_name}
                  </Typography>
                  
                  <AttendanceTable
                    employeeId={employee.employee_id}
                    days={days}
                    attendanceTypes={attendanceTypes}
                    attendanceData={attendanceGroup.attendance[employee.employee_id] || []}
                    onAttendanceChange={handleAttendanceChange}
                    onRemoveAttendance={handleRemoveAttendance}
                    changes={changes}
                  />
                </Box>
              )}
            </div>
          ))}
        </Paper>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No employees deployed to this client yet.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AttendanceGroupDetail; 