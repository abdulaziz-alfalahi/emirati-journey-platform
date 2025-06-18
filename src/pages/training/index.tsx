
import React, { useState } from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { TrainingFilters } from '@/components/training/TrainingFilters';
import { TrainingProgramsList } from '@/components/training/TrainingProgramsList';
import { MyLearningTab } from '@/components/training/MyLearningTab';
import { CompletedTrainingTab } from '@/components/training/CompletedTrainingTab';
import { CertificatesTab } from '@/components/training/CertificatesTab';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Users, Award, TrendingUp, GraduationCap, Building, User, CheckCircle } from 'lucide-react';
import type { TrainingFilters as TrainingFiltersType } from '@/types/training';

const TrainingPage: React.FC = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<TrainingFiltersType>({});

  const handleFiltersChange = (newFilters: TrainingFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleApplyToProgram = (programId: string) => {
    toast({
      title: "Application Started",
      description: "Redirecting to application form...",
    });
    // TODO: Implement application flow
  };

  const handleViewDetails = (programId: string) => {
    toast({
      title: "Program Details",
      description: "Opening program details...",
    });
    // TODO: Implement program details view
  };

  const stats = [
    { value: "200+", label: "Training Programs", icon: BookOpen },
    { value: "15,000+", label: "Graduates", icon: Users },
    { value: "92%", label: "Job Placement Rate", icon: TrendingUp },
    { value: "50+", label: "Training Partners", icon: Building }
  ];

  const tabs = [
    {
      id: "available-courses",
      label: "Available Courses",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Training Programs"
          description="Discover comprehensive vocational training programs designed for the UAE's growing economy"
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <TrainingFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            <div className="lg:col-span-3">
              <TrainingProgramsList
                filters={filters}
                onApply={handleApplyToProgram}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-learning",
      label: "My Learning",
      icon: <User className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Learning Journey"
          description="Track your current training programs and learning progress"
          icon={<User className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
        >
          <MyLearningTab />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "completed",
      label: "Completed",
      icon: <CheckCircle className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Completed Training"
          description="Review your completed training programs and achievements"
          icon={<CheckCircle className="h-5 w-5 text-[rgb(var(--pg-accent))]" />}
        >
          <CompletedTrainingTab />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Certificates"
          description="Access and manage your earned certificates and credentials"
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-primary))]" />}
        >
          <CertificatesTab />
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Vocational Training Programs"
      description="Develop practical skills and advance your career with industry-specific training programs designed for the UAE's growing economy"
      icon={<GraduationCap className="h-12 w-12" />}
      stats={stats}
      tabs={tabs}
      defaultTab="available-courses"
      ctaTitle="Ready to Start Your Training Journey?"
      ctaDescription="Join thousands of professionals who have advanced their careers through our comprehensive training programs"
      ctaActionLabel="Browse All Programs"
      ctaActionHref="#available-courses"
    />
  );
};

export default TrainingPage;
