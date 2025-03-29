
import React, { useState } from 'react';
import { ResumeData } from '../types';
import LinkedInImportDialog from './LinkedInImportDialog';
import FileImportDialog from './FileImportDialog';
import ImageImportDialog from './ImageImportDialog';
import { ImportAlert } from './components/ImportAlert';
import { ImportButtons } from './components/ImportButtons';
import { toast } from 'sonner';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  // Debug logging to verify onImportComplete
  console.log('ImportOptions rendered, onImportComplete type:', typeof onImportComplete);
  console.log('currentData structure:', Object.keys(currentData).join(', '));
  
  const [fileImportOpen, setFileImportOpen] = useState(false);
  const [imageImportOpen, setImageImportOpen] = useState(false);
  const [linkedInImportOpen, setLinkedInImportOpen] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);
  
  // Check if current data contains obvious corruption
  const hasCorruptedData = React.useMemo(() => {
    const { personal, metadata } = currentData;
    if (!personal) return false;
    
    // Check for suspicious strings in personal info fields
    const suspiciousPatterns = [
      /PK!/,
      /\[Content_Types\]/,
      /docProps/,
      /<%/,
      /%>/,
      /\uFFFD/,  // Unicode replacement character
      /[^\x20-\x7E\s]/g, // Non-printable ASCII characters
      /[!@#$%^&*()]{3,}/,  // Multiple special characters in a row
      /^\s*l"%\d+/,  // Specific pattern seen in corrupted Word docs
      /^\s*l"%.+%=/   // Extended pattern for Word corruptions
    ];
    
    let isCorrupted = false;
    
    // Check each field in personal
    for (const key in personal) {
      const value = personal[key];
      if (typeof value !== 'string') continue;
      
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          console.error(`Corrupted data detected in ${key}:`, value);
          isCorrupted = true;
          break;
        }
      }
      
      // Check for "Not found" values when metadata indicates parsing failure
      if (value === "Not found" && metadata?.error) {
        isCorrupted = true;
      }
    }
    
    // Special check for Word documents with DOCX metadata
    if (metadata?.fileType?.includes('word') || 
        metadata?.fileType?.includes('officedocument') ||
        metadata?.fileType?.includes('docx')) {
      // If there are multiple "Not found" values and strange jobTitle, likely corruption
      const notFoundCount = Object.values(personal).filter(v => v === "Not found").length;
      if (notFoundCount >= 3 && 
          (personal.jobTitle && 
           (personal.jobTitle.includes('%') || 
            personal.jobTitle.includes('"') || 
            personal.jobTitle.includes('\\')))) {
        console.warn('Word document corruption pattern detected');
        isCorrupted = true;
      }
    }
    
    // Check if metadata indicates parsing issues
    if (metadata?.error || metadata?.fallbackReason) {
      isCorrupted = true;
    }
    
    return isCorrupted;
  }, [currentData]);
  
  // Handler for when parsing fails
  const handleParsingError = (error: Error) => {
    setParsingError(error.message);
    toast.error("Parsing Failed", {
      description: error.message,
      duration: 5000
    });
  };
  
  // Clear error when dialogs are closed
  const handleDialogClose = () => {
    setParsingError(null);
  };
  
  const isWordDocument = currentData.metadata?.fileType?.includes('word') || 
                         currentData.metadata?.fileType?.includes('officedocument') || 
                         currentData.metadata?.fileType?.includes('docx');

  return (
    <div className="space-y-3">
      <ImportAlert 
        parsingError={parsingError}
        hasCorruptedData={hasCorruptedData}
        isWordDocument={isWordDocument}
      />
      
      <ImportButtons
        onOpenFileImport={() => setFileImportOpen(true)}
        onOpenImageImport={() => setImageImportOpen(true)}
        onOpenLinkedInImport={() => setLinkedInImportOpen(true)}
      />
      
      <FileImportDialog 
        open={fileImportOpen} 
        onOpenChange={(open) => {
          setFileImportOpen(open);
          if (!open) handleDialogClose();
        }}
        onImportComplete={onImportComplete}
        onError={handleParsingError}
        currentData={currentData}
      />
      
      <ImageImportDialog 
        open={imageImportOpen} 
        onOpenChange={(open) => {
          setImageImportOpen(open);
          if (!open) handleDialogClose();
        }}
        onImportComplete={onImportComplete}
        currentData={currentData}
      />
      
      <LinkedInImportDialog 
        open={linkedInImportOpen}
        onOpenChange={(open) => {
          setLinkedInImportOpen(open);
          if (!open) handleDialogClose();
        }}
        onImportComplete={onImportComplete}
        currentData={currentData}
      />
    </div>
  );
};

export default ImportOptions;
