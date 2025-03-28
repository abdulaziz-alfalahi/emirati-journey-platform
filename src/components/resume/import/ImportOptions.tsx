
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Image, Linkedin, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ResumeData } from '../types';
import LinkedInImportDialog from './LinkedInImportDialog';
import FileImportDialog from './FileImportDialog';
import ImageImportDialog from './ImageImportDialog';
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

  return (
    <div className="space-y-3">
      {(parsingError || hasCorruptedData) && (
        <Alert variant="destructive" className="mb-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Document Parsing Issue</AlertTitle>
          <AlertDescription className="text-xs">
            {parsingError || 
              (currentData.metadata?.fileType?.includes('word') || 
               currentData.metadata?.fileType?.includes('officedocument') || 
               currentData.metadata?.fileType?.includes('docx') 
                ? "We're having trouble parsing your Word document. Word files can sometimes contain formatting that makes extraction difficult. Please save your document as a PDF and try again, or use the Image Upload option for better results."
                : "Your document contains formatting that couldn't be properly parsed. If you're uploading a Word document (.docx), please try saving it as PDF first or use the image upload option for better results."
              )
            }
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => setFileImportOpen(true)}
        >
          <FileText size={16} className="mr-2" />
          Import from File
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => setImageImportOpen(true)}
        >
          <Image size={16} className="mr-2" />
          Import from Image
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => setLinkedInImportOpen(true)}
        >
          <Linkedin size={16} className="mr-2" />
          Import from LinkedIn
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          disabled
        >
          <Upload size={16} className="mr-2" />
          More Options
        </Button>
      </div>
      
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
