
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Star, 
  Clock, 
  Building, 
  Users,
  TrendingUp,
  Eye,
  Heart,
  Send
} from 'lucide-react';

export const JobMatchingDashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const matchingStats = {
    totalMatches: 47,
    newThisWeek: 12,
    profileCompleteness: 85,
    matchAccuracy: 92
  };

  const topMatches = [
    {
      id: '1',
      title: 'Senior Product Manager',
      company: 'Emirates Group',
      location: 'Dubai',
      salary: 'AED 18,000 - 25,000',
      matchPercentage: 95,
      posted: '2 days ago',
      type: 'Full-time',
      industry: 'Aviation',
      skills: ['Product Strategy', 'Agile', 'Leadership', 'Analytics'],
      description: 'Lead product development for next-generation aviation services...'
    },
    {
      id: '2',
      title: 'Digital Marketing Director',
      company: 'Dubai Tourism',
      location: 'Dubai',
      salary: 'AED 20,000 - 28,000',
      matchPercentage: 88,
      posted: '1 day ago',
      type: 'Full-time',
      industry: 'Tourism',
      skills: ['Digital Strategy', 'Brand Management', 'Analytics', 'Team Leadership'],
      description: 'Drive digital marketing initiatives for Dubai\'s tourism sector...'
    },
    {
      id: '3',
      title: 'Technology Consultant',
      company: 'McKinsey & Company',
      location: 'Dubai',
      salary: 'AED 22,000 - 30,000',
      matchPercentage: 91,
      posted: '3 days ago',
      type: 'Full-time',
      industry: 'Consulting',
      skills: ['Strategy', 'Technology', 'Client Management', 'Problem Solving'],
      description: 'Support technology transformation projects for leading organizations...'
    }
  ];

  const insights = [
    {
      title: 'Profile Optimization',
      description: 'Complete your skills section to increase match accuracy by 15%',
      action: 'Update Profile',
      priority: 'high'
    },
    {
      title: 'Market Trend',
      description: 'AI & Machine Learning roles increased by 40% this month',
      action: 'Explore Roles',
      priority: 'medium'
    },
    {
      title: 'Salary Alert',
      description: 'Your target salary is 20% above market average for similar roles',
      action: 'View Analysis',
      priority: 'low'
    }
  ];

  const handleJobAction = (jobId: string, action: 'view' | 'save' | 'apply') => {
    console.log(`${action} job ${jobId}`);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
            <div className="text-2xl font-bold text-ehrdc-teal">{matchingStats.totalMatches}</div>
            <div className="text-sm text-muted-foreground">Total Matches</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{matchingStats.newThisWeek}</div>
            <div className="text-sm text-muted-foreground">New This Week</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{matchingStats.profileCompleteness}%</div>
            <div className="text-sm text-muted-foreground">Profile Complete</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{matchingStats.matchAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Match Accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completeness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-ehrdc-teal" />
            Profile Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Completeness</span>
                <span className="text-sm text-muted-foreground">{matchingStats.profileCompleteness}%</span>
              </div>
              <Progress value={matchingStats.profileCompleteness} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              Complete your profile to get better job matches and increase your visibility to employers.
            </div>
            <Button variant="outline" size="sm">
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Job Matches */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-ehrdc-teal" />
              Top Job Matches
            </CardTitle>
            <Button variant="outline">
              View All Matches
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMatches.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-ehrdc-teal">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <Badge className="bg-ehrdc-light-teal/10 text-ehrdc-teal border-ehrdc-light-teal/20">
                          {job.matchPercentage}% Match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-ehrdc-teal mb-2">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{job.posted}</div>
                      <Badge variant="outline">{job.type}</Badge>
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
                      <Briefcase className="h-4 w-4" />
                      {job.industry}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {job.type}
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
        </CardContent>
      </Card>

      {/* Career Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ehrdc-teal" />
            Career Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  insight.priority === 'high' ? 'bg-red-500' :
                  insight.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                  <Button variant="outline" size="sm">
                    {insight.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
