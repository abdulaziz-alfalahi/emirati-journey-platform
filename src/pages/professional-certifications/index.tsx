
import React, { useState, useEffect } from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Button } from '@/components/ui/button';
import { 
  Award, Search, Calendar, BookOpen, MapPin, Building, 
  Users, DollarSign, Target, TrendingUp 
} from 'lucide-react';
import { CertificationExplorer } from '@/components/professional-certifications/CertificationExplorer';
import { CertificationRoadmaps } from '@/components/professional-certifications/CertificationRoadmaps';
import { PreparationResources } from '@/components/professional-certifications/PreparationResources';
import { TestingCenters } from '@/components/professional-certifications/TestingCenters';
import { EmployerRecognition } from '@/components/professional-certifications/EmployerRecognition';
import { SuccessStories } from '@/components/professional-certifications/SuccessStories';
import { CertificationTracking } from '@/components/professional-certifications/CertificationTracking';
import { FinancialSupport } from '@/components/professional-certifications/FinancialSupport';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfessionalCertificationsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    availableCertifications: 500,
    industrySectors: 25,
    careerAdvancement: 85,
    testingCenters: 15
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // These would be real API calls in a production app
      setStats({
        availableCertifications: 500,
        industrySectors: 25,
        careerAdvancement: 85,
        testingCenters: 15
      });
    } catch (error) {
      // Handle error silently for demo
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <ProfessionalGrowthLayout
        title="Professional Certifications"
        description="Advance your career with industry-recognized certifications valued by UAE employers"
        icon={<Award className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <AuthenticationRequired 
          message="Please log in to access professional certifications and track your certification journey" 
          icon={<Award className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </ProfessionalGrowthLayout>
    );
  }

  if (loading) {
    return (
      <ProfessionalGrowthLayout
        title="Professional Certifications"
        description="Advance your career with industry-recognized certifications valued by UAE employers"
        icon={<Award className="h-8 w-8 text-white" />}
        tabs={[]}
      >
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </ProfessionalGrowthLayout>
    );
  }

  const statsItems: StatItem[] = [
    {
      value: `${stats.availableCertifications}+`,
      label: "Available Certifications",
      icon: Award
    },
    {
      value: `${stats.industrySectors}+`,
      label: "Industry Sectors",
      icon: Building
    },
    {
      value: `${stats.careerAdvancement}%`,
      label: "Career Advancement Rate",
      icon: TrendingUp
    },
    {
      value: stats.testingCenters.toString(),
      label: "Testing Centers in UAE",
      icon: MapPin
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "explorer",
      label: "Explorer",
      icon: <Search className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Certification Explorer"
          icon={<Search className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Discover industry-recognized certifications across multiple sectors"
        >
          <CertificationExplorer />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "roadmaps",
      label: "Roadmaps",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Certification Roadmaps"
          icon={<Calendar className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Structured learning paths to achieve your certification goals"
        >
          <CertificationRoadmaps />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "preparation",
      label: "Preparation",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Preparation Resources"
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Study materials and practice tests to ensure exam success"
        >
          <PreparationResources />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "testing",
      label: "Testing Centers",
      icon: <MapPin className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Testing Centers"
          icon={<MapPin className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Find convenient testing locations across the UAE"
        >
          <TestingCenters />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "employers",
      label: "Employer Recognition",
      icon: <Building className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Employer Recognition"
          icon={<Building className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="See which employers value and recognize these certifications"
        >
          <EmployerRecognition />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "stories",
      label: "Success Stories",
      icon: <Users className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Success Stories"
          icon={<Users className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Learn from professionals who advanced their careers through certifications"
        >
          <SuccessStories />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "tracking",
      label: "My Certifications",
      icon: <Target className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Certification Tracking"
          icon={<Target className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Track your certification progress and manage your credentials"
        >
          <CertificationTracking />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "financial",
      label: "Financial Support",
      icon: <DollarSign className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Financial Support"
          icon={<DollarSign className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Explore funding options and financial assistance programs"
        >
          <FinancialSupport />
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Professional Certifications"
      description="Advance your career with industry-recognized certifications valued by UAE employers"
      icon={<Award className="h-8 w-8 text-white" />}
      stats={statsItems}
      tabs={tabs}
      defaultTab="explorer"
    />
  );
};

export default ProfessionalCertificationsPage;
