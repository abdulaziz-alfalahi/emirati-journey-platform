
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, AlertCircle, Building } from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const applications = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Emirates NBD',
      appliedDate: '2024-01-15',
      status: 'Interview Scheduled',
      progress: 75,
      nextStep: 'Technical Interview on Jan 25',
      statusColor: 'blue'
    },
    {
      id: 2,
      position: 'Digital Marketing Manager',
      company: 'Dubai Tourism',
      appliedDate: '2024-01-10',
      status: 'Under Review',
      progress: 50,
      nextStep: 'Awaiting HR review',
      statusColor: 'yellow'
    },
    {
      id: 3,
      position: 'AI Research Scientist',
      company: 'Mohammed bin Rashid University',
      appliedDate: '2024-01-20',
      status: 'Application Submitted',
      progress: 25,
      nextStep: 'Application review in progress',
      statusColor: 'gray'
    },
    {
      id: 4,
      position: 'Product Manager',
      company: 'Careem',
      appliedDate: '2024-01-05',
      status: 'Offer Received',
      progress: 100,
      nextStep: 'Review offer terms',
      statusColor: 'green'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer Received':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Interview Scheduled':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'Under Review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusVariant = (statusColor: string) => {
    switch (statusColor) {
      case 'green': return 'default';
      case 'blue': return 'secondary';
      case 'yellow': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-ehrdc-teal" />
            Application Tracker ({applications.length} Applications)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {applications.map((app) => (
              <Card key={app.id} className="border border-ehrdc-neutral-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{app.position}</h3>
                      <div className="flex items-center gap-2 text-ehrdc-teal font-medium">
                        <Building className="h-4 w-4" />
                        {app.company}
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(app.statusColor)} className="flex items-center gap-1">
                      {getStatusIcon(app.status)}
                      {app.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Application Progress</span>
                      <span>{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="w-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Next: {app.nextStep}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
