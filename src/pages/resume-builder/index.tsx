
import React, { useState } from 'react';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
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
  Eye,
  Play
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResumeTemplateSelector from '@/components/resume/ResumeTemplateSelector';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ATSOptimizer from '@/components/resume/ATSOptimizer';
import SmartSuggestions from '@/components/resume/SmartSuggestions';
import ResumeAnalytics from '@/components/resume/ResumeAnalytics';
import ExportCenter from '@/components/resume/ExportCenter';
import { ResumeTemplate } from '@/components/resume/types';

const ResumeBuilderPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');

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

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-ehrdc-teal to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30L15 15v30l15-15zm15 0L30 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Resume Builder
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Create professional resumes tailored for the UAE job market with AI-powered suggestions and ATS optimization
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-ehrdc-teal hover:bg-gray-50 font-semibold"
                onClick={() => setActiveTab('templates')}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Building
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-ehrdc-teal"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">50K+</div>
              <div className="text-muted-foreground">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
              <div className="text-muted-foreground">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">6</div>
              <div className="text-muted-foreground">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">78%</div>
              <div className="text-muted-foreground">Interview Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-16 bg-gradient-to-r from-ehrdc-teal to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <Award className="h-8 w-8" />
            </div>
          </div>
          <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
            "Your resume is your first impression. Make it count with professional design and strategic content that opens doors to opportunities."
          </blockquote>
          <cite className="text-lg opacity-90">— EHRDC Career Advisory Team</cite>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white border min-w-max">
              <TabsTrigger value="templates" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="ats" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">ATS</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 text-ehrdc-teal whitespace-nowrap">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="templates">
            <Card>
              <CardContent className="p-6">
                <ResumeTemplateSelector
                  onSelectTemplate={handleTemplateSelect}
                  onStartBuilding={handleStartBuilding}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card>
              <CardContent className="p-6">
                <SmartSuggestions resumeData={mockResumeData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ats">
            <Card>
              <CardContent className="p-6">
                <ATSOptimizer resumeData={mockResumeData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <ResumeAnalytics resumeData={mockResumeData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardContent className="p-6">
                <ExportCenter 
                  resumeData={mockResumeData}
                  onExport={handleExport}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Resume Settings</h3>
                  <p className="text-muted-foreground">
                    Customize your resume preferences and templates
                  </p>
                </div>
              </CardContent>
            </Card>
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

export default ResumeBuilderPage;
