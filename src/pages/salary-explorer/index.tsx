
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { SalaryBenchmarkTool } from '@/components/salary-explorer/SalaryBenchmarkTool';
import { MarketTrendsAnalysis } from '@/components/salary-explorer/MarketTrendsAnalysis';
import { CompensationBreakdown } from '@/components/salary-explorer/CompensationBreakdown';
import { LocationComparison } from '@/components/salary-explorer/LocationComparison';
import { NegotiationGuidance } from '@/components/salary-explorer/NegotiationGuidance';
import { PersonalizedReport } from '@/components/salary-explorer/PersonalizedReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, BarChart3, MapPin, TrendingUp, Target, FileText } from 'lucide-react';

const SalaryExplorerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('benchmark');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Standardized Hero Section */}
        <CareerEntryHeroSection
          title="Salary Explorer"
          description="Make informed salary decisions with comprehensive market data, personalized insights, and negotiation tools"
          icon={<DollarSign className="h-12 w-12" />}
          primaryActionLabel="Explore Salaries"
          primaryActionIcon={<BarChart3 className="h-5 w-5" />}
          secondaryActionLabel="Benchmark My Salary"
          secondaryActionIcon={<Target className="h-5 w-5" />}
        />

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">500K+</div>
                <div className="text-gray-600">Salary Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">Real-time</div>
                <div className="text-gray-600">Market Updates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">15+</div>
                <div className="text-gray-600">Industry Sectors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
                <div className="text-gray-600">Insights</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border">
              <TabsTrigger value="benchmark" className="flex items-center gap-2 text-ehrdc-teal">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Benchmark</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2 text-ehrdc-teal">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trends</span>
              </TabsTrigger>
              <TabsTrigger value="compensation" className="flex items-center gap-2 text-ehrdc-teal">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Compensation</span>
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
            
            <TabsContent value="compensation">
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
    </Layout>
  );
};

export default SalaryExplorerPage;
