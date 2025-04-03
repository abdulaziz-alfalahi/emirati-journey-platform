
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
      
      if (user) {
        // Use the integrated Supabase + Affinda service if user is logged in
        await parseAndSaveResume(
          file, 
          user.id,
          (parsedData) => {
            const mergedData = mergeResumeData(currentData, parsedData);
            onImportComplete(mergedData);
          },
          onError
        );
        return true;
      } else {
        // Fall back to client-side processing if no user is logged in
        const { parsedData, usedFallback } = await processResumeFile(file);
        
        // Check for obvious PDF corruption markers in the personal data
        const hasPdfCorruption = parsedData.personal && 
                              (parsedData.personal.fullName?.includes('%') || 
                               parsedData.personal.jobTitle?.includes('/') ||
                               parsedData.personal.jobTitle?.includes('Metadata') ||
                               parsedData.personal.email?.includes('xref'));
        
        if (hasPdfCorruption) {
          console.error('Detected corrupted PDF data in parsed result:', parsedData.personal);
          toast.error("Document Processing Error", {
            description: "This document contains formatting that prevents proper text extraction. Please try converting it to a different format.",
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
