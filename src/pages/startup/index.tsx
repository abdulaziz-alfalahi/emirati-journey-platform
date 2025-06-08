
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lightbulb, Search, Plus, MapPin, Building, DollarSign, Users, Globe } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface StartupEcosystemEntity {
  id: string;
  created_at: string;
  name: string;
  type: string;
  description: string;
  industry_focus: string[];
  location: string;
  website_url: string;
  application_link_or_email: string;
  funding_stage_focus: string;
  logo_url: string;
  status: string;
}

const StartupPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterByType, setFilterByType] = useState('all');
  const [filterByLocation, setFilterByLocation] = useState('all');
  const [filterByIndustry, setFilterByIndustry] = useState('all');

  const { data: entities = [], isLoading } = useQuery({
    queryKey: ['startup-ecosystem-entities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('startup_ecosystem_entities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as StartupEcosystemEntity[];
    }
  });

  const filteredAndSortedEntities = useMemo(() => {
    let filtered = entities.filter(entity => {
      const matchesSearch = !searchQuery || 
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterByType === 'all' || entity.type === filterByType;
      const matchesLocation = filterByLocation === 'all' || entity.location === filterByLocation;
      const matchesIndustry = filterByIndustry === 'all' || 
        entity.industry_focus?.some(industry => industry.toLowerCase().includes(filterByIndustry.toLowerCase()));
      
      return matchesSearch && matchesType && matchesLocation && matchesIndustry;
    });

    // Sort entities
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        return a.type.localeCompare(b.type);
      } else if (sortBy === 'location') {
        return a.location.localeCompare(b.location);
      }
      return 0;
    });

    return filtered;
  }, [entities, searchQuery, sortBy, filterByType, filterByLocation, filterByIndustry]);

  const getFilteredEntities = (types: string[]) => {
    return filteredAndSortedEntities.filter(entity => types.includes(entity.type));
  };

  const handleAddEntity = () => {
    toast({
      title: "Admin: Manage Startup Ecosystem Entities",
      description: "Coming Soon - Entity management functionality will be available here.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'incubator': return <Building className="h-4 w-4" />;
      case 'accelerator': return <Building className="h-4 w-4" />;
      case 'vc fund': return <DollarSign className="h-4 w-4" />;
      case 'angel network': return <Users className="h-4 w-4" />;
      case 'government program': return <Globe className="h-4 w-4" />;
      case 'co-working space': return <Building className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const EntityCard = ({ entity }: { entity: StartupEcosystemEntity }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={entity.logo_url || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} 
          alt={entity.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(entity.type)}
            {entity.type}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {entity.location}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{entity.name}</CardTitle>
        {entity.funding_stage_focus && (
          <CardDescription className="text-sm text-ehrdc-teal font-semibold">
            {entity.funding_stage_focus}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {entity.description}
        </p>
        {entity.industry_focus && entity.industry_focus.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {entity.industry_focus.slice(0, 3).map((industry, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
            {entity.industry_focus.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{entity.industry_focus.length - 3}
              </Badge>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-teal/90"
            onClick={() => window.open(entity.website_url, '_blank')}
          >
            Visit Website
          </Button>
          {entity.application_link_or_email && (
            <Button 
              variant="outline"
              onClick={() => {
                if (entity.application_link_or_email.includes('@')) {
                  window.open(`mailto:${entity.application_link_or_email}`, '_blank');
                } else {
                  window.open(entity.application_link_or_email, '_blank');
                }
              }}
            >
              Apply
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
          placeholder="Search entities..."
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
          <SelectItem value="name">Name A-Z</SelectItem>
          <SelectItem value="type">Type</SelectItem>
          <SelectItem value="location">Location</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByType} onValueChange={setFilterByType}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Incubator">Incubators</SelectItem>
          <SelectItem value="Accelerator">Accelerators</SelectItem>
          <SelectItem value="VC Fund">VC Funds</SelectItem>
          <SelectItem value="Angel Network">Angel Networks</SelectItem>
          <SelectItem value="Government Program">Government Programs</SelectItem>
          <SelectItem value="Co-working Space">Co-working Spaces</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByLocation} onValueChange={setFilterByLocation}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Dubai">Dubai</SelectItem>
          <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
          <SelectItem value="UAE-wide">UAE-wide</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const EntityGrid = ({ entities }: { entities: StartupEcosystemEntity[] }) => {
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

    if (entities.length === 0) {
      return (
        <div className="text-center py-12">
          <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No entities found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: `${entities.length}+`,
      label: "Ecosystem Players",
      icon: Building,
    },
    {
      value: "AED 2B+",
      label: "Funding Available", 
      icon: DollarSign,
    },
    {
      value: "Direct Access",
      label: "To Incubators & VCs",
      icon: Lightbulb,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Entities",
      icon: <Lightbulb className="h-4 w-4" />,
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">All Startup Ecosystem Entities</h2>
              <p className="text-muted-foreground">
                Discover the complete UAE startup ecosystem landscape
              </p>
            </div>
            {user && hasRole('administrator') && (
              <Button onClick={handleAddEntity} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Ecosystem Entity
              </Button>
            )}
          </div>
          <FilterControls />
          <EntityGrid entities={filteredAndSortedEntities} />
        </div>
      )
    },
    {
      id: "incubators",
      label: "Incubators & Accelerators",
      icon: <Building className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Incubators & Accelerators</h2>
            <p className="text-muted-foreground">
              Join programs that nurture and accelerate your startup journey
            </p>
          </div>
          <EntityGrid entities={getFilteredEntities(['Incubator', 'Accelerator'])} />
        </div>
      )
    },
    {
      id: "funding",
      label: "Funding Sources",
      icon: <DollarSign className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Funding Sources</h2>
            <p className="text-muted-foreground">
              Connect with VCs, angel networks, and funding programs
            </p>
          </div>
          <EntityGrid entities={getFilteredEntities(['VC Fund', 'Angel Network'])} />
        </div>
      )
    },
    {
      id: "government",
      label: "Government Support",
      icon: <Globe className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Government Support Programs</h2>
            <p className="text-muted-foreground">
              Access government-backed initiatives and support programs
            </p>
          </div>
          <EntityGrid entities={getFilteredEntities(['Government Program'])} />
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Startup Ecosystem"
      description="Launch and scale your venture. Connect with the UAE's dynamic startup ecosystem, from incubators and funding to mentorship and support programs."
      icon={<Lightbulb className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default StartupPage;
