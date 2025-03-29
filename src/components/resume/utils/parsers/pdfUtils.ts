
/**
 * Utility functions for working with PDF files
 */
import { type ResumeData } from '../../types';
import { toast } from 'sonner';
import { getPdfMetadata } from './pdf/pdfJsProcessor';

/**
 * Check if a PDF appears to be scanned (image-based)
 * @param file PDF file to check
 * @returns Promise resolving to boolean
 */
export const checkIfScannedPdf = async (file: File): Promise<boolean> => {
  try {
    // First try using PDF.js to get metadata
    const metadata = await getPdfMetadata(file);
    
    // If PDF.js says it's a tagged PDF, it likely has proper text
    if (metadata.isTagged === 'true') {
      console.log('PDF is tagged, likely has proper text content');
      return false;
    }
    
    // Continue with traditional detection methods
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (!content) {
          resolve(false);
          return;
        }
        
        // Look for indicators of a scanned PDF
        const hasLimitedText = content.length < 1000; // Very little text content
        const hasPdfObjects = content.includes('/Image') || content.includes('/XObject');
        const hasLimitedTextObjects = !content.includes('/Text') || content.split('/Text').length < 5;
        
        // Check if cleaning would remove most content
        const cleanedLength = cleanPdfContent(content).length;
        const originalLength = content.length;
        const significantReduction = cleanedLength / originalLength < 0.1; // 90% reduction
        
        console.log(`PDF check - Original length: ${originalLength}, Cleaned length: ${cleanedLength}`);
        console.log(`PDF indicators - Limited text: ${hasLimitedText}, PDF objects: ${hasPdfObjects}, Limited text objects: ${hasLimitedTextObjects}`);
        
        // PDF is likely scanned if it has image objects and limited text content
        const isLikelyScanned = significantReduction || (hasPdfObjects && (hasLimitedText || hasLimitedTextObjects));
        
        resolve(isLikelyScanned);
      };
      
      reader.onerror = () => {
        resolve(false);
      };
      
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error in checkIfScannedPdf with PDF.js:', error);
    // Fall back to traditional method
    return traditionalCheckIfScannedPdf(file);
  }
};

/**
 * Traditional method to check if a PDF is scanned
 * @param file PDF file to check
 * @returns Promise resolving to boolean
 */
const traditionalCheckIfScannedPdf = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        resolve(false);
        return;
      }
      
      // Look for indicators of a scanned PDF
      const hasLimitedText = content.length < 1000; // Very little text content
      const hasPdfObjects = content.includes('/Image') || content.includes('/XObject');
      const hasLimitedTextObjects = !content.includes('/Text') || content.split('/Text').length < 5;
      
      // PDF is likely scanned if it has image objects and limited text content
      const isLikelyScanned = hasPdfObjects && (hasLimitedText || hasLimitedTextObjects);
      
      resolve(isLikelyScanned);
    };
    
    reader.onerror = () => {
      resolve(false);
    };
    
    reader.readAsText(file);
  });
};

/**
 * Clean PDF content by removing unwanted artifacts
 * @param content PDF content as string
 * @returns Cleaned content
 */
export const cleanPdfContent = (content: string): string => {
  // Remove PDF-specific markers and objects
  return content
    .replace(/%PDF-[\d.]+/g, '')
    .replace(/\b\d+\s+\d+\s+obj\b/g, '')
    .replace(/endobj|endstream|xref|trailer|startxref/g, '')
    .replace(/<<.*?>>/gs, '')
    .replace(/stream[\s\S]*?endstream/g, '')
    .trim();
};

/**
 * Alias for cleanPdfContent for backward compatibility
 * @param content PDF content as string
 * @returns Cleaned content
 */
export const cleanPdfArtifacts = cleanPdfContent;

/**
 * Determine the best parsing strategy for a PDF
 * @param file PDF file to analyze
 * @returns Promise resolving to parsing strategy
 */
export const determineParsingStrategy = async (file: File): Promise<'text' | 'image' | 'dual'> => {
  try {
    // First try to use PDF.js for analysis
    const metadata = await getPdfMetadata(file);
    
    // Check if PDF.js provides enough info to make a determination
    if (metadata.pageCount && parseInt(metadata.pageCount) > 0) {
      const isTagged = metadata.isTagged === 'true';
      
      if (isTagged) {
        console.log('PDF is tagged, using text extraction strategy');
        return 'text';
      }
    }
    
    // Fall back to traditional method if PDF.js doesn't give conclusive results
    const isScanned = await checkIfScannedPdf(file);
    
    if (isScanned) {
      return 'image';
    }
    
    // Read a portion of the file to check for image and text elements
    const buffer = await file.slice(0, Math.min(file.size, 100000)).arrayBuffer();
    const content = new TextDecoder().decode(buffer);
    
    const hasTextContent = content.includes('/Text') || !content.includes('/Image');
    const hasImageContent = content.includes('/Image') || content.includes('/XObject');
    
    if (hasTextContent && hasImageContent) {
      return 'dual';
    } else if (hasTextContent) {
      return 'text';
    } else {
      return 'image';
    }
  } catch (error) {
    console.error('Error determining PDF strategy:', error);
    // Default to dual approach if there's an error
    return 'dual';
  }
};

/**
 * Extract text content from a PDF
 * @param fileContent PDF content as string
 * @returns Extracted text content
 */
export const extractTextFromPdf = (fileContent: string): string => {
  // This is a simplified extraction - in practice would need a proper PDF text extractor
  let text = fileContent;
  
  // Clean PDF artifacts
  text = cleanPdfContent(text);
  
  // Try to extract text blocks
  const textBlocks = text.match(/\(([^)]+)\)/g) || [];
  if (textBlocks.length > 0) {
    // Join text blocks without parentheses
    return textBlocks.map(block => block.slice(1, -1)).join(' ');
  }
  
  // Return cleaned content if no text blocks found
  return text;
};

/**
 * Process a PDF file for resume parsing
 * @param file PDF file to process
 * @returns Promise resolving to best processing approach
 */
export const processPdfForResumeParsing = async (file: File): Promise<{
  strategy: 'text' | 'image' | 'dual',
  shouldUseImageParser: boolean
}> => {
  const strategy = await determineParsingStrategy(file);
  const shouldUseImageParser = strategy === 'image' || strategy === 'dual';
  
  // Display guidance based on strategy
  if (strategy === 'image') {
    toast.info("Scanned PDF Detected", {
      description: "This appears to be a scanned PDF. Using image-based extraction.",
    });
  } else if (strategy === 'dual') {
    toast.info("Mixed Content PDF", {
      description: "This PDF contains both text and images. Using optimal extraction method.",
    });
  }
  
  return { strategy, shouldUseImageParser };
};
