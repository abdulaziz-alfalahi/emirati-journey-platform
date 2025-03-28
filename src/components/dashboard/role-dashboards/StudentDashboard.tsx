
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, Calendar, User, Users } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudentDashboardProps {
  activeTab: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="academics"><BookOpen className="h-4 w-4 mr-2" /> Academics</TabsTrigger>
      <TabsTrigger value="activities"><Calendar className="h-4 w-4 mr-2" /> Activities</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Academic Progress", value: "Grade 11", change: "", description: "Academic Year 2023-2024" },
          { title: "Summer Programs", value: "12", change: "", description: "Available programs near you" },
          { title: "Upcoming Assessments", value: "3", change: "", description: "Due this week" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="academics" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Courses</CardTitle>
          <CardDescription>Your enrolled courses and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Mathematics</h4>
                <p className="text-sm text-muted-foreground">Advanced Calculus</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                A (95%)
              </div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Science</h4>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                B+ (87%)
              </div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-medium">Arabic Language</h4>
                <p className="text-sm text-muted-foreground">Advanced Literature</p>
              </div>
              <div className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                A- (92%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="activities" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
          <CardDescription>Tools and resources for your academic journey</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Learning Materials", description: "Study resources", icon: BookOpen },
              { title: "Career Guidance", description: "Explore career paths", icon: BarChart4 },
              { title: "Scholarship Finder", description: "Find opportunities", icon: Users },
              { title: "Mentorship Connect", description: "Find a mentor", icon: Users }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default StudentDashboard;
