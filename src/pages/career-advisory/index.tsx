
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Calendar, Target, TrendingUp, Video, Clock,
  User, MapPin, Star, CheckCircle, BookOpen, MessageSquare
} from 'lucide-react';

// Mock data for advisors
const mockAdvisors = [
  {
    id: '1',
    name: 'Dr. Sarah Al-Mahmoud',
    specialization: 'Career Transition Specialist',
    rating: 4.9,
    reviews: 127,
    location: 'Dubai, UAE',
    avatar: '/images/advisor-1.jpg',
    experience: '15+ years',
    availability: 'Available today'
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    specialization: 'Technology Career Coach',
    rating: 4.8,
    reviews: 98,
    location: 'Abu Dhabi, UAE',
    avatar: '/images/advisor-2.jpg',
    experience: '12+ years',
    availability: 'Next available: Tomorrow'
  },
  {
    id: '3',
    name: 'Fatima Al-Zahra',
    specialization: 'Leadership Development',
    rating: 4.9,
    reviews: 156,
    location: 'Sharjah, UAE',
    avatar: '/images/advisor-3.jpg',
    experience: '18+ years',
    availability: 'Available today'
  }
];

// Mock assessment data
const mockAssessments = [
  {
    id: '1',
    title: 'Career Interest Assessment',
    description: 'Discover your professional interests and ideal career paths',
    duration: '15 minutes',
    completed: false,
    type: 'personality'
  },
  {
    id: '2',
    title: 'Skills Gap Analysis',
    description: 'Identify skills needed for your target career',
    duration: '20 minutes',
    completed: true,
    type: 'skills',
    score: 85
  },
  {
    id: '3',
    title: 'Leadership Potential Evaluation',
    description: 'Assess your leadership capabilities and growth areas',
    duration: '25 minutes',
    completed: false,
    type: 'leadership'
  }
];

