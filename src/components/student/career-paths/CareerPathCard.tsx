
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

interface CareerPathStep {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  steps: CareerPathStep[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionPercentage: number;
  isEnrolled?: boolean;
}

interface CareerPathCardProps {
  path: CareerPath;
  onViewDetails: (path: CareerPath) => void;
}

const CareerPathCard: React.FC<CareerPathCardProps> = ({ path, onViewDetails }) => {
  // Function to get badge color based on difficulty
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get the number of steps in the path
  const stepsCount = path.steps?.length || 0;

  return (
    <div className="border rounded-lg p-5 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="mb-4 flex justify-between">
          <Badge className={getDifficultyColor(path.difficulty)}>
            {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
          </Badge>
          {path.isEnrolled && (
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
              Enrolled
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">{path.title}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
          {path.description}
        </p>

        <div className="space-y-4 mt-auto">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{path.completionPercentage}%</span>
            </div>
            <Progress 
              value={path.completionPercentage} 
              className="h-2" 
            />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{stepsCount} {stepsCount === 1 ? 'Step' : 'Steps'}</span>
            <span>{path.duration}</span>
          </div>

          <Button 
            className="w-full mt-2" 
            onClick={() => onViewDetails(path)}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerPathCard;
