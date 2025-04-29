import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, CircularProgress, FormControl,
  FormControlLabel, FormLabel, Grid, InputLabel, MenuItem,
  Radio, RadioGroup, Select, TextField, Typography, Alert
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const periods = [
  'January 1 to 15', 'January 16 to 31',
  'February 1 to 15', 'February 16 to 28', 'February 16 to 29',
  'March 1 to 15', 'March 16 to 31',
  'April 1 to 15', 'April 16 to 30',
  'May 1 to 15', 'May 16 to 31',
  'June 1 to 15', 'June 16 to 30',
  'July 1 to 15', 'July 16 to 31',
  'August 1 to 15', 'August 16 to 31',
  'September 1 to 15', 'September 16 to 30',
  'October 1 to 15', 'October 16 to 31',
  'November 1 to 15', 'November 16 to 30',
  'December 1 to 15', 'December 16 to 31'
];

const AttendanceGroupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const token = localStorage.getItem('token');
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clients, setClients] = useState([]);
  
  const [formData, setFormData] = useState({
    period: '',
    year: new Date().getFullYear().toString(),
    client_id: '',
    active: '2',
    finished: '2'
  });
  
  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClients(response.data);
      } catch (error) {
        setError('Error fetching clients: ' + error.message);
      }
    };
    
    fetchClients();
  }, [token]);
  
  // Fetch attendance group if editing
  useEffect(() => {
    if (isEditing) {
      const fetchAttendanceGroup = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/attendance-groups/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          const group = response.data;
          setFormData({
            period: group.period || '',
            year: group.year || '',
            client_id: group.client_id || '',
            active: group.active?.toString() || '2',
            finished: group.finished?.toString() || '2'
          });
          
          setLoading(false);
        } catch (error) {
          setError('Error fetching attendance group: ' + error.message);
          setLoading(false);
        }
      };
      
      fetchAttendanceGroup();
    }
  }, [id, isEditing, token]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.period || !formData.year || !formData.client_id) {
      setError('Please fill all required fields');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const data = {
        period: formData.period,
        year: formData.year,
        client_id: formData.client_id,
        active: parseInt(formData.active),
        finished: parseInt(formData.finished)
      };
      
      if (isEditing) {
        await axios.put(`/api/attendance-groups/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('/api/attendance-groups', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      setSuccess(true);
      setSaving(false);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/attendance');
      }, 1500);
    } catch (error) {
      setError('Error saving attendance group: ' + (error.response?.data?.message || error.message));
      setSaving(false);
    }
  };
  
  // Handle active status
  const handleActivateGroup = async () => {
    try {
      setSaving(true);
      await axios.put(`/api/attendance-groups/${id}/activate`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setFormData({
        ...formData,
        active: '1'
      });
      
      setSuccess(true);
      setSaving(false);
    } catch (error) {
      setError('Error activating attendance group: ' + error.message);
      setSaving(false);
    }
  };
  
  // Handle finished status
  const handleFinishGroup = async () => {
    try {
      setSaving(true);
      await axios.put(`/api/attendance-groups/${id}/finish`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setFormData({
        ...formData,
        finished: '1'
      });
      
      setSuccess(true);
      setSaving(false);
    } catch (error) {
      setError('Error finishing attendance group: ' + error.message);
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
  
  // Generate array of years (5 years back, current year, 5 years forward)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 11 },
    (_, i) => (currentYear - 5 + i).toString()
  );
  
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
          {isEditing ? 'Edit Attendance Group' : 'Create Attendance Group'}
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Attendance group {isEditing ? 'updated' : 'created'} successfully!
        </Alert>
      )}
      
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="client-label">Client *</InputLabel>
                  <Select
                    labelId="client-label"
                    id="client_id"
                    name="client_id"
                    value={formData.client_id}
                    onChange={handleChange}
                    label="Client *"
                    required
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.client_id} value={client.client_id}>
                        {client.name} - {client.branch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Year *</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    label="Year *"
                    required
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="period-label">Period *</InputLabel>
                  <Select
                    labelId="period-label"
                    id="period"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    label="Period *"
                    required
                  >
                    {periods.map((period) => (
                      <MenuItem key={period} value={period}>
                        {period}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {isEditing && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        row
                        name="active"
                        value={formData.active}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="Active" />
                        <FormControlLabel value="2" control={<Radio />} label="Inactive" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Completion</FormLabel>
                      <RadioGroup
                        row
                        name="finished"
                        value={formData.finished}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="1" control={<Radio />} label="Finished" />
                        <FormControlLabel value="2" control={<Radio />} label="Not Finished" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </>
              )}
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {isEditing && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleActivateGroup}
                        disabled={saving || formData.active === '1'}
                      >
                        Set as Active
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleFinishGroup}
                        disabled={saving || formData.finished === '1'}
                      >
                        Mark as Finished
                      </Button>
                    </>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={saving}
                  >
                    {saving ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttendanceGroupForm; 