
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { MessageCircle, Users, Target, Award } from 'lucide-react';

const InterviewPreparationPage: React.FC = () => {
  const stats = [
    { value: "500+", label: "Practice Questions" },
    { value: "20+", label: "Interview Types" },
    { value: "1,000+", label: "Mock Interviews" },
    { value: "85%", label: "Success Rate" }
  ];

  const tabs = [
    {
      id: "preparation",
      label: "Interview Prep",
      icon: <MessageCircle className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Interview Preparation Tools Coming Soon</h3>
          <p className="text-muted-foreground">
            Practice interviews, get feedback, and improve your interview skills with our comprehensive platform.
          </p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Interview Preparation"
      description="Master your interview skills with practice sessions, expert tips, and personalized feedback"
      heroIcon={<MessageCircle className="h-12 w-12" />}
      primaryActionLabel="Start Practicing"
      primaryActionIcon={<MessageCircle className="h-4 w-4" />}
      secondaryActionLabel="View Tips"
      stats={stats}
      quote="Success is when preparation meets opportunity"
      attribution="Earl Nightingale"
      quoteIcon={<Target className="h-8 w-8" />}
      tabs={tabs}
      defaultTab="preparation"
    />
  );
};

export default InterviewPreparationPage;
