
import React, { useState, useEffect } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { LMSTabsWrapper } from '@/components/lms/LMSTabsWrapper';
import { useAuth } from '@/context/AuthContext';
import { lmsService } from '@/services/lms';
import { useToast } from '@/hooks/use-toast';
import type { CourseEnrollment } from '@/types/lms';
import type { EducationStat, EducationTab, AcademicProgress, AcademicAnnouncement, Achievement } from '@/components/layouts/EducationPathwayLayout';
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Globe, Target, Calendar } from 'lucide-react';

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

  // Transform enrollments to academic progress format
  const academicProgress: AcademicProgress[] = enrollments.map(enrollment => ({
    courseId: enrollment.course_id,
    courseName: (enrollment as any).courses?.title || 'Course',
    progress: enrollment.progress_percentage,
    totalModules: 10, // Mock data - would come from actual course data
    completedModules: Math.floor((enrollment.progress_percentage / 100) * 10),
    status: enrollment.status === 'completed' ? 'completed' : 
            enrollment.status === 'active' ? 'active' : 'pending',
    nextDeadline: enrollment.status === 'active' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : undefined
  }));

  // Education stats for the layout
  const stats: EducationStat[] = [
    {
      value: "150+",
      label: "Available Courses",
      icon: BookOpen
    },
    {
      value: "5,200+",
      label: "Active Learners",
      icon: Users
    },
    {
      value: "85%",
      label: "Completion Rate",
      icon: TrendingUp
    },
    {
      value: "3,400+",
      label: "Certificates Issued",
      icon: Award
    }
  ];

  // Education tabs with LMS content
  const tabs: EducationTab[] = [
    {
      id: "browse",
      label: "Course Catalog",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <LMSTabsWrapper
          user={user}
          isInstructor={isInstructor}
          enrollments={enrollments}
          enrolledCourseIds={enrolledCourseIds}
          loading={loading}
          activeTab="browse"
          setActiveTab={setActiveTab}
        />
      )
    },
    {
      id: "my-courses",
      label: "My Courses",
      icon: <Target className="h-4 w-4" />,
      content: (
        <LMSTabsWrapper
          user={user}
          isInstructor={isInstructor}
          enrollments={enrollments}
          enrolledCourseIds={enrolledCourseIds}
          loading={loading}
          activeTab="my-courses"
          setActiveTab={setActiveTab}
        />
      )
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: <Award className="h-4 w-4" />,
      content: (
        <LMSTabsWrapper
          user={user}
          isInstructor={isInstructor}
          enrollments={enrollments}
          enrolledCourseIds={enrolledCourseIds}
          loading={loading}
          activeTab="certificates"
          setActiveTab={setActiveTab}
        />
      )
    },
    {
      id: "progress",
      label: "Progress",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <LMSTabsWrapper
          user={user}
          isInstructor={isInstructor}
          enrollments={enrollments}
          enrolledCourseIds={enrolledCourseIds}
          loading={loading}
          activeTab="progress"
          setActiveTab={setActiveTab}
        />
      )
    }
  ];

  // Sample academic announcements
  const announcements: AcademicAnnouncement[] = [
    {
      id: "1",
      title: "New AI & Machine Learning Course Available",
      message: "Enroll in our latest course covering advanced AI concepts and practical applications.",
      type: "info",
      date: new Date(),
      urgent: false
    },
    {
      id: "2", 
      title: "System Maintenance Scheduled",
      message: "Platform will be unavailable for maintenance on Sunday, 2-4 AM GST.",
      type: "warning",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      urgent: true
    }
  ];

  // Sample achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Course Completed",
      description: "Successfully completed your first course on the platform!",
      icon: GraduationCap,
      dateEarned: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      category: "academic"
    }
  ];

  // Calculate current GPA based on completed courses
  const completedCourses = academicProgress.filter(p => p.status === 'completed');
  const currentGPA = completedCourses.length > 0 ? 
    completedCourses.reduce((sum, course) => sum + (course.progress / 25), 0) / completedCourses.length : 
    undefined;

  console.log('LMSPage: Rendering with state:', {
    user: !!user,
    isInstructor,
    enrollmentsCount: enrollments.length,
    enrolledCourseIdsCount: enrolledCourseIds.length,
    loading,
    activeTab
  });

  return (
    <EducationPathwayLayout
      title="Learning Management System"
      description="Advance your career with comprehensive courses, certifications, and skill development programs designed for the UAE's digital economy."
      icon={<GraduationCap className="h-12 w-12 text-blue-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="browse"
      actionButtonText="Browse Courses"
      actionButtonHref="#browse"
      academicProgress={academicProgress}
      announcements={announcements}
      achievements={achievements.length > 0 ? achievements : undefined}
      currentGPA={currentGPA}
      academicYear="2024-2025"
      institutionalBranding={{
        institutionName: "EHRDC Learning Platform",
        primaryColor: "#1e3a8a",
        secondaryColor: "#059669"
      }}
    />
  );
};

export default LMSPage;
