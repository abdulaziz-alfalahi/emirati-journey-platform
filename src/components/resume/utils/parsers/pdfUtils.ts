
/**
 * Utility functions for handling PDF files during resume parsing
 */

/**
 * Checks if the file is likely a scanned PDF (image-based rather than text-based)
 * This is a client-side check to determine if we should use the image API instead
 * 
 * @param file PDF file to check
 * @returns Promise resolving to boolean indicating if the file is likely a scanned PDF
 */
export const checkIfScannedPdf = async (file: File): Promise<boolean> => {
  if (file.type !== 'application/pdf') return false;
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        resolve(false);
        return;
      }
      
      // Check if content has PDF header
      if (!content.startsWith('%PDF')) {
        resolve(false);
        return;
      }
      
      // Check for text extraction markers
      const hasTextContent = content.includes('/Text') || 
                             content.includes('/Font') || 
                             content.includes('/TJ') ||
                             content.includes('/Tj');
      
      // Check for image indicators
      const hasImageContent = content.includes('/Image') && 
                             content.includes('/XObject');
      
      // Check text to PDF marker ratio
      const textMarkers = (content.match(/\/Text|\/Font|\/TJ|\/Tj/g) || []).length;
      const imageMarkers = (content.match(/\/Image/g) || []).length * 2; // Weight images more
      
      // If there are significantly more image markers than text markers
      const isLikelyScanned = hasImageContent && 
                             (!hasTextContent || imageMarkers > textMarkers);
      
      resolve(isLikelyScanned);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read just the first 5KB to check header and markers
    const blob = file.slice(0, 5 * 1024);
    reader.readAsText(blob);
  });
};

/**
 * Determines if the PDF has been OCR'd already
 * This checks for presence of actual text content despite being image-based
 * 
 * @param file PDF file to check
 * @returns Promise resolving to boolean indicating if the PDF has OCR content
 */
export const hasOcrContent = async (file: File): Promise<boolean> => {
  if (file.type !== 'application/pdf') return false;
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        resolve(false);
        return;
      }
      
      // Check for OCR indicators - specific patterns found in OCR'd PDFs
      const hasOcrIndicators = 
        content.includes('/ActualText') || 
        content.includes('/Alt') ||
        (content.includes('/Image') && content.includes('/Text'));
      
      resolve(hasOcrIndicators);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read a larger chunk for OCR detection
    const blob = file.slice(0, 10 * 1024);
    reader.readAsText(blob);
  });
};

/**
 * Helper to determine the best parsing approach for a PDF
 * @param file PDF file to analyze
 * @returns Promise resolving to recommended approach: 'text', 'image', or 'dual'
 */
export const determineParsingStrategy = async (file: File): Promise<'text' | 'image' | 'dual'> => {
  if (file.type !== 'application/pdf') return 'text';
  
  const isScanned = await checkIfScannedPdf(file);
  const hasOcr = await hasOcrContent(file);
  
  if (isScanned) {
    return hasOcr ? 'dual' : 'image';
  }
  
  return 'text';
};
