
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Calendar, Search, Filter, Plus } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CommunityCard } from '@/components/professional-growth/CommunityCard';
import { EventCard } from '@/components/professional-growth/EventCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Community {
  id: string;
  name: string;
  description: string;
  community_type: string;
  industry_focus: string[];
  size: string;
  location_type: string;
  physical_location?: string;
  benefits?: string[];
  website_url?: string;
  logo_url?: string;
  featured: boolean;
  membership_type: string;
  membership_fee?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  end_date?: string;
  location: string;
  registration_url?: string;
  image_url?: string;
  community: {
    name: string;
    logo_url?: string;
  };
}

const CommunitiesPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const { data: communities = [], isLoading: loadingCommunities } = useQuery({
    queryKey: ['professional-communities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professional_communities')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('name');

      if (error) throw error;
      return data as Community[];
    }
  });

  const { data: events = [], isLoading: loadingEvents } = useQuery({
    queryKey: ['community-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_events')
        .select(`
          *,
          community:community_id (
            name,
            logo_url
          )
        `)
        .eq('status', 'upcoming')
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    }
  });

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = !searchQuery || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || 
      community.industry_focus.some(industry => industry.toLowerCase().includes(industryFilter.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || community.community_type === typeFilter;
    const matchesLocation = locationFilter === 'all' || community.location_type === locationFilter;
    
    return matchesSearch && matchesIndustry && matchesType && matchesLocation;
  });

  const featuredCommunities = communities.filter(community => community.featured);

  // Extract unique values for filters
  const industries = Array.from(new Set(communities.flatMap(c => c.industry_focus))).sort();
  const communityTypes = Array.from(new Set(communities.map(c => c.community_type))).sort();
  const locationTypes = Array.from(new Set(communities.map(c => c.location_type))).sort();

  const handleAddCommunity = () => {
    toast({
      title: "Admin: Manage Communities",
      description: "Community management functionality will be available soon.",
    });
  };

  const FilterControls = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Filter Communities</CardTitle>
        <CardDescription>
          Narrow down communities based on your interests and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {communityTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locationTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setIndustryFilter('all');
              setTypeFilter('all');
              setLocationFilter('all');
            }}
          >
            Reset Filters
          </Button>
          {user && hasRole('administrator') && (
            <Button onClick={handleAddCommunity} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Community
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const CommunitiesGrid = ({ communities }: { communities: Community[] }) => {
    if (loadingCommunities) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg"></div>
            </div>
          ))}
        </div>
      );
    }

    if (communities.length === 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No communities found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <CommunityCard 
            key={community.id} 
            community={community} 
            featured={community.featured}
          />
        ))}
      </div>
    );
  };

  const EventsGrid = ({ events }: { events: Event[] }) => {
    if (loadingEvents) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          ))}
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
          <p className="text-muted-foreground">
            Check back soon for new community events and activities.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: `${communities.length}+`,
      label: "Active Communities",
      icon: Users,
    },
    {
      value: `${events.length}`,
      label: "Upcoming Events", 
      icon: Calendar,
    },
    {
      value: `${industries.length}+`,
      label: "Industries Covered",
      icon: Search,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Communities",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Discover Professional Communities</h2>
            <p className="text-muted-foreground">
              Find and join communities that align with your professional interests and career goals
            </p>
          </div>
          <FilterControls />
          <CommunitiesGrid communities={filteredCommunities} />
        </div>
      )
    },
    {
      id: "featured",
      label: "Featured Communities",
      icon: <Filter className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Featured Communities</h2>
            <p className="text-muted-foreground">
              Handpicked communities offering exceptional value and opportunities
            </p>
          </div>
          {loadingCommunities ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : featuredCommunities.length > 0 ? (
            <div className="space-y-6">
              {featuredCommunities.map(community => (
                <Card key={community.id} className="overflow-hidden border-ehrdc-teal/20">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-muted p-6 flex items-center justify-center">
                      {community.logo_url ? (
                        <img 
                          src={community.logo_url} 
                          alt={community.name} 
                          className="max-h-40 max-w-full object-contain"
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-ehrdc-teal/10 flex items-center justify-center">
                          <Users className="h-16 w-16 text-ehrdc-teal" />
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold">{community.name}</h3>
                        <Badge variant="outline" className="bg-ehrdc-teal/10 text-ehrdc-teal border-ehrdc-teal/20">
                          Featured
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{community.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Type</p>
                          <p className="text-sm text-muted-foreground">{community.community_type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Size</p>
                          <p className="text-sm text-muted-foreground">{community.size}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{community.location_type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Membership</p>
                          <p className="text-sm text-muted-foreground">
                            {community.membership_type}
                            {community.membership_fee && ` (${community.membership_fee})`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {community.industry_focus.map((industry, i) => (
                          <Badge key={i} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      
                      {community.benefits && community.benefits.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Benefits:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {community.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2">•</span> {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">Join Community</Button>
                        {community.website_url && (
                          <Button variant="outline" asChild>
                            <a href={community.website_url} target="_blank" rel="noopener noreferrer">
                              Visit Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No featured communities</h3>
              <p className="text-muted-foreground">Check back soon for featured community highlights.</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: "events",
      label: "Upcoming Events",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Upcoming Community Events</h2>
            <p className="text-muted-foreground">
              Discover networking events, workshops, and conferences hosted by professional communities
            </p>
          </div>
          <EventsGrid events={events} />
        </div>
      )
    },
    {
      id: "finder",
      label: "Find Your Community",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Find Your Perfect Community</h2>
            <p className="text-muted-foreground">
              Answer a few questions to discover communities that match your professional interests and goals
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">What industry are you most interested in?</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">What type of community are you looking for?</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select community type" />
                    </SelectTrigger>
                    <SelectContent>
                      {communityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Do you prefer in-person or virtual communities?</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="In-person">In-person</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="No preference">No preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">What are your primary goals for joining a community?</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Networking">Networking</SelectItem>
                      <SelectItem value="Learning">Learning & Skill Development</SelectItem>
                      <SelectItem value="Career">Career Advancement</SelectItem>
                      <SelectItem value="Mentorship">Mentorship</SelectItem>
                      <SelectItem value="Business">Business Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                  Find Communities
                </Button>
                
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm text-center text-muted-foreground">
                    This feature will provide personalized community recommendations based on your selections.
                    <br />
                    For now, please use the filters in the "All Communities" tab.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Professional Communities"
      description="Connect with like-minded professionals. Discover and join communities, associations, and interest groups aligned with your career goals and passions."
      icon={<Users className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default CommunitiesPage;
