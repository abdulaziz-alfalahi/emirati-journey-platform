
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
