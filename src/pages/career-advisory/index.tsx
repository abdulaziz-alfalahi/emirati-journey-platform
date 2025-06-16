
import React, { useState, useEffect } from 'react';
import { CareerPageLayout } from '@/components/career/CareerPageLayout';
import { AuthenticationRequired } from '@/components/auth/AuthenticationRequired';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, UserCheck, Calendar, MessageCircle, BookOpen, 
  Target, TrendingUp, Award, Shield, Star, Search,
  Clock, Video, CheckCircle, ArrowRight
} from 'lucide-react';
import AdvisoryDashboard from '@/components/career-advisory/AdvisoryDashboard';
import AdvisorPortfolio from '@/components/career-advisory/AdvisorPortfolio';
import AdvisorScheduling from '@/components/career-advisory/AdvisorScheduling';
import InterviewPrep from '@/components/career-advisory/InterviewPrep';
import ResourceLibrary from '@/components/career-advisory/ResourceLibrary';
import { AdvisorySession } from '@/types/careerAdvisory';

// Career Assessment Component
const CareerAssessmentTools: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  
  const assessments = [
    {
      id: 'personality',
      title: 'Personality & Strengths Assessment',
      description: 'Discover your unique personality traits and professional strengths',
      duration: '15-20 minutes',
      type: 'Comprehensive'
    },
    {
      id: 'skills',
      title: 'Skills Gap Analysis',
      description: 'Identify skill gaps and development opportunities in your field',
      duration: '10-15 minutes',
      type: 'Technical'
    },
    {
      id: 'interests',
      title: 'Career Interest Inventory',
      description: 'Explore career paths that align with your interests and values',
      duration: '12-18 minutes',
      type: 'Exploratory'
    },
    {
      id: 'readiness',
      title: 'Career Transition Readiness',
      description: 'Assess your readiness for career changes and transitions',
      duration: '8-12 minutes',
      type: 'Strategic'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{assessment.title}</h3>
                  <p className="text-muted-foreground mb-3">{assessment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {assessment.duration}
                    </span>
                    <Badge variant="outline">{assessment.type}</Badge>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => setSelectedAssessment(assessment.id)}
              >
                Start Assessment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Expert Advisor Card Component
const AdvisorCard: React.FC<{
  advisor: {
    id: string;
    name: string;
    specialization: string;
    experience: string;
    rating: number;
    sessions: number;
    availability: string;
    expertise: string[];
  };
  onSchedule: (advisorId: string) => void;
}> = ({ advisor, onSchedule }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-ehrdc-teal to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {advisor.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{advisor.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{advisor.rating}</span>
              </div>
            </div>
            <p className="text-ehrdc-teal font-medium mb-2">{advisor.specialization}</p>
            <p className="text-muted-foreground text-sm mb-3">{advisor.experience}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {advisor.expertise.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {advisor.expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{advisor.expertise.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {advisor.sessions} sessions
                </span>
              </div>
              <Button size="sm" onClick={() => onSchedule(advisor.id)}>
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Advisory Session Component
const AdvisorySessionCard: React.FC<{
  session: {
    id: string;
    advisorName: string;
    type: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    topic: string;
  };
}> = ({ session }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold">{session.topic}</h4>
            <p className="text-sm text-muted-foreground">with {session.advisorName}</p>
          </div>
          <Badge className={getStatusColor(session.status)}>
            {getStatusIcon(session.status)}
            <span className="ml-1 capitalize">{session.status}</span>
          </Badge>
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{session.date} at {session.time}</span>
          <Badge variant="outline">{session.type}</Badge>
        </div>
        
        {session.status === 'upcoming' && (
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Video className="h-4 w-4 mr-1" />
              Join Session
            </Button>
            <Button size="sm" variant="outline">
              Reschedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CareerAdvisoryPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock session data
  const mockSession: AdvisorySession = {
    id: '1',
    user_id: 'user1',
    advisor_id: 'advisor1',
    status: 'scheduled' as const,
    scheduled_date: new Date().toISOString(),
    completed_date: null,
    topic: 'Career Development Strategy',
    details: 'Comprehensive career planning and development strategy session',
    notes: null,
    rating: null,
    feedback: null,
    video_call_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_interview: false,
    interview_type: null,
    interview_questions: null
  };

  // Mock advisor data
  const mockAdvisors = [
    {
      id: '1',
      name: 'Dr. Sarah Al-Mansouri',
      specialization: 'Career Strategy & Leadership',
      experience: '15+ years in executive coaching',
      rating: 4.9,
      sessions: 250,
      availability: 'Available this week',
      expertise: ['Leadership Development', 'Career Transitions', 'Executive Coaching', 'Strategic Planning']
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      specialization: 'Technology & Innovation',
      experience: '12+ years in tech consulting',
      rating: 4.8,
      sessions: 180,
      availability: 'Available next week',
      expertise: ['Tech Careers', 'Innovation Strategy', 'Startup Guidance', 'Digital Transformation']
    }
  ];

  // Mock session data
  const mockSessions = [
    {
      id: '1',
      advisorName: 'Dr. Sarah Al-Mansouri',
      type: 'Strategy Session',
      date: 'Dec 18, 2024',
      time: '2:00 PM',
      status: 'upcoming' as const,
      topic: 'Career Development Planning'
    },
    {
      id: '2',
      advisorName: 'Ahmed Hassan',
      type: 'Technical Review',
      date: 'Dec 15, 2024',
      time: '10:00 AM',
      status: 'completed' as const,
      topic: 'Technology Career Path'
    }
  ];

  const handleSessionUpdate = (updatedSession: AdvisorySession) => {
    console.log('Session updated:', updatedSession);
    toast({
      title: "Session Updated",
      description: "Your advisory session has been updated successfully."
    });
  };

  const handleScheduleAdvisor = (advisorId: string) => {
    toast({
      title: "Schedule Session",
      description: "Redirecting to scheduling interface..."
    });
  };

  if (!user) {
    return (
      <CareerPageLayout
        title="Career Advisory"
        description="Professional career guidance and personalized advisory services to accelerate your professional growth"
        heroIcon={<Users className="h-8 w-8 text-white" />}
        primaryActionLabel="Sign In to Access Advisory"
        primaryActionIcon={<Users className="h-5 w-5" />}
        stats={[
          { value: "200+", label: "Expert Advisors" },
          { value: "5,000+", label: "Sessions Completed" },
          { value: "92%", label: "Success Rate" },
          { value: "24/7", label: "Support Available" }
        ]}
        quote="The best career advice comes from those who've walked the path before you and can guide you through the journey ahead."
        attribution="Career Development Institute"
        quoteIcon={<Target className="h-8 w-8 text-white" />}
        tabs={[]}
        defaultTab=""
      >
        <AuthenticationRequired 
          message="Please log in to access personalized career advisory services and expert guidance" 
          icon={<Users className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      </CareerPageLayout>
    );
  }

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {mockSessions.filter(s => s.status === 'upcoming').map(session => (
                    <AdvisorySessionCard key={session.id} session={session} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {mockSessions.filter(s => s.status === 'completed').map(session => (
                    <AdvisorySessionCard key={session.id} session={session} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <AdvisoryDashboard />
        </div>
      )
    },
    {
      id: 'assessment',
      label: 'Career Assessment',
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Career Assessment Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take comprehensive assessments to understand your strengths, interests, and career preferences for personalized guidance.
            </p>
          </div>
          <CareerAssessmentTools />
        </div>
      )
    },
    {
      id: 'advisors',
      label: 'Find Advisors',
      icon: <UserCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Expert Advisors</h2>
              <p className="text-muted-foreground">Connect with certified career professionals</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {mockAdvisors.map(advisor => (
              <AdvisorCard 
                key={advisor.id} 
                advisor={advisor} 
                onSchedule={handleScheduleAdvisor}
              />
            ))}
          </div>
          
          <AdvisorPortfolio />
        </div>
      )
    },
    {
      id: 'scheduling',
      label: 'Schedule Session',
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Schedule Advisory Session</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book personalized career guidance sessions with our expert advisors at your convenience.
            </p>
          </div>
          <AdvisorScheduling />
        </div>
      )
    },
    {
      id: 'interview',
      label: 'Interview Prep',
      icon: <MessageCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Interview Preparation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practice interviews with expert feedback and personalized coaching to improve your performance.
            </p>
          </div>
          <InterviewPrep session={mockSession} onSessionUpdate={handleSessionUpdate} />
        </div>
      )
    },
    {
      id: 'resources',
      label: 'Resource Library',
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Career Development Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive resources, guides, and tools for professional development and career advancement.
            </p>
          </div>
          <ResourceLibrary />
        </div>
      )
    }
  ];

  return (
    <CareerPageLayout
      title="Career Advisory"
      description="Professional career guidance and personalized advisory services to accelerate your professional growth and achieve your career objectives"
      heroIcon={<Users className="h-8 w-8 text-white" />}
      primaryActionLabel="Schedule Free Consultation"
      primaryActionIcon={<Calendar className="h-5 w-5" />}
      primaryActionOnClick={() => toast({ title: "Scheduling", description: "Opening consultation booking..." })}
      secondaryActionLabel="Browse Advisors"
      secondaryActionIcon={<Search className="h-5 w-5" />}
      secondaryActionOnClick={() => toast({ title: "Browse", description: "Exploring advisor profiles..." })}
      stats={[
        { value: "200+", label: "Expert Advisors" },
        { value: "5,000+", label: "Sessions Completed" },
        { value: "92%", label: "Success Rate" },
        { value: "24/7", label: "Support Available" }
      ]}
      quote="The best career advice comes from those who've walked the path before you and can guide you through the journey ahead."
      attribution="Career Development Institute"
      quoteIcon={<Target className="h-8 w-8 text-white" />}
      tabs={tabs}
      defaultTab="dashboard"
    />
  );
};

export default CareerAdvisoryPage;
