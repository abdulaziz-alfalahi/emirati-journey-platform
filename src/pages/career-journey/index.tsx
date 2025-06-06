
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { CareerEntryHeroSection } from '@/components/career/CareerEntryHeroSection';
import CareerJourneyMap from '@/components/career/CareerJourneyMap';
import CareerPathComparison from '@/components/career/CareerPathComparison';
import ExportJourneyDialog from '@/components/career/ExportJourneyDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, GitCompare, Download, Navigation } from 'lucide-react';

const CareerJourneyPage: React.FC = () => {
  const { isMobile, isCapacitor } = useMobileDetection();
  const [activeTab, setActiveTab] = useState('journey');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Mock data for the components
  const mockPaths = [
    { id: '1', name: 'Software Engineering', description: 'Technology career path' },
    { id: '2', name: 'Digital Marketing', description: 'Marketing career path' }
  ];

  const mockJourneyData = {
    currentStage: 'Entry Level',
    goals: ['Get certified', 'Find mentor'],
    milestones: ['Complete training', 'Apply for jobs']
  };

  const content = (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Standardized Hero Section */}
      <CareerEntryHeroSection
        title="Career Journey Map"
        description="Visualize your career path, set milestones, and track your professional development journey with personalized insights"
        icon={<Navigation className="h-12 w-12" />}
        primaryActionLabel="Start My Journey"
        primaryActionIcon={<Map className="h-5 w-5" />}
        secondaryActionLabel="Compare Paths"
        secondaryActionIcon={<GitCompare className="h-5 w-5" />}
      />

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">500+</div>
              <div className="text-gray-600">Career Paths Mapped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">95%</div>
              <div className="text-gray-600">Goal Achievement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">25+</div>
              <div className="text-gray-600">Industry Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-ehrdc-teal mb-2">AI-Powered</div>
              <div className="text-gray-600">Recommendations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 bg-white border">
            <TabsTrigger value="journey" className="flex items-center gap-2 text-ehrdc-teal">
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Journey Map</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2 text-ehrdc-teal">
              <GitCompare className="h-4 w-4" />
              <span className="hidden sm:inline">Compare Paths</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 text-ehrdc-teal">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journey">
            <CareerJourneyMap />
          </TabsContent>
          
          <TabsContent value="comparison">
            <CareerPathComparison 
              availablePaths={mockPaths}
              isOpen={isComparisonOpen}
              onClose={() => setIsComparisonOpen(false)}
            />
          </TabsContent>
          
          <TabsContent value="export">
            <ExportJourneyDialog 
              isOpen={isExportOpen}
              onOpenChange={setIsExportOpen}
              elementRef={React.createRef()}
              journeyData={mockJourneyData}
            />
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

export default CareerJourneyPage;
