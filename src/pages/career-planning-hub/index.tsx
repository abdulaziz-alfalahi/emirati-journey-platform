
import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { 
  Compass, 
  GitCompare, 
  Map, 
  Target, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Heart, 
  Star,
  Search,
  Quote
} from 'lucide-react';

const CareerPlanningHubPage: React.FC = () => {
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<'comparison' | 'journey'>('journey');

  // Enhanced stats combining journey and comparison insights
  const stats = [
    { value: "500+", label: "Career Paths Mapped" },
    { value: "95%", label: "Goal Achievement Rate" },
    { value: "Real-time", label: "Market Intelligence" },
    { value: "AI-Powered", label: "Personalized Insights" }
  ];

  // Market Intelligence Tab Content
  const MarketIntelligenceContent = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Technology</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Growth Rate:</span>
              <span className="font-medium text-green-600">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Demand:</span>
              <span className="font-medium text-green-600">High</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Healthcare</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Growth Rate:</span>
              <span className="font-medium text-green-600">8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Demand:</span>
              <span className="font-medium text-green-600">High</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Finance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Growth Rate:</span>
              <span className="font-medium text-blue-600">6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Demand:</span>
              <span className="font-medium text-yellow-600">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Simplified Career Exploration Content
  const CareerExplorationContent = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Journey Map</h3>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">Career journey visualization will be displayed here.</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Career Comparison Tool</h3>
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">Career comparison interface will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Simplified Skills Development Content
  const SkillsContent = () => (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveAnalysisMode('journey')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAnalysisMode === 'journey' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Personal Skills Analysis
        </button>
        <button
          onClick={() => setActiveAnalysisMode('comparison')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeAnalysisMode === 'comparison' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Comparative Skills Analysis
        </button>
      </div>
      
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-muted-foreground">
          {activeAnalysisMode === 'journey' 
            ? 'Personal skills gap analysis will be displayed here.' 
            : 'Comparative skills analysis will be displayed here.'}
        </p>
      </div>
    </div>
  );

  // Simplified tabs
  const tabs = [
    {
      id: "exploration",
      label: "Career Exploration",
      icon: <Search className="h-4 w-4" />,
      content: <CareerExplorationContent />
    },
    {
      id: "market-intelligence",
      label: "Market Intelligence",
      icon: <BarChart3 className="h-4 w-4" />,
      content: <MarketIntelligenceContent />
    },
    {
      id: "skills-development",
      label: "Skills Development",
      icon: <BookOpen className="h-4 w-4" />,
      content: <SkillsContent />
    },
    {
      id: "goals-tracking",
      label: "Goals & Milestones",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">Goal setting and tracking interface will be displayed here.</p>
        </div>
      )
    },
    {
      id: "personalized-insights",
      label: "AI Insights",
      icon: <Star className="h-4 w-4" />,
      content: (
        <div className="p-6 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground">AI-powered personalized insights will be displayed here.</p>
        </div>
      )
    }
  ];

  const handleStartPlanning = () => {
    console.log('Start comprehensive career planning');
  };

  const handleViewMarketData = () => {
    console.log('View real-time market intelligence');
  };

  return (
    <CareerPageLayout
      title="Career Planning Hub"
      description="Your comprehensive career development platform combining journey planning, path comparison, market intelligence, and AI-powered insights to guide your professional growth in the UAE's dynamic economy."
      heroIcon={<Compass className="h-16 w-16" />}
      primaryActionLabel="Start Planning"
      primaryActionIcon={<Target className="h-4 w-4" />}
      primaryActionOnClick={handleStartPlanning}
      secondaryActionLabel="Market Intelligence"
      secondaryActionIcon={<BarChart3 className="h-4 w-4" />}
      secondaryActionOnClick={handleViewMarketData}
      stats={stats}
      quote="Success in your career comes not from chance, but from careful planning, continuous learning, and making informed decisions based on market insights and personal growth."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Quote className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="exploration"
    />
  );
};

export default CareerPlanningHubPage;
