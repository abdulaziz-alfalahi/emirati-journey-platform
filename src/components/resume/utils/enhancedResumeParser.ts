
/**
 * Enhanced Resume Parser - JavaScript Implementation
 * 
 * This module provides a JavaScript implementation of the Enhanced Resume Parser,
 * adapting the functionality for web browser environments without requiring a Python backend.
 * 
 * This is a barrel file that exports all the necessary components from the enhanced parser modules.
 */

// Export the main parser class and singleton instance
export { enhancedResumeParser, EnhancedResumeParser } from './enhanced/enhancedParserClass';

// Export utility functions for direct use if needed
export { processDocument, cleanText, stripHtml } from './enhanced/documentProcessor';
export { identifySections } from './enhanced/sectionIdentifier';
export { extractPersonalInfo } from './enhanced/entityExtractor';
export { validateResumeData, structureResumeData } from './enhanced/dataValidator';

// Export types
export type { DocumentMetadata } from './enhanced/documentProcessor';
