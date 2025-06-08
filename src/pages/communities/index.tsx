
import React, { useState, useEffect } from 'react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Plus, ExternalLink } from 'lucide-react';
import { CommunityCard } from '@/components/professional-growth/CommunityCard';
import { EventCard } from '@/components/professional-growth/EventCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalCommunity {
  id: string;
  name: string;
  description: string;
  community_type: string;
  industry_focus: string[];
  size: string;
  founding_year?: number;
  meeting_frequency?: string;
  location_type: string;
  physical_location?: string;
  membership_type: string;
  membership_fee?: string;
  benefits?: string[];
  website_url?: string;
  application_url?: string;
  logo_url?: string;
  featured: boolean;
  status: string;
}

interface CommunityEvent {
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

const CommunitiesPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [communities, setCommunities] = useState<ProfessionalCommunity[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [industryFilter, setIndustryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch communities
        const { data: communitiesData, error: communitiesError } = await supabase
          .from('professional_communities')
          .select('*')
          .eq('status', 'active')
          .order('featured', { ascending: false })
          .order('name');
          
        if (communitiesError) throw communitiesError;
        
        // Fetch events with community information
        const { data: eventsData, error: eventsError } = await supabase
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
          
        if (eventsError) throw eventsError;
        
        setCommunities(communitiesData || []);
        setEvents(eventsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load communities and events',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  const filteredCommunities = communities.filter(community => {
    let matches = true;
    
    if (industryFilter && !community.industry_focus.includes(industryFilter)) {
      matches = false;
    }
    
    if (typeFilter && community.community_type !== typeFilter) {
      matches = false;
    }
    
    if (locationFilter && community.location_type !== locationFilter) {
      matches = false;
    }
    
    if (membershipFilter && community.membership_type !== membershipFilter) {
      matches = false;
    }
    
    return matches;
  });
  
  const featuredCommunities = communities.filter(community => community.featured);
  
  // Extract unique values for filters
  const industries = Array.from(new Set(communities.flatMap(c => c.industry_focus))).sort();
  const communityTypes = Array.from(new Set(communities.map(c => c.community_type))).sort();
  const locationTypes = Array.from(new Set(communities.map(c => c.location_type))).sort();
  const membershipTypes = Array.from(new Set(communities.map(c => c.membership_type))).sort();
  
  const handleAddCommunity = () => {
    toast({
      title: "Admin: Manage Communities",
      description: "Coming Soon - Community management functionality will be available here.",
    });
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
      value: `${industries.length}`,
      label: "Industries Covered",
      icon: Users,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Communities",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Filter Communities</CardTitle>
              <CardDescription>
                Narrow down communities based on your interests and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Industry Focus</label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Industries</SelectItem>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Community Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {communityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Location Type</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {locationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Membership</label>
                  <Select value={membershipFilter} onValueChange={setMembershipFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {membershipTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIndustryFilter('');
                    setTypeFilter('');
                    setLocationFilter('');
                    setMembershipFilter('');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading communities...</p>
            </div>
          ) : filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map(community => (
                <CommunityCard 
                  key={community.id} 
                  community={community} 
                  featured={community.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No communities found</h3>
              <p className="text-muted-foreground">No communities match your filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: "featured",
      label: "Featured Communities",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading featured communities...</p>
            </div>
          ) : featuredCommunities.length > 0 ? (
            <div className="space-y-6">
              {featuredCommunities.map(community => (
                <Card key={community.id} className="overflow-hidden border-primary/20">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-muted p-6 flex items-center justify-center">
                      {community.logo_url ? (
                        <img 
                          src={community.logo_url} 
                          alt={community.name} 
                          className="max-h-40 max-w-full object-contain"
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-16 w-16 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-2xl font-bold mb-2">{community.name}</h3>
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
                      
                      <div className="flex gap-3">
                        <Button>View Details</Button>
                        {community.website_url && (
                          <Button variant="outline" asChild>
                            <a href={community.website_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
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
              <p className="text-muted-foreground">No featured communities available at this time.</p>
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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">No upcoming events at this time.</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: "finder",
      label: "Find Your Community",
      icon: <Users className="h-4 w-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Find Your Perfect Community</CardTitle>
            <CardDescription>
              Answer a few questions to discover communities that match your professional interests and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <Button className="w-full">
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
      headerAction={
        user && hasRole('administrator') ? (
          <Button onClick={handleAddCommunity} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Community
          </Button>
        ) : undefined
      }
    />
  );
};

export default CommunitiesPage;
