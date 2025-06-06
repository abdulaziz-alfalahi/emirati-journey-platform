
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { CareerComparisonTool } from '@/components/career-comparison/CareerComparisonTool';
import { SalaryComparison } from '@/components/career-comparison/SalaryComparison';
import { GrowthProjections } from '@/components/career-comparison/GrowthProjections';
import { SkillsAnalysis } from '@/components/career-comparison/SkillsAnalysis';
import { WorkLifeBalance } from '@/components/career-comparison/WorkLifeBalance';
import { PersonalizedInsights } from '@/components/career-comparison/PersonalizedInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GitCompare, TrendingUp, BookOpen, Heart, 
  Star, BarChart3, Compass
} from 'lucide-react';

const CareerComparisonPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('comparison');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Career Path Comparison"
        description="Make informed career decisions by comparing different paths, analyzing market trends, and understanding growth opportunities"
        icon={<GitCompare className="h-12 w-12" />}
        primaryActionLabel="Start Comparison"
        primaryActionIcon={<GitCompare className="h-5 w-5" />}
        secondaryActionLabel="View Market Data"
        secondaryActionIcon={<BarChart3 className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">500+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">15+</div>
              <div className="text-gray-600">Industries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Real-time</div>
              <div className="text-gray-600">Market Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
              <div className="text-gray-600">Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-12 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Compass className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
            "Every career path is unique - compare, analyze, and choose the journey that aligns with your dreams and values."
          </blockquote>
          <p className="mt-4 text-ehrdc-teal font-semibold">- UAE Career Excellence Initiative</p>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border">
            <TabsTrigger value="comparison" className="flex items-center gap-2 text-ehrdc-teal">
              <GitCompare className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2 text-ehrdc-teal">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Salary</span>
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2 text-ehrdc-teal">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Growth</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 text-ehrdc-teal">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="balance" className="flex items-center gap-2 text-ehrdc-teal">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Balance</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 text-ehrdc-teal">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison">
            <CareerComparisonTool />
          </TabsContent>
          
          <TabsContent value="salary">
            <SalaryComparison />
          </TabsContent>
          
          <TabsContent value="growth">
            <GrowthProjections />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsAnalysis />
          </TabsContent>
          
          <TabsContent value="balance">
            <WorkLifeBalance />
          </TabsContent>
          
          <TabsContent value="insights">
            <PersonalizedInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default CareerComparisonPage;
