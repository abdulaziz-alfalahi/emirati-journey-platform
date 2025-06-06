
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { SkillsAssessment } from '@/components/digital-skills/SkillsAssessment';
import { LearningPathways } from '@/components/digital-skills/LearningPathways';
import { CourseCatalog } from '@/components/digital-skills/CourseCatalog';
import { PracticeLab } from '@/components/digital-skills/PracticeLab';
import { IndustryProjects } from '@/components/digital-skills/IndustryProjects';
import { MentorMatching } from '@/components/digital-skills/MentorMatching';
import { ProgressDashboard } from '@/components/digital-skills/ProgressDashboard';
import { EmployerConnections } from '@/components/digital-skills/EmployerConnections';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, BookOpen, Users, TrendingUp, Zap, Target, Activity, Building } from 'lucide-react';

const DigitalSkillsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Standardized Hero Section */}
        <CareerEntryHeroSection
          title="Digital Skills Development"
          description="Build future-ready technology competencies through personalized learning paths and hands-on practice"
          icon={<Code className="h-12 w-12" />}
          primaryActionLabel="Take Skills Assessment"
          primaryActionIcon={<Target className="h-5 w-5" />}
          secondaryActionLabel="Explore Learning Paths"
          secondaryActionIcon={<TrendingUp className="h-5 w-5" />}
        />

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
