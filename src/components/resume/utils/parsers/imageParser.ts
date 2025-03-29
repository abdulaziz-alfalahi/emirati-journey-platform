/**
 * Resume image parser utility for extracting data from uploaded image files
 */
import { ResumeData } from '../../types';
import { ParsingError } from '../resumeParser';
import { toast } from 'sonner';

// Import refactored modules
import { validateImageFile } from './image/imageValidation';
import { processWithEdgeFunction } from './image/edgeFunctionProcessor';
import { processPdfWithTextFallback, processWithBasicOCR } from './image/pdfProcessor';
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
        duration: 5000
      });
    } else if (validation.fileTypeWarning) {
      toast.warning("Image Format", {
        description: validation.fileTypeWarning,
        duration: 5000
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
            duration: 60000 // Increased to 60 seconds
          });
          
          // Log file details for debugging
          console.log('Processing file:', {
            type: file.type,
            size: file.size,
            name: file.name,
            dataLength: imageData.length
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
            toast.loading("Trying text extraction...", {
              id: "pdf-fallback-notice",
              description: "Image processing failed. Attempting to extract text directly from PDF...",
              duration: 30000
            });
            
            const pdfResult = await processPdfWithTextFallback(file, startTime);
            
            toast.dismiss("pdf-fallback-notice");
            
            if (pdfResult.success && Object.keys(pdfResult.parsedData).length > 0) {
              toast.success("Resume Processed", {
                description: "Successfully extracted data from your PDF using text mode."
              });
              resolve(pdfResult.parsedData);
              return;
            }
            
            // If text fallback fails, try basic OCR as last resort
            toast.loading("Trying basic OCR...", {
              id: "ocr-fallback-notice",
              description: "Text extraction failed. Attempting basic OCR processing...",
              duration: 20000
            });
            
            try {
              const ocrResult = await processWithBasicOCR(file);
              
              toast.dismiss("ocr-fallback-notice");
              
              if (ocrResult && Object.keys(ocrResult).length > 0) {
                toast.warning("Basic OCR Used", {
                  description: "AI extraction failed. Basic OCR was used with limited results.",
                  duration: 8000
                });
                resolve(ocrResult);
                return;
              }
            } catch (ocrError) {
              toast.dismiss("ocr-fallback-notice");
              console.error('OCR fallback failed:', ocrError);
            }
          }
          
          // If all else fails, create basic fallback structure
          console.warn('Falling back to basic structure due to extraction failures');
          
          if (isPdf) {
            toast.error("PDF Processing Failed", {
              description: "Could not extract data from this PDF. Please try converting to JPG or PNG first.",
              duration: 8000
            });
          } else {
            toast.error("Image Processing Failed", {
              description: "Could not extract data from this image. Please try a clearer image with better lighting.",
              duration: 8000
            });
          }
          
          const fallbackData = createFallbackResumeData(
            file, 
            error || new Error('Processing failed'), 
            startTime
          );
          
          // Add a helpful message to guide the user
          toast.warning("Manual Entry Required", {
            description: "We've created an empty resume template. Please fill in your details manually.",
            duration: 8000
          });
          
          resolve(fallbackData);
          
        } catch (error) {
          toast.dismiss("resume-processing");
          console.error('Error processing resume image:', error);
          
          // Special handling for PDF upload errors
          if (isPdf && error instanceof Error && error.message.includes('Invalid MIME type')) {
            toast.error("PDF Format Not Supported", {
              description: "Our AI vision service doesn't accept PDFs directly. Please convert your PDF to JPG or PNG first.",
              duration: 8000
            });
            
            const pdfError = new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.") as ParsingError;
            pdfError.code = 'PDF_FORMAT_NOT_SUPPORTED';
            pdfError.parserType = 'image';
            reject(pdfError);
            return;
          }
          
          // Handle timeout errors specifically
          if (error instanceof Error && error.message.includes('timed out')) {
            toast.error("Processing Timeout", {
              description: "Resume processing took too long. Please try a simpler document or a different format.",
              duration: 8000
            });
            
            const timeoutError = new Error("Resume processing timed out. Please try a simpler document or a different format.") as ParsingError;
            timeoutError.code = 'PROCESSING_TIMEOUT';
            timeoutError.parserType = 'image';
            reject(timeoutError);
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
