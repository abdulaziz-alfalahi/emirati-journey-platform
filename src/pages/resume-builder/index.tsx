
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ImportOptions from '@/components/resume/import/ImportOptions';
import ResumePreview from '@/components/resume/ResumePreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Eye, Download } from 'lucide-react';
import { ResumeProvider, useResume } from '@/context/ResumeContext';

const ResumeBuilderContent: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('builder');
  const { resumeData, setResumeData } = useResume();

  // Default template for resume preview
  const defaultTemplate = {
    id: 'classic',
    name: 'Classic Template',
    description: 'A classic professional template'
  };

  const handleImportComplete = (data: any) => {
    setResumeData(data);
    setActiveTab('builder'); // Switch to builder after import
  };

  const handleBackToTemplates = () => {
    // Navigate back to template selection or main page
    console.log('Back to templates');
  };

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="CV Builder"
        description="Create professional resumes that stand out to UAE employers with AI-powered optimization and industry-specific templates"
        icon={<FileText className="h-12 w-12" />}
        primaryActionLabel="Build My CV"
        primaryActionIcon={<FileText className="h-5 w-5" />}
        secondaryActionLabel="Import Existing CV"
        secondaryActionIcon={<Upload className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">50+</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
              <div className="text-gray-600">Content Optimization</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
              <div className="text-gray-600">ATS Compatibility</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Multi-format</div>
              <div className="text-gray-600">Export Options</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border">
            <TabsTrigger value="builder" className="flex items-center gap-2 text-ehrdc-teal">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Builder</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2 text-ehrdc-teal">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2 text-ehrdc-teal">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <ResumeBuilder 
              template={defaultTemplate}
              onBack={handleBackToTemplates}
              initialData={resumeData}
            />
          </TabsContent>
          
          <TabsContent value="import">
            <ImportOptions 
              onImportComplete={handleImportComplete}
              currentData={resumeData}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <ResumePreview 
              template={defaultTemplate}
              data={resumeData}
              theme="classic"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

const ResumeBuilderPage: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default ResumeBuilderPage;
