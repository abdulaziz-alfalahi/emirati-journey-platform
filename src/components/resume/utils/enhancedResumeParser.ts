
import { ResumeData } from '../types';
import { EnhancedResumeParser } from './enhanced/enhancedParserClass';

/**
 * Enhanced resume parser implementation
 * @param content Resume content as text
 * @returns Parsed resume data
 */
export const enhancedResumeParser = (content: string): Partial<ResumeData> => {
  try {
    // First, perform a basic validation to detect obviously corrupted PDF data
    const corruptionPatterns = [
      /%PDF-/i, 
      /\/Type\s*\/\w+/i,
      /\/Metadata\s+\d+\s+\d+\s+R/i
    ];
    
    // Check for at least 2 corruption patterns
    const corruptionMatches = corruptionPatterns.filter(pattern => pattern.test(content));
    if (corruptionMatches.length >= 2) {
      console.error('Likely corrupted PDF data detected in enhancedResumeParser');
      return {
        personal: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: ""
        },
        summary: "Could not extract text from this PDF. It might be password-protected or corrupted.",
        experience: [],
        education: [],
        skills: [],
        languages: [],
        metadata: {
          processingError: "corrupted_pdf_data",
          parsingMethod: "enhanced-parser-error-detection"
        }
      };
    }
    
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
