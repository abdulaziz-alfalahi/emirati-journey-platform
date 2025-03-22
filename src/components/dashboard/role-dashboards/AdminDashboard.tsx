
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, User, Users } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminDashboardProps {
  activeTab: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab }) => (
  <Tabs defaultValue={activeTab} className="space-y-8">
    <TabsList className="mb-4">
      <TabsTrigger value="overview"><User className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
      <TabsTrigger value="metrics"><BarChart4 className="h-4 w-4 mr-2" /> Metrics</TabsTrigger>
      <TabsTrigger value="management"><Users className="h-4 w-4 mr-2" /> Management</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="space-y-8">
      <DashboardOverview 
        metrics={[
          { title: "Total Users", value: "247", change: "+12%", description: "System-wide user metrics" },
          { title: "Active Journeys", value: "182", change: "+5%", description: "Current active user journeys" },
          { title: "Service Utilization", value: "68%", change: "", description: "Career Advisory Services" }
        ]}
      />
    </TabsContent>
    
    <TabsContent value="metrics" className="space-y-8">
      <DashboardMetrics />
    </TabsContent>
    
    <TabsContent value="management" className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Administration Tools</CardTitle>
          <CardDescription>Manage system and users</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardActions 
            actions={[
              { title: "User Management", description: "Manage accounts", icon: Users },
              { title: "Role Administration", description: "Assign user roles", icon: User },
              { title: "Content Manager", description: "Manage platform content", icon: BookOpen },
              { title: "Analytics & Reports", description: "View platform metrics", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default AdminDashboard;
