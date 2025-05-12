import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, 
  Button, 
  Card, 
  Container, 
  Typography, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Tabs,
  Tab,
  Divider,
  FormControlLabel,
  Switch,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Print as PrintIcon,
  Check as CheckIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  LocalAtm as LocalAtmIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Close as CloseIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { formatCurrency } from '../../utils/formatters';
import PrintReport from '../../components/PrintReport';
import axios from 'axios';

const ReportsPage = () => {
  const { currentUser } = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Client, year, period filters
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  
  // Payslip drafts
  const [payslipDrafts, setPayslipDrafts] = useState([]);
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [finalizingDrafts, setFinalizingDrafts] = useState(false);
  
  // Account Credited
  const [accountCreditedData, setAccountCreditedData] = useState([]);
  const [filteredAccountCreditedData, setFilteredAccountCreditedData] = useState([]);

  // Loan Payments
  const [loanPaymentsData, setLoanPaymentsData] = useState([]);
  const [filteredLoanPaymentsData, setFilteredLoanPaymentsData] = useState([]);
  
  // Mortuary Control
  const [mortuaryData, setMortuaryData] = useState([]);
  const [filteredMortuaryData, setFilteredMortuaryData] = useState([]);

  // Bank Summary
  const [bankSummaryData, setBankSummaryData] = useState([]);
  
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  
  // New filters
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('all');
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState('all');
  
  // Print Report Dialog
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [printReportType, setPrintReportType] = useState(null);
  const [printReportData, setPrintReportData] = useState(null);
  const [printReportTitle, setPrintReportTitle] = useState('');
  const [printReportOptions, setPrintReportOptions] = useState({});
  
  // Payslip generation and preview
  const [payslipPreviewOpen, setPayslipPreviewOpen] = useState(false);
  const [payslipPreviewData, setPayslipPreviewData] = useState([]);
  const [payslipPreviewLoading, setPayslipPreviewLoading] = useState(false);
  const [selectedPayslips, setSelectedPayslips] = useState([]);
  const [payslipAZ, setPayslipAZ] = useState(false);
  const [payslipCardView, setPayslipCardView] = useState(false);
  const [saveAndFinalize, setSaveAndFinalize] = useState(false);
  
  // Add date filter state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // 1. First declare all functions using useCallback

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
      
      // Auto-select first client if available
      if (response.data.length > 0 && !selectedClient) {
        setSelectedClient(response.data[0].client_id);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError('Failed to load clients. Please try again.');
      setLoading(false);
    }
  }, [selectedClient, api]);

  const fetchBanks = useCallback(async () => {
    try {
      const response = await api.get('/api/banks');
      setBanks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banks:', error);
      setBanks([]);
    }
  }, [api]);

  const fetchLoanTypes = useCallback(async () => {
    try {
      const response = await api.get('/api/settings/types/loan_type');
      setLoanTypes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan types:', error);
      setLoanTypes([]);
    }
  }, [api]);

  const fetchYears = useCallback(async () => {
    setLoading(true);
    try {
      // Default years as fallback
      const currentYear = new Date().getFullYear().toString();
      const lastYear = (new Date().getFullYear() - 1).toString();
      const defaultYears = [currentYear, lastYear]; 
      
      try {
        // Try to get years from API
        const response = await api.get(`/api/attendance-groups/public/years`);
        if (response.data && response.data.length > 0) {
        setYears(response.data);
        
          // Select current year or first available
        if (response.data.includes(currentYear)) {
          setSelectedYear(currentYear);
          } else {
          setSelectedYear(response.data[0]);
        }
        } else {
          // Use default years if API returns empty array
          setYears(defaultYears);
          setSelectedYear(currentYear);
        }
      } catch (error) {
        console.error('Error fetching years:', error);
        // Use default years on error
        setYears(defaultYears);
        setSelectedYear(currentYear);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error in fetchYears:', error);
      // Final fallback
      const currentYear = new Date().getFullYear().toString();
      const lastYear = (new Date().getFullYear() - 1).toString();
      setYears([currentYear, lastYear]);
      setSelectedYear(currentYear);
      setLoading(false);
    }
  }, [api]);
  
  const fetchPeriods = useCallback(async () => {
    if (!selectedYear) return;
    
    setLoading(true);
    try {
      // Default periods as fallback
      const defaultPeriods = ['January 1 to 15', 'January 16 to 31'];
      
      try {
        // Try to get periods from API
        const response = await api.get(`/api/attendance-groups/public/periods/${selectedYear}`);
        if (response.data && response.data.length > 0) {
        setPeriods(response.data);
        // Select the first period by default
          setSelectedPeriod(response.data[0]);
        } else {
          // Use default periods if API returns empty array
          setPeriods(defaultPeriods);
          setSelectedPeriod(defaultPeriods[0]);
        }
      } catch (error) {
        console.error('Error fetching periods:', error);
        // Use default periods on error
        setPeriods(defaultPeriods);
        setSelectedPeriod(defaultPeriods[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error in fetchPeriods:', error);
      // Final fallback
      const defaultPeriods = ['January 1 to 15', 'January 16 to 31'];
      setPeriods(defaultPeriods);
      setSelectedPeriod(defaultPeriods[0]);
      setLoading(false);
    }
  }, [selectedYear, api]);
  
  const fetchPayslipDrafts = useCallback(async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/drafts/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      setPayslipDrafts(response.data);
      setFilteredDrafts(response.data);
      setSelectedDrafts([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payslip drafts:', error);
      setError('Failed to load payslip drafts. Please try again.');
      setPayslipDrafts([]);
      setFilteredDrafts([]);
      setLoading(false);
    }
  }, [selectedClient, selectedYear, selectedPeriod, api]);

  const fetchAccountCreditedData = useCallback(async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/public/reports/account-credited/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      
      // Extract the data array from the response
      const dataArray = response.data?.data || [];
      
      // Filter by bank if a specific bank is selected
      let filteredData = dataArray;
      if (selectedBank !== 'all') {
        filteredData = dataArray.filter(item => item.bank_id === selectedBank);
      }
      
      setAccountCreditedData(filteredData);
      setFilteredAccountCreditedData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account credited data:', error);
      setError('Failed to load account credited data. Please try again.');
      setAccountCreditedData([]);
      setFilteredAccountCreditedData([]);
      setLoading(false);
    }
  }, [selectedClient, selectedYear, selectedPeriod, selectedBank, api]);

  const fetchLoanPaymentsData = useCallback(async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/public/reports/loan-payments/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      
      // Filter by loan type if a specific type is selected
      let filteredData = response.data;
      if (selectedLoanType !== 'all') {
        filteredData = response.data.filter(item => item.loan_type_id === selectedLoanType);
      }
      
      setLoanPaymentsData(filteredData);
      setFilteredLoanPaymentsData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan payments data:', error);
      setError('Failed to load loan payments data. Please try again.');
      setLoanPaymentsData([]);
      setFilteredLoanPaymentsData([]);
      setLoading(false);
    }
  }, [selectedClient, selectedYear, selectedPeriod, selectedLoanType, api]);

  const fetchMortuaryData = useCallback(async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/public/reports/mortuary/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      setMortuaryData(response.data);
      setFilteredMortuaryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mortuary data:', error);
      setError('Failed to load mortuary data. Please try again.');
      setMortuaryData([]);
      setFilteredMortuaryData([]);
      setLoading(false);
    }
  }, [selectedClient, selectedYear, selectedPeriod, api]);

  const fetchBankSummaryData = useCallback(async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) return;
    
    setLoading(true);
    try {
      const response = await api.get(
        `/api/payroll/public/reports/bank-summary/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}`
      );
      setBankSummaryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bank summary data:', error);
      setError('Failed to load bank summary data. Please try again.');
      setBankSummaryData([]);
      setLoading(false);
    }
  }, [selectedClient, selectedYear, selectedPeriod, api]);
  
  const handleSelectDraft = (draftId) => {
    if (selectedDrafts.includes(draftId)) {
      setSelectedDrafts(selectedDrafts.filter(id => id !== draftId));
    } else {
      setSelectedDrafts([...selectedDrafts, draftId]);
    }
  };
  
  const handleSelectAllDrafts = () => {
    if (selectedDrafts.length === filteredDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(filteredDrafts.map(draft => draft.payslip_draft_id));
    }
  };
  
  const handleFinalizePayroll = async () => {
    if (selectedDrafts.length === 0) {
      setError('Please select at least one payslip draft to finalize.');
      return;
    }
    
    setFinalizingDrafts(true);
    setError(null);
    
    try {
      const response = await api.post(
        '/api/payroll/finalize',
        { drafts: selectedDrafts }
      );
      
      setFinalizingDrafts(false);
      setSuccess(`Successfully finalized ${selectedDrafts.length} payslips.`);
      setSelectedDrafts([]);
      
      // Refresh the list after finalization
      fetchPayslipDrafts();
      
    } catch (error) {
      console.error('Error finalizing payroll:', error);
      setError('Failed to finalize payroll. Please try again.');
      setFinalizingDrafts(false);
    }
  };
  
  const viewPayslipDraft = (draft) => {
    // Check if draft and draft ID exist before navigating
    if (draft && draft.payslip_draft_id && draft.payslip_draft_id !== undefined) {
      console.log("Navigating to draft:", draft.payslip_draft_id);
    // Navigate to payslip view
    navigate(`/payroll/draft/${draft.payslip_draft_id}`);
    } else {
      console.error("Invalid draft object or missing ID:", draft);
      setError('Cannot view this payslip draft. Draft ID is missing or invalid.');
    }
  };
  
  const handlePrint = (draft) => {
    // Check if draft and draft ID exist before navigating
    if (draft && draft.payslip_draft_id && draft.payslip_draft_id !== undefined) {
      console.log("Navigating to print draft:", draft.payslip_draft_id);
      // Navigate to payslip view instead of print
    navigate(`/payroll/print/${draft.payslip_draft_id}`);
    } else {
      console.error("Invalid draft object or missing ID for print:", draft);
      setError('Cannot print this payslip draft. Draft ID is missing or invalid.');
    }
  };
  
  // New print report handlers
  const handlePrintDialog = (reportType, data, title, options = {}) => {
    setPrintReportType(reportType);
    setPrintReportData(data);
    setPrintReportTitle(title);
    setPrintReportOptions(options);
    setPrintDialogOpen(true);
  };
  
  const handleClosePrintDialog = () => {
    setPrintDialogOpen(false);
  };
  
  const handlePrintAccountCredited = () => {
    if (!filteredAccountCreditedData || filteredAccountCreditedData.length === 0) {
      setError('No data available to print');
      return;
    }
    
    handlePrintDialog(
      101, // ACCOUNT_CREDITED report type
      filteredAccountCreditedData,
      'ACCOUNTS CREDITED REPORT',
      {
        year: selectedYear,
        period: selectedPeriod,
        bank: selectedBank
      }
    );
  };
  
  const handlePrintLoanPayments = () => {
    if (!filteredLoanPaymentsData || filteredLoanPaymentsData.length === 0) {
      setError('No data available to print');
      return;
    }
    
    handlePrintDialog(
      102, // LOAN_PAYMENTS report type
      filteredLoanPaymentsData,
      'LOAN PAYMENTS REPORT',
      {
        year: selectedYear,
        period: selectedPeriod,
        loanType: selectedLoanType
      }
    );
  };
  
  const handlePrintMortuary = () => {
    if (!filteredMortuaryData || filteredMortuaryData.length === 0) {
      setError('No data available to print');
      return;
    }
    
    handlePrintDialog(
      103, // MORTUARY report type
      filteredMortuaryData,
      'MORTUARY CONTROL REPORT',
      {
        year: selectedYear,
        period: selectedPeriod
      }
    );
  };
  
  const handlePrintBankSummary = () => {
    if (!bankSummaryData || bankSummaryData.length === 0) {
      setError('No data available to print');
      return;
    }
    
    handlePrintDialog(
      105, // TOTAL_BANK report type
      bankSummaryData,
      'TOTAL BANK SUMMARY REPORT',
      {
        year: selectedYear,
        period: selectedPeriod
      }
    );
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset search term when changing tabs
    setSearchTerm('');
  };
  
  // Add new handler for printing payslips
  const handlePrintPayslips = async () => {
    if (!selectedDrafts || selectedDrafts.length === 0) {
      setError('Please select at least one payslip to print');
      return;
    }
    
    setLoading(true);
    try {
      // Get the full payslip data for selected drafts
      const payslipData = [];
      for (const draftId of selectedDrafts) {
        const draft = payslipDrafts.find(d => d.payslip_draft_id === draftId);
        if (!draft) continue;
        
        const response = await api.get(`/api/payroll/draft/${draftId}`);
        if (response.data) {
          payslipData.push(response.data);
        }
      }
      
      if (payslipData.length === 0) {
        setError('Failed to load payslip data');
        setLoading(false);
        return;
      }
      
      // Open print dialog with payslip data
      handlePrintDialog(
        100, // PAYSLIP_PER_CLIENT report type
        payslipData,
        'PAYSLIP REPORT',
        {
          year: selectedYear,
          period: selectedPeriod,
          client: clients.find(c => c.client_id === selectedClient)?.name || ''
        }
      );
      setLoading(false);
    } catch (error) {
      console.error('Error loading payslip data:', error);
      setError('Failed to load payslip data. Please try again.');
      setLoading(false);
    }
  };

  // Add these functions for payslip generation and preview
  const handleGeneratePayslips = async () => {
    if (!selectedClient || !selectedYear || !selectedPeriod) {
      setError('Please select a client, year, and period.');
      return;
    }
    
    setPayslipPreviewLoading(true);
    try {
      // Fetch employees for the client
      const response = await api.get(`/api/employees/client/${selectedClient}`);
      
      if (!response.data || response.data.length === 0) {
        setError('No employees found for this client.');
        setPayslipPreviewLoading(false);
        return;
      }
      
      // Get payslip data for preview
      const payslipsResponse = await api.get(
        `/api/payroll/public/preview/client/${selectedClient}/period/${encodeURIComponent(selectedPeriod)}/year/${selectedYear}${payslipAZ ? '/az' : ''}`
      );
      
      setPayslipPreviewData(payslipsResponse.data);
      setSelectedPayslips([]); // Reset selected payslips
      setPayslipPreviewOpen(true);
      setPayslipPreviewLoading(false);
    } catch (error) {
      console.error('Error generating payslips:', error);
      setError('Failed to generate payslips. Please try again.');
      setPayslipPreviewLoading(false);
    }
  };
  
  const handleClosePayslipPreview = () => {
    setPayslipPreviewOpen(false);
  };
  
  const handleSelectPayslip = (payslipId) => {
    if (selectedPayslips.includes(payslipId)) {
      setSelectedPayslips(selectedPayslips.filter(id => id !== payslipId));
    } else {
      setSelectedPayslips([...selectedPayslips, payslipId]);
    }
  };
  
  const handleSelectAllPayslips = () => {
    if (selectedPayslips.length === payslipPreviewData.length) {
      setSelectedPayslips([]);
    } else {
      setSelectedPayslips(payslipPreviewData.map(payslip => payslip.employee_id));
    }
  };
  
  const handleSavePayslipDrafts = async () => {
    if (selectedPayslips.length === 0) {
      setError('Please select at least one payslip to save as draft.');
      return;
    }
    
    setPayslipPreviewLoading(true);
    try {
      // Save selected payslips as drafts
      const response = await api.post('/api/payroll/save-drafts', {
        client_id: selectedClient,
        period: selectedPeriod,
        year: selectedYear,
        employee_ids: selectedPayslips
      });
      
      if (response.data && saveAndFinalize) {
        // Finalize the drafted payslips immediately
        const savedDraftIds = response.data.drafts.map(draft => draft.payslip_draft_id);
        
        const finalizeResponse = await api.post('/api/payroll/finalize', {
          drafts: savedDraftIds
        });
        
        if (finalizeResponse.data) {
          setSuccess(`Successfully saved and finalized ${selectedPayslips.length} payslips.`);
        }
      } else if (response.data) {
        setSuccess(`Successfully saved ${selectedPayslips.length} payslip drafts.`);
      }
      
      setPayslipPreviewOpen(false);
      // Refresh the payslip drafts list
      fetchPayslipDrafts();
      
      setPayslipPreviewLoading(false);
    } catch (error) {
      console.error('Error saving payslip drafts:', error);
      setError(saveAndFinalize 
        ? 'Failed to save and finalize payslips. Please try again.' 
        : 'Failed to save payslip drafts. Please try again.');
      setPayslipPreviewLoading(false);
    }
  };
  
  // Add date filter handling for reports - now that I can see the existing functions were already filtered
  const handleDateFilter = useCallback(() => {
    // Filter payslip drafts by date if available
    if (payslipDrafts.length > 0) {
      let filtered = [...payslipDrafts];
      
      if (startDate) {
        const startDateObj = new Date(startDate);
        startDateObj.setHours(0, 0, 0, 0);
        filtered = filtered.filter(draft => {
          const draftDate = new Date(draft.date_created);
          return draftDate >= startDateObj;
        });
      }
      
      if (endDate) {
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999); // End of the day
        filtered = filtered.filter(draft => {
          const draftDate = new Date(draft.date_created);
          return draftDate <= endDateObj;
        });
      }
      
      setFilteredDrafts(filtered);
    }
    
    // Also apply date filters to other report data
    if (accountCreditedData.length > 0) {
      let filtered = [...accountCreditedData];
      
      if (startDate || endDate) {
        if (startDate) {
          const startDateObj = new Date(startDate);
          startDateObj.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => {
            // Use credit_date or date_created depending on your data structure
            const itemDate = new Date(item.credit_date || item.date_created);
            return itemDate >= startDateObj;
          });
        }
        
        if (endDate) {
          const endDateObj = new Date(endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.credit_date || item.date_created);
            return itemDate <= endDateObj;
          });
        }
      }
      
      setFilteredAccountCreditedData(filtered);
    }
    
    // Filter loan payments data
    if (loanPaymentsData.length > 0) {
      let filtered = [...loanPaymentsData];
      
      if (startDate || endDate) {
        if (startDate) {
          const startDateObj = new Date(startDate);
          startDateObj.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.payment_date || item.date_created);
            return itemDate >= startDateObj;
          });
        }
        
        if (endDate) {
          const endDateObj = new Date(endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.payment_date || item.date_created);
            return itemDate <= endDateObj;
          });
        }
      }
      
      setFilteredLoanPaymentsData(filtered);
    }
    
    // Filter mortuary data
    if (mortuaryData.length > 0) {
      let filtered = [...mortuaryData];
      
      if (startDate || endDate) {
        if (startDate) {
          const startDateObj = new Date(startDate);
          startDateObj.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.date_created);
            return itemDate >= startDateObj;
          });
        }
        
        if (endDate) {
          const endDateObj = new Date(endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.date_created);
            return itemDate <= endDateObj;
          });
        }
      }
      
      setFilteredMortuaryData(filtered);
    }
    
  }, [startDate, endDate, payslipDrafts, accountCreditedData, loanPaymentsData, mortuaryData]);

  const handleClearDateFilters = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    
    // Reset to unfiltered data
    setFilteredDrafts([...payslipDrafts]);
    setFilteredAccountCreditedData([...accountCreditedData]);
    setFilteredLoanPaymentsData([...loanPaymentsData]);
    setFilteredMortuaryData([...mortuaryData]);
  }, [payslipDrafts, accountCreditedData, loanPaymentsData, mortuaryData]);
  
  // Apply date filtering whenever the dates or data changes
  useEffect(() => {
    if (startDate || endDate) {
      handleDateFilter();
    }
  }, [startDate, endDate, payslipDrafts, accountCreditedData, loanPaymentsData, mortuaryData, handleDateFilter]);
  
  // 2. Now define all useEffect hooks after all functions are defined
  
  // Load initial data on component mount
  useEffect(() => {
    fetchClients();
    fetchYears();
    fetchBanks();
    fetchLoanTypes();
  }, [fetchClients, fetchYears, fetchBanks, fetchLoanTypes]);
  
  // Fetch periods when year changes
  useEffect(() => {
    if (selectedYear) {
      fetchPeriods();
    }
  }, [selectedYear, fetchPeriods]);
  
  // Fetch data based on active tab
  useEffect(() => {
    if (selectedClient && selectedYear && selectedPeriod) {
      if (activeTab === 0) {
        fetchPayslipDrafts();
      } else if (activeTab === 1) {
        fetchAccountCreditedData();
      } else if (activeTab === 2) {
        fetchLoanPaymentsData();
      } else if (activeTab === 3) {
        fetchMortuaryData();
      } else if (activeTab === 4) {
        fetchBankSummaryData();
      }
    }
  }, [activeTab, selectedClient, selectedYear, selectedPeriod, 
      fetchPayslipDrafts, fetchAccountCreditedData, fetchLoanPaymentsData, 
      fetchMortuaryData, fetchBankSummaryData]);
  
  // Filter data based on search term and other filter parameters
  useEffect(() => {
    // Account Credited - Filter by search term and bank
    if (activeTab === 1) {
      if (searchTerm.trim() === '' && selectedBank === 'all') {
        setFilteredAccountCreditedData(accountCreditedData);
      } else {
        let filtered = accountCreditedData;
        
        // Filter by bank
        if (selectedBank !== 'all') {
          filtered = filtered.filter(item => item.bank_id === selectedBank);
        }
        
        // Filter by search term
        if (searchTerm.trim() !== '') {
          filtered = filtered.filter(account => 
            account.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.bank_name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setFilteredAccountCreditedData(filtered);
      }
    }
    
    // Loan Payments - Filter by search term and loan type
    else if (activeTab === 2) {
      if (searchTerm.trim() === '' && selectedLoanType === 'all') {
        setFilteredLoanPaymentsData(loanPaymentsData);
      } else {
        let filtered = loanPaymentsData;
        
        // Filter by loan type
        if (selectedLoanType !== 'all') {
          filtered = filtered.filter(item => item.loan_type_id === selectedLoanType);
        }
        
        // Filter by search term
        if (searchTerm.trim() !== '') {
          filtered = filtered.filter(loan => 
            loan.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.loan_type?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setFilteredLoanPaymentsData(filtered);
      }
    }
    
    // Other tabs - Just filter by search term
    else {
      if (searchTerm.trim() === '') {
        setFilteredDrafts(payslipDrafts);
        setFilteredMortuaryData(mortuaryData);
      } else {
        const filteredDrafts = payslipDrafts.filter(draft => 
          draft.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDrafts(filteredDrafts);
        
        const filteredMortuary = mortuaryData.filter(item => 
          item.beneficiary_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMortuaryData(filteredMortuary);
      }
    }
  }, [activeTab, searchTerm, selectedBank, selectedLoanType, payslipDrafts, accountCreditedData, loanPaymentsData, mortuaryData]);
  
  // Add this PayslipCard component near the end of the file, before the return statement
  const PayslipCard = ({ payslip, isSelected, onSelect }) => {
    return (
      <Box 
        sx={{
          border: '1px dashed #050505',
          p: 2,
          backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          },
          width: '100%'
        }}
        onClick={() => onSelect(payslip.employee_id)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>CDM SECURITY AGENCY, INC.</Typography>
          <IconButton 
            size="small" 
            color={isSelected ? 'primary' : 'default'}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(payslip.employee_id);
            }}
          >
            <CheckIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" sx={{ display: 'block', mb: 2 }}>
          Salusoy, Meycauayan City, Bulacan, (044) 840-8145
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
          <Typography variant="subtitle1">Period: {payslip.period}, {payslip.year}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>PAYSLIP</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{payslip.employee_name}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mt: 1 }}>
            {formatCurrency(payslip.net_pay)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 3 }}>
          <Box sx={{ flex: 1, pr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
            <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 2 }}>
                GROSS PAY
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={7}>Regular</Grid>
                <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.basic_pay)}</Grid>
                
                {payslip.allowances > 0 && (
                  <>
                    <Grid item xs={7}>Allowances</Grid>
                    <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.allowances || 0)}</Grid>
                  </>
                )}
                
                {payslip.overtime > 0 && (
                  <>
                    <Grid item xs={7}>Overtime</Grid>
                    <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.overtime || 0)}</Grid>
                  </>
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                GROSS: {formatCurrency(payslip.gross_pay)}
              </Typography>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1, pl: { md: 3 } }}>
            <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 2 }}>
                DEDUCTIONS
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={7}>SSS</Grid>
                <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.sss || 0)}</Grid>
                
                <Grid item xs={7}>PhilHealth</Grid>
                <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.philhealth || 0)}</Grid>
                
                <Grid item xs={7}>Pag-IBIG</Grid>
                <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.pagibig || 0)}</Grid>
                
                {payslip.loan_payments > 0 && (
                  <>
                    <Grid item xs={7}>Loan Payments</Grid>
                    <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.loan_payments || 0)}</Grid>
                  </>
                )}
                
                {payslip.other_deductions > 0 && (
                  <>
                    <Grid item xs={7}>Other Deductions</Grid>
                    <Grid item xs={5} sx={{ textAlign: 'right' }}>{formatCurrency(payslip.other_deductions || 0)}</Grid>
                  </>
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                TOTAL DEDUCTIONS: {formatCurrency(payslip.deductions)}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    );
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reports
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Snackbar 
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        message={success}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      
      <Box sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="report tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Payslip Drafts" icon={<AssignmentIcon />} iconPosition="start" />
            <Tab label="Account Credited" icon={<AccountBalanceIcon />} iconPosition="start" />
            <Tab label="Loan Payments" icon={<LocalAtmIcon />} iconPosition="start" />
            <Tab label="Mortuary Control" icon={<PeopleIcon />} iconPosition="start" />
            <Tab label="Total Bank Summary" icon={<AssessmentIcon />} iconPosition="start" />
          </Tabs>
        </Box>
      </Box>
      
      {/* Date Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
          Date Filters
          </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleDateFilter}
                startIcon={<SearchIcon />}
              >
                Apply Date Filter
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClearDateFilters}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Filter Section by Report Type */}
      <Card sx={{ mb: 3, backgroundColor: '#e3f2fd', border: '2px solid #1976d2' }}>
        <Box sx={{ p: 2 }}>
          {/* Payslip Drafts Filters - matches reports.phtml */}
          {activeTab === 0 && (
            <>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                PAYSLIP (PER CLIENT)
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="client-select-label">Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  value={selectedClient}
                  label="Client"
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.client_id} value={client.client_id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                      labelId="year-select-label"
                      id="year-select"
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="period-select-label">Period</InputLabel>
                    <Select
                      labelId="period-select-label"
                      id="period-select"
                      value={selectedPeriod}
                      label="Period"
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      {periods.map((period) => (
                        <MenuItem key={period} value={period}>
                          {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={payslipAZ} 
                        onChange={(e) => setPayslipAZ(e.target.checked)} 
                        color="primary"
                      />
                    }
                    label="Payslip A-Z"
                  />
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGeneratePayslips}
                    disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    GENERATE PAYSLIP
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchPayslipDrafts}
                    startIcon={<RefreshIcon />}
                    disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    LOAD DATA
                  </Button>
                  {selectedDrafts.length > 0 && (
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={handleFinalizePayroll}
                      disabled={finalizingDrafts}
                    >
                      {finalizingDrafts ? 'FINALIZING...' : `FINALIZE (${selectedDrafts.length})`}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </>
          )}

          {/* Account Credited Filters - matches reports.phtml */}
          {activeTab === 1 && (
            <>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                ACCOUNTS CREDITED
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="client-select-label">Client</InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      value={selectedClient}
                      label="Client"
                      onChange={(e) => setSelectedClient(e.target.value)}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.client_id} value={client.client_id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="period-select-label">Period</InputLabel>
                    <Select
                      labelId="period-select-label"
                      id="period-select"
                      value={selectedPeriod}
                      label="Period"
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      {periods.map((period) => (
                        <MenuItem key={period} value={period}>
                          {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="bank-select-label">Bank</InputLabel>
                    <Select
                      labelId="bank-select-label"
                      id="bank-select"
                      value={selectedBank}
                      label="Bank"
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <MenuItem value="all">All Banks</MenuItem>
                      {banks.map((bank) => (
                        <MenuItem key={bank.bank_id} value={bank.bank_id}>
                          {bank.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchAccountCreditedData}
                    disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    LOAD DATA
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrintAccountCredited}
                    disabled={loading || !filteredAccountCreditedData || filteredAccountCreditedData.length === 0}
                    sx={{ mr: 1 }}
                  >
                    Print Report
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {/* Loan Payments Filters - matches reports.phtml */}
          {activeTab === 2 && (
            <>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                LOAN PAYMENTS
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="client-select-label">Client</InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      value={selectedClient}
                      label="Client"
                      onChange={(e) => setSelectedClient(e.target.value)}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.client_id} value={client.client_id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                      labelId="year-select-label"
                      id="year-select"
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
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
              <FormControl fullWidth size="small">
                <InputLabel id="period-select-label">Period</InputLabel>
                <Select
                  labelId="period-select-label"
                  id="period-select"
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {periods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="loan-type-select-label">Type</InputLabel>
                    <Select
                      labelId="loan-type-select-label"
                      id="loan-type-select"
                      value={selectedLoanType}
                      label="Type"
                      onChange={(e) => setSelectedLoanType(e.target.value)}
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      {loanTypes.map((type) => (
                        <MenuItem key={type.type_id} value={type.type_id}>
                          {type.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchLoanPaymentsData}
                    disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    LOAD DATA
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrintLoanPayments}
                    disabled={loading || !filteredLoanPaymentsData || filteredLoanPaymentsData.length === 0}
                    sx={{ mr: 1 }}
                  >
                    Print Report
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {/* Mortuary Control Filters - matches reports.phtml */}
          {activeTab === 3 && (
            <>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                MORTUARY CONTROL
              </Typography>
              <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="client-select-label">Client</InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      value={selectedClient}
                      label="Client"
                      onChange={(e) => setSelectedClient(e.target.value)}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.client_id} value={client.client_id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
            </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                      labelId="year-select-label"
                      id="year-select"
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="period-select-label">Period</InputLabel>
                    <Select
                      labelId="period-select-label"
                      id="period-select"
                      value={selectedPeriod}
                      label="Period"
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      {periods.map((period) => (
                        <MenuItem key={period} value={period}>
                          {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchMortuaryData}
                    disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    LOAD DATA
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrintMortuary}
                    disabled={loading || !filteredMortuaryData || filteredMortuaryData.length === 0}
                    sx={{ mr: 1 }}
                  >
                    Print Report
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {/* Bank Summary Filters - matches reports.phtml */}
          {activeTab === 4 && (
            <>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                TOTAL BANK SUMMARY
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="client-select-label">Client</InputLabel>
                    <Select
                      labelId="client-select-label"
                      id="client-select"
                      value={selectedClient}
                      label="Client"
                      onChange={(e) => setSelectedClient(e.target.value)}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.client_id} value={client.client_id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                      labelId="year-select-label"
                      id="year-select"
                      value={selectedYear}
                      label="Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
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
                  <FormControl fullWidth size="small">
                    <InputLabel id="period-select-label">Period</InputLabel>
                    <Select
                      labelId="period-select-label"
                      id="period-select"
                      value={selectedPeriod}
                      label="Period"
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      {periods.map((period) => (
                        <MenuItem key={period} value={period}>
                          {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                    onClick={fetchBankSummaryData}
                disabled={loading || !selectedClient || !selectedYear || !selectedPeriod}
                    sx={{ mr: 2, fontWeight: 'bold', px: 3, py: 1 }}
                  >
                    LOAD DATA
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PrintIcon />}
                    onClick={handlePrintBankSummary}
                    disabled={loading || !bankSummaryData || bankSummaryData.length === 0}
                    sx={{ mr: 1 }}
                  >
                    Print Report
              </Button>
            </Grid>
          </Grid>
            </>
          )}
        </Box>
      </Card>
      
      {/* Tab Panels */}
      
      {/* Payslip Drafts Tab */}
      {activeTab === 0 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6">
              Payslip Drafts
            </Typography>
            
            {selectedDrafts.length > 0 && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                onClick={handleFinalizePayroll}
                disabled={finalizingDrafts}
              >
                {finalizingDrafts ? 'Finalizing...' : `Finalize (${selectedDrafts.length})`}
              </Button>
            )}
          </Box>
          
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : filteredDrafts.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  {searchTerm ? 'No payslip drafts match your search criteria.' : 'No payslip drafts available for the selected criteria.'}
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Tooltip title="Select All">
                        <IconButton onClick={handleSelectAllDrafts}>
                          <CheckIcon color={selectedDrafts.length === filteredDrafts.length && filteredDrafts.length > 0 ? 'primary' : 'action'} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell align="right">Basic Pay</TableCell>
                    <TableCell align="right">Gross Pay</TableCell>
                    <TableCell align="right">Deductions</TableCell>
                    <TableCell align="right">Net Pay</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDrafts.map((draft) => {
                    const isSelected = selectedDrafts.includes(draft.payslip_draft_id);
                    const totalDeductions = parseFloat(draft.part1 || 0) + 
                                        parseFloat(draft.part2 || 0) + 
                                        parseFloat(draft.others || 0);
              
                    return (
                      <TableRow 
                        key={draft.payslip_draft_id}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                          cursor: 'pointer'
                        }}
                        hover
                        onClick={() => handleSelectDraft(draft.payslip_draft_id)}
                      >
                        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                          <IconButton 
                            onClick={() => handleSelectDraft(draft.payslip_draft_id)}
                            color={isSelected ? 'primary' : 'default'}
                          >
                            <CheckIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {draft.employee_name}
                        </TableCell>
                        <TableCell align="right">{formatCurrency(draft.basic_pay)}</TableCell>
                        <TableCell align="right">{formatCurrency(draft.gross_pay)}</TableCell>
                        <TableCell align="right">{formatCurrency(totalDeductions)}</TableCell>
                        <TableCell align="right">{formatCurrency(draft.netpay)}</TableCell>
                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                          <Tooltip title="View Details">
                            <IconButton 
                              color="primary" 
                              onClick={() => viewPayslipDraft(draft)}
                            >
                              <AssignmentIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Print Payslip">
                            <IconButton 
                              color="primary"
                              onClick={handlePrintPayslips}
                            >
                              <PrintIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredDrafts.length} 
              {searchTerm && payslipDrafts.length !== filteredDrafts.length 
                ? ` of ${payslipDrafts.length}` 
                : ''} 
              payslip drafts
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Account Credited Tab */}
      {activeTab === 1 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6">
              Account Credited Report
            </Typography>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrintAccountCredited}
              disabled={loading || !filteredAccountCreditedData || filteredAccountCreditedData.length === 0}
            >
              Print Report
            </Button>
          </Box>
          
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : filteredAccountCreditedData.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  {searchTerm ? 'No account credited data matches your search criteria.' : 'No account credited data available for the selected criteria.'}
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Bank</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAccountCreditedData.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{item.employee_name}</TableCell>
                      <TableCell>{item.bank_name}</TableCell>
                      <TableCell>{item.account_number}</TableCell>
                      <TableCell align="right">{formatCurrency(item.net_pay)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredAccountCreditedData.length} 
              {searchTerm && accountCreditedData.length !== filteredAccountCreditedData.length 
                ? ` of ${accountCreditedData.length}` 
                : ''} 
              records
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Loan Payments Tab */}
      {activeTab === 2 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6">
              Loan Payments Report
            </Typography>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrintLoanPayments}
              disabled={loading || !filteredLoanPaymentsData || filteredLoanPaymentsData.length === 0}
            >
              Print Report
            </Button>
          </Box>
          
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : filteredLoanPaymentsData.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  {searchTerm ? 'No loan payments data matches your search criteria.' : 'No loan payments data available for the selected criteria.'}
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Loan Type</TableCell>
                    <TableCell align="right">Payment Amount</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell>Payment Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanPaymentsData.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{item.employee_name}</TableCell>
                      <TableCell>{item.loan_type}</TableCell>
                      <TableCell align="right">{formatCurrency(item.payment_amount)}</TableCell>
                      <TableCell align="right">{formatCurrency(item.balance)}</TableCell>
                      <TableCell>{new Date(item.payment_date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredLoanPaymentsData.length} 
              {searchTerm && loanPaymentsData.length !== filteredLoanPaymentsData.length 
                ? ` of ${loanPaymentsData.length}` 
                : ''} 
              records
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Mortuary Control Tab */}
      {activeTab === 3 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6">
              Mortuary Control Report
            </Typography>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrintMortuary}
              disabled={loading || !filteredMortuaryData || filteredMortuaryData.length === 0}
            >
              Print Report
            </Button>
          </Box>
          
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : filteredMortuaryData.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  {searchTerm ? 'No mortuary data matches your search criteria.' : 'No mortuary data available for the selected criteria.'}
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Beneficiary</TableCell>
                    <TableCell align="right">Contribution</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Paid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMortuaryData.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{item.employee_name}</TableCell>
                      <TableCell>{item.beneficiary_name}</TableCell>
                      <TableCell align="right">{formatCurrency(item.contribution_amount)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.status} 
                          color={item.status === 'Paid' ? 'success' : 'warning'} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{item.date_paid ? new Date(item.date_paid).toLocaleDateString() : 'Not Paid'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredMortuaryData.length} 
              {searchTerm && mortuaryData.length !== filteredMortuaryData.length 
                ? ` of ${mortuaryData.length}` 
                : ''} 
              records
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Bank Summary Tab */}
      {activeTab === 4 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6">
              Total Bank Summary Report
            </Typography>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrintBankSummary}
              disabled={loading || !bankSummaryData || bankSummaryData.length === 0}
            >
              Print Report
            </Button>
          </Box>
          
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : bankSummaryData.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  No bank summary data available for the selected criteria.
                </Typography>
              </Box>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Bank</TableCell>
                    <TableCell align="right">Number of Employees</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankSummaryData.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{item.bank_name}</TableCell>
                      <TableCell align="right">{item.employee_count}</TableCell>
                      <TableCell align="right">{formatCurrency(item.total_amount)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                    <TableCell><strong>TOTAL</strong></TableCell>
                    <TableCell align="right"><strong>{bankSummaryData.reduce((total, item) => total + parseInt(item.employee_count || 0), 0)}</strong></TableCell>
                    <TableCell align="right"><strong>{formatCurrency(bankSummaryData.reduce((total, item) => total + parseFloat(item.total_amount || 0), 0))}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      )}
      
      {/* Payslip Preview Dialog */}
      <Dialog
        open={payslipPreviewOpen}
        onClose={handleClosePayslipPreview}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { minHeight: '80vh' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', pb: 1 }}>
          <Box>
            <Typography variant="h6">Payslip Preview</Typography>
            <Typography variant="body2" color="textSecondary">
              Select payslips to save as drafts
            </Typography>
          </Box>
          <IconButton onClick={handleClosePayslipPreview} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {payslipPreviewLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : payslipPreviewData.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                No payslip data available for the selected criteria.
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                <Typography variant="subtitle1">
                  <strong>Client:</strong> {clients.find(c => c.client_id === selectedClient)?.name}
                  {' | '}
                  <strong>Period:</strong> {selectedPeriod}, {selectedYear}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleSelectAllPayslips}
                    sx={{ mr: 2 }}
                  >
                    {selectedPayslips.length === payslipPreviewData.length && payslipPreviewData.length > 0 
                      ? 'Unselect All' 
                      : 'Select All'}
                  </Button>
                  <ToggleButtonGroup
                    value={payslipCardView ? 'card' : 'table'}
                    exclusive
                    onChange={(e, newView) => {
                      if (newView !== null) {
                        setPayslipCardView(newView === 'card');
                      }
                    }}
                    size="small"
                  >
                    <ToggleButton value="table" aria-label="table view">
                      <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="card" aria-label="card view">
                      <ViewModuleIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
              
              {payslipCardView ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {payslipPreviewData.map((payslip) => (
                    <Box key={payslip.employee_id} sx={{ width: '100%', mb: 2 }}>
                      <PayslipCard 
                        payslip={payslip} 
                        isSelected={selectedPayslips.includes(payslip.employee_id)}
                        onSelect={handleSelectPayslip}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <IconButton 
                            onClick={handleSelectAllPayslips}
                            color={selectedPayslips.length === payslipPreviewData.length && payslipPreviewData.length > 0 ? 'primary' : 'default'}
                          >
                            <CheckIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>Employee</TableCell>
                        <TableCell align="right">Basic Pay</TableCell>
                        <TableCell align="right">Gross Pay</TableCell>
                        <TableCell align="right">Deductions</TableCell>
                        <TableCell align="right">Net Pay</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payslipPreviewData.map((payslip) => {
                        const isSelected = selectedPayslips.includes(payslip.employee_id);
                        const totalDeductions = parseFloat(payslip.deductions || 0);
                        
                        return (
                          <TableRow 
                            key={payslip.employee_id}
                            hover
                            onClick={() => handleSelectPayslip(payslip.employee_id)}
                            sx={{ 
                              backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                              cursor: 'pointer'
                            }}
                          >
                            <TableCell padding="checkbox">
                              <IconButton 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectPayslip(payslip.employee_id);
                                }}
                                color={isSelected ? 'primary' : 'default'}
                              >
                                <CheckIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>{payslip.employee_name}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.basic_pay)}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.gross_pay)}</TableCell>
                            <TableCell align="right">{formatCurrency(totalDeductions)}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.net_pay)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ borderTop: '1px solid #ddd', py: 2 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={saveAndFinalize} 
                onChange={(e) => setSaveAndFinalize(e.target.checked)} 
                color="primary"
              />
            }
            label="Save & Finalize"
            sx={{ mr: 'auto' }}
          />
          <Button onClick={handleClosePayslipPreview}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSavePayslipDrafts}
            disabled={payslipPreviewLoading || selectedPayslips.length === 0}
          >
            {payslipPreviewLoading 
              ? 'Processing...' 
              : saveAndFinalize 
                ? 'Save & Finalize Selected'
                : 'Save Selected as Drafts'
            }
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* PrintReport Dialog */}
      <PrintReport
        open={printDialogOpen}
        onClose={handleClosePrintDialog}
        reportType={printReportType}
        data={printReportData}
        title={printReportTitle}
        options={printReportOptions}
      />
    </Container>
  );
};

export default ReportsPage; 