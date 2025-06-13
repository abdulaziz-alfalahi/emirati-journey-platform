
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, Building, Calendar, Globe, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import UniversityProgramsFilter from '@/components/university-programs/UniversityProgramsFilter';
import ProgramsList from '@/components/university-programs/ProgramsList';
import RecommendedPrograms from '@/components/university-programs/RecommendedPrograms';
import MyApplications from '@/components/university-programs/MyApplications';
import SavedPrograms from '@/components/university-programs/SavedPrograms';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
  location: string;
  language: string;
}

const UniversityProgramsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
    location: '',
    language: '',
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['university-programs-filter-options'],
    queryFn: async () => {
      const { data: programs, error } = await supabase
        .from('university_programs')
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
    queryKey: ['university-programs-stats'],
    queryFn: async () => {
      const { data: programs, error } = await supabase
        .from('university_programs')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;

      const totalPrograms = programs.length;
      const universities = new Set(programs.map(p => p.university_name)).size;
      const fields = new Set(programs.map(p => p.field_of_study)).size;
      const international = programs.filter(p => p.university_name.includes('Cambridge') || p.university_name.includes('MIT')).length;

      return { totalPrograms, universities, fields, international };
    }
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section - Group 2 Design Pattern */}
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
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Globe className="h-4 w-4" />
                  Global Partnerships
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <BookOpen className="h-4 w-4" />
                  Accredited Programs
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  Application Support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with Overlap */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 flex items-center">
                <GraduationCap className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{stats?.totalPrograms || 0} Programs</h3>
                  <p className="text-sm text-muted-foreground">Available university programs</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 flex items-center">
                <Building className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{stats?.universities || 0} Universities</h3>
                  <p className="text-sm text-muted-foreground">Partner institutions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6 flex items-center">
                <Globe className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{stats?.international || 0} International</h3>
                  <p className="text-sm text-muted-foreground">Global opportunities</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              {filterOptions && (
                <UniversityProgramsFilter
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
              <Tabs defaultValue="all-programs" className="w-full">
                <TabsList className="mb-6 w-full">
                  <TabsTrigger value="all-programs" className="flex items-center gap-2 flex-1">
                    <GraduationCap className="h-4 w-4" />
                    All Programs
                  </TabsTrigger>
                  <TabsTrigger value="recommended" className="flex items-center gap-2 flex-1">
                    <Users className="h-4 w-4" />
                    Recommended
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="flex items-center gap-2 flex-1">
                    <Calendar className="h-4 w-4" />
                    My Applications
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-2 flex-1">
                    <BookOpen className="h-4 w-4" />
                    Saved
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all-programs">
                  <ProgramsList filters={filters} />
                </TabsContent>

                <TabsContent value="recommended">
                  <RecommendedPrograms filters={filters} />
                </TabsContent>

                <TabsContent value="applications">
                  <MyApplications />
                </TabsContent>

                <TabsContent value="saved">
                  <SavedPrograms />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UniversityProgramsPage;
