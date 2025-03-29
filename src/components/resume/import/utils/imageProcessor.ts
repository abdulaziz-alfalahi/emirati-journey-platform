
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProcessedResult } from './processorTypes';
import { processWithEdgeFunction } from '../../utils/parsers/image/edgeFunctionProcessor';
import { processWithFallback } from '../../utils/parsers/image/fallbackProcessor';
import { isPdfFile } from './fileValidators';
import { validateImageFile } from '../../utils/parsers/image/imageValidation';

/**
 * Main entry point for processing resume images
 * @param file Image file to process
 * @returns Promise resolving to the processing result
 */
export const processResumeImage = async (file: File): Promise<ProcessedResult> => {
  console.log(`Processing ${file.name} as image`);
  
  // Validate the file
  try {
    // Validate file type (PDF, JPG, PNG)
    if (!isPdfFile(file) && !validateImageFile(file)) {
      throw new Error('Invalid file type. Please upload a PDF, JPG, or PNG file.');
    }
    
    // Start processing
    const startTime = Date.now();
    
    // Convert the file to base64
    const reader = new FileReader();
    const imageData = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
    
    console.log(`File read as data URL, length: ${imageData.length}`);
    
    // Try processing with EdgeFunction first
    try {
      const result = await processWithEdgeFunction(imageData, file, startTime);
      
      if (result.success && Object.keys(result.parsedData).length > 0) {
        console.log('Edge function processing successful');
        return {
          parsedData: result.parsedData,
          parsingMethod: 'image-edge-function',
          processingTime: Date.now() - startTime
        };
      } else {
        console.log('Edge function returned empty data or failed, trying fallback');
        throw new Error('Edge function processing failed or returned empty data');
      }
    } catch (edgeFunctionError) {
      console.error('Edge function error:', edgeFunctionError);
      
      toast.warning("Using fallback extraction method", {
        description: "Our advanced parser is unavailable. Using fallback extraction method.",
      });
      
      // Fallback to client-side processing
      const fallbackResult = await processWithFallback(imageData, file, startTime);
      
      if (fallbackResult.success && Object.keys(fallbackResult.parsedData).length > 0) {
        return {
          parsedData: fallbackResult.parsedData,
          parsingMethod: 'image-fallback',
          usedFallback: true,
          processingTime: Date.now() - startTime
        };
      } else {
        throw new Error('Fallback processing failed or returned empty data');
      }
    }
  } catch (error) {
    console.error('Image processing error:', error);
    
    // Provide a user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during image processing';
    toast.error("Image processing failed", {
      description: errorMessage,
    });
    
    // Return empty data with error flag
    return {
      parsedData: {},
      parsingMethod: 'image-failed',
      usedFallback: true
    };
  }
};
