/**
 * Format a number as currency (PHP)
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') {
    return '₱0.00';
  }
  
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  }).format(numberValue);
};

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a number with commas for thousands separators
 * @param {number|string} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return '0';
  }
  
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return new Intl.NumberFormat('en').format(numberValue);
};

/**
 * Format hours to display hours and minutes
 * @param {number|string} hours - The hours to format
 * @returns {string} Formatted hours string
 */
export const formatHours = (hours) => {
  if (hours === null || hours === undefined || hours === '') {
    return '0h';
  }
  
  const hoursValue = typeof hours === 'string' ? parseFloat(hours) : hours;
  const wholeHours = Math.floor(hoursValue);
  const minutes = Math.round((hoursValue - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  }
  
  return `${wholeHours}h ${minutes}m`;
};

/**
 * Format a period string (e.g., "January 1 to 15")
 * @param {string} period - The period string
 * @returns {string} Formatted period string
 */
export const formatPeriod = (period) => {
  if (!period) return '';
  
  // Already in the right format
  if (period.includes(' to ')) {
    return period;
  }
  
  // Handle other formats if needed
  return period;
}; 