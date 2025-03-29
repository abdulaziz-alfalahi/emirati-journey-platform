
import { ResumeData } from '../../types';
import mammoth from 'mammoth';
import { extractDataFromContent } from '../../utils/resumeContentParser';
import { sanitizeResumeData } from '../../utils/helpers/validation';
import { ProcessedResult } from './processorTypes';

/**
 * Process DOCX file using mammoth.js
 * @param file DOCX file to process
 * @returns Promise resolving to processed resume data
 */
export const processDocxFile = async (file: File): Promise<ProcessedResult> => {
  console.log("Processing DOCX file with mammoth.js");
  const startTime = Date.now();
  
  try {
    // Use mammoth.js to extract text from DOCX
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    
    console.log(`Extracted ${text.length} characters from DOCX`);
    
    // Extract structured data from text content
    const parsedData = extractDataFromContent(text, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    const processingTime = Date.now() - startTime;
    
    // Sanitize the data
    const sanitizedData = sanitizeResumeData(parsedData);
    
    // Add metadata
    sanitizedData.metadata = {
      ...(sanitizedData.metadata || {}),
      parsingMethod: 'docx-mammoth',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime
    };
    
    return {
      parsedData: sanitizedData,
      parsingMethod: 'docx-mammoth',
      processingTime
    };
  } catch (error) {
    console.error("Error processing DOCX file:", error);
    throw new Error(`Failed to process DOCX file: ${error instanceof Error ? error.message : String(error)}`);
  }
};
