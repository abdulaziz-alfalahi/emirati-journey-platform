import React from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LucideIcon, Briefcase, Target, TrendingUp, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';

export interface CareerStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface CareerTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface CareerEntryLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: CareerStat[];
  tabs: CareerTab[];
  defaultTab: string;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export const CareerEntryLayout: React.FC<CareerEntryLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab,
  primaryActionText = "Start Your Career Journey",
  primaryActionHref = "#",
  secondaryActionText = "Explore Opportunities",
  secondaryActionHref = "#"
}) => {
  const { isMobile, isCapacitor } = useMobileDetection();

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal/5 via-ehrdc-light-teal/10 to-ehrdc-neutral-light">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ehrdc-teal/10 to-ehrdc-dark-teal/10" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        <div className="relative dubai-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-ehrdc-teal rounded-xl shadow-lg mr-4">
                  {icon}
                </div>
                <Badge className="bg-ehrdc-teal/10 text-ehrdc-teal hover:bg-ehrdc-teal/20">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Career Entry
                </Badge>
              </div>
              
              <h1 className="dubai-text-heading-1 text-ehrdc-neutral-dark mb-6">
                {title}
              </h1>
              
              <p className="dubai-text-body-large text-ehrdc-neutral-dark/70 mb-8">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="ehrdc-button-primary px-8 py-3"
                  asChild
                >
                  <a href={primaryActionHref}>
                    {primaryActionText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 border-ehrdc-teal/20 hover:bg-ehrdc-teal/10"
                  asChild
                >
                  <a href={secondaryActionHref}>
                    {secondaryActionText}
                  </a>
                </Button>
              </div>

              {/* Success Indicators */}
              <div className="flex flex-wrap gap-4 text-sm text-ehrdc-neutral-dark/70">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Free career guidance
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  UAE market insights
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Personalized matching
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-ehrdc-teal to-ehrdc-dark-teal rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-ehrdc-teal mb-2">85%</div>
                    <div className="text-sm text-ehrdc-neutral-dark/70 mb-4">Career Success Rate</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-ehrdc-neutral-dark/60">
                      "Exceptional career guidance and support throughout my journey"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="dubai-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm bg-white/90 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-ehrdc-teal/10 rounded-lg">
                      <stat.icon className="h-6 w-6 text-ehrdc-teal" />
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
              <TabsList className="grid w-full max-w-3xl grid-cols-2 lg:grid-cols-4 bg-white/90 backdrop-blur-sm shadow-sm border border-ehrdc-teal/10">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-ehrdc-teal/10 data-[state=active]:text-ehrdc-teal"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-sm border border-ehrdc-teal/10">
                  {tab.content}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Career Support Section */}
      <section className="py-16 bg-gradient-to-r from-ehrdc-teal/5 to-ehrdc-dark-teal/5">
        <div className="dubai-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-ehrdc-teal rounded-xl shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="dubai-text-heading-2 text-ehrdc-neutral-dark mb-4">
              Comprehensive Career Support
            </h2>
            
            <p className="dubai-text-body text-ehrdc-neutral-dark/70 mb-8">
              From career exploration to job placement, we provide end-to-end support tailored for UAE nationals entering the workforce.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center border-0 bg-white/90 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-blue-100 rounded-lg mx-auto w-fit mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-ehrdc-neutral-dark mb-2">Expert Mentorship</h3>
                  <p className="text-sm text-ehrdc-neutral-dark/70">
                    Connect with industry professionals and career coaches
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-white/90 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-green-100 rounded-lg mx-auto w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-ehrdc-neutral-dark mb-2">Skill Development</h3>
                  <p className="text-sm text-ehrdc-neutral-dark/70">
                    Access training programs aligned with market demands
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-white/90 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-purple-100 rounded-lg mx-auto w-fit mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-ehrdc-neutral-dark mb-2">Job Placement</h3>
                  <p className="text-sm text-ehrdc-neutral-dark/70">
                    Direct connections with UAE employers and opportunities
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              className="ehrdc-button-primary px-8 py-3"
            >
              <Target className="h-4 w-4 mr-2" />
              Schedule Career Consultation
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

export default CareerEntryLayout;