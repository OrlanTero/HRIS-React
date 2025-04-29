import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Paper 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const AttendanceFilter = ({ 
  years, 
  periods, 
  filterParams, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters 
}) => {
  const { token } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const response = await authAxios.get('/api/clients');
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setLoading(false);
      }
    };
    
    if (token) {
      fetchClients();
    }
  }, [token]);
  
  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={filterParams.year}
              label="Year"
              onChange={(e) => onFilterChange('year', e.target.value)}
              disabled={loading}
            >
              <MenuItem value="">Any Year</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="period-select-label">Period</InputLabel>
            <Select
              labelId="period-select-label"
              id="period-select"
              value={filterParams.period}
              label="Period"
              onChange={(e) => onFilterChange('period', e.target.value)}
              disabled={!filterParams.year || loading}
            >
              <MenuItem value="">Any Period</MenuItem>
              {periods.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              id="client-select"
              value={filterParams.client_id}
              label="Client"
              onChange={(e) => onFilterChange('client_id', e.target.value)}
              disabled={loading}
            >
              <MenuItem value="">Any Client</MenuItem>
              {clients.map((client) => (
                <MenuItem key={client.client_id} value={client.client_id}>
                  {client.name} {client.branch && `- ${client.branch}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onApplyFilters}
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Apply Filters
            </Button>
            <Button
              variant="outlined"
              onClick={onResetFilters}
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendanceFilter; 