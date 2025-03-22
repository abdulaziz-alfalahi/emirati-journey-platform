
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate } from '@/components/resume/types';
import { FileText } from 'lucide-react';

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);

  // If loading, show loading spinner
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  // If no template is selected, show template selection screen
  if (!selectedTemplate) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create a professional resume tailored for the UAE job market. Choose a template to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resumeTemplates.map((template) => (
              <div 
                key={template.id}
                className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="aspect-[210/297] bg-gray-100 flex items-center justify-center">
                  <FileText size={48} className="text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ResumeBuilder template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
    </Layout>
  );
};

// Template definitions
const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, professional layout ideal for corporate positions',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with emphasis on skills and achievements',
    sections: ['personal', 'skills', 'experience', 'education', 'projects', 'languages', 'certifications']
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated template for senior positions and leadership roles',
    sections: ['personal', 'summary', 'experience', 'achievements', 'education', 'skills', 'languages']
  }
];

export default ResumeBuilderPage;
