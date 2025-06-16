
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Crown, Users, Award, BookOpen } from 'lucide-react';
import { CommunityLeadershipContent } from '@/components/community-leadership/CommunityLeadershipContent';

const CommunityLeadershipPage: React.FC = () => {
  const stats = [
    { value: "30+", label: "Leadership Opportunities", icon: Crown },
    { value: "500+", label: "Community Leaders", icon: Users },
    { value: "100+", label: "Leadership Programs", icon: BookOpen },
    { value: "2000+", label: "Lives Impacted", icon: Award }
  ];

  const tabs = [
    {
      id: 'opportunities',
      label: 'Leadership Opportunities',
      icon: <Crown className="h-4 w-4" />,
      content: <CommunityLeadershipContent activeTab="opportunities" />
    },
    {
      id: 'training',
      label: 'Training & Workshops',
      icon: <BookOpen className="h-4 w-4" />,
      content: <CommunityLeadershipContent activeTab="training" />
    },
    {
      id: 'success-stories',
      label: 'Success Stories',
      icon: <Award className="h-4 w-4" />,
      content: <CommunityLeadershipContent activeTab="success-stories" />
    },
    {
      id: 'resources',
      label: 'Leadership Resources',
      icon: <Users className="h-4 w-4" />,
      content: <CommunityLeadershipContent activeTab="resources" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Community Leadership: Empowering Voices, Shaping Tomorrow"
      description="Develop your leadership potential and make a meaningful impact in your community through leadership opportunities, training programs, and collaborative initiatives that create lasting change."
      icon={<Crown className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="opportunities"
    />
  );
};

export default CommunityLeadershipPage;
