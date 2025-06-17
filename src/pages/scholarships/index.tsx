
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { useAuth } from '@/context/AuthContext';
import type { EducationStat, EducationTab, AcademicProgress, AcademicAnnouncement, Achievement } from '@/components/layouts/EducationPathwayLayout';
import { Users, Award, TrendingUp, GraduationCap, Target, Calendar } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';

const ScholarshipsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");

  // Mock academic progress with correct status mapping
  const academicProgress: AcademicProgress[] = [
    {
      courseId: "scholarship-1",
      courseName: "Merit Scholarship Application",
      progress: 75,
      totalModules: 4,
      completedModules: 3,
      status: 'active',
      nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      courseId: "scholarship-2", 
      courseName: "STEM Excellence Award",
      progress: 100,
      totalModules: 3,
      completedModules: 3,
      status: 'completed',
    }
  ];

  // Education stats for the layout
  const stats: EducationStat[] = [
    {
      value: "50+",
      label: "Available Scholarships",
      icon: DirhamSign
    },
    {
      value: "1,200+",
      label: "Recipients",
      icon: Users
    },
    {
      value: "85%",
      label: "Success Rate",
      icon: TrendingUp
    },
    {
      value: "AED 2M+",
      label: "Total Awarded",
      icon: Award
    }
  ];

  // Education tabs with scholarship content
  const tabs: EducationTab[] = [
    {
      id: "browse",
      label: "Browse Scholarships",
      icon: <DirhamSign className="h-4 w-4" />,
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Scholarships</h3>
          <p className="text-muted-foreground">Explore scholarship opportunities for Emirati students.</p>
        </div>
      )
    },
    {
      id: "my-applications",
      label: "My Applications",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Scholarship Applications</h3>
          <p className="text-muted-foreground">Track your scholarship application progress.</p>
        </div>
      )
    }
  ];

  // Sample academic announcements
  const announcements: AcademicAnnouncement[] = [
    {
      id: "1",
      title: "New STEM Scholarships Available",
      message: "Apply now for our latest STEM excellence scholarships with enhanced benefits.",
      type: "info",
      date: new Date(),
      urgent: false
    }
  ];

  // Sample achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Application Submitted",
      description: "Successfully submitted your first scholarship application!",
      icon: GraduationCap,
      dateEarned: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      category: "academic"
    }
  ];

  return (
    <EducationPathwayLayout
      title="Scholarships & Financial Aid"
      description="Discover scholarship opportunities and financial aid programs designed to support Emirati students in their educational journey."
      icon={<DirhamSign className="h-12 w-12 text-green-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="browse"
      actionButtonText="Browse Scholarships"
      actionButtonHref="#browse"
      academicProgress={academicProgress}
      announcements={announcements}
      achievements={achievements}
      academicYear="2024-2025"
      institutionalBranding={{
        institutionName: "EHRDC Scholarships Portal",
        primaryColor: "#059669",
        secondaryColor: "#1e3a8a"
      }}
    />
  );
};

export default ScholarshipsPage;
