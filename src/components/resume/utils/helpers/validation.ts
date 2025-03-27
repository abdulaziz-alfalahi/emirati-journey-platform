
import { ResumeData } from '../../types';

/**
 * Checks if a resume data object is effectively empty
 * @param data Partial ResumeData object to check
 * @returns boolean indicating if the resume data is effectively empty
 */
export const isEmptyResumeData = (data: Partial<ResumeData> | null | undefined): boolean => {
  if (!data) return true;
  
  // Check if personal section has any valid values (not PDF artifacts)
  const hasPersonalData = data.personal && Object.values(data.personal).some(val => 
    val && typeof val === 'string' && val.trim().length > 0 && !val.includes('%PDF')
  );
  
  // Check if any sections have content
  const hasExperience = data.experience && data.experience.length > 0;
  const hasEducation = data.education && data.education.length > 0;
  const hasSkills = data.skills && data.skills.length > 0;
  const hasSummary = data.summary && data.summary.trim().length > 0 && !data.summary.includes('%PDF');
  
  return !hasPersonalData && !hasExperience && !hasEducation && !hasSkills && !hasSummary;
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
    'text/plain'
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
 * Validates image file types for resume parsing
 * @param fileType MIME type of the image file
 * @returns Object with validation result and supported types
 */
export const validateResumeImageType = (fileType: string): { 
  isValid: boolean; 
  supportedTypes: string[];
  isUnsupported: boolean;
} => {
  const supportedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'image/heic',
    'application/pdf'  // Allow PDFs to be processed as images
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
 * Validates file size for resume parsing
 * @param fileSize Size of the file in bytes
 * @param maxSize Maximum allowed size in bytes
 * @returns Object with validation result
 */
export const validateFileSize = (fileSize: number, maxSize: number = 5 * 1024 * 1024): {
  isValid: boolean;
  maxSizeInMB: number;
  fileSizeInMB: number;
} => {
  const isValid = fileSize <= maxSize;
  const maxSizeInMB = maxSize / (1024 * 1024);
  const fileSizeInMB = fileSize / (1024 * 1024);
  
  return {
    isValid,
    maxSizeInMB,
    fileSizeInMB
  };
};

/**
 * Validates LinkedIn URL format
 * @param url LinkedIn profile URL to validate
 * @returns Object with validation result and error message if invalid
 */
export const validateLinkedInUrl = (url: string): {
  isValid: boolean;
  errorMessage?: string;
} => {
  if (!url || !url.trim()) {
    return {
      isValid: false,
      errorMessage: "Please enter your LinkedIn profile URL"
    };
  }
  
  if (!url.includes('linkedin.com/in/')) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile)"
    };
  }
  
  return { isValid: true };
};

/**
 * Checks if content contains PDF artifacts
 * @param content Text content to check
 * @returns Boolean indicating if content contains PDF artifacts
 */
export const containsPdfArtifacts = (content: string): boolean => {
  if (!content) return false;
  
  const pdfArtifacts = [
    '%PDF',
    'endobj',
    'endstream',
    'xref',
    'trailer',
    'startxref',
    '<<', 
    '>>',
    '/Type /Page',
    '/Contents'
  ];
  
  return pdfArtifacts.some(artifact => content.includes(artifact));
};

/**
 * Sanitizes text to remove PDF artifacts
 * @param text Text to sanitize
 * @returns Sanitized text
 */
export const sanitizePdfArtifacts = (text: string): string => {
  if (!text) return '';
  
  // Replace PDF header/trailer content
  return text
    .replace(/%PDF-[\d.]+/g, '')
    .replace(/endobj|endstream|xref|trailer|startxref/g, '')
    .replace(/<<[\s\S]*?>>/g, '')
    .replace(/\b\d+\s+\d+\s+obj\b/g, '')
    .replace(/stream[\s\S]*?endstream/g, '')
    .trim();
};
