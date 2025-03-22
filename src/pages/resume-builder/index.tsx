
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ResumeBuilder from '@/components/resume/ResumeBuilder';
import { ResumeTemplate } from '@/components/resume/types';

const ResumeBuilderPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Default template (Professional)
  const defaultTemplate: ResumeTemplate = {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, professional layout ideal for corporate positions',
    sections: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications']
  };

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

  return (
    <Layout>
      <ResumeBuilder template={defaultTemplate} onBack={() => navigate(-1)} />
    </Layout>
  );
};

export default ResumeBuilderPage;
