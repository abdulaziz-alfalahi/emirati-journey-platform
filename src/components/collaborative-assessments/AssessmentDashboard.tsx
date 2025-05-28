
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';
import { fetchCollaborativeAssessments, fetchAssessmentCollaborators } from '@/services/collaborativeAssessments/assessmentService';
import { calculateAssessmentProgress } from '@/services/collaborativeAssessments/evaluationService';
import { Plus, Eye, Edit, Users, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

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
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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

  const AssessmentCard: React.FC<{ assessment: CollaborativeAssessment }> = ({ assessment }) => {
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
      <Card key={assessment.id} className="hover:shadow-md transition-shadow">
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

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments?.filter(a => a.status === 'in_progress').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments?.filter(a => a.status === 'completed').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">As Evaluator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      {assessments && assessments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assessments.map(assessment => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">No assessments yet</h3>
                <p className="text-muted-foreground">
                  Create your first collaborative assessment to get started.
                </p>
              </div>
              <Button onClick={onCreateAssessment}>
                <Plus className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
