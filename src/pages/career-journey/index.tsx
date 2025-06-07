
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import CareerJourneyMap from '@/components/career/CareerJourneyMap';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Navigation, Map, GitCompare, Target, 
  BarChart3, TrendingUp, Heart, Users
} from 'lucide-react';

const CareerJourneyPage: React.FC = () => {
  // Define tabs for the Career Entry layout - standardized to 6 tabs
  const tabs = [
    {
      id: 'journey',
      label: 'Journey Map',
      icon: <Navigation className="h-4 w-4" />,
      content: <CareerJourneyMap />
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Goal Setting</h3>
          <p className="text-muted-foreground">Set and track your career milestones and professional objectives.</p>
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
          <p className="text-muted-foreground">Monitor your career development and achievements over time.</p>
        </div>
      )
    },
    {
      id: 'networking',
      label: 'Network',
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Professional Network</h3>
          <p className="text-muted-foreground">Connect with professionals and expand your career network.</p>
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
          <p className="text-muted-foreground">Get personalized insights and recommendations for your career path.</p>
        </div>
      )
    },
    {
      id: 'comparison',
      label: 'Compare',
      icon: <GitCompare className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <GitCompare className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Path Comparison</h3>
          <p className="text-muted-foreground">Compare different career paths to make informed decisions.</p>
        </div>
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
    />
  );
};

export default CareerJourneyPage;
