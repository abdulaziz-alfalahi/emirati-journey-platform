
import React, { useState, useEffect } from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';

const SkillsMarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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
      <ProfessionalGrowthLayout
        title="Skills Marketplace"
        description="Connect, collaborate, and exchange skills with professionals worldwide"
        icon={<Briefcase className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <AuthenticationRequired 
          message="Please log in to access the skills marketplace and start collaborating with other professionals" 
          icon={<Users className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </ProfessionalGrowthLayout>
    );
  }

  if (loading) {
    return (
      <ProfessionalGrowthLayout
        title="Skills Marketplace"
        description="Connect, collaborate, and exchange skills with professionals worldwide"
        icon={<Briefcase className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </ProfessionalGrowthLayout>
    );
  }

  const statsItems: StatItem[] = [
    {
      value: stats.totalOpportunities.toString(),
      label: "Open Opportunities",
      icon: Briefcase,
      color: "bg-indigo-500"
    },
    {
      value: stats.activeProjects.toString(),
      label: "Active Projects",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      value: stats.skillExchanges.toString(),
      label: "Skill Exchanges",
      icon: ArrowRightLeft,
      color: "bg-violet-500"
    },
    {
      value: `${stats.successRate}%`,
      label: "Success Rate",
      icon: Star,
      color: "bg-fuchsia-500"
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <TrendingUp className="h-4 w-4" />,
      content: <SkillsMarketplaceDashboard />
    },
    {
      id: "browse",
      label: "Browse Opportunities",
      icon: <Search className="h-4 w-4" />,
      content: (
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
      )
    },
    {
      id: "my-skills",
      label: "My Skills",
      icon: <Users className="h-4 w-4" />,
      content: <UserSkillsManager />
    },
    {
      id: "skill-exchange",
      label: "Skill Exchange",
      icon: <ArrowRightLeft className="h-4 w-4" />,
      content: <SkillExchangeBoard />
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Skills Marketplace"
      description="Connect, collaborate, and exchange skills with professionals worldwide"
      icon={<Briefcase className="h-8 w-8 text-white" />}
      stats={statsItems}
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default SkillsMarketplacePage;
