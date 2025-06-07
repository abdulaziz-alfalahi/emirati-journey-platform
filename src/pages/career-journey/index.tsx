
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import CareerJourneyMap from '@/components/career/CareerJourneyMap';
import CareerPathComparison from '@/components/career/CareerPathComparison';
import ExportJourneyDialog from '@/components/career/ExportJourneyDialog';
import { 
  Navigation, Map, GitCompare, Download, Target, 
  BarChart3, TrendingUp, Heart, Settings 
} from 'lucide-react';
import { CareerPath } from '@/components/career/journey-map/types';

const CareerJourneyPage: React.FC = () => {
  // Mock data that matches CareerPath type from journey-map
  const mockPaths: CareerPath[] = [
    { 
      id: '1', 
      title: 'Software Engineering', 
      industry: 'Technology',
      stages: [],
      totalProgress: 0
    },
    { 
      id: '2', 
      title: 'Digital Marketing', 
      industry: 'Marketing',
      stages: [],
      totalProgress: 0
    }
  ];

  const mockJourneyData = {
    currentStage: 'Entry Level',
    goals: ['Get certified', 'Find mentor'],
    milestones: ['Complete training', 'Apply for jobs']
  };

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'journey',
      label: 'Journey Map',
      icon: <Navigation className="h-4 w-4" />,
      content: <CareerJourneyMap />
    },
    {
      id: 'comparison',
      label: 'Compare Paths',
      icon: <GitCompare className="h-4 w-4" />,
      content: (
        <CareerPathComparison 
          availablePaths={mockPaths}
          isOpen={false}
          onClose={() => {}}
        />
      )
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Goal Setting</h3>
          <p className="text-gray-600">Set and track your career milestones and professional objectives.</p>
        </div>
      )
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Monitor your career development and achievements over time.</p>
        </div>
      )
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Career Insights</h3>
          <p className="text-gray-600">Get personalized insights and recommendations for your career path.</p>
        </div>
      )
    },
    {
      id: 'export',
      label: 'Export',
      icon: <Download className="h-4 w-4" />,
      content: (
        <ExportJourneyDialog 
          isOpen={false}
          onOpenChange={() => {}}
          elementRef={React.createRef()}
          journeyData={mockJourneyData}
        />
      )
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Career Journey Map"
      description="Visualize your career path, set milestones, and track your professional development journey with personalized insights and AI-powered recommendations."
      heroIcon={<Navigation className="h-12 w-12" />}
      primaryActionLabel="Start My Journey"
      primaryActionIcon={<Map className="h-5 w-5" />}
      secondaryActionLabel="Compare Paths"
      secondaryActionIcon={<GitCompare className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "500+", label: "Career Paths Mapped" },
        { value: "95%", label: "Goal Achievement Rate" },
        { value: "25+", label: "Industry Sectors" },
        { value: "AI-Powered", label: "Recommendations" }
      ]}
      
      // Quote props
      quote="Every great career begins with a single step. Map your journey, set your goals, and let your aspirations guide you toward excellence."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="journey"
      
      // Gradient override
      gradientColors="from-slate-50 via-white to-blue-50"
    />
  );
};

export default CareerJourneyPage;
