
import { ResumeData } from '../../../types';
import { supabase } from '@/integrations/supabase/client';
import { isEmptyResumeData, sanitizeResumeData } from '../../helpers/validation';
import { toast } from 'sonner';

/**
 * Process image with Edge Function
 * @param imageData Base64 or text data of the image
 * @param file Original file object
 * @param startTime Processing start time
 * @returns Promise with parsed data and success indicator
 */
export const processWithEdgeFunction = async (
  imageData: string,
  file: File,
  startTime: number
): Promise<{ parsedData: Partial<ResumeData>; success: boolean; error?: Error }> => {
  try {
    console.log(`Processing ${file.type} with size ${file.size} using Edge Function...`);
    
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
        
        throw new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.");
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
    
    // Check if data is empty
    if (isEmptyResumeData(sanitizedData)) {
      throw new Error('No meaningful data could be extracted from the image');
    }
    
    // Add metadata about the parsing
    sanitizedData.metadata = {
      ...(sanitizedData.metadata || {}),
      parsingMethod: 'image-edge-function',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime: Date.now() - startTime
    };
    
    return { parsedData: sanitizedData, success: true };
  } catch (error) {
    console.error('Error in edge function processor:', error);
    return { 
      parsedData: {}, 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error)) 
    };
  }
};
