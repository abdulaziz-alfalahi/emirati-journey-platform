
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardStats } from './dashboard/DashboardStats';
import { AssessmentCard } from './dashboard/AssessmentCard';
import { EmptyAssessmentsState } from './dashboard/EmptyAssessmentsState';
import { LoadingState } from './dashboard/LoadingState';
import { fetchCollaborativeAssessments } from '@/services/collaborativeAssessments/assessmentService';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';

interface AssessmentDashboardProps {
  onCreateAssessment: () => void;
  onCreateTemplate?: () => void;
  onViewAssessment: (assessment: CollaborativeAssessment) => void;
  onEvaluateAssessment: (assessment: CollaborativeAssessment) => void;
}

export const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
  onCreateAssessment,
  onCreateTemplate,
  onViewAssessment,
  onEvaluateAssessment
}) => {
  const { user } = useAuth();

  const { data: assessments = [], isLoading, error } = useQuery({
    queryKey: ['collaborative-assessments', user?.id],
    queryFn: () => fetchCollaborativeAssessments(user!.id),
    enabled: !!user
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load assessments. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        onCreateAssessment={onCreateAssessment}
        onCreateTemplate={onCreateTemplate}
      />
      
      <DashboardStats assessments={assessments} />

      {assessments.length === 0 ? (
        <EmptyAssessmentsState onCreateAssessment={onCreateAssessment} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onViewAssessment={() => onViewAssessment(assessment)}
              onEvaluateAssessment={() => onEvaluateAssessment(assessment)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
