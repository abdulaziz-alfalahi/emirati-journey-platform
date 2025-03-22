
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, Calendar, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EducationalInstitutionDashboardProps {
  activeTab: string;
}

const EducationalInstitutionDashboard: React.FC<EducationalInstitutionDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="students"><Users className="h-4 w-4 mr-2" /> Students</TabsTrigger>
      <TabsTrigger value="programs"><BookOpen className="h-4 w-4 mr-2" /> Programs</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Students", value: "1,247", change: "+5%", description: "Total registered students" },
          { title: "Programs", value: "24", change: "", description: "Active educational programs" },
          { title: "Scholarships", value: "12", change: "", description: "Available scholarship opportunities" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="students" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Upload and manage student records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" /> Upload Student Records
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" /> Schedule Academic Events
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart4 className="mr-2 h-4 w-4" /> View Performance Analytics
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
    
    <TabsContent value="programs" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Institution Tools</CardTitle>
          <CardDescription>Manage your educational institution</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "Student Records", description: "Upload and manage", icon: Users },
              { title: "Programs", description: "Manage educational offerings", icon: BookOpen },
              { title: "Scholarships", description: "Create opportunities", icon: BarChart4 },
              { title: "Summer Knowledge Camps", description: "Organize programs", icon: Calendar }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default EducationalInstitutionDashboard;
