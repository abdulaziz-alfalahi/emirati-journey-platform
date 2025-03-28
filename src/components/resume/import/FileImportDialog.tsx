
import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, AlertTriangle, FileImage } from 'lucide-react';
import { ResumeData } from '../types';
import { toast } from 'sonner';
import { processResumeFile, mergeResumeData } from './importUtils';

interface FileImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: (data: ResumeData) => void;
  currentData: ResumeData;
  onSwitchToImageUpload?: () => void;
}

const FileImportDialog: React.FC<FileImportDialogProps> = ({ 
  open, 
  onOpenChange, 
  onImportComplete,
  currentData,
  onSwitchToImageUpload
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isScannedPdf, setIsScannedPdf] = useState(false);
  const [documentParsingIssue, setDocumentParsingIssue] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUsingFallback(false);
    setIsScannedPdf(false);
    setDocumentParsingIssue(false);
    
    const toastId = toast.loading("Processing Resume", {
      description: "Analyzing your resume with Enhanced Parser...",
    });
    
    try {
      // Pre-check if this might be a scanned PDF
      if (file.type === 'application/pdf') {
        const isScanned = await checkIfScannedPdf(file);
        if (isScanned) {
          setIsScannedPdf(true);
          
          toast.warning("Scanned PDF Detected", {
            id: toastId,
            description: "This appears to be a scanned PDF. Please switch to Image Upload for better results.",
          });
          
          setIsUploading(false);
          return;
        }
      }
      
      toast.loading("Extracting Data", {
        id: toastId,
        description: "Using Enhanced Parser to extract information...",
      });
      
      const { parsedData, parsingMethod, usedFallback } = await processResumeFile(file);
      console.log('Parsed resume data:', parsedData);
      
      // Extra verification for document parsing artifacts in the extracted content
      const hasDocumentArtifacts = 
        parsedData?.personal?.fullName?.includes('PK!') || 
        parsedData?.personal?.fullName?.includes('[Content_Types]') ||
        parsedData?.summary?.includes('Could not extract text from this Word document') ||
        parsedData?.summary?.includes('Could not extract text from this PDF');
      
      if (hasDocumentArtifacts) {
        console.error("Document contains parsing artifacts, suggesting alternative import method");
        setDocumentParsingIssue(true);
        
        toast.warning("Document Parsing Issue", {
          id: toastId,
          description: "Had trouble extracting clean text from this document. Please try converting to PDF or use Image Upload.",
        });
        
        // Still continue with the data but flag it as problematic
      }
      
      // Check specifically for PDF artifacts
      if (parsedData.personal?.fullName?.startsWith('%PDF')) {
        setIsScannedPdf(true);
        throw new Error("Could not properly extract text content from this PDF. The file may be scanned or contain only images. Please try the Image Upload option instead.");
      }
      
      setUsingFallback(usedFallback);
      
      if (!hasDocumentArtifacts) {
        toast.success("Resume Processed", {
          id: toastId,
          description: parsingMethod === 'enhanced-local'
            ? "Your resume has been processed successfully using the Enhanced Parser."
            : `Your resume has been processed successfully using ${parsingMethod}.`,
        });
      }
      
      if (typeof onImportComplete === 'function') {
        const mergedData = mergeResumeData(currentData, parsedData);
        console.log('Merged data:', mergedData);
        onImportComplete(mergedData);
      } else {
        console.error('Error: onImportComplete is not a function');
        toast.error("Application Error", {
          id: toastId,
          description: "There was a problem updating the resume data. Please refresh the page and try again.",
        });
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error parsing resume:', error);
      
      let errorMessage = error instanceof Error ? error.message : "Failed to parse resume file";
      const isScannedPdfError = errorMessage.includes("scanned or contain only images");
      const isDocumentParsingError = errorMessage.includes("corrupted") || 
                                    errorMessage.includes("unsupported format");
      
      if (isScannedPdfError) {
        setIsScannedPdf(true);
      } else if (isDocumentParsingError) {
        setDocumentParsingIssue(true);
      }
      
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

  const handleSwitchToImageUpload = () => {
    if (onSwitchToImageUpload) {
      onOpenChange(false);
      onSwitchToImageUpload();
    }
  };
  
  // Helper function to check if PDF is likely scanned
  const checkIfScannedPdf = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (!content) {
          resolve(false);
          return;
        }
        
        // Check PDF header and look for text content markers
        const isPdf = content.startsWith('%PDF');
        if (!isPdf) {
          resolve(false);
          return;
        }
        
        // Check for common PDF text encoding patterns
        const hasTextContent = content.includes('/Text') || 
                              content.includes('/Font') || 
                              content.includes('/Contents');
                              
        // Check for scanned image indicators
        const likelyScanned = content.includes('/Image') && content.includes('/XObject') && 
                             !content.includes('/Encoding') && !content.includes('/ActualText');
                             
        // Check text content ratio
        const firstChunk = content.substring(0, 1000);
        const textContentRatio = firstChunk.replace(/[^a-zA-Z0-9]/g, '').length / firstChunk.length;
        
        // Combine factors to decide
        resolve(likelyScanned || textContentRatio < 0.3);
      };
      
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          
          {isScannedPdf && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <div className="flex items-start space-x-3">
                <FileImage size={24} className="text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Scanned PDF Detected</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    This PDF appears to contain scanned images without extractable text.
                    Please use our Image Upload feature instead.
                  </p>
                  <Button 
                    onClick={handleSwitchToImageUpload}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Switch to Image Upload
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {documentParsingIssue && !isScannedPdf && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <div className="flex items-start space-x-3">
                <AlertTriangle size={24} className="text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Document Parsing Issue</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    The document format may be corrupted or in an unsupported format.
                    Please try converting your document to PDF first or use Image Upload.
                  </p>
                  <Button 
                    onClick={handleSwitchToImageUpload}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Switch to Image Upload
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {usingFallback && !uploadError && !isScannedPdf && !documentParsingIssue && (
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
            <p className="text-xs text-muted-foreground">
              For scanned PDFs without selectable text, use the Image Upload option instead.
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

export default FileImportDialog;
