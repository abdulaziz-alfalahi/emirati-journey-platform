
// Helper function to convert date strings to YYYY-MM format
export const convertDateToYYYYMM = (dateStr: string): string => {
  try {
    if (!dateStr) return '';
    
    // Handle "Present" or "Current"
    if (/present|current/i.test(dateStr)) return '';
    
    // Check if it's just a year
    const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
    if (yearMatch && dateStr.trim() === yearMatch[0]) {
      return `${yearMatch[0]}-01`; // Default to January for year-only dates
    }
    
    // Try standard Date parsing first
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    }
    
    // Enhanced manual parsing
    const months: Record<string, number> = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11,
      'january': 0, 'february': 1, 'march': 2, 'april': 3, 'june': 5,
      'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
    };
    
    // Try different date formats
    const patterns = [
      // Format: Month Year
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}\b/i,
      // Format: Month. Year
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(19|20)\d{2}\b/i,
      // Format: MM/YYYY or MM-YYYY
      /\b(0?[1-9]|1[0-2])[\/\-](19|20)\d{2}\b/,
      // Format: YYYY/MM or YYYY-MM
      /\b(19|20)\d{2}[\/\-](0?[1-9]|1[0-2])\b/,
      // Format: Full month name Year
      /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(19|20)\d{2}\b/i
    ];
    
    for (const pattern of patterns) {
      const match = dateStr.match(pattern);
      if (match) {
        if (pattern.source.includes('(19|20)\\d{2}[\\/\\-](0?[1-9]|1[0-2])')) {
          // YYYY/MM or YYYY-MM format
          const year = match[1];
          const month = match[2].padStart(2, '0');
          return `${year}-${month}`;
        } else if (pattern.source.includes('(0?[1-9]|1[0-2])[\\/\\-](19|20)')) {
          // MM/YYYY or MM-YYYY format
          const month = match[1].padStart(2, '0');
          const year = match[2];
          return `${year}-${month}`;
        } else {
          // Month name Year format
          const monthStr = match[1].toLowerCase().substring(0, 3);
          const year = match[2];
          const month = months[monthStr];
          if (month !== undefined) {
            return `${year}-${(month + 1).toString().padStart(2, '0')}`;
          }
        }
      }
    }
    
    // Final attempt - just extract year if present
    if (yearMatch) {
      return `${yearMatch[0]}-01`;
    }
    
    return '';
  } catch (error) {
    console.error('Error converting date:', error);
    return '';
  }
};
