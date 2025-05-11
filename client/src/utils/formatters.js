/**
 * Formats a number as currency (Philippine Peso)
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show the PHP symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined) return showSymbol ? '₱0.00' : '0.00';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return showSymbol ? '₱0.00' : '0.00';
  
  const formatter = new Intl.NumberFormat('en-PH', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(numAmount);
};

/**
 * Formats a date string into a readable format
 * @param {string|Date} dateString - The date to format
 * @param {string} type - The format type: 'short', 'medium', or 'long'
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, type = 'medium') => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';
    
    const options = {
      short: { month: 'numeric', day: 'numeric', year: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    
    return date.toLocaleDateString('en-US', options[type] || options.medium);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formats a number with the specified number of decimal places
 * @param {number} value - The number to format
 * @param {number} decimalPlaces - The number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, decimalPlaces = 2) => {
  if (value === null || value === undefined) return '0';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0';
  
  return numValue.toFixed(decimalPlaces);
};

/**
 * Format a number with commas for thousands separators
 * @param {number|string} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatNumberWithCommas = (value) => {
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

/**
 * Convert snake_case to Title Case
 * @param {string} text - The snake_case text to convert
 * @returns {string} - Text in Title Case
 */
export const snakeToTitleCase = (text) => {
  if (!text) return '';
  
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncate text to a specific length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} [length=50] - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  
  if (text.length <= length) return text;
  
  return text.substring(0, length) + '...';
}; 