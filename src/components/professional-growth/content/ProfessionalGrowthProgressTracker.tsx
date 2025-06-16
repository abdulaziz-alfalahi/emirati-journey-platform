
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Award, Target, Users, Lightbulb, Network, BarChart3 } from 'lucide-react';
import { ProfessionalGrowthAnalyticsDashboard } from '../analytics/ProfessionalGrowthAnalyticsDashboard';

interface ProfessionalGrowthProgressTrackerProps {
  userId: string;
  showFullAnalytics?: boolean;
}

export const ProfessionalGrowthProgressTracker: React.FC<ProfessionalGrowthProgressTrackerProps> = ({
  userId,
  showFullAnalytics = false
}) => {
  const [showAnalytics, setShowAnalytics] = useState(showFullAnalytics);

  // Quick progress overview data
  const quickStats = {
    overallProgress: 68,
    skillsCompleted: 24,
    certificationsEarned: 5,
    networkingScore: 78,
    leadershipLevel: 6,
    innovationProjects: 3
  };

  if (showAnalytics) {
    return <ProfessionalGrowthAnalyticsDashboard userId={userId} />;
  }

  return (
    <div className="space-y-6">
      {/* Quick Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />
              Your Professional Growth Journey
            </CardTitle>
            <Button variant="outline" onClick={() => setShowAnalytics(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Full Analytics
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{quickStats.overallProgress}%</span>
              </div>
              <Progress value={quickStats.overallProgress} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-semibold">{quickStats.skillsCompleted}</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Developed</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-semibold">{quickStats.certificationsEarned}</span>
                </div>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-lg font-semibold">{quickStats.leadershipLevel}/10</span>
                </div>
                <p className="text-sm text-muted-foreground">Leadership Level</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Network className="h-4 w-4 text-teal-600" />
                  <span className="text-lg font-semibold">{quickStats.networkingScore}</span>
                </div>
                <p className="text-sm text-muted-foreground">Networking Score</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-orange-600" />
                  <span className="text-lg font-semibold">{quickStats.innovationProjects}</span>
                </div>
                <p className="text-sm text-muted-foreground">Innovation Projects</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-pink-600" />
                  <span className="text-lg font-semibold">+15%</span>
                </div>
                <p className="text-sm text-muted-foreground">Growth This Month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Achievement Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <Award className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Digital Leadership Certified</h4>
                <p className="text-sm text-muted-foreground">Completed advanced digital leadership program</p>
              </div>
              <Badge variant="outline">Epic</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Innovation Champion</h4>
                <p className="text-sm text-muted-foreground">Led successful innovation project</p>
              </div>
              <Badge variant="outline">Rare</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Complete Skill Assessment</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Identify your next learning opportunities
              </p>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">Find a Mentor</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                Connect with industry professionals
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
