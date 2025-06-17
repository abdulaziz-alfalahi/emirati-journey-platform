
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GraduationCap, Users, Building, Calendar, Globe, BookOpen, University, Trophy, Target, TrendingUp } from 'lucide-react';
import UniversityProgramsFilter from '@/components/university-programs/UniversityProgramsFilter';
import ProgramsList from '@/components/university-programs/ProgramsList';
import RecommendedPrograms from '@/components/university-programs/RecommendedPrograms';
import MyApplications from '@/components/university-programs/MyApplications';
import SavedPrograms from '@/components/university-programs/SavedPrograms';
import type { EducationStat, EducationTab, AcademicProgress, AcademicAnnouncement, Achievement } from '@/components/layouts/EducationPathwayLayout';

interface FilterState {
  search: string;
  university: string;
  degreeLevel: string;
  fieldOfStudy: string;
  location: string;
  language: string;
}

const UniversityProgramsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    university: '',
    degreeLevel: '',
    fieldOfStudy: '',
    location: '',
    language: '',
  });

  // Mock data for filter options since we don't have the actual data yet
  const filterOptions = {
    universities: ['UAE University', 'American University of Sharjah', 'Khalifa University', 'University of Dubai'],
    degreeLevels: ['Bachelor', 'Master', 'PhD'],
    fieldsOfStudy: ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Arts']
  };

  // Mock stats data
  const stats = {
    totalPrograms: 150,
    universities: 25,
    fields: 30,
    international: 15
  };

  // Education stats for the layout
  const educationStats: EducationStat[] = [
    {
      value: `${stats?.totalPrograms || 0}+`,
      label: "University Programs",
      icon: University
    },
    {
      value: `${stats?.universities || 0}+`,
      label: "Partner Universities",
      icon: Building
    },
    {
      value: `${stats?.fields || 0}+`,
      label: "Fields of Study",
      icon: BookOpen
    },
    {
      value: `${stats?.international || 0}+`,
      label: "International Programs",
      icon: Globe
    }
  ];

  // Education tabs with university program content
  const educationTabs: EducationTab[] = [
    {
      id: "all-programs",
      label: "Program Catalog",
      icon: <University className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <UniversityProgramsFilter
              filters={filters}
              onFilterChange={setFilters}
              universities={filterOptions.universities}
              degreeLevels={filterOptions.degreeLevels}
              fieldsOfStudy={filterOptions.fieldsOfStudy}
            />
          </div>
          <div className="lg:col-span-3">
            <ProgramsList filters={filters} />
          </div>
        </div>
      )
    },
    {
      id: "recommended",
      label: "Recommended",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <UniversityProgramsFilter
              filters={filters}
              onFilterChange={setFilters}
              universities={filterOptions.universities}
              degreeLevels={filterOptions.degreeLevels}
              fieldsOfStudy={filterOptions.fieldsOfStudy}
            />
          </div>
          <div className="lg:col-span-3">
            <RecommendedPrograms filters={filters} />
          </div>
        </div>
      )
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <Calendar className="h-4 w-4" />,
      content: <MyApplications />
    },
    {
      id: "saved",
      label: "Saved Programs",
      icon: <BookOpen className="h-4 w-4" />,
      content: <SavedPrograms />
    }
  ];

  // Sample academic progress for university applications
  const academicProgress: AcademicProgress[] = [
    {
      courseId: "app-1",
      courseName: "UAE University - Computer Science",
      progress: 75,
      totalModules: 4,
      completedModules: 3,
      status: "active",
      nextDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    },
    {
      courseId: "app-2", 
      courseName: "AUS - Business Administration",
      progress: 100,
      totalModules: 5,
      completedModules: 5,
      status: "completed"
    }
  ];

  // University program announcements
  const announcements: AcademicAnnouncement[] = [
    {
      id: "1",
      title: "Fall 2024 Application Deadlines Extended",
      message: "Several partner universities have extended their application deadlines for Fall 2024 admission.",
      type: "info",
      date: new Date(),
      urgent: false
    },
    {
      id: "2",
      title: "New Scholarship Opportunities Available",
      message: "Merit-based scholarships now available for Computer Science and Engineering programs.",
      type: "success", 
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      urgent: true
    }
  ];

  // University program achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Application Submitted",
      description: "Successfully submitted application to UAE University",
      icon: Trophy,
      dateEarned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: "academic"
    }
  ];

  return (
    <EducationPathwayLayout
      title="University Programs"
      description="Explore world-class higher education opportunities and institutional partnerships across local and international universities"
      icon={<University className="h-12 w-12 text-blue-600" />}
      stats={educationStats}
      tabs={educationTabs}
      defaultTab="all-programs"
      actionButtonText="Explore Programs"
      actionButtonHref="#all-programs"
      academicProgress={academicProgress}
      announcements={announcements}
      achievements={achievements.length > 0 ? achievements : undefined}
      academicYear="2024-2025"
      institutionalBranding={{
        institutionName: "UAE University Partnership Network",
        primaryColor: "#1e3a8a",
        secondaryColor: "#059669"
      }}
    />
  );
};

export default UniversityProgramsPage;
