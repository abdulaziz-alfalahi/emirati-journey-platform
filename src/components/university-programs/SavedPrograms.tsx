
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookOpen } from 'lucide-react';
import ProgramCard from './ProgramCard';

interface SavedProgram {
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
  savedDate: string;
}

const SavedPrograms: React.FC = () => {
  // Mock data - in real app this would come from an API
  const [savedPrograms] = useState<SavedProgram[]>([
    {
      id: '1',
      university_name: 'Khalifa University',
      program_name: 'Master of Science in Artificial Intelligence',
      degree_level: 'Master',
      field_of_study: 'Artificial Intelligence',
      description: 'Advanced studies in machine learning, deep learning, and AI applications.',
      duration_years: 2,
      application_deadline: '2025-07-30',
      program_url: 'https://www.ku.ac.ae/ai-ms',
      is_active: true,
      created_at: '2024-01-01',
      savedDate: '2024-03-20'
    },
    {
      id: '2',
      university_name: 'University of Dubai',
      program_name: 'Master of Business Administration',
      degree_level: 'Master',
      field_of_study: 'Business Administration',
      description: 'A comprehensive MBA program designed for working professionals.',
      duration_years: 2,
      application_deadline: '2025-06-30',
      program_url: 'https://www.ud.ac.ae/mba',
      is_active: true,
      created_at: '2024-01-01',
      savedDate: '2024-03-18'
    }
  ]);

  const handleRemoveFromSaved = (programId: string) => {
    console.log('Remove from saved:', programId);
    // In real app, this would update the saved programs list
  };

  const handleApply = (programId: string) => {
    console.log('Apply to program:', programId);
  };

  if (savedPrograms.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Saved Programs</h3>
            <p className="text-muted-foreground mb-4">
              Save programs you're interested in to easily find them later.
            </p>
            <Button>
              Browse Programs
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {savedPrograms.length} saved program{savedPrograms.length !== 1 ? 's' : ''}
        </h3>
        <Button variant="outline" size="sm">
          Clear All
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {savedPrograms.map((program) => (
          <div key={program.id} className="relative">
            <ProgramCard 
              program={program}
              onApply={handleApply}
              onSave={handleRemoveFromSaved}
              isSaved={true}
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFromSaved(program.id)}
                className="text-yellow-600 hover:text-yellow-700"
              >
                <Bookmark className="h-4 w-4 fill-current" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPrograms;
