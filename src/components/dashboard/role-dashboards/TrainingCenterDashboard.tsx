
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, Calendar, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TrainingCenterDashboardProps {
  activeTab: string;
}

const TrainingCenterDashboard: React.FC<TrainingCenterDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><GraduationCap className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="programs"><BookOpen className="h-4 w-4 mr-2" /> Programs</TabsTrigger>
      <TabsTrigger value="students"><Users className="h-4 w-4 mr-2" /> Trainees</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Active Programs", value: "18", change: "+3", description: "Training courses offered" },
          { title: "Enrolled Trainees", value: "245", change: "+12%", description: "Current enrollment" },
          { title: "Completion Rate", value: "87%", change: "+2%", description: "Average success rate" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="programs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Manage your training offerings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" /> Create New Program
          </Button>
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Digital Skills Bootcamp</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">76 trainees • Next cohort: 2 weeks</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Leadership & Management</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">42 trainees • Ongoing weekly sessions</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Financial Literacy</h3>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planned</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Launching next month • 24 pre-registrations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="students" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Training Center Tools</CardTitle>
          <CardDescription>Manage your training operations</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Program Management", description: "Organize your courses", icon: BookOpen },
              { title: "Trainee Registration", description: "Process applications", icon: Users },
              { title: "Schedule Planner", description: "Manage training calendar", icon: Calendar },
              { title: "Performance Analytics", description: "Track outcomes", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default TrainingCenterDashboard;
