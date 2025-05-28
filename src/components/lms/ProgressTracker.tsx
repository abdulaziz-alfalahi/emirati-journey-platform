
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, PlayCircle, FileText, Award } from 'lucide-react';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment, LessonProgress } from '@/types/lms';

interface ProgressTrackerProps {
  enrollment: CourseEnrollment;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ enrollment }) => {
  const { toast } = useToast();
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [enrollment.id]);

  const loadProgress = async () => {
    try {
      const progress = await lmsService.getUserLessonProgress(enrollment.id);
      setLessonProgress(progress);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load progress data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'dropped':
        return <Badge variant="destructive">Dropped</Badge>;
      case 'suspended':
        return <Badge variant="outline">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>
              Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
            </CardDescription>
          </div>
          {getStatusBadge(enrollment.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{enrollment.progress_percentage}%</span>
          </div>
          <Progress value={enrollment.progress_percentage} className="h-2" />
        </div>

        {/* Completion Status */}
        {enrollment.status === 'completed' && enrollment.completed_at && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Award className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">
                Course Completed!
              </p>
              <p className="text-xs text-green-700">
                Completed on {new Date(enrollment.completed_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Certificate Status */}
        {enrollment.certificate_issued_at && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Award className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                Certificate Issued
              </p>
              <p className="text-xs text-blue-700">
                Issued on {new Date(enrollment.certificate_issued_at).toLocaleDateString()}
              </p>
            </div>
            <Button size="sm" variant="outline">
              Download
            </Button>
          </div>
        )}

        {/* Lesson Progress */}
        <div className="space-y-3">
          <h4 className="font-medium">Lesson Progress</h4>
          {lessonProgress.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No progress recorded yet. Start learning to see your progress here!
            </p>
          ) : (
            <div className="space-y-2">
              {lessonProgress.map((progress) => (
                <div
                  key={progress.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  {getStatusIcon(progress.is_completed ? 'completed' : 'in_progress')}
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lesson Progress</p>
                    <p className="text-xs text-muted-foreground">
                      {progress.time_spent_minutes} minutes spent
                    </p>
                  </div>
                  {progress.completed_at && (
                    <div className="text-xs text-muted-foreground">
                      Completed {new Date(progress.completed_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            View Syllabus
          </Button>
          {enrollment.status === 'completed' && !enrollment.certificate_issued_at && (
            <Button size="sm" className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              Get Certificate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
