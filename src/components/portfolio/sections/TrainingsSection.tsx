
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { Training } from "@/types/portfolio";
import { formatDate } from "@/components/resume/utils/dateUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrainingsSectionProps {
  trainings: Training[] | undefined;
  isEditable?: boolean;
  onAddTraining?: () => void;
  onEditTraining?: (training: Training) => void;
}

const TrainingsSection: React.FC<TrainingsSectionProps> = ({
  trainings,
  isEditable = false,
  onAddTraining,
  onEditTraining
}) => {
  if (!trainings || trainings.length === 0) {
    return (
      <Card className="bg-muted/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Training & Courses
            </CardTitle>
            <CardDescription>No training data available</CardDescription>
          </div>
          
          {isEditable && onAddTraining && (
            <Button variant="outline" size="sm" onClick={onAddTraining}>
              Add Training
            </Button>
          )}
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            Training & Courses
          </CardTitle>
          <CardDescription>{trainings.length} training records</CardDescription>
        </div>
        
        {isEditable && onAddTraining && (
          <Button variant="outline" size="sm" onClick={onAddTraining}>
            Add Training
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainings.map((training) => (
            <div 
              key={training.id} 
              className="border rounded-lg p-4 hover:border-primary/50 transition-colors relative"
              onClick={() => isEditable && onEditTraining && onEditTraining(training)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{training.title}</h3>
                  <p className="text-sm">{training.provider}</p>
                </div>
                
                <Badge variant={training.is_completed ? "success" : "outline"}>
                  {training.is_completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(new Date(training.start_date))} - 
                {training.end_date ? formatDate(new Date(training.end_date)) : "Present"}
              </div>
              
              {training.description && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {training.description}
                </p>
              )}
              
              {training.skills_gained.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs font-medium mb-1">Skills Gained</h4>
                  <div className="flex flex-wrap gap-1">
                    {training.skills_gained.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    
                    {training.skills_gained.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{training.skills_gained.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {isEditable && (
                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  Click to edit
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingsSection;
