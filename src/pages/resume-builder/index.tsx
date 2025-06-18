
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { FileText, Download, Edit, Users } from 'lucide-react';

const ResumeBuilderPage: React.FC = () => {
  const stats = [
    { value: "10+", label: "Professional Templates" },
    { value: "5,000+", label: "Resumes Created" },
    { value: "20+", label: "Industry Formats" },
    { value: "95%", label: "User Satisfaction" }
  ];

  const tabs = [
    {
      id: "builder",
      label: "Resume Builder",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Resume Builder Coming Soon</h3>
          <p className="text-muted-foreground">
            Create professional resumes with our easy-to-use builder and industry-specific templates.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Resume Builder"
      description="Create professional resumes that stand out with our intuitive builder and expert templates"
      heroIcon={<FileText className="h-12 w-12" />}
      primaryActionLabel="Start Building"
      primaryActionIcon={<Edit className="h-4 w-4" />}
      secondaryActionLabel="View Templates"
      stats={stats}
      quote="Your resume is your first impression. Make it count."
      attribution="Career Success Principle"
      quoteIcon={<FileText className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="builder"
    />
  );
};

export default ResumeBuilderPage;
