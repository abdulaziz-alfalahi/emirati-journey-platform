import { useState } from 'react';
import { ResumeData } from '../../../types';
import { processResumeFile } from '../../utils/fileProcessor';
import { mergeResumeData } from '../../utils/dataUtils';
import { toast } from 'sonner';
import { validateParsedData } from './useFileValidation';
import { parseAndSaveResume } from '@/services/resumeParserService';
import { useAuth } from '@/context/AuthContext';

interface UseProcessingProps {
  onImportComplete: (data: ResumeData) => void;
  onError?: (error: Error) => void;
  currentData: ResumeData;
}

/**
 * Hook to handle file processing logic
 */
export const useProcessing = ({
  onImportComplete,
  onError,
  currentData
}: UseProcessingProps) => {
  const [processingTimeoutId, setProcessingTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const processFile = async (file: File) => {
    const timeoutId = setTimeout(() => {
      console.warn("Document processing taking longer than expected");
      toast.info("Processing is taking longer than expected", {
        description: "Please be patient. Complex documents may take more time.",
        duration: 8000,
      });
    }, 10000); // 10 seconds timeout
    
    setProcessingTimeoutId(timeoutId);
    
    try {
      console.log(`Starting to process ${file.name} (${file.type}, ${file.size} bytes)`);
      
      // If the user is logged in, try to use the server-side parser
      if (user) {
        try {
          console.log("User is logged in, using server-side parsing via Affinda");
          
          // Validate file size before sending
          if (file.size > 10 * 1024 * 1024) { // 10MB limit
            throw new Error('File size exceeds 10MB limit. Please upload a smaller file.');
          }
          
          // Use the integrated Supabase + Affinda service
          await parseAndSaveResume(
            file, 
            user.id,
            (parsedData) => {
              console.log("Server-side parsing successful, updating resume data");
              const mergedData = mergeResumeData(currentData, parsedData);
              onImportComplete(mergedData);
            },
            onError
          );
          return true;
        } catch (serverError) {
          console.error('Error with server-side parsing, falling back to client-side:', serverError);
          toast.warning("Server parsing unavailable", {
            description: "Using local parsing as fallback.",
            duration: 5000
          });
          // Continue with client-side processing as fallback
        }
      }
      
      // Fall back to client-side processing if not logged in or API failed
      const { parsedData, usedFallback } = await processResumeFile(file);
      
      // Check for obvious PDF corruption markers in the personal data
      const hasPdfCorruption = isPdfContentCorrupted(parsedData);
      
      if (hasPdfCorruption) {
        console.error('Detected corrupted PDF data in parsed result:', parsedData.personal);
        toast.error("Document Processing Error", {
          description: "This document contains formatting that prevents proper text extraction. Please try a different file format or use our image upload option.",
        });
        
        // Create a clean version without corrupted data
        const cleanData: Partial<ResumeData> = {
          ...parsedData,
          personal: {
            fullName: "",
            jobTitle: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: ""
          },
          summary: "We couldn't extract text properly from this document. It might contain formatting that prevents text extraction. Please try uploading a different format.",
          metadata: {
            ...(parsedData.metadata || {}),
            processingError: "detected_corrupted_data",
            cleanedAt: new Date().toISOString()
          }
        };
        
        // Still return the cleaned data so the user can edit manually
        if (typeof onImportComplete === 'function') {
          const mergedData = mergeResumeData(currentData, cleanData);
          onImportComplete(mergedData);
        }
        
        return true;
      }
      
      // Validate parsed data to ensure it's not corrupted
      const isDataValid = validateParsedData(parsedData);
      
      if (!isDataValid) {
        throw new Error(
          "Your document contains formatting that couldn't be properly parsed. " +
          "Please save as PDF first or use the image upload option instead."
        );
      }
      
      if (usedFallback) {
        toast.warning("Basic Extraction Used", {
          description: "Limited data was extracted from your resume due to formatting issues.",
        });
      } else {
        toast.success("Resume Processed", {
          description: "Your resume has been processed successfully.",
        });
      }
      
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        onImportComplete(mergedData);
      } else {
        console.error('Error: onImportComplete is not a function');
        toast.error("Application Error", {
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
      return true;
    } catch (error) {
      // Clear the timeout
      clearTimeout(timeoutId);
      
      console.error('Error parsing resume:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume";
      
      // Make the error message more user-friendly for Word documents
      if (file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx')) {
        errorMessage = "Word document parsing failed. Please save your document as PDF and try again, or use the Image Upload option.";
      }
      
      toast.error("Error Processing Resume", {
        description: errorMessage,
      });
      
      // Forward the error to parent component if handler provided
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      return false;
    } finally {
      if (processingTimeoutId) {
        clearTimeout(processingTimeoutId);
        setProcessingTimeoutId(null);
      }
    }
  };

  return { processFile };
};

/**
 * Detects corrupted PDF content in parsed data
 */
function isPdfContentCorrupted(data: Partial<ResumeData>): boolean {
  if (!data.personal) return false;
  
  const corruptionPatterns = [
    /%[A-F0-9]{2}/i,            // PDF header markers like %PDF
    /\/[A-Z][a-z]+ \d+ \d+ R/i,  // PDF internal references
    /endobj|endstream|xref/i,     // PDF structure markers
    /\/Font|\/Type|\/Page/i,      // PDF element markers
    />>/,                        // PDF dictionary ending
    /^\s*l"%\d+/,                // Specific corrupted pattern
  ];
  
  // Check personal fields for corruption patterns
  let corruptionScore = 0;
  
  // Check name field for obvious corruption
  if (data.personal.fullName) {
    const name = data.personal.fullName;
    if (name.includes('%') || name.includes('/') || name.length === 1 || 
        name.includes('>>') || name.includes('Font') ||
        /^[^a-zA-Z]+$/.test(name)) {  // Name with no letters
      corruptionScore += 2;
    }
  }
  
  // Check job title for corruption
  if (data.personal.jobTitle) {
    const title = data.personal.jobTitle;
    if (title.includes('Font') || title.includes('R') || title.includes('<<') ||
        title.includes('/') || title.includes('stream') ||
        /^[^a-zA-Z]+$/.test(title)) {  // Title with no letters
      corruptionScore += 2;
    }
  }
  
  // Check other personal fields
  Object.values(data.personal).forEach(value => {
    if (typeof value === 'string') {
      corruptionPatterns.forEach(pattern => {
        if (pattern.test(value)) {
          corruptionScore++;
        }
      });
    }
  });
  
  // Also check if there's a suspicious lack of real data
  const hasAnyRealData = Object.values(data.personal).some(value => {
    if (typeof value !== 'string') return false;
    // Real data usually has words without special characters
    return /[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(value);
  });
  
  if (!hasAnyRealData && Object.values(data.personal).some(v => !!v)) {
    corruptionScore += 2;
  }
  
  return corruptionScore >= 3;
}

import { useState } from 'react';
import { ResumeData } from '../../../types';
import { processResumeFile } from '../../utils/fileProcessor';
import { mergeResumeData } from '../../utils/dataUtils';
import { toast } from 'sonner';
import { validateParsedData } from './useFileValidation';
import { parseAndSaveResume } from '@/services/resumeParserService';
import { useAuth } from '@/context/AuthContext';

interface UseProcessingProps {
  onImportComplete: (data: ResumeData) => void;
  onError?: (error: Error) => void;
  currentData: ResumeData;
}

/**
 * Hook to handle file processing logic
 */
export const useProcessing = ({
  onImportComplete,
  onError,
  currentData
}: UseProcessingProps) => {
  const [processingTimeoutId, setProcessingTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const processFile = async (file: File) => {
    const timeoutId = setTimeout(() => {
      console.warn("Document processing taking longer than expected");
      toast.info("Processing is taking longer than expected", {
        description: "Please be patient. Complex documents may take more time.",
        duration: 8000,
      });
    }, 10000); // 10 seconds timeout
    
    setProcessingTimeoutId(timeoutId);
    
    try {
      console.log(`Starting to process ${file.name}`);
      
      // If the user is logged in, try to use the server-side parser
      if (user) {
        try {
          console.log("User is logged in, using server-side parsing via Affinda");
          // Use the integrated Supabase + Affinda service
          await parseAndSaveResume(
            file, 
            user.id,
            (parsedData) => {
              console.log("Server-side parsing successful, updating resume data");
              const mergedData = mergeResumeData(currentData, parsedData);
              onImportComplete(mergedData);
            },
            onError
          );
          return true;
        } catch (serverError) {
          console.error('Error with server-side parsing, falling back to client-side:', serverError);
          toast.warning("Server parsing unavailable", {
            description: "Using local parsing as fallback.",
            duration: 5000
          });
          // Continue with client-side processing as fallback
        }
      }
      
      // Fall back to client-side processing if not logged in or API failed
      const { parsedData, usedFallback } = await processResumeFile(file);
      
      // Check for obvious PDF corruption markers in the personal data
      const hasPdfCorruption = isPdfContentCorrupted(parsedData);
      
      if (hasPdfCorruption) {
        console.error('Detected corrupted PDF data in parsed result:', parsedData.personal);
        toast.error("Document Processing Error", {
          description: "This document contains formatting that prevents proper text extraction. Please try a different file format or use our image upload option.",
        });
        
        // Create a clean version without corrupted data
        const cleanData: Partial<ResumeData> = {
          ...parsedData,
          personal: {
            fullName: "",
            jobTitle: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: ""
          },
          summary: "We couldn't extract text properly from this document. It might contain formatting that prevents text extraction. Please try uploading a different format.",
          metadata: {
            ...(parsedData.metadata || {}),
            processingError: "detected_corrupted_data",
            cleanedAt: new Date().toISOString()
          }
        };
        
        // Still return the cleaned data so the user can edit manually
        if (typeof onImportComplete === 'function') {
          const mergedData = mergeResumeData(currentData, cleanData);
          onImportComplete(mergedData);
        }
        
        return true;
      }
      
      // Validate parsed data to ensure it's not corrupted
      const isDataValid = validateParsedData(parsedData);
      
      if (!isDataValid) {
        throw new Error(
          "Your document contains formatting that couldn't be properly parsed. " +
          "Please save as PDF first or use the image upload option instead."
        );
      }
      
      if (usedFallback) {
        toast.warning("Basic Extraction Used", {
          description: "Limited data was extracted from your resume due to formatting issues.",
        });
      } else {
        toast.success("Resume Processed", {
          description: "Your resume has been processed successfully.",
        });
      }
      
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        onImportComplete(mergedData);
      } else {
        console.error('Error: onImportComplete is not a function');
        toast.error("Application Error", {
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
      return true;
    } catch (error) {
      // Clear the timeout
      clearTimeout(timeoutId);
      
      console.error('Error parsing resume:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume";
      
      // Make the error message more user-friendly for Word documents
      if (file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx')) {
        errorMessage = "Word document parsing failed. Please save your document as PDF and try again, or use the Image Upload option.";
      }
      
      toast.error("Error Processing Resume", {
        description: errorMessage,
      });
      
      // Forward the error to parent component if handler provided
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      return false;
    } finally {
      if (processingTimeoutId) {
        clearTimeout(processingTimeoutId);
        setProcessingTimeoutId(null);
      }
    }
  };

  return { processFile };
};

/**
 * Detects corrupted PDF content in parsed data
 */
function isPdfContentCorrupted(data: Partial<ResumeData>): boolean {
  if (!data.personal) return false;
  
  const corruptionPatterns = [
    /%[A-F0-9]{2}/i,            // PDF header markers like %PDF
    /\/[A-Z][a-z]+ \d+ \d+ R/i,  // PDF internal references
    /endobj|endstream|xref/i,     // PDF structure markers
    /\/Font|\/Type|\/Page/i,      // PDF element markers
    />>/,                        // PDF dictionary ending
    /^\s*l"%\d+/,                // Specific corrupted pattern
  ];
  
  // Check personal fields for corruption patterns
  let corruptionScore = 0;
  
  // Check name field for obvious corruption
  if (data.personal.fullName) {
    const name = data.personal.fullName;
    if (name.includes('%') || name.includes('/') || name.length === 1 || 
        name.includes('>>') || name.includes('Font') ||
        /^[^a-zA-Z]+$/.test(name)) {  // Name with no letters
      corruptionScore += 2;
    }
  }
  
  // Check job title for corruption
  if (data.personal.jobTitle) {
    const title = data.personal.jobTitle;
    if (title.includes('Font') || title.includes('R') || title.includes('<<') ||
        title.includes('/') || title.includes('stream') ||
        /^[^a-zA-Z]+$/.test(title)) {  // Title with no letters
      corruptionScore += 2;
    }
  }
  
  // Check other personal fields
  Object.values(data.personal).forEach(value => {
    if (typeof value === 'string') {
      corruptionPatterns.forEach(pattern => {
        if (pattern.test(value)) {
          corruptionScore++;
        }
      });
    }
  });
  
  // Also check if there's a suspicious lack of real data
  const hasAnyRealData = Object.values(data.personal).some(value => {
    if (typeof value !== 'string') return false;
    // Real data usually has words without special characters
    return /[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(value);
  });
  
  if (!hasAnyRealData && Object.values(data.personal).some(v => !!v)) {
    corruptionScore += 2;
  }
  
  return corruptionScore >= 3;
}
