import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Box, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled cells for the attendance table
const AttendanceCell = styled(TableCell)(({ theme, isActive, isChanged }) => ({
  cursor: 'pointer',
  padding: '4px 8px',
  minWidth: '40px',
  maxWidth: '50px',
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: isChanged 
    ? '#fff9c4' // Light yellow for changed cells
    : isActive 
      ? '#e3f2fd' // Light blue for active cells
      : 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[100],
  border: `1px solid ${theme.palette.divider}`,
}));

const TotalCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

const AttendanceTable = ({
  employeeId,
  days,
  attendanceTypes,
  attendanceData,
  onAttendanceChange,
  onRemoveAttendance,
  changes
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [rowTotals, setRowTotals] = useState([]);
  const [columnTotals, setColumnTotals] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  
  // Calculate totals whenever attendance data or changes change
  useEffect(() => {
    calculateTotals();
  }, [attendanceData, changes]);
  
  const calculateTotals = () => {
    // Calculate row totals (by type)
    const newRowTotals = attendanceTypes.map((_, typeIndex) => {
      let total = 0;
      
      days.forEach(day => {
        const attendance = getAttendanceValue(day, typeIndex);
        if (attendance) {
          total += parseInt(attendance);
        }
      });
      
      return total;
    });
    
    // Calculate column totals (by day)
    const newColumnTotals = days.map(day => {
      let total = 0;
      
      attendanceTypes.forEach((_, typeIndex) => {
        const attendance = getAttendanceValue(day, typeIndex);
        if (attendance) {
          total += parseInt(attendance);
        }
      });
      
      return total;
    });
    
    // Calculate grand total
    const newGrandTotal = newRowTotals.reduce((sum, value) => sum + value, 0);
    
    setRowTotals(newRowTotals);
    setColumnTotals(newColumnTotals);
    setGrandTotal(newGrandTotal);
  };
  
  // Find attendance record for a specific day and type
  const findAttendanceRecord = (day, typeIndex) => {
    if (!attendanceData) return null;
    
    return attendanceData.find(record => 
      parseInt(record.day) === parseInt(day) && 
      parseInt(record.type) === parseInt(typeIndex)
    );
  };
  
  // Get attendance value for a specific day and type, considering any pending changes
  const getAttendanceValue = (day, typeIndex) => {
    const key = `${employeeId}-${day}-${typeIndex}`;
    const pendingChange = changes[key];
    
    // If there's a pending change, use that value
    if (pendingChange) {
      if (pendingChange.action === 'delete') {
        return null;
      }
      return pendingChange.hours || null;
    }
    
    // Otherwise use the existing data
    const record = findAttendanceRecord(day, typeIndex);
    return record ? record.hours : null;
  };
  
  // Check if a cell has pending changes
  const hasPendingChanges = (day, typeIndex) => {
    const key = `${employeeId}-${day}-${typeIndex}`;
    return !!changes[key];
  };
  
  // Handle cell click to start editing
  const handleCellClick = (day, typeIndex) => {
    const record = findAttendanceRecord(day, typeIndex);
    const value = getAttendanceValue(day, typeIndex);
    
    setEditingCell({ day, typeIndex });
    setInputValue(value || '');
  };
  
  // Handle input change in editing cell
  const handleInputChange = (e) => {
    // Only allow numbers 0-9
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };
  
  // Handle key press in editing cell
  const handleKeyPress = (e, day, typeIndex) => {
    if (e.key === 'Enter') {
      handleSubmit(day, typeIndex);
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (!inputValue) {
        const record = findAttendanceRecord(day, typeIndex);
        if (record) {
          onRemoveAttendance(employeeId, day, typeIndex, record.attendance_id);
          setEditingCell(null);
        }
      }
    }
  };
  
  // Handle cell blur to submit or cancel editing
  const handleBlur = (day, typeIndex) => {
    handleSubmit(day, typeIndex);
  };
  
  // Submit attendance change
  const handleSubmit = (day, typeIndex) => {
    const record = findAttendanceRecord(day, typeIndex);
    
    if (inputValue) {
      onAttendanceChange(
        employeeId,
        day,
        typeIndex,
        inputValue,
        record ? record.attendance_id : null
      );
    } else if (record) {
      onRemoveAttendance(employeeId, day, typeIndex, record.attendance_id);
    }
    
    setEditingCell(null);
  };
  
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table size="small" stickyHeader sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <HeaderCell>Attendance Type</HeaderCell>
            {days.map(day => (
              <HeaderCell key={day}>{day}</HeaderCell>
            ))}
            <HeaderCell>Total</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceTypes.map((type, typeIndex) => (
            <TableRow key={typeIndex} hover>
              <HeaderCell>{type}</HeaderCell>
              {days.map(day => {
                const isEditing = editingCell && 
                  editingCell.day === day && 
                  editingCell.typeIndex === typeIndex;
                
                const attendance = getAttendanceValue(day, typeIndex);
                const hasChanges = hasPendingChanges(day, typeIndex);
                
                return (
                  <AttendanceCell 
                    key={`${day}-${typeIndex}`}
                    onClick={() => handleCellClick(day, typeIndex)}
                    isActive={!!attendance}
                    isChanged={hasChanges}
                  >
                    {isEditing ? (
                      <TextField
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleKeyPress(e, day, typeIndex)}
                        onBlur={() => handleBlur(day, typeIndex)}
                        variant="standard"
                        size="small"
                        sx={{ 
                          width: '30px',
                          '& input': { textAlign: 'center', p: 0 }
                        }}
                        inputProps={{ maxLength: 2 }}
                      />
                    ) : (
                      attendance || ''
                    )}
                  </AttendanceCell>
                );
              })}
              <TotalCell>{rowTotals[typeIndex] || 0}</TotalCell>
            </TableRow>
          ))}
          <TableRow>
            <HeaderCell>Daily Total</HeaderCell>
            {days.map((day, index) => (
              <TotalCell key={`total-${day}`}>
                {columnTotals[index] || 0}
              </TotalCell>
            ))}
            <TotalCell>{grandTotal || 0}</TotalCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          * Click on a cell to set or change attendance hours
        </Typography>
      </Box>
    </TableContainer>
  );
};

export default AttendanceTable; 