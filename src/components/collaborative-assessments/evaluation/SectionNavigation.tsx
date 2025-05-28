
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AssessmentSection } from '@/types/collaborativeAssessments';

interface SectionNavigationProps {
  currentSection: AssessmentSection;
  currentSectionIndex: number;
  totalSections: number;
  sectionProgress: number;
  evaluatedCriteria: number;
  totalCriteria: number;
  onPreviousSection: () => void;
  onNextSection: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  currentSection,
  currentSectionIndex,
  totalSections,
  sectionProgress,
  evaluatedCriteria,
  totalCriteria,
  onPreviousSection,
  onNextSection,
  canGoPrevious,
  canGoNext
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Section {currentSectionIndex + 1} of {totalSections}</CardTitle>
            <CardDescription>{currentSection.title}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousSection}
              disabled={!canGoPrevious}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextSection}
              disabled={!canGoNext}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentSection.description && (
          <p className="text-muted-foreground mb-4">{currentSection.description}</p>
        )}
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Section Progress</span>
            <span className="text-sm text-muted-foreground">
              {evaluatedCriteria} of {totalCriteria} criteria
            </span>
          </div>
          <Progress value={sectionProgress} />
        </div>
      </CardContent>
    </Card>
  );
};
