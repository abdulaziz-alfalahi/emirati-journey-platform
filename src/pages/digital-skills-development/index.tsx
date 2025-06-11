
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, Clock, DollarSign, BookOpen, Users, TrendingUp, Award } from 'lucide-react';

interface DigitalSkillsResource {
  id: string;
  title: string;
  provider: string;
  skill_category: string;
  difficulty_level: string | null;
  description: string | null;
  duration_hours: number | null;
  cost: number | null;
  resource_url: string | null;
  is_active: boolean;
  created_at: string;
}

const DigitalSkillsDevelopmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');

  const { data: resources, isLoading, error } = useQuery({
    queryKey: ['digital-skills-resources', selectedCategory, selectedDifficulty, selectedProvider, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('digital_skills_resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (selectedCategory && selectedCategory !== 'all') {
        query = query.eq('skill_category', selectedCategory);
      }

      if (selectedDifficulty && selectedDifficulty !== 'all') {
        query = query.eq('difficulty_level', selectedDifficulty);
      }

      if (selectedProvider && selectedProvider !== 'all') {
        query = query.eq('provider', selectedProvider);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,provider.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as DigitalSkillsResource[];
    }
  });

  // Get unique categories, difficulties, and providers for filter options
  const categories = Array.from(new Set(resources?.map(resource => resource.skill_category) || []));
  const difficulties = Array.from(new Set(resources?.map(resource => resource.difficulty_level).filter(Boolean) || []));
  const providers = Array.from(new Set(resources?.map(resource => resource.provider) || []));

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coding': return 'bg-blue-100 text-blue-800';
      case 'AI/ML': return 'bg-purple-100 text-purple-800';
      case 'Cybersecurity': return 'bg-orange-100 text-orange-800';
      case 'Data Science': return 'bg-indigo-100 text-indigo-800';
      case 'Digital Marketing': return 'bg-pink-100 text-pink-800';
      case 'Cloud Computing': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Failed to load digital skills resources. Please try again later.
            </p>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Digital Skills Development
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Master the Future with Cutting-Edge Digital Competencies
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Accelerate your career with comprehensive digital skills training. From coding to AI, 
              cybersecurity to data science - unlock your potential in the digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{resources?.length || 0}+</h3>
                <p className="text-gray-600">Learning Resources</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{categories.length}+</h3>
                <p className="text-gray-600">Skill Categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
                <p className="text-gray-600">Industry Relevance</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{providers.length}+</h3>
                <p className="text-gray-600">Trusted Providers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              "The future belongs to those who learn more skills and combine them in creative ways."
            </blockquote>
            <cite className="text-lg text-gray-600">— Robert Greene</cite>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Digital Skills Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our comprehensive collection of courses, tutorials, and resources 
                from top providers worldwide.
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty || ''}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Providers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      {providers.map(provider => (
                        <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            {!resources || resources.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">No Resources Found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedProvider !== 'all'
                        ? "No resources match your current filters. Try adjusting your search criteria."
                        : "No digital skills resources are currently available."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                  <Card key={resource.id} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">
                            {resource.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {resource.provider}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className={getCategoryColor(resource.skill_category)}>
                          {resource.skill_category}
                        </Badge>
                        {resource.difficulty_level && (
                          <Badge className={getDifficultyColor(resource.difficulty_level)}>
                            {resource.difficulty_level}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        {resource.duration_hours && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration_hours}h
                          </div>
                        )}
                        {resource.cost !== null && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {resource.cost === 0 ? 'Free' : `$${resource.cost}`}
                          </div>
                        )}
                      </div>
                      
                      {resource.resource_url && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={resource.resource_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Start Learning
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DigitalSkillsDevelopmentPage;
