
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getUserCareerPaths, getUserCareerPathDetails, deleteUserCareerPath } from '@/services/careerPathService';
import { UserCareerPath, UserCareerPathWithDetails } from '@/types/careerPath';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, ChevronRight, Calendar, Trash2, Star, Clock, Award } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import CareerPathwayDetails from './CareerPathwayDetails';
import { Badge } from '@/components/ui/badge';

interface UserCareerPathsProps {
  onViewAll?: () => void;
  limit?: number;
  showViewAll?: boolean;
}

const UserCareerPaths: React.FC<UserCareerPathsProps> = ({ 
  onViewAll, 
  limit,
  showViewAll = false
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userPaths, setUserPaths] = useState<UserCareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<UserCareerPathWithDetails | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPaths = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const paths = await getUserCareerPaths(user.id);
        setUserPaths(limit ? paths.slice(0, limit) : paths);
      } catch (error) {
        console.error('Error fetching user career paths:', error);
        toast({
          title: "Error",
          description: "Failed to load your career paths",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserPaths();
  }, [user, toast, limit]);

  const handleViewDetails = async (userPath: UserCareerPath) => {
    if (!user) return;
    
    try {
      const pathDetails = await getUserCareerPathDetails(user.id, userPath.career_path_id);
      if (pathDetails) {
        setSelectedPath(pathDetails);
      }
    } catch (error) {
      console.error('Error fetching career path details:', error);
      toast({
        title: "Error",
        description: "Failed to load career path details",
        variant: "destructive"
      });
    }
  };

  const handleDeletePath = async (pathId: string) => {
    if (!user) return;
    
    setDeleting(pathId);
    try {
      const success = await deleteUserCareerPath(user.id, pathId);
      if (success) {
        setUserPaths(userPaths.filter(p => p.id !== pathId));
        toast({
          title: "Success",
          description: "Career path has been removed from your list",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to remove career path",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error removing career path:', error);
      toast({
        title: "Error",
        description: "Failed to remove career path",
        variant: "destructive"
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedPath) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="p-0 h-auto" 
            onClick={() => setSelectedPath(null)}
          >
            <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
            <span>Back</span>
          </Button>
        </div>
        
        <CareerPathwayDetails 
          careerPath={{
            ...selectedPath.career_path,
            stages: selectedPath.stages
          }}
          currentStageId={selectedPath.current_stage_id}
          onStageSelect={(stageId) => {
            // This will be implemented later
            console.log('Stage selected:', stageId);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {userPaths.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Career Paths Found</CardTitle>
            <CardDescription>
              You haven't enrolled in any career paths yet.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPaths.map((userPath) => {
              // Calculate progress based on current stage and total stages
              const currentStageIndex = userPath.current_stage 
                ? userPath.career_path?.stages?.findIndex(s => s.id === userPath.current_stage_id) || 0 
                : 0;
              const totalStages = userPath.career_path?.stages?.length || 4;
              const progressPercentage = Math.round((currentStageIndex / (totalStages - 1)) * 100) || 25;
              
              return (
                <Card key={userPath.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                      onClick={() => handleViewDetails(userPath)}
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
                            onClick={() => handleDeletePath(userPath.id)}
                          >
                            {deleting === userPath.id ? (
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
            })}
          </div>
          
          {showViewAll && userPaths.length > 0 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={onViewAll}>
                View All Career Paths
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserCareerPaths;
