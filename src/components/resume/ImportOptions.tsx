import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Linkedin, Brain, Camera, AlertTriangle, AlertCircle, FileImage } from 'lucide-react';
import { ResumeData } from './types';
import { toast } from 'sonner';
import { 
  parseResumeFromFile, 
  parseResumeFromImage,
  importFromLinkedIn, 
  mergeResumeData,
  enhancedResumeParser 
} from './utils/resumeParser';
import { supabase } from '@/integrations/supabase/client';

interface ImportOptionsProps {
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImportOptions: React.FC<ImportOptionsProps> = ({ onImportComplete, currentData }) => {
  // Log to help debug the onImportComplete prop
  console.log('ImportOptions rendered, onImportComplete type:', typeof onImportComplete);

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
    
    const toastId = toast.loading("Processing Resume", {
      description: "Analyzing your resume with Enhanced Parser...",
    });
    
    try {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error("File too large. Please upload a file smaller than 5MB.");
      }
      
      const supportedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!supportedTypes.includes(file.type)) {
        toast.warning("Unsupported file type", {
          id: toastId,
          description: "For best results, use PDF, DOC, DOCX, or TXT files.",
        });
      }
      
      toast.loading("Extracting Data", {
        id: toastId,
        description: "Using Enhanced Parser to extract information...",
      });
      
      const parsedData = await parseResumeFromFile(file);
      
      // Check if we got meaningful data
      if (!parsedData || (
        (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
        (!parsedData.experience || parsedData.experience.length === 0) &&
        (!parsedData.education || parsedData.education.length === 0)
      )) {
        throw new Error("Could not extract meaningful data from your resume. Please try a different file.");
      }

      // Check which parsing method was used
      const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
      const usedEnhancedParser = parsingMethod === 'enhanced-local';
      const usedFallback = parsingMethod === 'legacy-regex' || parsingMethod === 'enhanced-edge' || parsingMethod === 'ai-edge';
      
      setUsingFallback(usedFallback);
      
      toast.success("Resume Processed", {
        id: toastId,
        description: usedEnhancedParser 
          ? "Your resume has been processed successfully using the Enhanced Parser."
          : `Your resume has been processed successfully using ${parsingMethod}.`,
      });
      
      console.log('About to call onImportComplete, type:', typeof onImportComplete);
      if (typeof onImportComplete === 'function') {
        const mergedData = enhancedResumeParser.mergeResumeData(currentData, parsedData);
        onImportComplete(mergedData);
        console.log('onImportComplete called successfully');
      } else {
        console.error('Error: onImportComplete is not a function');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
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
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    
    const toastId = toast.loading("Processing Resume Image", {
      description: "Analyzing your resume image with AI...",
    });
    
    try {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
        throw new Error("Image too large. Please upload an image smaller than 10MB.");
      }
      
      const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
      if (!supportedImageTypes.includes(file.type)) {
        throw new Error("Unsupported image format. Please upload JPG, PNG, WebP, or HEIC images.");
      }
      
      toast.loading("Extracting Data from Image", {
        id: toastId,
        description: "Using AI to recognize and extract text from your resume image...",
      });
      
      const parsedData = await parseResumeFromImage(file);
      
      // Check if we got meaningful data
      if (!parsedData || (
        (!parsedData.personal || Object.values(parsedData.personal).filter(Boolean).length === 0) && 
        (!parsedData.experience || parsedData.experience.length === 0) &&
        (!parsedData.education || parsedData.education.length === 0)
      )) {
        throw new Error("Could not extract meaningful data from your resume image. Please try a clearer image or a different format.");
      }
      
      // Check which parsing method was used
      const parsingMethod = parsedData.metadata?.parsingMethod || 'unknown';
      const usedFallback = parsingMethod === 'image-fallback';
      
      if (usedFallback) {
        toast.warning("Basic Extraction Used", {
          id: toastId,
          description: "AI extraction failed. Limited data was extracted from your image.",
        });
      } else {
        toast.success("Resume Image Processed", {
          id: toastId,
          description: "Your resume image has been processed successfully with AI.",
        });
      }
      
      console.log('About to call onImportComplete for image, type:', typeof onImportComplete);
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        onImportComplete(mergedData);
        console.log('onImportComplete called successfully for image');
      } else {
        console.error('Error: onImportComplete is not a function for image upload');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
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

    if (!linkedInUrl.includes('linkedin.com/in/')) {
      toast.error("Invalid LinkedIn URL", {
        description: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourprofile) ",
      });
      return;
    }

    setIsExtracting(true);
    const toastId = toast.loading("Connecting to LinkedIn", {
      description: "Extracting your profile data...",
    });
    
    try {
      const linkedInData = await importFromLinkedIn(linkedInUrl);
      
      console.log('About to call onImportComplete for LinkedIn, type:', typeof onImportComplete);
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, linkedInData);
        onImportComplete(mergedData);
        console.log('onImportComplete called successfully for LinkedIn');
        
        toast.success("LinkedIn Import Complete", {
          id: toastId,
          description: "Your LinkedIn profile data has been imported and merged with your current resume.",
        });
      } else {
        console.error('Error: onImportComplete is not a function for LinkedIn import');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
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
                  <p className="font-medium mb-1">Using Fallback Extraction</p>
                  <p>Enhanced parsing was not optimal. Using alternative extraction method, which may be less accurate.</p>
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
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: PDF, DOC, DOCX, TXT (max 5MB)
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setFileDialogOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Camera size={16} className="mr-2" />
            Resume from Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Resume Image</DialogTitle>
            <DialogDescription>
              Upload an image of your resume to extract information using AI.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {uploadError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-md flex items-start space-x-2">
                <AlertCircle size={18} className="text-red-500 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">Error Processing Image</p>
                  <p>{uploadError}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="resume-image">Select an image to upload</Label>
              <Input
                id="resume-image"
                type="file"
                ref={imageInputRef}
                accept="image/jpeg,image/png,image/webp,image/heic"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: JPG, PNG, WebP, HEIC (max 10MB)
              </p>
              <p className="text-xs text-muted-foreground">
                For best results, ensure the image is clear and all text is readable.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                onClick={() => setImageDialogOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </div>
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
              Enter your LinkedIn profile URL to import your professional information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
              <Input
                id="linkedin-url"
                type="text"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedInUrl}
                onChange={(e)  => setLinkedInUrl(e.target.value)}
                disabled={isExtracting}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: https://linkedin.com/in/yourprofile
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={()  => setLinkedInDialogOpen(false)}
                disabled={isExtracting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLinkedInExtract}
                disabled={isExtracting || !linkedInUrl.trim()}
              >
                {isExtracting ? 'Extracting...' : 'Extract Data'}
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Alternatively, you can sign in with LinkedIn for better results:
              </p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLinkedInAuth}
                disabled={isExtracting}
              >
                <Linkedin size={16} className="mr-2" />
                Sign in with LinkedIn
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" size="sm" onClick={() => window.open('https://www.emirati-journey.ae/resume-builder-help', '_blank') }>
        <Brain size={16} className="mr-2" />
        Resume Builder Help
      </Button>
    </div>
  );
};

export default ImportOptions;
