
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Video, User, FileText } from 'lucide-react';
import { fetchAdvisorySessions } from '@/services/careerAdvisory';
import { useAuth } from '@/context/AuthContext';
import { AdvisorySession } from '@/types/careerAdvisory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AdvisoryDashboard: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<AdvisorySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      if (!user) return;
      
      try {
        const data = await fetchAdvisorySessions(undefined, user.id);
        setSessions(data);
      } catch (error) {
        console.error('Error loading advisory sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [user]);

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingSessions = sessions.filter(
    session => ['scheduled', 'in_progress'].includes(session.status)
  );
  
  const pastSessions = sessions.filter(
    session => ['completed', 'cancelled'].includes(session.status)
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Career Advisory Sessions</h2>
        <Link to="/career-advisory/schedule">
          <Button>Schedule a Session</Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingSessions.length > 0 ? (
            <div className="grid gap-4">
              {upcomingSessions.map(session => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{session.topic}</CardTitle>
                      <Badge className={getStatusBadgeColor(session.status)}>
                        {session.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {session.career_advisors?.user_profiles?.full_name || 'Career Advisor'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(session.scheduled_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(session.scheduled_date), 'h:mm a')}
                          </span>
                        </div>
                      </div>
                      
                      {session.video_call_url ? (
                        <Button className="w-full" variant="outline">
                          <Video className="mr-2 h-4 w-4" />
                          Join Video Call
                        </Button>
                      ) : (
                        <Link to={`/career-advisory/sessions/${session.id}`} className="w-full block">
                          <Button className="w-full">View Details</Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No upcoming sessions found.</p>
                <Link to="/career-advisory/schedule" className="mt-4 inline-block">
                  <Button>Schedule Your First Session</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastSessions.length > 0 ? (
            <div className="grid gap-4">
              {pastSessions.map(session => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{session.topic}</CardTitle>
                      <Badge className={getStatusBadgeColor(session.status)}>
                        {session.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {session.career_advisors?.user_profiles?.full_name || 'Career Advisor'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(session.scheduled_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </div>
                      
                      <Link to={`/career-advisory/sessions/${session.id}`} className="w-full block">
                        <Button className="w-full" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View Session Notes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <p>No past sessions found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvisoryDashboard;
