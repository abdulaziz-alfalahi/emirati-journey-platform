
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, BookOpen, User, Users, Settings, Shield } from 'lucide-react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import DashboardActions from '@/components/dashboard/DashboardActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

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
      
      {/* Add API keys card for quick access */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage platform settings and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Link 
            to="/api-keys" 
            className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-emirati-teal" />
              <div>
                <h3 className="font-medium">API Keys Management</h3>
                <p className="text-sm text-muted-foreground">Configure API keys for platform integrations</p>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
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
              { title: "User Role Management", description: "Assign and manage user roles", icon: Shield, link: "/admin/user-roles" },
              { title: "User Management", description: "Manage accounts", icon: Users },
              { title: "Role Administration", description: "Assign user roles", icon: User },
              { title: "Content Manager", description: "Manage platform content", icon: BookOpen },
              { title: "API Keys", description: "Configure platform integrations", icon: Settings, link: "/api-keys" },
              { title: "Analytics & Reports", description: "View platform metrics", icon: BarChart4 }
            ]}
          />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);

export default AdminDashboard;
