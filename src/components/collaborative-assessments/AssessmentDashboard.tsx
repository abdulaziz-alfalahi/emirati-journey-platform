
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Clock, CheckCircle, AlertCircle, FileText, Plus } from 'lucide-react';
import { CollaborativeAssessment, AssessmentProgress, CollaborativeAssessmentStatus } from '@/types/collaborativeAssessments';
import { fetchCollaborativeAssessments } from '@/services/collaborativeAssessments/assessmentService';
import { calculateAssessmentProgress } from '@/services/collaborativeAssessments/evaluationService';
import { useAuth } from '@/context/AuthContext';

interface AssessmentDashboardProps {
  onCreateAssessment?: () => void;
  onViewAssessment?: (assessment: CollaborativeAssessment) => void;
}

type AssessmentWithExtras = CollaborativeAssessment & { 
  template?: any; 
  collaborators?: any[] 
};

export const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
  onCreateAssessment,
  onViewAssessment
}) => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentWithExtras[]>([]);
  const [progressData, setProgressData] = useState<Record<string, AssessmentProgress>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAssessments();
    }
  }, [user]);

  const loadAssessments = async () => {
    if (!user) return;
    
    try {
      const data = await fetchCollaborativeAssessments(user.id);
      setAssessments(data);

      // Load progress for each assessment
      const progressPromises = data.map(async (assessment) => {
        const progress = await calculateAssessmentProgress(assessment.id);
        return { assessmentId: assessment.id, progress };
      });

      const progressResults = await Promise.all(progressPromises);
      const progressMap = progressResults.reduce((acc, { assessmentId, progress }) => {
        acc[assessmentId] = progress;
        return acc;
      }, {} as Record<string, AssessmentProgress>);

      setProgressData(progressMap);
    } catch (error) {
      console.error('Error loading assessments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: CollaborativeAssessmentStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'under_review': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filterAssessments = (status?: CollaborativeAssessmentStatus) => {
    if (!status) return assessments;
    return assessments.filter(assessment => assessment.status === status);
  };

  const AssessmentCard: React.FC<{ assessment: AssessmentWithExtras }> = ({ assessment }) => {
    const progress = progressData[assessment.id];
    
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewAssessment?.(assessment)}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              <CardDescription>{assessment.template?.title}</CardDescription>
            </div>
            <Badge className={getStatusColor(assessment.status)}>
              {assessment.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {progress && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{progress.progress_percentage}%</span>
                </div>
                <Progress value={progress.progress_percentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{progress.active_collaborators}/{progress.collaborators_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{progress.evaluated_criteria}/{progress.total_criteria}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{progress.completed_sections}/{progress.total_sections}</span>
                </div>
              </div>

              {assessment.due_date && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Due: {new Date(assessment.due_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p>Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Collaborative Assessments</h1>
          <p className="text-muted-foreground">Manage and track your assessment evaluations</p>
        </div>
        <Button onClick={onCreateAssessment}>
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{assessments.length}</p>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{filterAssessments('in_progress').length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{filterAssessments('under_review').length}</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{filterAssessments('completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="under_review">Under Review</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAssessments('draft').map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAssessments('in_progress').map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="under_review" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAssessments('under_review').map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAssessments('completed').map(assessment => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {assessments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assessments yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first collaborative assessment to get started
            </p>
            <Button onClick={onCreateAssessment}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
