
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ImportOptions from '@/components/resume/import/ImportOptions';
import ResumePreview from '@/components/resume/ResumePreview';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import { FileText, Upload, Eye, Download, Heart } from 'lucide-react';
import { ResumeTemplate } from '@/components/resume/types';

const ResumeBuilderContent: React.FC = () => {
  const { resumeData, setResumeData } = useResume();

  // Default template for resume preview with all required properties
  const defaultTemplate: ResumeTemplate = {
    id: 'classic',
    name: 'Classic Template',
    description: 'A classic professional template',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages']
  };

  const handleImportComplete = (data: any) => {
    setResumeData(data);
  };

  const handleBackToTemplates = () => {
    console.log('Back to templates');
  };

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'builder',
      label: 'Builder',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ResumeBuilder 
          template={defaultTemplate}
          onBack={handleBackToTemplates}
          initialData={resumeData}
        />
      )
    },
    {
      id: 'import',
      label: 'Import',
      icon: <Upload className="h-4 w-4" />,
      content: (
        <ImportOptions 
          onImportComplete={handleImportComplete}
          currentData={resumeData}
        />
      )
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: <Eye className="h-4 w-4" />,
      content: (
        <ResumePreview 
          template={defaultTemplate}
          data={resumeData}
          theme="classic"
        />
      )
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Resume Templates</h3>
          <p className="text-muted-foreground">Choose from professional templates designed for UAE employers.</p>
        </div>
      )
    },
    {
      id: 'export',
      label: 'Export',
      icon: <Download className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Download className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Export Options</h3>
          <p className="text-muted-foreground">Export your resume in multiple formats including PDF, Word, and more.</p>
        </div>
      )
    },
    {
      id: 'tips',
      label: 'Tips',
      icon: <Heart className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Resume Writing Tips</h3>
          <p className="text-muted-foreground">Expert advice and tips for creating compelling resumes that get noticed.</p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="CV Builder"
      description="Create professional resumes that stand out to UAE employers with AI-powered optimization and industry-specific templates"
      heroIcon={<FileText className="h-12 w-12" />}
      primaryActionLabel="Build My CV"
      primaryActionIcon={<FileText className="h-5 w-5" />}
      secondaryActionLabel="Import Existing CV"
      secondaryActionIcon={<Upload className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "50+", label: "Professional Templates" },
        { value: "AI-Powered", label: "Content Optimization" },
        { value: "95%", label: "ATS Compatibility" },
        { value: "Multi-format", label: "Export Options" }
      ]}
      
      // Quote props
      quote="Your resume is more than a document—it's the story of your professional journey and the key that unlocks your next opportunity."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="builder"
    />
  );
};

const ResumeBuilderPage: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default ResumeBuilderPage;
