
/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from './resumeContentParser';
import { extractFromLinkedIn } from './parsers/linkedInParser';

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
        let parsedData: Partial<ResumeData> = {};
        
        // Use the local extraction method as the primary approach
        try {
          console.log('Using local regex extraction...');
          parsedData = extractDataFromContent(fileContent, file.type);
          
          // Check if we got meaningful data
          if (isEmptyResumeData(parsedData)) {
            console.warn('Regex extraction returned empty data');
            throw new Error('Local extraction returned empty data');
          }
          
          console.log('Local extraction successful:', parsedData);
        } catch (localError) {
          console.error('Local extraction error:', localError);
          
          // Try with edge function as a fallback if available
          try {
            console.log('Attempting AI extraction as fallback...');
            
            const response = await supabase.functions.invoke('extract-resume-data', {
              body: { 
                fileContent,
                fileType: file.type 
              },
            });
            
            if (response.error) {
              console.error('Edge function error:', response.error);
              throw new Error(`AI extraction failed: ${response.error.message}`);
            }
            
            const data = response.data;
            
            if (!data) {
              throw new Error('No data returned from AI extraction service');
            }
            
            console.log('AI extraction successful');
            parsedData = data;
          } catch (aiError) {
            console.error('AI extraction also failed:', aiError);
            // If both methods fail, return the best effort from local extraction
            parsedData = extractDataFromContent(fileContent, file.type);
          }
        }
        
        // Final check if we got meaningful data after all attempts
        if (isEmptyResumeData(parsedData)) {
          reject(new Error('Could not extract meaningful data from your resume. Please try a different file or format.'));
          return;
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

// Parse resume from image file
export const parseResumeFromImage = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        
        if (!imageData) {
          reject(new Error('Could not read image data'));
          return;
        }
        
        console.log('Image read complete. Processing locally...');
        
        // For now, return a basic structure since we don't have local OCR
        // In a real implementation, we would call the edge function
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
          languages: []
        };
        
        resolve(basicData);
      } catch (error) {
        console.error('Error processing resume image:', error);
        reject(new Error('Failed to process resume image. Please try again.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading image file. Please try again.'));
    };
    
    // Read image file as Data URL
    reader.readAsDataURL(file);
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

// Basic LinkedIn import function
export const importFromLinkedIn = async (linkedInUrl: string, accessToken?: string): Promise<Partial<ResumeData>> => {
  console.log('Starting LinkedIn profile import with URL:', linkedInUrl);
  
  // Use the local extractor directly instead of edge function
  const extractedData = extractFromLinkedIn(linkedInUrl);
  console.log('LinkedIn data extracted:', extractedData);
  
  return extractedData;
};

// Re-export for backward compatibility
export { extractFromLinkedIn } from './parsers/linkedInParser';
export { mergeResumeData } from './resumeDataUtils';
