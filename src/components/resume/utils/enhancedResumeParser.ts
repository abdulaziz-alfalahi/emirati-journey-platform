
import { ResumeData } from '../types';
import { EnhancedResumeParser } from './enhanced/enhancedParserClass';

/**
 * Enhanced resume parser implementation
 * @param content Resume content as text
 * @returns Parsed resume data
 */
export const enhancedResumeParser = (content: string): Partial<ResumeData> => {
  try {
    // Create an instance of the parser class
    const parser = new EnhancedResumeParser();
    
    // Process the content
    const result = parser.parseResumeContent(content, 'text/plain');
    
    // Return the parsed data
    return result;
  } catch (error) {
    console.error('Enhanced parser error:', error);
    throw error;
  }
};
