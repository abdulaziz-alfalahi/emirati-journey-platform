
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  Briefcase, 
  Star, 
  TrendingUp,
  Plus,
  ArrowRightLeft
} from 'lucide-react';
import { SkillsMarketplaceDashboard } from '@/components/skills-marketplace/SkillsMarketplaceDashboard';
import { OpportunitiesList } from '@/components/skills-marketplace/OpportunitiesList';
import { CreateOpportunityDialog } from '@/components/skills-marketplace/CreateOpportunityDialog';
import { UserSkillsManager } from '@/components/skills-marketplace/UserSkillsManager';
import { SkillExchangeBoard } from '@/components/skills-marketplace/SkillExchangeBoard';
import { useAuth } from '@/context/AuthContext';
import { skillsMarketplaceService } from '@/services/skillsMarketplaceService';
import { useToast } from '@/hooks/use-toast';

const SkillsMarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    activeProjects: 0,
    skillExchanges: 0,
    successRate: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // These would be real API calls in a production app
      setStats({
        totalOpportunities: 45,
        activeProjects: 12,
        skillExchanges: 8,
        successRate: 92
      });
    } catch (error) {
      // Handle error silently for demo
    } finally {
      setLoading(false);
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
                Please log in to access the skills marketplace and start collaborating with other professionals
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Skills Marketplace</h1>
          <p className="text-muted-foreground">
            Connect, collaborate, and exchange skills with professionals worldwide
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Open Opportunities</p>
                  <p className="text-lg font-semibold">{stats.totalOpportunities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-lg font-semibold">{stats.activeProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Skill Exchanges</p>
                  <p className="text-lg font-semibold">{stats.skillExchanges}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-semibold">{stats.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">
              <TrendingUp className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="browse">
              <Search className="h-4 w-4 mr-2" />
              Browse Opportunities
            </TabsTrigger>
            <TabsTrigger value="my-skills">
              <Users className="h-4 w-4 mr-2" />
              My Skills
            </TabsTrigger>
            <TabsTrigger value="skill-exchange">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Skill Exchange
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SkillsMarketplaceDashboard />
          </TabsContent>

          <TabsContent value="browse">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Browse Opportunities</h2>
                  <p className="text-muted-foreground">Find projects and collaborations that match your skills</p>
                </div>
                <CreateOpportunityDialog>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Opportunity
                  </Button>
                </CreateOpportunityDialog>
              </div>
              <OpportunitiesList />
            </div>
          </TabsContent>

          <TabsContent value="my-skills">
            <UserSkillsManager />
          </TabsContent>

          <TabsContent value="skill-exchange">
            <SkillExchangeBoard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SkillsMarketplacePage;
