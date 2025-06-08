
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Rocket, Search, Plus, ExternalLink, Download, BookOpen, Users, Target, TrendingUp } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface BizDevResource {
  id: string;
  created_at: string;
  title: string;
  type: string;
  description: string;
  focus_area: string;
  difficulty_level: string;
  provider_or_author: string;
  link_url: string;
  downloadable_file_url: string;
  image_url: string;
  tags: string[];
  status: string;
}

const BusinessDevelopmentPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterByType, setFilterByType] = useState('all');
  const [filterByFocusArea, setFilterByFocusArea] = useState('all');
  const [filterByDifficulty, setFilterByDifficulty] = useState('all');

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['bizdev-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bizdev_resources')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BizDevResource[];
    }
  });

  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = !searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.provider_or_author?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterByType === 'all' || resource.type === filterByType;
      const matchesFocusArea = filterByFocusArea === 'all' || resource.focus_area === filterByFocusArea;
      const matchesDifficulty = filterByDifficulty === 'all' || resource.difficulty_level === filterByDifficulty;
      
      return matchesSearch && matchesType && matchesFocusArea && matchesDifficulty;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

    return filtered;
  }, [resources, searchQuery, sortBy, filterByType, filterByFocusArea, filterByDifficulty]);

  const getFilteredResources = (typeFilter?: string, focusAreaFilter?: string) => {
    return filteredAndSortedResources.filter(resource => {
      const typeMatches = !typeFilter || resource.type === typeFilter;
      const focusMatches = !focusAreaFilter || resource.focus_area.toLowerCase().includes(focusAreaFilter.toLowerCase());
      return typeMatches && focusMatches;
    });
  };

  const handleAddResource = () => {
    toast({
      title: "Admin: Manage Business Development Resources",
      description: "Coming Soon - Resource management functionality will be available here.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'template': return <Download className="h-4 w-4" />;
      case 'webinar': return <Users className="h-4 w-4" />;
      case 'case_study': return <Target className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ResourceCard = ({ resource }: { resource: BizDevResource }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={resource.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} 
          alt={resource.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(resource.type)}
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </Badge>
          {resource.difficulty_level && (
            <Badge className={getDifficultyColor(resource.difficulty_level)}>
              {resource.difficulty_level}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
        <CardDescription className="text-sm">
          <span className="font-semibold text-ehrdc-teal">{resource.focus_area}</span>
          {resource.provider_or_author && (
            <span className="text-muted-foreground"> • {resource.provider_or_author}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {resource.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {resource.description}
          </p>
        )}
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
        <div className="flex gap-2">
          {resource.link_url && (
            <Button 
              className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-teal/90"
              onClick={() => window.open(resource.link_url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Access Resource
            </Button>
          )}
          {resource.downloadable_file_url && (
            <Button 
              variant="outline"
              onClick={() => window.open(resource.downloadable_file_url, '_blank')}
            >
              <Download className="h-4 w-4" />
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
          placeholder="Search resources..."
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
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="title">Title A-Z</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByType} onValueChange={setFilterByType}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="course">Courses</SelectItem>
          <SelectItem value="template">Templates</SelectItem>
          <SelectItem value="article">Articles</SelectItem>
          <SelectItem value="webinar">Webinars</SelectItem>
          <SelectItem value="case_study">Case Studies</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByFocusArea} onValueChange={setFilterByFocusArea}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by focus area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Focus Areas</SelectItem>
          <SelectItem value="Sales Strategy">Sales Strategy</SelectItem>
          <SelectItem value="Partnership Building">Partnership Building</SelectItem>
          <SelectItem value="Market Expansion">Market Expansion</SelectItem>
          <SelectItem value="Client Relationship Management">Client Relationship Management</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const ResourceGrid = ({ resources }: { resources: BizDevResource[] }) => {
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
          <Rocket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
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
      label: "BizDev Resources",
      icon: Rocket,
    },
    {
      value: "Expert Guides",
      label: "Sales Strategies", 
      icon: TrendingUp,
    },
    {
      value: "Partnership Tools",
      label: "Ready Templates",
      icon: Users,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Resources",
      icon: <Rocket className="h-4 w-4" />,
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">All Business Development Resources</h2>
              <p className="text-muted-foreground">
                Discover resources, strategies, and tools for excelling in sales, partnerships, and market expansion
              </p>
            </div>
            {user && hasRole('administrator') && (
              <Button onClick={handleAddResource} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add BizDev Resource
              </Button>
            )}
          </div>
          <FilterControls />
          <ResourceGrid resources={filteredAndSortedResources} />
        </div>
      )
    },
    {
      id: "sales",
      label: "Sales & Strategy",
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Sales & Strategy Resources</h2>
            <p className="text-muted-foreground">
              Master sales techniques, strategies, and methodologies to drive business growth
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources(undefined, 'sales')} />
        </div>
      )
    },
    {
      id: "partnerships",
      label: "Partnerships",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Partnership Building Resources</h2>
            <p className="text-muted-foreground">
              Learn to forge strategic partnerships and collaborative relationships
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources(undefined, 'partnership')} />
        </div>
      )
    },
    {
      id: "templates",
      label: "Templates & Tools",
      icon: <Download className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Templates & Tools</h2>
            <p className="text-muted-foreground">
              Ready-to-use templates and tools to accelerate your business development efforts
            </p>
          </div>
          <ResourceGrid resources={getFilteredResources('template')} />
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Business Development"
      description="Drive growth and forge new opportunities. Access resources, strategies, and tools for excelling in sales, partnerships, and market expansion."
      icon={<Rocket className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default BusinessDevelopmentPage;
