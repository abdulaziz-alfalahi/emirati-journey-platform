
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Palette, Archive, Music, Camera, Calendar, Users, FileText, Video } from 'lucide-react';
import { CulturalPreservationContent } from '@/components/cultural-preservation/CulturalPreservationContent';

const CulturalPreservationPage: React.FC = () => {
  const stats = [
    { value: "2,847+", label: "Cultural Stories", icon: FileText },
    { value: "156+", label: "Traditional Skills", icon: Archive },
    { value: "1,234+", label: "Historical Photos", icon: Camera },
    { value: "89+", label: "Video Documents", icon: Video }
  ];

  const tabs = [
    {
      id: 'explore',
      label: 'Explore Heritage',
      icon: <Archive className="h-4 w-4" />,
      content: <CulturalPreservationContent activeTab="explore" />
    },
    {
      id: 'contribute',
      label: 'Contribute Stories',
      icon: <FileText className="h-4 w-4" />,
      content: <CulturalPreservationContent activeTab="contribute" />
    },
    {
      id: 'digital-archive',
      label: 'Digital Archive',
      icon: <Camera className="h-4 w-4" />,
      content: <CulturalPreservationContent activeTab="digital-archive" />
    },
    {
      id: 'projects',
      label: 'Cultural Events',
      icon: <Calendar className="h-4 w-4" />,
      content: <CulturalPreservationContent activeTab="projects" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Cultural Preservation: Safeguarding Our Heritage for Tomorrow"
      description="Preserve and celebrate Emirati culture and heritage through digital archives, storytelling, traditional skills documentation, and community events that ensure our rich traditions continue to inspire future generations."
      icon={<Palette className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="explore"
    />
  );
};

export default CulturalPreservationPage;
