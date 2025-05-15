import React from 'react';
import { Box, Chip, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import WeekendIcon from '@mui/icons-material/Weekend';

// Styled components for the indicators
const HolidayChip = styled(Chip)(({ theme, size = 'small' }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  fontSize: size === 'small' ? '10px' : '12px',
  height: size === 'small' ? '20px' : '24px',
}));

const RestDayChip = styled(Chip)(({ theme, size = 'small' }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontSize: size === 'small' ? '10px' : '12px',
  height: size === 'small' ? '20px' : '24px',
}));

const DotIndicator = styled(Box)(({ theme, color }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color === 'holiday' ? theme.palette.error.main : theme.palette.success.main,
  display: 'inline-block',
  marginLeft: '5px',
}));

/**
 * Holiday Indicator component that can display holiday or rest day indicators
 * Can be used in various formats: chip, dot, or text
 */
const HolidayIndicator = ({
  holiday = null,
  isRestDay = false,
  variant = 'chip', // 'chip', 'dot', or 'text'
  size = 'small',    // 'small' or 'medium'
  showLabel = true,  // Whether to show the label text
}) => {
  if (!holiday && !isRestDay) return null;
  
  // For 'dot' variant
  if (variant === 'dot') {
    return (
      <Tooltip 
        title={holiday ? `${holiday.holiday} (Holiday)` : isRestDay ? 'Rest Day' : ''}
        placement="top"
        arrow
      >
        <DotIndicator color={holiday ? 'holiday' : 'restday'} />
      </Tooltip>
    );
  }
  
  // For 'text' variant
  if (variant === 'text') {
    return (
      <Typography 
        variant="caption" 
        color={holiday ? 'error' : 'success'}
        sx={{ display: 'flex', alignItems: 'center', fontSize: size === 'small' ? '0.75rem' : '0.875rem' }}
      >
        {holiday ? (
          <>
            <EventIcon fontSize="inherit" sx={{ mr: 0.5 }} />
            {showLabel && holiday.holiday}
          </>
        ) : (
          <>
            <WeekendIcon fontSize="inherit" sx={{ mr: 0.5 }} />
            {showLabel && 'Rest Day'}
          </>
        )}
      </Typography>
    );
  }
  
  // Default 'chip' variant
  if (holiday) {
    return (
      <HolidayChip 
        size={size}
        label={showLabel ? 'Holiday' : undefined}
        icon={<EventIcon fontSize="small" />}
        title={holiday.holiday}
      />
    );
  } else {
    return (
      <RestDayChip 
        size={size}
        label={showLabel ? 'Rest Day' : undefined}
        icon={<WeekendIcon fontSize="small" />}
      />
    );
  }
};

export default HolidayIndicator; 