
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-ehrdc-teal" />
              Smart Job Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Find jobs that match your skills and preferences with AI-powered search algorithms.
            </p>
            <Button className="w-full">
              Start Searching
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ehrdc-teal" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get personalized job recommendations based on your profile and career goals.
            </p>
            <Button variant="outline" className="w-full">
              View Recommendations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-ehrdc-teal" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Refine your search with location, salary, industry, and experience filters.
            </p>
            <Button variant="outline" className="w-full">
              Set Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-ehrdc-teal" />
            <div>
              <p className="font-medium">UAE-Wide Coverage</p>
              <p className="text-muted-foreground text-sm">All Emirates & Industries</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-ehrdc-teal" />
            <div>
              <p className="font-medium">Real-Time Updates</p>
              <p className="text-muted-foreground text-sm">Fresh opportunities daily</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-ehrdc-teal" />
            <div>
              <p className="font-medium">Verified Employers</p>
              <p className="text-muted-foreground text-sm">Trusted company partners</p>
            </div>
          </CardContent>
        </Card>
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
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
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
