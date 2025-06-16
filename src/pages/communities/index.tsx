
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Users, MessageCircle, Calendar, Award } from 'lucide-react';
import { CommunitiesContent } from '@/components/communities/CommunitiesContent';

const CommunitiesPage: React.FC = () => {
  const stats = [
    { value: "150+", label: "Active Communities", icon: Users },
    { value: "5000+", label: "Community Members", icon: MessageCircle },
    { value: "200+", label: "Monthly Events", icon: Calendar },
    { value: "1000+", label: "Success Stories", icon: Award }
  ];

  const tabs = [
    {
      id: 'explore',
      label: 'Explore Communities',
      icon: <Users className="h-4 w-4" />,
      content: <CommunitiesContent activeTab="explore" />
    },
    {
      id: 'my-communities',
      label: 'My Communities',
      icon: <MessageCircle className="h-4 w-4" />,
      content: <CommunitiesContent activeTab="my-communities" />
    },
    {
      id: 'events',
      label: 'Community Events',
      icon: <Calendar className="h-4 w-4" />,
      content: <CommunitiesContent activeTab="events" />
    },
    {
      id: 'create',
      label: 'Create Community',
      icon: <Award className="h-4 w-4" />,
      content: <CommunitiesContent activeTab="create" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Communities: Building Connections That Last a Lifetime"
      description="Connect with like-minded individuals, share experiences, and build meaningful relationships that enrich your community contribution journey and create lasting impact."
      icon={<Users className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="explore"
    />
  );
};

export default CommunitiesPage;
