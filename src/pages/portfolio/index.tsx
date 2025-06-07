
import React from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import PortfolioEditor from '@/components/portfolio/PortfolioEditor';
import PortfolioViewer from '@/components/portfolio/PortfolioViewer';
import PortfolioVisibility from '@/components/portfolio/PortfolioVisibility';
import { Folder, Edit, Eye, Settings, Share, Heart } from 'lucide-react';

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

  // Define tabs for the Career Entry layout
  const tabs = [
    {
      id: 'editor',
      label: 'Editor',
      icon: <Edit className="h-4 w-4" />,
      content: (
        <PortfolioEditor 
          portfolio={mockPortfolio}
          onUpdate={handlePortfolioUpdate}
        />
      )
    },
    {
      id: 'viewer',
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
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      content: <PortfolioVisibility portfolio={mockPortfolio} />
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Share className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Share Your Portfolio</h3>
          <p className="text-muted-foreground">Generate shareable links and manage portfolio access permissions.</p>
        </div>
      )
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: <Folder className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Portfolio Templates</h3>
          <p className="text-muted-foreground">Choose from professional portfolio templates designed to showcase your work.</p>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <Eye className="h-4 w-4" />,
      content: (
        <div className="text-center py-12">
          <Eye className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Portfolio Analytics</h3>
          <p className="text-muted-foreground">Track views and engagement with your professional portfolio.</p>
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      // Hero props
      title="Professional Portfolio"
      description="Showcase your achievements, projects, and professional journey with a comprehensive digital portfolio that impresses employers"
      heroIcon={<Folder className="h-12 w-12" />}
      primaryActionLabel="Build Portfolio"
      primaryActionIcon={<Edit className="h-5 w-5" />}
      secondaryActionLabel="View Examples"
      secondaryActionIcon={<Eye className="h-5 w-5" />}
      
      // Stats props
      stats={[
        { value: "10+", label: "Portfolio Templates" },
        { value: "Unlimited", label: "Projects & Achievements" },
        { value: "Secure", label: "Privacy Controls" },
        { value: "Mobile", label: "Optimized Viewing" }
      ]}
      
      // Quote props
      quote="Your portfolio is a visual story of your professional journey—a powerful testament to your skills, creativity, and accomplishments."
      attribution="UAE Career Excellence Initiative"
      quoteIcon={<Heart className="h-12 w-12" />}
      
      // Tabs props
      tabs={tabs}
      defaultTab="editor"
    />
  );
};

export default PortfolioPage;
