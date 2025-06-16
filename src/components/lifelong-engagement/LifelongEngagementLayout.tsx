
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AccessibilityEnhancedLayout } from '@/components/accessibility/AccessibilityEnhancedLayout';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LifelongEngagementLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: Stat[];
  tabs: TabItem[];
  defaultTab: string;
}

export const LifelongEngagementLayout: React.FC<LifelongEngagementLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab
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
    <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal via-ehrdc-light-teal to-ehrdc-neutral-light">
      {/* Hero Section */}
      <section 
        className="py-16 bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white"
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
                  <stat.icon className="h-8 w-8 text-ehrdc-teal" />
                </div>
                <div id={`stat-${index}`} className="text-4xl font-bold text-ehrdc-teal mb-2" aria-label={`${stat.value} ${stat.label}`}>
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
                  className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap"
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
