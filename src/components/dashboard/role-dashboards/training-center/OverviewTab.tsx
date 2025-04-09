
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Badge as BadgeIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { Program, Assessment } from '@/types/training-center';

interface OverviewTabProps {
  programs: Program[];
  assessments: Assessment[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ programs, assessments }) => {
  return (
    <div className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Active Programs", value: "18", change: "+3", description: "Training courses offered" },
          { title: "Enrolled Trainees", value: "245", change: "+12%", description: "Current enrollment" },
          { title: "Completion Rate", value: "87%", change: "+2%", description: "Average success rate" }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Programs</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <CardDescription>Next 30 days program schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programs.slice(0, 3).map(program => (
                <div key={program.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{program.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" /> 
                      <span>{program.trainees} trainees</span>
                      <span className="mx-2">•</span>
                      <span>Starts: {program.startDate}</span>
                    </div>
                  </div>
                  <Badge variant={program.status === 'active' ? 'default' : 'outline'}>
                    {program.status === 'active' ? 'Active' : 'Planned'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">Manage Programs</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Assessments</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <CardDescription>Assessment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map(assessment => (
                <div key={assessment.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{assessment.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" /> 
                      <span>{assessment.candidates} candidates</span>
                      <span className="mx-2">•</span>
                      <span>{assessment.date}</span>
                    </div>
                  </div>
                  <Badge 
                    className={
                      assessment.type === 'certification' 
                        ? 'bg-blue-500/10 text-blue-500' 
                        : assessment.type === 'skills' 
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }
                  >
                    {assessment.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">Manage Assessments</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key indicators of program effectiveness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Trainee Satisfaction</span>
              <span className="text-sm text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Course Completion Rate</span>
              <span className="text-sm text-muted-foreground">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Job Placement Rate</span>
              <span className="text-sm text-muted-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Certification Success Rate</span>
              <span className="text-sm text-muted-foreground">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
