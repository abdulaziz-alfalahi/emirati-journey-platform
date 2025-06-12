
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProgramCard from './ProgramCard';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface UniversityProgram {
  id: string;
  university_name: string;
  program_name: string;
  degree_level: string;
  field_of_study: string;
  description: string | null;
  duration_years: number | null;
  application_deadline: string | null;
  program_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
}

interface ProgramsListProps {
  filters: FilterState;
}

const ProgramsList: React.FC<ProgramsListProps> = React.memo(({ filters }) => {
  const queryKey = useMemo(() => ['university-programs', filters], [filters]);

  const { data: programs, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase
        .from('university_programs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`program_name.ilike.%${filters.search}%,university_name.ilike.%${filters.search}%`);
      }
      
      if (filters.university) {
        query = query.eq('university_name', filters.university);
      }
      
      if (filters.degreeLevel) {
        query = query.eq('degree_level', filters.degreeLevel);
      }
      
      if (filters.fieldOfStudy) {
        query = query.eq('field_of_study', filters.fieldOfStudy);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as UniversityProgram[];
    }
  });

  const hasActiveFilters = useMemo(() => 
    Object.values(filters).some(filter => filter),
    [filters]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!programs || programs.length === 0) {
    return <EmptyState hasActiveFilters={hasActiveFilters} />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
});

ProgramsList.displayName = 'ProgramsList';

const LoadingState: React.FC = React.memo(() => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
));

LoadingState.displayName = 'LoadingState';

const ErrorState: React.FC = React.memo(() => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-center text-muted-foreground">
        Failed to load programs. Please try again later.
      </p>
    </CardContent>
  </Card>
));

ErrorState.displayName = 'ErrorState';

interface EmptyStateProps {
  hasActiveFilters: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = React.memo(({ hasActiveFilters }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-center">
        <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Programs Found</h3>
        <p className="text-muted-foreground">
          {hasActiveFilters
            ? "No programs match your current filters. Try adjusting your search criteria."
            : "No university programs are currently available."
          }
        </p>
      </div>
    </CardContent>
  </Card>
));

EmptyState.displayName = 'EmptyState';

export default ProgramsList;
