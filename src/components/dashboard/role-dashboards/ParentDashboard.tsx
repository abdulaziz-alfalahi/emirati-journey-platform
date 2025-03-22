
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, Briefcase, Calendar, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ParentDashboardProps {
  activeTab: string;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="children"><Users className="h-4 w-4 mr-2" /> Children</TabsTrigger>
      <TabsTrigger value="resources"><BookOpen className="h-4 w-4 mr-2" /> Resources</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Children", value: "2", change: "", description: "Registered children" },
          { title: "Upcoming Events", value: "4", change: "", description: "School and activity events" },
          { title: "Recommended Programs", value: "7", change: "", description: "Based on your children's interests" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="children" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Children's Progress</CardTitle>
          <CardDescription>Academic and activity reports for your children</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Ahmed (16)</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Grade 11</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Overall GPA:</span>
                <span className="ml-2 font-medium">3.8/4.0</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className="ml-2 font-medium">98%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              View Full Report
            </Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-medium">Fatima (14)</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Grade 9</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Overall GPA:</span>
                <span className="ml-2 font-medium">3.9/4.0</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className="ml-2 font-medium">99%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="resources" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Parent Resources</CardTitle>
          <CardDescription>Tools to support your children's journey</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Academic Reports", description: "View children's progress", icon: BookOpen },
              { title: "Summer Programs", description: "Browse and register", icon: Calendar },
              { title: "Scholarship Opportunities", description: "Financial aid options", icon: BarChart4 },
              { title: "Career Guidance", description: "Help plan their future", icon: Briefcase }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default ParentDashboard;
