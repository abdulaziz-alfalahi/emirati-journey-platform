
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, TrendingUp, GraduationCap } from 'lucide-react';
import type { CourseEnrollment } from '@/types/lms';

const LMSPage: React.FC = () => {
  console.log('LMSPage: Component rendering');
  
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('LMSPage: User exists:', !!user);
  console.log('LMSPage: Roles:', roles);

  const isInstructor = roles?.includes('training_center') || false;

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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Learning Management System</h1>
          </div>
          <p className="text-muted-foreground">
            Discover courses, track your progress, and earn certificates
          </p>
        </div>

        {/* Stats Overview */}
        {user && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                    <p className="text-2xl font-bold">{enrollments.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {enrollments.filter(e => e.progress_percentage === 100).length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">
                      {enrollments.filter(e => e.progress_percentage > 0 && e.progress_percentage < 100).length}
                    </p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            {user && (
              <>
                <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </>
            )}
            {isInstructor && (
              <TabsTrigger value="create">Create Course</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="browse">
            <Card>
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
                <CardDescription>
                  Browse and enroll in available courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Course Catalog</h3>
                  <p className="text-muted-foreground">
                    Course browsing interface will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user && (
            <TabsContent value="my-courses">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Enrolled Courses</h2>
                  <Button onClick={() => setActiveTab('browse')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Enroll in More Courses
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
                      <Button onClick={() => setActiveTab('browse')}>
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
              </div>
            </TabsContent>
          )}

          {user && (
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress Overview</CardTitle>
                  <CardDescription>
                    Track your learning journey and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Detailed Progress Analytics</h3>
                    <p className="text-muted-foreground">
                      Advanced progress tracking and analytics coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isInstructor && (
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create Course</CardTitle>
                  <CardDescription>
                    Build and publish your own courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Course Creation Tools</h3>
                    <p className="text-muted-foreground">
                      Course creation interface coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default LMSPage;
