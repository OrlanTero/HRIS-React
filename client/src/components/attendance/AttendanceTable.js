import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Box, Typography, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, Button, Tooltip,
  CircularProgress, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import HolidayIndicator from './HolidayIndicator';

// Helper function to prevent styled props from being forwarded to DOM elements
const shouldForwardProp = (prop) => {
  return !['isActive', 'isChanged', 'isHoliday', 'isRestDay', 'isSelected'].includes(prop);
};

// Styled cells for the attendance table
const AttendanceCell = styled(TableCell, { shouldForwardProp })(({ theme, isActive, isChanged, isHoliday, isRestDay, isSelected }) => ({
  cursor: 'pointer',
  padding: '4px 8px',
  minWidth: '40px',
  maxWidth: '60px',
  textAlign: 'center',
  border: isSelected 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  backgroundColor: isSelected 
    ? theme.palette.primary.light
    : isChanged 
      ? '#fff9c4' // Light yellow for changed cells
      : isActive 
        ? '#e3f2fd' // Light blue for active cells
        : isHoliday
          ? 'rgba(220, 0, 78, 0.08)' // Light red for holidays
          : isRestDay
            ? 'rgba(76, 175, 80, 0.08)' // Light green for rest days
            : 'inherit',
  '&:hover': {
    backgroundColor: isSelected 
      ? theme.palette.primary.light 
      : theme.palette.action.hover,
  },
  position: 'relative',
  transition: 'background-color 0.2s ease',
  userSelect: 'none', // Prevent text selection
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[100],
  border: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const DayHeaderCell = styled(HeaderCell, { shouldForwardProp })(({ theme, isHoliday, isRestDay }) => ({
  backgroundColor: isHoliday 
    ? 'rgba(220, 0, 78, 0.15)' 
    : isRestDay 
      ? 'rgba(76, 175, 80, 0.15)' 
      : theme.palette.grey[100],
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const TotalCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

const TypeCell = styled(HeaderCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  zIndex: 5,
  backgroundColor: theme.palette.grey[100],
}));

// Create a memoized cell component for better performance
const MemoizedCell = memo(({ 
  day, 
  typeIndex, 
  isEditing,
  attendance, 
  hasChanges, 
  dayHoliday, 
  dayIsRestDay, 
  selected,
  inputValue,
  handleInputChange,
  handleKeyPress,
  handleBlur,
  handleCellClick 
}) => {
  // Log cell rendering for debugging
  // console.log(`Rendering cell day=${day} type=${typeIndex} value=${attendance}`);
  
  return (
    <AttendanceCell 
      key={`${day}-${typeIndex}`}
      onClick={(e) => handleCellClick(day, typeIndex, e)}
      isActive={!!attendance}
      isChanged={hasChanges}
      isHoliday={!!dayHoliday}
      isRestDay={dayIsRestDay}
      isSelected={selected}
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
          inputProps={{ maxLength: 2, type: 'tel' }}
        />
      ) : (
        attendance || ''
      )}
    </AttendanceCell>
  );
}, (prevProps, nextProps) => {
  // Custom equality function to improve performance and ensure updates
  // Return true if props are equal (component shouldn't re-render)
  return (
    prevProps.day === nextProps.day &&
    prevProps.typeIndex === nextProps.typeIndex &&
    prevProps.attendance === nextProps.attendance &&
    prevProps.isEditing === nextProps.isEditing &&
    prevProps.selected === nextProps.selected &&
    prevProps.hasChanges === nextProps.hasChanges &&
    prevProps.dayHoliday === nextProps.dayHoliday &&
    prevProps.dayIsRestDay === nextProps.dayIsRestDay &&
    (prevProps.isEditing ? prevProps.inputValue === nextProps.inputValue : true)
  );
});

const AttendanceTable = ({
  employeeId,
  days,
  attendanceTypes,
  attendanceData,
  onAttendanceChange,
  onRemoveAttendance,
  changes,
  holidays = [],
  employeeRestDays = [],
  holidayDetectionEnabled = true,
  restDayDetectionEnabled = true,
  isLoading = false
}) => {
  const theme = useTheme();
  const [editingCell, setEditingCell] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [rowTotals, setRowTotals] = useState([]);
  const [columnTotals, setColumnTotals] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);
  const [lastSelectedCell, setLastSelectedCell] = useState(null);
  const [restDayConfirmOpen, setRestDayConfirmOpen] = useState(false);
  const [pendingRestDayCell, setPendingRestDayCell] = useState(null);

  // Constants for attendance types
  const REGULAR = 0;
  const REGULAR_OT = 1;
  const SPECIAL_HOLIDAY = 2;
  const LEGAL_HOLIDAY = 3;
  const REST_DAY = 4;
  const LEGAL_HOLIDAY_OT = 5;
  const SPECIAL_HOLIDAY_OT = 6;
  const REST_DAY_OT = 7;
  const NIGHT_DIFF = 8;
  
  // Get day name for a specific day number - Define this early
  const getDayName = useCallback((day) => {
    // Create a date object for the current month to get the day of week
    // Use the current year and month to calculate
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateObj = new Date(year, month, day);
    
    // Get the day of week 
    const dayOfWeek = dateObj.getDay();
    
    // Convert to short day name
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[dayOfWeek];
  }, []);
  
  // Memoize frequently accessed data to improve performance
  const attendanceDataMap = useMemo(() => {
    if (!attendanceData) return {};
    
    // Create a map for quick lookups instead of using find() repeatedly
    const map = {};
    attendanceData.forEach(record => {
      const key = `${record.day}-${record.type}`;
      map[key] = record;
    });
    
    return map;
  }, [attendanceData]);
  
  // Find attendance record for a specific day and type - Optimized with map
  const findAttendanceRecord = useCallback((day, typeIndex) => {
    if (!attendanceDataMap) return null;
    
    const key = `${day}-${typeIndex}`;
    return attendanceDataMap[key] || null;
  }, [attendanceDataMap]);
  
  // Get attendance value for a specific day and type, considering any pending changes
  const getAttendanceValue = useCallback((day, typeIndex) => {
    if (day === undefined || typeIndex === undefined) return null;
    
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
  }, [employeeId, changes, findAttendanceRecord]);
  
  // Memoize the calculateTotals function to prevent unnecessary calculations
  const calculateTotals = useCallback(() => {
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
  }, [attendanceTypes, days, getAttendanceValue]);
  
  // Calculate totals whenever attendance data or changes change
  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);
  
  // Check if a cell has pending changes
  const hasPendingChanges = useCallback((day, typeIndex) => {
    const key = `${employeeId}-${day}-${typeIndex}`;
    return !!changes[key];
  }, [employeeId, changes]);

  // Memoize holiday and rest day lookups for better performance
  const holidayMap = useMemo(() => {
    const map = {};
    if (holidays && holidays.length > 0) {
      holidays.forEach(holiday => {
        map[parseInt(holiday.day)] = holiday;
      });
    }
    return map;
  }, [holidays]);

  const restDaySet = useMemo(() => {
    const set = new Set();
    
    console.log("Processing rest days:", employeeRestDays);
    
    // Handle different rest day formats
    if (employeeRestDays) {
      // First check if it's an array
      if (Array.isArray(employeeRestDays)) {
        console.log("Using direct array of rest days:", employeeRestDays);
        employeeRestDays.forEach(day => {
          if (day && !isNaN(parseInt(day))) {
            set.add(parseInt(day));
          }
        });
      }
      // Next check if it has a restDays array property
      else if (employeeRestDays.restDays && Array.isArray(employeeRestDays.restDays)) {
        console.log("Using restDays array from object:", employeeRestDays.restDays);
        employeeRestDays.restDays.forEach(day => {
          if (day && !isNaN(parseInt(day))) {
            set.add(parseInt(day));
          }
        });
      }
      // Check for individual restDay1, restDay2, etc. properties
      if (typeof employeeRestDays === 'object') {
        console.log("Checking for individual restDay properties");
        
        // Process restDay1 and restDay2 properties specifically
        const processRestDay = (dayName) => {
          if (!employeeRestDays[dayName]) return;
          
          const day = employeeRestDays[dayName];
          console.log(`Found ${dayName}: ${day}`);
          
          // Check if it's a day number or day name
          const dayNum = parseInt(day);
          if (!isNaN(dayNum)) {
            set.add(dayNum);
          } else if (typeof day === 'string') {
            // Handle day names by converting them to numbers in the current month
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            let dayIndex = -1;
            
            // Check for full day name
            dayIndex = dayNames.findIndex(d => d.toLowerCase() === day.toLowerCase());
            // Check for short day name if full name not found
            if (dayIndex === -1) {
              dayIndex = shortDayNames.findIndex(d => d.toLowerCase() === day.toLowerCase());
            }
            
            if (dayIndex !== -1) {
              console.log(`Converted ${day} to day index ${dayIndex}`);
              
              // Find all days in the current month that match this day of week
              const date = new Date();
              const year = date.getFullYear();
              const month = date.getMonth();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              
              for (let i = 1; i <= daysInMonth; i++) {
                const currentDate = new Date(year, month, i);
                const dayOfWeek = currentDate.getDay();
                
                if (dayOfWeek === dayIndex) {
                  console.log(`Adding day ${i} to rest days (${day})`);
                  set.add(i);
                }
              }
            }
          }
        };
        
        // Process restDay1 and restDay2 specifically
        processRestDay('restDay1');
        processRestDay('restDay2');
        
        // Also look for additional restDay properties
        Object.keys(employeeRestDays).forEach(key => {
          if (key.startsWith('restDay') && key !== 'restDay1' && key !== 'restDay2' && key !== 'restDays') {
            processRestDay(key);
          }
        });
      }
    }
    
    console.log("Final rest day set:", Array.from(set));
    return set;
  }, [employeeRestDays]);

  // Check if a day is a holiday - optimized with map
  const isHoliday = useCallback((day) => {
    return holidayMap[parseInt(day)] || null;
  }, [holidayMap]);

  // Check if a day is a rest day - optimized with set
  const isRestDay = useCallback((day) => {
    const dayInt = parseInt(day);
    const result = restDaySet.has(dayInt);
    console.log(`Day ${day} rest day status:`, result);
    return result;
  }, [restDaySet]);

  // Determine if an attendance type is allowed for a specific day
  const isAttendanceTypeAllowed = useCallback((day, typeIndex) => {
    const dayHoliday = isHoliday(day);
    const dayIsRestDay = isRestDay(day);
    
    // Night differential is always allowed
    if (typeIndex === NIGHT_DIFF) return true;
    
    // Check for legal holiday
    if (dayHoliday && dayHoliday.national_local === 'Legal Holiday') {
      // On legal holidays, only legal holiday types and night diff are allowed
      return (
        typeIndex === LEGAL_HOLIDAY || 
        typeIndex === LEGAL_HOLIDAY_OT || 
        typeIndex === NIGHT_DIFF
      );
    }
    
    // Check for special holiday
    if (dayHoliday) {
      // On special holidays, only special holiday types and night diff are allowed
      return (
        typeIndex === SPECIAL_HOLIDAY || 
        typeIndex === SPECIAL_HOLIDAY_OT || 
        typeIndex === NIGHT_DIFF
      );
    }
    
    // Check for rest day
    if (dayIsRestDay) {
      // On rest days, only rest day types and night diff are allowed
      return (
        typeIndex === REST_DAY || 
        typeIndex === REST_DAY_OT || 
        typeIndex === NIGHT_DIFF
      );
    }
    
    // Regular days allow regular types and night diff
    return (
      typeIndex === REGULAR || 
      typeIndex === REGULAR_OT || 
      typeIndex === NIGHT_DIFF
    );
  }, [isHoliday, isRestDay, REGULAR, REGULAR_OT, SPECIAL_HOLIDAY, LEGAL_HOLIDAY, 
      REST_DAY, LEGAL_HOLIDAY_OT, SPECIAL_HOLIDAY_OT, REST_DAY_OT, NIGHT_DIFF]);

  // Memoize selected cells lookup
  const selectedCellsMap = useMemo(() => {
    const map = {};
    selectedCells.forEach(cell => {
      map[`${cell.day}-${cell.typeIndex}`] = true;
    });
    return map;
  }, [selectedCells]);

  // Check if a cell is selected - optimized
  const isCellSelected = useCallback((day, typeIndex) => {
    return !!selectedCellsMap[`${day}-${typeIndex}`];
  }, [selectedCellsMap]);

  // Submit attendance change - moved up to avoid circular dependency
  const handleSubmit = useCallback((day, typeIndex) => {
    const record = findAttendanceRecord(day, typeIndex);
    
    // Check for empty string or zero - both should clear the attendance
    if (inputValue && inputValue !== '0') {
      // If there's a non-zero value, update or add the attendance
      onAttendanceChange(
        employeeId,
        day,
        typeIndex,
        inputValue,
        record ? record.attendance_id : null
      );
    } else {
      // Handle empty value or zero - clear the attendance
      console.log(`Clearing hours for day ${day}, type ${typeIndex} (value: '${inputValue}')`);
      
      // If there's a record, remove it
      if (record) {
        console.log(`Removing existing record with ID: ${record.attendance_id}`);
        onRemoveAttendance(employeeId, day, typeIndex, record.attendance_id);
      } else if (getAttendanceValue(day, typeIndex)) {
        // If there's a pending change but no record yet, we need to clear that change
        // Explicitly use '0' to ensure consistent behavior
        console.log(`Clearing pending change with value: ${getAttendanceValue(day, typeIndex)}`);
        onAttendanceChange(
          employeeId,
          day,
          typeIndex,
          '0',  // Use '0' instead of empty string to ensure clearing
          null
        );
      }
    }
    
    setEditingCell(null);
  }, [findAttendanceRecord, inputValue, onAttendanceChange, onRemoveAttendance, employeeId, getAttendanceValue]);

  // Handle cell click to start editing or select - moved here to avoid circular dependencies
  const handleCellClick = useCallback((day, typeIndex, e) => {
    // If we're editing, finish that first
    if (editingCell) {
      // Save the current editing cell
      const currentEditingCell = editingCell;
      setEditingCell(null);
      
      // Then apply the changes for the current editing cell
      const record = findAttendanceRecord(currentEditingCell.day, currentEditingCell.typeIndex);
      
      if (inputValue) {
        onAttendanceChange(
          employeeId,
          currentEditingCell.day,
          currentEditingCell.typeIndex,
          inputValue,
          record ? record.attendance_id : null
        );
      } else if (record) {
        onRemoveAttendance(employeeId, currentEditingCell.day, currentEditingCell.typeIndex, record.attendance_id);
      }
      
      return;
    }

    const cellData = { day, typeIndex };
    
    // First, check if the attendance type is allowed for this day
    // If not using shift or ctrl keys for selection, prevent editing invalid types
    if (!e || (!e.shiftKey && !e.ctrlKey && !e.metaKey)) {
      if (!isAttendanceTypeAllowed(day, typeIndex)) {
        // Find any existing values for this day to explain why the type is not allowed
        let existingTypes = [];
        let dayType = 'regular day';
        let appropriateTypes = [REGULAR, REGULAR_OT, NIGHT_DIFF];
        
        // Determine day type
        const dayHoliday = isHoliday(day);
        const dayIsRestDay = isRestDay(day);
        
        if (dayHoliday && dayHoliday.national_local === 'Legal Holiday') {
          dayType = 'legal holiday';
          appropriateTypes = [LEGAL_HOLIDAY, LEGAL_HOLIDAY_OT, NIGHT_DIFF];
        } else if (dayHoliday) {
          dayType = 'special holiday';
          appropriateTypes = [SPECIAL_HOLIDAY, SPECIAL_HOLIDAY_OT, NIGHT_DIFF];
        } else if (dayIsRestDay) {
          dayType = 'rest day';
          appropriateTypes = [REST_DAY, REST_DAY_OT, NIGHT_DIFF];
        }
        
        // Check for existing values for this day
        attendanceTypes.forEach((_, idx) => {
          const value = getAttendanceValue(day, idx);
          if (value) {
            existingTypes.push({ type: idx, value });
          }
        });
        
        // Only show alert for direct user interactions, not for shift/ctrl selection
        alert(
          `Cannot enter attendance for "${attendanceTypes[typeIndex]}" on this day (${day}).\n\n` +
          `This is a ${dayType}, which only allows:\n` +
          `${appropriateTypes.map(t => attendanceTypes[t]).join(', ')}\n\n` +
          (existingTypes.length > 0 ? 
            `Current attendance for day ${day}:\n${existingTypes.map(t => `- ${attendanceTypes[t.type]}: ${t.value} hours`).join('\n')}` : 
            '')
        );
        return;
      }
    }
    
    // Check for rest day if it's a regular attendance type and rest day detection is enabled
    if (restDayDetectionEnabled && typeIndex === REGULAR && isRestDay(day)) {
      console.log(`Rest day detected for day ${day}, opening confirmation dialog`);
      setPendingRestDayCell(cellData);
      setRestDayConfirmOpen(true);
      return;
    }

    // Check for holiday if it's a regular attendance type and holiday detection is enabled
    if (holidayDetectionEnabled && (typeIndex === REGULAR || typeIndex === REGULAR_OT) && isHoliday(day)) {
      const holiday = isHoliday(day);
      const isLegalHoliday = holiday.national_local === 'Legal Holiday';
      
      // Automatically move to the appropriate holiday type
      if (typeIndex === REGULAR) {
        // Instead of recursive call, call a different function
        setSelectedCells([{ day, typeIndex: isLegalHoliday ? LEGAL_HOLIDAY : SPECIAL_HOLIDAY }]);
        setLastSelectedCell({ day, typeIndex: isLegalHoliday ? LEGAL_HOLIDAY : SPECIAL_HOLIDAY });
        const newType = isLegalHoliday ? LEGAL_HOLIDAY : SPECIAL_HOLIDAY;
        setEditingCell({ day, typeIndex: newType });
        setInputValue(getAttendanceValue(day, newType) || '');
        return;
      } else if (typeIndex === REGULAR_OT) {
        // Instead of recursive call, call a different function
        setSelectedCells([{ day, typeIndex: isLegalHoliday ? LEGAL_HOLIDAY_OT : SPECIAL_HOLIDAY_OT }]);
        setLastSelectedCell({ day, typeIndex: isLegalHoliday ? LEGAL_HOLIDAY_OT : SPECIAL_HOLIDAY_OT });
        const newType = isLegalHoliday ? LEGAL_HOLIDAY_OT : SPECIAL_HOLIDAY_OT;
        setEditingCell({ day, typeIndex: newType });
        setInputValue(getAttendanceValue(day, newType) || '');
        return;
      }
      return;
    }

    // Multi-selection with Shift key
    if (e && e.shiftKey && lastSelectedCell) {
      // Calculate the range between the last selected cell and this one
      const startDay = Math.min(parseInt(lastSelectedCell.day), parseInt(day));
      const endDay = Math.max(parseInt(lastSelectedCell.day), parseInt(day));
      const startType = Math.min(lastSelectedCell.typeIndex, typeIndex);
      const endType = Math.max(lastSelectedCell.typeIndex, typeIndex);
      
      // Create a new selection with all cells in the range
      const newSelection = [];
      for (let d = startDay; d <= endDay; d++) {
        for (let t = startType; t <= endType; t++) {
          newSelection.push({ day: d, typeIndex: t });
        }
      }
      
      setSelectedCells(newSelection);
      setLastSelectedCell(cellData);
      return;
    }

    // Add to selection with Ctrl/Cmd key
    if (e && (e.ctrlKey || e.metaKey)) {
      setSelectedCells(prev => {
        // If already selected, remove it
        if (isCellSelected(day, typeIndex)) {
          return prev.filter(cell => !(cell.day === day && cell.typeIndex === typeIndex));
        }
        
        // Otherwise add it to selection
        return [...prev, cellData];
      });
      
      setLastSelectedCell(cellData);
      return;
    }

    // Single cell edit (no modifier keys)
    setSelectedCells([cellData]);
    setLastSelectedCell(cellData);
    
    const record = findAttendanceRecord(day, typeIndex);
    const value = getAttendanceValue(day, typeIndex);
    
    setEditingCell(cellData);
    setInputValue(value || '');
  }, [editingCell, lastSelectedCell, findAttendanceRecord, getAttendanceValue, isHoliday, isRestDay, isCellSelected, holidayDetectionEnabled, restDayDetectionEnabled, REGULAR, REGULAR_OT, LEGAL_HOLIDAY, SPECIAL_HOLIDAY, LEGAL_HOLIDAY_OT, SPECIAL_HOLIDAY_OT, REST_DAY, REST_DAY_OT, NIGHT_DIFF, inputValue, onAttendanceChange, onRemoveAttendance, employeeId, isAttendanceTypeAllowed, attendanceTypes]);
  
  // Handle input change in editing cell
  const handleInputChange = useCallback((e) => {
    // Only allow numbers 0-9, max 2 digits (8 is default)
    const value = e.target.value.replace(/[^0-9]/g, '').substring(0, 2);
    
    // Validate the hours input (0-24 range)
    if (value && parseInt(value) > 24) {
      return; // Don't allow values over 24 hours
    }
    
    setInputValue(value);
  }, []);
  
  // Fix handleKeyPress to not depend on handleCellClick
  const handleKeyPress = useCallback((e, day, typeIndex) => {
    // Check if this attendance type is allowed for this day
    if (!isAttendanceTypeAllowed(day, typeIndex)) {
      console.log(`Ignoring key press for disallowed type: day=${day}, type=${typeIndex}`);
      e.preventDefault();
      setEditingCell(null);
      return;
    }
    
    if (e.key === 'Enter') {
      e.preventDefault();
      // For empty value or zero, log this action
      if (!inputValue || inputValue === '0') {
        console.log(`Enter pressed with empty/zero value for day ${day}, type ${typeIndex} - clearing hours`);
      }
      handleSubmit(day, typeIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditingCell(null);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      // For single cell edit or backspace with empty input - clear the value
      if (e.key === 'Delete' || inputValue === '') {
        e.preventDefault();
        setInputValue(''); // Ensure the input is empty
        
        if (selectedCells.length <= 1) {
          // If only one cell is selected, remove its value
          const record = findAttendanceRecord(day, typeIndex);
          if (record) {
            onRemoveAttendance(employeeId, day, typeIndex, record.attendance_id);
            setEditingCell(null);
          } else if (getAttendanceValue(day, typeIndex)) {
            // If there's a pending change but no record, clear the change
            onAttendanceChange(employeeId, day, typeIndex, '0', null);
            setEditingCell(null);
          }
        } else {
          // If multiple cells are selected, clear all of them
          const cellsToClear = [...selectedCells];
          let skippedCells = 0;
          
          cellsToClear.forEach(cell => {
            // Check if this attendance type is allowed for this day
            if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
              skippedCells++;
              return; // Skip this cell
            }
            
            const record = findAttendanceRecord(cell.day, cell.typeIndex);
            if (record) {
              onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
            } else if (getAttendanceValue(cell.day, cell.typeIndex)) {
              onAttendanceChange(employeeId, cell.day, cell.typeIndex, '0', null);
            }
          });
          
          // Provide feedback if cells were skipped
          if (skippedCells > 0) {
            alert(`Skipped clearing ${skippedCells} cells due to attendance type restrictions.`);
          }
          
          setEditingCell(null);
          setSelectedCells([]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      // Get the next cell to edit (next type or next day)
      let nextTypeIndex = typeIndex + 1;
      let nextDay = day;
      
      // If we're at the end of types, move to the next day
      if (nextTypeIndex >= attendanceTypes.length) {
        nextTypeIndex = 0;
        nextDay = days[days.indexOf(day) + 1];
        
        // If we're at the end of days, wrap to the first day
        if (!nextDay) {
          nextDay = days[0];
        }
      }
      
      handleSubmit(day, typeIndex);
      
      // After submitting, focus the next cell - skip invalid types
      setTimeout(() => {
        // Find the next valid type by incrementing until we find a valid one
        let validTypeFound = false;
        let attempts = 0;
        const maxAttempts = attendanceTypes.length * days.length; // Safety to prevent infinite loops
        
        while (!validTypeFound && attempts < maxAttempts) {
          if (isAttendanceTypeAllowed(nextDay, nextTypeIndex)) {
            validTypeFound = true;
          } else {
            // Move to next type
            nextTypeIndex++;
            if (nextTypeIndex >= attendanceTypes.length) {
              nextTypeIndex = 0;
              nextDay = days[days.indexOf(nextDay) + 1];
              if (!nextDay) {
                nextDay = days[0];
              }
            }
          }
          attempts++;
        }
        
        if (validTypeFound) {
          const nextCellData = { day: nextDay, typeIndex: nextTypeIndex };
          
          setSelectedCells([nextCellData]);
          setLastSelectedCell(nextCellData);
          setEditingCell(nextCellData);
          const value = getAttendanceValue(nextDay, nextTypeIndex);
          setInputValue(value || '');
        }
      }, 0);
    }
  }, [days, attendanceTypes, findAttendanceRecord, inputValue, onRemoveAttendance, onAttendanceChange, employeeId, selectedCells, handleSubmit, getAttendanceValue, isAttendanceTypeAllowed]);
  
  // Handle cell blur to submit or cancel editing
  const handleBlur = useCallback((day, typeIndex) => {
    // Check if this attendance type is allowed for this day
    if (!isAttendanceTypeAllowed(day, typeIndex)) {
      console.log(`Ignoring blur for disallowed type: day=${day}, type=${typeIndex}`);
      setEditingCell(null);
      return;
    }
    
    // Always submit changes on blur - don't wait for delay if the field is empty
    if (editingCell && editingCell.day === day && editingCell.typeIndex === typeIndex) {
      if (!inputValue || inputValue === '0') {
        // For empty values or zero, immediately submit to clear attendance
        console.log(`Blur with empty value for day ${day}, type=${typeIndex} - clearing immediately`);
        handleSubmit(day, typeIndex);
      } else {
        // Small delay to allow for other interactions when there's a value
        setTimeout(() => {
          if (editingCell && editingCell.day === day && editingCell.typeIndex === typeIndex) {
            handleSubmit(day, typeIndex);
          }
        }, 100);
      }
    }
  }, [editingCell, handleSubmit, inputValue, isAttendanceTypeAllowed]);

  // Handle rest day confirm dialog
  const handleRestDayConfirm = useCallback((confirmed) => {
    console.log("Rest day confirm dialog result:", confirmed);
    console.log("Pending rest day cell:", pendingRestDayCell);
    setRestDayConfirmOpen(false);
    
    if (confirmed && pendingRestDayCell) {
      console.log("Adding hours to REST_DAY type");
      // Add hours to the Rest Day type
      onAttendanceChange(
        employeeId,
        pendingRestDayCell.day,
        REST_DAY, // Rest Day type
        "8", // Default 8 hours for rest day
        findAttendanceRecord(pendingRestDayCell.day, REST_DAY)?.attendance_id || null
      );
    } else if (!confirmed && pendingRestDayCell) {
      console.log("Continuing with regular input as requested");
      // Continue with regular input as user requested - directly set states
      setSelectedCells([pendingRestDayCell]);
      setLastSelectedCell(pendingRestDayCell);
      setEditingCell(pendingRestDayCell);
      setInputValue(getAttendanceValue(pendingRestDayCell.day, pendingRestDayCell.typeIndex) || '');
    }
    
    setPendingRestDayCell(null);
  }, [pendingRestDayCell, onAttendanceChange, employeeId, REST_DAY, findAttendanceRecord, getAttendanceValue]);
  
  // Memoize the day headers to prevent unnecessary re-renders
  const dayHeaders = useMemo(() => (
    days.map(day => {
      const dayHoliday = isHoliday(day);
      const dayIsRestDay = isRestDay(day);
      const dayName = getDayName(day);
      
      return (
        <Tooltip 
          key={day} 
          title={dayHoliday ? `${dayHoliday.holiday} (Holiday)` : dayIsRestDay ? 'Rest Day' : ''}
          placement="top"
          arrow
        >
          <DayHeaderCell 
            isHoliday={!!dayHoliday} 
            isRestDay={dayIsRestDay}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {dayName}
              </Typography>
              <Typography>
                {day}
              </Typography>
              {(dayHoliday || dayIsRestDay) && 
                <HolidayIndicator 
                  holiday={dayHoliday} 
                  isRestDay={dayIsRestDay && !dayHoliday}
                  variant="dot"
                />
              }
            </Box>
          </DayHeaderCell>
        </Tooltip>
      );
    })
  ), [days, isHoliday, isRestDay, getDayName]);

  // Fix the handleKeyDown function to remove the handleCellClick dependency
  const handleKeyDown = useCallback((e) => {
    // If we're editing a cell, don't handle selection keys
    if (editingCell) return;

    // Escape key clears selection
    if (e.key === 'Escape') {
      setSelectedCells([]);
      return;
    }

    // Ctrl+A to select all cells
    if (e.key.toLowerCase() === 'a' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      console.log("Selecting all cells with Ctrl+A");
      
      // Select all cells
      const allCells = [];
      days.forEach(day => {
        attendanceTypes.forEach((_, typeIndex) => {
          allCells.push({ day, typeIndex });
        });
      });
      setSelectedCells(allCells);
      return;
    }

    // Ctrl+C to copy value to clipboard
    if (e.key.toLowerCase() === 'c' && (e.ctrlKey || e.metaKey) && selectedCells.length > 0) {
      e.preventDefault();
      
      // Get values of selected cells and format as CSV
      const cellValues = selectedCells.map(cell => {
        const value = getAttendanceValue(cell.day, cell.typeIndex);
        return value || '0';
      });
      
      // Create a string representation (can be enhanced for multi-row selections)
      const textToCopy = cellValues.join('\t');
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy)
        .then(() => console.log("Copied to clipboard: ", textToCopy))
        .catch(err => console.error("Failed to copy: ", err));
      
      return;
    }

    // Ctrl+X to cut (copy and then clear)
    if (e.key.toLowerCase() === 'x' && (e.ctrlKey || e.metaKey) && selectedCells.length > 0) {
      e.preventDefault();
      
      // Get values of selected cells and format as CSV
      const cellValues = selectedCells.map(cell => {
        const value = getAttendanceValue(cell.day, cell.typeIndex);
        return value || '0';
      });
      
      // Create a string representation
      const textToCopy = cellValues.join('\t');
      
      // Track statistics for clearing
      let skippedCells = 0;
      let clearedCells = 0;
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log("Cut to clipboard: ", textToCopy);
          
          // Create a copy of the selected cells to avoid modification issues
          const cellsToClear = [...selectedCells];
          
          // Now clear the cells
          cellsToClear.forEach(cell => {
            // Check if this attendance type is allowed for this day
            if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
              console.log(`Skipping cell day=${cell.day}, type=${cell.typeIndex} - attendance type not allowed for this day`);
              skippedCells++;
              return; // Skip this cell
            }
            
            const record = findAttendanceRecord(cell.day, cell.typeIndex);
            if (record) {
              onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
              clearedCells++;
            } else if (getAttendanceValue(cell.day, cell.typeIndex)) {
              onAttendanceChange(employeeId, cell.day, cell.typeIndex, '0', null);
              clearedCells++;
            }
          });
          
          // Provide feedback if cells were skipped
          if (skippedCells > 0) {
            alert(`Copied and cleared ${clearedCells} cells.\nSkipped clearing ${skippedCells} cells due to attendance type restrictions.`);
          }
        })
        .catch(err => console.error("Failed to cut: ", err));
      
      return;
    }

    // Delete or Backspace key clears selected cells
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedCells.length > 0) {
      e.preventDefault();
      
      // Log what we're deleting
      console.log("Deleting multiple cells with keyboard:", selectedCells);
      
      // Create a copy of the selected cells to avoid modification issues
      const cellsToDelete = [...selectedCells];
      
      // Track statistics
      let skippedCells = 0;
      let clearedCells = 0;
      
      // Process each cell
      cellsToDelete.forEach(cell => {
        // Check if this attendance type is allowed for this day
        if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
          console.log(`Skipping cell day=${cell.day}, type=${cell.typeIndex} - attendance type not allowed for this day`);
          skippedCells++;
          return; // Skip this cell
        }
        
        const record = findAttendanceRecord(cell.day, cell.typeIndex);
        const currentValue = getAttendanceValue(cell.day, cell.typeIndex);
        
        if (record) {
          console.log(`Deleting cell: day=${cell.day}, type=${cell.typeIndex}, id=${record.attendance_id}`);
          onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
          clearedCells++;
        } else if (currentValue) {
          console.log(`Clearing pending change: day=${cell.day}, type=${cell.typeIndex}`);
          onAttendanceChange(
            employeeId,
            cell.day,
            cell.typeIndex,
            '0', // Explicitly use '0' instead of empty string to ensure clearing
            null
          );
          clearedCells++;
        } else {
          console.log(`No record found for day=${cell.day}, type=${cell.typeIndex}`);
        }
      });
      
      // Provide feedback if cells were skipped
      if (skippedCells > 0) {
        alert(`Cleared ${clearedCells} cells.\nSkipped ${skippedCells} cells due to attendance type restrictions.`);
      }
      
      // After deleting, clear the selection
      setSelectedCells([]);
      return;
    }

    // Numbers 0-9 apply to all selected cells
    const num = parseInt(e.key);
    if (!isNaN(num) && num >= 0 && num <= 9 && selectedCells.length > 0) {
      e.preventDefault();
      
      console.log(`Setting value ${num} for multiple cells:`, selectedCells);
      
      // Track statistics
      let skippedCells = 0;
      let appliedCells = 0;
      
      // Set the value for all selected cells
      selectedCells.forEach(cell => {
        // Check if this attendance type is allowed for this day
        if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
          console.log(`Skipping cell day=${cell.day}, type=${cell.typeIndex} - attendance type not allowed for this day`);
          skippedCells++;
          return; // Skip this cell
        }
        
        const record = findAttendanceRecord(cell.day, cell.typeIndex);
        if (num === 0) {
          // If zero, remove the attendance
          if (record) {
            onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
            appliedCells++;
          } else if (getAttendanceValue(cell.day, cell.typeIndex)) {
            onAttendanceChange(employeeId, cell.day, cell.typeIndex, '0', null);
            appliedCells++;
          }
        } else {
          // Set the value
          onAttendanceChange(
            employeeId,
            cell.day,
            cell.typeIndex,
            num.toString(),
            record ? record.attendance_id : null
          );
          appliedCells++;
        }
      });
      
      // Provide feedback if cells were skipped
      if (skippedCells > 0) {
        alert(`Applied to ${appliedCells} cells.\nSkipped ${skippedCells} cells due to attendance type restrictions.`);
      }
      
      // Focus on the last selected cell to enter a second digit if needed
      if (lastSelectedCell && num > 0) {
        setTimeout(() => {
          // Only focus if the type is allowed
          if (isAttendanceTypeAllowed(lastSelectedCell.day, lastSelectedCell.typeIndex)) {
            // Instead of calling handleCellClick directly, manually set the states
            const cell = lastSelectedCell;
            setSelectedCells([cell]);
            setEditingCell(cell);
            setInputValue(getAttendanceValue(cell.day, cell.typeIndex) || '');
          } else {
            // If type not allowed, just clear selection
            setSelectedCells([]);
          }
        }, 10);
      } else {
        // If zero or multiple cells, clear selection after setting
        setSelectedCells([]);
      }
      
      return;
    }
  }, [editingCell, selectedCells, lastSelectedCell, employeeId, onRemoveAttendance, onAttendanceChange, findAttendanceRecord, getAttendanceValue, days, attendanceTypes]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {/* Simplified Selection Controls */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button 
          size="small" 
          variant="outlined" 
          startIcon={<span role="img" aria-label="select all">⊞</span>}
          onClick={() => {
            // Select all cells
            const allCells = [];
            days.forEach(day => {
              attendanceTypes.forEach((_, typeIndex) => {
                allCells.push({ day, typeIndex });
              });
            });
            setSelectedCells(allCells);
          }}
        >
          Select All
        </Button>
        
        <Button 
          size="small" 
          variant="outlined" 
          disabled={selectedCells.length === 0}
          startIcon={<span role="img" aria-label="fill">🔢</span>}
          onClick={() => {
            // Ask for a value and apply to all selected cells
            const value = prompt("Enter hours value (0-24):", "8");
            if (value !== null) {
              // Validate input
              const numValue = parseInt(value);
              if (!isNaN(numValue) && numValue >= 0 && numValue <= 24) {
                // Track statistics for user feedback
                let skippedCells = 0;
                let appliedCells = 0;
                
                selectedCells.forEach(cell => {
                  // Check if this attendance type is allowed for this day
                  if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
                    console.log(`Skipping cell day=${cell.day}, type=${cell.typeIndex} - attendance type not allowed for this day`);
                    skippedCells++;
                    return; // Skip this cell
                  }
                  
                  const record = findAttendanceRecord(cell.day, cell.typeIndex);
                  if (numValue === 0) {
                    // If zero, clear the cell
                    if (record) {
                      onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
                      appliedCells++;
                    } else if (getAttendanceValue(cell.day, cell.typeIndex)) {
                      onAttendanceChange(employeeId, cell.day, cell.typeIndex, '0', null);
                      appliedCells++;
                    }
                  } else {
                    // Set the value
                    onAttendanceChange(
                      employeeId,
                      cell.day,
                      cell.typeIndex,
                      numValue.toString(),
                      record ? record.attendance_id : null
                    );
                    appliedCells++;
                  }
                });
                
                // Provide feedback if cells were skipped
                if (skippedCells > 0) {
                  alert(`Applied to ${appliedCells} cells.\nSkipped ${skippedCells} cells due to attendance type restrictions.\n\nNote: Each day type (regular, holiday, rest day) only allows specific attendance types.`);
                }
              } else {
                alert("Please enter a valid number between 0 and 24");
              }
            }
          }}
        >
          Fill Selected
        </Button>
        
        <Button 
          size="small" 
          variant="outlined" 
          disabled={selectedCells.length === 0}
          startIcon={<span role="img" aria-label="clear">🗑️</span>}
          onClick={() => {
            // Clear all selected cells
            console.log("Clear Selected button clicked, cells to clear:", selectedCells);
            
            // Create a copy of selected cells to avoid modification issues during iteration
            const cellsToClear = [...selectedCells];
            
            // Track statistics
            let skippedCells = 0;
            let clearedCells = 0;
            
            cellsToClear.forEach(cell => {
              // Check if this attendance type is allowed for this day
              if (!isAttendanceTypeAllowed(cell.day, cell.typeIndex)) {
                console.log(`Skipping cell day=${cell.day}, type=${cell.typeIndex} - attendance type not allowed for this day`);
                skippedCells++;
                return; // Skip this cell
              }
              
              const record = findAttendanceRecord(cell.day, cell.typeIndex);
              const currentValue = getAttendanceValue(cell.day, cell.typeIndex);
              
              console.log(`Clearing cell: day=${cell.day}, type=${cell.typeIndex}, current value=${currentValue}, has record=${!!record}`);
              
              if (record) {
                // For existing records, use onRemoveAttendance
                console.log(`Removing attendance record with ID: ${record.attendance_id}`);
                onRemoveAttendance(employeeId, cell.day, cell.typeIndex, record.attendance_id);
                clearedCells++;
              } else if (currentValue) {
                // For pending changes (no record yet), send empty string and null ID
                // IMPORTANT: Force this to behave like typing '0' in the field
                console.log(`Clearing pending change with value: ${currentValue}`);
                onAttendanceChange(
                  employeeId,
                  cell.day,
                  cell.typeIndex,
                  '0', // Explicitly use '0' instead of empty string to ensure clearing
                  null
                );
                clearedCells++;
              } else {
                console.log(`Nothing to clear for this cell`);
              }
            });
            
            // Provide feedback if cells were skipped
            if (skippedCells > 0) {
              alert(`Cleared ${clearedCells} cells.\nSkipped ${skippedCells} cells due to attendance type restrictions.`);
            }
            
            // Maintain selection after clearing
            console.log("Values cleared, selection maintained");
          }}
        >
          Clear Selected
        </Button>
        
        <Button 
          size="small" 
          variant="outlined" 
          disabled={selectedCells.length === 0}
          startIcon={<span role="img" aria-label="deselect">✖️</span>}
          onClick={() => setSelectedCells([])}
        >
          Deselect All
        </Button>
      </Box>

      {/* Selection count indicator */}
      {selectedCells.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Chip
            label={`${selectedCells.length} cell${selectedCells.length > 1 ? 's' : ''} selected`}
            color="primary"
            size="small"
            onDelete={() => setSelectedCells([])}
          />
        </Box>
      )}

      <TableContainer 
        component={Paper} 
        sx={{ 
          maxWidth: '100%', 
          overflowX: 'auto',
          maxHeight: '600px', // Add max height for vertical scrolling
          position: 'relative' // Required for the loading overlay
        }}
      >
        {isLoading && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 100
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Table size="small" stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <HeaderCell>Attendance Type</HeaderCell>
              {dayHeaders}
              <HeaderCell>Total</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceTypes.map((type, typeIndex) => (
              <TableRow key={typeIndex} hover>
                <TypeCell>{type}</TypeCell>
                {days.map(day => {
                  const isEditing = editingCell && 
                    editingCell.day === day && 
                    editingCell.typeIndex === typeIndex;
                  
                  const attendance = getAttendanceValue(day, typeIndex);
                  const hasChanges = hasPendingChanges(day, typeIndex);
                  const dayHoliday = isHoliday(day);
                  const dayIsRestDay = isRestDay(day);
                  const selected = isCellSelected(day, typeIndex);
                  
                  return (
                    <MemoizedCell
                      key={`${day}-${typeIndex}`}
                      day={day}
                      typeIndex={typeIndex}
                      isEditing={isEditing}
                      attendance={attendance}
                      hasChanges={hasChanges}
                      dayHoliday={dayHoliday}
                      dayIsRestDay={dayIsRestDay}
                      selected={selected}
                      inputValue={inputValue}
                      handleInputChange={handleInputChange}
                      handleKeyPress={handleKeyPress}
                      handleBlur={handleBlur}
                      handleCellClick={handleCellClick}
                    />
                  );
                })}
                <TotalCell>{rowTotals[typeIndex] || 0}</TotalCell>
              </TableRow>
            ))}
            <TableRow>
              <TypeCell>Daily Total</TypeCell>
              {days.map((day, index) => (
                <TotalCell key={`total-${day}`}>
                  {columnTotals[index] || 0}
                </TotalCell>
              ))}
              <TotalCell>{grandTotal || 0}</TotalCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Legend for indicators */}
      <Box sx={{ display: 'flex', mt: 2, mb: 2, gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HolidayIndicator 
            holiday={{ holiday: "Holiday" }} 
            variant="dot"
            size="small"
          />
          <Typography variant="caption" sx={{ ml: 1 }}>Holiday</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HolidayIndicator 
            isRestDay={true} 
            variant="dot"
            size="small"
          />
          <Typography variant="caption" sx={{ ml: 1 }}>Rest Day</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: '#e3f2fd', mr: 1 }} />
          <Typography variant="caption">Has Hours</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, backgroundColor: '#fff9c4', mr: 1 }} />
          <Typography variant="caption">Changed</Typography>
        </Box>
      </Box>

      {/* Rest Day Confirmation Dialog */}
      <Dialog
        open={restDayConfirmOpen}
        onClose={() => handleRestDayConfirm(false)}
        aria-labelledby="rest-day-confirm-title"
        aria-describedby="rest-day-confirm-description"
      >
        <DialogTitle id="rest-day-confirm-title">
          Rest Day Detected
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="rest-day-confirm-description">
            This day appears to be a rest day for this employee. 
            Would you like to add this as a rest day attendance instead of regular attendance?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRestDayConfirm(false)} color="primary">
            No, Continue with Regular
          </Button>
          <Button onClick={() => handleRestDayConfirm(true)} color="primary" autoFocus>
            Yes, Use Rest Day
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(AttendanceTable, (prevProps, nextProps) => {
  // Custom comparison function to determine if component should update
  return (
    prevProps.days === nextProps.days &&
    prevProps.attendanceTypes === nextProps.attendanceTypes &&
    prevProps.attendanceData === nextProps.attendanceData &&
    prevProps.changes === nextProps.changes &&
    prevProps.holidays === nextProps.holidays &&
    prevProps.employeeRestDays === nextProps.employeeRestDays &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.employeeId === nextProps.employeeId
  );
}); 