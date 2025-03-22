
/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from './resumeContentParser';
import { extractFromLinkedIn } from './parsers/linkedInParser';
import { mergeResumeData } from './resumeDataUtils';
import { toast } from 'sonner';

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
        let usingFallback = false;
        let parsedData: Partial<ResumeData> = {};
        
        try {
          console.log('Calling AI extraction service...');
          // Call the Edge Function to extract data using AI
          const response = await supabase.functions.invoke('extract-resume-data', {
            body: { fileContent },
          });
          
          if (response.error) {
            console.error('Edge function error:', response.error);
            usingFallback = true;
            throw new Error(`AI extraction failed: ${response.error.message}`);
          }
          
          const data = response.data;
          
          // Check if the edge function returned fallbackToRegex flag
          if (data && data.fallbackToRegex) {
            console.warn('Edge function signaled to fall back to regex extraction');
            usingFallback = true;
            parsedData = extractDataFromContent(fileContent, file.type);
            
            // Check if we got meaningful data
            if (isEmptyResumeData(parsedData)) {
              throw new Error('Could not extract meaningful data from your resume');
            }
            
            resolve(parsedData);
            return;
          }
          
          if (!data) {
            throw new Error('No data returned from AI extraction service');
          }
          
          console.log('AI extraction successful');
          
          // Check if we got meaningful data
          if (isEmptyResumeData(data)) {
            console.warn('AI returned empty data, falling back to regex extraction');
            usingFallback = true;
            parsedData = extractDataFromContent(fileContent, file.type);
          } else {
            parsedData = data;
          }
          
        } catch (error) {
          console.error('AI extraction error:', error);
          console.log('Falling back to regex extraction...');
          usingFallback = true;
          
          // Fallback to the original extraction method
          parsedData = extractDataFromContent(fileContent, file.type);
        }
        
        // Check if we got meaningful data after all attempts
        if (isEmptyResumeData(parsedData)) {
          reject(new Error('Could not extract meaningful data from your resume. Please try a different file or format.'));
          return;
        }
        
        // Notify about fallback if it happened
        if (usingFallback) {
          toast.warning("Using basic extraction", {
            description: "AI-powered extraction wasn't available. Using basic extraction instead, which may be less accurate.",
            duration: 5000,
          });
        }
        
        resolve(parsedData);
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

// Helper to check if the extracted data is empty/meaningless
const isEmptyResumeData = (data: Partial<ResumeData>): boolean => {
  // Check if personal info is empty
  const isPersonalEmpty = !data.personal || 
    (!data.personal.fullName && !data.personal.email && !data.personal.phone);
  
  // Check if experience, education, skills are all empty
  const hasNoExperience = !data.experience || data.experience.length === 0;
  const hasNoEducation = !data.education || data.education.length === 0;
  const hasNoSkills = !data.skills || data.skills.length === 0;
  
  // Consider the data empty if personal is empty AND at least two other sections are empty
  return isPersonalEmpty && (
    (hasNoExperience && hasNoEducation) || 
    (hasNoExperience && hasNoSkills) || 
    (hasNoEducation && hasNoSkills)
  );
};

// Re-export functions from other modules for backward compatibility
export { extractFromLinkedIn } from './parsers/linkedInParser';
export { mergeResumeData } from './resumeDataUtils';
