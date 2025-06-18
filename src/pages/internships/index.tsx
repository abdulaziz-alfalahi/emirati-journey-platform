
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Briefcase, Users, Building, TrendingUp } from 'lucide-react';

const InternshipsPage: React.FC = () => {
  const stats = [
    { value: "300+", label: "Available Internships" },
    { value: "150+", label: "Partner Companies" },
    { value: "1,200+", label: "Successful Placements" },
    { value: "88%", label: "Full-time Conversion Rate" }
  ];

  const tabs = [
    {
      id: "opportunities",
      label: "Opportunities",
      icon: <Briefcase className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Internship Platform Coming Soon</h3>
          <p className="text-muted-foreground">
            We're building a comprehensive internship matching platform to connect you with the best opportunities.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Internships"
      description="Gain valuable work experience through internships with leading companies across the UAE"
      heroIcon={<Briefcase className="h-12 w-12" />}
      primaryActionLabel="Find Internships"
      primaryActionIcon={<Briefcase className="h-4 w-4" />}
      secondaryActionLabel="Learn More"
      stats={stats}
      quote="An internship is a bridge between learning and earning"
      attribution="Career Development Wisdom"
      quoteIcon={<Briefcase className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="opportunities"
    />
  );
};

export default InternshipsPage;
