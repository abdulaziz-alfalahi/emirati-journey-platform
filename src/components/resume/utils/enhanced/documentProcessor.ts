
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
    // For Word document content - enhanced processing to remove XML artifacts
    text = cleanWordDocument(fileContent);
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

// Enhanced helper function specifically for Word documents
export const cleanWordDocument = (content: string): string => {
  if (!content) return "";
  
  // First, check if this is actually Word XML content
  const hasXmlMarkers = content.includes('<?xml') || 
                         content.includes('[Content_Types]') ||
                         content.includes('PK!') ||
                         content.includes('_rels') ||
                         content.includes('docProps');
  
  if (hasXmlMarkers) {
    console.log("Word document contains XML markers, applying specialized cleaning");
    
    // Check if content seems totally corrupted (common with some DOCX files)
    if (content.length > 1000 && 
        !content.match(/[a-zA-Z]{5,}/g) && 
        (content.includes('PK!') || content.includes('[Content_Types]'))) {
      console.error("DOCX file appears to be corrupted or binary content");
      return "Could not extract text from this Word document. The file might be corrupted or in an unsupported format.";
    }
    
    // Remove XML tags and common Word XML artifacts
    let cleaned = content
      .replace(/<\?xml[^>]*>/g, '')
      .replace(/PK![\s\S]*?\.xml/g, '')
      .replace(/\[Content_Types\][\s\S]*?\.xml/g, '')
      .replace(/<w:[\s\S]*?>/g, '')
      .replace(/<\/w:[\s\S]*?>/g, '')
      .replace(/<[\s\S]*?>/g, '\n')
      .replace(/https:\/\/document\.xml/g, '')
      .replace(/https:\/\/docProps/g, '');
    
    // Extract text between <t> tags which typically contain actual content in Word XML
    const textMatches = content.match(/<t>[\s\S]*?<\/t>/g);
    if (textMatches && textMatches.length > 0) {
      cleaned = textMatches
        .map(match => match.replace(/<t>|<\/t>/g, ''))
        .join('\n');
    }
    
    // Extract and clean word xml document paragraphs
    const paragraphs = content.match(/<w:p[\s\S]*?<\/w:p>/g);
    if (paragraphs && paragraphs.length > 0) {
      const paragraphTexts = paragraphs
        .map(p => {
          // Extract text runs within each paragraph
          const runs = p.match(/<w:t[\s\S]*?<\/w:t>/g);
          if (runs && runs.length > 0) {
            return runs
              .map(r => r.replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>/, '$1'))
              .join(' ');
          }
          return '';
        })
        .filter(text => text.trim().length > 0);
      
      if (paragraphTexts.length > 0) {
        cleaned = paragraphTexts.join('\n\n');
      }
    }
    
    // Additional cleaning for obvious binary/XML artifacts that made it through
    cleaned = cleaned
      .replace(/PK!/g, '')
      .replace(/\[Content_Types\]/g, '')
      .replace(/docProps/g, '')
      .replace(/_rels/g, '')
      .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
    
    // Special check for still-corrupted content
    const wordCount = cleaned.split(/\s+/).filter(w => w.length > 1).length;
    const nonTextRatio = (cleaned.replace(/[a-zA-Z0-9\s.,;:'"!?()-]/g, '').length / cleaned.length);
    
    if (wordCount < 5 || nonTextRatio > 0.3) {
      console.error("After cleaning, document still contains too many non-text characters");
      return "Could not properly extract text from this Word document. The file may be corrupted or in an unsupported format.";
    }
    
    return cleanText(cleaned);
  }
  
  // For normal text content (not XML), apply standard cleaning
  return cleanText(content);
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
