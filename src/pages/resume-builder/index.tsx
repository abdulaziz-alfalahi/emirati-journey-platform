
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ResumeProvider } from '@/context/ResumeContext';
import ResumeTemplateSelector from '@/components/resume/ResumeTemplateSelector';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ATSOptimizer from '@/components/resume/ATSOptimizer';
import SmartSuggestions from '@/components/resume/SmartSuggestions';
import ExportCenter from '@/components/resume/ExportCenter';
import ResumeAnalytics from '@/components/resume/ResumeAnalytics';
import { 
  FileText, 
  Sparkles, 
  Target, 
  Download, 
  BarChart3,
  Users,
  Award,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const ResumeBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <ResumeProvider>
      <Layout>
        {/* Hero Section - Group 1 Design Pattern */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal to-ehrdc-light-teal text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <FileText className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Resume Builder
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Create professional resumes tailored for the UAE job market with AI-powered optimization and industry-specific templates
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold"
                  onClick={() => setActiveTab('builder')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Start Building
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-ehrdc-teal"
                  onClick={() => setActiveTab('templates')}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Browse Templates
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-ehrdc-teal-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-ehrdc-teal" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Professional Templates</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600">ATS Compatibility</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">AI-Powered</div>
                <div className="text-gray-600">Smart Optimization</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">UAE-Focused</div>
                <div className="text-gray-600">Market Optimized</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need for the Perfect Resume
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional templates, AI-powered suggestions, and ATS optimization designed specifically for the UAE job market
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-t-ehrdc-teal">
                <CardContent className="p-6">
                  <div className="bg-ehrdc-teal-light rounded-lg p-3 w-fit mb-4">
                    <Sparkles className="h-6 w-6 text-ehrdc-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Smart AI Assistant</h3>
                  <p className="text-gray-600 mb-4">
                    Get intelligent suggestions for skills, achievements, and content based on your industry and role.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Auto-completion</Badge>
                    <Badge variant="secondary">Industry insights</Badge>
                    <Badge variant="secondary">Content optimization</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-blue-500">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">ATS Optimization</h3>
                  <p className="text-gray-600 mb-4">
                    Ensure your resume passes Applicant Tracking Systems used by UAE employers.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Keyword analysis</Badge>
                    <Badge variant="secondary">Format checking</Badge>
                    <Badge variant="secondary">Score optimization</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-500">
                <CardContent className="p-6">
                  <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Market Intelligence</h3>
                  <p className="text-gray-600 mb-4">
                    Leverage UAE job market data to optimize your resume for better results.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Salary insights</Badge>
                    <Badge variant="secondary">Skill trends</Badge>
                    <Badge variant="secondary">Industry analysis</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Application */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="templates" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="builder" className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="optimizer" className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  ATS Optimizer
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  AI Suggestions
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-6">
                <ResumeTemplateSelector 
                  onSelectTemplate={setSelectedTemplate}
                  onStartBuilding={() => setActiveTab('builder')}
                />
              </TabsContent>

              <TabsContent value="builder" className="space-y-6">
                <ResumeBuilder selectedTemplate={selectedTemplate} />
              </TabsContent>

              <TabsContent value="optimizer" className="space-y-6">
                <ATSOptimizer />
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-6">
                <SmartSuggestions />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <ResumeAnalytics />
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <ExportCenter />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Success Stories from UAE Professionals
              </h2>
              <p className="text-xl text-gray-600">
                See how our resume builder has helped professionals land their dream jobs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Al-Mahmoud",
                  role: "Senior Software Engineer",
                  company: "Dubai Tech Hub",
                  improvement: "300% more interview calls",
                  avatar: "👩‍💻"
                },
                {
                  name: "Ahmed Hassan",
                  role: "Marketing Director",
                  company: "Abu Dhabi Financial Center",
                  improvement: "Landed dream job in 2 weeks",
                  avatar: "👨‍💼"
                },
                {
                  name: "Fatima Al-Zahra",
                  role: "Research Scientist",
                  company: "ADNOC Research Center",
                  improvement: "95% ATS compatibility score",
                  avatar: "👩‍🔬"
                }
              ].map((story, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{story.avatar}</div>
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <p className="text-gray-600">{story.role}</p>
                      <p className="text-sm text-gray-500">{story.company}</p>
                    </div>
                    <div className="bg-ehrdc-teal-light rounded-lg p-3 text-center">
                      <CheckCircle className="h-5 w-5 text-ehrdc-teal mx-auto mb-1" />
                      <p className="text-sm font-medium text-ehrdc-teal">
                        {story.improvement}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </ResumeProvider>
  );
};

export default ResumeBuilderPage;
