
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, Building, Calendar, Award, BookOpen } from 'lucide-react';
import GraduateProgramsFilter from '@/components/graduate-programs/GraduateProgramsFilter';
import GraduateProgramsList from '@/components/graduate-programs/GraduateProgramsList';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
}

const GraduateProgramsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
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
                Graduate Programs
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Advance Your Expertise with world-class graduate education opportunities for Emirati students
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg flex items-center">
              <GraduationCap className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.totalPrograms || 0} Programs</h3>
                <p className="text-sm text-muted-foreground">Available graduate programs</p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg flex items-center">
              <Building className="h-10 w-10 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.universities || 0} Universities</h3>
                <p className="text-sm text-muted-foreground">Partner institutions</p>
              </div>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg flex items-center">
              <Users className="h-10 w-10 text-amber-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.fields || 0} Fields</h3>
                <p className="text-sm text-muted-foreground">Different fields of study</p>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg flex items-center">
              <Award className="h-10 w-10 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold text-lg">{stats?.researchOpportunities || 0} PhD Programs</h3>
                <p className="text-sm text-muted-foreground">Research opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
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
              <Tabs defaultValue="all-programs" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all-programs" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    All Programs
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Research Opportunities
                  </TabsTrigger>
                  <TabsTrigger value="deadlines" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Application Deadlines
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all-programs">
                  <GraduateProgramsList filters={filters} />
                </TabsContent>

                <TabsContent value="research">
                  <GraduateProgramsList 
                    filters={{
                      ...filters,
                      degreeLevel: 'PhD'
                    }} 
                  />
                </TabsContent>

                <TabsContent value="deadlines">
                  <GraduateProgramsList filters={filters} />
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
