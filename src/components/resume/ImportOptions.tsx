
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Linkedin, Brain, AlertTriangle, AlertCircle } from 'lucide-react';
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUsingFallback(false);
    
    // Show initial toast
    const toastId = toast.loading("Processing Resume", {
      description: "Analyzing your resume...",
    });
    
    try {
      // Check file size
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error("File too large. Please upload a file smaller than 5MB.");
      }
      
      // Check file type
      const supportedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!supportedTypes.includes(file.type)) {
        toast.warning("Unsupported file type", {
          id: toastId,
          description: "For best results, use PDF, DOC, DOCX, or TXT files.",
        });
      }
      
      // Update toast to show extraction in progress
      toast.loading("Extracting Data", {
        id: toastId,
        description: "Reading file and extracting information...",
      });
      
      // Parse the resume
      const parsedData = await parseResumeFromFile(file);
      
      // Check if we received data
      if (!parsedData || (
        (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
        (!parsedData.experience || parsedData.experience.length === 0) &&
        (!parsedData.education || parsedData.education.length === 0)
      )) {
        throw new Error("Could not extract meaningful data from your resume. Please try a different file.");
      }
      
      // Success toast
      toast.success("Resume Processed", {
        id: toastId,
        description: "Your resume has been processed successfully.",
      });
      
      // Merge the data with existing data
      const mergedData = mergeResumeData(currentData, parsedData);
      onImportComplete(mergedData);
      
      // Close the dialog
      setFileDialogOpen(false);
    } catch (error) {
      console.error('Error parsing resume:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume file";
      setUploadError(errorMessage);
      
      toast.error("Error Processing Resume", {
        id: toastId,
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  const handleLinkedInExtract = async () => {
    if (!linkedInUrl.trim()) {
      toast.error("LinkedIn URL Required", {
        description: "Please enter your LinkedIn profile URL",
      });
      return;
    }

    // Validate LinkedIn URL format
    if (!linkedInUrl.includes('linkedin.com/in/')) {
      toast.error("Invalid LinkedIn URL", {
        description: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile)",
      });
      return;
    }

    setIsExtracting(true);
    const toastId = toast.loading("Connecting to LinkedIn", {
      description: "Extracting your profile data...",
    });
    
    try {
      const linkedInData = await extractFromLinkedIn(linkedInUrl);
      const mergedData = mergeResumeData(currentData, linkedInData);
      onImportComplete(mergedData);
      
      toast.success("LinkedIn Import Complete", {
        id: toastId,
        description: "Your LinkedIn profile data has been imported and merged with your current resume.",
      });
      
      setLinkedInDialogOpen(false);
    } catch (error) {
      toast.error("LinkedIn Import Failed", {
        id: toastId,
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
            {uploadError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-md flex items-start space-x-2">
                <AlertCircle size={18} className="text-red-500 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">Error Processing Resume</p>
                  <p>{uploadError}</p>
                </div>
              </div>
            )}
            
            {usingFallback && !uploadError && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start space-x-2">
                <AlertTriangle size={18} className="text-amber-500 mt-0.5" />
                <div className="text-sm text-amber-700">
                  <p className="font-medium mb-1">Using Basic Extraction</p>
                  <p>AI-based extraction failed. Using basic pattern matching instead, which may be less accurate.</p>
                </div>
              </div>
            )}
            
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
