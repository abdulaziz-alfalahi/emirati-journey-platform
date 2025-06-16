
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Users, 
  Lightbulb, 
  Network,
  BookOpen,
  Star,
  Calendar,
  BarChart3,
  Download,
  Share
} from 'lucide-react';
import { ProfessionalGrowthAnalytics, Achievement, ProfessionalGoal } from '@/types/professionalGrowthAnalytics';
import { OverviewAnalytics } from './OverviewAnalytics';
import { SkillsAnalytics } from './SkillsAnalytics';
import { AchievementsDisplay } from './AchievementsDisplay';
import { GoalsTracking } from './GoalsTracking';
import { RecommendationsPanel } from './RecommendationsPanel';

interface ProfessionalGrowthAnalyticsDashboardProps {
  userId: string;
}

export const ProfessionalGrowthAnalyticsDashboard: React.FC<ProfessionalGrowthAnalyticsDashboardProps> = ({
  userId
}) => {
  const [analytics, setAnalytics] = useState<ProfessionalGrowthAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalytics();
  }, [userId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration - replace with actual API call
      const mockAnalytics: ProfessionalGrowthAnalytics = {
        overallProgress: {
          skillsDevelopment: {
            currentLevel: 7,
            targetLevel: 10,
            completionPercentage: 70,
            skillsAcquired: 24,
            timeInvested: 120,
            lastActivity: '2024-01-15'
          },
          certifications: {
            completed: 5,
            inProgress: 2,
            planned: 3,
            totalCreditsEarned: 150,
            industryRecognitions: 2
          },
          leadership: {
            leadershipSkillsLevel: 6,
            teamProjectsLed: 3,
            mentorshipRelationships: 2,
            leadershipCertifications: 1,
            communityContributions: 8
          },
          innovation: {
            projectsParticipated: 5,
            projectsLed: 2,
            ideasContributed: 12,
            collaborations: 8,
            innovationScore: 85
          },
          networking: {
            professionalConnections: 45,
            eventsAttended: 12,
            speakingEngagements: 2,
            industryMentors: 3,
            networkingScore: 78
          },
          mentorship: {
            mentorsConnected: 2,
            menteesGuided: 1,
            sessionsCompleted: 15,
            goalsAchieved: 8,
            satisfactionRating: 4.8
          }
        },
        achievements: [
          {
            id: '1',
            title: 'Digital Leadership Certified',
            description: 'Completed advanced digital leadership certification',
            category: 'certification',
            icon: 'award',
            dateEarned: '2024-01-10',
            rarity: 'epic',
            points: 500
          },
          {
            id: '2',
            title: 'Innovation Champion',
            description: 'Led successful innovation project with measurable impact',
            category: 'innovation',
            icon: 'lightbulb',
            dateEarned: '2024-01-05',
            rarity: 'rare',
            points: 300
          }
        ],
        goals: [
          {
            id: '1',
            title: 'Become Senior Technical Lead',
            description: 'Advance to senior technical leadership role within 12 months',
            category: 'Career Advancement',
            targetDate: '2024-12-31',
            progress: 65,
            status: 'active',
            milestones: [
              { id: '1a', title: 'Complete Advanced Architecture Course', completed: true, completedDate: '2024-01-01' },
              { id: '1b', title: 'Lead 2 Major Projects', completed: true, completedDate: '2024-01-08' },
              { id: '1c', title: 'Obtain Cloud Certification', completed: false },
              { id: '1d', title: 'Present at Industry Conference', completed: false }
            ]
          }
        ],
        recommendations: [
          {
            id: '1',
            type: 'certification',
            title: 'Cloud Architecture Certification',
            description: 'Based on your career goals, this certification will strengthen your technical leadership profile',
            priority: 'high',
            estimatedTime: '2-3 months',
            benefits: ['Industry recognition', 'Technical credibility', 'Career advancement'],
            actionUrl: '/professional-certifications'
          }
        ],
        insights: [
          {
            id: '1',
            type: 'progress',
            title: 'Strong Leadership Growth',
            description: 'Your leadership skills have improved 40% over the past 6 months',
            icon: 'trending-up',
            value: '+40%',
            trend: 'up'
          }
        ]
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    console.log('Exporting professional development data...');
    // Implement export functionality
  };

  const handleShareAchievements = () => {
    console.log('Sharing professional achievements...');
    // Implement sharing functionality
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Analytics Available</h3>
          <p className="text-muted-foreground">
            Start your professional development journey to see your progress analytics.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Professional Growth Analytics</h2>
          <p className="text-muted-foreground">
            Track your professional development journey and achievements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleShareAchievements}>
            <Share className="h-4 w-4 mr-2" />
            Share Achievements
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skills Progress</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.skillsDevelopment.completionPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certifications</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.certifications.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leadership</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.leadership.leadershipSkillsLevel}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Lightbulb className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Innovation</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.innovation.innovationScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-full">
                <Network className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Network</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.networking.professionalConnections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-full">
                <Star className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentorship</p>
                <p className="text-lg font-semibold">{analytics.overallProgress.mentorship.satisfactionRating}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewAnalytics analytics={analytics} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsAnalytics analytics={analytics} />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsDisplay achievements={analytics.achievements} />
        </TabsContent>

        <TabsContent value="goals">
          <GoalsTracking goals={analytics.goals} onGoalUpdate={loadAnalytics} />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationsPanel recommendations={analytics.recommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
