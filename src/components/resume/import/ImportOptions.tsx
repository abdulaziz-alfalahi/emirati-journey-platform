
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

  // Enhanced logging to help troubleshoot callback issues
  console.log('ImportOptions rendered, onImportComplete type:', typeof onImportComplete);
  console.log('currentData structure:', Object.keys(currentData).join(', '));

  // Check if we recently tried to parse a scanned PDF
  useEffect(() => {
    if (currentData?.metadata?.fallbackReason?.includes('scanned')) {
      setShowScannedPdfAlert(true);
    } else if (currentData?.personal?.fullName && containsPdfArtifacts(currentData.personal.fullName)) {
      setShowScannedPdfAlert(true);
    } else {
      setShowScannedPdfAlert(false);
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
