
import { ResumeData } from '@/components/resume/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createAffindaClient } from './affindaClient';
import { getAffindaApiKey } from './apiKeyService';
import { mapAffindaResponseToResumeData } from './dataMappers';
import { AffindaResponseData, ParsingResult } from './types';

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
    // Convert file to base64
    const fileData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
    
    // Call the Edge Function for processing
    const response = await supabase.functions.invoke('parse-resume', {
      body: {
        fileData,
        fileName: file.name,
        fileType: file.type
      }
    });
    
    if (response.error) {
      throw new Error(response.error.message || 'Failed to parse resume');
    }
    
    // Ensure response.data is a valid object
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid data returned from resume parser');
    }
    
    const parsedData = response.data as Partial<ResumeData>;
    
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
