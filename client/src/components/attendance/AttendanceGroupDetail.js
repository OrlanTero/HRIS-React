import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, Typography, Grid,
  Divider, CircularProgress, Alert, Paper, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, FormGroup, FormControlLabel, Switch,
  Snackbar, Tooltip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  EventNote as EventNoteIcon,
  Weekend as WeekendIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import AttendanceTable from './AttendanceTable';
import AttendanceService from '../../services/AttendanceService';

// Constants for attendance types (moved outside component for memoization)
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
  const [savingMap, setSavingMap] = useState({}); // Track saving status per employee
  const [attendanceGroup, setAttendanceGroup] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [changes, setChanges] = useState({});
  const [holidays, setHolidays] = useState([]);
  const [employeeRestDays, setEmployeeRestDays] = useState({});
  const [holidayDetectionEnabled, setHolidayDetectionEnabled] = useState(true);
  const [restDayDetectionEnabled, setRestDayDetectionEnabled] = useState(true);
  
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
      
      // Fetch holidays for this client, year, and period
      fetchHolidays(response.data);
      
      // Fetch rest days for all employees
      if (response.data.deployed_employees && response.data.deployed_employees.length > 0) {
        const restDayPromises = response.data.deployed_employees.map(employee => 
          fetchEmployeeRestDays(employee.employee_id)
        );
        await Promise.all(restDayPromises);
      }
      
      setLoading(false);
    } catch (error) {
      setError('Error fetching attendance group: ' + error.message);
      setLoading(false);
    }
  }, [id, token]);
  
  // Fetch holidays for the client and period
  const fetchHolidays = async (groupData) => {
    if (!groupData) return;
    
    try {
      const { client_id, year, period } = groupData;
      if (!client_id || !year || !period) return;
      
      const periodInfo = AttendanceService.getPeriodInfo(period);
      const monthHolidays = await AttendanceService.getHolidays(client_id, year, periodInfo.month);
      
      // Filter holidays to only include those in our period range
      const periodHolidays = monthHolidays.filter(holiday => 
        holiday.day >= periodInfo.startDay && holiday.day <= periodInfo.endDay
      );
      
      setHolidays(periodHolidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };
  
  // Fetch rest days for a specific employee
  const fetchEmployeeRestDays = async (employeeId) => {
    try {
      console.log(`Fetching rest days for employee ${employeeId}`);
      const restDayInfo = await AttendanceService.getEmployeeRestDays(employeeId);
      console.log(`Received rest days for employee ${employeeId}:`, restDayInfo);
      
      // Filter rest days to only include those in our current period
      const filteredRestDays = restDayInfo.restDays.filter(day => {
        if (!attendanceGroup || !attendanceGroup.period) return false;
        
        const periodInfo = AttendanceService.getPeriodInfo(attendanceGroup.period);
        return day >= periodInfo.startDay && day <= periodInfo.endDay;
      });
      
      console.log(`Filtered rest days for employee ${employeeId}:`, filteredRestDays);
      
      // Include the complete rest day information with both day names and filtered days
      setEmployeeRestDays(prev => ({
        ...prev,
        [employeeId]: {
          restDay1: restDayInfo.restDay1, 
          restDay2: restDayInfo.restDay2,
          restDays: filteredRestDays
        }
      }));
    } catch (error) {
      console.error(`Error fetching rest days for employee ${employeeId}:`, error);
      // Set empty object as fallback
      setEmployeeRestDays(prev => ({
        ...prev,
        [employeeId]: {
          restDay1: null,
          restDay2: null,
          restDays: []
        }
      }));
    }
  };
  
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
  
  // Toggle holiday detection
  const handleToggleHolidayDetection = (event) => {
    setHolidayDetectionEnabled(event.target.checked);
  };
  
  // Toggle rest day detection
  const handleToggleRestDayDetection = (event) => {
    setRestDayDetectionEnabled(event.target.checked);
  };
  
  // Save attendance changes for a specific employee
  const handleSaveChangesForEmployee = async (employeeId) => {
    // Filter changes for this employee
    const employeeChanges = Object.values(changes).filter(
      change => change.employee_id === employeeId
    );
    
    if (employeeChanges.length === 0) {
      setError('No changes to save for this employee');
      return;
    }
    
    try {
      // Set saving state for this employee
      setSavingMap(prev => ({ ...prev, [employeeId]: true }));
      setError(null);
      
      await axios.post('/api/attendance/batch', { records: employeeChanges }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove saved changes from the changes object
      const newChanges = { ...changes };
      employeeChanges.forEach(change => {
        const key = `${change.employee_id}-${change.day}-${change.type}`;
        delete newChanges[key];
      });
      
      setChanges(newChanges);
      setSuccess(true);
      
      // Clear saving state for this employee
      setSavingMap(prev => ({ ...prev, [employeeId]: false }));
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      setError('Error saving attendance: ' + (error.response?.data?.message || error.message));
      setSavingMap(prev => ({ ...prev, [employeeId]: false }));
    }
  };
  
  // Save all attendance changes
  const handleSaveAllChanges = async () => {
    if (Object.keys(changes).length === 0) {
      setError('No changes to save');
      return;
    }
    
    try {
      // Set saving state for all employees
      const allEmployees = {};
      Object.values(changes).forEach(change => {
        allEmployees[change.employee_id] = true;
      });
      setSavingMap(allEmployees);
      setError(null);
      
      const records = Object.values(changes);
      
      await axios.post('/api/attendance/batch', { records }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess(true);
      setChanges({});
      
      // Clear saving state for all employees
      const clearedSavingMap = {};
      Object.keys(allEmployees).forEach(empId => {
        clearedSavingMap[empId] = false;
      });
      setSavingMap(clearedSavingMap);
      
      // Refresh data
      fetchAttendanceGroup();
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError('Error saving attendance: ' + (error.response?.data?.message || error.message));
      
      // Clear saving state for all employees on error
      const clearedSavingMap = {};
      Object.keys(savingMap).forEach(empId => {
        clearedSavingMap[empId] = false;
      });
      setSavingMap(clearedSavingMap);
    }
  };
  
  // Get days for the period (memoized to prevent recalculation)
  const days = useMemo(() => {
    if (!attendanceGroup) return [];
    
    const periodInfo = AttendanceService.getPeriodInfo(attendanceGroup.period);
    const daysArray = [];
    
    for (let i = periodInfo.startDay; i <= periodInfo.endDay; i++) {
      daysArray.push(i);
    }
    
    return daysArray;
  }, [attendanceGroup]);
  
  // Count changes per employee (for save button visibility)
  const getEmployeeChangesCount = (employeeId) => {
    return Object.values(changes).filter(
      change => change.employee_id === employeeId
    ).length;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!attendanceGroup) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">
          {error || 'Attendance group not found'}
        </Alert>
      </Box>
    );
  }

  const employees = attendanceGroup.deployed_employees || [];

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          component={Link} 
          to="/attendance/groups" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Attendance Groups
        </Button>
        
        <Box>
          {Object.keys(changes).length > 0 && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              onClick={handleSaveAllChanges}
              disabled={Object.values(savingMap).some(saving => saving)}
              sx={{ ml: 2 }}
            >
              Save All Changes ({Object.keys(changes).length})
            </Button>
          )}
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
          Attendance saved successfully
        </Alert>
      )}
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h1">
                {attendanceGroup.client_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {attendanceGroup.period}, {attendanceGroup.year}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FormGroup sx={{ mr: 2 }}>
                  <Tooltip title="Automatically detect and move hours to holiday entries">
                    <FormControlLabel 
                      control={
                        <Switch 
                          checked={holidayDetectionEnabled} 
                          onChange={handleToggleHolidayDetection}
                        />
                      } 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventNoteIcon fontSize="small" sx={{ mr: 0.5 }} />
                          Holiday Detection
                        </Box>
                      }
                    />
                  </Tooltip>
                </FormGroup>
                
                <FormGroup>
                  <Tooltip title="Prompt when inputting hours on rest days">
                    <FormControlLabel 
                      control={
                        <Switch 
                          checked={restDayDetectionEnabled} 
                          onChange={handleToggleRestDayDetection}
                        />
                      } 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WeekendIcon fontSize="small" sx={{ mr: 0.5 }} />
                          Rest Day Detection
                        </Box>
                      }
                    />
                  </Tooltip>
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {employees.length > 0 ? (
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {employees.map((employee, index) => (
              <Tab 
                key={employee.employee_id} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {`${employee.first_name} ${employee.last_name}`}
                    {getEmployeeChangesCount(employee.employee_id) > 0 && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 1, 
                          backgroundColor: 'primary.main', 
                          color: 'white', 
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem'
                        }}
                      >
                        {getEmployeeChangesCount(employee.employee_id)}
                      </Box>
                    )}
                  </Box>
                } 
                id={`attendance-tab-${index}`}
              />
            ))}
          </Tabs>
          
          {employees.map((employee, index) => (
            <div
              key={employee.employee_id}
              role="tabpanel"
              hidden={activeTab !== index}
              id={`attendance-tabpanel-${index}`}
              aria-labelledby={`attendance-tab-${index}`}
            >
              {activeTab === index && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      {employee.first_name} {employee.last_name}
                    </Typography>
                    
                    {getEmployeeChangesCount(employee.employee_id) > 0 && (
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<SaveIcon />}
                        onClick={() => handleSaveChangesForEmployee(employee.employee_id)}
                        disabled={savingMap[employee.employee_id]}
                        size="small"
                      >
                        {savingMap[employee.employee_id] ? (
                          <>
                            <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                            Saving...
                          </>
                        ) : (
                          `Save Changes (${getEmployeeChangesCount(employee.employee_id)})`
                        )}
                      </Button>
                    )}
                  </Box>
                  
                  {console.log('AttendanceTable props:', {
                    employeeId: employee.employee_id,
                    restDays: employeeRestDays[employee.employee_id],
                    holidays
                  })}
                  
                  <AttendanceTable
                    employeeId={employee.employee_id}
                    days={days}
                    attendanceTypes={attendanceTypes}
                    attendanceData={attendanceGroup.attendance[employee.employee_id] || []}
                    onAttendanceChange={handleAttendanceChange}
                    onRemoveAttendance={handleRemoveAttendance}
                    changes={changes}
                    holidays={holidays}
                    employeeRestDays={employeeRestDays[employee.employee_id] || {
                      restDay1: null,
                      restDay2: null,
                      restDays: []
                    }}
                    holidayDetectionEnabled={holidayDetectionEnabled}
                    restDayDetectionEnabled={restDayDetectionEnabled}
                    isLoading={savingMap[employee.employee_id] || false}
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
      
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Attendance saved successfully"
      />
    </Box>
  );
};

export default AttendanceGroupDetail; 