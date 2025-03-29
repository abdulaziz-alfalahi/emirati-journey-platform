
import { ResumeData, PersonalInfo } from '../../types';
import { parseResumeFromImage } from '../../utils/parsers/imageParser';
import { 
  isEmptyResumeData, 
  validateResumeImageType, 
  validateFileSize, 
  sanitizeResumeData 
} from '../../utils/helpers/validation';
import { toast } from 'sonner';
import { ProcessedResult } from './processorTypes';
import { processPdfWithPdfJs } from '../../utils/parsers/pdf/pdfJsProcessor';

/**
 * Handle image upload and parsing
 * @param file Image file to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeImage = async (file: File): Promise<ProcessedResult> => {
  // Log file details for debugging
  console.log('Processing resume image:', {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: new Date(file.lastModified).toISOString()
  });

  // Validate file size
  const maxFileSize = 10 * 1024 * 1024; // 10MB limit for images
  const sizeValidation = validateFileSize(file.size, maxFileSize);
  if (!sizeValidation.isValid) {
    const errorMessage = `Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}MB.`;
    toast.error("File Size Error", {
      description: errorMessage,
      duration: 8000
    });
    throw new Error(errorMessage);
  }
  
  // PDF special handling with PDF.js for better text extraction
  if (file.type === 'application/pdf') {
    toast.info("PDF Processing", {
      description: "Processing PDF. This may take a moment...",
    });
    
    try {
      // First try to extract text with PDF.js for better results
      const pdfText = await processPdfWithPdfJs(file);
      
      if (pdfText && pdfText.length > 200) {
        // If we got good text from PDF.js, use our text parsers
        console.log('Successfully extracted text from PDF using PDF.js, length:', pdfText.length);
        
        // Parse the PDF text content using our file parsers
        const { parseFileContent } = await import('../../utils/parsers/fileParserCore');
        const parsedData = await parseFileContent(file, pdfText);
        
        toast.success("PDF Processed", {
          description: "Successfully extracted data from your PDF resume."
        });
        
        return {
          parsedData,
          parsingMethod: 'pdf-js-text-extraction',
          usedFallback: false,
          processingTime: 0
        };
      } else {
        console.log('PDF.js extracted minimal text, falling back to image-based processing');
      }
    } catch (pdfJsError) {
      console.error('PDF.js extraction failed, falling back to image processing:', pdfJsError);
      // Continue with image-based processing as fallback
    }
  } else {
    // Validate image type for non-PDFs
    const typeValidation = validateResumeImageType(file.type);
    if (typeValidation.isUnsupported) {
      const errorMessage = `Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images or a PDF.`;
      toast.error("File Format Error", {
        description: errorMessage,
        duration: 8000
      });
      throw new Error(errorMessage);
    }
  }
  
  const startTime = Date.now();
  try {
    // Increase timeout duration for processing
    toast.loading("Processing your resume...", {
      id: "resume-processing",
      duration: 60000 // Increase to 60 seconds from 30 seconds
    });
    
    // Create a timeout promise to handle long-running processes
    const processingPromise = parseResumeFromImage(file);
    const timeoutPromise = new Promise<Partial<ResumeData>>((_, reject) => {
      setTimeout(() => reject(new Error('Processing timed out after 55 seconds')), 55000);
    });
    
    // Race the processing against the timeout
    const parsedData = await Promise.race([processingPromise, timeoutPromise]);
    const processingTime = Date.now() - startTime;
    
    toast.dismiss("resume-processing");
    
    // Sanitize the data to remove any PDF artifacts
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Validate parsed data with improved error handling
    if (!sanitizedData || isEmptyResumeData(sanitizedData)) {
      console.warn('Extracted data appears empty after sanitization');
      console.log('Original data keys:', Object.keys(parsedData));
      console.log('Sanitized data keys:', Object.keys(sanitizedData));
      
      // Initialize empty PersonalInfo object with required fields
      const emptyPersonalInfo: PersonalInfo = {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      };
      
      // Ensure at least empty structures exist for required fields
      if (!sanitizedData.personal) sanitizedData.personal = emptyPersonalInfo;
      if (!sanitizedData.experience) sanitizedData.experience = [];
      if (!sanitizedData.education) sanitizedData.education = [];
      if (!sanitizedData.skills) sanitizedData.skills = [];
      
      // Show warning toast but continue with empty data
      if (file.type === 'application/pdf') {
        toast.warning("Limited PDF Data", {
          description: "Limited data extracted from this PDF. You may need to fill in details manually.",
          duration: 8000
        });
      } else {
        toast.warning("Limited Image Data", {
          description: "Limited data extracted from this image. You may need to fill in details manually.",
          duration: 8000
        });
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
    
    // Enhanced error handling with more specific messages
    const errorMessage = error instanceof Error ? error.message : String(error);
    let userFriendlyMessage = "Failed to process your resume.";
    let actionSuggestion = "Please try again with a different file.";
    
    // Provide more specific guidance based on error type
    if (errorMessage.includes('timed out')) {
      userFriendlyMessage = "Processing took too long to complete.";
      actionSuggestion = "Try a simpler document or a different format.";
      
      toast.error("Processing Timeout", {
        description: `${userFriendlyMessage} ${actionSuggestion}`,
        duration: 8000
      });
      
      throw new Error(`Resume processing timed out. ${actionSuggestion}`);
    } else if (file.type === 'application/pdf' && errorMessage.includes('Invalid MIME type')) {
      console.error('PDF format error with OpenAI:', errorMessage);
      
      userFriendlyMessage = "PDF format not directly supported by our AI service.";
      actionSuggestion = "Please convert to JPG or PNG first.";
      
      toast.error("PDF Format Issue", {
        description: `${userFriendlyMessage} ${actionSuggestion}`,
        duration: 8000
      });
      
      // Create a descriptive but simplified error for the user
      throw new Error(
        "PDF format not directly supported by our AI image service. We're working on converting PDFs to images automatically. " +
        "For now, please convert your PDF to JPG or PNG before uploading."
      );
    } else if (errorMessage.includes('No meaningful data')) {
      userFriendlyMessage = "The AI couldn't extract information from your document.";
      actionSuggestion = "Try uploading a clearer image with better lighting and contrast.";
      
      toast.error("Data Extraction Failed", {
        description: `${userFriendlyMessage} ${actionSuggestion}`,
        duration: 8000
      });
      
      throw new Error(`${userFriendlyMessage} ${actionSuggestion}`);
    } else if (errorMessage.includes('too large')) {
      // Already handled above, but just in case
      toast.error("File Size Error", {
        description: errorMessage,
        duration: 8000
      });
      throw error;
    }
    
    // Re-throw original error with enhanced message
    toast.error("Resume Processing Error", {
      description: `${userFriendlyMessage} ${actionSuggestion}`,
      duration: 8000
    });
    
    throw error;
  }
};
