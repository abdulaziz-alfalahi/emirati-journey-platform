
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Compass, 
  GitCompare, 
  Map, 
  Target, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Heart, 
  Star,
  Search,
  Quote
} from 'lucide-react';

const CareerPlanningHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exploration');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 via-ehrdc-teal to-blue-500 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30L15 15v30l15-15zm15 0L30 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Compass className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Career Planning Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Your comprehensive career development platform combining journey planning, path comparison, market intelligence, and AI-powered insights to guide your professional growth in the UAE's dynamic economy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                  <Target className="h-4 w-4 mr-2" />
                  Start Planning
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Market Intelligence
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
                <div className="text-muted-foreground">Career Paths Mapped</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
                <div className="text-muted-foreground">Goal Achievement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">Real-time</div>
                <div className="text-muted-foreground">Market Intelligence</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
                <div className="text-muted-foreground">Personalized Insights</div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspirational Quote Section */}
        <section className="py-16 bg-gradient-to-r from-ehrdc-teal to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Quote className="h-8 w-8" />
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
              "Success in your career comes not from chance, but from careful planning, continuous learning, and making informed decisions based on market insights and personal growth."
            </blockquote>
            <cite className="text-lg opacity-90">— UAE Career Excellence Initiative</cite>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8 bg-white border min-w-max">
                <TabsTrigger value="exploration" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Career Exploration</span>
                </TabsTrigger>
                <TabsTrigger value="market-intelligence" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Market Intelligence</span>
                </TabsTrigger>
                <TabsTrigger value="skills-development" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills Development</span>
                </TabsTrigger>
                <TabsTrigger value="goals-tracking" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Goals & Milestones</span>
                </TabsTrigger>
                <TabsTrigger value="personalized-insights" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Insights</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="exploration">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Interactive Journey Map</h3>
                        <div className="p-6 bg-gray-50 rounded-lg">
                          <p className="text-muted-foreground">Career journey visualization will be displayed here.</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Career Comparison Tool</h3>
                        <div className="p-6 bg-gray-50 rounded-lg">
                          <p className="text-muted-foreground">Career comparison interface will be displayed here.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market-intelligence">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
                        <h3 className="font-semibold text-lg mb-2">Technology</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Growth Rate:</span>
                            <span className="font-medium text-green-600">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Demand:</span>
                            <span className="font-medium text-green-600">High</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border">
                        <h3 className="font-semibold text-lg mb-2">Healthcare</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Growth Rate:</span>
                            <span className="font-medium text-green-600">8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Demand:</span>
                            <span className="font-medium text-green-600">High</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border">
                        <h3 className="font-semibold text-lg mb-2">Finance</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Growth Rate:</span>
                            <span className="font-medium text-blue-600">6%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Demand:</span>
                            <span className="font-medium text-yellow-600">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills-development">
              <Card>
                <CardContent className="p-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <p className="text-muted-foreground">Skills development tools and analysis will be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals-tracking">
              <Card>
                <CardContent className="p-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <p className="text-muted-foreground">Goal setting and tracking interface will be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personalized-insights">
              <Card>
                <CardContent className="p-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <p className="text-muted-foreground">AI-powered personalized insights will be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CareerPlanningHubPage;
