
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, PlusCircle, Certificate, Users, Video, BarChart } from 'lucide-react';
import { CoursesList } from '@/components/lms/CoursesList';
import { CourseCreator } from '@/components/lms/CourseCreator';
import { LMSStatsOverview } from '@/components/lms/LMSStatsOverview';
import type { CourseEnrollment } from '@/types/lms';

const LMSPage: React.FC = () => {
  console.log('LMSPage: Component rendering');
  
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('my-courses');
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  console.log('LMSPage: User exists:', !!user);
  console.log('LMSPage: Roles:', roles);

  const canCreateCourses = roles?.includes('training_center') || roles?.includes('educational_institution') || false;

  useEffect(() => {
    console.log('LMSPage: useEffect triggered');
    if (user) {
      loadEnrollments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadEnrollments = async () => {
    console.log('LMSPage: Loading enrollments');
    try {
      const data = await lmsService.getUserEnrollments();
      console.log('LMSPage: Enrollments loaded:', data?.length || 0);
      setEnrollments(data || []);
    } catch (error) {
      console.error('LMSPage: Error loading enrollments:', error);
      toast({
        title: "Error",
        description: "Failed to load enrollments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  console.log('LMSPage: Rendering with loading:', loading);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Learning Management System</h1>
            <p className="text-xl opacity-90 mb-6">
              Access a comprehensive library of courses, track your learning progress, and earn certifications to advance your career development journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="h-8 w-8 mb-2">
                  <BookOpen className="h-full w-full" />
                </div>
                <h3 className="font-semibold mb-1">500+ Courses</h3>
                <p className="text-sm opacity-90">Across multiple disciplines</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="h-8 w-8 mb-2">
                  <Certificate className="h-full w-full" />
                </div>
                <h3 className="font-semibold mb-1">Recognized Certifications</h3>
                <p className="text-sm opacity-90">Industry-approved credentials</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="h-8 w-8 mb-2">
                  <Users className="h-full w-full" />
                </div>
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
                <div className="h-10 w-10 text-blue-600 mr-4">
                  <BookOpen className="h-full w-full" />
                </div>
                <div>
                  <h3 className="font-semibold">Self-Paced Learning</h3>
                  <p className="text-sm text-muted-foreground">Learn at your own pace</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <div className="h-10 w-10 text-green-600 mr-4">
                  <Video className="h-full w-full" />
                </div>
                <div>
                  <h3 className="font-semibold">Interactive Content</h3>
                  <p className="text-sm text-muted-foreground">Engaging multimedia lessons</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <div className="h-10 w-10 text-purple-600 mr-4">
                  <BarChart className="h-full w-full" />
                </div>
                <div>
                  <h3 className="font-semibold">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">Monitor your development</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <div className="h-10 w-10 text-amber-600 mr-4">
                  <Certificate className="h-full w-full" />
                </div>
                <div>
                  <h3 className="font-semibold">Certifications</h3>
                  <p className="text-sm text-muted-foreground">Earn recognized credentials</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Stats Overview - Only show if user is logged in */}
        {user && !loading && (
          <LMSStatsOverview enrollments={enrollments} loading={loading} />
        )}

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
              <h3 className="font-medium text-lg mb-4">Filter Courses</h3>
              {/* CoursesFilter component would go here */}
              <div className="text-sm text-muted-foreground">
                Filter options coming soon
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="my-courses">
                  <span>My Courses</span>
                </TabsTrigger>
                <TabsTrigger value="catalog">
                  <span>Course Catalog</span>
                </TabsTrigger>
                <TabsTrigger value="certificates">
                  <span>My Certificates</span>
                </TabsTrigger>
                {canCreateCourses && (
                  <TabsTrigger value="manage">
                    <span>Manage Courses</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="my-courses" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">My Enrolled Courses</h2>
                  <Button 
                    onClick={() => setActiveTab('catalog')}
                    className="ehrdc-button-primary"
                  >
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Browse Courses</span>
                    </span>
                  </Button>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="h-64">
                        <CardContent className="p-6">
                          <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : enrollments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Start your learning journey by enrolling in courses
                      </p>
                      <Button onClick={() => setActiveTab('catalog')}>
                        Browse Courses
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrollments.map(enrollment => (
                      <Card key={enrollment.id}>
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-2">
                            {(enrollment as any).courses?.title || 'Course Title'}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Progress: {enrollment.progress_percentage || 0}%
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${enrollment.progress_percentage || 0}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="catalog" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Course Catalog</h2>
                <CoursesList 
                  showEnrollButton={!!user}
                  userEnrollments={enrollments.map(e => e.course_id)}
                />
              </TabsContent>

              <TabsContent value="certificates" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Certificate className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Certificates</h3>
                    <p className="text-muted-foreground">
                      Certificate management coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {canCreateCourses && (
                <TabsContent value="manage" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Manage Courses</h2>
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="ehrdc-button-primary"
                    >
                      <span className="flex items-center">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        <span>Create Course</span>
                      </span>
                    </Button>
                  </div>
                  <CourseCreator />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* Create Course Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-ehrdc-teal">
                Create New Course
              </DialogTitle>
            </DialogHeader>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <CourseCreator />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default LMSPage;
