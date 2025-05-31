
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  Activity,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { CommunitiesService } from '@/services/communitiesService';
import { ProfessionalGroup } from '@/types/communities';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import EngagementMetrics from './EngagementMetrics';
import MemberActivityChart from './MemberActivityChart';
import CommunityGrowthChart from './CommunityGrowthChart';
import HealthScoreCard from './HealthScoreCard';

interface CommunityAnalyticsDashboardProps {
  groupId?: string;
}

const CommunityAnalyticsDashboard: React.FC<CommunityAnalyticsDashboardProps> = ({ groupId }) => {
  const { user } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState<ProfessionalGroup | null>(null);
  const [userGroups, setUserGroups] = useState<ProfessionalGroup[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserGroups();
    }
  }, [user]);

  useEffect(() => {
    if (groupId && userGroups.length > 0) {
      const group = userGroups.find(g => g.id === groupId);
      if (group) {
        setSelectedGroup(group);
      }
    } else if (userGroups.length > 0 && !selectedGroup) {
      setSelectedGroup(userGroups[0]);
    }
  }, [groupId, userGroups]);

  const loadUserGroups = async () => {
    try {
      setLoading(true);
      const groups = await CommunitiesService.getUserGroups();
      setUserGroups(groups);
    } catch (error) {
      console.error('Failed to load user groups:', error);
      toast({
        title: "Error",
        description: "Failed to load your communities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUserGroups();
    setRefreshing(false);
    
    toast({
      title: "Analytics Refreshed",
      description: "Community analytics data has been updated"
    });
  };

  const handleGroupChange = (groupId: string) => {
    const group = userGroups.find(g => g.id === groupId);
    if (group) {
      setSelectedGroup(group);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userGroups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Community Analytics
          </CardTitle>
          <CardDescription>
            Monitor community health and engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Communities Found</h3>
            <p className="text-muted-foreground">
              You need to be a member of at least one community to view analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Community Analytics
              </CardTitle>
              <CardDescription>
                Monitor community health and engagement metrics
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Community</label>
              <Select value={selectedGroup?.id || ''} onValueChange={handleGroupChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a community" />
                </SelectTrigger>
                <SelectContent>
                  {userGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="sm:w-48">
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedGroup && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <HealthScoreCard 
                groupId={selectedGroup.id}
                timeRange={timeRange}
              />
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Total Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedGroup.member_count}</div>
                  <p className="text-xs text-muted-foreground">
                    Active community members
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-green-600" />
                    Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">{selectedGroup.category}</div>
                  <p className="text-xs text-muted-foreground">
                    Community type
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    {new Date(selectedGroup.created_at).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Community age
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CommunityGrowthChart 
                groupId={selectedGroup.id}
                timeRange={timeRange}
              />
              
              <EngagementMetrics 
                groupId={selectedGroup.id}
                timeRange={timeRange}
              />
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <EngagementMetrics 
              groupId={selectedGroup.id}
              timeRange={timeRange}
              detailed={true}
            />
          </TabsContent>

          <TabsContent value="growth">
            <CommunityGrowthChart 
              groupId={selectedGroup.id}
              timeRange={timeRange}
              detailed={true}
            />
          </TabsContent>

          <TabsContent value="activity">
            <MemberActivityChart 
              groupId={selectedGroup.id}
              timeRange={timeRange}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CommunityAnalyticsDashboard;
