
import { ResumeData } from '../types';
import { parseResumeFromFile, parseResumeFromImage, importFromLinkedIn } from '../utils/resumeParser';
import { toast } from 'sonner';

export interface ProcessedResult {
  parsedData: Partial<ResumeData>;
  parsingMethod: string;
  usedFallback: boolean;
  error?: string;
}

// Handle file upload and parsing
export const processResumeFile = async (file: File): Promise<ProcessedResult> => {
  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    throw new Error("File too large. Please upload a file smaller than 5MB.");
  }
  
  const supportedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
  const isUnsupportedType = !supportedTypes.includes(file.type);
  
  if (isUnsupportedType) {
    toast.warning("Unsupported file type", {
      description: "For best results, use PDF, DOC, DOCX, or TXT files.",
    });
  }
  
  const parsedData = await parseResumeFromFile(file);
  
  if (!parsedData || (
    (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
    (!parsedData.experience || parsedData.experience.length === 0) &&
    (!parsedData.education || parsedData.education.length === 0)
  )) {
    throw new Error("Could not extract meaningful data from your resume. Please try a different file.");
  }

  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedEnhancedParser = parsingMethod === 'enhanced-local';
  const usedFallback = parsingMethod === 'legacy-regex' || parsingMethod === 'enhanced-edge' || parsingMethod === 'ai-edge';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback
  };
};

// Handle image upload and parsing
export const processResumeImage = async (file: File): Promise<ProcessedResult> => {
  if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
    throw new Error("Image too large. Please upload an image smaller than 10MB.");
  }
  
  const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (!supportedImageTypes.includes(file.type)) {
    throw new Error("Unsupported image format. Please upload JPG, PNG, WebP, or HEIC images.");
  }
  
  const parsedData = await parseResumeFromImage(file);
  
  if (!parsedData || (
    (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
    (!parsedData.experience || parsedData.experience.length === 0) &&
    (!parsedData.education || parsedData.education.length === 0)
  )) {
    throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
  }
  
  // Check which parsing method was used
  const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
  const usedFallback = parsingMethod === 'image-fallback';
  
  return {
    parsedData,
    parsingMethod,
    usedFallback
  };
};

// Process LinkedIn profile import
export const processLinkedInProfile = async (linkedInUrl: string): Promise<ProcessedResult> => {
  if (!linkedInUrl.trim()) {
    throw new Error("Please enter your LinkedIn profile URL");
  }

  if (!linkedInUrl.includes('linkedin.com/in/')) {
    throw new Error("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile)");
  }

  const linkedInData = await importFromLinkedIn(linkedInUrl);
  
  return {
    parsedData: linkedInData,
    parsingMethod: linkedInData.metadata?.parsingMethod || 'linkedin-import',
    usedFallback: false
  };
};

// Merge resume data
export const mergeResumeData = (currentData: ResumeData, parsedData: Partial<ResumeData>): ResumeData => {
  return {
    ...currentData,
    ...parsedData,
    personal: {
      ...currentData.personal,
      ...parsedData.personal
    },
    experience: [...(parsedData.experience || [])],
    education: [...(parsedData.education || [])],
    skills: [...(parsedData.skills || [])],
    languages: [...(parsedData.languages || [])],
    metadata: {
      ...(currentData.metadata || {}),
      ...(parsedData.metadata || {}),
      lastUpdated: new Date().toISOString()
    }
  };
};
