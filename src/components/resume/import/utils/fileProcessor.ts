
import { ResumeData } from '../../types';
import { parseResumeFromFile } from '../../utils/parsers/fileParser';
import { sanitizeResumeData } from '../../utils/helpers/validation';
import { checkIfScannedPdf, processPdfForResumeParsing } from '../../utils/parsers/pdfUtils';
import { toast } from 'sonner';
import { ProcessedResult } from './processorTypes';
import { processDocxFile } from './docxProcessor';
import { validateResumeFile, isDocxFile, isPdfFile } from './fileValidators';

/**
 * Handle file upload and parsing
 * @param file File to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeFile = async (file: File): Promise<ProcessedResult> => {
  // Validate the file first
  const validation = validateResumeFile(file);
  if (!validation.isValid) {
    throw new Error(validation.errorMessage);
  }
  
  const startTime = Date.now();
  
  // Special handling for DOCX files using mammoth.js
  if (isDocxFile(file)) {
    return processDocxFile(file);
  }
  
  // PDF-specific pre-checks
  if (isPdfFile(file)) {
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
  
  try {
    const parsedData = await parseResumeFromFile(file);
    const processingTime = Date.now() - startTime;
    
    // Sanitize the data to remove any PDF artifacts
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Validate parsed data
    if (!sanitizedData || Object.keys(sanitizedData).length === 0) {
      if (isPdfFile(file)) {
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
    if (isPdfFile(file)) {
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
