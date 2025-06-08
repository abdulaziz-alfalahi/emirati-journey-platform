
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Search, Plus, Calendar, Target, Lightbulb, BookOpen, Trophy } from 'lucide-react';
import { ProfessionalGrowthLayout } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface InnovationHubContent {
  id: string;
  created_at: string;
  title: string;
  type: string;
  description: string;
  category: string;
  content_url: string;
  content_markdown: string;
  image_url: string;
  author_or_source: string;
  event_date: string;
  challenge_deadline: string;
  tags: string[];
  status: string;
}

const InnovationPage = () => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterByType, setFilterByType] = useState('all');
  const [filterByCategory, setFilterByCategory] = useState('all');

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['innovation-hub-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('innovation_hub_content')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as InnovationHubContent[];
    }
  });

  const filteredAndSortedContent = useMemo(() => {
    let filtered = content.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterByType === 'all' || item.type === filterByType;
      const matchesCategory = filterByCategory === 'all' || item.category === filterByCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });

    // Sort content
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return filtered;
  }, [content, searchQuery, sortBy, filterByType, filterByCategory]);

  const getFilteredContent = (types: string[]) => {
    return filteredAndSortedContent.filter(item => types.includes(item.type));
  };

  const handleAddContent = () => {
    toast({
      title: "Admin: Manage Innovation Hub Content",
      description: "Coming Soon - Content management functionality will be available here.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'emerging tech report': return <Lightbulb className="h-4 w-4" />;
      case 'innovation methodology': return <Target className="h-4 w-4" />;
      case 'toolkit': return <BookOpen className="h-4 w-4" />;
      case 'challenge': return <Trophy className="h-4 w-4" />;
      case 'success story': return <Sparkles className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ContentCard = ({ item }: { item: InnovationHubContent }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={item.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(item.type)}
            {item.type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
        {item.author_or_source && (
          <CardDescription className="text-sm text-ehrdc-teal font-semibold">
            by {item.author_or_source}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {item.description}
        </p>
        
        {/* Show deadline for challenges */}
        {item.type === 'Challenge' && item.challenge_deadline && (
          <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-xs text-orange-800 font-medium">
              Deadline: {formatDate(item.challenge_deadline)}
            </p>
          </div>
        )}
        
        {/* Show event date */}
        {item.type === 'Event' && item.event_date && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-800 font-medium">
              Event Date: {formatDate(item.event_date)}
            </p>
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.replace('_', ' ')}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          className="w-full bg-ehrdc-teal hover:bg-ehrdc-teal/90"
          onClick={() => item.content_url && window.open(item.content_url, '_blank')}
        >
          Explore Content
        </Button>
      </CardContent>
    </Card>
  );

  const FilterControls = () => (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search innovation content..."
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
          <SelectItem value="category">Category</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByType} onValueChange={setFilterByType}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Emerging Tech Report">Tech Reports</SelectItem>
          <SelectItem value="Innovation Methodology">Methodologies</SelectItem>
          <SelectItem value="Toolkit">Toolkits</SelectItem>
          <SelectItem value="Challenge">Challenges</SelectItem>
          <SelectItem value="Success Story">Success Stories</SelectItem>
          <SelectItem value="Event">Events</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterByCategory} onValueChange={setFilterByCategory}>
        <SelectTrigger className="w-full lg:w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Artificial Intelligence">AI</SelectItem>
          <SelectItem value="Blockchain">Blockchain</SelectItem>
          <SelectItem value="Design Thinking">Design Thinking</SelectItem>
          <SelectItem value="Sustainable Innovation">Sustainability</SelectItem>
          <SelectItem value="Space Tech">Space Tech</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const ContentGrid = ({ content }: { content: InnovationHubContent[] }) => {
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

    if (content.length === 0) {
      return (
        <div className="text-center py-12">
          <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: "Latest Tech Trends",
      label: "Emerging Technologies",
      icon: Lightbulb,
    },
    {
      value: `${content.filter(c => c.type === 'Challenge').length}+`,
      label: "Innovation Challenges", 
      icon: Trophy,
    },
    {
      value: "Success Stories Showcase",
      label: "UAE Innovations",
      icon: Sparkles,
    }
  ];

  const tabs = [
    {
      id: "all",
      label: "All Content",
      icon: <Search className="h-4 w-4" />,
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">All Innovation Content</h2>
              <p className="text-muted-foreground">
                Discover the latest in emerging technologies, methodologies, and innovation stories
              </p>
            </div>
            {user && hasRole('administrator') && (
              <Button onClick={handleAddContent} className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Innovation Content
              </Button>
            )}
          </div>
          <FilterControls />
          <ContentGrid content={filteredAndSortedContent} />
        </div>
      )
    },
    {
      id: "emerging-tech",
      label: "Emerging Tech",
      icon: <Lightbulb className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Emerging Technologies</h2>
            <p className="text-muted-foreground">
              Stay ahead with the latest technology reports and insights
            </p>
          </div>
          <ContentGrid content={getFilteredContent(['Emerging Tech Report'])} />
        </div>
      )
    },
    {
      id: "methodologies",
      label: "Methodologies & Toolkits",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Innovation Methodologies & Toolkits</h2>
            <p className="text-muted-foreground">
              Practical frameworks and tools for systematic innovation
            </p>
          </div>
          <ContentGrid content={getFilteredContent(['Innovation Methodology', 'Toolkit'])} />
        </div>
      )
    },
    {
      id: "challenges",
      label: "Challenges & Events",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Innovation Challenges & Events</h2>
            <p className="text-muted-foreground">
              Participate in challenges and attend innovation events
            </p>
          </div>
          <ContentGrid content={getFilteredContent(['Challenge', 'Event'])} />
        </div>
      )
    },
    {
      id: "success-stories",
      label: "Success Stories",
      icon: <Trophy className="h-4 w-4" />,
      content: (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Innovation Success Stories</h2>
            <p className="text-muted-foreground">
              Be inspired by breakthrough innovations from the UAE
            </p>
          </div>
          <ContentGrid content={getFilteredContent(['Success Story'])} />
        </div>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title="Innovation Hub"
      description="Spark your creativity and drive change. Explore emerging technologies, innovation methodologies, challenges, and inspiring success stories from the UAE."
      icon={<Sparkles className="h-10 w-10" />}
      stats={stats}
      tabs={tabs}
      defaultTab="all"
    />
  );
};

export default InnovationPage;
