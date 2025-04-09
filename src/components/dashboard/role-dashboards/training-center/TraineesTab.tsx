
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Bell, GraduationCap, BarChart4, BookOpen, Clock } from 'lucide-react';
import DashboardActions from '@/components/dashboard/DashboardActions';

const TraineesTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Trainee Management</CardTitle>
              <CardDescription>Oversee trainee enrollment and progress</CardDescription>
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" /> Add New Trainee
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Trainee Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Trainees</p>
                    <p className="text-2xl font-bold">245</p>
                  </div>
                  <Users className="h-8 w-8 text-emirati-teal opacity-80" />
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Registrations</p>
                    <p className="text-2xl font-bold">36</p>
                  </div>
                  <Bell className="h-8 w-8 text-emirati-teal opacity-80" />
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Graduates</p>
                    <p className="text-2xl font-bold">182</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-emirati-teal opacity-80" />
                </div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Cohorts</h3>
            <div className="border rounded-lg divide-y">
              <div className="p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Web Development Bootcamp</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">28 trainees • 6 weeks remaining</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Digital Marketing Intensive</h4>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">42 trainees • 3 weeks remaining</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Cloud Computing Certification</h4>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Starting Soon</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">35 trainees • Starts in 5 days</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Preparation</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Trainees</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Trainee Support Tools</CardTitle>
          <CardDescription>Tools for supporting trainees</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Progress Tracking", description: "Monitor trainee progress", icon: BarChart4 },
              { title: "Communication", description: "Send updates & notices", icon: Bell },
              { title: "Resource Center", description: "Manage learning materials", icon: BookOpen },
              { title: "Attendance Tracking", description: "Record & monitor attendance", icon: Clock }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TraineesTab;
