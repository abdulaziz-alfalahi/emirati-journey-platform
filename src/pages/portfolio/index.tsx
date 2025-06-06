
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import { PortfolioEditor } from '@/components/portfolio/PortfolioEditor';
import { PortfolioViewer } from '@/components/portfolio/PortfolioViewer';
import { PortfolioVisibility } from '@/components/portfolio/PortfolioVisibility';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Folder, Edit, Eye, Settings, Share } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('editor');

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Professional Portfolio"
        description="Showcase your achievements, projects, and professional journey with a comprehensive digital portfolio that impresses employers"
        icon={<Folder className="h-12 w-12" />}
        primaryActionLabel="Build Portfolio"
        primaryActionIcon={<Edit className="h-5 w-5" />}
        secondaryActionLabel="View Examples"
        secondaryActionIcon={<Eye className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">10+</div>
              <div className="text-gray-600">Portfolio Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Unlimited</div>
              <div className="text-gray-600">Projects & Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Secure</div>
              <div className="text-gray-600">Privacy Controls</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">Mobile</div>
              <div className="text-gray-600">Optimized Viewing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border">
            <TabsTrigger value="editor" className="flex items-center gap-2 text-ehrdc-teal">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="viewer" className="flex items-center gap-2 text-ehrdc-teal">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 text-ehrdc-teal">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2 text-ehrdc-teal">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <PortfolioEditor />
          </TabsContent>
          
          <TabsContent value="viewer">
            <PortfolioViewer />
          </TabsContent>
          
          <TabsContent value="settings">
            <PortfolioVisibility />
          </TabsContent>
          
          <TabsContent value="share">
            <div className="text-center py-12">
              <Share className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Share Your Portfolio</h3>
              <p className="text-gray-600">Generate shareable links and manage portfolio access permissions.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  if (isMobile || isCapacitor) {
    return <MobileLayout>{content}</MobileLayout>;
  }

  return <Layout>{content}</Layout>;
};

export default PortfolioPage;
