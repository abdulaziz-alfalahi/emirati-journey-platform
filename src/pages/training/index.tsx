
import React, { useState } from 'react';
import LifelongEngagementLayout from '@/components/layout/LifelongEngagementLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TrainingFilters } from '@/components/training/TrainingFilters';
import { TrainingProgramsList } from '@/components/training/TrainingProgramsList';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Building } from 'lucide-react';
import type { TrainingFilters as TrainingFiltersType } from '@/types/training';

const TrainingPage: React.FC = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<TrainingFiltersType>({});

  const handleFiltersChange = (newFilters: TrainingFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleApplyToProgram = (programId: string) => {
    toast({
      title: "Application Started",
      description: "Redirecting to application form...",
    });
    // TODO: Implement application flow
  };

  const handleViewDetails = (programId: string) => {
    toast({
      title: "Program Details",
      description: "Opening program details...",
    });
    // TODO: Implement program details view
  };

  return (
    <LifelongEngagementLayout
      heroTitle="Vocational Training Programs"
      heroDescription="Develop practical skills and advance your career with industry-specific training programs designed for the UAE's growing economy. From technical skills to entrepreneurship, find the right program to achieve your professional goals."
    >
      
      {/* Stats Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <BookOpen className="h-10 w-10 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">200+ Programs</h3>
                <p className="text-sm text-muted-foreground">Available training options</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex items-center">
              <Users className="h-10 w-10 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold">15,000+ Graduates</h3>
                <p className="text-sm text-muted-foreground">Successfully trained</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <TrendingUp className="h-10 w-10 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold">92% Job Placement</h3>
                <p className="text-sm text-muted-foreground">Employment success rate</p>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg flex items-center">
              <Building className="h-10 w-10 text-amber-600 mr-4" />
              <div>
                <h3 className="font-semibold">50+ Partners</h3>
                <p className="text-sm text-muted-foreground">Training providers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Programs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="enrollments">My Enrollments</TabsTrigger>
          <TabsTrigger value="providers">Training Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <TrainingFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            
            {/* Programs List */}
            <div className="lg:col-span-3">
              <TrainingProgramsList
                filters={filters}
                onApply={handleApplyToProgram}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">My Applications</h3>
              <p className="text-muted-foreground text-center">
                Track your training program applications and their status. 
                <br />
                Apply to programs to see them here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollments">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">My Enrollments</h3>
              <p className="text-muted-foreground text-center">
                View your current and completed training programs.
                <br />
                Track your progress and access certificates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Training Partners</h3>
              <p className="text-muted-foreground text-center">
                Explore our network of verified training providers and institutions.
                <br />
                Learn about their expertise and partnership levels.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LifelongEngagementLayout>
  );
};

export default TrainingPage;
