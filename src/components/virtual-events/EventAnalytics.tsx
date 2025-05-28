
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { VirtualEventsService } from '@/services/virtualEventsService';

interface EventAnalyticsProps {
  eventId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const EventAnalytics: React.FC<EventAnalyticsProps> = ({ eventId }) => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [eventId]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await VirtualEventsService.getAnalyticsSummary(eventId);
      setAnalyticsData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event analytics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No analytics data available</h3>
        <p className="text-muted-foreground">
          Analytics data will appear here as users interact with the event.
        </p>
      </div>
    );
  }

  const attendanceData = [
    { name: 'Registered', value: analyticsData.totalRegistrations },
    { name: 'Attended', value: analyticsData.attendedCount },
    { name: 'No Show', value: analyticsData.totalRegistrations - analyticsData.attendedCount }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Event Analytics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalRegistrations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attended</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.attendedCount}</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.totalRegistrations > 0 
                ? `${Math.round((analyticsData.attendedCount / analyticsData.totalRegistrations) * 100)}% attendance rate`
                : 'No registrations yet'
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analyticsData.averageSessionDuration || 0)}m
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Networking Connections</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalNetworkingConnections}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Registration vs actual attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>User interaction throughout the event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Registration Rate</span>
                <Badge variant="secondary">
                  {analyticsData.totalRegistrations > 0 ? '100%' : '0%'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attendance Rate</span>
                <Badge variant="secondary">
                  {analyticsData.totalRegistrations > 0 
                    ? `${Math.round((analyticsData.attendedCount / analyticsData.totalRegistrations) * 100)}%`
                    : '0%'
                  }
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg. Session Duration</span>
                <Badge variant="secondary">
                  {Math.round(analyticsData.averageSessionDuration || 0)} minutes
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Networking Activity</span>
                <Badge variant="secondary">
                  {analyticsData.totalNetworkingConnections} connections
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventAnalytics;
