
import React from 'react';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Users, Heart, Calendar, Award } from 'lucide-react';
import { IntergenerationalProgramsContent } from '@/components/intergenerational-programs/IntergenerationalProgramsContent';

const IntergenerationalProgramsPage: React.FC = () => {
  const stats = [
    { value: "60+", label: "Active Programs", icon: Users },
    { value: "1200+", label: "Participants", icon: Heart },
    { value: "300+", label: "Events This Year", icon: Calendar },
    { value: "95%", label: "Satisfaction Rate", icon: Award }
  ];

  const tabs = [
    {
      id: 'programs',
      label: 'Browse Programs',
      icon: <Users className="h-4 w-4" />,
      content: <IntergenerationalProgramsContent activeTab="programs" />
    },
    {
      id: 'my-programs',
      label: 'My Programs',
      icon: <Heart className="h-4 w-4" />,
      content: <IntergenerationalProgramsContent activeTab="my-programs" />
    },
    {
      id: 'events',
      label: 'Upcoming Events',
      icon: <Calendar className="h-4 w-4" />,
      content: <IntergenerationalProgramsContent activeTab="events" />
    },
    {
      id: 'create',
      label: 'Create Program',
      icon: <Award className="h-4 w-4" />,
      content: <IntergenerationalProgramsContent activeTab="create" />
    }
  ];

  return (
    <LifelongEngagementLayout
      title="Intergenerational Programs: Bridging Generations Through Connection"
      description="Connect with people across age groups through meaningful programs that foster understanding, share knowledge, and create lasting bonds between generations in our community."
      icon={<Users className="h-8 w-8" />}
      stats={stats}
      tabs={tabs}
      defaultTab="programs"
    />
  );
};

export default IntergenerationalProgramsPage;
