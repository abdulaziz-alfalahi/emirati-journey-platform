
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Users, 
  Award, 
  TrendingUp,
  Download,
  Eye,
  Settings,
  BarChart3,
  Zap,
  Target,
  CheckCircle
} from 'lucide-react';
import ResumeTemplateSelector from '@/components/resume/ResumeTemplateSelector';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import ATSOptimizer from '@/components/resume/ATSOptimizer';
import SmartSuggestions from '@/components/resume/SmartSuggestions';
import ResumeAnalytics from '@/components/resume/ResumeAnalytics';
import ExportCenter from '@/components/resume/ExportCenter';
import { ResumeTemplate } from '@/components/resume/types/advanced';

const ResumeBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
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
      setActiveTab('builder');
    }
  };

  const handleBackToTemplates = () => {
    setIsBuilding(false);
    setActiveTab('templates');
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
    category: 'corporate',
    preview: '/template-preview.png',
    sections: [],
    colors: {
      primary: '#0891b2',
      secondary: '#64748b',
      accent: '#f59e0b',
      text: '#1f2937',
      background: '#ffffff'
    },
    layout: {
      columns: 1,
      headerStyle: 'centered',
      sectionSpacing: 'normal',
      typography: 'sans-serif'
    }
  };

  if (isBuilding && selectedTemplate) {
    return (
      <Layout>
        <ResumeBuilder 
          template={mockTemplate}
          onBack={handleBackToTemplates}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-ehrdc-teal via-teal-600 to-cyan-600 text-white overflow-hidden">
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
                <FileText className="mr-2 h-5 w-5" />
                Start Building
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-ehrdc-teal"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-ehrdc-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-ehrdc-teal" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">78%</div>
              <div className="text-gray-600">Interview Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
              <TabsTrigger value="ats">ATS Optimizer</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <ResumeTemplateSelector
                onSelectTemplate={handleTemplateSelect}
                onStartBuilding={handleStartBuilding}
              />
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-6">
              <SmartSuggestions resumeData={mockResumeData} />
            </TabsContent>

            <TabsContent value="ats" className="space-y-6">
              <ATSOptimizer resumeData={mockResumeData} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <ResumeAnalytics resumeData={mockResumeData} />
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <ExportCenter 
                resumeData={mockResumeData}
                onExport={handleExport}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built specifically for the UAE job market with industry insights and local expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-ehrdc-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-ehrdc-teal" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-600">
                Get smart recommendations for skills, achievements, and content based on your industry
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS Optimization</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems with our optimization tools
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">UAE Market Focus</h3>
              <p className="text-gray-600">
                Templates and guidance specifically designed for UAE employers and hiring practices
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResumeBuilderPage;
