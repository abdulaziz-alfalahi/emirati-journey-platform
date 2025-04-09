
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clipboard, BarChart4, FileText, Calendar } from 'lucide-react';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Assessment } from '@/types/training-center';

interface AssessmentsTabProps {
  assessments: Assessment[];
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ assessments }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Assessment Center</CardTitle>
              <CardDescription>Manage testing and certifications</CardDescription>
            </div>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" /> Create Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg divide-y">
            {assessments.map(assessment => (
              <div key={assessment.id} className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{assessment.title}</h3>
                  <Badge 
                    className={
                      assessment.type === 'certification' 
                        ? 'bg-blue-500/10 text-blue-700' 
                        : assessment.type === 'skills' 
                        ? 'bg-green-500/10 text-green-700'
                        : 'bg-purple-500/10 text-purple-700'
                    }
                  >
                    {assessment.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {assessment.candidates} candidates • Scheduled: {assessment.date}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Manage Results</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Tools</CardTitle>
          <CardDescription>Tools for managing assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Test Builder", description: "Create custom assessments", icon: Clipboard },
              { title: "Result Analysis", description: "Review performance data", icon: BarChart4 },
              { title: "Certification Management", description: "Track & issue certificates", icon: FileText },
              { title: "Schedule Assessments", description: "Set dates and venues", icon: Calendar }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentsTab;
