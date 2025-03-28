
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, FileImage, Linkedin, AlertTriangle } from 'lucide-react';
import { ResumeData } from '../types';
import FileImportDialog from './FileImportDialog';
import ImageImportDialog from './ImageImportDialog';
import LinkedInImportDialog from './LinkedInImportDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { containsPdfArtifacts } from '../utils/helpers/validation';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkedInDialogOpen, setLinkedInDialogOpen] = useState(false);
  const [showScannedPdfAlert, setShowScannedPdfAlert] = useState(false);
  const [showDocumentAlert, setShowDocumentAlert] = useState(false);

  // Enhanced logging to help troubleshoot callback issues
  console.log('ImportOptions rendered, onImportComplete type:', typeof onImportComplete);
  console.log('currentData structure:', Object.keys(currentData).join(', '));

  // Check for parsing issues
  useEffect(() => {
    // Check for scanned PDFs
    if (currentData?.metadata?.fallbackReason?.includes('scanned') ||
        (currentData?.personal?.fullName && containsPdfArtifacts(currentData.personal.fullName))) {
      setShowScannedPdfAlert(true);
    } else {
      setShowScannedPdfAlert(false);
    }
    
    // Check for document parsing issues (Word, PDF artifacts)
    if (currentData?.summary?.includes('Could not extract text from this Word document') ||
        currentData?.summary?.includes('Could not extract text from this PDF') ||
        (currentData?.personal?.fullName && 
         (currentData.personal.fullName.includes('[Content_Types]') || 
          currentData.personal.fullName.includes('PK!')))) {
      setShowDocumentAlert(true);
    } else {
      setShowDocumentAlert(false);
    }
  }, [currentData]);

  const handleSwitchToImageUpload = () => {
    setFileDialogOpen(false);
    setShowScannedPdfAlert(false);
    setTimeout(() => {
      setImageDialogOpen(true);
    }, 100); // Small delay to ensure first dialog closes
  };

  return (
    <div className="flex flex-col gap-2">
      {showScannedPdfAlert && (
        <Alert variant="warning" className="mb-2 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-xs">
            Detected a scanned PDF. For better results, please try using 
            <Button 
              variant="link" 
              className="h-auto p-0 px-1 text-xs font-medium text-amber-700" 
              onClick={handleSwitchToImageUpload}
            >
              Image Upload
            </Button> 
            instead.
          </AlertDescription>
        </Alert>
      )}
      
      {showDocumentAlert && (
        <Alert variant="warning" className="mb-2 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-xs">
            Document parsing issue detected. The file may be corrupted or in an unsupported format.
            Please try converting your document to PDF first or use 
            <Button 
              variant="link" 
              className="h-auto p-0 px-1 text-xs font-medium text-amber-700" 
              onClick={handleSwitchToImageUpload}
            >
              Image Upload
            </Button> 
            instead.
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="justify-start" 
        onClick={() => setFileDialogOpen(true)}
      >
        <FileUp size={16} className="mr-2" />
        <span>Import from File</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="justify-start" 
        onClick={() => setImageDialogOpen(true)}
      >
        <FileImage size={16} className="mr-2" />
        <span>Import from Image</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="justify-start" 
        onClick={() => setLinkedInDialogOpen(true)}
      >
        <Linkedin size={16} className="mr-2" />
        <span>Import from LinkedIn</span>
      </Button>

      <FileImportDialog 
        open={fileDialogOpen}
        onOpenChange={setFileDialogOpen}
        onImportComplete={onImportComplete}
        currentData={currentData}
        onSwitchToImageUpload={handleSwitchToImageUpload}
      />

      <ImageImportDialog 
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onImportComplete={onImportComplete}
        currentData={currentData}
      />

      <LinkedInImportDialog 
        open={linkedInDialogOpen}
        onOpenChange={setLinkedInDialogOpen}
        onImportComplete={onImportComplete}
        currentData={currentData}
      />
    </div>
  );
};

export default ImportOptions;
