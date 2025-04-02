
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MentorDashboardProps {
  activeTab: string;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><Users className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="mentees"><Users className="h-4 w-4 mr-2" /> Mentees</TabsTrigger>
      <TabsTrigger value="sessions"><Calendar className="h-4 w-4 mr-2" /> Sessions</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Active Mentees", value: "12", change: "+2", description: "Currently mentoring" },
          { title: "Upcoming Sessions", value: "5", change: "", description: "Next 7 days" },
          { title: "Total Hours", value: "48", change: "", description: "Mentoring time this month" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="mentees" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Mentees</CardTitle>
          <CardDescription>Manage your mentoring relationships</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg divide-y">
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Ahmed Al Falasi</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">University Student</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Focus: Career Planning • Next session: Tomorrow</p>
              <Button variant="outline" size="sm" className="mt-3">View Progress</Button>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Sara Al Mansoori</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Recent Graduate</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Focus: Entrepreneurship • Next session: Wed, 2:00 PM</p>
              <Button variant="outline" size="sm" className="mt-3">View Progress</Button>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">Omar Al Shamsi</h3>
                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Career Changer</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Focus: Industry Transition • Next session: Friday, 4:00 PM</p>
              <Button variant="outline" size="sm" className="mt-3">View Progress</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="sessions" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Mentoring Tools</CardTitle>
          <CardDescription>Resources for effective mentoring</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Session Scheduler", description: "Manage your calendar", icon: Calendar },
              { title: "Learning Resources", description: "Share with mentees", icon: BookOpen },
              { title: "Progress Tracker", description: "Monitor development", icon: Clock },
              { title: "Mentoring Network", description: "Connect with other mentors", icon: Users }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default MentorDashboard;
