
import React, { useState } from 'react';
import { Upload, Linkedin, Camera, Brain } from 'lucide-react';
import { ResumeData } from '../types';
import FileImportDialog from './FileImportDialog';
import ImageImportDialog from './ImageImportDialog';
import LinkedInImportDialog from './LinkedInImportDialog';
import '../../ui/animations.css';

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
      <button 
        onClick={() => setFileDialogOpen(true)}
        className="import-button bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
      >
        <Upload size={16} className="mr-2" />
        Upload Resume
      </button>
      
      <button 
        onClick={() => setImageDialogOpen(true)}
        className="import-button bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
        style={{ animationDelay: '100ms' }}
      >
        <Camera size={16} className="mr-2" />
        Image Upload
      </button>
      
      <button 
        onClick={() => setLinkedInDialogOpen(true)}
        className="import-button bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
        style={{ animationDelay: '200ms' }}
      >
        <Linkedin size={16} className="mr-2" />
        LinkedIn
      </button>
      
      <button 
        onClick={() => window.open('https://www.emirati-journey.ae/resume-builder-help', '_blank')}
        className="import-button bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        <Brain size={16} className="mr-2" />
        Help
      </button>

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
