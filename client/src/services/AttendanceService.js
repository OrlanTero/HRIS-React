import axios from 'axios';

/**
 * Service for handling attendance-related operations including holidays and rest days
 */
class AttendanceService {
  constructor() {
    // Cache for previously fetched data to improve performance
    this.holidayCache = {};
    this.restDayCache = {};
  }

  /**
   * Get holidays for a specific client, year, and month
   * @param {number} clientId - The client ID
   * @param {number} year - The year
   * @param {string} month - The month name (January, February, etc.)
   * @returns {Promise<Array>} - Array of holidays
   */
  async getHolidays(clientId, year, month) {
    // Check cache first
    const cacheKey = `${clientId}-${year}-${month}`;
    if (this.holidayCache[cacheKey]) {
      return [...this.holidayCache[cacheKey]]; // Return a copy of cached data
    }

    try {
      const response = await axios.get(
        `/api/holidays/client/${clientId}/year/${year}/month/${month}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      const holidays = response.data.map(holiday => ({
        day: parseInt(holiday.day),
        holiday: holiday.holiday || holiday.name,
        national_local: holiday.national_local || holiday.type, // Legal Holiday or Special Holiday
        holiday_date: holiday.holiday_date || holiday.date,
        holiday_id: holiday.holiday_id
      }));

      // Cache the result
      this.holidayCache[cacheKey] = holidays;
      
      return holidays;
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return [];
    }
  }

  /**
   * Get rest days for a specific employee
   * @param {number} employeeId - The employee ID
   * @returns {Promise<Object>} - Rest day information
   */
  async getEmployeeRestDays(employeeId) {
    // Check cache first
    if (this.restDayCache[employeeId]) {
      return {...this.restDayCache[employeeId]}; // Return a copy of cached data
    }

    try {
      const response = await axios.get(
        `/api/employments/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Get the active employment
      const activeEmployment = response.data.find(emp => emp.active === 1) || response.data[0];
      
      if (!activeEmployment) {
        return {
          restDay1: null,
          restDay2: null,
          restDays: []
        };
      }
      
      // Map rest days to actual days in all months (for entire year)
      const restDays = [];
      const currentYear = new Date().getFullYear();
      for (let month = 0; month < 12; month++) {
        const monthName = this.getMonthName(month);
        const daysInMonth = this.getDaysInMonth(monthName, currentYear);
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(currentYear, month, day);
          const dayOfWeek = date.getDay();
          
          // Get rest day numbers (0 = Sunday, 1 = Monday, etc.)
          const restDay1Num = activeEmployment.rest_day_1 ? this.getDayNumber(activeEmployment.rest_day_1) : -1;
          const restDay2Num = activeEmployment.rest_day_2 ? this.getDayNumber(activeEmployment.rest_day_2) : -1;
          
          if (dayOfWeek === restDay1Num || dayOfWeek === restDay2Num) {
            restDays.push(day);
          }
        }
      }
      
      // Create result object
      const result = {
        restDay1: activeEmployment.rest_day_1,
        restDay2: activeEmployment.rest_day_2,
        restDays: restDays
      };
      
      // Cache the result
      this.restDayCache[employeeId] = result;
      
      return result;
    } catch (error) {
      console.error('Error fetching employee rest days:', error);
      return {
        restDay1: null,
        restDay2: null,
        restDays: []
      };
    }
  }

  /**
   * Get day number from day name (0 = Sunday, 1 = Monday, etc.)
   * @param {string} dayName - Name of the day
   * @returns {number} - Day number
   */
  getDayNumber(dayName) {
    const dayMap = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    
    return dayMap[dayName] || -1;
  }

  /**
   * Get month name from month number (0-11)
   * @param {number} monthNumber - Month number (0-11)
   * @returns {string} - Month name
   */
  getMonthName(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months[monthNumber] || 'January';
  }

  /**
   * Get the number of days in a month
   * @param {string} month - Month name
   * @param {number} year - Year
   * @returns {number} - Number of days in the month
   */
  getDaysInMonth(month, year) {
    const monthNum = this.getMonthNumber(month);
    return new Date(year, monthNum + 1, 0).getDate();
  }

  /**
   * Convert month name to month number (0-11)
   * @param {string} month - Month name
   * @returns {number} - Month number (0-11)
   */
  getMonthNumber(month) {
    const monthMap = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11
    };
    
    return monthMap[month] || 0;
  }

  /**
   * Extract month and year from a period string
   * @param {string} period - Period string (e.g., "January 1 to 15")
   * @returns {Object} - Month and year information
   */
  getPeriodInfo(period) {
    if (!period) return { month: 'January', startDay: 1, endDay: 31 };
    
    const parts = period.split(' ');
    const month = parts[0];
    
    return {
      month,
      startDay: parseInt(parts[1]),
      endDay: parseInt(parts[3])
    };
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.holidayCache = {};
    this.restDayCache = {};
  }
}

export default new AttendanceService(); 