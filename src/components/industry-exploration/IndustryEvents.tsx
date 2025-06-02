
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, MapPin, Users, Clock, ExternalLink, 
  Video, Building, Star, Filter 
} from 'lucide-react';

export const IndustryEvents: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const events = [
    {
      id: 1,
      title: 'UAE AI & Robotics Summit 2024',
      industry: 'Technology',
      type: 'Conference',
      format: 'In-person',
      date: '2024-03-15',
      time: '09:00 - 17:00',
      location: 'Dubai World Trade Centre',
      organizer: 'Dubai Future Foundation',
      description: 'Explore the latest developments in AI and robotics with industry leaders and experts.',
      attendees: 2500,
      price: 'Free for UAE Nationals',
      highlights: ['Keynote by global AI leaders', 'Networking sessions', 'Job fair'],
      registrationUrl: '#',
      featured: true,
      emiratiDiscount: true
    },
    {
      id: 2,
      title: 'Banking Innovation Workshop',
      industry: 'Finance',
      type: 'Workshop',
      format: 'Hybrid',
      date: '2024-03-20',
      time: '14:00 - 18:00',
      location: 'ADGM, Abu Dhabi',
      organizer: 'Emirates NBD',
      description: 'Hands-on workshop on digital banking innovations and fintech trends.',
      attendees: 150,
      price: 'AED 500',
      highlights: ['Interactive sessions', 'Expert panels', 'Certificate of completion'],
      registrationUrl: '#',
      featured: false,
      emiratiDiscount: true
    },
    {
      id: 3,
      title: 'Renewable Energy Career Fair',
      industry: 'Energy',
      type: 'Job Fair',
      format: 'In-person',
      date: '2024-03-25',
      time: '10:00 - 16:00',
      location: 'Masdar City, Abu Dhabi',
      organizer: 'Masdar',
      description: 'Connect with leading renewable energy companies and explore career opportunities.',
      attendees: 1000,
      price: 'Free',
      highlights: ['Direct recruitment', '50+ employers', 'Career counseling'],
      registrationUrl: '#',
      featured: true,
      emiratiDiscount: false
    },
    {
      id: 4,
      title: 'Healthcare Digital Transformation',
      industry: 'Healthcare',
      type: 'Seminar',
      format: 'Virtual',
      date: '2024-04-02',
      time: '15:00 - 17:00',
      location: 'Online',
      organizer: 'Dubai Health Authority',
      description: 'Learn about digital health innovations and telemedicine opportunities.',
      attendees: 500,
      price: 'Free',
      highlights: ['Expert presentations', 'Q&A sessions', 'Digital certificates'],
      registrationUrl: '#',
      featured: false,
      emiratiDiscount: false
    },
    {
      id: 5,
      title: 'Tourism & Hospitality Expo',
      industry: 'Tourism',
      type: 'Exhibition',
      format: 'In-person',
      date: '2024-04-10',
      time: '09:00 - 18:00',
      location: 'Dubai International Convention Centre',
      organizer: 'Dubai Tourism',
      description: 'Showcase of tourism innovations and hospitality career opportunities.',
      attendees: 3000,
      price: 'AED 150',
      highlights: ['Industry exhibitions', 'Career zone', 'Cultural programs'],
      registrationUrl: '#',
      featured: true,
      emiratiDiscount: true
    },
    {
      id: 6,
      title: 'Construction Technology Summit',
      industry: 'Construction',
      type: 'Conference',
      format: 'Hybrid',
      date: '2024-04-15',
      time: '08:30 - 17:30',
      location: 'Conrad Dubai',
      organizer: 'Emaar Properties',
      description: 'Explore smart construction technologies and sustainable building practices.',
      attendees: 800,
      price: 'AED 750',
      highlights: ['Tech demos', 'Sustainability focus', 'Networking dinner'],
      registrationUrl: '#',
      featured: false,
      emiratiDiscount: true
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesIndustry = selectedIndustry === 'all' || event.industry === selectedIndustry;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesFormat = selectedFormat === 'all' || event.format === selectedFormat;
    return matchesIndustry && matchesType && matchesFormat;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'bg-blue-100 text-blue-800';
      case 'Workshop': return 'bg-green-100 text-green-800';
      case 'Job Fair': return 'bg-purple-100 text-purple-800';
      case 'Seminar': return 'bg-orange-100 text-orange-800';
      case 'Exhibition': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Virtual': return <Video className="h-4 w-4" />;
      case 'Hybrid': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AE', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ehrdc-teal">
            <Calendar className="h-5 w-5" />
            Industry Events Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-ehrdc-neutral-dark/70 mb-4">
            Discover upcoming events, networking opportunities, and professional development sessions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Energy">Energy</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Tourism">Tourism</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Job Fair">Job Fair</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Exhibition">Exhibition</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="In-person">In-person</SelectItem>
                <SelectItem value="Virtual">Virtual</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>

          <div className="mt-4 text-sm text-ehrdc-neutral-dark/70">
            Showing {filteredEvents.length} upcoming events
          </div>
        </CardContent>
      </Card>

      {/* Featured Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className={`hover:shadow-lg transition-shadow ${event.featured ? 'ring-2 ring-ehrdc-teal/20' : ''}`}>
            {event.featured && (
              <div className="bg-ehrdc-teal text-white px-3 py-1 text-xs font-medium">
                Featured Event
              </div>
            )}
            
            <CardContent className="p-6">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-ehrdc-teal mb-2">{event.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge variant="outline">{event.industry}</Badge>
                    {event.emiratiDiscount && (
                      <Badge className="bg-green-100 text-green-800">
                        <Star className="h-3 w-3 mr-1" />
                        Emirati Discount
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-ehrdc-teal" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-ehrdc-teal" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  {getFormatIcon(event.format)}
                  <span>{event.location}</span>
                  <Badge variant="outline" className="text-xs ml-2">
                    {event.format}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-ehrdc-teal" />
                  <span>{event.attendees.toLocaleString()} expected attendees</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-ehrdc-teal" />
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-ehrdc-neutral-dark/70 mb-4">{event.description}</p>

              {/* Event Highlights */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Event Highlights</h4>
                <div className="space-y-1">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="text-xs text-ehrdc-neutral-dark/70 flex items-center gap-2">
                      <div className="w-1 h-1 bg-ehrdc-teal rounded-full"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Registration */}
              <div className="flex items-center justify-between pt-4 border-t border-ehrdc-neutral-light/50">
                <div>
                  <div className="text-lg font-semibold text-ehrdc-teal">{event.price}</div>
                  {event.emiratiDiscount && (
                    <div className="text-xs text-green-600">Special rate for UAE nationals</div>
                  )}
                </div>
                <Button className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Host an Industry Event</h3>
          <p className="mb-4 opacity-90">
            Partner with EHRDC to organize events that connect Emirati talent with opportunities
          </p>
          <Button className="bg-white text-ehrdc-teal hover:bg-ehrdc-neutral-light">
            Partner With Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
