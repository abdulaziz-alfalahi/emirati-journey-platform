
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAdvisors } from '@/services/careerAdvisory/advisoryService';
import { getSessions } from '@/services/careerAdvisory/advisorySessionService';
import { supabase } from '@/integrations/supabase/client';
import { CareerAdvisor, AdvisorySession } from '@/types/careerAdvisory';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Calendar, User } from 'lucide-react';

const AdvisoryDashboard: React.FC = () => {
  const [advisors, setAdvisors] = useState<CareerAdvisor[]>([]);
  const [sessions, setSessions] = useState<AdvisorySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser({ id: data.session.user.id });
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const advisorsData = await getAdvisors();
        setAdvisors(advisorsData);

        if (user?.id) {
          const sessionsData = await getSessions(user.id);
          setSessions(sessionsData);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="advisors" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="advisors">Career Advisors</TabsTrigger>
        <TabsTrigger value="sessions">My Sessions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="advisors">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {advisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{advisor.specialization} Advisor</CardTitle>
                <CardDescription>
                  {advisor.bio ? 
                    (advisor.bio.length > 100 ? 
                      `${advisor.bio.substring(0, 100)}...` : 
                      advisor.bio) : 
                    "No bio available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">ID: {advisor.id.substring(0, 8)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(`/career-advisory/advisors/${advisor.id}`)}
                  variant="default"
                >
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {advisors.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No career advisors are currently available.</p>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="sessions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>{session.topic}</CardTitle>
                <CardDescription>
                  Status: <span className={`font-medium ${session.status === 'completed' ? 'text-green-600' : 
                    session.status === 'cancelled' ? 'text-red-600' : 'text-amber-600'}`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{formatDate(session.scheduled_date)}</span>
                </div>
                {session.details && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{session.details}</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => navigate(`/career-advisory/sessions/${session.id}`)}
                  variant="outline"
                >
                  View Details
                </Button>
                {session.status === 'scheduled' && session.video_call_url && (
                  <Button 
                    onClick={() => window.open(session.video_call_url, '_blank')}
                    variant="default"
                  >
                    Join Meeting
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          
          {sessions.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground mb-4">You don't have any advisory sessions scheduled.</p>
              <Button onClick={() => navigate('/career-advisory/schedule')}>Schedule a Session</Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdvisoryDashboard;
