
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { YouthDashboard } from '@/components/youth-development/YouthDashboard';
import { ProgramCategories } from '@/components/youth-development/ProgramCategories';
import { EventsCalendar } from '@/components/youth-development/EventsCalendar';
import { MentorshipConnection } from '@/components/youth-development/MentorshipConnection';
import { SkillsTracker } from '@/components/youth-development/SkillsTracker';
import { ParentPortal } from '@/components/youth-development/ParentPortal';
import { ResourceLibrary } from '@/components/youth-development/ResourceLibrary';
import { ApplicationSystem } from '@/components/youth-development/ApplicationSystem';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, Award, BookOpen, Heart, Zap } from 'lucide-react';

const YouthDevelopmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal/5 to-ehrdc-light-teal/10">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Zap className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Youth Development Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Empowering Emirati Youth (13-21) through comprehensive development programs, mentorship, and innovative learning experiences
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-white/90 font-semibold">
                  Explore Programs
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  Find a Mentor
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Programs</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Mentors</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="parent" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Parents</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Apply</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <YouthDashboard />
            </TabsContent>
            
            <TabsContent value="programs">
              <ProgramCategories />
            </TabsContent>
            
            <TabsContent value="calendar">
              <EventsCalendar />
            </TabsContent>
            
            <TabsContent value="mentorship">
              <MentorshipConnection />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsTracker />
            </TabsContent>
            
            <TabsContent value="parent">
              <ParentPortal />
            </TabsContent>
            
            <TabsContent value="resources">
              <ResourceLibrary />
            </TabsContent>
            
            <TabsContent value="apply">
              <ApplicationSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default YouthDevelopmentPage;
