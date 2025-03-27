
import { ResumeData } from '../../types';
import { sanitizeResumeData } from '../../utils/helpers/validation';

/**
 * Merge resume data with better validation
 * @param currentData Current resume data
 * @param parsedData New parsed data to merge
 * @returns Merged resume data
 */
export const mergeResumeData = (currentData: ResumeData, parsedData: Partial<ResumeData>): ResumeData => {
  // Sanitize data before merging
  const sanitizedData = sanitizeResumeData(parsedData);
  
  // Import and use the utility function for the actual merging
  const { mergeResumeData: mergeResumeDataFromUtils } = require('../../utils/resumeDataUtils');
  return mergeResumeDataFromUtils(currentData, sanitizedData);
};
