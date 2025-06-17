
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProgramCard from './ProgramCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
  location: string;
  language: string;
}

interface RecommendedProgramsProps {
  filters: FilterState;
}

const RecommendedPrograms: React.FC<RecommendedProgramsProps> = ({ filters }) => {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['recommended-programs', filters],
    queryFn: async () => {
      // Get recommended programs based on user profile/interests
      let query = supabase
        .from('university_programs')
        .select('*')
        .eq('is_active', true)
        .limit(6); // Show top 6 recommendations

      // Apply filters if any
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

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="h-80">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Failed to load recommended programs. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!programs || programs.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
              <p className="text-muted-foreground">
                Complete your profile to get personalized program recommendations.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {programs.map((program) => (
                <ProgramCard 
                  key={program.id} 
                  program={program}
                  onApply={(id) => console.log('Apply to program:', id)}
                  onSave={(id) => console.log('Save program:', id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendedPrograms;
