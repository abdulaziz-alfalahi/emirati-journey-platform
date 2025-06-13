
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { LMSHeader } from '@/components/lms/LMSHeader';
import { LMSTabsWrapper } from '@/components/lms/LMSTabsWrapper';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lms';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment } from '@/types/lms';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

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

  // Mock stats data - in real app, this would come from API
  const stats = [
    { value: "150+", label: "Total Courses", icon: BookOpen },
    { value: "5,200+", label: "Enrolled Students", icon: Users },
    { value: "85%", label: "Completion Rate", icon: TrendingUp },
    { value: "3,400+", label: "Certificates Issued", icon: Award }
  ];

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
      <div className="min-h-screen bg-gradient-to-br from-ehrdc-teal via-ehrdc-light-teal to-ehrdc-neutral-light">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white py-16 md:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 left-1/6 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learning Management System
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Advance your career with comprehensive courses, certifications, and skill development programs designed for the UAE's digital economy.
            </p>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-ehrdc-teal" />
                  </div>
                  <div className="text-4xl font-bold text-ehrdc-teal mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
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
      </div>
    </Layout>
  );
};

export default LMSPage;
