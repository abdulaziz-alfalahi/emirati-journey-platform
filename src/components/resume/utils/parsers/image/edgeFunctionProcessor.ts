
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
    
    // Log file details for debugging
    console.log('Edge function request details:', {
      fileType: file.type,
      fileSize: file.size,
      fileName: file.name,
      imageDataLength: imageData.length,
      imageDataPrefix: imageData.substring(0, 50) + '...'
    });
    
    // Create a timeout promise to handle long-running edge function calls
    const apiPromise = supabase.functions.invoke('extract-resume-from-image', {
      body: { 
        imageData,
        fileName: file.name,
        fileType: file.type 
      },
    });
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Edge function processing timed out after 50 seconds')), 50000);
    });
    
    // Race the API call against the timeout
    const response = await Promise.race([apiPromise, timeoutPromise]) as { 
      data?: any; 
      error?: { message: string; status?: number; context?: any }
    };
    
    if (response && response.error) {
      console.error('Resume image extraction error:', response.error);
      
      // Log detailed error information
      console.error('Edge function error details:', {
        message: response.error.message,
        status: response.error.status,
        context: response.error.context
      });
      
      // Handle specific PDF errors from OpenAI vision API
      if (file.type === 'application/pdf' && 
          response.error.message && 
          response.error.message.includes('Invalid MIME type')) {
        
        console.log('PDF format not supported directly by image API. Providing guidance to user...');
        toast.error("PDF Format Not Supported", {
          description: "Our AI vision service doesn't accept PDFs directly. Please convert your PDF to JPG or PNG first.",
          duration: 8000
        });
        
        throw new Error("PDF format not directly supported by our image AI. Please convert your PDF to JPG or PNG first.");
      }
      
      throw new Error(`Image extraction failed: ${response.error.message}`);
    }
    
    const data = response && response.data;
    
    // Log response information for debugging
    console.log('Edge function response:', {
      success: true,
      dataReceived: !!data,
      dataKeys: data ? Object.keys(data) : [],
      processingTime: Date.now() - startTime
    });
    
    if (!data) {
      throw new Error('No data returned from image extraction service');
    }
    
    console.log('Image extraction successful');
    
    // Sanitize the data to remove any artifacts
    const sanitizedData = sanitizeResumeData(data);
    
    // Check if data is empty
    if (isEmptyResumeData(sanitizedData)) {
      console.error('Extracted data is empty or invalid after sanitization');
      console.log('Original data keys:', Object.keys(data));
      console.log('Sanitized data keys:', Object.keys(sanitizedData));
      
      if (data.personal) {
        console.log('Personal data before sanitization:', data.personal);
      }
      
      if (sanitizedData.personal) {
        console.log('Personal data after sanitization:', sanitizedData.personal);
      }
      
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
    
    // Provide more detailed error information
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      fileType: file.type,
      fileSize: file.size,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    };
    
    console.error('Error details:', errorDetails);
    
    return { 
      parsedData: {}, 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error)) 
    };
  }
};
