
/**
 * Resume image parser utility for extracting data from uploaded image files
 */
import { ResumeData } from '../../types';
import { ParsingError } from '../resumeParser';
import { toast } from 'sonner';

// Import refactored modules
import { validateImageFile } from './image/imageValidation';
import { processWithEdgeFunction } from './image/edgeFunctionProcessor';
import { processPdfWithTextFallback } from './image/pdfProcessor';
import { createFallbackResumeData } from './image/fallbackProcessor';

/**
 * Parse resume from image file
 * @param file Image file to parse
 * @returns Promise resolving to parsed resume data
 */
export const parseResumeFromImage = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    // Validate image file
    const validation = validateImageFile(file);
    
    if (!validation.isValid) {
      reject(validation.error);
      return;
    }
    
    const isPdf = validation.isPdf;
    
    // Handle PDF special case
    if (isPdf) {
      toast.info("PDF Processing", {
        description: "Processing PDF as an image. This may take a moment...",
      });
    } else if (validation.fileTypeWarning) {
      toast.warning("Image Format", {
        description: validation.fileTypeWarning,
      });
    }
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        
        if (!imageData) {
          const error = new Error('Could not read image data') as ParsingError;
          error.code = 'EMPTY_IMAGE_DATA';
          error.parserType = 'image';
          reject(error);
          return;
        }
        
        const startTime = Date.now();
        
        try {
          toast.loading("Processing your resume...", {
            id: "resume-processing",
            duration: 30000 // 30 seconds max
          });
          
          // Process with edge function
          const { parsedData, success, error } = await processWithEdgeFunction(imageData, file, startTime);
          
          toast.dismiss("resume-processing");
          
          if (success && Object.keys(parsedData).length > 0) {
            toast.success("Resume Processed", {
              description: "Successfully extracted data from your resume."
            });
            resolve(parsedData);
            return;
          }
          
          // If edge function fails and it's a PDF, try text fallback
          if (!success && isPdf) {
            const pdfResult = await processPdfWithTextFallback(file, startTime);
            
            if (pdfResult.success && Object.keys(pdfResult.parsedData).length > 0) {
              toast.success("Resume Processed", {
                description: "Successfully extracted data from your PDF using text mode."
              });
              resolve(pdfResult.parsedData);
              return;
            }
          }
          
          // If all else fails, create basic fallback structure
          console.warn('Falling back to basic structure due to extraction failures');
          
          if (isPdf) {
            toast.error("PDF Processing Failed", {
              description: "Could not extract data from this PDF. The file may be corrupted or password-protected."
            });
          } else {
            toast.error("Image Processing Failed", {
              description: "Could not extract data from this image. Please try a clearer image."
            });
          }
          
          const fallbackData = createFallbackResumeData(
            file, 
            error || new Error('Processing failed'), 
            startTime
          );
          
          resolve(fallbackData);
          
        } catch (error) {
          toast.dismiss("resume-processing");
          console.error('Error processing resume image:', error);
          
          // Special handling for PDF upload errors
          if (isPdf && error instanceof Error && error.message.includes('Invalid MIME type')) {
            toast.error("PDF Format Not Supported", {
              description: "Our AI vision service doesn't accept PDFs directly. Please convert your PDF to JPG or PNG first.",
            });
            
            const pdfError = new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.") as ParsingError;
            pdfError.code = 'PDF_FORMAT_NOT_SUPPORTED';
            pdfError.parserType = 'image';
            reject(pdfError);
            return;
          }
          
          const parsingError = new Error('Failed to process resume image. Please try again with a different file.') as ParsingError;
          parsingError.code = 'IMAGE_PROCESSING_FAILED';
          parsingError.details = {
            originalError: error instanceof Error ? error.message : String(error),
            fileType: file.type
          };
          parsingError.parserType = 'image';
          
          reject(parsingError);
        }
      } catch (error) {
        console.error('Error processing resume image:', error);
        
        const parsingError = new Error('Failed to process resume image. Please try again with a different file.') as ParsingError;
        parsingError.code = 'IMAGE_PROCESSING_FAILED';
        parsingError.details = {
          originalError: error instanceof Error ? error.message : String(error),
          fileType: file.type
        };
        parsingError.parserType = 'image';
        
        reject(parsingError);
      }
    };
    
    reader.onerror = () => {
      const error = new Error('Error reading image file. Please try again.') as ParsingError;
      error.code = 'IMAGE_READ_ERROR';
      error.parserType = 'image';
      reject(error);
    };
    
    // Read as appropriate format based on file type
    reader.readAsDataURL(file);
  });
};
