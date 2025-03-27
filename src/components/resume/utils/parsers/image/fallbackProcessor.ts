
import { ResumeData } from '../../../types';

/**
 * Create basic fallback resume data when all extraction methods fail
 * @param file Original file object
 * @param error Error that caused the fallback
 * @param startTime Processing start time
 * @returns Basic resume data structure
 */
export const createFallbackResumeData = (
  file: File,
  error: Error,
  startTime: number
): Partial<ResumeData> => {
  return {
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    },
    summary: file.type === 'application/pdf' 
      ? "Could not extract text from this PDF. It might be password-protected or corrupted."
      : "Limited information could be extracted from this image.",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    metadata: {
      parsingMethod: 'image-fallback',
      parsedAt: new Date().toISOString(),
      fileType: file.type,
      fileSize: file.size,
      processingTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallbackReason: 'All extraction methods failed'
    }
  };
};
