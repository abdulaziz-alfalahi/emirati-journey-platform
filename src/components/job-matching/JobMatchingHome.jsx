
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Sparkles, MapPin, Clock, Users, Building, DollarSign, ExternalLink } from 'lucide-react';

export function JobMatchingHome() {
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

  return (
    <div className="space-y-8">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-blue-600" />
              Smart Job Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Find jobs that match your skills and preferences with AI-powered search algorithms.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Searching
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-600">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Get personalized job recommendations based on your profile and career goals.
            </p>
            <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
              View Recommendations
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-green-600" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Refine your search with location, salary, industry, and experience filters.
            </p>
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
              Set Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-900">UAE-Wide Coverage</p>
            <p className="text-xs text-blue-700">All Emirates & Industries</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <Clock className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-900">Real-Time Updates</p>
            <p className="text-xs text-green-700">Fresh opportunities daily</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
          <Users className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-purple-900">Verified Employers</p>
            <p className="text-xs text-purple-700">Trusted company partners</p>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-ehrdc-teal" />
            Featured Job Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="border border-ehrdc-neutral-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-ehrdc-teal font-medium">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
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
                    <Button className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
