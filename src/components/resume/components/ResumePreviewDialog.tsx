
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResumePreview from '../ResumePreview';
import { ResumeData, ResumeTemplate } from '../types';

interface ResumePreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: ResumeData;
  template: ResumeTemplate;
  theme: "classic" | "modern" | "minimalist";
  previewRef: React.RefObject<HTMLDivElement>;
}

const ResumePreviewDialog: React.FC<ResumePreviewDialogProps> = ({
  isOpen,
  onOpenChange,
  data,
  template,
  theme,
  previewRef
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-auto max-h-[80vh]">
          <div ref={previewRef} className="resume-preview-wrapper">
            <ResumePreview 
              data={data} 
              template={template} 
              theme={theme}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewDialog;
