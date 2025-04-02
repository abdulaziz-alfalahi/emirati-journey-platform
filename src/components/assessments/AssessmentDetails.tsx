
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAssessmentById, scheduleAssessment } from '@/services/assessmentService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Clock, User, BadgeCheck, CheckCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AssessmentType } from '@/types/assessments';

interface AssessmentDetailsProps {
  assessmentId: string;
}

export const AssessmentDetails: React.FC<AssessmentDetailsProps> = ({ assessmentId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isScheduling, setIsScheduling] = useState(false);

  const { data: assessment, isLoading } = useQuery({
    queryKey: ['assessment', assessmentId],
    queryFn: () => fetchAssessmentById(assessmentId),
  });

  const getAssessmentTypeIcon = (type: AssessmentType) => {
    switch (type) {
      case 'skills':
        return <BadgeCheck className="h-5 w-5 mr-2 text-blue-500" />;
      case 'behaviors':
        return <User className="h-5 w-5 mr-2 text-green-500" />;
      case 'capabilities':
        return <CheckCircle className="h-5 w-5 mr-2 text-purple-500" />;
      default:
        return null;
    }
  };

  const handleSchedule = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to schedule an assessment",
        variant: "destructive"
      });
      return;
    }

    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for your assessment",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsScheduling(true);
      await scheduleAssessment(assessmentId, user.id, date);
      toast({
        title: "Assessment scheduled",
        description: `Your assessment has been scheduled for ${format(date, 'PPP')}`,
      });
      setDate(undefined);
    } catch (error) {
      console.error('Error scheduling assessment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule assessment. You may have already scheduled this assessment.",
        variant: "destructive"
      });
    } finally {
      setIsScheduling(false);
    }
  };

  if (isLoading || !assessment) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <div className="flex items-center">
          {getAssessmentTypeIcon(assessment.assessment_type)}
          <DialogTitle className="text-xl">{assessment.title}</DialogTitle>
        </div>
        <DialogDescription>
          {assessment.description}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Assessment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{assessment.duration_minutes ? `${assessment.duration_minutes} minutes` : 'Duration not specified'}</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Type: {assessment.assessment_type.charAt(0).toUpperCase() + assessment.assessment_type.slice(1)}</span>
              </div>
              {assessment.price_amount ? (
                <div className="flex items-center">
                  <span className="font-medium">Price: {assessment.price_amount} {assessment.price_currency}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-50">Free</Badge>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Skills Tested</h3>
            {assessment.skills_tested && assessment.skills_tested.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {assessment.skills_tested.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No specific skills listed</p>
            )}
          </div>
        </div>

        <Separator />

        {assessment.requirements && (
          <div>
            <h3 className="font-medium mb-2">Requirements</h3>
            <p className="text-sm">{assessment.requirements}</p>
          </div>
        )}

        {user && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Schedule Assessment</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn(!date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={handleSchedule} disabled={!date || isScheduling}>
                  {isScheduling ? "Scheduling..." : "Schedule Assessment"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You can schedule your assessment up to 3 months in advance.
              </p>
            </div>
          </>
        )}
      </div>

      <DialogFooter>
        {!user && (
          <p className="text-sm text-muted-foreground mr-auto">Sign in to schedule this assessment</p>
        )}
      </DialogFooter>
    </>
  );
};
