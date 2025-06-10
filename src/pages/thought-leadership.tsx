
import React from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { 
  Lightbulb, FileText, Video, Mic, Users, 
  TrendingUp, Eye, Star, Clock 
} from 'lucide-react';
import { ArticlesTab } from '@/components/thought-leadership/ArticlesTab';
import { ResearchPapersTab } from '@/components/thought-leadership/ResearchPapersTab';
import { MediaTab } from '@/components/thought-leadership/MediaTab';
import { ContributorsTab } from '@/components/thought-leadership/ContributorsTab';

const ThoughtLeadershipPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const statsItems: StatItem[] = [
    {
      value: "150+",
      label: "Published Articles",
      icon: FileText
    },
    {
      value: "45",
      label: "Research Papers",
      icon: TrendingUp
    },
    {
      value: "28",
      label: "Video & Podcasts",
      icon: Video
    },
    {
      value: "85",
      label: "Expert Contributors",
      icon: Users
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "articles",
      label: "Articles",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Articles & Insights"
          icon={<FileText className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Explore thought-provoking articles from industry leaders and experts"
        >
          <ArticlesTab searchQuery={searchQuery} />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "research",
      label: "Research Papers",
      icon: <Star className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Research Papers"
          icon={<Star className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Access in-depth research and studies on career development and workforce trends"
        >
          <ResearchPapersTab searchQuery={searchQuery} />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "media",
      label: "Videos & Podcasts",
      icon: <Video className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Videos & Podcasts"
          icon={<Video className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Watch videos and listen to podcasts featuring expert discussions and interviews"
        >
          <MediaTab searchQuery={searchQuery} />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "contributors",
      label: "Contributors",
      icon: <Users className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Expert Contributors"
          icon={<Users className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Meet our network of industry experts and thought leaders"
        >
          <ContributorsTab searchQuery={searchQuery} />
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Thought Leadership"
      description="Explore insights, research, and perspectives from industry leaders and experts in the UAE"
      icon={<Lightbulb className="h-8 w-8 text-white" />}
      stats={statsItems}
      tabs={tabs}
      defaultTab="articles"
    >
      {/* Search functionality integrated into tabs */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search thought leadership content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(var(--pg-secondary))] focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5">
            <Eye className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </ProfessionalGrowthLayout>
  );
};

export default ThoughtLeadershipPage;
