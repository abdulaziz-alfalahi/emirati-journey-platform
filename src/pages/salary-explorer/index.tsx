
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { SalaryBenchmarkTool } from '@/components/salary-explorer/SalaryBenchmarkTool';
import { MarketTrendsAnalysis } from '@/components/salary-explorer/MarketTrendsAnalysis';
import { CompensationBreakdown } from '@/components/salary-explorer/CompensationBreakdown';
import { LocationComparison } from '@/components/salary-explorer/LocationComparison';
import { NegotiationGuidance } from '@/components/salary-explorer/NegotiationGuidance';
import { PersonalizedReport } from '@/components/salary-explorer/PersonalizedReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, BarChart3, MapPin, Briefcase, TrendingUp, 
  FileText, Target, Zap, Heart, Calculator
} from 'lucide-react';

const SalaryExplorerPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('benchmark');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15 0c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <DollarSign className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
              Salary Explorer
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Discover competitive salaries, analyze market trends, and negotiate with confidence using real UAE market data
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Salary
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Market Trends
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
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">1M+</div>
              <div className="text-gray-600">Salary Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">500+</div>
              <div className="text-gray-600">Companies Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Real-time</div>
              <div className="text-gray-600">Market Updates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">98%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Quote */}
      <section className="py-12 bg-gradient-to-r from-green-100 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
            "Know your worth, negotiate with data, and build a career that rewards your true value."
          </blockquote>
          <p className="mt-4 text-ehrdc-teal font-semibold">- UAE Career Excellence Initiative</p>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border">
            <TabsTrigger value="benchmark" className="flex items-center gap-2 text-ehrdc-teal">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Benchmark</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2 text-ehrdc-teal">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2 text-ehrdc-teal">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Breakdown</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2 text-ehrdc-teal">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="negotiation" className="flex items-center gap-2 text-ehrdc-teal">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Negotiation</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2 text-ehrdc-teal">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Report</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benchmark">
            <SalaryBenchmarkTool />
          </TabsContent>
          
          <TabsContent value="trends">
            <MarketTrendsAnalysis />
          </TabsContent>
          
          <TabsContent value="breakdown">
            <CompensationBreakdown />
          </TabsContent>
          
          <TabsContent value="location">
            <LocationComparison />
          </TabsContent>
          
          <TabsContent value="negotiation">
            <NegotiationGuidance />
          </TabsContent>
          
          <TabsContent value="report">
            <PersonalizedReport />
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

export default SalaryExplorerPage;
