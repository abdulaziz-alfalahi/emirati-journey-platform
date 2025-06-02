
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ProgramExplorer } from '@/components/graduate-programs/ProgramExplorer';
import { ProgramComparison } from '@/components/graduate-programs/ProgramComparison';
import { ApplicationTracker } from '@/components/graduate-programs/ApplicationTracker';
import { ProgramCalendar } from '@/components/graduate-programs/ProgramCalendar';
import { AlumniInsights } from '@/components/graduate-programs/AlumniInsights';
import { EmployerProfiles } from '@/components/graduate-programs/EmployerProfiles';
import { PreparationResources } from '@/components/graduate-programs/PreparationResources';
import { UniversityPartnership } from '@/components/graduate-programs/UniversityPartnership';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, Search, BarChart3, Calendar, Users, Building, BookOpen, 
  School, TrendingUp, Award, Target, Sparkles, Rocket 
} from 'lucide-react';

const GraduateProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explorer');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-ehrdc-neutral-light">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal via-blue-600 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30L15 15v30l15-15zm15 0L30 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <GraduationCap className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
                Graduate Programs
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Launch your career with structured graduate programs designed for ambitious Emirati talent
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold">
                  <Search className="h-5 w-5 mr-2" />
                  Explore Programs
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ehrdc-teal">
                  <Calendar className="h-5 w-5 mr-2" />
                  View Calendar
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
                <div className="text-gray-600">Active Programs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">85%</div>
                <div className="text-gray-600">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">200+</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ehrdc-teal mb-2">AED 12K</div>
                <div className="text-gray-600">Average Starting Salary</div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspirational Quote */}
        <section className="py-12 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Rocket className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
              "Every graduate program is a launchpad to greatness - your journey to professional excellence starts here."
            </blockquote>
            <p className="mt-4 text-ehrdc-teal font-semibold">- UAE Graduate Excellence Initiative</p>
          </div>
        </section>

        {/* Main Content Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8 bg-white border">
              <TabsTrigger value="explorer" className="flex items-center gap-2 text-ehrdc-teal">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Explorer</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2 text-ehrdc-teal">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="tracker" className="flex items-center gap-2 text-ehrdc-teal">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Tracker</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2 text-ehrdc-teal">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="alumni" className="flex items-center gap-2 text-ehrdc-teal">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Alumni</span>
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex items-center gap-2 text-ehrdc-teal">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Employers</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2 text-ehrdc-teal">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="university" className="flex items-center gap-2 text-ehrdc-teal">
                <School className="h-4 w-4" />
                <span className="hidden sm:inline">University</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explorer">
              <ProgramExplorer />
            </TabsContent>
            
            <TabsContent value="comparison">
              <ProgramComparison />
            </TabsContent>
            
            <TabsContent value="tracker">
              <ApplicationTracker />
            </TabsContent>
            
            <TabsContent value="calendar">
              <ProgramCalendar />
            </TabsContent>
            
            <TabsContent value="alumni">
              <AlumniInsights />
            </TabsContent>
            
            <TabsContent value="employers">
              <EmployerProfiles />
            </TabsContent>
            
            <TabsContent value="resources">
              <PreparationResources />
            </TabsContent>
            
            <TabsContent value="university">
              <UniversityPartnership />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default GraduateProgramsPage;
