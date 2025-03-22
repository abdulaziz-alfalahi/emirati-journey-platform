
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Linkedin, Brain } from 'lucide-react';
import { ResumeData } from './types';
import { toast } from 'sonner';
import { parseResumeFromFile, extractFromLinkedIn, mergeResumeData } from './utils/resumeParser';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [linkedInDialogOpen, setLinkedInDialogOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Create a toast for processing
    toast.info("AI Resume Processing", {
      description: "Extracting data using AI...",
    });
    
    try {
      // Update toast with processing message
      toast.info("AI Resume Processing", {
        description: "Reading file and sending to AI service...",
      });
      
      const parsedData = await parseResumeFromFile(file);
      
      // Update toast with success message
      toast.success("AI Resume Analysis Complete", {
        description: "Your resume has been processed using AI and data extracted successfully.",
      });
      
      const mergedData = mergeResumeData(currentData, parsedData);
      onImportComplete(mergedData);
      
      setFileDialogOpen(false);
    } catch (error) {
      console.error('Error parsing resume:', error);
      
      // Update toast with error message
      toast.error("Error processing resume", {
        description: error instanceof Error ? error.message : "Failed to parse resume file",
      });
    } finally {
      setIsUploading(false);
      // Reset the input to allow re-uploading the same file
      e.target.value = '';
    }
  };

  const handleLinkedInExtract = async () => {
    if (!linkedInUrl.trim()) {
      toast.error("LinkedIn URL required", {
        description: "Please enter your LinkedIn profile URL",
      });
      return;
    }

    setIsExtracting(true);
    try {
      const linkedInData = await extractFromLinkedIn(linkedInUrl);
      const mergedData = mergeResumeData(currentData, linkedInData);
      onImportComplete(mergedData);
      
      toast.success("LinkedIn data extracted", {
        description: "Your LinkedIn profile data has been imported and merged with your current draft.",
      });
      
      setLinkedInDialogOpen(false);
    } catch (error) {
      toast.error("Error extracting LinkedIn data", {
        description: error instanceof Error ? error.message : "Failed to extract data from LinkedIn",
      });
    } finally {
      setIsExtracting(false);
      setLinkedInUrl('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Dialog open={fileDialogOpen} onOpenChange={setFileDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload size={16} className="mr-2" />
            Upload Resume
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
            <DialogDescription>
              Upload your resume file to extract information using AI.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resume-file">Select a file to upload</Label>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, Word (DOC, DOCX), and plain text (TXT)
              </p>
            </div>
            {isUploading && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2">AI Processing Resume...</span>
                <Brain size={18} className="ml-2 text-blue-500" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={linkedInDialogOpen} onOpenChange={setLinkedInDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Linkedin size={16} className="mr-2" />
            Import from LinkedIn
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import from LinkedIn</DialogTitle>
            <DialogDescription>
              Enter your LinkedIn profile URL to extract your professional information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
              <Input
                id="linkedin-url"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                disabled={isExtracting}
              />
              <p className="text-sm text-muted-foreground">
                Enter your LinkedIn profile URL to extract professional information
              </p>
            </div>
            {isExtracting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2">Extracting data from LinkedIn...</span>
              </div>
            ) : (
              <Button onClick={handleLinkedInExtract} className="w-full">
                Extract Data
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportOptions;
