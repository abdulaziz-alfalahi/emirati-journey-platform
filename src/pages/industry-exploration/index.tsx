
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { InteractiveIndustryMap } from '@/components/industry-exploration/InteractiveIndustryMap';
import { IndustryProfiles } from '@/components/industry-exploration/IndustryProfiles';
import { IndustryComparison } from '@/components/industry-exploration/IndustryComparison';
import { SuccessStories } from '@/components/industry-exploration/SuccessStories';
import { IndustryEvents } from '@/components/industry-exploration/IndustryEvents';
import { EmiratizationOpportunities } from '@/components/industry-exploration/EmiratizationOpportunities';
import { PersonalizedRecommendations } from '@/components/industry-exploration/PersonalizedRecommendations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, Building, TrendingUp, Users, Calendar, Star, 
  Compass, Target, BarChart3, Zap 
} from 'lucide-react';

const IndustryExplorationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-ehrdc-neutral-light/30 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal via-ehrdc-dark-teal to-ehrdc-teal text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-6-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Compass className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                Industry Exploration
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Discover opportunities across UAE's thriving industries and find your perfect career path
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-ehrdc-neutral-light font-semibold">
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  Take Industry Quiz
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
