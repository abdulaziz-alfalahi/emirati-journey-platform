
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MessageSquare, Star } from 'lucide-react';
import { format } from 'date-fns';

interface SimpleSession {
  id: string;
  scheduled_date: string;
  duration_minutes: number;
  topic: string | null;
  status: string;
  notes: string | null;
  rating: number | null;
}

interface SessionCardProps {
  session: SimpleSession;
  onUpdateStatus: (sessionId: string, status: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onUpdateStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
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
                onClick={() => onUpdateStatus(session.id, 'completed')}
              >
                Mark Complete
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onUpdateStatus(session.id, 'cancelled')}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
