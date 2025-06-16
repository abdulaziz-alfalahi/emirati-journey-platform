
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Palette, Archive, Music, Camera } from 'lucide-react';
import { CulturalPreservationContent } from '@/components/cultural-preservation/CulturalPreservationContent';

const CulturalPreservationPage: React.FC = () => {
  const stats = [
    { value: "500+", label: "Cultural Artifacts", icon: Archive },
    { value: "200+", label: "Oral Histories", icon: Music },
    { value: "300+", label: "Digital Archives", icon: Camera },
    { value: "80+", label: "Active Preservationists", icon: Palette }
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
      icon: <Music className="h-4 w-4" />,
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
      label: 'Preservation Projects',
      icon: <Palette className="h-4 w-4" />,
      content: <CulturalPreservationContent activeTab="projects" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Cultural Preservation: Safeguarding Our Heritage for Tomorrow"
      description="Preserve and celebrate Emirati culture and heritage through digital archives, oral history projects, and community initiatives that ensure our rich traditions continue to inspire future generations."
      icon={<Palette className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="explore"
    />
  );
};

export default CulturalPreservationPage;
