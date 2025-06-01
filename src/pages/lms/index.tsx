
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { LMSHeader } from '@/components/lms/LMSHeader';
import { LMSStatsOverview } from '@/components/lms/LMSStatsOverview';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CoursesList } from '@/components/lms/CoursesList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, TrendingUp } from 'lucide-react';
import type { CourseEnrollment } from '@/types/lms';

const LMSPage: React.FC = () => {
  console.log('LMSPage: Component rendering started');
  
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('LMSPage: User:', user);
  console.log('LMSPage: Roles:', roles);

  const isInstructor = roles.includes('training_center');

  useEffect(() => {
    console.log('LMSPage: useEffect triggered, user:', user);
    if (user) {
      loadEnrollments();
    } else {
      console.log('LMSPage: No user, setting loading to false');
      setLoading(false);
    }
  }, [user]);

  const loadEnrollments = async () => {
    console.log('LMSPage: Loading enrollments...');
    try {
      const data = await lmsService.getUserEnrollments();
      console.log('LMSPage: Enrollments loaded:', data);
      setEnrollments(data);
    } catch (error) {
      console.error('LMSPage: Error loading enrollments:', error);
      toast({
        title: "Error",
        description: "Failed to load enrollments",
        variant: "destructive"
      });
    } finally {
      console.log('LMSPage: Setting loading to false');
      setLoading(false);
    }
  };

  const enrolledCourseIds = enrollments.map(enrollment => enrollment.course_id);

  console.log('LMSPage: About to render, loading:', loading);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <LMSHeader 
          title="Learning Management System"
          description="Discover courses, track your progress, and earn certificates"
        />

        {user && (
          <LMSStatsOverview 
            enrollments={enrollments}
            loading={loading}
          />
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            {user && (
              <>
                <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="gamification">Gamification</TabsTrigger>
              </>
            )}
            {isInstructor && (
              <TabsTrigger value="create">Create Course</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="browse">
            <CoursesList 
              showEnrollButton={!!user}
              userEnrollments={enrolledCourseIds}
            />
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
                  <div className="text-center py-12">
                    <p>Enrolled courses will be displayed here</p>
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

          {user && (
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Analytics</CardTitle>
                  <CardDescription>
                    Insights into your learning patterns and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Analytics dashboard coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user && (
            <TabsContent value="gamification">
              <Card>
                <CardHeader>
                  <CardTitle>Gamification</CardTitle>
                  <CardDescription>
                    Badges, achievements, and learning streaks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Gamification features coming soon
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
                    <p className="text-muted-foreground">
                      Course creation tools coming soon
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
