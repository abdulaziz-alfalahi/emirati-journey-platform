
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { toast } from 'sonner';
import { ResumeData } from '../types';

interface ImageImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: ResumeData) => void;
}

export const ImageImportDialog: React.FC<ImageImportDialogProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { resumeData } = useResume();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected", {
        description: "Please select an image file to upload"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Mock implementation - in a real app we'd call the actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful parsing
      const updatedData: ResumeData = {
        ...resumeData,
        personal: {
          ...resumeData.personal,
          fullName: "John Doe (Imported)",
          jobTitle: "Software Engineer",
          email: "john@example.com",
          phone: "+1 555-123-4567",
          location: "San Francisco, CA"
        }
      };
      
      onImportComplete(updatedData);
      toast.success("Image imported successfully");
      onClose();
    } catch (error) {
      toast.error("Import failed", {
        description: error instanceof Error ? error.message : "Failed to import resume from image"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isUploading && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume from Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                {file ? file.name : "Click to upload an image of your resume"}
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, JPEG, PNG (max 10MB)
              </p>
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? "Processing..." : "Import Resume"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
