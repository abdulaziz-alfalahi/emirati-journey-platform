
import React from 'react';
import LifelongEngagementLayout from '@/components/layout/LifelongEngagementLayout';
import { YouthDashboard } from '@/components/youth-development/YouthDashboard';
import { ProgramCategories } from '@/components/youth-development/ProgramCategories';
import { EventsCalendar } from '@/components/youth-development/EventsCalendar';
import { MentorshipConnection } from '@/components/youth-development/MentorshipConnection';
import { SkillsTracker } from '@/components/youth-development/SkillsTracker';
import { ParentPortal } from '@/components/youth-development/ParentPortal';
import { ResourceLibrary } from '@/components/youth-development/ResourceLibrary';
import { ApplicationSystem } from '@/components/youth-development/ApplicationSystem';
import { Users, Calendar, Award, BookOpen, Heart, Zap, Target, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const YouthDevelopmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');

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
      heroTitle="Youth Development Hub"
      heroDescription="Empowering Emirati Youth (13-21) through comprehensive development programs, mentorship, and innovative learning experiences"
    >
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-ehrdc-teal" />
                </div>
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border min-w-max">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card>
                <CardContent className="p-6">
                  {tab.content}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </LifelongEngagementLayout>
  );
};

export default YouthDevelopmentPage;
