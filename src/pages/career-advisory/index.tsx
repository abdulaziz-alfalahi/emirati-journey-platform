
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { UserCheck, Users, MessageCircle, Award } from 'lucide-react';

const CareerAdvisoryPage: React.FC = () => {
  const stats = [
    { value: "50+", label: "Expert Advisors" },
    { value: "2,000+", label: "Advisory Sessions" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "80%", label: "Goal Achievement" }
  ];

  const tabs = [
    {
      id: "advisory",
      label: "Career Advisory",
      icon: <UserCheck className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <UserCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Career Advisory Platform Coming Soon</h3>
          <p className="text-muted-foreground">
            Connect with experienced career advisors for personalized guidance and mentorship.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Career Advisory"
      description="Get personalized career guidance from experienced professionals and industry experts"
      heroIcon={<UserCheck className="h-12 w-12" />}
      primaryActionLabel="Find Advisor"
      primaryActionIcon={<UserCheck className="h-4 w-4" />}
      secondaryActionLabel="Learn More"
      stats={stats}
      quote="A mentor is someone who allows you to see the hope inside yourself"
      attribution="Oprah Winfrey"
      quoteIcon={<UserCheck className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="advisory"
    />
  );
};

export default CareerAdvisoryPage;
