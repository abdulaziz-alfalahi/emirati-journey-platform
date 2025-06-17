
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface CareerPageLayoutProps {
  // Hero section props
  title: string;
  description: string;
  heroIcon: React.ReactNode;
  primaryActionLabel: string;
  primaryActionIcon?: React.ReactNode;
  primaryActionOnClick?: () => void;
  secondaryActionLabel?: string;
  secondaryActionIcon?: React.ReactNode;
  secondaryActionOnClick?: () => void;
  
  // Stats section props
  stats: Array<{
    value: string;
    label: string;
  }>;
  
  // Quote section props
  quote: string;
  attribution: string;
  quoteIcon: React.ReactNode;
  
  // Tabs props
  tabs: TabItem[];
  defaultTab: string;
  
  // Optional gradient override - removed to ensure consistency
}

export const CareerPageLayout: React.FC<CareerPageLayoutProps> = ({
  title,
  description,
  heroIcon,
  primaryActionLabel,
  primaryActionIcon,
  primaryActionOnClick,
  secondaryActionLabel,
  secondaryActionIcon,
  secondaryActionOnClick,
  stats,
  quote,
  attribution,
  quoteIcon,
  tabs,
  defaultTab
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Use consistent gradient for all Career Entry pages
  const standardGradient = "from-blue-50 via-white to-indigo-50";

  const content = (
    <div className={`min-h-screen bg-gradient-to-br ${standardGradient}`}>
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title={title}
        description={description}
        icon={heroIcon}
        primaryActionLabel={primaryActionLabel}
        primaryActionIcon={primaryActionIcon}
        primaryActionOnClick={primaryActionOnClick}
        secondaryActionLabel={secondaryActionLabel}
        secondaryActionIcon={secondaryActionIcon}
        secondaryActionOnClick={secondaryActionOnClick}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-16 bg-gradient-to-r from-ehrdc-teal to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              {quoteIcon}
            </div>
          </div>
          <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
            "{quote}"
          </blockquote>
          <cite className="text-lg opacity-90">— {attribution}</cite>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border min-w-max">
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
