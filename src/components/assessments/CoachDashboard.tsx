
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoachAssignments } from '@/services/assessmentService';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);

  const { data: assignments, isLoading, error } = useQuery({
    queryKey: ['coach-assignments', user?.id],
    queryFn: () => user ? fetchCoachAssignments(user.id) : Promise.resolve([]),
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
          <CardTitle>Coach Dashboard</CardTitle>
          <CardDescription>Error loading your coaching assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            There was an error loading your coaching assignments. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!assignments || assignments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coach Dashboard</CardTitle>
          <CardDescription>No coaching assignments at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You don't have any coaching assignments yet. Assignments will appear here when students schedule sessions with you.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group assignments by date
  const today = new Date();
  const upcomingAssignments = assignments.filter(
    a => a.scheduled_date && new Date(a.scheduled_date) >= today
  );
  const pastAssignments = assignments.filter(
    a => a.scheduled_date && new Date(a.scheduled_date) < today
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coach Dashboard</CardTitle>
        <CardDescription>Manage your coaching sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastAssignments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="p-4 border rounded-lg bg-background hover:bg-accent/5 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">
                    {assignment.assessment_sessions?.assessments?.title || "Coaching Session"}
                  </h3>
                  <Badge>Upcoming</Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  {assignment.scheduled_date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(new Date(assignment.scheduled_date), 'PPP p')}</span>
                    </div>
                  )}
                  
                  {assignment.assessment_sessions?.assessments?.assessment_type && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Assessment Type: {assignment.assessment_sessions.assessments.assessment_type}</span>
                    </div>
                  )}
                </div>

                <Dialog open={openDialog === assignment.id} onOpenChange={(open) => {
                  if (open) setOpenDialog(assignment.id);
                  else setOpenDialog(null);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="mr-2">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Session Details</DialogTitle>
                      <DialogDescription>
                        Review assessment results for this coaching session
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <h3 className="text-lg font-semibold">Assessment Results</h3>
                      {assignment.assessment_sessions?.results ? (
                        <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                          <pre className="text-sm">
                            {JSON.stringify(assignment.assessment_sessions.results, null, 2)}
                          </pre>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No detailed results available for this assessment.</p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Score</h4>
                          <p>{assignment.assessment_sessions?.score !== null 
                            ? `${assignment.assessment_sessions?.score}/100` 
                            : "Not scored"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Assessment Type</h4>
                          <p>{assignment.assessment_sessions?.assessments?.assessment_type || "Unknown"}</p>
                        </div>
                      </div>
                      
                      {assignment.assessment_sessions?.feedback && (
                        <div>
                          <h4 className="font-medium">Previous Feedback</h4>
                          <p className="text-sm">{assignment.assessment_sessions.feedback}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm">
                  Prepare Session
                </Button>
              </div>
            ))}
            
            {upcomingAssignments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                You don't have any upcoming coaching sessions.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastAssignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="p-4 border rounded-lg bg-background opacity-80"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">
                    {assignment.assessment_sessions?.assessments?.title || "Coaching Session"}
                  </h3>
                  <Badge variant="outline">Completed</Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  {assignment.scheduled_date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(new Date(assignment.scheduled_date), 'PPP')}</span>
                    </div>
                  )}
                </div>
                
                <Button size="sm" variant="outline">View Notes</Button>
              </div>
            ))}
            
            {pastAssignments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                You don't have any past coaching sessions.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
