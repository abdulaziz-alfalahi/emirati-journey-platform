
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { School, Book, Award, Users, GraduationCap, Target, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgramsList from '@/components/school-programs/ProgramsList';
import ProgramsFilter from '@/components/school-programs/ProgramsFilter';
import InstitutionDirectory from '@/components/school-programs/InstitutionDirectory';
import SuccessStories from '@/components/school-programs/SuccessStories';
import ResourcesSection from '@/components/school-programs/ResourcesSection';
import { useAuth } from '@/context/AuthContext';
import { ProgramFilters } from '@/types/schoolPrograms';
import type { EducationStat, EducationTab, AcademicProgress, AcademicAnnouncement, Achievement } from '@/components/layouts/EducationPathwayLayout';

const SchoolProgramsPage: React.FC = () => {
  const { user, roles } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<ProgramFilters>({});

  // Education stats for K-12 programs
  const educationStats: EducationStat[] = [
    {
      value: "200+",
      label: "School Programs",
      icon: School
    },
    {
      value: "50+",
      label: "Partner Institutions",
      icon: Users
    },
    {
      value: "K-12",
      label: "Grade Levels",
      icon: GraduationCap
    },
    {
      value: "100%",
      label: "Government Approved",
      icon: Award
    }
  ];

  // Education tabs with K-12 program content
  const educationTabs: EducationTab[] = [
    {
      id: "available",
      label: "Available Programs",
      icon: <School className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <ProgramsFilter 
              onFilterChange={setSelectedFilters} 
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available School Programs</h2>
              {roles?.includes('educational_institution') && (
                <Button className="ehrdc-button-primary">
                  <School className="h-4 w-4 mr-2" /> Add New Program
                </Button>
              )}
            </div>
            <ProgramsList 
              type="available" 
              filters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      )
    },
    {
      id: "enrolled",
      label: "My Programs",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <ProgramsFilter 
              onFilterChange={setSelectedFilters} 
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">My Enrolled Programs</h2>
            <ProgramsList 
              type="enrolled" 
              filters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      )
    },
    {
      id: "institutions",
      label: "Institutions",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Educational Institutions</h2>
          <InstitutionDirectory />
        </div>
      )
    },
    {
      id: "success-stories",
      label: "Success Stories",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Student Success Stories</h2>
          <SuccessStories />
        </div>
      )
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Book className="h-4 w-4" />,
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Resources & Guides</h2>
          <ResourcesSection />
        </div>
      )
    }
  ];

  // Add management tab for educational institutions
  if (roles?.includes('educational_institution')) {
    educationTabs.splice(2, 0, {
      id: "managed",
      label: "Manage Programs",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <ProgramsFilter 
              onFilterChange={setSelectedFilters} 
              onSearchChange={setSearchQuery}
              selectedFilters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Programs</h2>
              <Button className="ehrdc-button-primary">
                <School className="h-4 w-4 mr-2" /> Create Program
              </Button>
            </div>
            <ProgramsList 
              type="managed" 
              filters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      )
    });
  }

  // Sample academic progress for K-12 education
  const academicProgress: AcademicProgress[] = [
    {
      courseId: "prog-1",
      courseName: "STEM Excellence Program - Grade 10",
      progress: 65,
      totalModules: 8,
      completedModules: 5,
      status: "active",
      nextDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    },
    {
      courseId: "prog-2",
      courseName: "Arabic Language Arts - Grade 9",
      progress: 85,
      totalModules: 6,
      completedModules: 5,
      status: "active",
      nextDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  ];

  // K-12 education announcements
  const announcements: AcademicAnnouncement[] = [
    {
      id: "1",
      title: "New STEM Program Registration Open",
      message: "Registration is now open for the advanced STEM program for grades 9-12. Limited spots available.",
      type: "info",
      date: new Date(),
      urgent: false
    },
    {
      id: "2",
      title: "Parent-Teacher Conference Scheduled",
      message: "Quarterly parent-teacher conferences will be held next week. Please check your program schedule.",
      type: "success",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      urgent: true
    }
  ];

  // K-12 achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Program Completion",
      description: "Successfully completed Advanced Mathematics program",
      icon: Award,
      dateEarned: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      category: "academic"
    }
  ];

  return (
    <EducationPathwayLayout
      title="K-12 School Programs"
      description="Discover exceptional educational initiatives designed to nurture and develop K-12 Emirati students, preparing them for academic excellence and future leadership roles"
      icon={<School className="h-12 w-12 text-blue-600" />}
      stats={educationStats}
      tabs={educationTabs}
      defaultTab="available"
      actionButtonText="Explore Programs"
      actionButtonHref="#available"
      academicProgress={academicProgress}
      announcements={announcements}
      achievements={achievements.length > 0 ? achievements : undefined}
      academicYear="2024-2025"
      institutionalBranding={{
        institutionName: "UAE K-12 Education Network",
        primaryColor: "#1e3a8a",
        secondaryColor: "#059669"
      }}
    />
  );
};

export default SchoolProgramsPage;
