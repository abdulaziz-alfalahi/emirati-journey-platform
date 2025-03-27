
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
      const imageMarkers = (content.match(/\/Image/g) || []).length * 3; // Weight images more heavily
      
      // Look specifically for PDF artifacts in the first 10KB
      const firstPortion = content.substring(0, 10 * 1024);
      const artifactMarkers = (firstPortion.match(/%PDF|\/Page|\/Contents|\/Resources|endobj|stream/g) || []).length;
      
      // If there are significantly more image markers than text markers or high artifact ratio
      const isLikelyScanned = (hasImageContent && (!hasTextContent || imageMarkers > textMarkers)) || 
                              (artifactMarkers > 30 && textMarkers < 10);
      
      resolve(isLikelyScanned);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read just the first 10KB to check header and markers
    const blob = file.slice(0, 10 * 1024);
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
      
      // Look for actual text content (not just PDF markers)
      // A real text PDF should have substantial text outside of PDF markers
      const pdfMarkers = '%PDF /Type /Page /Contents /Resources obj endobj stream endstream xref trailer'.split(' ');
      let cleanContent = content;
      
      // Remove PDF markers from content
      pdfMarkers.forEach(marker => {
        cleanContent = cleanContent.replace(new RegExp(marker, 'g'), ' ');
      });
      
      // Check if there's meaningful text remaining
      const hasSubstantialText = cleanContent.replace(/\s+/g, ' ').trim().length > 500;
      
      resolve(hasOcrIndicators || hasSubstantialText);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read a larger chunk for OCR detection
    const blob = file.slice(0, 20 * 1024);
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

/**
 * Extracts pure text content from PDF by removing PDF artifacts
 * @param content Raw text content from PDF
 * @returns Cleaned text content
 */
export const cleanPdfArtifacts = (content: string): string => {
  if (!content) return '';
  
  // Skip if not a PDF
  if (!content.startsWith('%PDF')) return content;
  
  // Remove common PDF artifact patterns
  let cleaned = content;
  
  // Remove PDF header and binary data
  cleaned = cleaned.replace(/%PDF-[\d.]+[\s\S]*?(?=\w{2,})/i, '');
  
  // Remove PDF object definitions
  cleaned = cleaned.replace(/\d+ \d+ obj[\s\S]*?endobj/g, ' ');
  
  // Remove stream content
  cleaned = cleaned.replace(/stream[\s\S]*?endstream/g, ' ');
  
  // Remove PDF operators
  cleaned = cleaned.replace(/\/\w+\s+/g, ' ');
  
  // Remove xref tables
  cleaned = cleaned.replace(/xref[\s\S]*?trailer/g, ' ');
  
  // Remove other common artifacts
  cleaned = cleaned.replace(/startxref[\s\S]*?%%EOF/g, ' ');
  
  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
};
