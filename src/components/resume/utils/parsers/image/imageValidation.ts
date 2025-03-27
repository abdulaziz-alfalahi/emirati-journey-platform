
import { ParsingError } from '../../resumeParser';
import { validateResumeImageType, validateFileSize } from '../../helpers/validation';

/**
 * Validate image file before processing
 * @param file Image file to validate
 * @returns Object with validation result
 */
export const validateImageFile = (file: File): { 
  isValid: boolean; 
  error?: ParsingError;
  isPdf: boolean;
  fileTypeWarning?: string | null;
} => {
  // Validate file size
  const sizeValidation = validateFileSize(file.size, 10 * 1024 * 1024); // 10MB limit for images
  if (!sizeValidation.isValid) {
    const error = new Error(`Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}MB.`) as ParsingError;
    error.code = 'IMAGE_TOO_LARGE';
    error.details = sizeValidation;
    error.parserType = 'image';
    return { isValid: false, error, isPdf: false };
  }
  
  const isPdf = file.type === 'application/pdf';
  let fileTypeWarning = null;
  
  // Only validate image type for non-PDFs
  if (!isPdf) {
    // Validate image type
    const typeValidation = validateResumeImageType(file.type);
    
    if (typeValidation.isUnsupported) {
      const error = new Error(`Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images.`) as ParsingError;
      error.code = 'UNSUPPORTED_IMAGE_FORMAT';
      error.details = typeValidation;
      error.parserType = 'image';
      return { isValid: false, error, isPdf: false };
    }
    
    // Check if there are any format-specific warnings to display
    // (If validateResumeImageType doesn't return a warning property, we'll skip this)
    if (typeof (typeValidation as any).warning === 'string' && (typeValidation as any).warning) {
      fileTypeWarning = (typeValidation as any).warning;
    }
  }
  
  return { isValid: true, isPdf, fileTypeWarning };
};
