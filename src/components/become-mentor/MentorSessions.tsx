
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { SessionCard } from './SessionCard';

interface SessionData {
  id: string;
  scheduled_date: string;
  duration_minutes: number;
  topic: string | null;
  status: string;
  notes: string | null;
  rating: number | null;
}

export const MentorSessions: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionData[]>([]);
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
      const mentorQuery = await supabase
        .from('mentors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (mentorQuery.data) {
        // Simple query with basic field selection
        const sessionsQuery = await supabase
          .from('mentorship_sessions')
          .select('id, scheduled_date, duration_minutes, topic, status, notes, rating')
          .eq('mentor_id', mentorQuery.data.id)
          .order('scheduled_date', { ascending: false });

        if (sessionsQuery.error) throw sessionsQuery.error;
        
        if (sessionsQuery.data) {
          // Simple mapping without complex type inference
          const mappedSessions: SessionData[] = sessionsQuery.data.map((session: any) => ({
            id: session.id,
            scheduled_date: session.scheduled_date,
            duration_minutes: session.duration_minutes,
            topic: session.topic,
            status: session.status,
            notes: session.notes,
            rating: session.rating
          }));
          
          setSessions(mappedSessions);
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

  const filterSessionsByStatus = (status: string) => {
    return sessions.filter(session => session.status === status);
  };

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
              <SessionCard key={session.id} session={session} onUpdateStatus={updateSessionStatus} />
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
              <SessionCard key={session.id} session={session} onUpdateStatus={updateSessionStatus} />
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
              <SessionCard key={session.id} session={session} onUpdateStatus={updateSessionStatus} />
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
              <SessionCard key={session.id} session={session} onUpdateStatus={updateSessionStatus} />
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
