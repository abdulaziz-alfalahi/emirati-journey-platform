
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AchievementsPanel } from './AchievementsPanel';
import { ProgressStreaks } from './ProgressStreaks';
import { Leaderboard } from './Leaderboard';
import { PointsSystem } from './PointsSystem';

export const GamificationDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Gamification</h2>
        <p className="text-muted-foreground">
          Track your progress, earn achievements, and compete with other learners
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="points">Points</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PointsSystem />
            <div className="space-y-6">
              <ProgressStreaks />
              <div className="grid grid-cols-1 gap-6">
                <Leaderboard />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsPanel />
        </TabsContent>

        <TabsContent value="streaks">
          <ProgressStreaks />
        </TabsContent>

        <TabsContent value="leaderboard">
          <Leaderboard />
        </TabsContent>

        <TabsContent value="points">
          <PointsSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};
