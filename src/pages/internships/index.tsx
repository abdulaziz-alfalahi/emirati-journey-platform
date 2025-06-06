
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { InternshipsList } from '@/components/internships/InternshipsList';
import { InternshipsFilter } from '@/components/internships/InternshipsFilter';
import { InternshipsCreate } from '@/components/internships/InternshipsCreate';
import { InternshipsManage } from '@/components/internships/InternshipsManage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Search, Plus, Settings, Target } from 'lucide-react';

const InternshipsPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('browse');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Internship Opportunities"
        description="Discover meaningful internship experiences that bridge the gap between education and career success in the UAE"
        icon={<Briefcase className="h-12 w-12" />}
        primaryActionLabel="Browse Internships"
        primaryActionIcon={<Search className="h-5 w-5" />}
        secondaryActionLabel="Post Internship"
        secondaryActionIcon={<Plus className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">1000+</div>
              <div className="text-gray-600">Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">300+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">85%</div>
              <div className="text-gray-600">Conversion to Full-time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">15+</div>
              <div className="text-gray-600">Industry Sectors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border">
            <TabsTrigger value="browse" className="flex items-center gap-2 text-ehrdc-teal">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Browse</span>
            </TabsTrigger>
            <TabsTrigger value="filter" className="flex items-center gap-2 text-ehrdc-teal">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2 text-ehrdc-teal">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Post</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2 text-ehrdc-teal">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Manage</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <InternshipsList />
          </TabsContent>
          
          <TabsContent value="filter">
            <InternshipsFilter onFilterChange={() => {}} />
          </TabsContent>
          
          <TabsContent value="create">
            <InternshipsCreate onSuccess={() => {}} />
          </TabsContent>
          
          <TabsContent value="manage">
            <InternshipsManage />
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

export default InternshipsPage;
