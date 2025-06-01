
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { LMSHeader } from '@/components/lms/LMSHeader';
import { LMSStatsOverview } from '@/components/lms/LMSStatsOverview';
import { LMSTabsWrapper } from '@/components/lms/LMSTabsWrapper';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lmsService';
import { useToast } from '@/hooks/use-toast';
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
