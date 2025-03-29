import { ResumeData, Skill } from '../../types';

/**
 * Checks if a resume data object is effectively empty
 * @param data Partial ResumeData object to check
 * @returns boolean indicating if the resume data is effectively empty
 */
export const isEmptyResumeData = (data: Partial<ResumeData> | null | undefined): boolean => {
  if (!data) return true;
  
  // Log the data for debugging
  console.log('Checking if resume data is empty:', JSON.stringify(data, null, 2));
  
  // Check if personal section has any valid values (not PDF artifacts)
  const hasPersonalData = data.personal && Object.values(data.personal).some(val => 
    val && typeof val === 'string' && val.trim().length > 0 && !containsPdfArtifacts(val)
  );
  
  // Check if any sections have content
  const hasExperience = data.experience && data.experience.length > 0;
  const hasEducation = data.education && data.education.length > 0;
  
  // Check skills - handle both formats (array of strings or array of objects)
  const hasSkills = data.skills && data.skills.length > 0 && data.skills.some(skill => {
    if (typeof skill === 'string') {
      return skill.trim().length > 0;
    } else if (typeof skill === 'object' && skill !== null && 'name' in skill) {
      const name = skill.name;
      return typeof name === 'string' && name.trim().length > 0;
    }
    return false;
  });
  
  // Check if summary exists and is not empty
  const hasSummary = data.summary && typeof data.summary === 'string' && 
                    data.summary.trim().length > 0 && !containsPdfArtifacts(data.summary);
  
  // Log validation results for debugging
  console.log('Validation results:', {
    hasPersonalData,
    hasExperience,
    hasEducation,
    hasSkills,
    hasSummary
  });
  
  // Consider data valid if ANY section has content
  return !(hasPersonalData || hasExperience || hasEducation || hasSkills || hasSummary);
};

/**
 * Validates file types for resume parsing
 * @param fileType MIME type of the file
 * @returns Object with validation result and supported types
 */
export const validateResumeFileType = (fileType: string): { 
  isValid: boolean; 
  supportedTypes: string[];
  isUnsupported: boolean;
} => {
  const supportedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/rtf',
    'application/rtf'
  ];
  
  const isValid = supportedTypes.includes(fileType);
  const isUnsupported = !isValid;
  
  return {
    isValid,
    supportedTypes,
    isUnsupported
  };
};

/**
 * Validates image types for resume parsing
 * @param fileType MIME type of the image
 * @returns Object with validation result and supported types
 */
export const validateResumeImageType = (fileType: string): { 
  isValid: boolean; 
  supportedTypes: string[];
  isUnsupported: boolean;
  warning?: string;
} => {
  const supportedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'application/pdf'
  ];
  
  const isValid = supportedTypes.includes(fileType);
  const isUnsupported = !isValid;
  
  let warning: string | undefined;
  
  // Add warnings for specific image formats if needed
  if (fileType === 'image/heic') {
    warning = "HEIC format may have limited compatibility. Consider using JPEG or PNG for best results.";
  }
  
  return {
    isValid,
    supportedTypes,
    isUnsupported,
    warning
  };
};

/**
 * Validates file size
 * @param fileSize Size of the file in bytes
 * @param maxSize Maximum allowed size in bytes
 * @returns Object with validation result and max size in MB
 */
export const validateFileSize = (fileSize: number, maxSize: number): {
  isValid: boolean;
  maxSizeInMB: number;
} => {
  // Ensure maxSize is a valid number
  if (!maxSize || isNaN(maxSize) || maxSize <= 0) {
    maxSize = 10 * 1024 * 1024; // Default to 10MB if invalid
    console.warn('Invalid maxSize provided to validateFileSize, using default 10MB');
  }
  
  // Calculate MB with fixed decimal places
  const maxSizeInMB = parseFloat((maxSize / (1024 * 1024)).toFixed(2));
  
  // Log validation details for debugging
  console.log('File size validation:', {
    fileSize,
    maxSize,
    maxSizeInMB,
    isValid: fileSize <= maxSize
  });
  
  return {
    isValid: fileSize <= maxSize,
    maxSizeInMB
  };
};

/**
 * Checks if text contains PDF artifacts
 * @param text Text to check for PDF artifacts
 * @returns boolean indicating if text contains PDF artifacts
 */
