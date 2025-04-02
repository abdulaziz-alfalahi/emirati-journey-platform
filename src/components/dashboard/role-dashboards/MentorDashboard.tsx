import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, BookOpen, BarChart4 } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecommendedJobs } from '@/components/job-matching/RecommendedJobs';
import { CoachDashboard } from '@/components/assessments/CoachDashboard';

interface MentorDashboardProps {
  activeTab: string;
}

const MentorDashboard: React.FC<MentorDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><Briefcase className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="students"><Users className="h-4 w-4 mr-2" /> Students</TabsTrigger>
      <TabsTrigger value="coaching"><Users className="h-4 w-4 mr-2" /> Coaching</TabsTrigger>
      <TabsTrigger value="resources"><BookOpen className="h-4 w-4 mr-2" /> Resources</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Active Mentees", value: "14", change: "+2", description: "2 new this month" },
          { title: "Completed Sessions", value: "28", change: "+8", description: "This month" },
          { title: "Avg. Session Rating", value: "4.8", change: "+0.3", description: "Out of 5" }
        ]}
      />
      
      <RecommendedJobs limit={3} />
    </TabsContent>
    
    <TabsContent value="students" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Mentees</CardTitle>
          <CardDescription>Students you are currently mentoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  AS
                </div>
                <div className="ml-4">
                  <div className="font-medium">Ahmed S.</div>
                  <div className="text-sm text-muted-foreground">Computer Science • Grade 12</div>
                </div>
              </div>
              <div className="text-sm">Next session: Tomorrow, 4 PM</div>
            </div>
            
            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  MK
                </div>
                <div className="ml-4">
                  <div className="font-medium">Maryam K.</div>
                  <div className="text-sm text-muted-foreground">Engineering • Grade 11</div>
                </div>
              </div>
              <div className="text-sm">Next session: Friday, 2 PM</div>
            </div>
            
            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  NK
                </div>
                <div className="ml-4">
                  <div className="font-medium">Noura K.</div>
                  <div className="text-sm text-muted-foreground">Medicine • University</div>
                </div>
              </div>
              <div className="text-sm">Next session: Next week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="coaching" className="space-y-8">
      <CoachDashboard />
    </TabsContent>
    
    <TabsContent value="resources" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Mentoring Resources</CardTitle>
          <CardDescription>Tools to help you become a better mentor</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Career Guidance Materials", description: "Resources for mentees", icon: BookOpen },
              { title: "Mentoring Best Practices", description: "Training and tips", icon: Users },
              { title: "Industry Insights", description: "Latest trends", icon: BarChart4 },
              { title: "Assessment Tools", description: "Evaluate progress", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default MentorDashboard;
