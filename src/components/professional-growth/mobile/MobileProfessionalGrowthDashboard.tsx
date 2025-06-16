
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Users, 
  ChevronRight,
  BarChart3,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useTouchInteractions } from '@/hooks/use-touch-interactions';

interface MobileProfessionalGrowthDashboardProps {
  userId: string;
}

export const MobileProfessionalGrowthDashboard: React.FC<MobileProfessionalGrowthDashboardProps> = ({
  userId
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const { handleTouchStart, handleTouchEnd, triggerHaptic } = useTouchInteractions();

  // Mock data for mobile display
  const quickStats = {
    overallProgress: 68,
    skillsCompleted: 24,
    certificationsEarned: 5,
    networkingScore: 78,
    achievementPoints: 1250
  };

  const recentAchievements = [
    { id: '1', title: 'Digital Leadership Certified', type: 'certification', date: '2 days ago' },
    { id: '2', title: 'Innovation Champion', type: 'skill', date: '1 week ago' },
    { id: '3', title: 'Team Collaboration Expert', type: 'skill', date: '2 weeks ago' }
  ];

  const quickActions = [
    { icon: Target, label: 'Take Assessment', color: 'bg-blue-500' },
    { icon: Users, label: 'Find Mentor', color: 'bg-green-500' },
    { icon: BarChart3, label: 'View Analytics', color: 'bg-purple-500' },
    { icon: Award, label: 'Certifications', color: 'bg-orange-500' }
  ];

  return (
    <div className="pb-20 bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-b-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Professional Growth</h1>
          <Button variant="ghost" size="sm" className="text-white">
            <BarChart3 className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progress Ring */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center">
              <div className="text-2xl font-bold">{quickStats.overallProgress}%</div>
            </div>
          </div>
          <p className="mt-2 text-white/90">Overall Progress</p>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="p-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold">{quickStats.skillsCompleted}</div>
              <div className="text-xs text-muted-foreground">Skills</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold">{quickStats.certificationsEarned}</div>
              <div className="text-xs text-muted-foreground">Certificates</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold">{quickStats.networkingScore}</div>
              <div className="text-xs text-muted-foreground">Network Score</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold">{quickStats.achievementPoints}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 touch-manipulation"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, () => triggerHaptic('light'))}
                  >
                    <div className={`p-2 rounded-full ${action.color}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Achievements
              <Badge variant="secondary">{recentAchievements.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="flex items-center gap-3 p-3 border rounded-lg touch-manipulation active:bg-gray-50"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, () => triggerHaptic('light'))}
                >
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{achievement.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {achievement.date}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Goals */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Complete Data Science Certification</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Build Professional Network</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Leadership Skills Development</span>
                  <span className="text-muted-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
