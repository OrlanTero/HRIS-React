import React, { useState } from 'react';
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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  IconButton,
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BeneficiaryList = ({ beneficiaries, loading, error, onDelete, mortuaryId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState(null);

  const handleDeleteClick = (beneficiaryId) => {
    setSelectedBeneficiaryId(beneficiaryId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedBeneficiaryId);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

      <Card elevation={3} sx={{ mt: 4 }}>
        <CardHeader
          title="Beneficiaries"
          action={
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to={`/mortuaries/${mortuaryId}/beneficiaries/add`}
              startIcon={<AddIcon />}
              size="small"
            >
              Add Beneficiary
            </Button>
          }
          sx={{ 
            bgcolor: 'secondary.main', 
            color: 'white',
            '& .MuiCardHeader-action': { color: 'white' }
          }}
        />
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Employee No.</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Beneficiary Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beneficiaries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No beneficiaries found
                    </TableCell>
                  </TableRow>
                ) : (
                  beneficiaries.map(beneficiary => (
                    <TableRow key={beneficiary.beneficiary_id}>
                      <TableCell>{beneficiary.firstname} {beneficiary.lastname}</TableCell>
                      <TableCell>{beneficiary.employee_no}</TableCell>
                      <TableCell>
                        <Chip 
                          label={beneficiary.type}
                          color={beneficiary.type === 'DEATH' ? 'error' : 'primary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{beneficiary.name}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="success" 
                          component={Link} 
                          to={`/beneficiaries/${beneficiary.beneficiary_id}/payments`}
                          size="small"
                          title="Manage Payments"
                        >
                          <AttachMoneyIcon />
                        </IconButton>
                        <IconButton 
                          color="primary" 
                          component={Link} 
                          to={`/beneficiaries/edit/${beneficiary.beneficiary_id}`}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteClick(beneficiary.beneficiary_id)}
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
            Are you sure you want to delete this beneficiary? 
            This action cannot be undone.
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
    </>
  );
};

export default BeneficiaryList; 