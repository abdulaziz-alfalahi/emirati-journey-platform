
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { CulturalEvent, CulturalCalendarEvent } from '@/types/cultural-preservation';

interface CulturalEventsCalendarProps {
  events?: CulturalEvent[];
  calendarEvents?: CulturalCalendarEvent[];
}

export const CulturalEventsCalendar: React.FC<CulturalEventsCalendarProps> = ({
  events = [],
  calendarEvents = []
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock cultural events
  const mockEvents: CulturalEvent[] = [
    {
      id: '1',
      event_name_ar: 'مهرجان الشعر النبطي',
      event_name_en: 'Nabati Poetry Festival',
      event_type: 'festival',
      description: 'Annual celebration of traditional Emirati poetry with performances by renowned poets',
      cultural_significance: 'Preserves the oral tradition of Nabati poetry',
      organizer_id: 'org1',
      location: 'Cultural Foundation, Abu Dhabi',
      start_date: '2024-02-15',
      end_date: '2024-02-17',
      registration_required: true,
      max_participants: 500,
      current_participants: 287,
      age_groups: ['adults', 'seniors'],
      traditional_elements: ['poetry recitation', 'traditional music', 'henna art'],
      language_of_instruction: 'arabic',
      cultural_protocols: ['traditional dress encouraged', 'respect for elders'],
      image_url: '/cultural-events/poetry-festival.jpg',
      created_at: '2024-01-10',
      status: 'open'
    },
    {
      id: '2',
      event_name_ar: 'ورشة صناعة السدو',
      event_name_en: 'Sadu Weaving Workshop',
      event_type: 'workshop',
      description: 'Learn the traditional art of Sadu weaving from master craftswomen',
      cultural_significance: 'Hands-on preservation of traditional Bedouin textile art',
      organizer_id: 'org2',
      location: 'Emirates Heritage Club, Dubai',
      start_date: '2024-02-20',
      end_date: '2024-02-22',
      registration_required: true,
      max_participants: 20,
      current_participants: 18,
      age_groups: ['teens', 'adults'],
      skills_taught: ['sadu weaving', 'traditional patterns', 'natural dyeing'],
      traditional_elements: ['traditional tools', 'authentic materials'],
      language_of_instruction: 'bilingual',
      cultural_protocols: ['modest dress required', 'respectful learning environment'],
      created_at: '2024-01-15',
      status: 'open'
    },
    {
      id: '3',
      event_name_ar: 'أمسية القهوة العربية',
      event_name_en: 'Arabic Coffee Cultural Evening',
      event_type: 'educational',
      description: 'Experience the rich traditions surrounding Arabic coffee preparation and serving',
      cultural_significance: 'Celebrates the UNESCO-recognized tradition of Arabic coffee',
      organizer_id: 'org3',
      location: 'Al Jahili Fort, Al Ain',
      start_date: '2024-03-05',
      end_date: '2024-03-05',
      registration_required: false,
      current_participants: 67,
      age_groups: ['all ages'],
      traditional_elements: ['coffee roasting', 'dallah ceremony', 'traditional hospitality'],
      language_of_instruction: 'bilingual',
      cultural_protocols: ['traditional greeting customs', 'coffee etiquette'],
      created_at: '2024-01-20',
      status: 'open'
    }
  ];

  // Mock traditional calendar events
  const mockCalendarEvents: CulturalCalendarEvent[] = [
    {
      id: '1',
      event_name: 'UAE National Day',
      event_type: 'national',
      date_type: 'fixed',
      primary_date: '2024-12-02',
      cultural_significance: 'Celebrates the formation of the UAE in 1971',
      traditional_activities: ['flag ceremonies', 'heritage performances', 'traditional food'],
      modern_celebrations: ['fireworks', 'air shows', 'cultural festivals'],
      regional_variations: ['emirate-specific celebrations', 'local heritage shows'],
      preparation_timeline: ['decorations 2 weeks prior', 'event planning 1 month prior'],
      community_involvement_opportunities: ['volunteer at events', 'cultural performances'],
      educational_resources: ['history documentaries', 'heritage center visits'],
      is_public_holiday: true,
      celebration_status: 'widely_celebrated'
    },
    {
      id: '2',
      event_name: 'Ramadan',
      event_type: 'religious',
      date_type: 'lunar',
      primary_date: '2024-03-11',
      cultural_significance: 'Holy month of fasting, reflection, and community',
      traditional_activities: ['iftar gatherings', 'Quran recitation', 'charity giving'],
      modern_celebrations: ['Ramadan tents', 'community iftar events', 'cultural programs'],
      regional_variations: ['family traditions', 'community customs'],
      preparation_timeline: ['spiritual preparation', 'community planning'],
      community_involvement_opportunities: ['charity work', 'community iftar hosting'],
      educational_resources: ['Islamic studies', 'cultural awareness programs'],
      is_public_holiday: false,
      celebration_status: 'widely_celebrated'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'workshop': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'educational': return 'bg-green-100 text-green-800 border-green-200';
      case 'performance': return 'bg-red-100 text-red-800 border-red-200';
      case 'exhibition': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderUpcomingEvents = () => (
    <div className="space-y-4">
      {mockEvents.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{event.event_name_en}</CardTitle>
                  <Badge className={getEventTypeColor(event.event_type)}>
                    {event.event_type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {event.event_name_ar}
                </p>
                <p className="text-muted-foreground text-sm">
                  {event.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  {event.registration_required ? 'Register' : 'Attend'}
                </Button>
                <Button size="sm" variant="outline">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-ehrdc-teal" />
                <span className="text-sm">
                  {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-ehrdc-teal" />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-ehrdc-teal" />
                <span className="text-sm">
                  {event.current_participants} 
                  {event.max_participants && ` / ${event.max_participants}`} participants
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Traditional Elements:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.traditional_elements.map((element, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {event.skills_taught && (
                <div>
                  <span className="text-sm font-medium">Skills Taught:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.skills_taught.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <strong>Cultural Significance:</strong> {event.cultural_significance}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTraditionalCalendar = () => (
    <div className="space-y-4">
      {mockCalendarEvents.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{event.event_name}</CardTitle>
                  <Badge variant="outline">{event.event_type}</Badge>
                  {event.is_public_holiday && (
                    <Badge variant="success">Public Holiday</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  {event.cultural_significance}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-ehrdc-teal" />
                  <span>{new Date(event.primary_date).toLocaleDateString()}</span>
                </div>
                <Badge variant="outline" className="mt-1">
                  {event.date_type} date
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Traditional Activities</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {event.traditional_activities.map((activity, index) => (
                    <li key={index}>• {activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Modern Celebrations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {event.modern_celebrations.map((celebration, index) => (
                    <li key={index}>• {celebration}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Community Involvement</h4>
              <div className="flex flex-wrap gap-1">
                {event.community_involvement_opportunities.map((opportunity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {opportunity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCreateEvent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-ehrdc-teal" />
          Organize a Cultural Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Share your cultural knowledge and bring the community together by organizing 
            workshops, festivals, or educational events that celebrate Emirati heritage.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
              <Plus className="h-4 w-4 mr-2" />
              Create Workshop
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Plan Festival
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Educational Event
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-ehrdc-teal" />
            Cultural Events & Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Discover upcoming cultural events, workshops, and traditional celebrations 
            that connect you with Emirati heritage and community.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="calendar">Traditional Calendar</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">{renderUpcomingEvents()}</TabsContent>
        <TabsContent value="calendar">{renderTraditionalCalendar()}</TabsContent>
        <TabsContent value="create">{renderCreateEvent()}</TabsContent>
      </Tabs>
    </div>
  );
};
