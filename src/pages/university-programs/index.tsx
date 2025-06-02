
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { UniversityExplorer } from '@/components/university-programs/UniversityExplorer';
import { ProgramFinder } from '@/components/university-programs/ProgramFinder';
import { ApplicationTimeline } from '@/components/university-programs/ApplicationTimeline';
import { ScholarshipHub } from '@/components/university-programs/ScholarshipHub';
import { PreparationResources } from '@/components/university-programs/PreparationResources';
import { AlumniNetwork } from '@/components/university-programs/AlumniNetwork';
import { UniversityRepresentatives } from '@/components/university-programs/UniversityRepresentatives';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Search, Calendar, Award, BookOpen, Users, Video } from 'lucide-react';

const UniversityProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explorer');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <GraduationCap className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                University Programs
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Explore world-class higher education opportunities for Emirati students across local and international universities
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-semibold">
                  Explore Universities
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Find Scholarships
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              <TabsTrigger value="explorer" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Explorer</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Programs</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Scholarships</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="alumni" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Alumni</span>
              </TabsTrigger>
              <TabsTrigger value="representatives" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Meet Reps</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explorer">
              <UniversityExplorer />
            </TabsContent>
            
            <TabsContent value="programs">
              <ProgramFinder />
            </TabsContent>
            
            <TabsContent value="timeline">
              <ApplicationTimeline />
            </TabsContent>
            
            <TabsContent value="scholarships">
              <ScholarshipHub />
            </TabsContent>
            
            <TabsContent value="resources">
              <PreparationResources />
            </TabsContent>
            
            <TabsContent value="alumni">
              <AlumniNetwork />
            </TabsContent>
            
            <TabsContent value="representatives">
              <UniversityRepresentatives />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default UniversityProgramsPage;
