
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ExternalLink, GraduationCap, MapPin } from 'lucide-react';

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

interface ProgramCardProps {
  program: UniversityProgram;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    return new Date(deadline).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isDeadlineApproaching = (deadline: string | null) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{program.program_name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {program.university_name}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {program.degree_level}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="flex items-center">
            <GraduationCap className="h-3 w-3 mr-1" />
            {program.field_of_study}
          </Badge>
          {program.duration_years && (
            <Badge variant="outline" className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {program.duration_years} year{program.duration_years > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {program.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {program.description}
          </p>
        )}
        
        {program.application_deadline && (
          <div className="flex items-center text-sm mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-muted-foreground">Application Deadline: </span>
            <span 
              className={`ml-1 font-medium ${
                isDeadlineApproaching(program.application_deadline) 
                  ? 'text-orange-600' 
                  : 'text-foreground'
              }`}
            >
              {formatDeadline(program.application_deadline)}
            </span>
            {isDeadlineApproaching(program.application_deadline) && (
              <Badge variant="outline" className="ml-2 text-orange-600 border-orange-200">
                Deadline Soon
              </Badge>
            )}
          </div>
        )}
        
        {program.program_url && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={program.program_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Program Details
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
