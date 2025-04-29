import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, TextField, Typography, Chip, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
  InputLabel, Select, MenuItem, TablePagination, Grid, Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdjustmentForm from './AdjustmentForm';

const AdjustmentsList = ({ 
  adjustments, 
  loading, 
  error, 
  onStatusUpdate,
  onDelete,
  onRefresh 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({
    posted: '',
    paid: ''
  });
  
  // Filter adjustments based on search term and filters
  const filteredAdjustments = adjustments.filter(adjustment => {
    const matchesSearch = 
      adjustment.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adjustment.amount?.toString().includes(searchTerm) ||
      adjustment.date_created?.includes(searchTerm);
      
    const matchesPosted = selectedFilter.posted === '' || 
      (selectedFilter.posted === 'posted' && adjustment.posted === 1) ||
      (selectedFilter.posted === 'not_posted' && adjustment.posted === 2);
      
    const matchesPaid = selectedFilter.paid === '' || 
      (selectedFilter.paid === 'paid' && adjustment.paid === 1) ||
      (selectedFilter.paid === 'not_paid' && adjustment.paid === 2);
      
    return matchesSearch && matchesPosted && matchesPaid;
  });
  
  // Get displayed rows based on pagination
  const displayedRows = filteredAdjustments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilter(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(0); // Reset page when filtering
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedAdjustment) {
      onDelete(selectedAdjustment.adjustment_id);
      setOpenDeleteDialog(false);
      setSelectedAdjustment(null);
    }
  };
  
  // Handle status update
  const handleStatusUpdate = (adjustment, field, value) => {
    onStatusUpdate(adjustment.adjustment_id, { [field]: value });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format amount to currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ backgroundColor: '#feeeee', p: 2, borderRadius: 1, mt: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button 
          startIcon={<RefreshIcon />} 
          onClick={onRefresh}
          variant="outlined"
          sx={{ mt: 1 }}
        >
          Try Again
        </Button>
      </Box>
    );
  }
  
  return (
    <Box>
      {/* Toolbar with search, filters, and actions */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search by employee or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
              }}
            />
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Posted Status</InputLabel>
              <Select
                value={selectedFilter.posted}
                name="posted"
                label="Posted Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="posted">Posted</MenuItem>
                <MenuItem value="not_posted">Not Posted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Paid Status</InputLabel>
              <Select
                value={selectedFilter.paid}
                name="paid"
                label="Paid Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="not_paid">Not Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenForm(true)}
            >
              New Adjustment
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {/* Table of adjustments */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Posted</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Paid</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length > 0 ? (
              displayedRows.map((adjustment) => (
                <TableRow key={adjustment.adjustment_id} hover>
                  <TableCell>{adjustment.adjustment_id}</TableCell>
                  <TableCell>{formatDate(adjustment.date_created)}</TableCell>
                  <TableCell>{adjustment.employee_name}</TableCell>
                  <TableCell>{formatAmount(adjustment.amount)}</TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      label={adjustment.posted === 1 ? "Posted" : "Not Posted"} 
                      color={adjustment.posted === 1 ? "success" : "default"}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleStatusUpdate(
                        adjustment, 
                        'posted', 
                        adjustment.posted === 1 ? 2 : 1
                      )}
                      icon={adjustment.posted === 1 ? <CheckIcon /> : <CloseIcon />}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      label={adjustment.paid === 1 ? "Paid" : "Not Paid"} 
                      color={adjustment.paid === 1 ? "info" : "default"}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleStatusUpdate(
                        adjustment, 
                        'paid', 
                        adjustment.paid === 1 ? 2 : 1
                      )}
                      icon={adjustment.paid === 1 ? <CheckIcon /> : <CloseIcon />}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        component={Link} 
                        to={`/adjustments/${adjustment.adjustment_id}/edit`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          setSelectedAdjustment(adjustment);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" sx={{ py: 2 }}>
                    {filteredAdjustments.length === 0 && adjustments.length > 0
                      ? 'No matching adjustments found'
                      : 'No adjustments found'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredAdjustments.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this adjustment for {selectedAdjustment?.employee_name}?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Adjustment form dialog */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>New Adjustment</DialogTitle>
        <DialogContent>
          <AdjustmentForm 
            onSuccess={() => {
              setOpenForm(false);
              onRefresh();
            }}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdjustmentsList; 