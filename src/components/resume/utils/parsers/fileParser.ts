
/**
 * Resume file parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from '../resumeContentParser';
import { enhancedResumeParser } from '../enhancedResumeParser';
import { isEmptyResumeData } from '../helpers/validation';

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
