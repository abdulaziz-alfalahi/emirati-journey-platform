
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Search, Target, Users, TrendingUp } from 'lucide-react';

const JobMatchingPage: React.FC = () => {
  const stats = [
    { value: "5,000+", label: "Active Job Listings" },
    { value: "500+", label: "Partner Employers" },
    { value: "85%", label: "Match Success Rate" },
    { value: "3,200+", label: "Successful Placements" }
  ];

  const tabs = [
    {
      id: "matching",
      label: "Job Matching",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <Search className="h-16 w-16 mx-auto text-muted-fore-ground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Smart Job Matching Coming Soon</h3>
          <p className="text-muted-foreground">
            Our AI-powered job matching system will connect you with opportunities that fit your skills and aspirations.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Job Matching"
      description="Find your perfect career match with our intelligent job recommendation system"
      heroIcon={<Search className="h-12 w-12" />}
      primaryActionLabel="Start Matching"
      primaryActionIcon={<Target className="h-4 w-4" />}
      secondaryActionLabel="View Jobs"
      stats={stats}
      quote="The right job is not just about what you do, but who you become"
      attribution="Career Philosophy"
      quoteIcon={<Target className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="matching"
    />
  );
};

export default JobMatchingPage;
