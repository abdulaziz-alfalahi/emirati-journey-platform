
import { ResumeData } from '../../../types';
import { supabase } from '@/integrations/supabase/client';
import { ParsingError } from '../../resumeParser';
import { toast } from 'sonner';
import { isEmptyResumeData, sanitizeResumeData } from '../../helpers/validation';

/**
 * Read PDF as text for fallback processing
 * @param file PDF file
 * @returns Promise resolving to text content
 */
export const readPdfAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        resolve(content || '');
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read PDF as text'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Process PDF text as fallback when image processing fails
 * @param file The PDF file
 * @param startTime Processing start time for timing information
 * @returns Promise resolving to parsed resume data
 */
export const processPdfWithTextFallback = async (
  file: File, 
  startTime: number
): Promise<{ parsedData: Partial<ResumeData>; success: boolean }> => {
  try {
    console.log('Attempting fallback to extract-resume-data for PDF...');
    
    // Convert PDF to text
    const pdfText = await readPdfAsText(file);
    
    if (!pdfText || pdfText.length < 100) {
      throw new Error('Could not extract sufficient text from PDF');
    }
    
    // Call the extract-resume-data Edge Function
    const textResponse = await supabase.functions.invoke('extract-resume-data', {
      body: { fileContent: pdfText },
    });
    
    if (textResponse.error) {
      throw new Error(`Text extraction fallback failed: ${textResponse.error.message}`);
    }
    
    const textData = textResponse.data;
    
    if (!textData || isEmptyResumeData(textData)) {
      throw new Error('No meaningful data returned from text extraction fallback');
    }
    
    // Sanitize and add metadata
    const sanitizedTextData = sanitizeResumeData(textData);
    sanitizedTextData.metadata = {
      ...(sanitizedTextData.metadata || {}),
      parsingMethod: 'pdf-text-fallback',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime: Date.now() - startTime
    };
    
    return { parsedData: sanitizedTextData, success: true };
  } catch (error) {
    console.error('PDF text fallback failed:', error);
    return { parsedData: {}, success: false };
  }
};
