
import { ResumeData } from '../../types';
import { parseResumeFromFile } from '../../utils/parsers/fileParser';
import { 
  isEmptyResumeData, 
  validateResumeFileType, 
  validateFileSize, 
  sanitizeResumeData 
} from '../../utils/helpers/validation';
import { checkIfScannedPdf, processPdfForResumeParsing } from '../../utils/parsers/pdfUtils';
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
        const { processResumeImage } = await import('./imageProcessor');
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
        
        const { processResumeImage } = await import('./imageProcessor');
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
        
        const { processResumeImage } = await import('./imageProcessor');
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
