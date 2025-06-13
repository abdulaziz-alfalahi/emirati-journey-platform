
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { LMSHeader } from '@/components/lms/LMSHeader';
import { LMSTabsWrapper } from '@/components/lms/LMSTabsWrapper';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lms';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment } from '@/types/lms';

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
        <LMSHeader 
          title="Learning Management System"
          description="Advance your career with comprehensive courses, certifications, and skill development programs designed for the UAE's digital economy."
        />

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
