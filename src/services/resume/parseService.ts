import { ResumeData } from '@/components/resume/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createAffindaClient } from './affindaClient';
import { getAffindaApiKey } from './apiKeyService';
import { mapAffindaResponseToResumeData } from './dataMappers';
import { AffindaResponseData, ParsingResult } from './types';
import { saveResumeToSupabase } from './storageService';

/**
 * Parse resume using Affinda API
 * @param file Resume file to parse
 * @param apiKey Optional API key
 * @returns Promise resolving to parsed ResumeData
 */
export const parseResumeWithAffinda = async (
  file: File, 
  apiKey?: string
): Promise<Partial<ResumeData>> => {
  try {
    // Try to get API key from parameter or fetch it
    let key = apiKey;
    if (!key) {
      key = await getAffindaApiKey();
      if (!key) {
        throw new Error('No Affinda API key available. Please configure your API key in settings.');
      }
    }
    
    // Create Affinda client with API key
    const client = createAffindaClient(key);
    if (!client) {
      throw new Error('Failed to initialize Affinda client');
    }
    
    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    
    console.log(`Parsing resume with Affinda: ${file.name} (${file.type}, ${file.size} bytes)`);
    
    // Call Affinda API
    const response = await client.createDocument({
      file: Buffer.from(fileBuffer),
      fileName: file.name,
      collection: 'resumes',
      wait: 'true' // Using string instead of boolean for Affinda API
    });
    
    if (!response.data) {
      throw new Error('No data in Affinda response');
    }
    
    console.log('Affinda response received:', response.data);
    
    // Map Affinda response to ResumeData structure
    const responseData = response.data as AffindaResponseData;
    return mapAffindaResponseToResumeData(responseData, file);
  } catch (error) {
    console.error('Error parsing resume with Affinda:', error);
    throw new Error(`Resume parsing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Parse resume and save it to Supabase
 * @param file Resume file to parse
 * @param userId User ID
 * @param onSuccess Callback when parsing and saving are successful
 * @param onError Callback when an error occurs
 */
export const parseAndSaveResume = async (
  file: File,
  userId: string,
  onSuccess?: (data: Partial<ResumeData>, resumeId: string) => void,
  onError?: (error: Error) => void
): Promise<void> => {
  const toastId = toast.loading("Processing Resume", { 
    description: "Analyzing your resume..."
  });
  
  try {
    // Validate file size
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File size exceeds 10MB limit. Please upload a smaller file.');
    }
    
    // For PDFs, try direct Affinda API first if available
    let parsedData: Partial<ResumeData> | null = null;
    let parsingMethod = "edge-function";
    
    // If it's a PDF, try direct Affinda parsing first before calling Edge Function
    if (file.type === 'application/pdf') {
      try {
        const apiKey = await getAffindaApiKey();
        if (apiKey) {
          console.log('Using direct Affinda API for PDF parsing');
          parsedData = await parseResumeWithAffinda(file, apiKey);
          parsingMethod = "direct-affinda";
        }
      } catch (affindaError) {
        console.warn('Direct Affinda parsing failed, falling back to Edge Function:', affindaError);
        // Will fall back to Edge Function below
      }
    }
    
    // If direct Affinda parsing failed or wasn't attempted, try Edge Function
    if (!parsedData) {
      // Convert file to base64
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      
      if (!fileData || !fileData.includes('base64')) {
        throw new Error('Failed to convert file to base64 format');
      }
      
      // Call the Edge Function for processing
      toast.loading("Processing your document...", { id: toastId });
      
      console.log(`Sending file to Edge Function: ${file.name} (${file.type}, base64 length: ${fileData.length})`);
      
      const response = await supabase.functions.invoke('parse-resume', {
        body: {
          fileData,
          fileName: file.name,
          fileType: file.type
        }
      });
      
      if (response.error) {
        console.error('Edge Function error:', response.error);
        throw new Error(response.error.message || 'Failed to parse resume');
      }
      
      // Ensure response.data is a valid object
      if (!response.data || typeof response.data !== 'object') {
        console.error('Invalid response data:', response.data);
        throw new Error('Invalid data returned from resume parser');
      }
      
      parsedData = response.data as Partial<ResumeData>;
    }
    
    // Validate the parsed data before saving
    if (!parsedData || !parsedData.personal) {
      throw new Error('Failed to extract meaningful data from your resume');
    }
    
    console.log('Parsed resume data:', parsedData);
    
    // Add metadata about the parsing method
    parsedData.metadata = {
      ...(parsedData.metadata || {}),
      parsingMethod,
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileName: file.name
    };
    
    // Save to Supabase
    const resumeId = await saveResumeToSupabase(userId, parsedData);
    
    toast.success("Resume Processed", {
      id: toastId,
      description: "Your resume has been successfully processed and saved."
    });
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess(parsedData, resumeId);
    }
  } catch (error) {
    console.error('Error in parseAndSaveResume:', error);
    
    toast.error("Resume Processing Failed", {
      id: toastId,
      description: error instanceof Error ? error.message : "An unknown error occurred"
    });
    
    // Call error callback if provided
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
};
