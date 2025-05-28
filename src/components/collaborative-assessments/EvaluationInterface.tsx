
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { CollaborativeAssessment, AssessmentSection, AssessmentCriterion, AssessmentEvaluation } from '@/types/collaborativeAssessments';
import { fetchCollaborativeAssessments, fetchAssessmentCollaborators } from '@/services/collaborativeAssessments/assessmentService';
import { submitEvaluation, fetchAssessmentEvaluations, calculateAssessmentProgress } from '@/services/collaborativeAssessments/evaluationService';
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';

interface EvaluationInterfaceProps {
  assessmentId: string;
  onBack: () => void;
}

export const EvaluationInterface: React.FC<EvaluationInterfaceProps> = ({ assessmentId, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<Record<string, { score?: number; comments?: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch assessment details
  const { data: assessments } = useQuery({
    queryKey: ['collaborative-assessments', user?.id],
    queryFn: () => user ? fetchCollaborativeAssessments(user.id) : Promise.resolve([]),
    enabled: !!user
  });

  const assessment = assessments?.find(a => a.id === assessmentId);

  // Fetch existing evaluations
  const { data: existingEvaluations } = useQuery({
    queryKey: ['assessment-evaluations', assessmentId],
    queryFn: () => fetchAssessmentEvaluations(assessmentId)
  });

  // Fetch collaborators to check permissions
  const { data: collaborators } = useQuery({
    queryKey: ['assessment-collaborators', assessmentId],
    queryFn: () => fetchAssessmentCollaborators(assessmentId)
  });

  // Fetch progress
  const { data: progress } = useQuery({
    queryKey: ['assessment-progress', assessmentId],
    queryFn: () => calculateAssessmentProgress(assessmentId)
  });

  const currentCollaborator = collaborators?.find(c => c.user_id === user?.id);
  const canEvaluate = currentCollaborator?.permissions?.can_evaluate;

  // Load existing evaluations into local state
  useEffect(() => {
    if (existingEvaluations && user) {
      const userEvaluations = existingEvaluations.filter(e => e.evaluator_id === user.id);
      const evaluationMap: Record<string, { score?: number; comments?: string }> = {};
      
      userEvaluations.forEach(evaluation => {
        const key = `${evaluation.section_id}-${evaluation.criterion_id}`;
        evaluationMap[key] = {
          score: evaluation.score || undefined,
          comments: evaluation.comments || undefined
        };
      });
      
      setEvaluations(evaluationMap);
    }
  }, [existingEvaluations, user]);

  const submitEvaluationMutation = useMutation({
    mutationFn: submitEvaluation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment-evaluations', assessmentId] });
      queryClient.invalidateQueries({ queryKey: ['assessment-progress', assessmentId] });
      toast({
        title: "Evaluation saved",
        description: "Your evaluation has been saved successfully."
      });
    },
    onError: (error) => {
      console.error('Error submitting evaluation:', error);
      toast({
        title: "Error",
        description: "Failed to save evaluation. Please try again.",
        variant: "destructive"
      });
    }
  });

  if (!assessment || !user) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium">Assessment not found</h3>
          <p className="text-muted-foreground">The assessment you're looking for doesn't exist or you don't have access to it.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!canEvaluate) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium">Access Denied</h3>
          <p className="text-muted-foreground">You don't have permission to evaluate this assessment.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const template = assessment.template;
  const sections = Array.isArray(template?.sections) ? template.sections : [];
  const currentSection = sections[currentSectionIndex];

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium">No sections available</h3>
          <p className="text-muted-foreground">This assessment template doesn't have any sections to evaluate.</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleScoreChange = (criterionId: string, score: number) => {
    const key = `${currentSection.id}-${criterionId}`;
    setEvaluations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        score
      }
    }));
  };

  const handleCommentsChange = (criterionId: string, comments: string) => {
    const key = `${currentSection.id}-${criterionId}`;
    setEvaluations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        comments
      }
    }));
  };

  const handleSaveEvaluation = async (criterionId: string, isDraft = true) => {
    const key = `${currentSection.id}-${criterionId}`;
    const evaluation = evaluations[key];
    
    if (!evaluation || (evaluation.score === undefined && !evaluation.comments)) {
      toast({
        title: "Missing data",
        description: "Please provide a score or comments before saving.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitEvaluationMutation.mutateAsync({
        assessment_id: assessmentId,
        evaluator_id: user.id,
        section_id: currentSection.id,
        criterion_id: criterionId,
        score: evaluation.score,
        comments: evaluation.comments
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    if (!progress) return 0;
    return progress.progress_percentage;
  };

  const renderScoringInterface = (criterion: AssessmentCriterion) => {
    const key = `${currentSection.id}-${criterion.id}`;
    const evaluation = evaluations[key] || {};

    if (criterion.scoring_type === 'numeric') {
      return (
        <div className="space-y-2">
          <Label htmlFor={`score-${criterion.id}`}>
            Score (0-{criterion.max_score})
          </Label>
          <Input
            id={`score-${criterion.id}`}
            type="number"
            min="0"
            max={criterion.max_score}
            value={evaluation.score || ''}
            onChange={(e) => handleScoreChange(criterion.id, Number(e.target.value))}
            placeholder="Enter score"
          />
        </div>
      );
    }

    if (criterion.scoring_type === 'rubric' && criterion.rubric_levels) {
      return (
        <div className="space-y-3">
          <Label>Select Score</Label>
          <RadioGroup
            value={evaluation.score?.toString() || ''}
            onValueChange={(value) => handleScoreChange(criterion.id, Number(value))}
          >
            {criterion.rubric_levels.map((level) => (
              <div key={level.score} className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value={level.score.toString()} id={`rubric-${criterion.id}-${level.score}`} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={`rubric-${criterion.id}-${level.score}`} className="font-medium">
                    {level.score} - {level.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Label>This criterion doesn't support scoring</Label>
        <p className="text-sm text-muted-foreground">Only comments are available for this criterion.</p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{assessment.title}</h1>
            <p className="text-muted-foreground">Evaluation Interface</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Overall Progress</p>
          <div className="flex items-center space-x-2">
            <Progress value={getProgressPercentage()} className="w-24" />
            <span className="text-sm font-medium">{getProgressPercentage()}%</span>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Section {currentSectionIndex + 1} of {sections.length}</CardTitle>
              <CardDescription>{currentSection.title}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                disabled={currentSectionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
                disabled={currentSectionIndex === sections.length - 1}
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
          
          {/* Section Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Section Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentSection.criteria?.filter(c => {
                  const key = `${currentSection.id}-${c.id}`;
                  return evaluations[key]?.score !== undefined || evaluations[key]?.comments;
                }).length || 0} of {currentSection.criteria?.length || 0} criteria
              </span>
            </div>
            <Progress 
              value={((currentSection.criteria?.filter(c => {
                const key = `${currentSection.id}-${c.id}`;
                return evaluations[key]?.score !== undefined || evaluations[key]?.comments;
              }).length || 0) / (currentSection.criteria?.length || 1)) * 100} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Criteria Evaluation */}
      <div className="space-y-6">
        {currentSection.criteria?.map((criterion) => {
          const key = `${currentSection.id}-${criterion.id}`;
          const evaluation = evaluations[key] || {};
          const hasEvaluation = evaluation.score !== undefined || evaluation.comments;

          return (
            <Card key={criterion.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{criterion.title}</CardTitle>
                      {criterion.is_required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                      {hasEvaluation && (
                        <Badge variant="secondary" className="text-xs">Evaluated</Badge>
                      )}
                    </div>
                    {criterion.description && (
                      <CardDescription className="mt-2">{criterion.description}</CardDescription>
                    )}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    Max Score: {criterion.max_score}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Scoring Interface */}
                {renderScoringInterface(criterion)}

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor={`comments-${criterion.id}`}>Comments</Label>
                  <Textarea
                    id={`comments-${criterion.id}`}
                    value={evaluation.comments || ''}
                    onChange={(e) => handleCommentsChange(criterion.id, e.target.value)}
                    placeholder="Add your comments, observations, or feedback..."
                    rows={3}
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSaveEvaluation(criterion.id)}
                    disabled={isSubmitting || (!evaluation.score && !evaluation.comments)}
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Evaluation</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
          disabled={currentSectionIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Section
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Section {currentSectionIndex + 1} of {sections.length}
          </p>
        </div>

        <Button
          onClick={() => setCurrentSectionIndex(Math.min(sections.length - 1, currentSectionIndex + 1))}
          disabled={currentSectionIndex === sections.length - 1}
        >
          Next Section
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
