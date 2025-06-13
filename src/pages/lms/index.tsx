
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { LMSTabsWrapper } from '@/components/lms/LMSTabsWrapper';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lms';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment } from '@/types/lms';
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LMSPage: React.FC = () => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // Check if user is an instructor
  const isInstructor = roles?.some(role => 
    ['educational_institution', 'administrator'].includes(role)
  );

  // Load user enrollments if authenticated
  useEffect(() => {
    const loadEnrollments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await lmsService.getUserEnrollments();
        setEnrollments(data);
      } catch (error) {
        console.error('Error loading enrollments:', error);
        toast({
          title: "Error",
          description: "Failed to load your course enrollments",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, [user, toast]);

  // Get enrolled course IDs for quick lookup
  const enrolledCourseIds = enrollments.map(enrollment => enrollment.course_id);

  console.log('LMSPage: Rendering with state:', {
    user: !!user,
    isInstructor,
    enrollmentsCount: enrollments.length,
    enrolledCourseIdsCount: enrolledCourseIds.length,
    loading,
    activeTab
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Learning Management System</h1>
            <p className="text-xl opacity-90 mb-6">
              Advance your career with comprehensive courses, certifications, and skill development programs designed for the UAE's digital economy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <BookOpen className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Professional Courses</h3>
                <p className="text-sm opacity-90">Skill development and certification</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Interactive Learning</h3>
                <p className="text-sm opacity-90">Hands-on projects and assessments</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Digital Certificates</h3>
                <p className="text-sm opacity-90">Blockchain-verified credentials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <BookOpen className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold">150+ Courses</h3>
                  <p className="text-sm text-muted-foreground">Available for enrollment</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Users className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-semibold">5,200+ Students</h3>
                  <p className="text-sm text-muted-foreground">Active learners</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <TrendingUp className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold">85% Completion</h3>
                  <p className="text-sm text-muted-foreground">Course completion rate</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                <Award className="h-10 w-10 text-amber-600 mr-4" />
                <div>
                  <h3 className="font-semibold">3,400+ Certificates</h3>
                  <p className="text-sm text-muted-foreground">Issued to graduates</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <LMSTabsWrapper
          user={user}
          isInstructor={isInstructor}
          enrollments={enrollments}
          enrolledCourseIds={enrolledCourseIds}
          loading={loading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </Layout>
  );
};

export default LMSPage;
