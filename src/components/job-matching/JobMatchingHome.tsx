
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Sparkles, MapPin, Clock, Users, Building, DollarSign, ExternalLink, Sliders, Star, TrendingUp } from 'lucide-react';

export function JobMatchingHome() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('search');

  // Mock job data
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Emirates NBD',
      location: 'Dubai',
      salary: 'AED 15,000 - 20,000',
      type: 'Full-time',
      match: '95%',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Dubai Tourism',
      location: 'Dubai',
      salary: 'AED 12,000 - 16,000',
      type: 'Full-time',
      match: '88%',
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'AI Research Scientist',
      company: 'Mohammed bin Rashid University',
      location: 'Dubai',
      salary: 'AED 18,000 - 25,000',
      type: 'Full-time',
      match: '92%',
      posted: '3 days ago'
    }
  ];

  const quickActions = [
    {
      id: 'recommendations',
      title: 'AI Recommendations',
      description: 'Get personalized job recommendations based on your profile and career goals.',
      icon: <Sparkles className="h-5 w-5 text-ehrdc-teal" />,
      action: 'View Recommendations'
    },
    {
      id: 'employers',
      title: 'Verified Employers',
      description: 'Explore opportunities with trusted company partners across the UAE.',
      icon: <Users className="h-5 w-5 text-ehrdc-teal" />,
      action: 'Browse Companies'
    },
    {
      id: 'alerts',
      title: 'Real-Time Updates',
      description: 'Get notified about fresh opportunities that match your preferences.',
      icon: <Clock className="h-5 w-5 text-ehrdc-teal" />,
      action: 'Set Alerts'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-ehrdc-teal" />
          Smart Job Matching Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="search">Job Search</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Interface */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search jobs by title, company, or keywords..." 
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Sliders className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Collapsible Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                      <SelectItem value="sharjah">Sharjah</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Salary Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">AED 5,000 - 10,000</SelectItem>
                      <SelectItem value="10k-15k">AED 10,000 - 15,000</SelectItem>
                      <SelectItem value="15k-25k">AED 15,000 - 25,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Featured Jobs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Featured Job Matches</h3>
              {featuredJobs.map((job) => (
                <Card key={job.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">{job.title}</h4>
                        <div className="flex items-center gap-2 text-ehrdc-teal">
                          <Building className="h-4 w-4" />
                          {job.company}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-ehrdc-light-teal/10 text-ehrdc-teal border-ehrdc-light-teal/20">
                        {job.match} Match
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Posted {job.posted}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <Card key={action.id} className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      {action.icon}
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {action.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-ehrdc-teal mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Market Insights</h3>
              <p className="text-muted-foreground">
                Comprehensive market analysis and career insights coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
