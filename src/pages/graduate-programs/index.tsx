
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Building, Calendar, Award, BookOpen, Search, Filter, FileText, Microscope } from 'lucide-react';
import GraduateProgramsFilter from '@/components/graduate-programs/GraduateProgramsFilter';
import GraduateProgramsList from '@/components/graduate-programs/GraduateProgramsList';
import ApplicationTracker from '@/components/graduate-programs/ApplicationTracker';
import ProgramExplorer from '@/components/graduate-programs/ProgramExplorer';
import AlumniInsights from '@/components/graduate-programs/AlumniInsights';
import ProgramCalendar from '@/components/graduate-programs/ProgramCalendar';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
  programFormat: string;
  fundingType: string;
}

const GraduateProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
    programFormat: '',
    fundingType: '',
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['graduate-programs-filter-options'],
    queryFn: async () => {
      const { data: programs, error } = await supabase
        .from('graduate_programs')
        .select('university_name, degree_level, field_of_study')
        .eq('is_active', true);
      
      if (error) throw error;

      const universities = [...new Set(programs.map(p => p.university_name))].sort();
      const degreeLevels = [...new Set(programs.map(p => p.degree_level))].sort();
      const fieldsOfStudy = [...new Set(programs.map(p => p.field_of_study))].sort();

      return { universities, degreeLevels, fieldsOfStudy };
    }
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['graduate-programs-stats'],
    queryFn: async () => {
      const { data: programs, error } = await supabase
        .from('graduate_programs')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;

      const totalPrograms = programs.length;
      const universities = new Set(programs.map(p => p.university_name)).size;
      const fields = new Set(programs.map(p => p.field_of_study)).size;
      const researchOpportunities = programs.filter(p => p.degree_level === 'PhD').length;

      return { totalPrograms, universities, fields, researchOpportunities };
    }
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Group 2 Hero Section - Blue to Indigo Gradient */}
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
                Graduate Programs
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Advance your expertise with world-class graduate education opportunities, cutting-edge research programs, and professional development for Emirati scholars
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Search className="h-5 w-5 mr-2" />
                  Explore Programs
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <FileText className="h-5 w-5 mr-2" />
                  Application Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg flex items-center border border-blue-100 shadow-sm">
              <GraduationCap className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.totalPrograms || 0} Programs</h3>
                <p className="text-sm text-muted-foreground">Available graduate programs</p>
              </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg flex items-center border border-indigo-100 shadow-sm">
              <Building className="h-10 w-10 text-indigo-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.universities || 0} Universities</h3>
                <p className="text-sm text-muted-foreground">Partner institutions</p>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg flex items-center border border-purple-100 shadow-sm">
              <Users className="h-10 w-10 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.fields || 0} Fields</h3>
                <p className="text-sm text-muted-foreground">Different fields of study</p>
              </div>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg flex items-center border border-amber-100 shadow-sm">
              <Microscope className="h-10 w-10 text-amber-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.researchOpportunities || 0} Research</h3>
                <p className="text-sm text-muted-foreground">PhD & research opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-6">
                <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Find Programs
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Track Applications
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Deadlines
                  </Button>
                </div>
              </div>

              {filterOptions && (
                <GraduateProgramsFilter
                  filters={filters}
                  onFilterChange={setFilters}
                  universities={filterOptions.universities}
                  degreeLevels={filterOptions.degreeLevels}
                  fieldsOfStudy={filterOptions.fieldsOfStudy}
                />
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 bg-white border">
                  <TabsTrigger value="programs" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    All Programs
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex items-center gap-2">
                    <Microscope className="h-4 w-4" />
                    Research
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="explorer" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Explorer
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Alumni
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="programs">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Graduate Programs</h2>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Advanced Filters
                        </Button>
                      </div>
                      <GraduateProgramsList filters={filters} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="research">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Research Opportunities</h2>
                        <Button variant="outline" size="sm">
                          <Microscope className="h-4 w-4 mr-2" />
                          Research Areas
                        </Button>
                      </div>
                      <GraduateProgramsList 
                        filters={{
                          ...filters,
                          degreeLevel: 'PhD'
                        }} 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applications">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Application Tracker</h2>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          New Application
                        </Button>
                      </div>
                      <ApplicationTracker />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="explorer">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Program Explorer</h2>
                        <Button variant="outline" size="sm">
                          <Search className="h-4 w-4 mr-2" />
                          Advanced Search
                        </Button>
                      </div>
                      <ProgramExplorer />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Alumni Insights</h2>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                      <AlumniInsights />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Academic Calendar</h2>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Export Calendar
                        </Button>
                      </div>
                      <ProgramCalendar />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GraduateProgramsPage;
