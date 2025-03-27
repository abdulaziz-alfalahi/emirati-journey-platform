
import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { ResumeData } from '../types';
import { toast } from 'sonner';
import { processResumeImage, mergeResumeData } from './importUtils';

interface ImageImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
}

const ImageImportDialog: React.FC<ImageImportDialogProps> = ({ 
  open, 
  onOpenChange, 
  onImportComplete,
  currentData 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    
    const toastId = toast.loading("Processing Resume Image", {
      description: "Analyzing your resume image with AI...",
    });
    
    try {
      toast.loading("Extracting Data from Image", {
        id: toastId,
        description: "Using AI to recognize and extract text from your resume image...",
      });
      
      const { parsedData, parsingMethod, usedFallback } = await processResumeImage(file);
      console.log('Parsed resume image data:', parsedData);
      
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
      
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        console.log('Merged image data:', mergedData);
        onImportComplete(mergedData);
      } else {
        console.error('Error: onImportComplete is not a function for image upload');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageImportDialog;
