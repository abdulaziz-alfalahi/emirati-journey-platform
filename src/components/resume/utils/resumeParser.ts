/**
 * Resume parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from './resumeContentParser';
import { extractFromLinkedIn } from './parsers/linkedInParser';
import { enhancedResumeParser } from './enhancedResumeParser';

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
        let parsingMethod = '';
        
        // Try each parsing method in sequence, with consistent error handling
        try {
          // 1. First try the enhanced parser
          console.log('Using enhanced resume parser...');
          parsedData = enhancedResumeParser.parseResumeContent(fileContent, file.type);
          
          // Check if we got meaningful data
          if (isEmptyResumeData(parsedData)) {
            console.warn('Enhanced parser returned empty data');
            throw new Error('Enhanced parsing returned empty data');
          }
          
          console.log('Enhanced parsing successful');
          parsingMethod = 'enhanced-local';
          
          // Add metadata about parsing method
          parsedData.metadata = {
            ...(parsedData.metadata || {}),
            parsingMethod,
            parsedAt: new Date().toISOString()
          };
          
          resolve(parsedData);
        } catch (enhancedError) {
          console.error('Enhanced parsing error:', enhancedError);
          
          try {
            // 2. Fall back to the legacy extraction method
            console.log('Falling back to legacy regex extraction...');
            parsedData = extractDataFromContent(fileContent, file.type);
            
            // Check if we got meaningful data
            if (isEmptyResumeData(parsedData)) {
              console.warn('Legacy extraction returned empty data');
              throw new Error('Legacy extraction returned empty data');
            }
            
            console.log('Legacy extraction successful');
            parsingMethod = 'legacy-regex';
            
            // Add metadata about parsing method
            parsedData.metadata = {
              ...(parsedData.metadata || {}),
              parsingMethod,
              parsedAt: new Date().toISOString()
            };
            
            resolve(parsedData);
          } catch (localError) {
            console.error('Legacy extraction error:', localError);
            
            try {
              // 3. Try with enhanced-resume-parser edge function
              console.log('Attempting enhanced edge function...');
              
              const response = await supabase.functions.invoke('enhanced-resume-parser', {
                body: { 
                  fileContent,
                  fileType: file.type 
                },
              });
              
              if (response.error) {
                console.error('Enhanced edge function error:', response.error);
                throw new Error(`Enhanced edge extraction failed: ${response.error.message}`);
              }
              
              const data = response.data;
              
              if (!data || isEmptyResumeData(data)) {
                throw new Error('No meaningful data returned from enhanced edge function');
              }
              
              console.log('Enhanced edge function extraction successful');
              parsedData = data;
              parsingMethod = 'enhanced-edge';
              
              // Add metadata about parsing method
              parsedData.metadata = {
                ...(parsedData.metadata || {}),
                parsingMethod,
                parsedAt: new Date().toISOString()
              };
              
              resolve(parsedData);
            } catch (enhancedEdgeError) {
              console.error('Enhanced edge function failed:', enhancedEdgeError);
              
              try {
                // 4. Fall back to AI extraction as a last resort
                console.log('Attempting AI extraction as final fallback...');
                
                const aiResponse = await supabase.functions.invoke('extract-resume-data', {
                  body: { 
                    fileContent,
                    fileType: file.type 
                  },
                });
                
                if (aiResponse.error) {
                  console.error('AI edge function error:', aiResponse.error);
                  throw new Error(`AI extraction failed: ${aiResponse.error.message}`);
                }
                
                const aiData = aiResponse.data;
                
                if (!aiData || isEmptyResumeData(aiData)) {
                  throw new Error('No meaningful data returned from AI extraction service');
                }
                
                console.log('AI extraction successful');
                parsedData = aiData;
                parsingMethod = 'ai-edge';
                
                // Add metadata about parsing method
                parsedData.metadata = {
                  ...(parsedData.metadata || {}),
                  parsingMethod,
                  parsedAt: new Date().toISOString()
                };
                
                resolve(parsedData);
              } catch (aiError) {
                console.error('All extraction methods failed:', aiError);
                // If all methods fail, return a more informative error
                reject(new Error('All parsing methods failed. Please try a different file format or check if the resume contains extractable text.'));
                return;
              }
            }
          }
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
        
        console.log('Image read complete. Processing with Edge Function...');
        
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
            fileSize: file.size
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
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          };
          
          console.warn('Falling back to basic structure due to Edge Function failure');
          resolve(basicData);
        }
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

// Basic LinkedIn import function - Fixed to properly await and handle Promise
export const importFromLinkedIn = async (linkedInUrl: string, accessToken?: string): Promise<Partial<ResumeData>> => {
  console.log('Starting LinkedIn profile import with URL:', linkedInUrl);
  
  try {
    // Use the local extractor directly instead of edge function
    const extractedData = extractFromLinkedIn(linkedInUrl);
    console.log('LinkedIn data extracted:', extractedData);
    
    // Add metadata
    if (!extractedData.metadata) {
      extractedData.metadata = {};
    }
    
    extractedData.metadata = {
      ...extractedData.metadata,
      parsingMethod: 'linkedin-import',
      parsedAt: new Date().toISOString(),
      linkedInUrl
    };
    
    return extractedData;
  } catch (error) {
    console.error('LinkedIn import error:', error);
    // Return a basic structure with error info if extraction fails
    return {
      personal: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: linkedInUrl,
        website: ""
      },
      experience: [],
      education: [],
      skills: [],
      languages: [],
      metadata: {
        parsingMethod: 'linkedin-import-failed',
        parsedAt: new Date().toISOString(),
        linkedInUrl,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    };
  }
};

// Re-export for backward compatibility
export { extractFromLinkedIn } from './parsers/linkedInParser';
export { mergeResumeData } from './resumeDataUtils';
export { enhancedResumeParser };
