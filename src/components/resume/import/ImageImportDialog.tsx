import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useResumeContext } from '@/context/ResumeContext';
import { processResumeImage } from '../utils/parsers/image/imageProcessor';
import { ResumeData } from '../types';

interface ImageImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (data: Partial<ResumeData>) => void;
}

export function ImageImportDialog({ open, onOpenChange, onImportComplete }: ImageImportDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { updateResumeData } = useResumeContext();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('File selected for upload:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    setIsUploading(true);
    
    try {
      // Use our enhanced image processor with PDF support
      const result = await processResumeImage(file);
      
      console.log('Resume processing result:', {
        success: true,
        parsingMethod: result.parsingMethod,
        usedFallback: result.usedFallback,
        processingTime: result.processingTime,
        dataKeys: Object.keys(result.parsedData)
      });
      
      // Call the onImportComplete callback with the parsed data
      onImportComplete(result.parsedData);
      
      // Close the dialog
      onOpenChange(false);
      
      toast({
        title: "Resume Imported",
        description: "Your resume has been successfully imported.",
      });
    } catch (error) {
      console.error('Error uploading resume image:', error);
      
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import resume. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume from Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload an image of your resume or a PDF file. We'll extract the information automatically.
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="resume-image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {isUploading ? "Uploading..." : "Upload Resume Image or PDF"}
            </label>
            <input
              id="resume-image"
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
