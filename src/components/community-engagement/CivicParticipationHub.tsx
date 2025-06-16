
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, Users, Calendar, MapPin, Clock, Building, Heart, Megaphone } from 'lucide-react';
import { CivicParticipation, CommunityEvent, VolunteerOpportunity } from '@/types/community-engagement';

interface CivicParticipationHubProps {
  initiatives?: CivicParticipation[];
  events?: CommunityEvent[];
  opportunities?: VolunteerOpportunity[];
}

export const CivicParticipationHub: React.FC<CivicParticipationHubProps> = ({
  initiatives = [],
  events = [],
  opportunities = []
}) => {
  const [activeTab, setActiveTab] = useState<'initiatives' | 'events' | 'volunteer'>('initiatives');

  const mockInitiatives: CivicParticipation[] = [
    {
      id: '1',
      initiative_title: 'Community Garden Development',
      description: 'Help design and establish community gardens in residential areas to promote sustainable living and community bonding.',
      category: 'environmental',
      organizer: 'Dubai Municipality',
      participation_type: 'volunteer',
      time_commitment: '2-3 hours weekly',
      skills_needed: ['Gardening', 'Community organizing', 'Project planning'],
      impact_area: 'Environmental sustainability and community health',
      created_at: new Date().toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      initiative_title: 'Senior Citizen Support Network',
      description: 'Establish a support network to help elderly residents with daily activities and provide companionship.',
      category: 'community_improvement',
      organizer: 'Community Welfare Department',
      participation_type: 'volunteer',
      time_commitment: '4-6 hours weekly',
      skills_needed: ['Communication', 'Empathy', 'Time management'],
      impact_area: 'Social welfare and community support',
      created_at: new Date().toISOString(),
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const mockEvents: CommunityEvent[] = [
    {
      id: '1',
      title: 'Community Vision 2030 Discussion',
      description: 'Join fellow residents in discussing our neighborhood\'s development priorities for the next decade.',
      organizer_id: 'organizer1',
      event_type: 'civic',
      location: 'Community Center Hall',
      is_virtual: false,
      start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
      max_participants: 100,
      current_participants: 45,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Cultural Heritage Workshop',
      description: 'Learn traditional Emirati crafts and stories from community elders.',
      organizer_id: 'organizer2',
      event_type: 'cultural',
      location: 'Heritage Center',
      is_virtual: false,
      start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
      max_participants: 30,
      current_participants: 18,
      created_at: new Date().toISOString()
    }
  ];

  const getCategoryIcon = (category: CivicParticipation['category']) => {
    switch (category) {
      case 'local_government': return <Building className="h-4 w-4" />;
      case 'community_improvement': return <Users className="h-4 w-4" />;
      case 'environmental': return <Heart className="h-4 w-4" />;
      case 'education': return <Users className="h-4 w-4" />;
      case 'healthcare': return <Heart className="h-4 w-4" />;
      default: return <Vote className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: CivicParticipation['category']) => {
    switch (category) {
      case 'local_government': return 'bg-blue-100 text-blue-800';
      case 'community_improvement': return 'bg-green-100 text-green-800';
      case 'environmental': return 'bg-emerald-100 text-emerald-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'healthcare': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: CommunityEvent['event_type']) => {
    switch (type) {
      case 'workshop': return <Users className="h-4 w-4" />;
      case 'discussion': return <Megaphone className="h-4 w-4" />;
      case 'volunteer': return <Heart className="h-4 w-4" />;
      case 'cultural': return <Calendar className="h-4 w-4" />;
      case 'civic': return <Vote className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Civic Participation Hub</h2>
          <p className="text-muted-foreground">Engage with your community and make a difference</p>
        </div>
        <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
          <Vote className="h-4 w-4 mr-2" />
          Start Initiative
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('initiatives')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'initiatives'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <Vote className="h-4 w-4 inline mr-2" />
          Civic Initiatives
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'events'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <Calendar className="h-4 w-4 inline mr-2" />
          Community Events
        </button>
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'volunteer'
              ? 'text-ehrdc-teal border-b-2 border-ehrdc-teal'
              : 'text-muted-foreground hover:text-ehrdc-teal'
          }`}
        >
          <Heart className="h-4 w-4 inline mr-2" />
          Volunteer
        </button>
      </div>

      {activeTab === 'initiatives' && (
        <div className="grid gap-6">
          {mockInitiatives.map((initiative) => (
            <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{initiative.initiative_title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getCategoryColor(initiative.category)}>
                        {getCategoryIcon(initiative.category)}
                        <span className="ml-1 capitalize">{initiative.category.replace('_', ' ')}</span>
                      </Badge>
                      <Badge variant="outline">
                        {initiative.participation_type.charAt(0).toUpperCase() + initiative.participation_type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{initiative.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Organizer
                    </h4>
                    <p className="text-sm text-muted-foreground">{initiative.organizer}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Commitment
                    </h4>
                    <p className="text-sm text-muted-foreground">{initiative.time_commitment}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Skills Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {initiative.skills_needed.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Impact Area</h4>
                  <p className="text-sm text-muted-foreground">{initiative.impact_area}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {initiative.deadline && (
                      <span>Deadline: {formatDate(initiative.deadline)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                    <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      Get Involved
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="grid gap-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-ehrdc-teal/10 rounded-lg flex items-center justify-center text-ehrdc-teal">
                      {getEventTypeIcon(event.event_type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-purple-100 text-purple-800">
                          {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                        </Badge>
                        {!event.is_virtual && (
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            In-Person
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date & Time
                    </h4>
                    <p className="text-sm text-muted-foreground">{formatDate(event.start_date)}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {event.is_virtual ? 'Virtual Event' : event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.current_participants}/{event.max_participants} attending
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'volunteer' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-ehrdc-teal" />
                Volunteer Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Find meaningful volunteer opportunities that match your skills and interests.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  Browse Opportunities
                </Button>
                <Button variant="outline">
                  My Applications
                </Button>
                <Button variant="outline">
                  Volunteer History
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Library Support</h3>
                    <p className="text-sm text-muted-foreground">Help with reading programs and book organization</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline">Weekends</Badge>
                    <Badge variant="outline">No Experience Required</Badge>
                  </div>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Youth Mentorship Program</h3>
                    <p className="text-sm text-muted-foreground">Guide young people in career and life decisions</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline">2-3 hours/week</Badge>
                    <Badge variant="outline">Experience Preferred</Badge>
                  </div>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
