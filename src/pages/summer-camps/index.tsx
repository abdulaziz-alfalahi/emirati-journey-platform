
import React, { useState } from 'react';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Sun, Users, Calendar, Award } from 'lucide-react';
import type { EducationStat, EducationTab } from '@/components/layouts/EducationPathwayLayout';

const SummerCampsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');

  const educationStats: EducationStat[] = [
    {
      value: "50+",
      label: "Summer Camps",
      icon: Sun
    },
    {
      value: "1,200+",
      label: "Happy Campers",
      icon: Users
    },
    {
      value: "8 weeks",
      label: "Camp Season",
      icon: Calendar
    },
    {
      value: "25+",
      label: "Activity Types",
      icon: Award
    }
  ];

  const educationTabs: EducationTab[] = [
    {
      id: "browse",
      label: "Browse Camps",
      icon: <Sun className="h-4 w-4" />,
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Summer Camps Available</h3>
          <p className="text-muted-foreground">Browse through our exciting summer camp offerings.</p>
        </div>
      )
    },
    {
      id: "enrolled",
      label: "My Camps",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">My Enrolled Camps</h3>
          <p className="text-muted-foreground">View your current camp enrollments.</p>
        </div>
      )
    }
  ];

  return (
    <EducationPathwayLayout
      title="Summer Camps"
      description="Discover amazing summer camp experiences for young Emiratis. Fun, learning, and adventure await!"
      icon={<Sun className="h-12 w-12 text-yellow-500" />}
      stats={educationStats}
      tabs={educationTabs}
      defaultTab="browse"
      actionButtonText="Browse Camps"
      actionButtonHref="#browse"
    />
  );
};

export default SummerCampsPage;
