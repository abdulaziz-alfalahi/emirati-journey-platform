
/**
 * Parsing methods module
 * Contains various parsing methods for extracting resume data
 */
import { ResumeData } from '../../types';
import { ParsingError } from '../resumeParser';
import { v4 as uuidv4 } from 'uuid';
import { enhancedResumeParser } from '../enhancedResumeParser';
import { legacyResumeParser } from '../legacyResumeParser';
import { sanitizeResumeData } from '../helpers/validation';

// Custom function to check for PDF artifacts
const containsPdfArtifacts = (content: string): boolean => {
  // Look for typical PDF artifacts
  return /^%PDF/.test(content) || 
         content.includes('obj\nendobj') || 
         content.includes('stream\nendstream');
};

/**
 * Enhanced parser method
 * Uses a more sophisticated parsing approach
 * @param fileContent File content as string
 * @param file File object
 * @param startTime Parsing start time
 * @returns Promise resolving to parsed resume data
 */
export const parseWithEnhancedParser = async (fileContent: string, file: File, startTime: number): Promise<Partial<ResumeData>> => {
  try {
    console.log('Using enhanced parser');
    
    // Check for PDF artifacts before parsing
    if (containsPdfArtifacts(fileContent)) {
      const error = new Error('File contains PDF artifacts and cannot be parsed with this method.') as ParsingError;
      error.code = 'PDF_ARTIFACTS';
      throw error;
    }
    
    // Fix: enhancedResumeParser is likely a class instance with parseResumeContent method
    const parsedData = enhancedResumeParser.parseResumeContent(fileContent, file.type);
    const processingTime = Date.now() - startTime;
    
    // Sanitize the data to ensure it's clean
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Add metadata about the parsing
    sanitizedData.metadata = {
      ...(sanitizedData.metadata || {}),
      parsingMethod: 'enhanced-local',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime
    };
    
    return sanitizedData;
  } catch (error) {
    console.error('Enhanced parsing failed:', error);
    throw error;
  }
};

/**
 * Legacy parser method
 * Uses a regular expression-based parsing approach
 * @param fileContent File content as string
 * @param file File object
 * @param startTime Parsing start time
 * @param enhancedError Error from enhanced parser (if any)
 * @returns Promise resolving to parsed resume data
 */
export const parseWithLegacyParser = async (fileContent: string, file: File, startTime: number, enhancedError?: any): Promise<Partial<ResumeData>> => {
  try {
    console.log('Using legacy parser');
    
    // Check for PDF artifacts before parsing
    if (containsPdfArtifacts(fileContent)) {
      const error = new Error('File contains PDF artifacts and cannot be parsed with this method.') as ParsingError;
      error.code = 'PDF_ARTIFACTS';
      throw error;
    }
    
    const parsedData = legacyResumeParser(fileContent);
    const processingTime = Date.now() - startTime;
    
    // Sanitize the data to ensure it's clean
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Add metadata about the parsing
    sanitizedData.metadata = {
      ...(sanitizedData.metadata || {}),
      parsingMethod: 'legacy-regex',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime,
      enhancedError: enhancedError ? String(enhancedError) : undefined
    };
    
    return sanitizedData;
  } catch (error) {
    console.error('Legacy extraction failed:', error);
    throw error;
  }
};

/**
 * Enhanced edge function parser method
 * Calls an edge function for parsing
 * @param fileContent File content as string
 * @param file File object
 * @param startTime Parsing start time
 * @param legacyError Error from legacy parser (if any)
 * @returns Promise resolving to parsed resume data
 */
export const parseWithEnhancedEdgeFunction = async (fileContent: string, file: File, startTime: number, legacyError?: any): Promise<Partial<ResumeData>> => {
  try {
    console.log('Using enhanced edge function');
    
    // Mock implementation - replace with actual edge function call
    const mockData: Partial<ResumeData> = {
      personal: {
        fullName: 'Edge Function Result',
        jobTitle: 'Edge Function Tester',
        email: 'edge@example.com',
        phone: '123-456-7890',
        location: 'Remote'
      },
      skills: [{ id: uuidv4(), name: 'JavaScript', level: 'advanced' }],
      metadata: {
        parsingMethod: 'enhanced-edge',
        parsedAt: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size
      }
    };
    
    const processingTime = Date.now() - startTime;
    mockData.metadata = {
      ...mockData.metadata,
      processingTime,
      legacyError: legacyError ? String(legacyError) : undefined
    };
    
    return mockData;
  } catch (error) {
    console.error('Enhanced edge function failed:', error);
    throw error;
  }
};

/**
 * AI extraction parser method
 * Calls an AI-based service for parsing
 * @param fileContent File content as string
 * @param file File object
 * @param startTime Parsing start time
 * @param enhancedEdgeError Error from enhanced edge function (if any)
 * @returns Promise resolving to parsed resume data
 */
export const parseWithAIExtraction = async (fileContent: string, file: File, startTime: number, enhancedEdgeError?: any): Promise<Partial<ResumeData>> => {
  try {
    console.log('Using AI extraction');
    
    // Mock implementation - replace with actual AI extraction service call
    const mockData: Partial<ResumeData> = {
      personal: {
        fullName: 'AI Extraction Result',
        jobTitle: 'AI Tester',
        email: 'ai@example.com',
        phone: '111-222-3333',
        location: 'AI Land'
      },
      skills: [{ id: uuidv4(), name: 'AI', level: 'expert' }],
      metadata: {
        parsingMethod: 'ai-edge',
        parsedAt: new Date().toISOString(),
        fileType: file.type,
        fileSize: file.size
      }
    };
    
    const processingTime = Date.now() - startTime;
    mockData.metadata = {
      ...mockData.metadata,
      processingTime,
      enhancedEdgeError: enhancedEdgeError ? String(enhancedEdgeError) : undefined
    };
    
    return mockData;
  } catch (error) {
    console.error('AI extraction failed:', error);
    throw error;
  }
};
