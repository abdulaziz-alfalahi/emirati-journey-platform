
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onCreateAssessment: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCreateAssessment }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collaborative Assessments</h1>
        <p className="text-muted-foreground">
          Manage and participate in collaborative evaluation processes
        </p>
      </div>
      <Button onClick={onCreateAssessment}>
        <Plus className="h-4 w-4 mr-2" />
        Create Assessment
      </Button>
    </div>
  );
};
