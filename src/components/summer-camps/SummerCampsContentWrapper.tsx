
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { useCamps } from './hooks/useCamps';
import { CampFilters } from '@/types/summerCamps';
import MemoizedSummerCampsContent from './MemoizedSummerCampsContent';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

const SummerCampsContentWrapper: React.FC = () => {
  const { t } = useTranslation('summer-camps');
  
  // Initialize with empty filters for the main display
  const filters: CampFilters = {};
  const { camps, loading, handleEnroll } = useCamps('available', filters);

  // Prepare stats data
  const stats = useMemo(() => [
    {
      value: camps.length.toString(),
      label: t('stats.totalCamps', 'Total Camps'),
      icon: Calendar
    },
    {
      value: camps.reduce((total, camp) => total + camp.capacity, 0).toString(),
      label: t('stats.totalCapacity', 'Total Capacity'),
      icon: Users
    },
    {
      value: camps.filter(camp => camp.rating && camp.rating >= 4.5).length.toString(),
      label: t('stats.topRated', 'Top Rated'),
      icon: Award
    },
    {
      value: [...new Set(camps.map(camp => camp.location))].length.toString(),
      label: t('stats.locations', 'Locations'),
      icon: MapPin
    }
  ], [camps, t]);

  // Transform camps data for the component
  const transformedCamps = useMemo(() => 
    camps.map(camp => ({
      title: camp.title,
      description: camp.description,
      duration: camp.duration,
      ageGroup: camp.age_group,
      location: camp.location,
      price: `${camp.price} AED`
    })), [camps]
  );

  const handleApplyClick = (campIndex: number) => {
    const camp = camps[campIndex];
    if (camp) {
      handleEnroll(camp.id);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (camps.length === 0) {
    return <EmptyState />;
  }

  return (
    <MemoizedSummerCampsContent
      stats={stats}
      camps={transformedCamps}
      t={t}
      onApplyClick={handleApplyClick}
    />
  );
};

export default SummerCampsContentWrapper;
