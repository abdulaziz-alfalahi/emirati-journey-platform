
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrainingProgramsList } from '@/components/training/TrainingProgramsList';
import { TrainingFilters } from '@/components/training/TrainingFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Briefcase, Award, Users, Calendar, Settings, PlusCircle, TrendingUp, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { trainingService } from '@/services/trainingService';
import type { TrainingFilters as TrainingFiltersType } from '@/types/training';

const TrainingPage: React.FC = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [filters, setFilters] = useState<TrainingFiltersType>({});
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  // Check if user is a training center
  const isTrainingCenter = roles?.some(role => 
    ['training_center', 'administrator'].includes(role)
  );

  const handleApply = async (programId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for training programs",
        variant: "destructive"
      });
      return;
    }

    setSelectedProgramId(programId);
    setIsApplicationDialogOpen(true);
  };

  const handleViewDetails = (programId: string) => {
    // Navigate to program details page
    window.location.href = `/training/programs/${programId}`;
  };

  const handleSubmitApplication = async (applicationData: Record<string, any>) => {
    if (!selectedProgramId) return;

    try {
      await trainingService.applyForProgram(selectedProgramId, applicationData);
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!"
      });
      setIsApplicationDialogOpen(false);
      setSelectedProgramId(null);
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section - Group 1 Design Pattern */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Vocational Training Programs</h1>
            <p className="text-xl opacity-90 mb-6">
              Advance your career with practical skills training and industry-specific programs designed for the UAE's growing economy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Technical Skills</h3>
                <p className="text-sm opacity-90">IT, Engineering, Healthcare</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Trade Skills</h3>
                <p className="text-sm opacity-90">Construction, Manufacturing</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Service Skills</h3>
                <p className="text-sm opacity-90">Hospitality, Customer Service</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Briefcase className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Business Skills</h3>
                <p className="text-sm opacity-90">Entrepreneurship, Management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card - Group 1 Design Pattern */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <GraduationCap className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">200+ Programs</h3>
                  <p className="text-sm text-muted-foreground">Across multiple disciplines</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Calendar className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Flexible Schedules</h3>
                  <p className="text-sm text-muted-foreground">Online and in-person</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <TrendingUp className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">85% Job Placement</h3>
                  <p className="text-sm text-muted-foreground">Career advancement rate</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Certified Training</h3>
                  <p className="text-sm text-muted-foreground">Industry-recognized certificates</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white border min-w-max">
              <TabsTrigger value="browse" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Browse Programs</span>
              </TabsTrigger>
              
              {user && (
                <TabsTrigger value="my-applications" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">My Applications</span>
                </TabsTrigger>
              )}
              
              {user && (
                <TabsTrigger value="my-training" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">My Training</span>
                </TabsTrigger>
              )}
              
              {isTrainingCenter && (
                <TabsTrigger value="manage" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Manage Programs</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="browse">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Filter Sidebar */}
              <div className="md:col-span-1">
                <TrainingFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>
              
              {/* Programs List */}
              <div className="md:col-span-3">
                <TrainingProgramsList
                  filters={filters}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                />
              </div>
            </div>
          </Tab

          {user && (
            <TabsContent value="my-applications">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
                      <p className="text-muted-foreground mb-6">
                        Track your training program applications and their status
                      </p>
                    </div>
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
                      <p className="text-muted-foreground">
                        Browse training programs to start your application process
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user && (
            <TabsContent value="my-training">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">My Training Programs</h2>
                      <p className="text-muted-foreground mb-6">
                        Track your progress in enrolled training programs
                      </p>
                    </div>
                    <div className="text-center py-12">
                      <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No active training</h3>
                      <p className="text-muted-foreground">
                        Apply for training programs to start your learning journey
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isTrainingCenter && (
            <TabsContent value="manage">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Manage Training Programs</h2>
                        <p className="text-muted-foreground mb-6">
                          Create and manage your training programs
                        </p>
                      </div>
                      <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Program
                      </Button>
                    </div>
                    <div className="text-center py-12">
                      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Training Program Management</h3>
                      <p className="text-muted-foreground">
                        Advanced program management tools coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Application Dialog */}
        <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-ehrdc-teal">
                Apply for Training Program
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Application Form</h3>
                  <p className="text-muted-foreground text-center">
                    Detailed application form will be available here to collect necessary information.
                  </p>
                  <Button 
                    className="mt-4 bg-ehrdc-teal hover:bg-ehrdc-teal/90"
                    onClick={() => handleSubmitApplication({})}
                  >
                    Submit Application
                  </Button>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TrainingPage;
