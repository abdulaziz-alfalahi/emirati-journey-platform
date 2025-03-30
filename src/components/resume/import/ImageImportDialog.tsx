
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';

interface ImageImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (data: Partial<ResumeData>) => void;
}

export function ImageImportDialog({ open, onOpenChange, onImportComplete }: ImageImportDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('File selected for upload:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    setIsUploading(true);
    
    // Show loading toast using sonner
    const toastId = 'processing-resume';
    sonnerToast.loading("Processing your resume...", {
      id: toastId,
      description: "Please wait while we analyze your document.",
      duration: 60000 // 60 seconds timeout
    });
    
    try {
      const startTime = Date.now();
      
      // Convert file to base64
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
      
      // Call your Edge Function
      const response = await supabase.functions.invoke('parse-resume', {
        body: {
          fileData,
          fileName: file.name,
          fileType: file.type
        }
      });
      
      // Dismiss loading toast
      sonnerToast.dismiss(toastId);
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to parse resume');
      }
      
      const parsedData = response.data;
      
      // Update processing time in metadata
      if (parsedData.metadata) {
        parsedData.metadata.processingTime = Date.now() - startTime;
      }
      
      console.log('Resume parsing result:', {
        success: true,
        parsingMethod: parsedData.metadata?.parsingMethod,
        processingTime: parsedData.metadata?.processingTime,
        dataKeys: Object.keys(parsedData)
      });
      
      // Call the onImportComplete callback with the parsed data
      onImportComplete(parsedData);
      
      // Close the dialog
      onOpenChange(false);
      
      toast({
        title: "Resume Imported",
        description: "Your resume has been successfully imported.",
        variant: "default",
      });
    } catch (error) {
      // Dismiss loading toast
      sonnerToast.dismiss(toastId);
      
      console.error('Error uploading resume:', error);
      
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your resume in PDF, Word, or image format. We'll extract the information automatically.
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="resume-file" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {isUploading ? "Uploading..." : "Upload Resume"}
            </label>
            <input
              id="resume-file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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
