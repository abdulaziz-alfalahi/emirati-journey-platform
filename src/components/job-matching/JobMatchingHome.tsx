
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

export const JobMatchingHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-ehrdc-teal" />
            Find Your Perfect Job Match
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search jobs by title, company, or keywords..." 
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <Input 
                placeholder="Location" 
                className="w-full"
              />
            </div>
            <Button className="bg-ehrdc-teal hover:bg-ehrdc-teal/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">Remote</Button>
            <Button variant="outline" size="sm">Full-time</Button>
            <Button variant="outline" size="sm">Entry Level</Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Job Card 1 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Software Developer</h3>
                  <p className="text-muted-foreground">Emirates NBD</p>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Dubai, UAE
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Full-time
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  2 days ago
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  15,000 - 20,000 AED
                </span>
              </div>
              <p className="text-sm">
                Join our innovative team to develop cutting-edge banking solutions using React, Node.js, and cloud technologies.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">JavaScript</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Marketing Specialist</h3>
                  <p className="text-muted-foreground">Dubai Municipality</p>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Dubai, UAE
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Full-time
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  5 days ago
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  12,000 - 18,000 AED
                </span>
              </div>
              <p className="text-sm">
                Lead digital marketing campaigns and community engagement initiatives for Dubai's smart city projects.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Digital Marketing</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Social Media</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Analytics</span>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Data Analyst</h3>
                  <p className="text-muted-foreground">ADNOC</p>
                </div>
                <Button variant="outline" size="sm">
                  Apply Now
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Abu Dhabi, UAE
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Full-time
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  1 week ago
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  18,000 - 25,000 AED
                </span>
              </div>
              <p className="text-sm">
                Analyze energy sector data to drive strategic decision-making and optimize operations across the organization.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Python</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">SQL</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Tableau</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-ehrdc-teal mb-2">2,450+</div>
            <div className="text-muted-foreground">Active Jobs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-ehrdc-teal mb-2">95%</div>
            <div className="text-muted-foreground">Match Accuracy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-ehrdc-teal mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
