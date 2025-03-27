
import { ResumeData } from '../types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from '../utils/resumeParser';
import { isEmptyResumeData, validateResumeFileType, validateResumeImageType, validateFileSize, validateLinkedInUrl } from '../utils/helpers/validation';
import { mergeResumeData as mergeResumeDataFromUtils } from '../utils/resumeDataUtils';
import { toast } from 'sonner';

export interface ProcessedResult {
  parsedData: Partial<ResumeData>;
  parsingMethod: string;
  usedFallback: boolean;
  processingTime?: number;
  error?: string;
}

/**
 * Handle file upload and parsing
 * @param file File to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeFile = async (file: File): Promise<ProcessedResult> => {
  // Validate file size
  const sizeValidation = validateFileSize(file.size);
  if (!sizeValidation.isValid) {
    throw new Error(`File too large. Please upload a file smaller than ${sizeValidation.maxSizeInMB}MB.`);
  }
  
  // Validate file type
  const typeValidation = validateResumeFileType(file.type);
  if (typeValidation.isUnsupported) {
    toast.warning("Unsupported file type", {
      description: `For best results, use ${typeValidation.supportedTypes.join(', ')} files.`,
    });
  }
  
  // Quick pre-check for PDFs
  if (file.type === 'application/pdf') {
    const isLikelyScanned = await checkIfScannedPdf(file);
    if (isLikelyScanned) {
      throw new Error("This appears to be a scanned PDF without extractable text. Please use the Image Upload option instead.");
    }
  }
  
  const startTime = Date.now();
  const parsedData = await parseResumeFromFile(file);
  const processingTime = Date.now() - startTime;
  
  // Validate parsed data
  if (!parsedData || isEmptyResumeData(parsedData)) {
    throw new Error("Could not extract meaningful data from your resume. Please try a different file.");
  }

  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedFallback = parsingMethod === 'legacy-regex' || parsingMethod === 'enhanced-edge' || parsingMethod === 'ai-edge';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback,
    processingTime
  };
};

/**
 * Handle image upload and parsing
 * @param file Image file to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeImage = async (file: File): Promise<ProcessedResult> => {
  // Validate file size
  const sizeValidation = validateFileSize(file.size, 10 * 1024 * 1024); // 10MB limit for images
  if (!sizeValidation.isValid) {
    throw new Error(`Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}MB.`);
  }
  
  // Validate image type
  const typeValidation = validateResumeImageType(file.type);
  if (typeValidation.isUnsupported) {
    throw new Error(`Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images.`);
  }
  
  const startTime = Date.now();
  const parsedData = await parseResumeFromImage(file);
  const processingTime = Date.now() - startTime;
  
  // Validate parsed data
  if (!parsedData || isEmptyResumeData(parsedData)) {
    throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
  }
  
  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedFallback = parsingMethod === 'image-fallback';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback,
    processingTime
  };
};

/**
 * Process LinkedIn profile import
 * @param linkedInUrl LinkedIn profile URL
 * @returns Promise resolving to processed LinkedIn data
 */
export const processLinkedInProfile = async (linkedInUrl: string): Promise<ProcessedResult> => {
  // Validate LinkedIn URL
  const urlValidation = validateLinkedInUrl(linkedInUrl);
  if (!urlValidation.isValid) {
    throw new Error(urlValidation.errorMessage || "Invalid LinkedIn URL");
  }

  const startTime = Date.now();
  const linkedInData = await importFromLinkedIn(linkedInUrl);
  const processingTime = Date.now() - startTime;
  
  return {
    parsedData: linkedInData,
    parsingMethod: linkedInData.metadata?.parsingMethod || 'linkedin-import',
    usedFallback: false,
    processingTime
  };
};

/**
 * Merge resume data with better validation
 * @param currentData Current resume data
 * @param parsedData New parsed data to merge
 * @returns Merged resume data
 */
export const mergeResumeData = (currentData: ResumeData, parsedData: Partial<ResumeData>): ResumeData => {
  // Sanitize data before merging
  const sanitizedData = sanitizeResumeData(parsedData);
  
  // Use the utility function for the actual merging
  return mergeResumeDataFromUtils(currentData, sanitizedData);
};

/**
 * Helper function to sanitize parsed resume data
 * @param data Resume data to sanitize
 * @returns Sanitized resume data
 */
const sanitizeResumeData = (data: Partial<ResumeData>): Partial<ResumeData> => {
  if (!data) return {};
  
  // Make a deep copy to avoid modifying the original
  const sanitizedData = JSON.parse(JSON.stringify(data));
  
  // Check for PDF artifacts in personal info
  if (sanitizedData.personal) {
    // Check if name contains PDF artifacts
    if (sanitizedData.personal.fullName && 
        (sanitizedData.personal.fullName.includes('%PDF') || 
         sanitizedData.personal.fullName.startsWith('PDF'))) {
      sanitizedData.personal.fullName = '';
    }
    
    // Check other personal fields for artifacts
    Object.keys(sanitizedData.personal).forEach(key => {
      const value = sanitizedData.personal[key];
      if (typeof value === 'string' && 
          (value.includes('%PDF') || 
           value.includes('endobj') || 
           value.includes('xref'))) {
        sanitizedData.personal[key] = '';
      }
    });
  }
  
  return sanitizedData;
};

/**
 * Helper function to check if a PDF is likely scanned
 * @param file PDF file to check
 * @returns Promise resolving to boolean indicating if the PDF is likely scanned
 */
const checkIfScannedPdf = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        resolve(false);
        return;
      }
      
      // Check if content has PDF header
      if (!content.startsWith('%PDF')) {
        resolve(false);
        return;
      }
      
      // Check for text extraction markers
      const hasTextContent = content.includes('/Text') || 
                             content.includes('/Font') || 
                             content.includes('/Contents');
      
      // Check for image indicators
      const hasImageContent = content.includes('/Image') && 
                              content.includes('/XObject');
      
      // Check text to PDF marker ratio
      const textMarkers = (content.match(/\/Text/g) || []).length + 
                          (content.match(/\/Font/g) || []).length;
      const imageMarkers = (content.match(/\/Image/g) || []).length;
      
      // If there are significantly more image markers than text markers
      const isLikelyScanned = hasImageContent && 
                             (!hasTextContent || imageMarkers > textMarkers * 2);
      
      resolve(isLikelyScanned);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read just the first 5KB to check header and markers
    const blob = file.slice(0, 5 * 1024);
    reader.readAsText(blob);
  });
};
