
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LMSTabsContent } from './LMSTabsContent';
import type { CourseEnrollment } from '@/types/lms';

interface LMSTabsWrapperProps {
  user: any;
  isInstructor: boolean;
  enrollments: CourseEnrollment[];
  enrolledCourseIds: string[];
  loading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const LMSTabsWrapper: React.FC<LMSTabsWrapperProps> = ({
  user,
  isInstructor,
  enrollments,
  enrolledCourseIds,
  loading,
  activeTab,
  setActiveTab
}) => {
  return (
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

      <LMSTabsContent 
        user={user}
        isInstructor={isInstructor}
        enrollments={enrollments}
        enrolledCourseIds={enrolledCourseIds}
        loading={loading}
        setActiveTab={setActiveTab}
      />
    </Tabs>
  );
};
