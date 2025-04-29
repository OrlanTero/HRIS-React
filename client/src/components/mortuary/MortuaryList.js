import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

const MortuaryList = () => {
  const [mortuaries, setMortuaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMortuaryId, setSelectedMortuaryId] = useState(null);

  useEffect(() => {
    fetchMortuaries();
  }, []);

  const fetchMortuaries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/mortuaries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMortuaries(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching mortuaries:', err);
      setError('Failed to load mortuaries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (mortuaryId) => {
    setSelectedMortuaryId(mortuaryId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/mortuaries/${selectedMortuaryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the list
      fetchMortuaries();
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting mortuary:', err);
      setError('Failed to delete mortuary. Please try again later.');
      setShowDeleteModal(false);
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
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card elevation={3}>
        <CardHeader
          title="Mortuary Periods"
          action={
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/mortuaries/create"
              startIcon={<AddIcon />}
              size="small"
            >
              Add New Period
            </Button>
          }
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            '& .MuiCardHeader-action': { color: 'white' }
          }}
        />
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Beneficiaries</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mortuaries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1">No mortuary periods found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  mortuaries.map(mortuary => (
                    <TableRow key={mortuary.mortuary_id}>
                      <TableCell>{mortuary.period}</TableCell>
                      <TableCell>{mortuary.year}</TableCell>
                      <TableCell>{mortuary.beneficiary_count}</TableCell>
                      <TableCell>{new Date(mortuary.date_created).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="info" 
                          component={Link} 
                          to={`/mortuaries/${mortuary.mortuary_id}`}
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton 
                          color="primary" 
                          component={Link} 
                          to={`/mortuaries/edit/${mortuary.mortuary_id}`}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteClick(mortuary.mortuary_id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this mortuary period? 
            This will also delete all associated beneficiaries.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MortuaryList; 