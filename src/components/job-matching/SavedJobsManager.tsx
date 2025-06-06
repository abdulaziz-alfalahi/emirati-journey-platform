
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, MapPin, DollarSign, Clock, Building, ExternalLink } from 'lucide-react';

export const SavedJobsManager: React.FC = () => {
  const savedJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Emirates NBD',
      location: 'Dubai',
      salary: 'AED 15,000 - 20,000',
      type: 'Full-time',
      saved: '2 days ago',
      match: '95%'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Dubai Tourism',
      location: 'Dubai',
      salary: 'AED 12,000 - 16,000',
      type: 'Full-time',
      saved: '1 week ago',
      match: '88%'
    },
    {
      id: 3,
      title: 'AI Research Scientist',
      company: 'Mohammed bin Rashid University',
      location: 'Dubai',
      salary: 'AED 18,000 - 25,000',
      type: 'Full-time',
      saved: '3 days ago',
      match: '92%'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-ehrdc-teal" />
            Saved Jobs ({savedJobs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <Card key={job.id} className="border border-ehrdc-neutral-light">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                      <p className="text-ehrdc-teal font-medium">{job.company}</p>
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
                      <Bookmark className="h-4 w-4" />
                      Saved {job.saved}
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
                      <Bookmark className="h-4 w-4 fill-current" />
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
};
