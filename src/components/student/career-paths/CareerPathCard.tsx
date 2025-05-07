
import React, { useState } from 'react';
import { UserCareerPath } from '@/types/careerPath';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Trash2, Star, Clock, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

interface CareerPathCardProps {
  userPath: UserCareerPath;
  onViewDetails: (userPath: UserCareerPath) => void;
  onDelete: (pathId: string) => void;
  isDeleting: boolean;
}

const CareerPathCard: React.FC<CareerPathCardProps> = ({
  userPath,
  onViewDetails,
  onDelete,
  isDeleting
}) => {
  // Calculate progress based on current stage and total stages
  const currentStageIndex = userPath.current_stage 
    ? userPath.career_path?.stages?.findIndex(s => s.id === userPath.current_stage_id) || 0 
    : 0;
  const totalStages = userPath.career_path?.stages?.length || 4;
  const progressPercentage = Math.round((currentStageIndex / (totalStages - 1)) * 100) || 25;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              {userPath.career_path?.title || 'Career Path'}
            </CardTitle>
            <Badge className="mt-1">{userPath.career_path?.industry || 'Unknown Industry'}</Badge>
          </div>
          <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-bold">
            {progressPercentage}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" /> 
            {new Date(userPath.started_at).toLocaleDateString()}
          </span>
          {userPath.current_stage && (
            <span className="flex items-center">
              <Award className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-amber-600">Stage {currentStageIndex + 1}/{totalStages}</span>
            </span>
          )}
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        {userPath.current_stage && (
          <div className="bg-muted/50 p-2 rounded-md">
            <div className="text-sm font-medium flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 text-primary" />
              Current: {userPath.current_stage.title}
            </div>
            
            {userPath.current_stage.duration && (
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {userPath.current_stage.duration}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/20 pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 mr-2"
          onClick={() => onViewDetails(userPath)}
        >
          View Details
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Career Path</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this career path from your list? 
                Your progress will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-destructive hover:bg-destructive/90"
                onClick={() => onDelete(userPath.id)}
              >
                {isDeleting && isDeleting === userPath.id ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removing...</>
                ) : (
                  "Yes, remove it"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CareerPathCard;
