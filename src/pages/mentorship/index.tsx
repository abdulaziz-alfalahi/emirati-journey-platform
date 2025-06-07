
import React, { useState, useEffect } from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Search, UserPlus, MessageSquare, Calendar, 
  Star, TrendingUp, Target 
} from 'lucide-react';
import { MentorProfileSetup } from '@/components/mentorship/MentorProfileSetup';
import { MentorshipMatching } from '@/components/mentorship/MentorshipMatching';
import { MentorshipDashboard } from '@/components/mentorship/MentorshipDashboard';
import { useAuth } from '@/context/AuthContext';
import { mentorshipService } from '@/services/mentorshipService';
import { useToast } from '@/hooks/use-toast';

const MentorshipPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);
  const [stats, setStats] = useState({
    totalMentors: 150,
    activeMentorships: 45,
    totalSessions: 230,
    averageRating: 4.8
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
      <ProfessionalGrowthLayout
        title="Mentorship Platform"
        description="Connect with experienced mentors or share your expertise as a mentor"
        icon={<Users className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <AuthenticationRequired 
          message="Please log in to access the mentorship platform and connect with mentors or mentees" 
          icon={<Users className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </ProfessionalGrowthLayout>
    );
  }

  if (loading) {
    return (
      <ProfessionalGrowthLayout
        title="Mentorship Platform"
        description="Connect with experienced mentors or share your expertise as a mentor"
        icon={<Users className="h-8 w-8 text-white" />}
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
      value: stats.totalMentors.toString(),
      label: "Total Mentors",
      icon: Users
    },
    {
      value: stats.activeMentorships.toString(),
      label: "Active Mentorships",
      icon: TrendingUp
    },
    {
      value: stats.totalSessions.toString(),
      label: "Total Sessions",
      icon: Calendar
    },
    {
      value: `${stats.averageRating}/5.0`,
      label: "Average Rating",
      icon: Star
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MessageSquare className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Mentorship Dashboard"
          icon={<MessageSquare className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Overview of your mentorship activities and connections"
        >
          <MentorshipDashboard />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "find-mentor",
      label: "Find Mentors",
      icon: <Search className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Find Mentors"
          icon={<Search className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Discover and connect with experienced mentors in your field"
        >
          <MentorshipMatching />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "mentor-setup",
      label: isMentor ? "Update Profile" : "Become a Mentor",
      icon: <UserPlus className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title={isMentor ? "Update Mentor Profile" : "Become a Mentor"}
          icon={<UserPlus className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description={isMentor ? "Update your mentor profile and availability" : "Set up your mentor profile and start helping others"}
          action={isMentor ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <UserPlus className="h-3 w-3 mr-1" />
              Active Mentor
            </Badge>
          ) : undefined}
        >
          <MentorProfileSetup />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Target className="h-4 w-4" />,
      content: (
        <EmptyTabContent
          icon={Target}
          title="Mentorship Resources"
          description="Access guides, best practices, and resources for effective mentorship."
          actionLabel="View Resources"
          onAction={() => toast({ 
            title: "Resources", 
            description: "Mentorship resources and guides are coming soon." 
          })}
        />
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Mentorship Platform"
      description="Connect with experienced mentors or share your expertise as a mentor"
      icon={<Users className="h-8 w-8 text-white" />}
      stats={statsItems}
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default MentorshipPage;
