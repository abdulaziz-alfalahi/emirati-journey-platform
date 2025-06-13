
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import PortfolioEditor from '@/components/portfolio/PortfolioEditor';
import PortfolioViewer from '@/components/portfolio/PortfolioViewer';
import PortfolioVisibility from '@/components/portfolio/PortfolioVisibility';
import PortfolioBuilder from '@/components/portfolio/PortfolioBuilder';
import PortfolioAnalytics from '@/components/portfolio/PortfolioAnalytics';
import PortfolioTemplates from '@/components/portfolio/PortfolioTemplates';
import { Folder, Edit, Eye, Settings, Share, Heart, Palette, BarChart, Upload } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  // Mock portfolio data
  const mockPortfolio = {
    id: '1',
    userId: 'user1',
    name: 'My Portfolio',
    description: 'Professional portfolio',
    isPublic: true,
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const handlePortfolioUpdate = () => {
    console.log('Portfolio updated');
  };

  const handlePrimaryAction = () => {
    console.log('Start building portfolio');
  };

  const handleSecondaryAction = () => {
    console.log('View portfolio examples');
  };

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'builder',
      label: 'Builder',
      icon: <Edit className="h-4 w-4" />,
      content: (
        <PortfolioBuilder 
          portfolio={mockPortfolio}
          onUpdate={handlePortfolioUpdate}
        />
      )
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: <Palette className="h-4 w-4" />,
      content: <PortfolioTemplates />
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: <Eye className="h-4 w-4" />,
      content: (
        <PortfolioViewer 
          portfolio={mockPortfolio}
          isOwnPortfolio={true}
        />
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart className="h-4 w-4" />,
      content: <PortfolioAnalytics portfolio={mockPortfolio} />
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share className="h-4 w-4" />,
      content: <PortfolioVisibility portfolio={mockPortfolio} />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <PortfolioEditor 
          portfolio={mockPortfolio}
          onUpdate={handlePortfolioUpdate}
        />
      )
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Professional Portfolio"
      description="Create stunning digital portfolios that showcase your work, projects, and achievements. Stand out to employers with visual storytelling and professional presentation."
      heroIcon={<Folder className="h-12 w-12" />}
      primaryActionLabel="Start Building"
      primaryActionIcon={<Edit className="h-5 w-5" />}
      primaryActionOnClick={handlePrimaryAction}
      secondaryActionLabel="View Templates"
      secondaryActionIcon={<Eye className="h-5 w-5" />}
      secondaryActionOnClick={handleSecondaryAction}
      
      // Stats props
      stats={[
        { value: "15+", label: "Portfolio Templates" },
        { value: "Unlimited", label: "Projects & Media" },
        { value: "Advanced", label: "Customization" },
        { value: "Real-time", label: "Analytics" }
      ]}
      
      // Quote props
      quote="Your portfolio is your professional story told through compelling visuals and achievements—make every project count."
      attribution="EHRDC Creative Excellence Team"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="builder"
    />
  );
};

export default PortfolioPage;
