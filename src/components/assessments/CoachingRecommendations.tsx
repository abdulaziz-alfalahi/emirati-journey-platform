
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoachingRecommendations } from '@/services/assessmentService';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, UserCheck } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const CoachingRecommendations: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['coaching-recommendations', user?.id],
    queryFn: () => user ? fetchCoachingRecommendations(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coaching Recommendations</CardTitle>
          <CardDescription>Error loading your coaching recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            There was an error loading your coaching recommendations. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coaching Recommendations</CardTitle>
          <CardDescription>No coaching recommendations at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You don't have any coaching recommendations yet. Recommendations will appear here after assessments or interviews.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSchedule = (recommendationId: string) => {
    toast({
      title: "Coming Soon",
      description: "Scheduling functionality will be available soon.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coaching Recommendations</CardTitle>
        <CardDescription>Based on your assessment results and interview outcomes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => (
          <div 
            key={recommendation.id} 
            className="p-4 border rounded-lg bg-background hover:bg-accent/5 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">
                {recommendation.assessment_sessions?.assessments?.title || "Assessment Coaching"}
              </h3>
              <Badge variant={
                recommendation.status === 'accepted' ? "success" :
                recommendation.status === 'declined' ? "destructive" : "default"
              }>
                {recommendation.status === 'pending' ? "Recommended" : recommendation.status}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {recommendation.reason}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
              {recommendation.scheduled_date && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{format(new Date(recommendation.scheduled_date), 'PPP')}</span>
                </div>
              )}
              
              {recommendation.assessment_sessions?.assessments?.assessment_type && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Type: {recommendation.assessment_sessions.assessments.assessment_type}</span>
                </div>
              )}
              
              {recommendation.coach_id && (
                <div className="flex items-center">
                  <UserCheck className="h-3 w-3 mr-1" />
                  <span>Coach assigned</span>
                </div>
              )}
            </div>

            {recommendation.status === 'pending' && (
              <Dialog open={openDialog === recommendation.id} onOpenChange={(open) => {
                if (open) setOpenDialog(recommendation.id);
                else setOpenDialog(null);
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="default">Schedule Coaching Session</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Coaching Session</DialogTitle>
                    <DialogDescription>
                      Select a date and time to meet with one of our expert coaches.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      Scheduling functionality coming soon.
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpenDialog(null)}>Cancel</Button>
                    <Button onClick={() => {
                      handleSchedule(recommendation.id);
                      setOpenDialog(null);
                    }}>Schedule</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {recommendation.status === 'accepted' && recommendation.scheduled_date && (
              <Button size="sm" variant="outline">View Details</Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