export const containsPdfArtifacts = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  
  // Common PDF artifact patterns
  const pdfArtifactPatterns = [
    /PDF_ARTIFACT_/i,
    /\[\d+\]\s*$/,
    /^\s*\[\d+\]/,
    /\bpage\s+\d+\s+of\s+\d+\b/i,
    /\u0000/,  // Null character
    /\uFFFD/,  // Replacement character
    /\u00A0{3,}/  // Multiple non-breaking spaces
  ];
  
  // Check for unusually long single "words" which are often PDF artifacts
  const hasLongWord = text.split(/\s+/).some(word => word.length > 40);
  
  // Check for patterns
  const hasPatterns = pdfArtifactPatterns.some(pattern => pattern.test(text));
  
  return hasLongWord || hasPatterns;
};

/**
 * Checks if content appears to be a PDF with binary data
 * @param fileContent Content to check
 * @returns boolean indicating if content appears to be a PDF
 */
export const isPdfBinary = (fileContent: string): boolean => {
  if (!fileContent || typeof fileContent !== 'string') return false;
  
  // Check for PDF header
  const isPdfHeader = fileContent.startsWith('%PDF-');
  
  // Check for binary content markers
  const binaryMarkers = ['\u0000', '\u0001', '\u0002', '\u0003'];
  const hasBinaryMarkers = binaryMarkers.some(marker => fileContent.includes(marker));
  
  // Check for image markers vs text markers
  const imageMarkers = ['JFIF', 'PNG', 'GIF', 'JPEG', 'TIFF'];
  const textMarkers = ['DOCTYPE', '<html', '<body', '<div', '<p>', '<span'];
  
  const hasImageMarkers = imageMarkers.some(marker => fileContent.includes(marker));
  const hasTextMarkers = textMarkers.some(marker => fileContent.includes(marker));
  
  const imageMarkerCount = imageMarkers.filter(marker => fileContent.includes(marker)).length;
  const textMarkerCount = textMarkers.filter(marker => fileContent.includes(marker)).length;
  
  // It's likely a PDF binary if:
  return isPdfHeader || 
         // Either it has binary markers
         hasBinaryMarkers || 
         // Or it has more image markers than text markers
         (hasImageMarkers && (!hasTextMarkers || imageMarkerCount > textMarkerCount)) ||
         // Or if it has PDF structure but no text extraction methods
         (fileContent.length > 500 && !hasTextMarkers);
};

/**
 * Sanitizes resume data to remove PDF artifacts
 * @param data Resume data to sanitize
 * @returns Sanitized resume data
 */
export const sanitizeResumeData = (data: Partial<ResumeData>): Partial<ResumeData> => {
  if (!data) return {};
  
  // Log before sanitization
  console.log('Data before sanitization:', JSON.stringify(data, null, 2));
  
  // Make a deep copy to avoid modifying the original
  const sanitized = JSON.parse(JSON.stringify(data));
  
  // Clean personal information fields but be less aggressive
  if (sanitized.personal) {
    Object.keys(sanitized.personal).forEach(key => {
      const value = sanitized.personal[key];
      if (typeof value === 'string') {
        // Only remove obvious PDF artifacts, not all content
        if (containsPdfArtifacts(value)) {
          sanitized.personal[key] = '';
        }
      }
    });
  }
  
  // Clean summary but be less aggressive
  if (typeof sanitized.summary === 'string' && containsPdfArtifacts(sanitized.summary)) {
    sanitized.summary = '';
  }
  
  // Handle skills array - ensure it's in the expected format
  if (sanitized.skills && Array.isArray(sanitized.skills)) {
    sanitized.skills = sanitized.skills.map(skill => {
      // If skill is an object with a name property, keep the object structure
      if (typeof skill === 'object' && skill !== null && 'name' in skill) {
        return skill;
      }
      // If skill is a string, keep it as is
      if (typeof skill === 'string') {
        return skill;
      }
      // Otherwise, convert to empty string
      return '';
    }).filter(skill => {
      // Filter out empty skills
      if (typeof skill === 'string') {
        return skill.trim().length > 0;
      }
      if (typeof skill === 'object' && skill !== null && 'name' in skill) {
        const name = skill.name;
        return typeof name === 'string' && name.trim().length > 0;
      }
      return false;
    });
  }
  
  // Log after sanitization
  console.log('Data after sanitization:', JSON.stringify(sanitized, null, 2));
  
  return sanitized;
};
