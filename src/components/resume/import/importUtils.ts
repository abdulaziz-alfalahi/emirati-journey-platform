
import { ResumeData } from '../types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from '../utils/resumeParser';
import { isEmptyResumeData, validateResumeFileType, validateResumeImageType, validateFileSize, validateLinkedInUrl, isLikelyScannedPdf } from '../utils/helpers/validation';
import { mergeResumeData as mergeResumeDataFromUtils } from '../utils/resumeDataUtils';
import { checkIfScannedPdf, determineParsingStrategy } from '../utils/parsers/pdfUtils';
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
  
  // PDF-specific pre-checks
  if (file.type === 'application/pdf') {
    const parsingStrategy = await determineParsingStrategy(file);
    console.log(`Determined PDF parsing strategy: ${parsingStrategy}`);
    
    if (parsingStrategy === 'image') {
      throw new Error("This appears to be a scanned PDF without extractable text. Please use the Image Upload option instead for better results.");
    } else if (parsingStrategy === 'dual') {
      toast.info("PDF Processing", {
        description: "This PDF contains scanned images with OCR text. For best results, try both text and image parsing options.",
      });
    }
  }
  
  const startTime = Date.now();
  const parsedData = await parseResumeFromFile(file);
  const processingTime = Date.now() - startTime;
  
  // Validate parsed data
  if (!parsedData || isEmptyResumeData(parsedData)) {
    throw new Error("Could not extract meaningful data from your resume. Please try a different file or the Image Upload option.");
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
  
  // PDF special handling
  if (file.type === 'application/pdf') {
    toast.info("PDF Processing", {
      description: "Converting PDF to images for processing. This may take a moment...",
    });
  } else {
    // Validate image type for non-PDFs
    const typeValidation = validateResumeImageType(file.type);
    if (typeValidation.isUnsupported) {
      throw new Error(`Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images or a PDF.`);
    }
  }
  
  const startTime = Date.now();
  try {
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
  } catch (error) {
    // If error includes OpenAI API format error for PDFs, provide clearer guidance
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (file.type === 'application/pdf' && errorMessage.includes('Invalid MIME type')) {
      console.error('PDF format error with OpenAI:', errorMessage);
      
      // Create a descriptive but simplified error for the user
      throw new Error(
        "PDF format not directly supported by our AI image service. We're working on converting PDFs to images automatically. " +
        "For now, please convert your PDF to JPG or PNG before uploading."
      );
    }
    
    // Re-throw original error
    throw error;
  }
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
