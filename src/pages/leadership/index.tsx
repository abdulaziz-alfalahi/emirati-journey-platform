
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Target, Search, Filter, BookOpen, Users, Calendar, FileText, Plus } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LeadershipResource {
  id: string;
  created_at: string;
  type: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  cost: number;
  image_url: string;
  link_url: string;
  target_personas: string[];
  tags: string[];
  is_featured: boolean;
  status: string;
}

const LeadershipPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filterByType, setFilterByType] = useState('all');

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['leadership-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leadership_resources')
        .select('*')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LeadershipResource[];
    }
  });

  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = !searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterByType === 'all' || resource.type === filterByType;
      
      return matchesSearch && matchesType;
    });

    // Sort resources
    filtered.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

    return filtered;
  }, [resources, searchQuery, sortBy, filterByType]);

  const getFilteredResources = (types: string[]) => {
    return filteredAndSortedResources.filter(resource => types.includes(resource.type));
  };

  const handleAddResource = () => {
    toast({
      title: "Admin: Manage Leadership Resources",
      description: "Coming Soon - Resource management functionality will be available here.",
    });
  };

  const formatCost = (cost: number) => {
    if (cost === 0) return 'Free';
    return `AED ${cost.toLocaleString()}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'program': return <Target className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'workshop': return <Users className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'book': return <BookOpen className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const ResourceCard = ({ resource }: { resource: LeadershipResource }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={resource.image_url} 
          alt={resource.title}
          className="w-full h-full object-cover"
        />
        {resource.is_featured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(resource.type)}
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </Badge>
          <span className="text-sm font-semibold text-ehrdc-teal">
            {formatCost(resource.cost)}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {resource.provider} • {resource.duration}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {resource.description}
        </p>
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.replace('_', ' ')}
              </Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{resource.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        <Button 
          className="w-full bg-ehrdc-teal hover:bg-ehrdc-teal/90"
          onClick={() => window.open(resource.link_url, '_blank')}
        >
          View Resource
        </Button>
      </CardContent>
    </Card>
  );

  const FilterControls = () => (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured First</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="title">Title A-Z</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByType} onValueChange={setFilterByType}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="program">Programs</SelectItem>
          <SelectItem value="course">Courses</SelectItem>
          <SelectItem value="workshop">Workshops</SelectItem>
          <SelectItem value="article">Articles</SelectItem>
          <SelectItem value="book">Books</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const ResourceGrid = ({ resources }: { resources: LeadershipResource[] }) => {
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

    if (resources.length === 0) {
      return (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: `${resources.length}+`,
      label: "Resources",
      icon: Target,
    },
    {
      value: `${resources.filter(r => r.is_featured).length}+`,
      label: "Featured Programs", 
      icon: BookOpen,
    },
    {
      value: "Expert Curated",
      label: "Content",
      icon: Users,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Resources",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">All Leadership Resources</h2>
              <p className="text-muted-foreground">
                Discover comprehensive leadership development opportunities
              </p>
            </div>
            {user && hasRole('administrator') && (
              <Button onClick={handleAddResource} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            )}
          </div>
          <FilterControls />
          <ResourceGrid resources={filteredAndSortedResources} />
        </div>
      )
    },
    {
      id: "programs",
      label: "Programs & Courses",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Leadership Programs & Courses</h2>
            <p className="text-muted-foreground">
              Structured learning programs for comprehensive leadership development
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources(['program', 'course'])} />
        </div>
      )
    },
    {
      id: "workshops",
      label: "Workshops & Events",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Workshops & Events</h2>
            <p className="text-muted-foreground">
              Interactive sessions and events for hands-on leadership learning
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources(['workshop'])} />
        </div>
      )
    },
    {
      id: "insights",
      label: "Articles & Insights",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Articles & Insights</h2>
            <p className="text-muted-foreground">
              Expert insights, articles, and reading materials for leadership growth
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources(['article', 'book', 'podcast'])} />
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Leadership Development"
      description="Cultivate your leadership potential. Discover programs, workshops, and resources designed to elevate your skills and guide your journey to becoming an influential leader."
      icon={<Target className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default LeadershipPage;
