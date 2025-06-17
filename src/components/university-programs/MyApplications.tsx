
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface Application {
  id: string;
  programName: string;
  universityName: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';
  submittedDate: string;
  deadline: string;
  nextStep?: string;
}

const MyApplications: React.FC = () => {
  // Mock data - in real app this would come from an API
  const [applications] = useState<Application[]>([
    {
      id: '1',
      programName: 'Master of Science in Artificial Intelligence',
      universityName: 'Khalifa University',
      status: 'under_review',
      submittedDate: '2024-03-15',
      deadline: '2024-07-30',
      nextStep: 'Interview scheduled for April 10th'
    },
    {
      id: '2',
      programName: 'Bachelor of Science in Computer Science',
      universityName: 'United Arab Emirates University',
      status: 'accepted',
      submittedDate: '2024-02-20',
      deadline: '2024-08-15'
    },
    {
      id: '3',
      programName: 'Master of Business Administration',
      universityName: 'University of Dubai',
      status: 'pending',
      submittedDate: '2024-04-01',
      deadline: '2024-06-30',
      nextStep: 'Submit additional documents'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'waitlisted':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'waitlisted':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start applying to programs to track your applications here.
            </p>
            <Button>
              Browse Programs
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {applications.length} application{applications.length !== 1 ? 's' : ''}
        </h3>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-1">{application.programName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{application.universityName}</p>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(application.status)}
                    {application.status.replace('_', ' ')}
                  </span>
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Submitted: {formatDate(application.submittedDate)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  <span>Deadline: {formatDate(application.deadline)}</span>
                </div>
              </div>

              {application.nextStep && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Next Step:</p>
                  <p className="text-sm text-blue-700">{application.nextStep}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Contact University
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
