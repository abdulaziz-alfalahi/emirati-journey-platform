
import React from 'react';
import { SummerCamp, CampFilters } from '@/types/summerCamps';
import CampCard from './CampCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { useCamps } from './hooks/useCamps';

interface CampsListProps {
  type: "available" | "registered" | "managed";
  filters: CampFilters;
  searchQuery: string;
}

const CampsList: React.FC<CampsListProps> = ({ type, filters, searchQuery }) => {
  // Combine filters into the format expected by the service
  const combinedFilters: CampFilters = {
    ...filters,
    searchQuery
  };
  
  const { camps, loading, handleEnroll, handleCancelEnrollment, enrolledCamps } = useCamps(type, combinedFilters);

  if (loading) {
    return <LoadingState />;
  }
  
  if (camps.length === 0) {
    return <EmptyState type={type} />;
  }
  
  return (
    <div className="space-y-6">
      {camps.map(camp => (
        <CampCard
          key={camp.id}
          camp={camp}
          type={type}
          onEnroll={handleEnroll}
          onCancel={handleCancelEnrollment}
          isEnrolled={Boolean(enrolledCamps[camp.id])}
        />
      ))}
    </div>
  );
};

export default CampsList;
