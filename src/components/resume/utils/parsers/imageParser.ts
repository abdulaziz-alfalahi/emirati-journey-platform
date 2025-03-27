
/**
 * Resume image parser utility for extracting data from uploaded image files
 */
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';
import { isEmptyResumeData, validateResumeImageType, validateFileSize } from '../helpers/validation';
import { ParsingError } from '../resumeParser';

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
        
        console.log('Image read complete. Processing with Edge Function...');
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
            throw new Error(`Image extraction failed: ${response.error.message}`);
          }
          
          const data = response.data;
          
          if (!data) {
            throw new Error('No data returned from image extraction service');
          }
          
          console.log('Image extraction successful');
          
          // Add metadata about the parsing
          data.metadata = {
            ...(data.metadata || {}),
            parsingMethod: 'image-edge-function',
            parsedAt: new Date().toISOString(),
            fileType: file.type,
            fileSize: file.size,
            processingTime: Date.now() - startTime
          };
          
          resolve(data);
        } catch (error) {
          console.error('Error processing resume image with Edge Function:', error);
          
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
            summary: "Resume extracted from image",
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
