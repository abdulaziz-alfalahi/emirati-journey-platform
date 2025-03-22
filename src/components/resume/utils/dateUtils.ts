
// Helper function to convert date strings to YYYY-MM format
export const convertDateToYYYYMM = (dateStr: string): string => {
  try {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      // Try to parse manually
      const months: Record<string, number> = {
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
      };
      
      const parts = dateStr.toLowerCase().match(/([a-z]+)[^\d]*(\d{4})/);
      if (parts && parts[1] && parts[2]) {
        const month = months[parts[1].substring(0, 3)];
        const year = parseInt(parts[2]);
        if (month !== undefined && !isNaN(year)) {
          return `${year}-${(month + 1).toString().padStart(2, '0')}`;
        }
      }
      
      // If we can't parse, return the year if present
      const yearMatch = dateStr.match(/\d{4}/);
      if (yearMatch) {
        return `${yearMatch[0]}-01`;
      }
      
      return '';
    }
    
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  } catch (error) {
    console.error('Error converting date:', error);
    return '';
  }
};
