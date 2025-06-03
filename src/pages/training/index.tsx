
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TrainingOpportunities from '@/components/home/TrainingOpportunities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Briefcase, Award, Users, Calendar, Settings, PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const TrainingPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Training Opportunities</h1>
            <p className="text-xl opacity-90 mb-6">
              Discover personalized training programs to enhance your skills and advance your career through government-approved professional development opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">200+ Programs</h3>
                <p className="text-sm opacity-90">Across multiple disciplines</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Certified Training</h3>
                <p className="text-sm opacity-90">Government-approved courses</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Expert Instructors</h3>
                <p className="text-sm opacity-90">Learn from industry leaders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
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
                <Users className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Expert Instructors</h3>
                  <p className="text-sm text-muted-foreground">Industry professionals</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">Certified Training</h3>
                  <p className="text-sm text-muted-foreground">Government approved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Filter Training</h3>
              {/* TrainingFilter component would go here */}
              <div className="text-sm text-muted-foreground">
                Filter options coming soon
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="recommended">
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>Recommended</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="all">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>All Programs</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="enrolled">
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Enrolled</span>
                  </span>
                </TabsTrigger>
                {roles?.includes('training_center') && (
                  <TabsTrigger value="managed">
                    <span className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Managed</span>
                    </span>
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="recommended" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recommended Training Programs</h2>
                </div>
                <TrainingOpportunities limit={6} />
              </TabsContent>
              
              <TabsContent value="all" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">All Training Programs</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>All Training Programs</CardTitle>
                    <CardDescription>Browse all available training opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">All training programs will be listed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="enrolled" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Your Enrolled Programs</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Enrolled Programs</CardTitle>
                    <CardDescription>Training programs you are currently enrolled in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">You are not currently enrolled in any training programs.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {roles?.includes('training_center') && (
                <TabsContent value="managed" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Managed Training Programs</h2>
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                    >
                      <span className="flex items-center">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        <span>Create Program</span>
                      </span>
                    </Button>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Managed Training Programs</CardTitle>
                      <CardDescription>Training programs you manage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">You are not currently managing any training programs.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* Create Program Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-ehrdc-teal">
                Create New Training Program
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Training Program Creator</h3>
                  <p className="text-muted-foreground text-center">
                    Advanced training program creation tools will be available here.
                  </p>
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
