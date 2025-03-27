
import { ResumeData } from '../types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from '../utils/resumeParser';
import { isEmptyResumeData, validateResumeFileType, validateResumeImageType, validateFileSize, validateLinkedInUrl } from '../utils/helpers/validation';
import { mergeResumeData as mergeResumeDataFromUtils } from '../utils/resumeDataUtils';
import { toast } from 'sonner';

export interface ProcessedResult {
  parsedData: Partial<ResumeData>;
  parsingMethod: string;
  usedFallback: boolean;
  processingTime?: number;
  error?: string;
}

/**
 * Handle file upload and parsing
 * @param file File to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeFile = async (file: File): Promise<ProcessedResult> => {
  // Validate file size
  const sizeValidation = validateFileSize(file.size);
  if (!sizeValidation.isValid) {
    throw new Error(`File too large. Please upload a file smaller than ${sizeValidation.maxSizeInMB}MB.`);
  }
  
  // Validate file type
  const typeValidation = validateResumeFileType(file.type);
  if (typeValidation.isUnsupported) {
    toast.warning("Unsupported file type", {
      description: `For best results, use ${typeValidation.supportedTypes.join(', ')} files.`,
    });
  }
  
  const startTime = Date.now();
  const parsedData = await parseResumeFromFile(file);
  const processingTime = Date.now() - startTime;
  
  // Validate parsed data
  if (!parsedData || isEmptyResumeData(parsedData)) {
    throw new Error("Could not extract meaningful data from your resume. Please try a different file.");
  }

  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedFallback = parsingMethod === 'legacy-regex' || parsingMethod === 'enhanced-edge' || parsingMethod === 'ai-edge';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback,
    processingTime
  };
};

/**
 * Handle image upload and parsing
 * @param file Image file to parse
 * @returns Promise resolving to processed resume data
 */
export const processResumeImage = async (file: File): Promise<ProcessedResult> => {
  // Validate file size
  const sizeValidation = validateFileSize(file.size, 10 * 1024 * 1024); // 10MB limit for images
  if (!sizeValidation.isValid) {
    throw new Error(`Image too large. Please upload an image smaller than ${sizeValidation.maxSizeInMB}MB.`);
  }
  
  // Validate image type
  const typeValidation = validateResumeImageType(file.type);
  if (typeValidation.isUnsupported) {
    throw new Error(`Unsupported image format. Please upload ${typeValidation.supportedTypes.join(', ')} images.`);
  }
  
  const startTime = Date.now();
  const parsedData = await parseResumeFromImage(file);
  const processingTime = Date.now() - startTime;
  
  // Validate parsed data
  if (!parsedData || isEmptyResumeData(parsedData)) {
    throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
  }
  
  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedFallback = parsingMethod === 'image-fallback';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback,
    processingTime
  };
};

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

/**
 * Merge resume data with better validation
 * @param currentData Current resume data
 * @param parsedData New parsed data to merge
 * @returns Merged resume data
 */
export const mergeResumeData = (currentData: ResumeData, parsedData: Partial<ResumeData>): ResumeData => {
  // Use the utility function instead of redefining the merge logic
  return mergeResumeDataFromUtils(currentData, parsedData);
};
