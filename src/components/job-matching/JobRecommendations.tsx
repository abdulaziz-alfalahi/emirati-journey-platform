
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Building, 
  DollarSign, 
  Clock,
  Heart,
  Eye,
  Send,
  Briefcase
} from 'lucide-react';

const JobRecommendations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const jobRecommendations = [
    {
      id: '1',
      title: 'Senior UX Designer',
      company: 'Careem',
      location: 'Dubai',
      salary: 'AED 15,000 - 20,000',
      matchPercentage: 94,
      posted: '1 day ago',
      type: 'Full-time',
      remote: true,
      urgent: false,
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      description: 'Join our design team to create exceptional user experiences for millions of users across the Middle East.'
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'ADNOC',
      location: 'Abu Dhabi',
      salary: 'AED 18,000 - 25,000',
      matchPercentage: 89,
      posted: '2 days ago',
      type: 'Full-time',
      remote: false,
      urgent: true,
      skills: ['Python', 'Machine Learning', 'SQL', 'Analytics'],
      description: 'Lead data science initiatives in the energy sector and drive digital transformation.'
    },
    {
      id: '3',
      title: 'Marketing Manager',
      company: 'Noon',
      location: 'Dubai',
      salary: 'AED 12,000 - 16,000',
      matchPercentage: 86,
      posted: '3 days ago',
      type: 'Full-time',
      remote: true,
      urgent: false,
      skills: ['Digital Marketing', 'Campaign Management', 'Analytics', 'Social Media'],
      description: 'Drive marketing campaigns for the region\'s leading e-commerce platform.'
    },
    {
      id: '4',
      title: 'Software Engineer',
      company: 'Talabat',
      location: 'Dubai',
      salary: 'AED 14,000 - 18,000',
      matchPercentage: 92,
      posted: '1 day ago',
      type: 'Full-time',
      remote: true,
      urgent: false,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      description: 'Build scalable applications serving millions of customers across the region.'
    },
    {
      id: '5',
      title: 'Business Analyst',
      company: 'Emirates NBD',
      location: 'Dubai',
      salary: 'AED 11,000 - 15,000',
      matchPercentage: 83,
      posted: '4 days ago',
      type: 'Full-time',
      remote: false,
      urgent: false,
      skills: ['Business Analysis', 'Process Improvement', 'SQL', 'Excel'],
      description: 'Analyze business processes and drive operational excellence in banking.'
    },
    {
      id: '6',
      title: 'Project Manager',
      company: 'Dubai Municipality',
      location: 'Dubai',
      salary: 'AED 16,000 - 22,000',
      matchPercentage: 87,
      posted: '2 days ago',
      type: 'Full-time',
      remote: false,
      urgent: true,
      skills: ['Project Management', 'Agile', 'Stakeholder Management', 'PMP'],
      description: 'Lead infrastructure and smart city projects in Dubai.'
    }
  ];

  const filterOptions = [
    { id: 'remote', label: 'Remote Work', count: 15 },
    { id: 'urgent', label: 'Urgent Hiring', count: 8 },
    { id: 'senior', label: 'Senior Level', count: 12 },
    { id: 'government', label: 'Government', count: 6 },
    { id: 'startup', label: 'Startup', count: 9 },
    { id: 'multinational', label: 'Multinational', count: 18 }
  ];

  const filteredJobs = jobRecommendations.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter => {
      switch (filter) {
        case 'remote': return job.remote;
        case 'urgent': return job.urgent;
        case 'senior': return job.title.toLowerCase().includes('senior');
        default: return true;
      }
    });

    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleJobAction = (jobId: string, action: 'view' | 'save' | 'apply') => {
    console.log(`${action} job ${jobId}`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-ehrdc-teal" />
            Personalized Job Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilters.includes(filter.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter(filter.id)}
                className="text-xs"
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {filteredJobs.length} Recommended Jobs
          </h3>
          <p className="text-sm text-muted-foreground">
            Based on your profile and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Sort by Match
          </Button>
          <Button variant="outline" size="sm">
            Sort by Date
          </Button>
        </div>
      </div>

      {/* Job Recommendations List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    {job.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                    {job.remote && (
                      <Badge variant="secondary" className="text-xs">
                        Remote
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-ehrdc-teal mb-2">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-ehrdc-light-teal/10 text-ehrdc-teal border-ehrdc-light-teal/20 mb-2">
                    {job.matchPercentage}% Match
                  </Badge>
                  <div className="text-xs text-muted-foreground">{job.posted}</div>
                </div>
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
                  <Briefcase className="h-4 w-4" />
                  {job.matchPercentage}% Match
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Required Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {job.description}
              </p>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleJobAction(job.id, 'apply')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleJobAction(job.id, 'save')}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleJobAction(job.id, 'view')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedFilters([]);
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobRecommendations;
