
import { useState, useRef } from 'react';
import { ResumeData } from '../../types';
import { processResumeFile, mergeResumeData } from '../importUtils';
import { toast } from 'sonner';

interface UseFileUploadProps {
  onImportComplete: (data: ResumeData) => void;
  onError?: (error: Error) => void;
  currentData: ResumeData;
}

export const useFileUpload = ({ onImportComplete, onError, currentData }: UseFileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to validate parsed data
  const validateParsedData = (data: Partial<ResumeData>): boolean => {
    // Check for corrupt personal data patterns
    const suspiciousPatterns = [
      /PK!/,
      /\[Content_Types\]/,
      /docProps/,
      /<%/,
      /%>/,
      /\uFFFD/,  // Unicode replacement character
      /[^\x20-\x7E\s]/g, // Non-printable ASCII characters
      /[!@#$%^&*()]{3,}/,  // Multiple special characters in a row
      /^\s*l"%\d+/  // Specific pattern seen in corrupted Word docs
    ];
    
    // Check personal info fields
    if (data.personal) {
      for (const key in data.personal) {
        const value = data.personal[key];
        if (typeof value !== 'string') continue;
        
        for (const pattern of suspiciousPatterns) {
          if (pattern.test(value)) {
            console.error(`Corrupted data detected in ${key}:`, value);
            return false;
          }
        }
      }
    }
    
    // Ensure we have at least some meaningful data
    const hasValidName = data.personal?.fullName && 
                        data.personal.fullName !== "Not found" && 
                        data.personal.fullName.length > 1;
                        
    // If we have almost no data and it's all "Not found", it's likely an error
    const allNotFound = data.personal?.fullName === "Not found" &&
                       data.personal?.email === "Not found" &&
                       data.personal?.phone === "Not found";
                       
    if (allNotFound) {
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Store the selected file without uploading yet
    setSelectedFile(file);
    setUploadError(null);
    
    // Check file extension for Word documents and provide pre-warning for .docx files
    if (file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx')) {
      console.log('Word document detected, informing user about special handling');
      toast.info("Word Document Detected", {
        description: "We'll use special processing for your Word document. For best results, consider using PDF format.",
        duration: 5000,
      });
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    
    const toastId = toast.loading("Processing Resume", {
      description: "Analyzing your resume file...",
    });
    
    try {
      const { parsedData, usedFallback } = await processResumeFile(selectedFile);
      
      // Validate parsed data to ensure it's not corrupted
      const isDataValid = validateParsedData(parsedData);
      
      if (!isDataValid) {
        throw new Error(
          "Your document contains formatting that couldn't be properly parsed. " +
          "For Word documents (.docx/.doc), please save as PDF first or use the image upload option instead."
        );
      }
      
      if (usedFallback) {
        toast.warning("Basic Extraction Used", {
          id: toastId,
          description: "Limited data was extracted from your resume due to formatting issues.",
        });
      } else {
        toast.success("Resume Processed", {
          id: toastId,
          description: "Your resume has been processed successfully.",
        });
      }
      
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        onImportComplete(mergedData);
      } else {
        console.error('Error: onImportComplete is not a function');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
      // Reset the state
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      return true;
    } catch (error) {
      console.error('Error parsing resume:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume";
      
      // Make the error message more user-friendly for Word documents
      if (selectedFile.name.toLowerCase().endsWith('.doc') || selectedFile.name.toLowerCase().endsWith('.docx')) {
        errorMessage = "Word document parsing failed. Please save your document as PDF and try again, or use the Image Upload option.";
      }
      
      setUploadError(errorMessage);
      
      toast.error("Error Processing Resume", {
        id: toastId,
        description: errorMessage,
      });
      
      // Forward the error to parent component if handler provided
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadError,
    selectedFile,
    fileInputRef,
    handleFileChange,
    handleFileUpload,
    setUploadError
  };
};
