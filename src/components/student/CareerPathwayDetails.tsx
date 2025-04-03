
import React from 'react';
import { CareerPathWithStages } from '@/types/careerPath';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, BookOpen, Briefcase } from 'lucide-react';

interface CareerPathwayDetailsProps {
  careerPath: CareerPathWithStages;
  currentStageId?: string | null;
  onStageSelect?: (stageId: string) => void;
}

const CareerPathwayDetails: React.FC<CareerPathwayDetailsProps> = ({ 
  careerPath, 
  currentStageId,
  onStageSelect 
}) => {
  if (!careerPath || !careerPath.stages || careerPath.stages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Career Pathway Not Found</CardTitle>
          <CardDescription>
            The requested career pathway could not be found or has no stages defined.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{careerPath.title}</CardTitle>
        <CardDescription>{careerPath.description}</CardDescription>
        <Badge className="mt-2">{careerPath.industry}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {careerPath.stages.map((stage, index) => {
            const isCurrentStage = stage.id === currentStageId;
            const isPastStage = careerPath.stages.findIndex(s => s.id === currentStageId) > index;
            
            return (
              <div 
                key={stage.id} 
                className={`flex relative ${
                  index < careerPath.stages.length - 1 ? 'pb-8' : ''
                }`}
              >
                {/* Vertical timeline line */}
                {index < careerPath.stages.length - 1 && (
                  <div 
                    className={`absolute left-6 top-10 w-0.5 h-full ${
                      isPastStage ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
                
                {/* Stage icon */}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 mr-4 ${
                    isCurrentStage 
                      ? 'bg-primary text-primary-foreground' 
                      : isPastStage 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isPastStage ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : stage.stage_type === 'education' ? (
                    <BookOpen className="h-6 w-6" />
                  ) : (
                    <Briefcase className="h-6 w-6" />
                  )}
                </div>
                
                {/* Stage content */}
                <div className="flex-1">
                  <div 
                    className={`p-4 rounded-lg border ${
                      isCurrentStage ? 'border-primary bg-primary/5' : 'border-gray-200'
                    } ${onStageSelect ? 'cursor-pointer hover:border-gray-300' : ''}`}
                    onClick={() => onStageSelect && onStageSelect(stage.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{stage.title}</h3>
                      <Badge variant={stage.stage_type === 'education' ? 'outline' : 'secondary'}>
                        {stage.stage_type === 'education' ? 'Education' : 'Career'}
                      </Badge>
                    </div>
                    
                    {stage.description && (
                      <p className="text-sm text-muted-foreground mt-2">{stage.description}</p>
                    )}
                    
                    {stage.duration && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Duration: {stage.duration}
                      </div>
                    )}
                    
                    {stage.skills && stage.skills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground">Skills:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {stage.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {stage.requirements && stage.requirements.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground">Requirements:</p>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {stage.requirements.map((req) => (
                            <li key={req}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {isCurrentStage && (
                      <div className="mt-3 text-sm font-medium text-primary">
                        Current Stage
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPathwayDetails;
