
import { ResumeData } from '../../types';
import { toast } from 'sonner';
import * as mammoth from 'mammoth';
import { extractDataFromContent } from '../../utils/resumeContentParser';
import { sanitizeResumeData } from '../../utils/helpers/validation';
import { ProcessedResult } from './processorTypes';

/**
 * Process Word document as binary data using mammoth.js
 * @param file The DOCX file to process
 * @returns Promise resolving to extracted text
 */
export const extractTextFromDocx = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error("Failed to read file");
        }
        
        // Convert the ArrayBuffer to a Uint8Array that mammoth can process
        const arrayBuffer = event.target.result as ArrayBuffer;
        
        // Extract text using mammoth
        const result = await mammoth.extractRawText({ arrayBuffer });
        console.log("Mammoth extraction result:", result);
        
        if (!result.value) {
          throw new Error("No text content extracted from DOCX");
        }
        
        resolve(result.value);
      } catch (error) {
        console.error("Error extracting text from DOCX:", error);
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      console.error("File reading error:", error);
      reject(new Error("Failed to read DOCX file"));
    };
    
    // Read the file as an ArrayBuffer for binary processing
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Process a DOCX file into resume data
 * @param file The DOCX file to process
 * @returns Promise resolving to processed resume data
 */
export const processDocxFile = async (file: File): Promise<ProcessedResult> => {
  console.log("Processing DOCX file with mammoth");
  const startTime = Date.now();
  
  try {
    // Extract text from binary DOCX using mammoth
    const docxText = await extractTextFromDocx(file);
    console.log("Extracted text from DOCX:", docxText.substring(0, 200) + "...");
    
    if (!docxText || docxText.length < 50) {
      throw new Error("Insufficient text content extracted from Word document");
    }
    
    // Use the extract function with the extracted text
    const parsedData = extractDataFromContent(docxText, "text/plain");
    
    const processingTime = Date.now() - startTime;
    
    // Add metadata
    parsedData.metadata = {
      ...(parsedData.metadata || {}),
      fileType: file.type,
      fileSize: file.size,
      processingTime,
      parsingMethod: 'mammoth-docx-extraction'
    };
    
    return {
      parsedData: sanitizeResumeData(parsedData),
      parsingMethod: 'mammoth-docx-extraction',
      usedFallback: false,
      processingTime
    };
  } catch (docxError) {
    console.error("Mammoth DOCX extraction failed:", docxError);
    toast.error("Word Document Processing Failed", {
      description: "Unable to process the Word document. Please save as PDF and try again.",
    });
    
    throw new Error(
      docxError instanceof Error 
        ? docxError.message 
        : "Failed to process Word document. Please save as PDF and try again."
    );
  }
};
