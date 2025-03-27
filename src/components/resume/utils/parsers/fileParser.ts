/**
 * Resume file parser utility for extracting data from uploaded resume files
 */
import { ResumeData } from '../../types';
import { supabase } from '@/integrations/supabase/client';
import { extractDataFromContent } from '../resumeContentParser';
import { enhancedResumeParser } from '../enhancedResumeParser';
import { 
  isEmptyResumeData, 
  validateResumeFileType, 
  validateFileSize, 
  containsPdfArtifacts,
  sanitizePdfArtifacts
} from '../helpers/validation';
import { cleanPdfArtifacts } from '../parsers/pdfUtils';
import { ParsingResult, ParsingError } from '../resumeParser';

/**
 * Parse resume from uploaded file
 * @param file File object to parse
 * @returns Promise resolving to parsed resume data
 */
export const parseResumeFromFile = async (file: File): Promise<Partial<ResumeData>> => {
  return new Promise((resolve, reject) => {
    // Validate file size first
    const sizeValidation = validateFileSize(file.size);
    if (!sizeValidation.isValid) {
      const error = new Error(`File too large. Please upload a file smaller than ${sizeValidation.maxSizeInMB}MB.`) as ParsingError;
      error.code = 'FILE_TOO_LARGE';
      error.details = sizeValidation;
      reject(error);
      return;
    }
    
    // Validate file type
    const typeValidation = validateResumeFileType(file.type);
    let fileTypeWarning = null;
    
    if (typeValidation.isUnsupported) {
      fileTypeWarning = `Unsupported file type. For best results, use ${typeValidation.supportedTypes.join(', ')} files.`;
      console.warn(fileTypeWarning);
    }
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const fileContent = e.target?.result as string;
        
        // Check if we have content to parse
        if (!fileContent) {
          const error = new Error('Could not read file content') as ParsingError;
          error.code = 'EMPTY_CONTENT';
          reject(error);
          return;
        }
        
        // Early check for PDF raw headers
        if (file.type === 'application/pdf' && fileContent.startsWith('%PDF')) {
          console.log('Detected PDF file, cleaning artifacts before parsing...');
          
          // Check if the first 500 characters have mostly PDF artifacts
          const firstChunk = fileContent.substring(0, 500);
          const textContentRatio = firstChunk.replace(/[^a-zA-Z0-9]/g, '').length / firstChunk.length;
          
          if (textContentRatio < 0.3) {
            console.warn('This appears to be a scanned PDF without proper text content');
            const error = new Error("This appears to be a scanned PDF without proper text content. Please use the Image Upload option instead for better results.") as ParsingError;
            error.code = 'SCANNED_PDF';
            error.details = {
              fileType: file.type,
              fileSize: file.size,
              textContentRatio
            };
            error.parserType = 'file';
            
            reject(error);
            return;
          }
          
          // Clean PDF artifacts from the content before parsing
          const cleanedContent = cleanPdfArtifacts(fileContent);
          console.log(`Cleaned PDF content. Original length: ${fileContent.length}, Cleaned length: ${cleanedContent.length}`);
          
          // If cleaning removed too much content, probably a scanned PDF
          if (cleanedContent.length < fileContent.length * 0.2) {
            console.warn('Cleaning removed most content, likely a scanned PDF');
            const error = new Error("This PDF appears to contain mostly images rather than text. Please use the Image Upload option instead.") as ParsingError;
            error.code = 'SCANNED_PDF';
            error.parserType = 'file';
            
            reject(error);
            return;
          }
          
          // Use the cleaned content for parsing
          parseContent(cleanedContent);
        } else {
          // For non-PDF files, proceed with original content
          parseContent(fileContent);
        }
        
        // Inner function to handle the actual parsing
        async function parseContent(content: string) {
          let parsedData: Partial<ResumeData> = {};
          let parsingMethod = '';
          const startTime = Date.now();
          
          // Try each parsing method in sequence, with consistent error handling
          try {
            // 1. First try the enhanced parser
            console.log('Using enhanced resume parser...');
            parsedData = enhancedResumeParser.parseResumeContent(content, file.type);
            
            // Check if we parsed mostly PDF artifacts
            if (parsedData.personal?.fullName && containsPdfArtifacts(parsedData.personal.fullName)) {
              console.warn('Enhanced parser returned PDF artifacts as personal info, cleaning data...');
              
              // Clean the parsed data
              Object.keys(parsedData.personal).forEach(key => {
                if (typeof parsedData.personal[key] === 'string' && containsPdfArtifacts(parsedData.personal[key])) {
                  parsedData.personal[key] = '';
                }
              });
              
              if (typeof parsedData.summary === 'string' && containsPdfArtifacts(parsedData.summary)) {
                parsedData.summary = '';
              }
            }
            
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
              parsedAt: new Date().toISOString(),
              processingTime: Date.now() - startTime,
              fileType: file.type,
              fileSize: file.size,
              fileTypeWarning
            };
            
            resolve(parsedData);
          } catch (enhancedError) {
            console.error('Enhanced parsing error:', enhancedError);
            
            // Continue with fallback methods
            try {
              // 2. Fall back to the legacy regex extraction method
              console.log('Falling back to legacy regex extraction...');
              parsedData = extractDataFromContent(content, file.type);
              
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
                parsedAt: new Date().toISOString(),
                processingTime: Date.now() - startTime,
                fileType: file.type,
                fileSize: file.size,
                fileTypeWarning,
                fallbackReason: enhancedError instanceof Error ? enhancedError.message : 'Enhanced parsing failed'
              };
              
              resolve(parsedData);
            } catch (localError) {
              console.error('Legacy extraction error:', localError);
              
              // If all methods fail, try to detect if it's a scanned PDF
              if (file.type === 'application/pdf' && fileContent.startsWith('%PDF') && fileContent.length < 1000) {
                const error = new Error('This appears to be a scanned PDF without extractable text. Please try the Image Upload option instead.') as ParsingError;
                error.code = 'SCANNED_PDF';
                error.details = {
                  fileType: file.type,
                  fileSize: file.size
                };
                error.parserType = 'file';
                
                reject(error);
                return;
              }
              
              // Continue with the existing error handling and additional parsers
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
                  parsedAt: new Date().toISOString(),
                  processingTime: Date.now() - startTime,
                  fileType: file.type,
                  fileSize: file.size,
                  fileTypeWarning,
                  fallbackReason: 'Local parsing methods failed'
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
                    parsedAt: new Date().toISOString(),
                    processingTime: Date.now() - startTime,
                    fileType: file.type,
                    fileSize: file.size,
                    fileTypeWarning,
                    fallbackReason: 'All local and enhanced edge parsing methods failed'
                  };
                  
                  resolve(parsedData);
                } catch (aiError) {
                  console.error('All extraction methods failed:', aiError);
                  
                  // If all methods fail, return a more informative error
                  const error = new Error('All parsing methods failed. Please try a different file format or check if the resume contains extractable text.') as ParsingError;
                  error.code = 'ALL_METHODS_FAILED';
                  error.details = {
                    fileType: file.type,
                    fileSize: file.size,
                    attemptedMethods: ['enhanced-local', 'legacy-regex', 'enhanced-edge', 'ai-edge']
                  };
                  error.parserType = 'file';
                  
                  reject(error);
                  return;
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error parsing resume:', error);
        
        const parsingError = new Error('Failed to parse resume file. Please try a different file.') as ParsingError;
        parsingError.code = 'PARSING_FAILED';
        parsingError.details = {
          originalError: error instanceof Error ? error.message : String(error),
          fileType: file.type
        };
        parsingError.parserType = 'file';
        
        reject(parsingError);
      }
    };
    
    reader.onerror = (event) => {
      const error = new Error('Error reading file. Please try again.') as ParsingError;
      error.code = 'FILE_READ_ERROR';
      error.details = { event };
      error.parserType = 'file';
      
      reject(error);
    };
    
    reader.readAsText(file);
  });
};
