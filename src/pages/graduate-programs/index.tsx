
import React from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

const GraduateProgramsPage: React.FC = () => {
  const stats = [
    { value: "100+", label: "Graduate Programs", icon: GraduationCap },
    { value: "25+", label: "Partner Universities", icon: BookOpen },
    { value: "2,500+", label: "Graduate Students", icon: Users },
    { value: "90%", label: "Employment Rate", icon: Award }
  ];

  const tabs = [
    {
      id: "programs",
      label: "Available Programs",
      icon: <GraduationCap className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Graduate Programs Coming Soon</h3>
          <p className="text-muted-foreground">
            We're working on bringing you comprehensive graduate program listings and application tools.
          </p>
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="Graduate Programs"
      description="Advance your education with master's, PhD, and specialized graduate programs from top universities"
      icon={<GraduationCap className="h-12 w-12 text-purple-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="programs"
      actionButtonText="Explore Programs"
      actionButtonHref="#programs"
      academicYear="2024-2025"
    />
  );
};

export default GraduateProgramsPage;
