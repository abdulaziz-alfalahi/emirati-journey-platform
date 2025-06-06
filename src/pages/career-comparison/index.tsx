
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerComparisonTool } from '@/components/career-comparison/CareerComparisonTool';
import { SalaryComparison } from '@/components/career-comparison/SalaryComparison';
import { GrowthProjections } from '@/components/career-comparison/GrowthProjections';
import { SkillsAnalysis } from '@/components/career-comparison/SkillsAnalysis';
import { WorkLifeBalance } from '@/components/career-comparison/WorkLifeBalance';
import { PersonalizedInsights } from '@/components/career-comparison/PersonalizedInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GitCompare, TrendingUp, Users, BookOpen, Heart, 
  Star, BarChart3, Target, Zap, Compass
} from 'lucide-react';

const CareerComparisonPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('comparison');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30L15 15v30l15-15zm15 0L30 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <GitCompare className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
              Career Path Comparison
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Make informed career decisions by comparing different paths, analyzing market trends, and understanding growth opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                <GitCompare className="h-5 w-5 mr-2" />
                Start Comparison
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Market Data
              </Button>
            </div>
          </div>
        </div>
      </section>

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
