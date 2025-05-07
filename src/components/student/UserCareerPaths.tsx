
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useCareerPaths } from './career-paths/hooks/useCareerPaths';
import CareerPathsList from './career-paths/CareerPathsList';
import PathDetailsView from './career-paths/PathDetailsView';

interface UserCareerPathsProps {
  onViewAll?: () => void;
  limit?: number;
  showViewAll?: boolean;
}

const UserCareerPaths: React.FC<UserCareerPathsProps> = ({ 
  onViewAll, 
  limit,
  showViewAll = false
}) => {
  const { 
    loading, 
    userPaths, 
    selectedPath, 
    deleting, 
    handleViewDetails, 
    handleDeletePath, 
    setSelectedPath 
  } = useCareerPaths(limit);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedPath) {
    return (
      <PathDetailsView 
        selectedPath={selectedPath}
        onBack={() => setSelectedPath(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <CareerPathsList 
        userPaths={userPaths}
        onViewDetails={handleViewDetails}
        onDelete={handleDeletePath}
        deletingId={deleting}
        showViewAll={showViewAll}
        onViewAll={onViewAll}
      />
    </div>
  );
};

export default UserCareerPaths;
