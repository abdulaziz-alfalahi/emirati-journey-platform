
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Linkedin, Brain, Camera } from 'lucide-react';
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

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button variant="outline" size="sm" onClick={() => setFileDialogOpen(true)}>
        <Upload size={16} className="mr-2" />
        Upload Resume
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => setImageDialogOpen(true)}>
        <Camera size={16} className="mr-2" />
        Resume from Image
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => setLinkedInDialogOpen(true)}>
        <Linkedin size={16} className="mr-2" />
        Import from LinkedIn
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => window.open('https://www.emirati-journey.ae/resume-builder-help', '_blank')}>
        <Brain size={16} className="mr-2" />
        Resume Builder Help
      </Button>

      <FileImportDialog 
        open={fileDialogOpen}
        onOpenChange={setFileDialogOpen}
        onImportComplete={onImportComplete}
        currentData={currentData}
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
