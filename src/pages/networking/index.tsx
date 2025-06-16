
import React from 'react';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent, EmptyTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  Briefcase,
  Coffee,
  Building,
  TrendingUp
} from 'lucide-react';

const NetworkingEventsPage: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: "150+",
      label: "Monthly Events",
      icon: Calendar
    },
    {
      value: "5,000+",
      label: "Active Members",
      icon: Users
    },
    {
      value: "50+",
      label: "Industry Partners",
      icon: Building
    },
    {
      value: "4.7/5",
      label: "Event Rating",
      icon: Star
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "events",
      label: "Upcoming Events",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Upcoming Networking Events"
          icon={<Calendar className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Discover and register for upcoming professional networking events"
        >
          <EmptyTabContent
            icon={Calendar}
            title="Networking Events"
            description="Explore upcoming networking events, conferences, and professional gatherings across the UAE."
            actionLabel="View Events"
            onAction={() => console.log("View networking events")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "my-events",
      label: "My Events",
      icon: <Star className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="My Registered Events"
          icon={<Star className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Manage your event registrations and track attendance"
        >
          <EmptyTabContent
            icon={Star}
            title="My Events"
            description="View your registered events, past attendance, and networking achievements."
            actionLabel="View My Events"
            onAction={() => console.log("View my events")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "meetups",
      label: "Informal Meetups",
      icon: <Coffee className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Informal Networking Meetups"
          icon={<Coffee className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Join casual networking meetups and coffee chats"
        >
          <EmptyTabContent
            icon={Coffee}
            title="Informal Meetups"
            description="Participate in casual networking opportunities like coffee chats and informal industry meetups."
            actionLabel="Find Meetups"
            onAction={() => console.log("Find informal meetups")}
          />
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "virtual",
      label: "Virtual Networking",
      icon: <MapPin className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title="Virtual Networking"
          icon={<MapPin className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description="Connect with professionals through online networking platforms"
        >
          <EmptyTabContent
            icon={MapPin}
            title="Virtual Networking"
            description="Join virtual networking sessions and connect with professionals from around the world."
            actionLabel="Join Virtual Events"
            onAction={() => console.log("Join virtual networking")}
          />
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Networking Events"
      description="Build meaningful professional connections through structured networking events, industry meetups, and collaborative opportunities across various sectors"
      icon={<Users className="h-8 w-8 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="events"
    />
  );
};

export default NetworkingEventsPage;
