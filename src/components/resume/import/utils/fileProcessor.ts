
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
import * as mammoth from 'mammoth';

export interface ProcessedResult {
  parsedData: Partial<ResumeData>;
  parsingMethod: string;
  usedFallback: boolean;
  processingTime?: number;
  error?: string;
}

/**
 * Process Word document as binary data using mammoth.js
 * @param file The DOCX file to process
 * @returns Promise resolving to extracted text
 */
const extractTextFromDocx = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error("Failed to read file");
        }
        
        // Convert the ArrayBuffer to a Uint8Array that mammoth can process
        const arrayBuffer = event.target.result as ArrayBuffer;
        
        // Extract text using mammoth
        const result = await mammoth.extractRawText({ arrayBuffer });
        console.log("Mammoth extraction result:", result);
        
        if (!result.value) {
          throw new Error("No text content extracted from DOCX");
        }
        
        resolve(result.value);
      } catch (error) {
        console.error("Error extracting text from DOCX:", error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error("File reading error:", error);
      reject(new Error("Failed to read DOCX file"));
    };
    
    // Read the file as an ArrayBuffer for binary processing
    reader.readAsArrayBuffer(file);
  });
};

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
  
  const startTime = Date.now();
  
  // Special handling for DOCX files
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      file.name.toLowerCase().endsWith('.docx')) {
    console.log("Processing DOCX file with mammoth");
    try {
      // Extract text from binary DOCX using mammoth
      const docxText = await extractTextFromDocx(file);
      console.log("Extracted text from DOCX:", docxText.substring(0, 200) + "...");
      
      if (!docxText || docxText.length < 50) {
        throw new Error("Insufficient text content extracted from Word document");
      }
      
      // Use the resume parsers with the extracted text
      const { parseResumeFromContent } = await import('../../utils/resumeContentParser');
      const parsedData = parseResumeFromContent(docxText, "text/plain");
      
      const processingTime = Date.now() - startTime;
      
      // Add metadata
      parsedData.metadata = {
        ...(parsedData.metadata || {}),
        fileType: file.type,
        fileSize: file.size,
        processingTime,
        parsingMethod: 'mammoth-docx-extraction'
      };
      
      return {
        parsedData: sanitizeResumeData(parsedData),
        parsingMethod: 'mammoth-docx-extraction',
        usedFallback: false,
        processingTime
      };
    } catch (docxError) {
      console.error("Mammoth DOCX extraction failed:", docxError);
      toast.error("Word Document Processing Failed", {
        description: "Unable to process the Word document. Please save as PDF and try again.",
      });
      
      throw new Error(
        docxError instanceof Error 
          ? docxError.message 
          : "Failed to process Word document. Please save as PDF and try again."
      );
    }
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
