
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { AssessmentDashboard } from '@/components/collaborative-assessments/AssessmentDashboard';
import { TemplateBuilder } from '@/components/collaborative-assessments/TemplateBuilder';
import { EvaluationInterface } from '@/components/collaborative-assessments/EvaluationInterface';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CollaborativeAssessment } from '@/types/collaborativeAssessments';

type ViewMode = 'dashboard' | 'create-template' | 'create-assessment' | 'view-assessment' | 'evaluate-assessment';

const CollaborativeAssessmentsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [selectedAssessment, setSelectedAssessment] = useState<CollaborativeAssessment | null>(null);

  const handleCreateAssessment = () => {
    setViewMode('create-assessment');
  };

  const handleViewAssessment = (assessment: CollaborativeAssessment) => {
    setSelectedAssessment(assessment);
    setViewMode('view-assessment');
  };

  const handleEvaluateAssessment = (assessment: CollaborativeAssessment) => {
    setSelectedAssessment(assessment);
    setViewMode('evaluate-assessment');
  };

  const handleBackToDashboard = () => {
    setViewMode('dashboard');
    setSelectedAssessment(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {viewMode !== 'dashboard' && (
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        )}

        {viewMode === 'dashboard' && (
          <AssessmentDashboard
            onCreateAssessment={handleCreateAssessment}
            onViewAssessment={handleViewAssessment}
            onEvaluateAssessment={handleEvaluateAssessment}
          />
        )}

        {viewMode === 'create-template' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Create Assessment Template</h1>
            <TemplateBuilder
              onSave={() => setViewMode('dashboard')}
              onCancel={() => setViewMode('dashboard')}
            />
          </div>
        )}

        {viewMode === 'create-assessment' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Create New Assessment</h1>
            {/* Assessment creation form would go here */}
            <p>Assessment creation form coming soon...</p>
          </div>
        )}

        {viewMode === 'view-assessment' && selectedAssessment && (
          <div>
            <h1 className="text-2xl font-bold mb-6">{selectedAssessment.title}</h1>
            {/* Assessment view would go here */}
            <p>Assessment overview interface coming soon...</p>
          </div>
        )}

        {viewMode === 'evaluate-assessment' && selectedAssessment && (
          <EvaluationInterface
            assessmentId={selectedAssessment.id}
            onBack={handleBackToDashboard}
          />
        )}
      </div>
    </Layout>
  );
};

export default CollaborativeAssessmentsPage;
