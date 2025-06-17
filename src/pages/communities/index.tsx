
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Users, Search, Filter, ExternalLink, Mail, Globe } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Community {
  id: string;
  name: string;
  description: string;
  focus_area: string;
  community_type: string;
  member_count: number;
  logo_url?: string;
  website_url?: string;
  contact_email?: string;
  is_active: boolean;
  created_at: string;
}

const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusAreaFilter, setFocusAreaFilter] = useState<string>('all');
  const [communityTypeFilter, setCommunityTypeFilter] = useState<string>('all');
  const { toast } = useToast();

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .eq('is_active', true)
        .order('member_count', { ascending: false });

      if (error) throw error;
      
      setCommunities(data || []);
      setFilteredCommunities(data || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast({
        title: "Error",
        description: "Failed to load communities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    let filtered = communities;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.focus_area.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply focus area filter
    if (focusAreaFilter !== 'all') {
      filtered = filtered.filter(community => 
        community.focus_area.toLowerCase() === focusAreaFilter.toLowerCase()
      );
    }

    // Apply community type filter
    if (communityTypeFilter !== 'all') {
      filtered = filtered.filter(community => 
        community.community_type.toLowerCase() === communityTypeFilter.toLowerCase()
      );
    }

    setFilteredCommunities(filtered);
  }, [searchQuery, focusAreaFilter, communityTypeFilter, communities]);

  const totalMembers = communities.reduce((sum, community) => sum + community.member_count, 0);
  const activeCommunities = communities.filter(c => c.is_active).length;
  const focusAreas = [...new Set(communities.map(c => c.focus_area))];
  const communityTypes = [...new Set(communities.map(c => c.community_type))];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-ehrdc-teal to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Users className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Communities: Connect, Collaborate, Grow
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Join vibrant communities of professionals and enthusiasts. Network, learn, and grow together in your field of interest.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ehrdc-teal mb-2">{activeCommunities}</div>
                  <div className="text-muted-foreground">Active Communities</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ehrdc-teal mb-2">{totalMembers.toLocaleString()}</div>
                  <div className="text-muted-foreground">Total Members</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-ehrdc-teal mb-2">{focusAreas.length}</div>
                  <div className="text-muted-foreground">Focus Areas</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Find Your Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search communities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={focusAreaFilter} onValueChange={setFocusAreaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by focus area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Focus Areas</SelectItem>
                    {focusAreas.map(area => (
                      <SelectItem key={area} value={area.toLowerCase()}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={communityTypeFilter} onValueChange={setCommunityTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by community type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Community Types</SelectItem>
                    {communityTypes.map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {community.logo_url ? (
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={community.logo_url} 
                            alt={community.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <CardDescription className="text-sm">{community.community_type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {community.focus_area}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{community.member_count.toLocaleString()} members</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Join Community
                    </Button>
                    {community.website_url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={community.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {community.contact_email && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`mailto:${community.contact_email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No communities found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to find communities that match your interests.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CommunitiesPage;
