
/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from './resumeContentParser';
import { extractFromLinkedIn } from './parsers/linkedInParser';
import { mergeResumeData } from './resumeDataUtils';

// Parse resume from uploaded file
export const parseResumeFromFile = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const fileContent = e.target?.result as string;
        
        // Check if we have content to parse
        if (!fileContent) {
          reject(new Error('Could not read file content'));
          return;
        }
        
        console.log('File read complete. Content length:', fileContent.length);
        
        try {
          console.log('Calling AI extraction service...');
          // Call the Edge Function to extract data using AI
          const { data, error } = await supabase.functions.invoke('extract-resume-data', {
            body: { fileContent },
          });
          
          if (error) {
            console.error('Edge function error:', error);
            throw new Error(`AI extraction failed: ${error.message}`);
          }
          
          // Check if the edge function returned fallbackToRegex flag
          if (data && data.fallbackToRegex) {
            console.warn('Edge function signaled to fall back to regex extraction');
            const fallbackData = extractDataFromContent(fileContent, file.type);
            resolve(fallbackData);
            return;
          }
          
          if (!data) {
            throw new Error('No data returned from AI extraction service');
          }
          
          console.log('AI extraction successful');
          resolve(data);
        } catch (error) {
          console.error('AI extraction error:', error);
          console.log('Falling back to regex extraction...');
          
          // Fallback to the original extraction method
          const parsedData = extractDataFromContent(fileContent, file.type);
          resolve(parsedData);
        }
      } catch (error) {
        console.error('Error parsing resume:', error);
        reject(new Error('Failed to parse resume file. Please try a different file.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file. Please try again.'));
    };
    
    reader.readAsText(file);
  });
};

// Re-export functions from other modules for backward compatibility
export { extractFromLinkedIn } from './parsers/linkedInParser';
export { mergeResumeData } from './resumeDataUtils';
