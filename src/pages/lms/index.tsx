import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Plus, TrendingUp } from 'lucide-react';
import { CoursesList } from '@/components/lms/CoursesList';
import { CourseCreator } from '@/components/lms/CourseCreator';
import { ProgressTracker } from '@/components/lms/ProgressTracker';
import { LearningAnalyticsDashboard } from '@/components/lms/analytics/LearningAnalyticsDashboard';
import { GamificationDashboard } from '@/components/lms/gamification/GamificationDashboard';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment } from '@/types/lms';

const LMSPage: React.FC = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const isInstructor = roles.includes('training_center');

  useEffect(() => {
    if (user) {
      loadEnrollments();
    }
  }, [user]);

  const loadEnrollments = async () => {
    try {
      const data = await lmsService.getUserEnrollments();
      setEnrollments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load enrollments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const enrolledCourseIds = enrollments.map(enrollment => enrollment.course_id);

  const stats = {
    totalEnrollments: enrollments.length,
    completedCourses: enrollments.filter(e => e.status === 'completed').length,
    activeCourses: enrollments.filter(e => e.status === 'active').length,
    averageProgress: enrollments.length > 0 
      ? enrollments.reduce((acc, e) => acc + e.progress_percentage, 0) / enrollments.length 
      : 0
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Learning Management System</h1>
          <p className="text-muted-foreground">
            Discover courses, track your progress, and earn certificates
          </p>
        </div>

        {/* Stats Overview */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Enrollments</p>
                    <p className="text-lg font-semibold">{stats.totalEnrollments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                    <p className="text-lg font-semibold">{stats.activeCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-lg font-semibold">{stats.completedCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                    <p className="text-lg font-semibold">{Math.round(stats.averageProgress)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrollments.map(enrollment => (
                      <ProgressTracker
                        key={enrollment.id}
                        enrollment={enrollment}
                      />
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

          {user && (
            <TabsContent value="analytics">
              <LearningAnalyticsDashboard />
            </TabsContent>
          )}

          {user && (
            <TabsContent value="gamification">
              <GamificationDashboard />
            </TabsContent>
          )}

          {isInstructor && (
            <TabsContent value="create">
              <CourseCreator />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default LMSPage;
