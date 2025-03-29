
/**
 * Resume parsing methods module
 * Contains the implementation of various parsing strategies
 */
import { ResumeData } from '../../types';
import { enhancedResumeParser } from '../enhancedResumeParser';
import { extractDataFromContent } from '../resumeContentParser';
import { supabase } from '@/integrations/supabase/client';
import { ParsingError } from '../resumeParser';
import { isEmptyResumeData, containsPdfArtifacts } from '../helpers/validation';

/**
 * Parse content using enhanced parser
 * @param content File content
 * @param file File object
 * @param startTime Processing start time
 * @returns Parsed resume data
 */
export const parseWithEnhancedParser = (
  content: string, 
  file: File, 
  startTime: number
): Partial<ResumeData> => {
  console.log('Using enhanced resume parser...');
  const parsedData = enhancedResumeParser.parseResumeContent(content, file.type);
  
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
  
  // Add metadata about parsing method
  parsedData.metadata = {
    ...(parsedData.metadata || {}),
    parsingMethod: 'enhanced-local',
    parsedAt: new Date().toISOString(),
    processingTime: Date.now() - startTime,
    fileType: file.type,
    fileSize: file.size
  };
  
  return parsedData;
};

/**
 * Parse content using legacy parser
 * @param content File content
 * @param file File object
 * @param startTime Processing start time
 * @param previousError Previous error that caused fallback
 * @returns Parsed resume data
 */
export const parseWithLegacyParser = (
  content: string, 
  file: File, 
  startTime: number,
  previousError: any
): Partial<ResumeData> => {
  console.log('Falling back to legacy regex extraction...');
  const parsedData = extractDataFromContent(content, file.type);
  
  // Check if we got meaningful data
  if (isEmptyResumeData(parsedData)) {
    console.warn('Legacy extraction returned empty data');
    throw new Error('Legacy extraction returned empty data');
  }
  
  console.log('Legacy extraction successful');
  
  // Add metadata about parsing method
  parsedData.metadata = {
    ...(parsedData.metadata || {}),
    parsingMethod: 'legacy-regex',
    parsedAt: new Date().toISOString(),
    processingTime: Date.now() - startTime,
    fileType: file.type,
    fileSize: file.size,
    fallbackReason: previousError instanceof Error ? previousError.message : 'Enhanced parsing failed'
  };
  
  return parsedData;
};

/**
 * Parse content using enhanced edge function
 * @param content File content
 * @param file File object
 * @param startTime Processing start time
 * @param previousError Previous error that caused fallback
 * @returns Promise resolving to parsed resume data
 */
export const parseWithEnhancedEdgeFunction = async (
  content: string, 
  file: File, 
  startTime: number,
  previousError: any
): Promise<Partial<ResumeData>> => {
  console.log('Attempting enhanced edge function...');
  
  const response = await supabase.functions.invoke('enhanced-resume-parser', {
    body: { 
      fileContent: content,
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
  
  // Add metadata about parsing method
  const parsedData = data;
  parsedData.metadata = {
    ...(parsedData.metadata || {}),
    parsingMethod: 'enhanced-edge',
    parsedAt: new Date().toISOString(),
    processingTime: Date.now() - startTime,
    fileType: file.type,
    fileSize: file.size,
    fallbackReason: 'Local parsing methods failed'
  };
  
  return parsedData;
};

/**
 * Parse content using AI extraction edge function
 * @param content File content
 * @param file File object
 * @param startTime Processing start time
 * @param previousError Previous error that caused fallback
 * @returns Promise resolving to parsed resume data
 */
export const parseWithAIExtraction = async (
  content: string, 
  file: File, 
  startTime: number,
  previousError: any
): Promise<Partial<ResumeData>> => {
  console.log('Attempting AI extraction as final fallback...');
  
  const response = await supabase.functions.invoke('extract-resume-data', {
    body: { 
      fileContent: content,
      fileType: file.type 
    },
  });
  
  if (response.error) {
    console.error('AI edge function error:', response.error);
    throw new Error(`AI extraction failed: ${response.error.message}`);
  }
  
  const data = response.data;
  
  if (!data || isEmptyResumeData(data)) {
    throw new Error('No meaningful data returned from AI extraction service');
  }
  
  console.log('AI extraction successful');
  
  // Add metadata about parsing method
  const parsedData = data;
  parsedData.metadata = {
    ...(parsedData.metadata || {}),
    parsingMethod: 'ai-edge',
    parsedAt: new Date().toISOString(),
    processingTime: Date.now() - startTime,
    fileType: file.type,
    fileSize: file.size,
    fallbackReason: 'All local and enhanced edge parsing methods failed'
  };
  
  return parsedData;
};