// Advisory Tools Tab Content
const AdvisoryToolsContent = () => {
  const { toast } = useToast();

  const handleStartAssessment = (assessmentId: string) => {
    toast({
      title: "Assessment Started",
      description: "Redirecting to assessment interface..."
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockAssessments.map((assessment) => (
        <Card key={assessment.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              {assessment.completed && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{assessment.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {assessment.duration}
              </div>
              {assessment.completed ? (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Score: {assessment.score}%</span>
                  <Button variant="outline" size="sm">View Results</Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => handleStartAssessment(assessment.id)}>
                  Start Assessment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Expert Advisors Tab Content
const ExpertAdvisorsContent = () => {
  const { toast } = useToast();

  const handleBookSession = (advisorId: string) => {
    toast({
      title: "Booking Session",
      description: "Redirecting to scheduling interface..."
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockAdvisors.map((advisor) => (
        <Card key={advisor.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-ehrdc-teal to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{advisor.name}</CardTitle>
                <p className="text-sm text-ehrdc-teal font-medium">{advisor.specialization}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{advisor.rating}</span>
                <span className="text-muted-foreground ml-1">({advisor.reviews} reviews)</span>
              </div>
              <Badge variant="outline">{advisor.experience}</Badge>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {advisor.location}
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-600 font-medium">{advisor.availability}</span>
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => handleBookSession(advisor.id)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// My Sessions Tab Content
const MySessionsContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="h-5 w-5 mr-2" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Sessions Scheduled</h3>
          <p className="text-muted-foreground mb-4">
            Book a session with one of our expert advisors to get started
          </p>
          <Button>Find an Advisor</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Career Planning Tab Content
const CareerPlanningContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Career Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Short-term Goal (6 months)</h4>
              <p className="text-sm text-muted-foreground">Complete digital marketing certification</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-ehrdc-teal h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">65% complete</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Long-term Goal (2 years)</h4>
              <p className="text-sm text-muted-foreground">Transition to marketing manager role</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-ehrdc-teal h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">25% complete</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'Schedule skills assessment with technology advisor',
              'Complete LinkedIn optimization workshop',
              'Network with professionals in target industry',
              'Update resume with recent achievements'
            ].map((action, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-ehrdc-teal" />
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Resources Tab Content
const ResourcesContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: 'Resume Writing Guide',
          description: 'Comprehensive guide to creating compelling resumes',
          type: 'PDF Guide',
          downloadCount: '2.3k downloads'
        },
        {
          title: 'Interview Preparation Toolkit',
          description: 'Essential resources for successful job interviews',
          type: 'Resource Kit',
          downloadCount: '1.8k downloads'
        },
        {
          title: 'Salary Negotiation Strategies',
          description: 'Expert tips for negotiating your worth',
          type: 'Video Course',
          downloadCount: '1.2k views'
        },
        {
          title: 'LinkedIn Optimization Workshop',
          description: 'Build a professional online presence',
          type: 'Interactive Course',
          downloadCount: '3.1k completions'
        },
        {
          title: 'Career Change Roadmap',
          description: 'Step-by-step guide for career transitions',
          type: 'Action Plan',
          downloadCount: '950 downloads'
        },
        {
          title: 'Industry Insights Report',
          description: 'Current trends and opportunities in UAE job market',
          type: 'Research Report',
          downloadCount: '1.7k downloads'
        }
      ].map((resource, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <Badge variant="outline">{resource.type}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{resource.downloadCount}</span>
              <Button size="sm">Access Resource</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Community Tab Content
const CommunityContent = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Discussion Forums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Career Transition Success Stories',
                posts: 234,
                members: 1580,
                lastActivity: '2 hours ago'
              },
              {
                title: 'Tech Industry Networking',
                posts: 189,
                members: 892,
                lastActivity: '1 hour ago'
              },
              {
                title: 'Interview Tips & Experiences',
                posts: 456,
                members: 2103,
                lastActivity: '30 minutes ago'
              }
            ].map((forum, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-accent/5 cursor-pointer">
                <h4 className="font-medium mb-2">{forum.title}</h4>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <span>{forum.posts} posts</span>
                  <span>{forum.members} members</span>
                  <span>Last activity: {forum.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CareerAdvisoryPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePrimaryAction = () => {
    toast({
      title: "Find Your Advisor",
      description: "Connecting you with the best career guidance professionals..."
    });
  };

  const handleSecondaryAction = () => {
    toast({
      title: "Assessment Started",
      description: "Beginning your personalized career assessment..."
    });
  };

  const stats = [
    { value: "2,500+", label: "Successful Career Transitions" },
    { value: "150+", label: "Expert Career Advisors" },
    { value: "95%", label: "Client Satisfaction Rate" },
    { value: "24/7", label: "Support Availability" }
  ];

  const tabs = [
    {
      id: "advisory-tools",
      label: "Advisory Tools",
      icon: <Target className="h-4 w-4" />,
      content: <AdvisoryToolsContent />
    },
    {
      id: "expert-advisors",
      label: "Expert Advisors",
      icon: <Users className="h-4 w-4" />,
      content: <ExpertAdvisorsContent />
    },
    {
      id: "my-sessions",
      label: "My Sessions",
      icon: <Calendar className="h-4 w-4" />,
      content: <MySessionsContent />
    },
    {
      id: "career-planning",
      label: "Career Planning",
      icon: <TrendingUp className="h-4 w-4" />,
      content: <CareerPlanningContent />
    },
    {
      id: "resources",
      label: "Resources",
      icon: <BookOpen className="h-4 w-4" />,
      content: <ResourcesContent />
    },
    {
      id: "community",
      label: "Community",
      icon: <MessageSquare className="h-4 w-4" />,
      content: <CommunityContent />
    }
  ];

  return (
    <CareerPageLayout
      title="Career Advisory Services"
      description="Get personalized career guidance from certified professionals and industry experts to accelerate your professional growth and achieve your career goals."
      heroIcon={<Users className="h-8 w-8 text-white" />}
      primaryActionLabel="Find Your Advisor"
      primaryActionIcon={<Users className="h-4 w-4" />}
      primaryActionOnClick={handlePrimaryAction}
      secondaryActionLabel="Take Assessment"
      secondaryActionIcon={<Target className="h-4 w-4" />}
      secondaryActionOnClick={handleSecondaryAction}
      stats={stats}
      quote="Expert guidance transforms career aspirations into achievable milestones"
      attribution="UAE Career Development Council"
      quoteIcon={<Star className="h-8 w-8 text-white" />}
      tabs={tabs}
      defaultTab="advisory-tools"
    />
  );
};

export default CareerAdvisoryPage;
