
import React from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Lightbulb, FileText, Video, Mic, Users } from 'lucide-react';
import { ThoughtLeadershipContent } from '@/components/thought-leadership/ThoughtLeadershipContent';

const ThoughtLeadershipPage: React.FC = () => {
  const stats = [
    { value: "150+", label: "Published Articles", icon: FileText },
    { value: "75+", label: "Research Papers", icon: FileText },
    { value: "200+", label: "Expert Contributors", icon: Users },
    { value: "50+", label: "Video & Podcasts", icon: Video }
  ];

  const tabs = [
    {
      id: 'articles',
      label: 'Articles',
      icon: <FileText className="h-4 w-4" />,
      content: <ThoughtLeadershipContent />
    },
    {
      id: 'research',
      label: 'Research Papers', 
      icon: <FileText className="h-4 w-4" />,
      content: <ThoughtLeadershipContent />
    },
    {
      id: 'media',
      label: 'Videos & Podcasts',
      icon: <Video className="h-4 w-4" />,
      content: <ThoughtLeadershipContent />
    },
    {
      id: 'contributors',
      label: 'Contributors',
      icon: <Users className="h-4 w-4" />,
      content: <ThoughtLeadershipContent />
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Thought Leadership"
      description="Explore insights, research, and perspectives from industry leaders and experts in the UAE. Access cutting-edge articles, research papers, and multimedia content that shapes the future of work and career development."
      icon={<Lightbulb className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="articles"
    />
  );
};

export default ThoughtLeadershipPage;
