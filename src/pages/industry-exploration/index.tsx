
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveIndustryMap } from '@/components/industry-exploration/InteractiveIndustryMap';
import { IndustryProfiles } from '@/components/industry-exploration/IndustryProfiles';
import { IndustryComparison } from '@/components/industry-exploration/IndustryComparison';
import { SuccessStories } from '@/components/industry-exploration/SuccessStories';
import { IndustryEvents } from '@/components/industry-exploration/IndustryEvents';
import { EmiratizationOpportunities } from '@/components/industry-exploration/EmiratizationOpportunities';
import { PersonalizedRecommendations } from '@/components/industry-exploration/PersonalizedRecommendations';
import { 
  Map, Building, BarChart3, Users, Calendar, Star, 
  Compass, Target, Search, TrendingUp
} from 'lucide-react';

const IndustryExplorationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section - Group 1 Design Pattern */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Industry Exploration</h1>
            <p className="text-xl opacity-90 mb-6">
              Discover opportunities across UAE's thriving industries and find your perfect career path with comprehensive insights and data-driven recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Building className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">15+ Industries</h3>
                <p className="text-sm opacity-90">Major economic sectors</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">2M+ Opportunities</h3>
                <p className="text-sm opacity-90">Career prospects</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Target className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">75% Emiratization</h3>
                <p className="text-sm opacity-90">Target achievement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <Map className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Interactive Map</h3>
                  <p className="text-sm text-muted-foreground">Explore industry clusters</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Building className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Industry Profiles</h3>
                  <p className="text-sm text-muted-foreground">Detailed sector insights</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <BarChart3 className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Data Analytics</h3>
                  <p className="text-sm text-muted-foreground">Market trends & forecasts</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Users className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Success Stories</h3>
                  <p className="text-sm text-muted-foreground">Professional journeys</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full ehrdc-button-primary">
                  <Search className="h-4 w-4 mr-2" />
                  Find Industries
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Sectors
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Take Assessment
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="map">Industry Map</TabsTrigger>
                <TabsTrigger value="profiles">Profiles</TabsTrigger>
                <TabsTrigger value="comparison">Compare</TabsTrigger>
                <TabsTrigger value="stories">Success Stories</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="emiratization">Emiratization</TabsTrigger>
                <TabsTrigger value="recommendations">For You</TabsTrigger>
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
      </div>
    </Layout>
  );
};

export default IndustryExplorationPage;
