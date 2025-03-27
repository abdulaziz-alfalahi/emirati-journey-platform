
/**
 * Main resume parser entry point
 */
import { ResumeData } from '../types';

// Import individual parser modules
import { parseResumeFromFile } from './parsers/fileParser';
import { parseResumeFromImage } from './parsers/imageParser';
import { importFromLinkedIn } from './parsers/linkedInImporter';
import { isEmptyResumeData } from './helpers/validation';

// Re-export for backward compatibility
export { extractFromLinkedIn } from './parsers/linkedInParser';
export { mergeResumeData } from './resumeDataUtils';
export { enhancedResumeParser } from './enhancedResumeParser';

// Export the individual parsers
export {
  parseResumeFromFile,
  parseResumeFromImage,
  importFromLinkedIn,
  isEmptyResumeData
};
