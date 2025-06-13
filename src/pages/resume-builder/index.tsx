
import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { 
  FileText, 
  Users, 
  Award, 
  TrendingUp,
  Lightbulb,
  Target,
  BarChart3,
  Download,
  Settings,
  Eye
} from 'lucide-react';
import ResumeTemplateSelector from '@/components/resume/ResumeTemplateSelector';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ATSOptimizer from '@/components/resume/ATSOptimizer';
import SmartSuggestions from '@/components/resume/SmartSuggestions';
import ResumeAnalytics from '@/components/resume/ResumeAnalytics';
import ExportCenter from '@/components/resume/ExportCenter';
import { ResumeTemplate } from '@/components/resume/types';

const ResumeBuilderPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  // Mock resume data for analytics and suggestions
  const mockResumeData = {
    personal: {
      firstName: 'Ahmed',
      lastName: 'Al-Mansouri',
      email: 'ahmed.almansouri@email.com',
      phone: '+971-50-123-4567',
      location: 'Dubai, UAE'
    },
    summary: 'Experienced software engineer with 5+ years in fintech...',
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Emirates NBD',
        duration: '2022 - Present',
        achievements: ['Led team of 5 developers', 'Increased system performance by 40%']
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'TypeScript', 'AWS'],
      soft: ['Leadership', 'Communication', 'Problem Solving']
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleStartBuilding = () => {
    if (selectedTemplate) {
      setIsBuilding(true);
    }
  };

  const handleBackToTemplates = () => {
    setIsBuilding(false);
    setSelectedTemplate(null);
  };

  const handleExport = (options: any) => {
    console.log('Exporting with options:', options);
    // Implementation for export logic
  };

  // Mock template for builder
  const mockTemplate: ResumeTemplate = {
    id: selectedTemplate || 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Professional template for corporate roles',
    sections: ['personal', 'summary', 'experience', 'education', 'skills']
  };

  if (isBuilding && selectedTemplate) {
    return (
      <ResumeBuilder 
        template={mockTemplate}
        onBack={handleBackToTemplates}
      />
    );
  }

  // Define the tabs for the main content
  const tabs = [
    {
      id: 'templates',
      label: 'Templates',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ResumeTemplateSelector
          onSelectTemplate={handleTemplateSelect}
          onStartBuilding={handleStartBuilding}
        />
      )
    },
    {
      id: 'suggestions',
      label: 'Smart Suggestions',
      icon: <Lightbulb className="h-4 w-4" />,
      content: <SmartSuggestions resumeData={mockResumeData} />
    },
    {
      id: 'ats',
      label: 'ATS Optimizer',
      icon: <Target className="h-4 w-4" />,
      content: <ATSOptimizer resumeData={mockResumeData} />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <ResumeAnalytics resumeData={mockResumeData} />
    },
    {
      id: 'export',
      label: 'Export',
      icon: <Download className="h-4 w-4" />,
      content: (
        <ExportCenter 
          resumeData={mockResumeData}
          onExport={handleExport}
        />
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Resume Settings</h3>
          <p className="text-muted-foreground">
            Customize your resume preferences and templates
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Resume Builder"
      description="Create professional resumes tailored for the UAE job market with AI-powered suggestions and ATS optimization"
      heroIcon={<FileText className="h-12 w-12" />}
      primaryActionLabel="Start Building"
      primaryActionIcon={<FileText className="mr-2 h-5 w-5" />}
      primaryActionOnClick={() => {
        // Scroll to templates section or set active tab
        const element = document.querySelector('[data-state="active"][value="templates"]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      secondaryActionLabel="View Analytics"
      secondaryActionIcon={<BarChart3 className="mr-2 h-5 w-5" />}
      secondaryActionOnClick={() => {
        // Set active tab to analytics - this would need to be implemented
        console.log('Navigate to analytics');
      }}
      stats={[
        { value: '50K+', label: 'Resumes Created' },
        { value: '95%', label: 'ATS Pass Rate' },
        { value: '6', label: 'Professional Templates' },
        { value: '78%', label: 'Interview Success Rate' }
      ]}
      quote="Your resume is your first impression. Make it count with professional design and strategic content that opens doors to opportunities."
      attribution="EHRDC Career Advisory Team"
      quoteIcon={<Award className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="templates"
    />
  );
};

export default ResumeBuilderPage;
