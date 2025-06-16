
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { BookOpen, Users, Star, Share } from 'lucide-react';
import { WisdomSharingContent } from '@/components/wisdom-sharing/WisdomSharingContent';

const WisdomSharingPage: React.FC = () => {
  const stats = [
    { value: "2000+", label: "Wisdom Stories", icon: BookOpen },
    { value: "800+", label: "Wisdom Keepers", icon: Users },
    { value: "150+", label: "Featured Stories", icon: Star },
    { value: "5000+", label: "Lives Touched", icon: Share }
  ];

  const tabs = [
    {
      id: 'stories',
      label: 'Wisdom Stories',
      icon: <BookOpen className="h-4 w-4" />,
      content: <WisdomSharingContent activeTab="stories" />
    },
    {
      id: 'share',
      label: 'Share Your Wisdom',
      icon: <Share className="h-4 w-4" />,
      content: <WisdomSharingContent activeTab="share" />
    },
    {
      id: 'mentorship',
      label: 'Wisdom Mentorship',
      icon: <Users className="h-4 w-4" />,
      content: <WisdomSharingContent activeTab="mentorship" />
    },
    {
      id: 'featured',
      label: 'Featured Stories',
      icon: <Star className="h-4 w-4" />,
      content: <WisdomSharingContent activeTab="featured" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Wisdom Sharing: Passing the Torch of Experience"
      description="Share your life experiences, lessons learned, and valuable insights with younger generations while preserving the collective wisdom of our community for future generations."
      icon={<BookOpen className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="stories"
    />
  );
};

export default WisdomSharingPage;
