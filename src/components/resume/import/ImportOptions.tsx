
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, FileImage, Linkedin } from 'lucide-react';
import { ResumeData } from '../types';
import FileImportDialog from './FileImportDialog';
import ImageImportDialog from './ImageImportDialog';
import LinkedInImportDialog from './LinkedInImportDialog';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkedInDialogOpen, setLinkedInDialogOpen] = useState(false);

  console.log('ImportOptions rendered, onImportComplete type:', typeof onImportComplete);

  return (
    <div className="flex flex-col gap-2">
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
        onSwitchToImageUpload={() => {
          setImageDialogOpen(true);
        }}
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
