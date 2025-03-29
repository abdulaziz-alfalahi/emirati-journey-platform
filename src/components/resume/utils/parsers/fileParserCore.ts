
/**
 * Core file parser module
 * Handles the file reading and parsing process
 */
import { ResumeData } from '../../types';
import { ParsingError } from '../resumeParser';
import { handlePdfParsing } from './image/pdfParser';
import { 
  parseWithEnhancedParser,
  parseWithLegacyParser, 
  parseWithEnhancedEdgeFunction,
  parseWithAIExtraction
} from './parsingMethods';

/**
 * Core parsing function that executes the parsing pipeline
 * @param file File to parse
 * @param fileContent File content as string
 * @returns Promise resolving to parsed resume data
 */
export const parseFileContent = async (file: File, fileContent: string): Promise<Partial<ResumeData>> => {
  const startTime = Date.now();
  
  try {
    // Check if we have content to parse
    if (!fileContent) {
      const error = new Error('Could not read file content') as ParsingError;
      error.code = 'EMPTY_CONTENT';
      throw error;
    }
    
    // Early check for PDF raw headers
    let contentToProcess = fileContent;
    if (file.type === 'application/pdf' && fileContent.startsWith('%PDF')) {
      try {
        contentToProcess = await handlePdfParsing(file, fileContent);
      } catch (pdfError) {
        throw pdfError;
      }
    }
    
    // Try each parsing method in sequence with fallback mechanism
    try {
      // First try the enhanced parser
      return parseWithEnhancedParser(contentToProcess, file, startTime);
    } catch (enhancedError) {
      console.error('Enhanced parsing error:', enhancedError);
      
      try {
        // Fallback to legacy parser
        return parseWithLegacyParser(contentToProcess, file, startTime, enhancedError);
      } catch (legacyError) {
        console.error('Legacy extraction error:', legacyError);
        
        // If legacy fails, check if it might be a scanned PDF
        if (file.type === 'application/pdf' && fileContent.startsWith('%PDF') && fileContent.length < 1000) {
          const error = new Error('This appears to be a scanned PDF without extractable text. Please try the Image Upload option instead.') as ParsingError;
          error.code = 'SCANNED_PDF';
          error.details = { fileType: file.type, fileSize: file.size };
          error.parserType = 'file';
          throw error;
        }
        
        try {
          // Fallback to enhanced edge function
          return await parseWithEnhancedEdgeFunction(contentToProcess, file, startTime, legacyError);
        } catch (enhancedEdgeError) {
          console.error('Enhanced edge function failed:', enhancedEdgeError);
          
          try {
            // Final fallback to AI extraction
            return await parseWithAIExtraction(contentToProcess, file, startTime, enhancedEdgeError);
          } catch (aiError) {
            console.error('AI extraction failed:', aiError);
            
            // If all methods fail, return a comprehensive error
            const parseError = new Error('All parsing methods failed. Please try a different file format or check if the resume contains extractable text.') as ParsingError;
            parseError.code = 'ALL_METHODS_FAILED';
            parseError.details = {
              fileType: file.type,
              fileSize: file.size,
              attemptedMethods: ['enhanced-local', 'legacy-regex', 'enhanced-edge', 'ai-edge']
            };
            parseError.parserType = 'file';
            
            throw parseError;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in parseFileContent:', error);
    throw error;
  }
};
