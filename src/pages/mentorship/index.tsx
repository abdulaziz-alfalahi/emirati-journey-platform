
import React from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Star, 
  MessageCircle,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

const MentorshipProgramsPage: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: "300+",
      label: "Active Mentors",
      icon: UserCheck
    },
    {
      value: "800+",
      label: "Mentees",
      icon: Users
    },
    {
      value: "1,500+",
      label: "Sessions Completed",
      icon: Calendar
    },
    {
      value: "4.8/5",
      label: "Average Rating",
      icon: Star
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "find-mentor",
      label: "Find a Mentor",
      icon: <Users className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Find Your Mentor"
          icon={<Users className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Connect with experienced professionals who can guide your career development"
        >
          <EmptyTabContent
            icon={Users}
            title="Find a Mentor"
            description="Browse our network of experienced mentors and find the perfect match for your career goals and aspirations."
            actionLabel="Browse Mentors"
            onAction={() => console.log("Browse mentors")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-sessions",
      label: "My Sessions",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Mentorship Sessions"
          icon={<Calendar className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Manage your scheduled and completed mentorship sessions"
        >
          <EmptyTabContent
            icon={Calendar}
            title="My Sessions"
            description="View and manage your upcoming, ongoing, and completed mentorship sessions."
            actionLabel="View Sessions"
            onAction={() => console.log("View mentorship sessions")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "groups",
      label: "Group Mentorship",
      icon: <MessageCircle className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Group Mentorship"
          icon={<MessageCircle className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Join group mentorship sessions and peer learning circles"
        >
          <EmptyTabContent
            icon={MessageCircle}
            title="Group Mentorship"
            description="Participate in group mentorship sessions and connect with peers for collaborative learning experiences."
            actionLabel="Join Groups"
            onAction={() => console.log("Join group mentorship")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "resources",
      label: "Resources",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Mentorship Resources"
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Access guides and tools for effective mentorship relationships"
        >
          <EmptyTabContent
            icon={BookOpen}
            title="Mentorship Resources"
            description="Access comprehensive guides, templates, and tools to make the most of your mentorship experience."
            actionLabel="Browse Resources"
            onAction={() => console.log("Browse mentorship resources")}
          />
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Mentorship Programs"
      description="Connect with experienced professionals and peers through structured mentorship programs designed to accelerate your career growth and personal development"
      icon={<Users className="h-8 w-8 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="find-mentor"
    />
  );
};

export default MentorshipProgramsPage;
