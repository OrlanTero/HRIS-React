import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip
} from '@mui/material';
import { formatCurrency } from '../utils/formatters';

const PayslipModal = ({ open, onClose, payslipData, loading }) => {
  if (!payslipData && !loading) {
    return null;
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      aria-labelledby="payslip-modal-title"
    >
      <DialogTitle id="payslip-modal-title">
        <Typography variant="h6">Payslip Details</Typography>
        {payslipData && (
          <Typography variant="subtitle1">
            {payslipData.employee_name} - {payslipData.period} {payslipData.year}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Typography>Loading payslip details...</Typography>
        ) : payslipData ? (
          <Grid container spacing={3}>
            {/* Employee Information */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Employee Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Employee ID:</strong> {payslipData.employee_id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Name:</strong> {payslipData.firstname} {payslipData.lastname}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Position:</strong> {payslipData.position || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>TIN:</strong> {payslipData.tin_number || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Date Created:</strong> {formatDate(payslipData.date_created)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Client:</strong> {payslipData.client_name}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Bank Account Information */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Bank Information</Typography>
                {payslipData.bank_account ? (
                  <>
                    <Typography variant="body2">
                      <strong>Bank:</strong> {payslipData.bank_account.bank_name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Account Number:</strong> {payslipData.bank_account.account_number || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Account Name:</strong> {payslipData.bank_account.account_name || 'N/A'}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">No bank account information available</Typography>
                )}
              </Paper>
            </Grid>
            
            {/* Loans Information */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Loan Information</Typography>
                {payslipData.active_loans && payslipData.active_loans.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Balance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payslipData.active_loans.map(loan => (
                          <TableRow key={loan.loan_id}>
                            <TableCell>{loan.loan_type_name || 'Unknown'}</TableCell>
                            <TableCell align="right">{formatCurrency(loan.amount)}</TableCell>
                            <TableCell align="right">{formatCurrency(loan.balance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2">No active loans</Typography>
                )}
              </Paper>
            </Grid>
            
            {/* Hours Information */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Hours & Rates</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Hours Type</TableCell>
                            <TableCell align="right">Hours</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Regular</TableCell>
                            <TableCell align="right">{payslipData.regular_hours || 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Overtime</TableCell>
                            <TableCell align="right">{payslipData.ot_hours || 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Night Differential</TableCell>
                            <TableCell align="right">{payslipData.night_diff_hours || 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Special Holiday</TableCell>
                            <TableCell align="right">{payslipData.special_holiday_hours || 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Legal Holiday</TableCell>
                            <TableCell align="right">{payslipData.legal_holiday_hours || 0}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Total Hours</TableCell>
                            <TableCell align="right"><strong>{payslipData.total_hours || 0}</strong></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Rate Type</TableCell>
                            <TableCell align="right">Rate</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Regular</TableCell>
                            <TableCell align="right">{formatCurrency(payslipData.regular || 0)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Overtime</TableCell>
                            <TableCell align="right">{formatCurrency(payslipData.overtime || 0)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Night Diff</TableCell>
                            <TableCell align="right">{formatCurrency(payslipData.night_diff || 0)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Special Holiday</TableCell>
                            <TableCell align="right">{formatCurrency(payslipData.special_holiday || 0)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Legal Holiday</TableCell>
                            <TableCell align="right">{formatCurrency(payslipData.legal_holiday || 0)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Payslip Summary */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>Payslip Summary</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 2, bgcolor: '#fff' }}>
                      <Typography variant="subtitle1" gutterBottom>Earnings</Typography>
                      <Typography variant="body2">
                        <strong>Basic Pay:</strong> {formatCurrency(payslipData.basic_pay)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Allowances:</strong> {formatCurrency(payslipData.allowance || 0)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Overtime Pay:</strong> {formatCurrency(payslipData.rest_day || 0)}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2">
                        <strong>Gross Pay:</strong> {formatCurrency(payslipData.gross_pay)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ p: 2, bgcolor: '#fff' }}>
                      <Typography variant="subtitle1" gutterBottom>Deductions</Typography>
                      <Typography variant="body2">
                        <strong>SSS:</strong> {formatCurrency(payslipData.sss)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>PhilHealth:</strong> {formatCurrency(payslipData.phil)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Pag-IBIG:</strong> {formatCurrency(payslipData.pagibig)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Loans:</strong> {formatCurrency(payslipData.loan_statement || 0)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Cash Advance:</strong> {formatCurrency(payslipData.cash_advances || 0)}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2">
                        <strong>Total Deductions:</strong> {formatCurrency(
                          parseFloat(payslipData.part1 || 0) + 
                          parseFloat(payslipData.part2 || 0) + 
                          parseFloat(payslipData.others || 0)
                        )}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 2, 
                        bgcolor: '#e3f2fd', 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="h6" align="center" gutterBottom>
                        Net Pay
                      </Typography>
                      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {formatCurrency(payslipData.netpay)}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Chip 
                          label={`${payslipData.period} ${payslipData.year}`} 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography>No payslip data available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button 
          color="primary" 
          variant="contained"
          disabled={!payslipData}
          onClick={() => {
            // Implement print functionality if needed
            window.print();
          }}
        >
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayslipModal; 