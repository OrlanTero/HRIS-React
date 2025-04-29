import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import MainLayout from '../../components/layouts/MainLayout';

// Set the base URL for axios

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`data-management-tabpanel-${index}`}
      aria-labelledby={`data-management-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DataManagement = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Data states
  const [loanTypes, setLoanTypes] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [sss, setSss] = useState([]);
  const [ph, setPh] = useState([]);
  const [pagibig, setPagibig] = useState([]);
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [dialogData, setDialogData] = useState({
    name: '',
    description: '',
    minimum: '',
    maximum: '',
    percentage: '',
    employee_share: '',
    employer_share: ''
  });
  
  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        loanTypesRes, 
        expenseTypesRes, 
        sssRes, 
        phRes, 
        pagibigRes
      ] = await Promise.all([
        api.get('/api/settings/loanTypes'),
        api.get('/api/settings/expenseTypes'),
        api.get('/api/settings/sss'),
        api.get('/api/settings/ph'),
        api.get('/api/settings/pagibig')
      ]);
      
      setLoanTypes(loanTypesRes.data);
      setExpenseTypes(expenseTypesRes.data);
      setSss(sssRes.data);
      setPh(phRes.data);
      setPagibig(pagibigRes.data);
      
    } catch (err) {
      console.error('Error fetching data', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDialogOpen = (category) => {
    setCurrentCategory(category);
    setDialogData({
      name: '',
      description: '',
      minimum: '',
      maximum: '',
      percentage: '',
      employee_share: '',
      employer_share: ''
    });
    setOpenDialog(true);
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDialogData({
      ...dialogData,
      [name]: value
    });
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      let data = {};
      
      switch (currentCategory) {
        case 'loan_type':
          endpoint = '/api/settings/loanTypes';
          data = {
            name: dialogData.name
          };
          break;
        case 'expense_type':
          endpoint = '/api/settings/expenseTypes';
          data = {
            name: dialogData.name
          };
          break;
        case 'sss':
          endpoint = '/api/settings/sss';
          data = {
            minimum: dialogData.minimum,
            maximum: dialogData.maximum,
            employee_share: dialogData.employee_share,
            employer_share: dialogData.employer_share
          };
          break;
        case 'ph':
          endpoint = '/api/settings/ph';
          data = {
            minimum: dialogData.minimum,
            maximum: dialogData.maximum,
            percentage: dialogData.percentage
          };
          break;
        case 'pagibig':
          endpoint = '/api/settings/pagibig';
          data = {
            minimum: dialogData.minimum,
            maximum: dialogData.maximum,
            employee_share: dialogData.employee_share,
            employer_share: dialogData.employer_share
          };
          break;
        default:
          break;
      }
      
      await axios.post(endpoint, data);
      setSuccess('Data saved successfully!');
      handleDialogClose();
      fetchData();
      
    } catch (err) {
      console.error('Error saving data', err);
      setError('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteItem = async (category, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setLoading(true);
    try {
      let endpoint = '';
      
      switch (category) {
        case 'loan_type':
          endpoint = `/api/settings/loanTypes/${id}`;
          break;
        case 'expense_type':
          endpoint = `/api/settings/expenseTypes/${id}`;
          break;
        case 'sss':
          endpoint = `/api/settings/sss/${id}`;
          break;
        case 'ph':
          endpoint = `/api/settings/ph/${id}`;
          break;
        case 'pagibig':
          endpoint = `/api/settings/pagibig/${id}`;
          break;
        default:
          break;
      }
      
      await axios.delete(endpoint);
      setSuccess('Item deleted successfully!');
      fetchData();
      
    } catch (err) {
      console.error('Error deleting item', err);
      setError('Failed to delete item. It may be in use by other records.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackupDatabase = async () => {
    setLoading(true);
    try {
      await axios.post('/api/settings/database/backup');
      setSuccess('Database backup created successfully!');
    } catch (err) {
      console.error('Error backing up database', err);
      setError('Failed to backup database. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <Box sx={{ width: '100%', p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Settings
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="data management tabs"
          >
            <Tab label="Loan Type" />
            <Tab label="Expense Type" />
            <Tab label="SSS" />
            <Tab label="PH" />
            <Tab label="Pag-ibig" />
            <Tab label="Database Management" />
          </Tabs>
          
          {/* Loan Type Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">List of Loans</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleDialogOpen('loan_type')}
              >
                Add New
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : loanTypes.length > 0 ? (
                    loanTypes.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteItem('loan_type', item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No loan types found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          {/* Expense Type Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Expense Types</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleDialogOpen('expense_type')}
              >
                Add New
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : expenseTypes.length > 0 ? (
                    expenseTypes.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteItem('expense_type', item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No expense types found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          {/* SSS Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">SSS Contributions</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleDialogOpen('sss')}
              >
                Add New
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Range From</TableCell>
                    <TableCell>Range To</TableCell>
                    <TableCell>Employer Share (ER)</TableCell>
                    <TableCell>Employee Share (EE)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : sss.length > 0 ? (
                    sss.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.minimum}</TableCell>
                        <TableCell>{item.maximum}</TableCell>
                        <TableCell>{item.employer_share}</TableCell>
                        <TableCell>{item.employee_share}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteItem('sss', item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No SSS contributions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          {/* PH Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">PhilHealth Contributions</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleDialogOpen('ph')}
              >
                Add New
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Range From</TableCell>
                    <TableCell>Range To</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : ph.length > 0 ? (
                    ph.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.minimum}</TableCell>
                        <TableCell>{item.maximum}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteItem('ph', item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No PhilHealth contributions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          {/* Pag-ibig Tab */}
          <TabPanel value={tabValue} index={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Pag-ibig Contributions</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => handleDialogOpen('pagibig')}
              >
                Add New
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Range From</TableCell>
                    <TableCell>Range To</TableCell>
                    <TableCell>Employer Share (ER)</TableCell>
                    <TableCell>Employee Share (EE)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : pagibig.length > 0 ? (
                    pagibig.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.minimum}</TableCell>
                        <TableCell>{item.maximum}</TableCell>
                        <TableCell>{item.employer_share}</TableCell>
                        <TableCell>{item.employee_share}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteItem('pagibig', item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Pag-ibig contributions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
          {/* Database Management Tab */}
          <TabPanel value={tabValue} index={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6">Database Management</Typography>
              
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subtitle1">Database Backup</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Create a backup of the current database. This will save all system data as a SQL file.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BackupIcon />}
                    onClick={handleBackupDatabase}
                    disabled={loading}
                  >
                    Create Backup
                  </Button>
                </Box>
              </Paper>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
      
      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentCategory === 'loan_type' && 'Add Loan Type'}
          {currentCategory === 'expense_type' && 'Add Expense Type'}
          {currentCategory === 'sss' && 'Add SSS Contribution'}
          {currentCategory === 'ph' && 'Add PhilHealth Contribution'}
          {currentCategory === 'pagibig' && 'Add Pag-ibig Contribution'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {(currentCategory === 'loan_type' || currentCategory === 'expense_type') && (
              <>
                <TextField
                  autoFocus
                  label="Type Name"
                  name="name"
                  fullWidth
                  value={dialogData.name}
                  onChange={handleInputChange}
                />
              </>
            )}
            
            {(currentCategory === 'sss' || currentCategory === 'ph' || currentCategory === 'pagibig') && (
              <>
                <TextField
                  autoFocus
                  label="Range From"
                  name="minimum"
                  type="number"
                  fullWidth
                  value={dialogData.minimum}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Range To"
                  name="maximum"
                  type="number"
                  fullWidth
                  value={dialogData.maximum}
                  onChange={handleInputChange}
                />
              </>
            )}
            
            {currentCategory === 'ph' && (
              <TextField
                label="Percentage Rate (MSC)"
                name="percentage"
                type="number"
                fullWidth
                value={dialogData.percentage}
                onChange={handleInputChange}
              />
            )}
            
            {(currentCategory === 'sss' || currentCategory === 'pagibig') && (
              <>
                <TextField
                  label="Employer Share (ER)"
                  name="employer_share"
                  type="number"
                  fullWidth
                  value={dialogData.employer_share}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Employee Share (EE)"
                  name="employee_share"
                  type="number"
                  fullWidth
                  value={dialogData.employee_share}
                  onChange={handleInputChange}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            color="primary" 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : <SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for success/error messages */}
      <Snackbar
        open={Boolean(success) || Boolean(error)}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(null);
          setError(null);
        }}
      >
        <Alert 
          onClose={() => {
            setSuccess(null);
            setError(null);
          }} 
          severity={success ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default DataManagement; 