
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { UserCareerPathWithDetails, CareerPathWithStages } from '@/types/careerPath';
import CareerPathwayDetails from '../CareerPathwayDetails';

interface PathDetailsViewProps {
  selectedPath: UserCareerPathWithDetails;
  onBack: () => void;
}

const PathDetailsView: React.FC<PathDetailsViewProps> = ({ selectedPath, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="p-0 h-auto" 
          onClick={onBack}
        >
          <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
          <span>Back</span>
        </Button>
      </div>
      
      <CareerPathwayDetails 
        careerPath={selectedPath.career_path_id ? {
          ...(selectedPath.career_path || {}),
          stages: selectedPath.stages || []
        } as CareerPathWithStages}
        currentStageId={selectedPath.current_stage_id}
        onStageSelect={(stageId) => {
          // This will be implemented later
          console.log('Stage selected:', stageId);
        }}
      />
    </div>
  );
};

export default PathDetailsView;
