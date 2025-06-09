
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, MessageSquare, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';

// Simple interface that matches the database schema exactly
interface MentorshipSession {
  id: string;
  scheduled_date: string;
  duration_minutes: number;
  topic?: string;
  status: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  relationship_id: string;
  video_call_url?: string;
  created_at: string;
  updated_at: string;
}

export const MentorSessions: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    if (!user) return;

    try {
      // First get the mentor profile
      const { data: mentorData } = await supabase
        .from('mentors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (mentorData) {
        const { data: sessionsData, error } = await supabase
          .from('mentorship_sessions')
          .select('*')
          .eq('mentor_id', mentorData.id)
          .order('scheduled_date', { ascending: false });

        if (error) throw error;
        
        if (sessionsData) {
          setSessions(sessionsData);
        }
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSessionStatus = async (sessionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('mentorship_sessions')
        .update({ status })
        .eq('id', sessionId);

      if (error) throw error;
      fetchSessions(); // Refresh the list
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterSessionsByStatus = (status: string) => {
    return sessions.filter(session => session.status === status);
  };

  const SessionCard: React.FC<{ session: MentorshipSession }> = ({ session }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{session.topic || 'Mentorship Session'}</CardTitle>
          <Badge className={getStatusColor(session.status)}>
            {session.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(session.scheduled_date), 'PPP')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {session.duration_minutes} minutes
            </div>
          </div>
          
          {session.notes && (
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <p className="text-sm">{session.notes}</p>
            </div>
          )}
          
          {session.rating && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Rating: {session.rating}/5</span>
            </div>
          )}
          
          {session.status === 'scheduled' && (
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                onClick={() => updateSessionStatus(session.id, 'completed')}
              >
                Mark Complete
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateSessionStatus(session.id, 'cancelled')}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded"></div>
      ))}
    </div>;
  }

  return (
    <div>
      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scheduled">
            Scheduled ({filterSessionsByStatus('scheduled').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({filterSessionsByStatus('completed').length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({filterSessionsByStatus('cancelled').length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({sessions.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scheduled" className="space-y-4">
          {filterSessionsByStatus('scheduled').length > 0 ? (
            filterSessionsByStatus('scheduled').map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No scheduled sessions
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {filterSessionsByStatus('completed').length > 0 ? (
            filterSessionsByStatus('completed').map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No completed sessions
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          {filterSessionsByStatus('cancelled').length > 0 ? (
            filterSessionsByStatus('cancelled').map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No cancelled sessions
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          {sessions.length > 0 ? (
            sessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No sessions found
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
