
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Linkedin, Brain, Camera, AlertTriangle, AlertCircle, FileImage } from 'lucide-react';
import { ResumeData } from './types';
import { toast } from 'sonner';
import { 
  parseResumeFromFile, 
  parseResumeFromImage,
  importFromLinkedIn, 
  mergeResumeData 
} from './utils/resumeParser';
import { supabase } from '@/integrations/supabase/client';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkedInDialogOpen, setLinkedInDialogOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    
    // Show initial toast
    const toastId = toast.loading("Processing Resume Image", {
      description: "Analyzing your resume image...",
    });
    
    try {
      // Check file size
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
        throw new Error("Image too large. Please upload an image smaller than 10MB.");
      }
      
      // Check file type
      const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
      if (!supportedImageTypes.includes(file.type)) {
        throw new Error("Unsupported image format. Please upload JPG, PNG, WebP, or HEIC images.");
      }
      
      // Update toast to show extraction in progress
      toast.loading("Extracting Data from Image", {
        id: toastId,
        description: "Processing image and extracting text...",
      });
      
      // Parse the resume from the image
      const parsedData = await parseResumeFromImage(file);
      
      // Check if we received data
      if (!parsedData || (
        (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
        (!parsedData.experience || parsedData.experience.length === 0) &&
        (!parsedData.education || parsedData.education.length === 0)
      )) {
        throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
      }
      
      // Success toast
      toast.success("Resume Image Processed", {
        id: toastId,
        description: "Your resume image has been processed successfully.",
      });
      
      // Merge the data with existing data
      const mergedData = mergeResumeData(currentData, parsedData);
      onImportComplete(mergedData);
      
      // Close the dialog
      setImageDialogOpen(false);
    } catch (error) {
      console.error('Error parsing resume image:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume image";
      setUploadError(errorMessage);
      
      toast.error("Error Processing Resume Image", {
        id: toastId,
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (imageInputRef.current) imageInputRef.current.value = '';
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
      // Try to get the data using the enhanced method first (with API integration)
      const linkedInData = await importFromLinkedIn(linkedInUrl);
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

  const handleLinkedInAuth = async () => {
    try {
      // Start the LinkedIn OAuth process
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/resume-builder?linkedin_auth=true`,
          scopes: 'r_liteprofile r_emailaddress',
        }
      });
      
      if (error) {
        throw error;
      }
      
      // The OAuth flow will redirect and the token will be handled in the resume-builder page
      console.log('LinkedIn auth initiated:', data);
    } catch (error) {
      console.error('LinkedIn auth error:', error);
      toast.error("LinkedIn Authentication Failed", {
        description: error instanceof Error ? error.message : "Failed to authenticate with LinkedIn",
      });
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
                ref={fileInputRef}
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

      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Camera size={16} className="mr-2" />
            Scan Resume Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Resume Image</DialogTitle>
            <DialogDescription>
              Upload a photo or scan of your physical resume to extract information using OCR technology.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {uploadError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-md flex items-start space-x-2">
                <AlertCircle size={18} className="text-red-500 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">Error Processing Resume Image</p>
                  <p>{uploadError}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="resume-image">Select a resume image to upload</Label>
              <Input
                id="resume-image"
                type="file"
                ref={imageInputRef}
                accept="image/jpeg,image/png,image/webp,image/heic"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <p className="text-sm text-muted-foreground">
                Supported formats: JPG, PNG, WebP, HEIC
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Tips for best results:</p>
                <ul className="text-sm text-gray-600 list-disc pl-5 mt-1 space-y-1">
                  <li>Ensure good lighting and clear text</li>
                  <li>Hold camera steady and capture all content</li>
                  <li>Make sure text is readable and not too small</li>
                  <li>Avoid shadows and glare on the page</li>
                </ul>
              </div>
            </div>
            {isUploading && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2">Processing Image...</span>
                <FileImage size={18} className="ml-2 text-blue-500" />
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
              Extract your professional information from your LinkedIn profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Two ways to import:</span> Enter your profile URL below or authenticate with LinkedIn for more accurate data extraction.
              </p>
            </div>
            
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
                Enter your public LinkedIn profile URL to extract professional information
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              {isExtracting ? (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  <span className="ml-2">Extracting data from LinkedIn...</span>
                </div>
              ) : (
                <>
                  <Button onClick={handleLinkedInExtract} disabled={!linkedInUrl.trim()}>
                    Extract Using URL
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLinkedInAuth}
                    className="flex items-center"
                  >
                    <Linkedin size={16} className="mr-2" />
                    Authenticate with LinkedIn
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportOptions;
