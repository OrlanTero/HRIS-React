import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import MainLayout from './components/layouts/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeListPage from './pages/EmployeeListPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import ViewEmployeePage from './pages/ViewEmployeePage';
import Banks from './pages/personnel/Banks';
import Clients from './pages/client-manager/Clients';
import Holidays from './pages/personnel/Holidays';
import Employment from './pages/personnel/Employment';
import AssignEmployees from './pages/client-manager/AssignEmployees';
import DataManagement from './pages/administrator/DataManagement';

// Mortuary System Pages
import MortuaryListPage from './pages/mortuary/MortuaryListPage';
import MortuaryDetailPage from './pages/mortuary/MortuaryDetailPage';
import CreateMortuaryPage from './pages/mortuary/CreateMortuaryPage';
import EditMortuaryPage from './pages/mortuary/EditMortuaryPage';
import AddBeneficiaryPage from './pages/mortuary/AddBeneficiaryPage';
import EditBeneficiaryPage from './pages/mortuary/EditBeneficiaryPage';
import PaymentPage from './pages/mortuary/PaymentPage';

// Attendance System Pages
import AttendanceListPage from './pages/attendance/AttendanceListPage';
import AttendanceDetailPage from './pages/attendance/AttendanceDetailPage';
import AttendanceFormPage from './pages/attendance/AttendanceFormPage';

// Adjustments System Pages
import AdjustmentsPage from './pages/adjustments/AdjustmentsPage';
import EditAdjustmentPage from './pages/adjustments/EditAdjustmentPage';

// Petty Cash System Pages
import PettyCashDashboard from './pages/pettyCash/PettyCashDashboard';
import PettyCashPage from './pages/pettyCash/PettyCashPage';

// Requisitions System Pages
import RequisitionsPage from './pages/requisitions/RequisitionsPage';
import DisbursementsPage from './pages/disbursements/DisbursementsPage';

// Loans System Pages
import LoanManagerPage from './pages/financial/LoanManagerPage';
import LoanPaymentsPage from './pages/PayrollManager/LoanPaymentsPage';

// Payroll System Pages
import PayrollPage from './pages/PayrollManager/PayrollPage';
import PayslipDraftDetail from './pages/PayrollManager/PayslipDraftDetail';
import PayslipPrint from './pages/PayrollManager/PayslipPrint';
import ReportsPage from './pages/reports/ReportsPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
      light: '#ECF0F1',
      dark: '#1a252f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3498DB',
      light: '#85C1E9',
      dark: '#1F618D',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F9FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
    error: {
      main: '#E74C3C',
    },
    warning: {
      main: '#F39C12',
    },
    info: {
      main: '#3498DB',
    },
    success: {
      main: '#2ECC71',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ApiProvider>
          <Router>
            <Routes>
              {/* Login route */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Dashboard routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                  <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                  <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Employee routes */}
              <Route path="/employees" element={
                <ProtectedRoute>
                  <MainLayout>
                  <EmployeeListPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/employees/create" element={
                <ProtectedRoute>
                  <MainLayout>
                  <CreateEmployeePage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/employees/edit/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                  <EditEmployeePage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/employees/view/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                  <ViewEmployeePage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Personnel Routes */}
              <Route path="/personnel/employees" element={
                <ProtectedRoute>
                  <MainLayout>
                    <EmployeeListPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/personnel/employment" element={
                <ProtectedRoute>
                  <Employment />
                </ProtectedRoute>
              } />
              
              <Route path="/personnel/banks" element={
                <ProtectedRoute>
                  <Banks />
                </ProtectedRoute>
              } />
              
              <Route path="/personnel/holidays" element={
                <ProtectedRoute>
                  <Holidays />
                </ProtectedRoute>
              } />
              
              {/* Clients Routes */}
              <Route path="/client-manager/clients" element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              } />
              
              <Route path="/client-manager/assign" element={
                <ProtectedRoute>
                  <AssignEmployees />
                </ProtectedRoute>
              } />
              
              {/* Attendance System Routes */}
              <Route path="/attendance/new" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AttendanceFormPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/attendance/:id/edit" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AttendanceFormPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/attendance/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AttendanceDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/attendance" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AttendanceListPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Mortuary System Routes - more specific routes first */}
              <Route path="/mortuaries/create" element={
                <ProtectedRoute>
                    <CreateMortuaryPage />
                </ProtectedRoute>
              } />
              
              <Route path="/mortuaries/edit/:id" element={
                <ProtectedRoute>
                    <EditMortuaryPage />
                </ProtectedRoute>
              } />
              
              <Route path="/mortuaries/:mortuaryId/beneficiaries/add" element={
                <ProtectedRoute>
                    <AddBeneficiaryPage />
                </ProtectedRoute>
              } />
              
              <Route path="/beneficiaries/edit/:id" element={
                <ProtectedRoute>
                    <EditBeneficiaryPage />
                </ProtectedRoute>
              } />
              
              <Route path="/beneficiaries/:id/payments" element={
                <ProtectedRoute>
                    <PaymentPage />
                </ProtectedRoute>
              } />
              
              <Route path="/mortuaries/:id" element={
                <ProtectedRoute>
                    <MortuaryDetailPage />
                </ProtectedRoute>
              } />
              
              <Route path="/mortuaries" element={
                <ProtectedRoute>
                    <MortuaryListPage />
                </ProtectedRoute>
              } />
              
              {/* Adjustments System Routes */}
              <Route path="/adjustments/:id/edit" element={
                <ProtectedRoute>
                    <EditAdjustmentPage />
                </ProtectedRoute>
              } />
              
              <Route path="/adjustments" element={
                <ProtectedRoute>
                    <AdjustmentsPage />
                </ProtectedRoute>
              } />
              
              {/* Petty Cash Routes */}
              <Route path="/petty-cash" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PettyCashPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/petty-cash/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PettyCashDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Requisitions System Routes */}
              <Route path="/requisitions" element={
                <ProtectedRoute>
                  <MainLayout>
                    <RequisitionsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Disbursements System Routes */}
              <Route path="/disbursements" element={
                <ProtectedRoute>
                  <MainLayout>
                    <DisbursementsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Loan System Routes */}
              <Route path="/financial/loan-manager" element={
                <ProtectedRoute>
                  <MainLayout>
                    <LoanManagerPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/financial/loan-payments" element={
                <ProtectedRoute>
                  <MainLayout>
                    <LoanPaymentsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Payroll System Routes */}
              <Route path="/payroll" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PayrollPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/payroll/draft/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PayslipDraftDetail />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/payroll/print/:id" element={
                <ProtectedRoute>
                  <PayslipPrint />
                </ProtectedRoute>
              } />
              
              {/* Reports Pages */}
              <Route path="/reports" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReportsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* Administrator Routes */}
              <Route path="/administrator/data-management" element={
                <ProtectedRoute>
                  <DataManagement />
                </ProtectedRoute>
              } />
              
              {/* Redirect to dashboard by default */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
