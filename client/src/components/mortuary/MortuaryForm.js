import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - 2 + i);
const PERIODS = [
  'January 1 to 15',
  'January 16 to 31',
  'February 1 to 15',
  'February 16 to 28',
  'March 1 to 15',
  'March 16 to 31',
  'April 1 to 15',
  'April 16 to 30',
  'May 1 to 15',
  'May 16 to 31',
  'June 1 to 15',
  'June 16 to 30',
  'July 1 to 15',
  'July 16 to 31',
  'August 1 to 15',
  'August 16 to 31',
  'September 1 to 15',
  'September 16 to 30',
  'October 1 to 15',
  'October 16 to 31',
  'November 1 to 15',
  'November 16 to 30',
  'December 1 to 15',
  'December 16 to 31'
];

const MortuaryForm = ({ mortuaryId = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    period: '',
    year: CURRENT_YEAR.toString()
  });
  const [loading, setLoading] = useState(mortuaryId ? true : false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [availablePeriods, setAvailablePeriods] = useState([]);
  const isEditMode = !!mortuaryId;

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/mortuaries/${mortuaryId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setFormData({
            period: response.data.period,
            year: response.data.year.toString()
          });
          
          setError(null);
        } catch (err) {
          console.error(`Error fetching mortuary ${mortuaryId}:`, err);
          setError('Failed to load mortuary details. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [mortuaryId, isEditMode]);

  useEffect(() => {
    const fetchAvailablePeriods = async () => {
      if (formData.year) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/mortuaries/periods/${formData.year}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Filter out periods that are already used (unless in edit mode for the current period)
          const available = PERIODS.filter(period => {
            const match = response.data.find(p => p.period === period);
            return !match || !match.used || (isEditMode && formData.period === period);
          });
          
          setAvailablePeriods(available);
        } catch (err) {
          console.error(`Error fetching periods for year ${formData.year}:`, err);
          setAvailablePeriods(PERIODS);
        }
      }
    };

    fetchAvailablePeriods();
  }, [formData.year, isEditMode, formData.period]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset period if year changes
    if (name === 'year') {
      setFormData(prev => ({
        ...prev,
        period: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.period || !formData.year) {
      setError('Period and year are required');
      return;
    }
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      if (isEditMode) {
        await axios.put(`/api/mortuaries/${mortuaryId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/mortuaries', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      navigate('/mortuaries');
    } catch (err) {
      console.error('Error saving mortuary:', err);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} mortuary. ${err.response?.data?.message || 'Please try again.'}`);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card elevation={3}>
      <CardHeader
        title={isEditMode ? "Edit Mortuary Period" : "Create New Mortuary Period"}
        sx={{ bgcolor: 'primary.main', color: 'white' }}
      />
      <CardContent>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  label="Year"
                  required
                  disabled={saving}
                >
                  {YEARS.map(year => (
                    <MenuItem key={year} value={year.toString()}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="period-label">Period</InputLabel>
                <Select
                  labelId="period-label"
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  label="Period"
                  required
                  disabled={saving || availablePeriods.length === 0}
                >
                  {availablePeriods.length === 0 ? (
                    <MenuItem value="" disabled>
                      No available periods for this year
                    </MenuItem>
                  ) : (
                    availablePeriods.map(period => (
                      <MenuItem key={period} value={period}>
                        {period}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              
              {availablePeriods.length === 0 && formData.year && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  All periods for this year are already in use.
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/mortuaries')}
                  sx={{ mr: 2 }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving || !formData.period || !formData.year}
                >
                  {saving ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      {isEditMode ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    isEditMode ? 'Update Mortuary' : 'Create Mortuary'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MortuaryForm; 