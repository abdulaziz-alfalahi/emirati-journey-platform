
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { AdvisoryDashboard } from '@/components/career-advisory/AdvisoryDashboard';
import { AdvisorPortfolio } from '@/components/career-advisory/AdvisorPortfolio';
import { AdvisorScheduling } from '@/components/career-advisory/AdvisorScheduling';
import { InterviewPrep } from '@/components/career-advisory/InterviewPrep';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, Calendar, MessageCircle, BookOpen } from 'lucide-react';

const CareerAdvisoryPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('dashboard');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Career Advisory"
        description="Get personalized career guidance from certified advisors who understand the UAE market and your professional aspirations"
        icon={<UserCheck className="h-12 w-12" />}
        primaryActionLabel="Find My Advisor"
        primaryActionIcon={<Users className="h-5 w-5" />}
        secondaryActionLabel="Schedule Consultation"
        secondaryActionIcon={<Calendar className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">200+</div>
              <div className="text-gray-600">Certified Advisors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">92%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">15+</div>
              <div className="text-gray-600">Industry Specializations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-white border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-ehrdc-teal">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="advisors" className="flex items-center gap-2 text-ehrdc-teal">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Advisors</span>
            </TabsTrigger>
            <TabsTrigger value="scheduling" className="flex items-center gap-2 text-ehrdc-teal">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2 text-ehrdc-teal">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Interview Prep</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 text-ehrdc-teal">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdvisoryDashboard />
          </TabsContent>
          
          <TabsContent value="advisors">
            <AdvisorPortfolio />
          </TabsContent>
          
          <TabsContent value="scheduling">
            <AdvisorScheduling />
          </TabsContent>
          
          <TabsContent value="interview">
            <InterviewPrep />
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Career Resources</h3>
              <p className="text-gray-600">Access comprehensive career development resources and guides.</p>
            </div>
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

export default CareerAdvisoryPage;
