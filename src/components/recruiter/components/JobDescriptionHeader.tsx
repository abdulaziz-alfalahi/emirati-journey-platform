
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface JobDescriptionHeaderProps {
  onOpenCreateDialog: () => void;
  onOpenUploadDialog: () => void;
}

const JobDescriptionHeader = ({ onOpenCreateDialog, onOpenUploadDialog }: JobDescriptionHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Job Descriptions</h2>
        <p className="text-muted-foreground">Manage and post job openings</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={onOpenCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Create Job
        </Button>
        <Button variant="outline" onClick={onOpenUploadDialog}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Job Descriptions
        </Button>
      </div>
    </div>
  );
};

export default JobDescriptionHeader;
