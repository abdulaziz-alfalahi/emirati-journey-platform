import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GraduationCap, Users, Building, Calendar, Globe, BookOpen, University, Trophy, Target, TrendingUp } from 'lucide-react';
import UniversityProgramsFilter from '@/components/university-programs/UniversityProgramsFilter';
import ProgramsList from '@/components/university-programs/ProgramsList';
import RecommendedPrograms from '@/components/university-programs/RecommendedPrograms';
import MyApplications from '@/components/university-programs/MyApplications';
import SavedPrograms from '@/components/university-programs/SavedPrograms';
import type { StatItem, TabItem } from '@/components/layouts/EducationPathwayLayout';

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

  // Education stats for the layout
  const educationStats: StatItem[] = [
    {
      value: `${stats?.totalPrograms || 0}+`,
      label: "University Programs",
      icon: University
    },
    {
      value: `${stats?.universities || 0}+`,
      label: "Partner Universities",
      icon: Building
    },
    {
      value: `${stats?.fields || 0}+`,
      label: "Fields of Study",
      icon: BookOpen
    },
    {
      value: `${stats?.international || 0}+`,
      label: "International Programs",
      icon: Globe
    }
  ];

  // Education tabs with university program content
  const educationTabs: TabItem[] = [
    {
      id: "all-programs",
      label: "Program Catalog",
      icon: <University className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
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
          <div className="lg:col-span-3">
            <ProgramsList filters={filters} />
          </div>
        </div>
      )
    },
    {
      id: "recommended",
      label: "Recommended",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
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
          <div className="lg:col-span-3">
            <RecommendedPrograms filters={filters} />
          </div>
        </div>
      )
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <Calendar className="h-4 w-4" />,
      content: <MyApplications />
    },
    {
      id: "saved",
      label: "Saved Programs",
      icon: <BookOpen className="h-4 w-4" />,
      content: <SavedPrograms />
    }
  ];

  return (
    <EducationPathwayLayout
      title="University Programs"
      description="Explore world-class higher education opportunities and institutional partnerships across local and international universities"
      icon={<University className="h-12 w-12 text-blue-600" />}
      stats={educationStats}
      tabs={educationTabs}
      defaultTab="all-programs"
      actionButtonText="Explore Programs"
      actionButtonHref="#all-programs"
      academicYear="2024-2025"
    />
  );
};

export default UniversityProgramsPage;
