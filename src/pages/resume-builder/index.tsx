
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeProvider } from '@/context/ResumeContext';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate } from '@/components/resume/types';
import { FileText, Sparkles, User, Briefcase } from 'lucide-react';

const ResumeBuilderPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);

  const templates: ResumeTemplate[] = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'A clean, professional resume template',
      preview: '/lovable-uploads/template-classic.png'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'A contemporary design with subtle colors',
      preview: '/lovable-uploads/template-modern.png'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Perfect for creative professionals',
      preview: '/lovable-uploads/template-creative.png'
    }
  ];

  if (selectedTemplate) {
    return (
      <ResumeProvider>
        <ResumeBuilder 
          template={selectedTemplate}
          onBack={() => setSelectedTemplate(null)}
        />
      </ResumeProvider>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create a professional resume in minutes with our AI-powered builder. 
              Choose from expertly designed templates and let us help you craft the perfect resume.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Powered</CardTitle>
                <CardDescription>
                  Smart suggestions and content optimization powered by AI
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <User className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Professional Templates</CardTitle>
                <CardDescription>
                  Choose from industry-specific templates designed by experts
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>ATS Optimized</CardTitle>
                <CardDescription>
                  Ensure your resume passes through applicant tracking systems
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a template that best fits your industry and personal style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer border-2 hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-gray-400" />
                      </div>
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <Button 
                        onClick={() => setSelectedTemplate(template)}
                        className="w-full"
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeBuilderPage;
