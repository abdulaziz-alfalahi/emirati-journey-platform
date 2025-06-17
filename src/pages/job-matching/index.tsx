import React, { useState } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { JobMatchingDashboard } from '@/components/job-matching/JobMatchingDashboard';
import JobRecommendations from '@/components/job-matching/JobRecommendations';
import { SavedJobsManager } from '@/components/job-matching/SavedJobsManager';
import { ApplicationTracker } from '@/components/job-matching/ApplicationTracker';
import JobSearchFilters from '@/components/job-matching/JobSearchFilters';
import { CareerInsights } from '@/components/job-matching/CareerInsights';
import { MatchingPreferences } from '@/components/job-matching/MatchingPreferences';
import { 
  Search, Briefcase, Target, Heart, Settings, BarChart, TrendingUp, Users,
  Quote, Star, Filter, Bell, MapPin, DollarSign, Clock, Building2,
  Zap, Award, BookOpen, Activity
} from 'lucide-react';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  skills: string[];
  matchScore: number;
  posted: string;
  industry: string;
}

interface MarketTrend {
  skill: string;
  demand: 'High' | 'Medium' | 'Low';
  growth: string;
  avgSalary: string;
  opportunities: number;
}

const JobMatchingPage: React.FC = () => {
  // Enhanced job data
  const jobOpportunities: JobOpportunity[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Emirates NBD',
      location: 'Dubai, UAE',
      salary: '18,000 - 25,000 AED',
      type: 'Full-time',
      experience: '5+ years',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      matchScore: 95,
      posted: '2 days ago',
      industry: 'Financial Services'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Careem',
      location: 'Dubai, UAE',
      salary: '22,000 - 30,000 AED',
      type: 'Full-time',
      experience: '3+ years',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile'],
      matchScore: 87,
      posted: '1 day ago',
      industry: 'Technology'
    },
    {
      id: '3',
      title: 'Digital Marketing Specialist',
      company: 'Jumeirah Group',
      location: 'Dubai, UAE',
      salary: '12,000 - 18,000 AED',
      type: 'Full-time',
      experience: '2+ years',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      matchScore: 82,
      posted: '3 days ago',
      industry: 'Hospitality'
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'ADNOC',
      location: 'Abu Dhabi, UAE',
      salary: '20,000 - 28,000 AED',
      type: 'Full-time',
      experience: '4+ years',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      matchScore: 91,
      posted: '1 week ago',
      industry: 'Energy'
    }
  ];

  // Market trends data
  const marketTrends: MarketTrend[] = [
    {
      skill: 'Artificial Intelligence',
      demand: 'High',
      growth: '+35%',
      avgSalary: '25,000 AED',
      opportunities: 450
    },
    {
      skill: 'Cloud Computing',
      demand: 'High',
      growth: '+28%',
      avgSalary: '22,000 AED',
      opportunities: 380
    },
    {
      skill: 'Digital Marketing',
      demand: 'High',
      growth: '+25%',
      avgSalary: '15,000 AED',
      opportunities: 620
    },
    {
      skill: 'Project Management',
      demand: 'Medium',
      growth: '+18%',
      avgSalary: '18,000 AED',
      opportunities: 280
    }
  ];

  // Stats for the layout
  const stats = [
    { value: "10K+", label: "Active Job Opportunities" },
    { value: "95%", label: "AI Match Accuracy" },
    { value: "2.5K+", label: "Successful Placements" },
    { value: "500+", label: "Partner Companies" }
  ];

  // AI-Powered Job Recommendations Content
  const AIJobRecommendations = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Zap className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">AI-Powered Job Matches</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our advanced AI analyzes your profile, skills, and preferences to find the perfect job opportunities tailored for you.
        </p>
      </div>
      
      <div className="grid gap-4">
        {jobOpportunities.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-lg">{job.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    job.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                    job.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-ehrdc-teal text-white px-4 py-2 rounded-lg hover:bg-ehrdc-teal/90 transition-colors">
                Apply Now
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Job Market Intelligence Content
  const JobMarketIntelligence = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Activity className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Job Market Intelligence</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay ahead with real-time insights into hiring trends, salary benchmarks, and emerging opportunities in the UAE job market.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {marketTrends.map((trend, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-lg">{trend.skill}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                trend.demand === 'High' ? 'bg-green-100 text-green-800' : 
                trend.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {trend.demand} Demand
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate:</span>
                <span className="font-medium text-green-600">{trend.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Salary:</span>
                <span className="font-medium text-blue-600">{trend.avgSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Open Positions:</span>
                <span className="font-medium">{trend.opportunities}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Application Management Content
  const ApplicationManagement = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Briefcase className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Application Tracking</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitor your application progress, schedule interviews, and manage your job search pipeline efficiently.
        </p>
      </div>
      <ApplicationTracker />
    </div>
  );

  // Skills Development Recommendations
  const SkillsDevelopment = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BookOpen className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Skills Development</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enhance your marketability with personalized skill recommendations based on job market analysis.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-semibold text-lg mb-4">Recommended Skills</h4>
          <div className="space-y-3">
            {['Machine Learning', 'Cloud Architecture', 'Data Analysis', 'Digital Marketing'].map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{skill}</span>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                  Learn
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-semibold text-lg mb-4">Skill Gap Analysis</h4>
          <div className="space-y-3">
            {[
              { skill: 'React Development', level: 85 },
              { skill: 'Product Management', level: 70 },
              { skill: 'Data Science', level: 60 },
              { skill: 'Cloud Computing', level: 45 }
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.skill}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-ehrdc-teal h-2 rounded-full" 
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Tabs content for the layout
  const tabs = [
    {
      id: "ai-matches",
      label: "AI Job Matches",
      icon: <Zap className="h-4 w-4" />,
      content: <AIJobRecommendations />
    },
    {
      id: "search",
      label: "Job Search",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <JobSearchFilters />
          <JobRecommendations />
        </div>
      )
    },
    {
      id: "market-intelligence",
      label: "Market Intelligence",
      icon: <BarChart className="h-4 w-4" />,
      content: <JobMarketIntelligence />
    },
    {
      id: "applications",
      label: "My Applications",
      icon: <Briefcase className="h-4 w-4" />,
      content: <ApplicationManagement />
    },
    {
      id: "saved-jobs",
      label: "Saved Jobs",
      icon: <Heart className="h-4 w-4" />,
      content: <SavedJobsManager />
    },
    {
      id: "skills-development",
      label: "Skills Development",
      icon: <BookOpen className="h-4 w-4" />,
      content: <SkillsDevelopment />
    },
    {
      id: "insights",
      label: "Career Insights",
      icon: <TrendingUp className="h-4 w-4" />,
      content: <CareerInsights />
    },
    {
      id: "preferences",
      label: "Job Preferences",
      icon: <Settings className="h-4 w-4" />,
      content: <MatchingPreferences />
    },
    {
      id: "notifications",
      label: "Job Alerts",
      icon: <Bell className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Job Alert Management</h3>
          <p className="text-muted-foreground">
            Set up personalized job alerts and manage your notification preferences.
          </p>
        </div>
      )
    }
  ];

  const handleFindMatches = () => {
    console.log('Find AI-powered job matches');
  };

  const handleBrowseJobs = () => {
    console.log('Browse all available jobs');
  };

  return (
    <CareerPageLayout
      title="Smart Job Matching"
      description="Discover your perfect career match with our AI-powered job matching system. Find opportunities that align with your skills, experience, and career aspirations in the UAE's dynamic job market with comprehensive application tracking and market intelligence."
      heroIcon={<Search className="h-16 w-16" />}
      primaryActionLabel="Find My Matches"
      primaryActionIcon={<Zap className="h-4 w-4" />}
      primaryActionOnClick={handleFindMatches}
      secondaryActionLabel="Browse All Jobs"
      secondaryActionIcon={<Search className="h-4 w-4" />}
      secondaryActionOnClick={handleBrowseJobs}
      stats={stats}
      quote="The future belongs to those who believe in the beauty of their dreams. Let our AI-powered platform help you turn your career dreams into reality with the perfect job match."
      attribution="UAE Smart Employment Initiative"
      quoteIcon={<Quote className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="ai-matches"
    />
  );
};

export default JobMatchingPage;