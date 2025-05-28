
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Search, UserPlus, MessageSquare, Calendar, Star, TrendingUp } from 'lucide-react';
import { MentorProfileSetup } from '@/components/mentorship/MentorProfileSetup';
import { MentorshipMatching } from '@/components/mentorship/MentorshipMatching';
import { MentorshipDashboard } from '@/components/mentorship/MentorshipDashboard';
import { useAuth } from '@/context/AuthContext';
import { mentorshipService } from '@/services/mentorshipService';
import { useToast } from '@/hooks/use-toast';

const MentorshipPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMentors: 0,
    activeMentorships: 0,
    totalSessions: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (user) {
      checkMentorStatus();
      loadStats();
    }
  }, [user]);

  const checkMentorStatus = async () => {
    try {
      const mentorProfile = await mentorshipService.getMentorProfile();
      setIsMentor(!!mentorProfile);
    } catch (error) {
      setIsMentor(false);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // These would be real API calls in a production app
      setStats({
        totalMentors: 150,
        activeMentorships: 45,
        totalSessions: 230,
        averageRating: 4.8
      });
    } catch (error) {
      // Handle error silently for demo
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Login Required</h3>
              <p className="text-muted-foreground text-center mb-4">
                Please log in to access the mentorship platform and connect with mentors or mentees
              </p>
              <Button>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mentorship Platform</h1>
          <p className="text-muted-foreground">
            Connect with experienced mentors or share your expertise as a mentor
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Mentors</p>
                  <p className="text-lg font-semibold">{stats.totalMentors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Mentorships</p>
                  <p className="text-lg font-semibold">{stats.activeMentorships}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-lg font-semibold">{stats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-lg font-semibold">{stats.averageRating}/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">
              <MessageSquare className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="find-mentor">
              <Search className="h-4 w-4 mr-2" />
              Find Mentors
            </TabsTrigger>
            <TabsTrigger value="mentor-setup">
              <UserPlus className="h-4 w-4 mr-2" />
              {isMentor ? 'Update Profile' : 'Become a Mentor'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <MentorshipDashboard />
          </TabsContent>

          <TabsContent value="find-mentor">
            <MentorshipMatching />
          </TabsContent>

          <TabsContent value="mentor-setup">
            {isMentor && (
              <div className="mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Active Mentor
                </Badge>
              </div>
            )}
            <MentorProfileSetup />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MentorshipPage;
