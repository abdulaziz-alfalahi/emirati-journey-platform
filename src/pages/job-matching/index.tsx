
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Briefcase, Star, Settings, 
  BarChart2, TrendingUp, Heart, Building,
  MapPin, Clock, DollarSign, ExternalLink
} from 'lucide-react';

// Mock job data
const featuredJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Emirates NBD',
    location: 'Dubai',
    salary: 'AED 15,000 - 20,000',
    type: 'Full-time',
    match: '95%',
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Digital Marketing Manager',
    company: 'Dubai Tourism',
    location: 'Dubai',
    salary: 'AED 12,000 - 16,000',
    type: 'Full-time',
    match: '88%',
    posted: '1 day ago'
  },
  {
    id: 3,
    title: 'AI Research Scientist',
    company: 'Mohammed bin Rashid University',
    location: 'Dubai',
    salary: 'AED 18,000 - 25,000',
    type: 'Full-time',
    match: '92%',
    posted: '3 days ago'
  }
];

// Search Tab Content
const SearchTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-ehrdc-teal" />
          Find Your Perfect Job Match
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Search jobs by title, company, or keywords..." 
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah">Sharjah</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5k-10k">AED 5,000 - 10,000</SelectItem>
                <SelectItem value="10k-15k">AED 10,000 - 15,000</SelectItem>
                <SelectItem value="15k-25k">AED 15,000 - 25,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Featured Jobs */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Featured Job Matches</h3>
          
          {featuredJobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                  <div className="flex items-center gap-2 text-ehrdc-teal">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                </div>
                <Badge variant="outline" className="bg-ehrdc-light-teal/10 text-ehrdc-teal border-ehrdc-light-teal/20">
                  {job.match} Match
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Posted {job.posted}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Applications Tab Content
const ApplicationsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-ehrdc-teal" />
          Your Job Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <Briefcase className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Track Your Applications</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Monitor the status of your job applications, receive updates, and manage follow-ups in one place.
        </p>
        <Button>View Applications</Button>
      </CardContent>
    </Card>
  );
};

// Saved Jobs Tab Content
const SavedJobsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-ehrdc-teal" />
          Saved Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <Star className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Your Saved Opportunities</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Access jobs you've saved for later review and comparison.
        </p>
        <Button>View Saved Jobs</Button>
      </CardContent>
    </Card>
  );
};

// Skills Gap Tab Content
const SkillsGapTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-ehrdc-teal" />
          Skills Gap Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <BarChart2 className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Identify Your Skills Gap</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Compare your current skills with job market requirements and get personalized recommendations for improvement.
        </p>
        <Button>Analyze Skills</Button>
      </CardContent>
    </Card>
  );
};

// Preferences Tab Content
const PreferencesTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-ehrdc-teal" />
          Job Matching Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <Settings className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Customize Your Preferences</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Set your job preferences, salary expectations, and career goals to receive better matches.
        </p>
        <Button>Update Preferences</Button>
      </CardContent>
    </Card>
  );
};

// Insights Tab Content
const InsightsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-ehrdc-teal" />
          Career Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-12">
        <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Market Trends & Insights</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Explore industry trends, salary benchmarks, and career path insights to make informed decisions.
        </p>
        <Button>View Insights</Button>
      </CardContent>
    </Card>
  );
};

const JobMatchingPage: React.FC = () => {
  // Define tabs for the Career Entry layout - standardized to 6 tabs
  const tabs = [
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="h-4 w-4" />,
      content: <SearchTabContent />
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: <Briefcase className="h-4 w-4" />,
      content: <ApplicationsTabContent />
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: <Star className="h-4 w-4" />,
      content: <SavedJobsTabContent />
    },
    {
      id: 'skills-gap',
      label: 'Skills Gap',
      icon: <BarChart2 className="h-4 w-4" />,
      content: <SkillsGapTabContent />
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <Settings className="h-4 w-4" />,
      content: <PreferencesTabContent />
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <TrendingUp className="h-4 w-4" />,
      content: <InsightsTabContent />
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Job Matching"
      description="Find your perfect career match with our AI-powered job matching system that aligns your skills, experience, and preferences with available opportunities."
      heroIcon={<Search className="h-12 w-12" />}
      primaryActionLabel="Find Jobs"
      primaryActionIcon={<Search className="h-5 w-5" />}
      secondaryActionLabel="Update Profile"
      secondaryActionIcon={<Settings className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "5,000+", label: "Available Jobs" },
        { value: "85%", label: "Placement Rate" },
        { value: "250+", label: "Partner Employers" },
        { value: "24/7", label: "Matching Updates" }
      ]}
      
      // Quote props
      quote="The right job isn't just about skills—it's about finding where your talents, passions, and purpose align with opportunity."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="search"
    />
  );
};

export default JobMatchingPage;
