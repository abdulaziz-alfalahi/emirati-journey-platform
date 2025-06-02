
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { SkillsAssessment } from '@/components/digital-skills/SkillsAssessment';
import { LearningPathways } from '@/components/digital-skills/LearningPathways';
import { CourseCatalog } from '@/components/digital-skills/CourseCatalog';
import { PracticeLab } from '@/components/digital-skills/PracticeLab';
import { IndustryProjects } from '@/components/digital-skills/IndustryProjects';
import { MentorMatching } from '@/components/digital-skills/MentorMatching';
import { ProgressDashboard } from '@/components/digital-skills/ProgressDashboard';
import { EmployerConnections } from '@/components/digital-skills/EmployerConnections';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, BookOpen, Users, TrendingUp, Zap, Target, Activity, Building } from 'lucide-react';

const DigitalSkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Code className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Digital Skills Development
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Build future-ready technology competencies through personalized learning paths and hands-on practice
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                  Take Skills Assessment
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Explore Learning Paths
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">50+</div>
                <div className="text-slate-600">Digital Skills Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">200+</div>
                <div className="text-slate-600">Interactive Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">95%</div>
                <div className="text-slate-600">Job Market Relevance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">24/7</div>
                <div className="text-slate-600">Practice Lab Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="pathways" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Pathways</span>
              </TabsTrigger>
              <TabsTrigger value="catalog" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Catalog</span>
              </TabsTrigger>
              <TabsTrigger value="lab" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Lab</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="mentors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Mentors</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Employers</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assessment">
              <SkillsAssessment />
            </TabsContent>
            
            <TabsContent value="pathways">
              <LearningPathways />
            </TabsContent>
            
            <TabsContent value="catalog">
              <CourseCatalog />
            </TabsContent>
            
            <TabsContent value="lab">
              <PracticeLab />
            </TabsContent>
            
            <TabsContent value="projects">
              <IndustryProjects />
            </TabsContent>
            
            <TabsContent value="mentors">
              <MentorMatching />
            </TabsContent>
            
            <TabsContent value="progress">
              <ProgressDashboard />
            </TabsContent>
            
            <TabsContent value="employers">
              <EmployerConnections />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalSkillsPage;
