
import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { InteractiveIndustryMap } from '@/components/industry-exploration/InteractiveIndustryMap';
import { IndustryProfiles } from '@/components/industry-exploration/IndustryProfiles';
import { IndustryComparison } from '@/components/industry-exploration/IndustryComparison';
import { SuccessStories } from '@/components/industry-exploration/SuccessStories';
import { IndustryEvents } from '@/components/industry-exploration/IndustryEvents';
import { EmiratizationOpportunities } from '@/components/industry-exploration/EmiratizationOpportunities';
import { PersonalizedRecommendations } from '@/components/industry-exploration/PersonalizedRecommendations';
import { 
  Map, Building, BarChart3, Users, Calendar, Star, 
  Compass, Target, Search, TrendingUp, Quote, 
  GitCompare, Award, BookOpen, Briefcase
} from 'lucide-react';

interface IndustryInsight {
  name: string;
  growth: string;
  opportunities: string;
  averageSalary: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  keySkills: string[];
  majorEmployers: string[];
}

const IndustryExplorationPage: React.FC = () => {
  // Enhanced industry data
  const industryInsights: IndustryInsight[] = [
    {
      name: 'Technology & Innovation',
      growth: '18%',
      opportunities: '45K+',
      averageSalary: '120K AED',
      demandLevel: 'High',
      keySkills: ['AI/ML', 'Cloud Computing', 'Cybersecurity', 'DevOps'],
      majorEmployers: ['Emirates NBD', 'du', 'Careem', 'Noon']
    },
    {
      name: 'Healthcare & Life Sciences',
      growth: '12%',
      opportunities: '28K+',
      averageSalary: '95K AED',
      demandLevel: 'High',
      keySkills: ['Digital Health', 'Patient Care', 'Medical Research', 'Telemedicine'],
      majorEmployers: ['Cleveland Clinic', 'Mediclinic', 'NMC Health', 'Aster DM']
    },
    {
      name: 'Financial Services',
      growth: '8%',
      opportunities: '22K+',
      averageSalary: '110K AED',
      demandLevel: 'Medium',
      keySkills: ['FinTech', 'Risk Management', 'Blockchain', 'Islamic Finance'],
      majorEmployers: ['ADCB', 'FAB', 'ENBD', 'Dubai Islamic Bank']
    },
    {
      name: 'Tourism & Hospitality',
      growth: '15%',
      opportunities: '85K+',
      averageSalary: '65K AED',
      demandLevel: 'High',
      keySkills: ['Customer Service', 'Event Management', 'Digital Marketing', 'Operations'],
      majorEmployers: ['Emirates', 'Jumeirah', 'Marriott', 'Hilton']
    },
    {
      name: 'Energy & Sustainability',
      growth: '20%',
      opportunities: '18K+',
      averageSalary: '130K AED',
      demandLevel: 'High',
      keySkills: ['Renewable Energy', 'Project Management', 'Environmental Science', 'Engineering'],
      majorEmployers: ['ADNOC', 'Masdar', 'DEWA', 'Taqa']
    },
    {
      name: 'Education & Training',
      growth: '10%',
      opportunities: '35K+',
      averageSalary: '75K AED',
      demandLevel: 'Medium',
      keySkills: ['EdTech', 'Curriculum Development', 'Research', 'Digital Learning'],
      majorEmployers: ['KHDA', 'ADEK', 'AUS', 'UAEU']
    }
  ];

  // Stats for the layout
  const stats = [
    { value: "15+", label: "Industry Sectors" },
    { value: "233K+", label: "Career Opportunities" },
    { value: "Real-time", label: "Market Intelligence" },
    { value: "AI-Powered", label: "Industry Insights" }
  ];

  // Industry Market Intelligence Content
  const IndustryMarketIntelligence = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industryInsights.map((industry, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{industry.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                industry.demandLevel === 'High' ? 'bg-green-100 text-green-800' : 
                industry.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {industry.demandLevel} Demand
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate:</span>
                <span className="font-medium text-green-600">{industry.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Opportunities:</span>
                <span className="font-medium">{industry.opportunities}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Salary:</span>
                <span className="font-medium text-blue-600">{industry.averageSalary}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-1">
                {industry.keySkills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Major Employers:</h4>
              <div className="text-xs text-muted-foreground">
                {industry.majorEmployers.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Career Pathways Content
  const CareerPathwaysContent = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Briefcase className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Industry Career Pathways</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore career progression routes, skill requirements, and advancement opportunities within each industry sector.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {industryInsights.slice(0, 4).map((industry, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <h4 className="font-semibold text-lg mb-4">{industry.name}</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium">Entry Level</div>
                <div className="text-xs text-muted-foreground">0-2 years experience</div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm font-medium">Mid-Level</div>
                <div className="text-xs text-muted-foreground">3-7 years experience</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm font-medium">Senior Level</div>
                <div className="text-xs text-muted-foreground">8+ years experience</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tabs content for the layout
  const tabs = [
    {
      id: "map",
      label: "Industry Map",
      icon: <Map className="h-4 w-4" />,
      content: <InteractiveIndustryMap />
    },
    {
      id: "market-intelligence",
      label: "Market Intelligence",
      icon: <BarChart3 className="h-4 w-4" />,
      content: <IndustryMarketIntelligence />
    },
    {
      id: "profiles",
      label: "Industry Profiles",
      icon: <Building className="h-4 w-4" />,
      content: <IndustryProfiles />
    },
    {
      id: "comparison",
      label: "Industry Comparison",
      icon: <GitCompare className="h-4 w-4" />,
      content: <IndustryComparison />
    },
    {
      id: "pathways",
      label: "Career Pathways",
      icon: <Target className="h-4 w-4" />,
      content: <CareerPathwaysContent />
    },
    {
      id: "opportunities",
      label: "Emiratization",
      icon: <Award className="h-4 w-4" />,
      content: <EmiratizationOpportunities />
    },
    {
      id: "events",
      label: "Industry Events",
      icon: <Calendar className="h-4 w-4" />,
      content: <IndustryEvents />
    },
    {
      id: "stories",
      label: "Success Stories",
      icon: <Users className="h-4 w-4" />,
      content: <SuccessStories />
    },
    {
      id: "recommendations",
      label: "AI Recommendations",
      icon: <Star className="h-4 w-4" />,
      content: <PersonalizedRecommendations />
    }
  ];

  const handleExploreIndustries = () => {
    console.log('Explore UAE industries');
  };

  const handleCompareIndustries = () => {
    console.log('Compare industry sectors');
  };

  return (
    <CareerPageLayout
      title="Industry Exploration"
      description="Discover opportunities across UAE's thriving industries and find your perfect career path with comprehensive insights, market intelligence, and data-driven recommendations tailored for the dynamic UAE economy."
      heroIcon={<Compass className="h-16 w-16" />}
      primaryActionLabel="Explore Industries"
      primaryActionIcon={<Search className="h-4 w-4" />}
      primaryActionOnClick={handleExploreIndustries}
      secondaryActionLabel="Compare Sectors"
      secondaryActionIcon={<GitCompare className="h-4 w-4" />}
      secondaryActionOnClick={handleCompareIndustries}
      stats={stats}
      quote="The best time to plant a tree was 20 years ago. The second best time is now. The same applies to building your career in the right industry - start exploring today."
      attribution="UAE Industry Development Initiative"
      quoteIcon={<Quote className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="map"
    />
  );
};

export default IndustryExplorationPage;
