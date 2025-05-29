
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface CareerStage {
  id: string;
  title: string;
  description: string;
  category: 'education' | 'career' | 'personal' | 'retirement';
  ageRange: string;
  completed: boolean;
  current: boolean;
  recommended: boolean;
  icon: React.ComponentType<any>;
  requirements?: string[];
  benefits?: string[];
  duration?: string;
}

interface CareerStageCardProps {
  stage: CareerStage;
  isLast: boolean;
}

const CareerStageCard: React.FC<CareerStageCardProps> = ({ stage, isLast }) => {
  const getStageIcon = (stage: CareerStage) => {
    const IconComponent = stage.icon;
    let colorClass = 'text-gray-400';
    
    if (stage.completed) colorClass = 'text-green-600';
    else if (stage.current) colorClass = 'text-blue-600';
    else if (stage.recommended) colorClass = 'text-orange-600';
    
    return <IconComponent className={`h-6 w-6 ${colorClass}`} />;
  };

  const getStageStatus = (stage: CareerStage) => {
    if (stage.completed) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (stage.current) return <Circle className="h-4 w-4 text-blue-600 fill-current" />;
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-green-100 text-green-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'retirement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-6 top-12 h-16 w-0.5 bg-gray-200" />
      )}
      
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
            {getStageIcon(stage)}
          </div>
          {getStageStatus(stage)}
        </div>
        
        <div className="flex-1 pb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{stage.title}</h3>
                <Badge variant="secondary" className={getCategoryColor(stage.category)}>
                  {stage.category}
                </Badge>
                {stage.current && (
                  <Badge variant="default">Current</Badge>
                )}
                {stage.recommended && (
                  <Badge variant="outline" className="border-orange-500 text-orange-600">
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-2">{stage.description}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Age: {stage.ageRange}</span>
                {stage.duration && <span>Duration: {stage.duration}</span>}
              </div>
            </div>
          </div>
          
          {(stage.requirements || stage.benefits) && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage.requirements && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {stage.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-gray-400 rounded-full" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {stage.benefits && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {stage.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-green-500 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {stage.recommended && (
            <div className="mt-4">
              <Button size="sm" className="flex items-center gap-2">
                Start Planning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerStageCard;
