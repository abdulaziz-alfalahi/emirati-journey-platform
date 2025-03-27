
/**
 * Resume image parser utility for extracting data from uploaded image files
 */
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';
import { isEmptyResumeData, validateResumeImageType, validateFileSize, sanitizeResumeData } from '../helpers/validation';
import { ParsingError } from '../resumeParser';
import { toast } from 'sonner';

/**
 * Parse resume from image file
 * @param file Image file to parse
 * @returns Promise resolving to parsed resume data
 */
export const parseResumeFromImage = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    // Validate file size first
    const sizeValidation = validateFileSize(file.size, 10 * 1024 * 1024); // 10MB limit for images
    if (!sizeValidation.isValid) {
      const error = new Error(`Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}MB.`) as ParsingError;
      error.code = 'IMAGE_TOO_LARGE';
      error.details = sizeValidation;
      error.parserType = 'image';
      reject(error);
      return;
    }
    
    // Validate image type
    const typeValidation = validateResumeImageType(file.type);
    let fileTypeWarning = null;
    
    if (typeValidation.isUnsupported) {
      const error = new Error(`Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images.`) as ParsingError;
      error.code = 'UNSUPPORTED_IMAGE_FORMAT';
      error.details = typeValidation;
      error.parserType = 'image';
      reject(error);
      return;
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
        
        console.log(`Processing ${file.type} with size ${file.size} using Edge Function...`);
        const startTime = Date.now();
        
        try {
          // Call the extract-resume-from-image Edge Function
          const response = await supabase.functions.invoke('extract-resume-from-image', {
            body: { 
              imageData,
              fileName: file.name,
              fileType: file.type 
            },
          });
          
          if (response.error) {
            console.error('Resume image extraction error:', response.error);
            
            // Handle specific PDF errors from OpenAI vision API
            if (file.type === 'application/pdf' && 
                response.error.message && 
                response.error.message.includes('Invalid MIME type')) {
              
              console.log('PDF format not supported directly by image API. Providing guidance to user...');
              toast.error("PDF Format Not Supported", {
                description: "Our AI vision service doesn't accept PDFs directly. Please convert your PDF to JPG or PNG first.",
              });
              
              // Create a specific error for PDF format issues
              const error = new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.") as ParsingError;
              error.code = 'PDF_FORMAT_NOT_SUPPORTED';
              error.parserType = 'image';
              error.details = {
                originalError: response.error.message
              };
              reject(error);
              return;
            }
            
            throw new Error(`Image extraction failed: ${response.error.message}`);
          }
          
          const data = response.data;
          
          if (!data) {
            throw new Error('No data returned from image extraction service');
          }
          
          console.log('Image extraction successful');
          
          // Sanitize the data to remove any artifacts
          const sanitizedData = sanitizeResumeData(data);
          
          // Add metadata about the parsing
          sanitizedData.metadata = {
            ...(sanitizedData.metadata || {}),
            parsingMethod: 'image-edge-function',
            parsedAt: new Date().toISOString(),
            fileType: file.type,
            fileSize: file.size,
            processingTime: Date.now() - startTime
          };
          
          resolve(sanitizedData);
        } catch (error) {
          console.error('Error processing resume image with Edge Function:', error);
          
          // Special handling for PDF upload errors
          if (file.type === 'application/pdf' && error instanceof Error && 
              error.message.includes('Invalid MIME type')) {
            
            toast.error("PDF Format Not Supported", {
              description: "Our AI vision service doesn't accept PDFs directly. Please convert your PDF to JPG or PNG first.",
            });
            
            const pdfError = new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.") as ParsingError;
            pdfError.code = 'PDF_FORMAT_NOT_SUPPORTED';
            pdfError.parserType = 'image';
            reject(pdfError);
            return;
          }
          
          // Fallback to basic structure if Edge Function fails
          const basicData: Partial<ResumeData> = {
            personal: {
              fullName: "",
              jobTitle: "",
              email: "",
              phone: "",
              location: "",
              linkedin: "",
              website: ""
            },
            summary: file.type === 'application/pdf' 
              ? "PDF was processed as an image. Limited text extraction was possible."
              : "Resume extracted from image",
            experience: [],
            education: [],
            skills: [],
            languages: [],
            metadata: {
              parsingMethod: 'image-fallback',
              parsedAt: new Date().toISOString(),
              fileType: file.type,
              fileSize: file.size,
              processingTime: Date.now() - startTime,
              error: error instanceof Error ? error.message : 'Unknown error',
              fallbackReason: 'Edge Function failed'
            }
          };
          
          console.warn('Falling back to basic structure due to Edge Function failure');
          resolve(basicData);
        }
      } catch (error) {
        console.error('Error processing resume image:', error);
        
        const parsingError = new Error('Failed to process resume image. Please try again.') as ParsingError;
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
    
    // Read image file as Data URL
    reader.readAsDataURL(file);
  });
};
