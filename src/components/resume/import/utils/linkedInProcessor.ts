
import { ResumeData } from '../../types';
import { importFromLinkedIn } from '../../utils/parsers/linkedInImporter';
import { validateLinkedInUrl } from '../../utils/helpers/validation';
import { ProcessedResult } from './processorTypes';
import { toast } from 'sonner';

/**
 * Process LinkedIn profile import
 * @param linkedInUrl LinkedIn profile URL
 * @returns Promise resolving to processed LinkedIn data
 */
export const processLinkedInProfile = async (linkedInUrl: string): Promise<ProcessedResult> => {
  // Validate LinkedIn URL
  const urlValidation = validateLinkedInUrl(linkedInUrl);
  if (!urlValidation.isValid) {
    throw new Error(urlValidation.errorMessage || "Invalid LinkedIn URL");
  }

  const startTime = Date.now();
  const linkedInData = await importFromLinkedIn(linkedInUrl);
  const processingTime = Date.now() - startTime;
  
  return {
    parsedData: linkedInData,
    parsingMethod: linkedInData.metadata?.parsingMethod || 'linkedin-import',
    usedFallback: false,
    processingTime
  };
};
