
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { YouthDashboard } from '@/components/youth-development/YouthDashboard';
import { ProgramCategories } from '@/components/youth-development/ProgramCategories';
import { EventsCalendar } from '@/components/youth-development/EventsCalendar';
import { MentorshipConnection } from '@/components/youth-development/MentorshipConnection';
import { SkillsTracker } from '@/components/youth-development/SkillsTracker';
import { ParentPortal } from '@/components/youth-development/ParentPortal';
import { ResourceLibrary } from '@/components/youth-development/ResourceLibrary';
import { ApplicationSystem } from '@/components/youth-development/ApplicationSystem';
import { Users, Calendar, Award, BookOpen, Heart, Zap, Target, TrendingUp } from 'lucide-react';

const YouthDevelopmentPage: React.FC = () => {
  const stats = [
    {
      value: "25+",
      label: "Active Programs",
      icon: Award
    },
    {
      value: "2,500+",
      label: "Youth Participants",
      icon: Users
    },
    {
      value: "150+",
      label: "Mentorship Connections",
      icon: Heart
    },
    {
      value: "92%",
      label: "Success Rate",
      icon: Target
    }
  ];

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Award className="h-5 w-5" />,
      content: <YouthDashboard />
    },
    {
      id: 'programs',
      label: 'Programs',
      icon: <Users className="h-5 w-5" />,
      content: <ProgramCategories />
    },
    {
      id: 'calendar',
      label: 'Events',
      icon: <Calendar className="h-5 w-5" />,
      content: <EventsCalendar />
    },
    {
      id: 'mentorship',
      label: 'Mentors',
      icon: <Heart className="h-5 w-5" />,
      content: <MentorshipConnection />
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <Zap className="h-5 w-5" />,
      content: <SkillsTracker />
    },
    {
      id: 'parent',
      label: 'Parents',
      icon: <Users className="h-5 w-5" />,
      content: <ParentPortal />
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: <BookOpen className="h-5 w-5" />,
      content: <ResourceLibrary />
    },
    {
      id: 'apply',
      label: 'Apply',
      icon: <Award className="h-5 w-5" />,
      content: <ApplicationSystem />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Youth Development Hub"
      description="Empowering Emirati Youth (13-21) through comprehensive development programs, mentorship, and innovative learning experiences"
      icon={<Zap className="h-12 w-12" />}
      stats={stats}
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default YouthDevelopmentPage;
