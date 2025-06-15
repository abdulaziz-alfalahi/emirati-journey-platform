import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';

// Import Career Journey Components
import CareerJourneyVisualization from '@/components/career-journey/CareerJourneyVisualization';
import SkillsGapAnalysis from '@/components/career-journey/SkillsGapAnalysis';
import GoalSetting from '@/components/career-journey/GoalSetting';

// Import Career Comparison Components
import { CareerComparisonTool } from '@/components/career-comparison/CareerComparisonTool';
import { SalaryComparison } from '@/components/career-comparison/SalaryComparison';
import { GrowthProjections } from '@/components/career-comparison/GrowthProjections';
import { SkillsAnalysis } from '@/components/career-comparison/SkillsAnalysis';
import { WorkLifeBalance } from '@/components/career-comparison/WorkLifeBalance';
import { PersonalizedInsights } from '@/components/career-comparison/PersonalizedInsights';

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
  Users,
  Search,
  Award,
  Navigation,
  Quote
} from 'lucide-react';

interface MarketInsight {
  sector: string;
  growth: string;
  demand: 'High' | 'Medium' | 'Low';
  salaryTrend: 'Increasing' | 'Stable' | 'Decreasing';
  skillsInDemand: string[];
}

const CareerPlanningHubPage: React.FC = () => {
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<'comparison' | 'journey'>('journey');

  // Market intelligence data
  const marketInsights: MarketInsight[] = [
    {
      sector: 'Technology',
      growth: '15%',
      demand: 'High',
      salaryTrend: 'Increasing',
      skillsInDemand: ['AI/ML', 'Cloud Computing', 'Cybersecurity', 'DevOps']
    },
    {
      sector: 'Healthcare',
      growth: '8%',
      demand: 'High', 
      salaryTrend: 'Increasing',
      skillsInDemand: ['Digital Health', 'Telemedicine', 'Data Analysis', 'Patient Care']
    },
    {
      sector: 'Finance',
      growth: '6%',
      demand: 'Medium',
      salaryTrend: 'Stable',
      skillsInDemand: ['FinTech', 'Risk Analysis', 'Blockchain', 'Compliance']
    }
  ];

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
        {marketInsights.map((insight, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">{insight.sector}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate:</span>
                <span className="font-medium text-green-600">{insight.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Demand:</span>
                <span className={`font-medium ${
                  insight.demand === 'High' ? 'text-green-600' : 
                  insight.demand === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {insight.demand}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Salary Trend:</span>
                <span className={`font-medium ${
                  insight.salaryTrend === 'Increasing' ? 'text-green-600' : 
                  insight.salaryTrend === 'Stable' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {insight.salaryTrend}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Skills in Demand:</h4>
              <div className="flex flex-wrap gap-1">
                {insight.skillsInDemand.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Unified Skills Development Content
  const UnifiedSkillsContent = () => (
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
      
      {activeAnalysisMode === 'journey' ? (
        <SkillsGapAnalysis />
      ) : (
        <SkillsAnalysis />
      )}
    </div>
  );

  // Comprehensive Career Exploration Content
  const CareerExplorationContent = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Journey Map</h3>
          <CareerJourneyVisualization />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Career Comparison Tool</h3>
          <CareerComparisonTool />
        </div>
      </div>
    </div>
  );

  // Unified tabs combining both journey and comparison functionality
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
      id: "comparison",
      label: "Path Comparison",
      icon: <GitCompare className="h-4 w-4" />,
      content: <CareerComparisonTool />
    },
    {
      id: "personal-journey",
      label: "My Journey",
      icon: <Map className="h-4 w-4" />,
      content: <CareerJourneyVisualization />
    },
    {
      id: "skills-development",
      label: "Skills Development",
      icon: <BookOpen className="h-4 w-4" />,
      content: <UnifiedSkillsContent />
    },
    {
      id: "goals-tracking",
      label: "Goals & Milestones",
      icon: <Target className="h-4 w-4" />,
      content: <GoalSetting />
    },
    {
      id: "salary-insights",
      label: "Salary Insights",
      icon: <TrendingUp className="h-4 w-4" />,
      content: <SalaryComparison />
    },
    {
      id: "growth-projections",
      label: "Growth Projections",
      icon: <BarChart3 className="h-4 w-4" />,
      content: <GrowthProjections />
    },
    {
      id: "work-life-balance",
      label: "Work-Life Balance",
      icon: <Heart className="h-4 w-4" />,
      content: <WorkLifeBalance />
    },
    {
      id: "personalized-insights",
      label: "AI Insights",
      icon: <Star className="h-4 w-4" />,
      content: <PersonalizedInsights />
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