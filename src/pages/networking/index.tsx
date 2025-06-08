
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Search, Plus, MapPin, Users, Globe, Star, Building } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface IndustryNetwork {
  id: string;
  created_at: string;
  name: string;
  description: string;
  industry_focus: string[];
  type: string;
  logo_url: string;
  website_url: string;
  contact_email: string;
  location: string;
  membership_fee: string;
  is_official_partner: boolean;
  status: string;
}

const NetworkingPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filterByType, setFilterByType] = useState('all');
  const [filterByLocation, setFilterByLocation] = useState('all');
  const [filterByIndustry, setFilterByIndustry] = useState('all');

  const { data: networks = [], isLoading } = useQuery({
    queryKey: ['industry-networks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('industry_networks')
        .select('*')
        .eq('status', 'active')
        .order('is_official_partner', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as IndustryNetwork[];
    }
  });

  const filteredAndSortedNetworks = useMemo(() => {
    let filtered = networks.filter(network => {
      const matchesSearch = !searchQuery || 
        network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        network.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        network.industry_focus.some(industry => 
          industry.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesType = filterByType === 'all' || network.type === filterByType;
      const matchesLocation = filterByLocation === 'all' || network.location === filterByLocation;
      const matchesIndustry = filterByIndustry === 'all' || 
        network.industry_focus.includes(filterByIndustry);
      
      return matchesSearch && matchesType && matchesLocation && matchesIndustry;
    });

    // Sort networks
    filtered.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.is_official_partner && !b.is_official_partner) return -1;
        if (!a.is_official_partner && b.is_official_partner) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

    return filtered;
  }, [networks, searchQuery, sortBy, filterByType, filterByLocation, filterByIndustry]);

  const getFilteredNetworks = (types: string[], isOfficialPartner?: boolean) => {
    return filteredAndSortedNetworks.filter(network => {
      const typeMatches = types.length === 0 || types.includes(network.type);
      const partnerMatches = isOfficialPartner === undefined || network.is_official_partner === isOfficialPartner;
      return typeMatches && partnerMatches;
    });
  };

  const handleAddNetwork = () => {
    toast({
      title: "Admin: Manage Industry Networks",
      description: "Coming Soon - Network management functionality will be available here.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Professional Association': return <Building className="h-4 w-4" />;
      case 'Online Community': return <Users className="h-4 w-4" />;
      case 'Meetup Group': return <Users className="h-4 w-4" />;
      case 'Conference Series': return <Globe className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const NetworkCard = ({ network }: { network: IndustryNetwork }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={network.logo_url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} 
          alt={network.name}
          className="w-full h-full object-cover"
        />
        {network.is_official_partner && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
            <Star className="h-3 w-3 mr-1" />
            Official Partner
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(network.type)}
            {network.type}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {network.location}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{network.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {network.membership_fee && (
            <span className="font-semibold text-ehrdc-teal">{network.membership_fee}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {network.description}
        </p>
        {network.industry_focus && network.industry_focus.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {network.industry_focus.slice(0, 3).map((industry, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
            {network.industry_focus.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{network.industry_focus.length - 3}
              </Badge>
            )}
          </div>
        )}
        <div className="flex gap-2">
          {network.website_url && (
            <Button 
              className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-teal/90"
              onClick={() => window.open(network.website_url, '_blank')}
            >
              Visit Network
            </Button>
          )}
          {network.contact_email && (
            <Button 
              variant="outline"
              onClick={() => window.open(`mailto:${network.contact_email}`, '_blank')}
            >
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const FilterControls = () => (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search networks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured First</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="name">Name A-Z</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByType} onValueChange={setFilterByType}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Professional Association">Associations</SelectItem>
          <SelectItem value="Online Community">Communities</SelectItem>
          <SelectItem value="Meetup Group">Meetups</SelectItem>
          <SelectItem value="Conference Series">Conferences</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByLocation} onValueChange={setFilterByLocation}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="UAE">UAE</SelectItem>
          <SelectItem value="Dubai">Dubai</SelectItem>
          <SelectItem value="Online">Online</SelectItem>
          <SelectItem value="Global">Global</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const NetworkGrid = ({ networks }: { networks: IndustryNetwork[] }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (networks.length === 0) {
      return (
        <div className="text-center py-12">
          <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No networks found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {networks.map((network) => (
          <NetworkCard key={network.id} network={network} />
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: `${networks.length}+`,
      label: "Networks Listed",
      icon: Activity,
    },
    {
      value: `${new Set(networks.flatMap(n => n.industry_focus)).size}+`,
      label: "Industries Covered", 
      icon: Globe,
    },
    {
      value: "Direct Links",
      label: "Community Access",
      icon: Users,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Networks",
      icon: <Activity className="h-4 w-4" />,
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">All Industry Networks</h2>
              <p className="text-muted-foreground">
                Discover and connect with professional networks across all industries
              </p>
            </div>
            {user && hasRole('administrator') && (
              <Button onClick={handleAddNetwork} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Network
              </Button>
            )}
          </div>
          <FilterControls />
          <NetworkGrid networks={filteredAndSortedNetworks} />
        </div>
      )
    },
    {
      id: "associations",
      label: "Professional Associations",
      icon: <Building className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Professional Associations</h2>
            <p className="text-muted-foreground">
              Join formal professional associations for career advancement and industry recognition
            </p>
          </div>
          <NetworkGrid networks={getFilteredNetworks(['Professional Association'])} />
        </div>
      )
    },
    {
      id: "communities",
      label: "Online Communities",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Online Communities & Meetups</h2>
            <p className="text-muted-foreground">
              Connect with like-minded professionals through online communities and local meetup groups
            </p>
          </div>
          <NetworkGrid networks={getFilteredNetworks(['Online Community', 'Meetup Group'])} />
        </div>
      )
    },
    {
      id: "partners",
      label: "Featured Partners",
      icon: <Star className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Featured Partners</h2>
            <p className="text-muted-foreground">
              Official partner networks with exclusive benefits for EHRDC members
            </p>
          </div>
          <NetworkGrid networks={getFilteredNetworks([], true)} />
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Industry Networks"
      description="Expand your professional horizons. Discover and engage with key industry networks, associations, and communities to foster connections and stay ahead."
      icon={<Activity className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default NetworkingPage;
