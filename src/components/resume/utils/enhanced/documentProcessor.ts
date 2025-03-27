
/**
 * Document processor module for enhanced resume parsing
 * Handles document preprocessing based on file type
 */
import { v4 as uuidv4 } from 'uuid';

// Define the metadata type to include processingMethod
export interface DocumentMetadata {
  fileType: string;
  processedAt: string;
  textLength: number;
  processingMethod: string;
}

// Advanced document processor functionality
export const processDocument = (fileContent: string, fileType: string): { text: string, metadata: DocumentMetadata } => {
  console.log(`Processing document of type: ${fileType} with content length: ${fileContent.length}`);
  
  let text = fileContent;
  let metadata: DocumentMetadata = {
    fileType,
    processedAt: new Date().toISOString(),
    textLength: fileContent.length,
    processingMethod: 'generic-extraction'
  };
  
  // Process based on file type
  if (fileType.includes('pdf')) {
    // For PDF content that comes as text (already extracted client-side)
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-pdf';
  } 
  else if (fileType.includes('word') || fileType.includes('doc')) {
    // For Word document content
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-doc';
  } 
  else if (fileType.includes('text/plain')) {
    // For plain text
    text = cleanText(fileContent);
    metadata.processingMethod = 'text-extraction-from-txt';
  }
  else if (fileType.includes('html')) {
    // For HTML content, strip HTML tags
    text = stripHtml(fileContent);
    metadata.processingMethod = 'html-extraction';
  }
  else {
    // Default case - just clean the text
    text = cleanText(fileContent);
    metadata.processingMethod = 'generic-extraction';
  }
  
  return { text, metadata };
};

// Helper function to clean text similar to the Python implementation
export const cleanText = (text: string): string => {
  if (!text) return "";
  
  // Replace multiple newlines with a single newline
  text = text.replace(/\n\s*\n/g, '\n\n');
  
  // Replace multiple spaces with a single space
  text = text.replace(/ +/g, ' ');
  
  // Remove non-printable characters (adjust as needed for JS)
  text = text.replace(/[^\x20-\x7E\n]/g, '');
  
  return text.trim();
};

// Helper function to strip HTML tags
export const stripHtml = (html: string): string => {
  if (!html) return "";
  
  // First, replace <br>, <p>, <div> endings with newlines to preserve formatting
  const withLineBreaks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n');
  
  // Remove all other HTML tags
  const withoutTags = withLineBreaks.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decoded = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean the resulting text
  return cleanText(decoded);
};
