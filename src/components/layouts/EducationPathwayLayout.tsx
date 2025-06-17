
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AccessibilityEnhancedLayout } from '@/components/accessibility/AccessibilityEnhancedLayout';
import { Button } from '@/components/ui/button';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface EducationPathwayLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: Stat[];
  tabs: TabItem[];
  defaultTab: string;
  actionButtonText?: string;
  actionButtonHref?: string;
}

// Type aliases for backward compatibility
export type EducationStat = Stat;
export type EducationTab = TabItem;

export interface AcademicProgress {
  courseId: string;
  courseName: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  status: 'active' | 'completed' | 'paused';
  nextDeadline?: Date;
}

export interface AcademicAnnouncement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: Date;
  urgent: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  dateEarned: Date;
  category: 'academic' | 'social' | 'leadership' | 'service';
}

export interface InstitutionalBranding {
  institutionName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
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
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Use mobile detection with error boundary
  let isMobile = false;
  let isCapacitor = false;
  
  try {
    const mobileDetection = useMobileDetection();
    isMobile = mobileDetection.isMobile;
    isCapacitor = mobileDetection.isCapacitor;
  } catch (error) {
    console.warn('Mobile detection failed, using defaults:', error);
    // Fallback to basic detection
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 768;
    }
  }

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section 
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        role="banner"
        aria-labelledby="hero-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4" role="img" aria-label="Page icon">
              {icon}
            </div>
          </div>
          <h1 id="hero-title" className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
          {actionButtonText && actionButtonHref && (
            <div className="mt-8">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  if (actionButtonHref.startsWith('#')) {
                    document.getElementById(actionButtonHref.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = actionButtonHref;
                  }
                }}
              >
                {actionButtonText}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-16 bg-white"
        role="complementary"
        aria-labelledby="stats-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" role="group" aria-labelledby={`stat-${index}`}>
                <div className="flex justify-center mb-4" role="img" aria-hidden="true">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div id={`stat-${index}`} className="text-4xl font-bold text-blue-600 mb-2" aria-label={`${stat.value} ${stat.label}`}>
                  {stat.value}
                </div>
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
            <TabsList 
              className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border min-w-max"
              role="tablist"
              aria-label="Content sections"
            >
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="flex items-center gap-2 text-blue-600 whitespace-nowrap"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  <span role="img" aria-hidden="true">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent 
              key={tab.id} 
              value={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
            >
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

  // Wrap content with accessibility enhancements
  const enhancedContent = (
    <AccessibilityEnhancedLayout>
      {content}
    </AccessibilityEnhancedLayout>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{enhancedContent}</MobileLayout>;
  }

  return <Layout>{enhancedContent}</Layout>;
};

export default EducationPathwayLayout;
