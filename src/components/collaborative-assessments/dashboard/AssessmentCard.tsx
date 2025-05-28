
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';
import { fetchAssessmentCollaborators } from '@/services/collaborativeAssessments/assessmentService';
import { calculateAssessmentProgress } from '@/services/collaborativeAssessments/evaluationService';
import { Eye, Edit, Users, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AssessmentCardProps {
  assessment: CollaborativeAssessment;
  onViewAssessment: (assessment: CollaborativeAssessment) => void;
  onEvaluateAssessment?: (assessment: CollaborativeAssessment) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'secondary';
    case 'in_progress': return 'default';
    case 'under_review': return 'outline';
    case 'completed': return 'success';
    case 'cancelled': return 'destructive';
    default: return 'secondary';
  }
};

export const AssessmentCard: React.FC<AssessmentCardProps> = ({ 
  assessment, 
  onViewAssessment, 
  onEvaluateAssessment 
}) => {
  const { user } = useAuth();

  const { data: progress } = useQuery({
    queryKey: ['assessment-progress', assessment.id],
    queryFn: () => calculateAssessmentProgress(assessment.id)
  });

  const { data: collaborators } = useQuery({
    queryKey: ['assessment-collaborators', assessment.id],
    queryFn: () => fetchAssessmentCollaborators(assessment.id)
  });

  const isEvaluator = collaborators?.some(c => 
    c.user_id === user?.id && c.permissions?.can_evaluate
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{assessment.title}</CardTitle>
            <CardDescription className="mt-1">
              Template: {assessment.template?.title || 'Unknown Template'}
            </CardDescription>
          </div>
          <Badge variant={getStatusColor(assessment.status)}>
            {assessment.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress.progress_percentage}%</span>
            </div>
            <Progress value={progress.progress_percentage} />
            <div className="text-xs text-muted-foreground">
              {progress.evaluated_criteria} of {progress.total_criteria} criteria evaluated
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{collaborators?.length || 0} collaborators</span>
          </div>
          {assessment.due_date && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due {format(new Date(assessment.due_date), 'MMM d, yyyy')}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Created {format(new Date(assessment.created_at), 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Instructions */}
        {assessment.instructions && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {assessment.instructions}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewAssessment(assessment)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {isEvaluator && onEvaluateAssessment && (
            <Button
              size="sm"
              onClick={() => onEvaluateAssessment(assessment)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Evaluate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
