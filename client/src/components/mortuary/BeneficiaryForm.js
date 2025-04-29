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
  Typography,
  Autocomplete
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BeneficiaryForm = ({ mortuaryId, beneficiaryId = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'DEATH',
    name: '',
    employee_id: ''
  });
  const [loading, setLoading] = useState(beneficiaryId ? true : false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const isEditMode = !!beneficiaryId;
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/employees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employee data. Please try again.');
      }
    };

    const fetchBeneficiary = async () => {
      if (isEditMode) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/beneficiaries/${beneficiaryId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setFormData({
            type: response.data.type,
            name: response.data.name,
            employee_id: response.data.employee_id
          });
          
          // Find the employee to set in autocomplete
          const emp = employees.find(e => e.employee_id === response.data.employee_id);
          if (emp) {
            setSelectedEmployee(emp);
          }
          
        } catch (err) {
          console.error(`Error fetching beneficiary ${beneficiaryId}:`, err);
          setError('Failed to load beneficiary details. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees().then(() => {
      if (isEditMode) {
        fetchBeneficiary();
      }
    });
  }, [beneficiaryId, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmployeeChange = (event, newValue) => {
    setSelectedEmployee(newValue);
    if (newValue) {
      setFormData(prev => ({
        ...prev,
        employee_id: newValue.employee_id
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        employee_id: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.employee_id || !formData.type || !formData.name) {
      setError('All fields are required');
      return;
    }
    
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      const data = {
        ...formData,
        mortuary_id: mortuaryId
      };
      
      if (isEditMode) {
        await axios.put(`/api/beneficiaries/${beneficiaryId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/beneficiaries', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      navigate(`/mortuaries/${mortuaryId}`);
    } catch (err) {
      console.error('Error saving beneficiary:', err);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} beneficiary. ${err.response?.data?.message || 'Please try again.'}`);
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
        title={isEditMode ? "Edit Beneficiary" : "Add New Beneficiary"}
        sx={{ bgcolor: 'secondary.main', color: 'white' }}
      />
      <CardContent>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                id="employee-select"
                options={employees}
                getOptionLabel={(option) => 
                  `${option.lastname}, ${option.firstname} (${option.employee_no})`
                }
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                isOptionEqualToValue={(option, value) => option.employee_id === value.employee_id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Employee"
                    variant="outlined"
                    required
                    fullWidth
                    error={!formData.employee_id && error}
                    helperText={!formData.employee_id && error ? "Employee is required" : ""}
                  />
                )}
                disabled={saving || isEditMode}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Beneficiary Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Beneficiary Type"
                  required
                  disabled={saving}
                >
                  <MenuItem value="DEATH">Death</MenuItem>
                  <MenuItem value="SICKNESS">Sickness</MenuItem>
                  <MenuItem value="ACCIDENT">Accident</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Beneficiary Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={saving}
                helperText="Full name of the beneficiary"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/mortuaries/${mortuaryId}`)}
                  sx={{ mr: 2 }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving || !formData.employee_id || !formData.type || !formData.name}
                >
                  {saving ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      {isEditMode ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    isEditMode ? 'Update Beneficiary' : 'Add Beneficiary'
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

export default BeneficiaryForm; 