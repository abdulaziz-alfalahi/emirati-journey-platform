
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Award, Briefcase, DollarSign } from 'lucide-react';
import type { TrainingProgram } from '@/types/training';

interface TrainingProgramCardProps {
  program: TrainingProgram;
  onApply: (programId: string) => void;
  onViewDetails: (programId: string) => void;
  showApplyButton?: boolean;
}

export const TrainingProgramCard: React.FC<TrainingProgramCardProps> = ({
  program,
  onApply,
  onViewDetails,
  showApplyButton = true
}) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'technical_skills': return 'Technical Skills';
      case 'trade_skills': return 'Trade Skills';
      case 'service_skills': return 'Service Skills';
      case 'entrepreneurship_business': return 'Business & Entrepreneurship';
      default: return category;
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'in_person': return 'In-Person';
      case 'online': return 'Online';
      case 'hybrid': return 'Hybrid';
      default: return mode;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'in_person': return 'bg-blue-100 text-blue-800';
      case 'online': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      {program.image_url && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={program.image_url}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{getCategoryLabel(program.category)}</Badge>
          {program.featured && (
            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{program.title}</CardTitle>
        {program.provider && (
          <p className="text-sm text-muted-foreground">{program.provider.name}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{program.description}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {program.duration_weeks && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {program.duration_weeks} weeks
            </div>
          )}
          
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {program.current_participants}/{program.max_participants || '∞'}
          </div>

          {program.location && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{program.location}</span>
            </div>
          )}

          {program.start_date && (
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(program.start_date).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className={getModeColor(program.training_mode)}>
            {getModeLabel(program.training_mode)}
          </Badge>
          
          {program.certification_offered && (
            <Badge variant="outline" className="text-green-700">
              <Award className="h-3 w-3 mr-1" />
              Certificate
            </Badge>
          )}
          
          {program.job_placement_assistance && (
            <Badge variant="outline" className="text-blue-700">
              <Briefcase className="h-3 w-3 mr-1" />
              Job Placement
            </Badge>
          )}
        </div>

        {program.price_amount && program.price_amount > 0 && (
          <div className="flex items-center text-lg font-semibold text-ehrdc-teal">
            <DollarSign className="h-5 w-5 mr-1" />
            {program.price_amount.toLocaleString()} {program.price_currency}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={() => onViewDetails(program.id)} className="flex-1">
            View Details
          </Button>
          {showApplyButton && (
            <Button onClick={() => onApply(program.id)} className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-teal/90">
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
