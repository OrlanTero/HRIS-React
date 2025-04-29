import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const RequisitionForm = ({ requisitionId, onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  
  const emptyItem = {
    requisition_info_id: null,
    particulars: '',
    quantity: 1,
    unit: 'pcs',
    unit_price: 0,
    amount: 0,
    requisition_type: 0
  };

  const [formData, setFormData] = useState({
    req_id: '',
    date: formatDateForInput(new Date()),
    remarks: '',
    type: 'cash',  // cash, check, etc.
    status: 'pending', // pending, approved, rejected
    paid_to: '', 
    amount: 0,
    req_date: formatDateForInput(new Date()),
    items: [{ ...emptyItem }]
  });

  // Format date as YYYY-MM-DD for input field
  function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();

    if (requisitionId) {
      fetchRequisition();
    }
  }, [requisitionId, token]);

  const fetchRequisition = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/requisitions/${requisitionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const requisition = response.data;
      
      setFormData({
        req_id: requisition.req_id || '',
        date: requisition.date ? formatDateForInput(new Date(requisition.date)) : formatDateForInput(new Date()),
        remarks: requisition.remarks || '',
        type: requisition.type || 'cash',
        status: requisition.status || 'pending',
        paid_to: requisition.paid_to || '',
        amount: Number(requisition.amount || 0),
        req_date: requisition.req_date ? formatDateForInput(new Date(requisition.req_date)) : formatDateForInput(new Date()),
        items: requisition.items && requisition.items.length > 0 
          ? requisition.items.map(item => ({
              requisition_info_id: item.requisition_info_id,
              particulars: item.particulars || '',
              quantity: item.quantity || 1,
              unit: item.unit || 'pcs',
              unit_price: Number(item.unit_price || 0),
              amount: Number(item.amount || 0),
              requisition_type: item.requisition_type || 0
            }))
          : [{ ...emptyItem }]
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requisition:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    
    // Recalculate amount if quantity or unit_price changed
    if (field === 'quantity' || field === 'unit_price') {
      updatedItems[index].amount = Number(updatedItems[index].quantity) * Number(updatedItems[index].unit_price);
    }
    
    setFormData(prev => ({ 
      ...prev, 
      items: updatedItems,
      // Update total amount
      amount: updatedItems.reduce((sum, item) => sum + Number(item.amount), 0)
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }]
    }));
  };

  const handleRemoveItem = (index) => {
    if (formData.items.length <= 1) return;
    
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ 
      ...prev, 
      items: updatedItems,
      // Update total amount
      amount: updatedItems.reduce((sum, item) => sum + Number(item.amount), 0)
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.req_id) errors.req_id = 'Required';
    if (!formData.date) errors.date = 'Required';
    if (!formData.type) errors.type = 'Required';
    if (!formData.status) errors.status = 'Required';
    if (formData.items.length === 0) errors.items = 'At least one item is required';
    
    // Validate items
    let itemsValid = true;
    formData.items.forEach((item, index) => {
      if (!item.particulars || item.quantity <= 0 || !item.unit || item.unit_price < 0) {
        itemsValid = false;
      }
    });
    
    if (!itemsValid) errors.items = 'All item fields must be filled correctly';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaveLoading(true);
    
    try {
      const dataToSend = {
        ...formData,
        date: formData.date,
        req_date: formData.req_date
      };
      
      if (requisitionId) {
        await axios.put(`/api/requisitions/${requisitionId}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/requisitions', dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setSaveLoading(false);
      onSuccess();
    } catch (error) {
      console.error('Error saving requisition:', error);
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            {requisitionId ? 'Edit Requisition' : 'Create New Requisition'}
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="req_id"
            label="Requisition ID"
            value={formData.req_id}
            onChange={handleInputChange}
            error={!!formErrors.req_id}
            helperText={formErrors.req_id}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="date"
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleInputChange}
            error={!!formErrors.date}
            helperText={formErrors.date}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!formErrors.type}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Type"
              onChange={handleInputChange}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="check">Check</MenuItem>
              <MenuItem value="reimbursement">Reimbursement</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!formErrors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleInputChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => 
              typeof option === 'string' ? option : `${option.firstname} ${option.lastname}`
            }
            value={employees.find(emp => emp.employee_id === formData.paid_to) || null}
            onChange={(event, newValue) => {
              setFormData(prev => ({
                ...prev,
                paid_to: newValue ? newValue.employee_id : ''
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paid To"
                fullWidth
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="req_date"
            label="Request Date"
            value={formData.req_date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="remarks"
            label="Remarks"
            multiline
            rows={2}
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Items</Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          </Box>
          
          {formErrors.items && (
            <Typography color="error" variant="caption" sx={{ ml: 2, mb: 1, display: 'block' }}>
              {formErrors.items}
            </Typography>
          )}
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Particulars</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="standard"
                        value={item.particulars}
                        onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                        placeholder="Item description"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        variant="standard"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                        inputProps={{ min: 1, step: 1 }}
                        sx={{ width: '70px' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="standard"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        sx={{ width: '70px' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        variant="standard"
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, 'unit_price', Number(e.target.value))}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                        }}
                        inputProps={{ min: 0, step: 0.01 }}
                        sx={{ width: '120px' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      ₱{(Number(item.amount)).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        variant="standard"
                        value={item.requisition_type}
                        onChange={(e) => handleItemChange(index, 'requisition_type', e.target.value)}
                        sx={{ width: '110px' }}
                      >
                        <MenuItem value={0}>Expense</MenuItem>
                        <MenuItem value={1}>Less</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveItem(index)}
                        disabled={formData.items.length <= 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total Amount:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      ₱{Number(formData.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            onClick={onCancel}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={saveLoading}
            startIcon={saveLoading ? <CircularProgress size={20} /> : null}
          >
            {requisitionId ? 'Update' : 'Create'} Requisition
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequisitionForm; 