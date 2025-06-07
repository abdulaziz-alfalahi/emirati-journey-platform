
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Sparkles, MapPin, Clock, Users, Building, DollarSign, ExternalLink, Sliders } from 'lucide-react';

export function JobMatchingHome() {
  const [showFilters, setShowFilters] = useState(false);

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
      {/* Search and Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-ehrdc-teal" />
            Smart Job Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Bar */}
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
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Button className="w-full">
              View Recommendations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-ehrdc-teal" />
              Verified Employers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Explore opportunities with trusted company partners across the UAE.
            </p>
            <Button variant="outline" className="w-full">
              Browse Companies
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-ehrdc-teal" />
              Real-Time Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get notified about fresh opportunities that match your preferences.
            </p>
            <Button variant="outline" className="w-full">
              Set Alerts
            </Button>
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
