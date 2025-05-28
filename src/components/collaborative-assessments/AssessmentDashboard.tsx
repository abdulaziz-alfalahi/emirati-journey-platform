
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';
import { fetchCollaborativeAssessments } from '@/services/collaborativeAssessments/assessmentService';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardStats } from './dashboard/DashboardStats';
import { AssessmentCard } from './dashboard/AssessmentCard';
import { EmptyAssessmentsState } from './dashboard/EmptyAssessmentsState';
import { LoadingState } from './dashboard/LoadingState';

interface AssessmentDashboardProps {
  onCreateAssessment: () => void;
  onViewAssessment: (assessment: CollaborativeAssessment) => void;
  onEvaluateAssessment?: (assessment: CollaborativeAssessment) => void;
}

export const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
  onCreateAssessment,
  onViewAssessment,
  onEvaluateAssessment
}) => {
  const { user } = useAuth();

  const { data: assessments, isLoading } = useQuery({
    queryKey: ['collaborative-assessments', user?.id],
    queryFn: () => user ? fetchCollaborativeAssessments(user.id) : Promise.resolve([]),
    enabled: !!user
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader onCreateAssessment={onCreateAssessment} />
      <DashboardStats assessments={assessments} />

      {assessments && assessments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assessments.map(assessment => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onViewAssessment={onViewAssessment}
              onEvaluateAssessment={onEvaluateAssessment}
            />
          ))}
        </div>
      ) : (
        <EmptyAssessmentsState onCreateAssessment={onCreateAssessment} />
      )}
    </div>
  );
};
