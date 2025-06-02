
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Video, FileText, Download, Search, Star, Play, ExternalLink } from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resourceTypes = ['Article', 'Video', 'Guide', 'Toolkit', 'Worksheet'];
  const categories = ['Leadership', 'Innovation', 'Arts', 'Wellness', 'Community Service', 'Career Planning'];

  const resources = [
    {
      id: '1',
      title: 'Leadership Skills for Young Leaders',
      type: 'Video',
      category: 'Leadership',
      description: 'A comprehensive video series covering essential leadership principles for youth.',
      duration: '45 minutes',
      rating: 4.9,
      downloads: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop',
      format: 'MP4',
      size: '150 MB'
    },
    {
      id: '2',
      title: 'Innovation Thinking Toolkit',
      type: 'Toolkit',
      category: 'Innovation',
      description: 'Practical tools and templates for developing innovative solutions to real-world problems.',
      duration: 'Self-paced',
      rating: 4.8,
      downloads: 890,
      thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop',
      format: 'PDF',
      size: '25 MB'
    },
    {
      id: '3',
      title: 'Digital Arts Masterclass',
      type: 'Video',
      category: 'Arts',
      description: 'Learn digital art techniques while preserving traditional Emirati artistic elements.',
      duration: '2.5 hours',
      rating: 4.9,
      downloads: 675,
      thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop',
      format: 'MP4',
      size: '420 MB'
    },
    {
      id: '4',
      title: 'Mental Wellness Guide for Youth',
      type: 'Guide',
      category: 'Wellness',
      description: 'Comprehensive guide to maintaining mental health and building resilience.',
      duration: '30 minutes read',
      rating: 4.7,
      downloads: 1120,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop',
      format: 'PDF',
      size: '15 MB'
    },
    {
      id: '5',
      title: 'Community Service Planning Worksheet',
      type: 'Worksheet',
      category: 'Community Service',
      description: 'Step-by-step worksheet for planning and executing impactful community service projects.',
      duration: '15 minutes',
      rating: 4.6,
      downloads: 780,
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
      format: 'PDF',
      size: '5 MB'
    },
    {
      id: '6',
      title: 'Career Pathways in UAE 2024',
      type: 'Article',
      category: 'Career Planning',
      description: 'Explore emerging career opportunities and required skills in the UAE job market.',
      duration: '20 minutes read',
      rating: 4.8,
      downloads: 950,
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
      format: 'Web',
      size: 'Online'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return Video;
      case 'Article': return FileText;
      case 'Guide': return BookOpen;
      case 'Toolkit': return FileText;
      case 'Worksheet': return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video': return 'bg-red-100 text-red-800';
      case 'Article': return 'bg-blue-100 text-blue-800';
      case 'Guide': return 'bg-green-100 text-green-800';
      case 'Toolkit': return 'bg-purple-100 text-purple-800';
      case 'Worksheet': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-ehrdc-teal/10 to-ehrdc-light-teal/5">
        <CardContent className="p-6 text-center">
          <BookOpen className="h-12 w-12 text-ehrdc-teal mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Resource Library</h2>
          <p className="text-muted-foreground">Educational materials and tools to support your development journey</p>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {resourceTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-ehrdc-teal" />
            Featured Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.slice(0, 3).map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getTypeColor(resource.type)}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {resource.type}
                      </Badge>
                    </div>
                    {resource.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{resource.duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full ehrdc-button-primary" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Resources */}
      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <div key={resource.id} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium">{resource.title}</h3>
                      <Badge className={getTypeColor(resource.type)} variant="secondary">
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{resource.duration}</span>
                      <span>{resource.format} • {resource.size}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {resource.type === 'Article' ? (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Read
                      </Button>
                    ) : resource.type === 'Video' ? (
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
