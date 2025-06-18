
import React from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Star, 
  MessageCircle,
  BookOpen,
  Search,
  UserPlus
} from 'lucide-react';
import { FindMentorsTab } from '@/components/mentorship/FindMentorsTab';
import { MyMentorshipsTab } from '@/components/mentorship/MyMentorshipsTab';
import { MentorApplicationsTab } from '@/components/mentorship/MentorApplicationsTab';
import { MentorshipResourcesTab } from '@/components/mentorship/MentorshipResourcesTab';

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
      id: "find-mentors",
      label: "Find Mentors",
      icon: <Search className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Find Your Mentor"
          icon={<Search className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
          description="Connect with experienced professionals who can guide your career development and personal growth"
        >
          <FindMentorsTab />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-mentorships",
      label: "My Mentorships",
      icon: <MessageCircle className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Mentorship Relationships"
          icon={<MessageCircle className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Manage your active mentorship relationships, sessions, and progress tracking"
        >
          <MyMentorshipsTab />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "mentor-applications",
      label: "Mentor Applications",
      icon: <UserPlus className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Mentor Applications"
          icon={<UserPlus className="h-5 w-5 text-[rgb(var(--pg-accent))]" />}
          description="Review and manage your applications to become a mentor or mentee"
        >
          <MentorApplicationsTab />
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
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
          description="Access guides, templates, and tools for effective mentorship relationships"
        >
          <MentorshipResourcesTab />
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
      defaultTab="find-mentors"
      ctaTitle="Ready to Start Your Mentorship Journey?"
      ctaDescription="Join our community of mentors and mentees to accelerate your professional development"
      ctaActionLabel="Get Started"
      ctaActionHref="#find-mentors"
      showProgress={false}
    />
  );
};

export default MentorshipProgramsPage;
