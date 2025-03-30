
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useResumeContext } from '@/context/ResumeContext';
import { parseResumeWithAffinda } from '@/services/resumeParser';
import { ResumeData } from '../types';
import { supabase } from '@/integrations/supabase/client';

interface ImageImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (data: Partial<ResumeData>) => void;
}

export function ImageImportDialog({ open, onOpenChange, onImportComplete }: ImageImportDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [apiKeyAvailable, setApiKeyAvailable] = useState(false);
  const { toast } = useToast();

  // Check if the Affinda API key is available
  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-api-keys');
        if (!error && data && data.affinda_api_key) {
          setApiKeyAvailable(true);
        }
      } catch (err) {
        console.error('Error checking API key:', err);
      }
    };

    if (open) {
      checkApiKey();
    }
  }, [open]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log('File selected for upload:', {
      name: file.name,
      type: file.type,
      size: file.size
    });
    
    setIsUploading(true);
    
    // Show loading toast
    toast.loading("Processing your resume...", {
      id: "resume-processing",
      duration: 60000 // 60 seconds timeout
    });
    
    try {
      const startTime = Date.now();
      
      // Use Affinda to parse the resume
      const parsedData = await parseResumeWithAffinda(file);
      
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
      
      // Dismiss loading toast
      toast.dismiss("resume-processing");
      
      // Call the onImportComplete callback with the parsed data
      onImportComplete(parsedData);
      
      // Close the dialog
      onOpenChange(false);
      
      toast.success("Resume Imported", {
        description: "Your resume has been successfully imported.",
      });
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss("resume-processing");
      
      console.error('Error uploading resume:', error);
      
      toast.error("Import Failed", {
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
          <DialogTitle>Import Resume</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your resume in PDF, Word, or image format. We'll extract the information automatically.
          </p>
          
          {!apiKeyAvailable && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-800">
                Affinda API key is not configured. Resume parsing may be limited. 
                <a href="/api-keys" className="underline ml-1">Configure API keys</a>
              </p>
            </div>
          )}
          
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
