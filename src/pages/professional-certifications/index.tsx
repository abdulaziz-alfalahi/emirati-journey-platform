
import React from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { ProfessionalCertificationsList } from '@/components/professional-certifications/ProfessionalCertificationsList';
import { Award, Building2, TrendingUp, Users, BookOpen, Calendar, Target } from 'lucide-react';

const ProfessionalCertificationsPage: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: "500+",
      label: "Available Certifications",
      icon: Award
    },
    {
      value: "25+",
      label: "Industry Sectors",
      icon: Building2
    },
    {
      value: "35%",
      label: "Average Salary Increase",
      icon: TrendingUp
    },
    {
      value: "50K+",
      label: "Certified Professionals",
      icon: Users
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "browse",
      label: "Browse Certifications",
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Professional Certifications Directory"
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Explore industry-recognized certification programs that will enhance your skills and advance your career"
        >
          <ProfessionalCertificationsList />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-certifications",
      label: "My Certifications",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Certifications"
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Track your certification progress and manage your credentials"
        >
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-[rgb(var(--pg-secondary))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">My Certifications</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Track your certification progress, view completed credentials, and manage your professional development journey.
            </p>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "recommended",
      label: "Recommended",
      icon: <Target className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Recommended Certifications"
          icon={<Target className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Personalized certification recommendations based on your career goals and interests"
        >
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-[rgb(var(--pg-secondary))] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Recommended for You</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Get personalized certification recommendations based on your career goals, current skills, and industry trends.
            </p>
          </div>
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Professional Certifications"
      description="Elevate your career with industry-recognized credentials and certification programs designed to enhance your skills and increase your earning potential"
      icon={<Award className="h-8 w-8 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="browse"
    />
  );
};

export default ProfessionalCertificationsPage;
