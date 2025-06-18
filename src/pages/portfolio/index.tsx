
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { User, Globe, Image, Award } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const stats = [
    { value: "15+", label: "Portfolio Templates" },
    { value: "3,000+", label: "Portfolios Created" },
    { value: "25+", label: "Industries Covered" },
    { value: "90%", label: "Employment Success" }
  ];

  const tabs = [
    {
      id: "portfolio",
      label: "My Portfolio",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Portfolio Builder Coming Soon</h3>
          <p className="text-muted-foreground">
            Showcase your work and achievements with stunning digital portfolios.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Portfolio"
      description="Create stunning digital portfolios to showcase your work, skills, and professional achievements"
      heroIcon={<User className="h-12 w-12" />}
      primaryActionLabel="Create Portfolio"
      primaryActionIcon={<User className="h-4 w-4" />}
      secondaryActionLabel="View Examples"
      stats={stats}
      quote="Your portfolio is your story. Make it compelling."
      attribution="Design Philosophy"
      quoteIcon={<User className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="portfolio"
    />
  );
};

export default PortfolioPage;
