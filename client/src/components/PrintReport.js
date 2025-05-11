import React, { useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import { Close as CloseIcon, Print as PrintIcon } from '@mui/icons-material';
import { formatCurrency } from '../utils/formatters';

// Report types constants matching the PHP implementation
const REPORT_TYPES = {
  PAYSLIP_PER_CLIENT_INDIVIDUALLY: 99,
  PAYSLIP_PER_CLIENT: 100,
  ACCOUNT_CREDITED: 101,
  LOAN_PAYMENTS: 102,
  MORTUARY: 103,
  PAYSLIP_AZ: 104,
  TOTAL_BANK: 105,
  PAYROLL: 106,
  PETTY_CASH_EXPENSES: 107,
};

const PrintReport = ({ open, onClose, reportType, data, title, options }) => {
  const printRef = useRef();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!data) return;
    setLoading(false);
  }, [data]);

  const handlePrint = () => {
    if (!printRef.current) return;
    
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = `
      <html>
        <head>
          <title>${title || 'Report'}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 20px;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .print-header h2 {
              margin: 0;
              font-size: 18px;
              font-weight: bold;
            }
            .print-header p {
              margin: 5px 0;
              font-size: 14px;
            }
            .print-header h3 {
              margin: 10px 0;
              font-size: 16px;
              text-transform: uppercase;
              font-weight: bold;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            .report-info {
              margin: 10px 0;
              display: flex;
              justify-content: space-between;
            }
            .report-info-item {
              flex: 1;
            }
            .grand-total {
              text-align: right;
              padding: 10px;
              font-weight: bold;
              font-size: 16px;
              border-top: 2px solid #000;
            }
            .payslip-container {
              page-break-inside: avoid;
              border: 1px solid #ccc;
              margin-bottom: 20px;
              padding: 10px;
            }
            .payslip-header {
              text-align: center;
              margin-bottom: 10px;
            }
            .payslip-body {
              display: flex;
              justify-content: space-between;
            }
            .payslip-left, .payslip-right {
              flex: 1;
            }
            @media print {
              @page {
                margin: 0.5cm;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
    
    window.print();
    document.body.innerHTML = originalContents;
    // Force a reload to restore React state
    window.location.reload();
  };

  const renderReportContent = () => {
    if (!data) return <Typography>No data available</Typography>;
    
    switch (reportType) {
      case REPORT_TYPES.PAYSLIP_PER_CLIENT_INDIVIDUALLY:
      case REPORT_TYPES.PAYSLIP_AZ:
        return renderPayslips(data);
      case REPORT_TYPES.ACCOUNT_CREDITED:
        return renderAccountCredited(data, options);
      case REPORT_TYPES.LOAN_PAYMENTS:
        return renderLoanPayments(data);
      case REPORT_TYPES.MORTUARY:
        return renderMortuary(data);
      case REPORT_TYPES.TOTAL_BANK:
        return renderTotalBankSummary(data, options);
      default:
        return <Typography>Unsupported report type</Typography>;
    }
  };

  const renderPayslips = (payslipData) => {
    return (
      <Box>
        {payslipData.map((payslip, index) => (
          <Paper key={index} elevation={2} sx={{ mb: 3, p: 2, pageBreakInside: 'avoid' }}>
            <Box className="payslip-container">
              <Box className="payslip-header">
                <Typography variant="h6">{payslip.employee_name}</Typography>
                <Typography><strong>Client:</strong> {payslip.client_name}</Typography>
                <Typography><strong>Period:</strong> {payslip.period}, {payslip.year}</Typography>
                <Typography variant="h6" color="primary">₱ {formatCurrency(payslip.netpay)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight="bold">Earnings</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Hours</TableCell>
                          <TableCell align="right">Rate</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payslip.regular_hours > 0 && (
                          <TableRow>
                            <TableCell>Regular</TableCell>
                            <TableCell align="right">{payslip.regular_hours}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.regular_rate)}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.regular_hours * payslip.regular_rate)}</TableCell>
                          </TableRow>
                        )}
                        {payslip.ot_hours > 0 && (
                          <TableRow>
                            <TableCell>Regular OT</TableCell>
                            <TableCell align="right">{payslip.ot_hours}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.overtime_rate)}</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.ot_hours * payslip.overtime_rate)}</TableCell>
                          </TableRow>
                        )}
                        {/* Add other hours calculations here */}
                        <TableRow>
                          <TableCell colSpan={3} align="right"><strong>GROSS PAY</strong></TableCell>
                          <TableCell align="right"><strong>{formatCurrency(payslip.gross_pay)}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight="bold">Deductions</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Description</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payslip.sss > 0 && (
                          <TableRow>
                            <TableCell>SSS CONTRI.</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.sss)}</TableCell>
                          </TableRow>
                        )}
                        {payslip.phil > 0 && (
                          <TableRow>
                            <TableCell>PHILHEALTH</TableCell>
                            <TableCell align="right">{formatCurrency(payslip.phil)}</TableCell>
                          </TableRow>
                        )}
                        {/* Add other deductions here */}
                        <TableRow>
                          <TableCell align="right"><strong>TOTAL DEDUCTIONS</strong></TableCell>
                          <TableCell align="right"><strong>{formatCurrency(parseFloat(payslip.part1 || 0) + parseFloat(payslip.part2 || 0))}</strong></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Typography variant="h6">NET PAY: {formatCurrency(payslip.netpay)}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  };

  const renderAccountCredited = (data, options) => {
    const bankData = data;
    const filteredData = options?.bank && options.bank !== 'all' 
      ? bankData.filter(item => item.bank_id === options.bank)
      : bankData;
    
    const grandTotal = filteredData.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
    
    return (
      <Box>
        <Box className="report-info" sx={{ mb: 2 }}>
          <Typography><strong>YEAR:</strong> {options?.year}</Typography>
          <Typography><strong>PERIOD:</strong> {options?.period}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Bank</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.employee_name}</TableCell>
                  <TableCell>{item.bank_name}</TableCell>
                  <TableCell>{item.account_number}</TableCell>
                  <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="grand-total" sx={{ mt: 2, textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <Typography>Grand Total: {formatCurrency(grandTotal)}</Typography>
        </Box>
      </Box>
    );
  };

  const renderLoanPayments = (data) => {
    return (
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Loan Type</TableCell>
                <TableCell align="right">Payment Amount</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.employee_name}</TableCell>
                  <TableCell>{item.loan_type}</TableCell>
                  <TableCell align="right">{formatCurrency(item.payment_amount)}</TableCell>
                  <TableCell align="right">{formatCurrency(item.balance)}</TableCell>
                  <TableCell>{new Date(item.payment_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const renderMortuary = (data) => {
    return (
      <Box>
        {data.map((record, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Box sx={{ p: 1, mb: 2, backgroundColor: '#f5f5f5' }}>
              <Typography><strong>Beneficiary:</strong> {record.beneficiary_name}</Typography>
              <Typography><strong>Amount:</strong> {formatCurrency(record.amount)}</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell align="right">Contribution</TableCell>
                    <TableCell>Date Paid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.collections.map((collection, colIndex) => (
                    <TableRow key={colIndex}>
                      <TableCell>{collection.employee_name}</TableCell>
                      <TableCell align="right">{formatCurrency(collection.amount)}</TableCell>
                      <TableCell>{collection.date ? new Date(collection.date).toLocaleDateString() : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    );
  };

  const renderTotalBankSummary = (data, options) => {
    const grandTotal = data.reduce((total, item) => total + parseFloat(item.total_amount || 0), 0);
    
    return (
      <Box>
        <Box className="report-info" sx={{ mb: 2 }}>
          <Typography><strong>YEAR:</strong> {options?.year}</Typography>
          <Typography><strong>PERIOD:</strong> {options?.period}</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank</TableCell>
                <TableCell align="right">Number of Employees</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.bank_name}</TableCell>
                  <TableCell align="right">{item.employee_count}</TableCell>
                  <TableCell align="right">{formatCurrency(item.total_amount)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                <TableCell><strong>TOTAL</strong></TableCell>
                <TableCell align="right">
                  <strong>
                    {data.reduce((total, item) => total + parseInt(item.employee_count || 0), 0)}
                  </strong>
                </TableCell>
                <TableCell align="right"><strong>{formatCurrency(grandTotal)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', pb: 1 }}>
        <Box>
          <Typography variant="h6">Preview Print</Typography>
          <Typography variant="body2" color="textSecondary">Print report</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box ref={printRef} sx={{ mt: 2 }}>
            <Box className="print-header" sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">CDM SECURITY AGENCY, INC.</Typography>
              <Typography variant="body2">Salusoy, Meycauayan City, Bulacan, (044) 840-8145</Typography>
              <Typography variant="h6" sx={{ mt: 2, textTransform: 'uppercase', fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Box>
            
            {renderReportContent()}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ borderTop: '1px solid #ddd', py: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          disabled={loading || !data}
        >
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrintReport; 