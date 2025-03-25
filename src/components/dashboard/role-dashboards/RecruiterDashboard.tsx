
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, Briefcase, Calendar, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecruiterDashboardProps {
  activeTab: string;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="jobs"><Briefcase className="h-4 w-4 mr-2" /> Jobs</TabsTrigger>
      <TabsTrigger value="candidates"><Users className="h-4 w-4 mr-2" /> Candidates</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Open Positions", value: "15", change: "", description: "Currently advertised jobs" },
          { title: "Applications", value: "47", change: "", description: "Received job applications" },
          { title: "Internship Programs", value: "8", change: "", description: "Available internship positions" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="jobs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Job Management</CardTitle>
          <CardDescription>Create and manage job listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start">
            <Briefcase className="mr-2 h-4 w-4" /> Post New Job
          </Button>
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Senior Software Engineer</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">15 applications • Posted 5 days ago</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Marketing Manager</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">23 applications • Posted 2 days ago</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Finance Intern</h3>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Draft</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Not published</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="candidates" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Tools</CardTitle>
          <CardDescription>Manage your recruitment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Post Job", description: "Create new listings", icon: Briefcase },
              { title: "Internship Manager", description: "Organize programs", icon: Calendar },
              { title: "Candidate Search", description: "Find talented candidates", icon: Users },
              { title: "Emiratization Tracker", description: "Monitor compliance", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default RecruiterDashboard;
