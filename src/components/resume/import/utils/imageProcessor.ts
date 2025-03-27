
import { ResumeData } from '../../types';
import { parseResumeFromImage } from '../../utils/parsers/imageParser';
import { 
  isEmptyResumeData, 
  validateResumeImageType, 
  validateFileSize, 
  sanitizeResumeData 
} from '../../utils/helpers/validation';
import { toast } from 'sonner';
import { ProcessedResult } from './fileProcessor';

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
