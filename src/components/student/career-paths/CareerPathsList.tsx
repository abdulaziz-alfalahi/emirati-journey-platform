
import React from 'react';
import { UserCareerPath } from '@/types/careerPath';
import { Button } from '@/components/ui/button';
import CareerPathCard from './CareerPathCard';
import EmptyCareerPathState from './EmptyCareerPathState';

interface CareerPathsListProps {
  userPaths: UserCareerPath[];
  onViewDetails: (userPath: UserCareerPath) => void;
  onDelete: (pathId: string) => void;
  deletingId: string | null;
  showViewAll?: boolean;
  onViewAll?: () => void;
  // Add new props to match what's being passed in UserCareerPaths.tsx
  showEnrollButton?: boolean;
  onEnroll?: (pathId: string) => void;
  emptyStateMessage?: string;
  emptyStateAction?: string;
}

const CareerPathsList: React.FC<CareerPathsListProps> = ({
  userPaths,
  onViewDetails,
  onDelete,
  deletingId,
  showViewAll = false,
  onViewAll,
  showEnrollButton,
  onEnroll,
  emptyStateMessage,
  emptyStateAction
}) => {
  if (userPaths.length === 0) {
    return <EmptyCareerPathState 
      message={emptyStateMessage} 
      action={emptyStateAction} 
    />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPaths.map((userPath) => (
          <CareerPathCard
            key={userPath.id}
            userPath={userPath}
            onViewDetails={() => onViewDetails(userPath)}
            onDelete={onDelete}
            isDeleting={deletingId === userPath.id}
            showEnrollButton={showEnrollButton}
            onEnroll={onEnroll}
          />
        ))}
      </div>
      
      {showViewAll && userPaths.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={onViewAll}>
            View All Career Paths
          </Button>
        </div>
      )}
    </>
  );
};

export default CareerPathsList;
