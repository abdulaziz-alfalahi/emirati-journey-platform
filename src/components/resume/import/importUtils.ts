
import { ResumeData } from '../types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from '../utils/resumeParser';
import { 
  isEmptyResumeData, 
  validateResumeFileType, 
  validateResumeImageType, 
  validateFileSize, 
  validateLinkedInUrl, 
  sanitizeResumeData 
} from '../utils/helpers/validation';
import { mergeResumeData as mergeResumeDataFromUtils } from '../utils/resumeDataUtils';
import { checkIfScannedPdf, determineParsingStrategy, processPdfForResumeParsing } from '../utils/parsers/pdfUtils';
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
    throw new Error(`File too large. Please upload a file smaller than ${sizeValidation.maxSizeInMB}.`);
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
    try {
      console.log("Processing PDF file to determine parsing strategy");
      const { strategy, shouldUseImageParser } = await processPdfForResumeParsing(file);
      console.log(`Determined PDF parsing strategy: ${strategy}, use image parser: ${shouldUseImageParser}`);
      
      if (shouldUseImageParser) {
        // For scanned PDFs, redirect to image parsing route
        return processResumeImage(file);
      }
    } catch (error) {
      console.error("Error during PDF preprocessing:", error);
      // Continue with standard parsing if preprocessing fails
    }
  }
  
  const startTime = Date.now();
  try {
    const parsedData = await parseResumeFromFile(file);
    const processingTime = Date.now() - startTime;
    
    // Sanitize the data to remove any PDF artifacts
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Validate parsed data
    if (!sanitizedData || isEmptyResumeData(sanitizedData)) {
      if (file.type === 'application/pdf') {
        // If standard parsing fails for PDF, try image parsing as fallback
        toast.info("Attempting image-based extraction", {
          description: "Text extraction failed. Trying image-based extraction as fallback.",
        });
        
        // Add some delay to allow toast to display
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return processResumeImage(file);
      } else {
        throw new Error("Could not extract meaningful data from your resume. Please try a different file format.");
      }
    }

    // Add metadata about sanitization if needed
    if (sanitizedData !== parsedData) {
      sanitizedData.metadata = {
        ...(sanitizedData.metadata || {}),
        sanitized: true,
        sanitizedAt: new Date().toISOString()
      };
    }

    // Check which parsing method was used
    const parsingMethod = sanitizedData.metadata?.parsingMethod || 'unknown';
    const usedFallback = parsingMethod.includes('fallback') || 
                         parsingMethod === 'legacy-regex' || 
                         parsingMethod === 'enhanced-edge' || 
                         parsingMethod === 'ai-edge';
    
    return {
      parsedData: sanitizedData,
      parsingMethod,
      usedFallback,
      processingTime
    };
  } catch (error) {
    console.error("Error in standard file parsing:", error);
    
    // For PDF files that fail with text extraction, try image parsing
    if (file.type === 'application/pdf') {
      toast.info("Trying image-based extraction", {
        description: "Text extraction failed. Trying image-based extraction...",
      });
      
      try {
        // Add some delay to allow toast to display
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return processResumeImage(file);
      } catch (imageError) {
        console.error("Image parsing also failed:", imageError);
        throw new Error("Both text and image extraction methods failed for this PDF. The file may be corrupted or password-protected.");
      }
    }
    
    // Re-throw original error for other file types
    throw error;
  }
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
    throw new Error(`Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}.`);
  }
  
  // PDF special handling
  if (file.type === 'application/pdf') {
    toast.info("PDF Processing", {
      description: "Processing PDF as an image. This may take a moment...",
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
    toast.loading("Processing your resume...", {
      id: "resume-processing",
      duration: 30000 // 30 seconds max
    });
    
    const parsedData = await parseResumeFromImage(file);
    const processingTime = Date.now() - startTime;
    
    toast.dismiss("resume-processing");
    
    // Sanitize the data to remove any PDF artifacts
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Validate parsed data
    if (!sanitizedData || isEmptyResumeData(sanitizedData)) {
      if (file.type === 'application/pdf') {
        toast.error("PDF Processing Failed", {
          description: "Could not extract data from this PDF. The file may be corrupted or password-protected."
        });
        throw new Error("Could not extract meaningful data from your PDF. The file may be corrupted or password-protected.");
      } else {
        toast.error("Image Processing Failed", {
          description: "Could not extract data from this image. Please try a clearer image."
        });
        throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
      }
    }
    
    // Add metadata about sanitization if needed
    if (sanitizedData !== parsedData) {
      sanitizedData.metadata = {
        ...(sanitizedData.metadata || {}),
        sanitized: true,
        sanitizedAt: new Date().toISOString()
      };
    }
    
    toast.success("Resume Processed", {
      description: "Successfully extracted data from your resume."
    });
    
    // Check which parsing method was used
    const parsingMethod = sanitizedData.metadata?.parsingMethod || 'unknown';
    const usedFallback = parsingMethod.includes('fallback');
    
    return {
      parsedData: sanitizedData,
      parsingMethod,
      usedFallback,
      processingTime
    };
  } catch (error) {
    toast.dismiss("resume-processing");
    console.error("Error in image parsing:", error);
    
    // If error includes OpenAI API format error for PDFs, provide clearer guidance
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (file.type === 'application/pdf' && errorMessage.includes('Invalid MIME type')) {
      console.error('PDF format error with OpenAI:', errorMessage);
      
      toast.error("PDF Format Issue", {
        description: "PDF format not directly supported by our AI service. Please convert to JPG/PNG first.",
      });
      
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

// Removing the local sanitizeResumeData function definition since we're importing it
