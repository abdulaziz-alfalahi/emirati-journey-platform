
import React, { useState } from 'react';
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
  Compass,
  Map,
  GitCompare
} from 'lucide-react';

const CareerJourneyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("journey");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section - Group 1 Design Pattern */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Your Career Journey</h1>
            <p className="text-xl opacity-90 mb-6">
              Visualize your career path, set milestones, and track your professional development journey with personalized insights and AI-powered recommendations tailored for the UAE's dynamic economy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Navigation className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">500+ Career Paths</h3>
                <p className="text-sm opacity-90">Mapped across all sectors</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Target className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">95% Success Rate</h3>
                <p className="text-sm opacity-90">Goal achievement rate</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <BarChart3 className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">AI-Powered Insights</h3>
                <p className="text-sm opacity-90">Personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <Navigation className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Career Mapping</h3>
                  <p className="text-sm text-muted-foreground">Interactive journey builder</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Target className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Goal Setting</h3>
                  <p className="text-sm text-muted-foreground">SMART objectives tracking</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <TrendingUp className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Skills Analysis</h3>
                  <p className="text-sm text-muted-foreground">Gap identification & learning</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <BarChart3 className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">Real-time analytics</p>
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
                  <Map className="h-4 w-4 mr-2" />
                  Start Journey Map
                </Button>
                <Button variant="outline" className="w-full">
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare Paths
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Set New Goal
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="journey">Journey Map</TabsTrigger>
                <TabsTrigger value="goals">Goals & Milestones</TabsTrigger>
                <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
                <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="journey" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Interactive Career Journey Map</h2>
                </div>
                <CareerJourneyVisualization />
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Goal Setting & Tracking</h2>
                <GoalSetting />
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Skills Gap Analysis</h2>
                <SkillsGapAnalysis />
              </TabsContent>
              
              <TabsContent value="progress" className="space-y-4">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Progress Tracking Dashboard</h3>
                  <p className="text-muted-foreground">
                    Monitor your career development and achievements over time with detailed analytics and insights.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-4">
                <div className="text-center py-12">
                  <Compass className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">AI-Powered Career Insights</h3>
                  <p className="text-muted-foreground">
                    Get personalized recommendations and insights to accelerate your career growth in the UAE market.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerJourneyPage;
