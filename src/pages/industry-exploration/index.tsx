
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { InteractiveIndustryMap } from '@/components/industry-exploration/InteractiveIndustryMap';
import { IndustryProfiles } from '@/components/industry-exploration/IndustryProfiles';
import { IndustryComparison } from '@/components/industry-exploration/IndustryComparison';
import { SuccessStories } from '@/components/industry-exploration/SuccessStories';
import { IndustryEvents } from '@/components/industry-exploration/IndustryEvents';
import { EmiratizationOpportunities } from '@/components/industry-exploration/EmiratizationOpportunities';
import { PersonalizedRecommendations } from '@/components/industry-exploration/PersonalizedRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, Building, BarChart3, Users, Calendar, Star, 
  Compass, Target 
} from 'lucide-react';

const IndustryExplorationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-ehrdc-neutral-light/30 to-white">
        {/* Standardized Hero Section */}
        <CareerEntryHeroSection
          title="Industry Exploration"
          description="Discover opportunities across UAE's thriving industries and find your perfect career path"
          icon={<Compass className="h-12 w-12" />}
          primaryActionLabel="Start Exploring"
          primaryActionIcon={<Map className="h-5 w-5" />}
          secondaryActionLabel="Take Industry Quiz"
          secondaryActionIcon={<Target className="h-5 w-5" />}
        />

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">15+</div>
                <div className="text-ehrdc-neutral-dark/70">Major Industries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">75%</div>
                <div className="text-ehrdc-neutral-dark/70">Emiratization Target</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">2M+</div>
                <div className="text-ehrdc-neutral-dark/70">Job Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ehrdc-teal mb-2">30%</div>
                <div className="text-ehrdc-neutral-dark/70">Average Growth Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8 bg-white border">
              <TabsTrigger value="map" className="flex items-center gap-2 text-ehrdc-teal">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex items-center gap-2 text-ehrdc-teal">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Profiles</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2 text-ehrdc-teal">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2 text-ehrdc-teal">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Stories</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2 text-ehrdc-teal">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="emiratization" className="flex items-center gap-2 text-ehrdc-teal">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Emiratization</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2 text-ehrdc-teal">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">For You</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map">
              <InteractiveIndustryMap />
            </TabsContent>
            
            <TabsContent value="profiles">
              <IndustryProfiles />
            </TabsContent>
            
            <TabsContent value="comparison">
              <IndustryComparison />
            </TabsContent>
            
            <TabsContent value="stories">
              <SuccessStories />
            </TabsContent>
            
            <TabsContent value="events">
              <IndustryEvents />
            </TabsContent>
            
            <TabsContent value="emiratization">
              <EmiratizationOpportunities />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <PersonalizedRecommendations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default IndustryExplorationPage;
