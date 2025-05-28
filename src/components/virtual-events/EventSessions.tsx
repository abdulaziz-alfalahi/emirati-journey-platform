
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Video, Play } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { VirtualEventsService } from '@/services/virtualEventsService';
import { EventSession } from '@/types/virtualEvents';

interface EventSessionsProps {
  eventId: string;
}

const EventSessions: React.FC<EventSessionsProps> = ({ eventId }) => {
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [eventId]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const data = await VirtualEventsService.getEventSessions(eventId);
      setSessions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event sessions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterForSession = async (sessionId: string) => {
    try {
      await VirtualEventsService.registerForSession(sessionId);
      toast({
        title: "Success",
        description: "Successfully registered for session!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register for session",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Sessions</h2>
        <Badge variant="secondary">{sessions.length} Sessions</Badge>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No sessions scheduled</h3>
          <p className="text-muted-foreground">
            Event sessions will appear here when they are scheduled.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle>{session.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {session.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {session.session_type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDateTime(session.start_time)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {Math.round((new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / (1000 * 60))} min
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {session.current_attendees}
                        {session.max_attendees && ` / ${session.max_attendees}`} attendees
                      </span>
                    </div>
                  </div>

                  {session.speakers && session.speakers.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Speakers:</p>
                      <div className="flex flex-wrap gap-2">
                        {session.speakers.map((speaker: any, index: number) => (
                          <Badge key={index} variant="secondary">
                            {speaker.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {session.tags && session.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleRegisterForSession(session.id)}
                      className="flex-1"
                    >
                      Register for Session
                    </Button>
                    
                    {session.meeting_url && (
                      <Button variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    )}
                    
                    {session.recording_url && (
                      <Button variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSessions;
