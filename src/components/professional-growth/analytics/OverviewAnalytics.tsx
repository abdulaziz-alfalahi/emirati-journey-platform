
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Lightbulb, 
  Network,
  BookOpen,
  Calendar,
  Target
} from 'lucide-react';
import { ProfessionalGrowthAnalytics } from '@/types/professionalGrowthAnalytics';

interface OverviewAnalyticsProps {
  analytics: ProfessionalGrowthAnalytics;
}

export const OverviewAnalytics: React.FC<OverviewAnalyticsProps> = ({ analytics }) => {
  const { overallProgress, insights, achievements, goals } = analytics;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Development</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.skillsDevelopment.completionPercentage}%
            </div>
            <Progress value={overallProgress.skillsDevelopment.completionPercentage} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {overallProgress.skillsDevelopment.skillsAcquired} skills acquired • 
              {overallProgress.skillsDevelopment.timeInvested}h invested
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.certifications.completed}
            </div>
            <div className="flex gap-2 mb-2">
              <Badge variant="success">{overallProgress.certifications.completed} Complete</Badge>
              <Badge variant="outline">{overallProgress.certifications.inProgress} In Progress</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {overallProgress.certifications.totalCreditsEarned} credits earned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leadership Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.leadership.leadershipSkillsLevel}/10
            </div>
            <Progress value={overallProgress.leadership.leadershipSkillsLevel * 10} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {overallProgress.leadership.teamProjectsLed} projects led • 
              {overallProgress.leadership.mentorshipRelationships} mentorship relationships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Innovation Impact</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.innovation.innovationScore}
            </div>
            <Progress value={overallProgress.innovation.innovationScore} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {overallProgress.innovation.projectsLed} projects led • 
              {overallProgress.innovation.ideasContributed} ideas contributed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professional Network</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.networking.professionalConnections}
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>{overallProgress.networking.eventsAttended} events attended</p>
              <p>{overallProgress.networking.speakingEngagements} speaking engagements</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentorship Success</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {overallProgress.mentorship.satisfactionRating}/5
            </div>
            <Progress value={overallProgress.mentorship.satisfactionRating * 20} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              {overallProgress.mentorship.sessionsCompleted} sessions • 
              {overallProgress.mentorship.goalsAchieved} goals achieved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <div key={insight.id} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className={`p-2 rounded-full ${
                  insight.trend === 'up' ? 'bg-green-100' : 
                  insight.trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${
                    insight.trend === 'up' ? 'text-green-600' : 
                    insight.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    {insight.value && (
                      <Badge variant={insight.trend === 'up' ? 'success' : 'secondary'}>
                        {insight.value}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`p-3 rounded-full ${
                  achievement.rarity === 'legendary' ? 'bg-yellow-100' :
                  achievement.rarity === 'epic' ? 'bg-purple-100' :
                  achievement.rarity === 'rare' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Award className={`h-5 w-5 ${
                    achievement.rarity === 'legendary' ? 'text-yellow-600' :
                    achievement.rarity === 'epic' ? 'text-purple-600' :
                    achievement.rarity === 'rare' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <Badge variant="outline" className="capitalize">
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(achievement.dateEarned).toLocaleDateString()}
                    </span>
                    <span>{achievement.points} points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Goals Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.filter(goal => goal.status === 'active').slice(0, 3).map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{goal.category}</span>
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
