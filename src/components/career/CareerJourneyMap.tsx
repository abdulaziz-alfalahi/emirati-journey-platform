
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserCareerPaths } from '@/services/careerPathService';
import { UserCareerPath } from '@/types/careerPath';
import ExportJourneyDialog from './ExportJourneyDialog';
import CareerPathComparison from './CareerPathComparison';
import JourneyMapHeader from './journey-map/JourneyMapHeader';
import JourneyMapLegend from './journey-map/JourneyMapLegend';
import CareerPathCard from './journey-map/CareerPathCard';
import { emiratiCareerPaths } from './journey-map/mockData';
import { CareerPath } from './journey-map/types';

const CareerJourneyMap: React.FC = () => {
  const { user } = useAuth();
  const [userCareerPaths, setUserCareerPaths] = useState<UserCareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const journeyMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserCareerPaths = async () => {
      if (!user) return;
      
      try {
        const paths = await getUserCareerPaths(user.id);
        setUserCareerPaths(paths);
      } catch (error) {
        console.error('Error fetching user career paths:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserCareerPaths();
  }, [user]);

  const filteredPaths = emiratiCareerPaths.filter(path => {
    if (selectedPath !== 'all' && path.id !== selectedPath) return false;
    if (selectedCategory !== 'all') {
      return path.stages.some(stage => stage.category === selectedCategory);
    }
    return true;
  });

  const exportData = {
    selectedPath,
    selectedCategory,
    filteredPaths,
    userCareerPaths,
    exportedAt: new Date().toISOString()
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <JourneyMapHeader
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenExport={() => setIsExportDialogOpen(true)}
        availablePaths={emiratiCareerPaths}
      />

      <JourneyMapLegend />

      <div ref={journeyMapRef} className="space-y-8">
        {filteredPaths.map(path => (
          <CareerPathCard 
            key={path.id} 
            path={path} 
            selectedCategory={selectedCategory}
          />
        ))}
      </div>

      <ExportJourneyDialog
        isOpen={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        elementRef={journeyMapRef}
        journeyData={exportData}
      />

      <CareerPathComparison
        availablePaths={emiratiCareerPaths}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </div>
  );
};

export default CareerJourneyMap;
