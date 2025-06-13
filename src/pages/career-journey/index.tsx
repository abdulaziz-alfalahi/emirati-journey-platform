
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CareerJourneyVisualization from '@/components/career-journey/CareerJourneyVisualization';
import SkillsGapAnalysis from '@/components/career-journey/SkillsGapAnalysis';
import GoalSetting from '@/components/career-journey/GoalSetting';
import { 
  Navigation, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3, 
  GitCompare,
  Map,
  Heart,
  Compass
} from 'lucide-react';

const CareerJourneyPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section - Group 1 Design Pattern */}
      <section className="relative bg-gradient-to-r from-ehrdc-teal via-ehrdc-dark-teal to-ehrdc-neutral-dark text-white py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 left-1/6 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <Navigation className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Your Career Journey
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-8">
            Visualize your career path, set milestones, and track your professional development journey with personalized insights and AI-powered recommendations tailored for the UAE's dynamic economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
              <Map className="h-5 w-5 mr-2" />
              Start My Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
              <GitCompare className="h-5 w-5 mr-2" />
              Compare Paths
            </Button>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4 mb-16">
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-ehrdc-teal/10 rounded-lg">
                    <Navigation className="h-6 w-6 text-ehrdc-teal" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-sm text-muted-foreground">Career Paths Mapped</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">95%</p>
                    <p className="text-sm text-muted-foreground">Goal Achievement Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">25+</p>
                    <p className="text-sm text-muted-foreground">Industry Sectors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold">AI-Powered</p>
                    <p className="text-sm text-muted-foreground">Recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-12 w-12 text-ehrdc-teal" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-6 leading-relaxed">
            "Every great career begins with a single step. Map your journey, set your goals, and let your aspirations guide you toward excellence."
          </blockquote>
          <p className="text-lg text-muted-foreground">
            — UAE Career Excellence Initiative
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs defaultValue="journey" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="journey" className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                <span className="hidden sm:inline">Journey Map</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Skills Gap</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="networking" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Network</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span className="hidden sm:inline">Insights</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journey" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Interactive Career Journey Map</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Navigate your career path with our interactive visualization tool. Track milestones, 
                  identify opportunities, and plan your next steps with precision.
                </p>
              </div>
              <CareerJourneyVisualization />
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Goal Setting & Tracking</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Set SMART career goals, track your progress, and stay motivated with our 
                  comprehensive goal management system.
                </p>
              </div>
              <GoalSetting />
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Skills Gap Analysis</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Identify skills gaps, get personalized learning recommendations, and track 
                  your professional development journey.
                </p>
              </div>
              <SkillsGapAnalysis />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Progress Tracking Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor your career development and achievements over time with detailed analytics and insights.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="networking" className="space-y-6">
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Professional Networking</h3>
                <p className="text-muted-foreground">
                  Connect with industry professionals, mentors, and peers to expand your career opportunities.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="text-center py-12">
                <Compass className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Career Insights & Recommendations</h3>
                <p className="text-muted-foreground">
                  Get AI-powered insights and personalized recommendations to accelerate your career growth.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CareerJourneyPage;
