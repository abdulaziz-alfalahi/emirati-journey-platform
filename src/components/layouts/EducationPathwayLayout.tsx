import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LucideIcon, GraduationCap, BookOpen, Users, TrendingUp } from 'lucide-react';

export interface EducationStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface EducationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface EducationPathwayLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: EducationStat[];
  tabs: EducationTab[];
  defaultTab: string;
  heroImageUrl?: string;
  actionButtonText?: string;
  actionButtonHref?: string;
}

export const EducationPathwayLayout: React.FC<EducationPathwayLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab,
  heroImageUrl,
  actionButtonText = "Get Started",
  actionButtonHref = "#"
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        <div className="relative dubai-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl shadow-lg">
                {icon}
              </div>
            </div>
            
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <GraduationCap className="h-4 w-4 mr-2" />
              Education Pathway
            </Badge>
            
            <h1 className="dubai-text-heading-1 text-ehrdc-neutral-dark mb-6">
              {title}
            </h1>
            
            <p className="dubai-text-body-large text-ehrdc-neutral-dark/70 mb-8 max-w-3xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="ehrdc-button-primary px-8 py-3"
                asChild
              >
                <a href={actionButtonHref}>
                  {actionButtonText}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="dubai-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-ehrdc-neutral-dark mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="dubai-container">
          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm shadow-sm">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-sm">
                  {tab.content}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600/5 to-indigo-600/5">
        <div className="dubai-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <h2 className="dubai-text-heading-2 text-ehrdc-neutral-dark mb-4">
              Join Our Learning Community
            </h2>
            
            <p className="dubai-text-body text-ehrdc-neutral-dark/70 mb-8">
              Connect with fellow learners, share experiences, and access exclusive educational resources designed for UAE citizens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">15K+</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Active Learners</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">500+</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Expert Instructors</div>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-white/80">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-ehrdc-neutral-dark/70">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 border-blue-200 hover:bg-blue-50"
            >
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default EducationPathwayLayout;