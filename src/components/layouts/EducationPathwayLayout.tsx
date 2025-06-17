
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export interface EducationStat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface EducationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface AcademicProgress {
  courseId: string;
  courseName: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  status: string;
  nextDeadline?: Date;
}

export interface AcademicAnnouncement {
  id: string;
  title: string;
  message: string;
  type: string;
  date: Date;
  urgent: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  dateEarned: Date;
  category: string;
}

export interface InstitutionalBranding {
  institutionName: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface EducationPathwayLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: EducationStat[];
  tabs: EducationTab[];
  defaultTab: string;
  actionButtonText?: string;
  actionButtonHref?: string;
  academicProgress?: AcademicProgress[];
  announcements?: AcademicAnnouncement[];
  achievements?: Achievement[];
  academicYear?: string;
  institutionalBranding?: InstitutionalBranding;
}

export const EducationPathwayLayout: React.FC<EducationPathwayLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab,
  actionButtonText,
  actionButtonHref
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal via-ehrdc-light-teal to-ehrdc-neutral-light">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              {icon}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </section>

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
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default EducationPathwayLayout;
