
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
}

const CareerPathsList: React.FC<CareerPathsListProps> = ({
  userPaths,
  onViewDetails,
  onDelete,
  deletingId,
  showViewAll = false,
  onViewAll
}) => {
  if (userPaths.length === 0) {
    return <EmptyCareerPathState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPaths.map((userPath) => (
          <CareerPathCard
            key={userPath.id}
            userPath={userPath}
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            isDeleting={deletingId === userPath.id}
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
