
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Star, Share, Download } from 'lucide-react';
import { Achievement } from '@/types/professionalGrowthAnalytics';

interface AchievementsDisplayProps {
  achievements: Achievement[];
}

export const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({ achievements }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'skill', 'certification', 'leadership', 'innovation', 'networking', 'mentorship'];
  
  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certification': return <Award className="h-5 w-5" />;
      case 'leadership': return <Star className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Professional Achievements</h3>
          <p className="text-muted-foreground">Your professional development milestones and recognitions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{achievements.filter(a => a.rarity === 'legendary').length}</div>
            <p className="text-sm text-muted-foreground">Legendary</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{achievements.filter(a => a.rarity === 'epic').length}</div>
            <p className="text-sm text-muted-foreground">Epic</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{achievements.filter(a => a.rarity === 'rare').length}</div>
            <p className="text-sm text-muted-foreground">Rare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{achievements.reduce((sum, a) => sum + a.points, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button 
            key={category}
            variant={filter === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(category)}
            className="capitalize"
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(achievement.category)}
                  <Badge variant="outline" className="capitalize">
                    {achievement.category}
                  </Badge>
                </div>
                <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                  {achievement.rarity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(achievement.dateEarned).toLocaleDateString()}
                </div>
                <div className="font-medium">
                  {achievement.points} points
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Achievements Yet</h3>
            <p className="text-muted-foreground">
              {filter === 'all' 
                ? 'Start your professional development journey to earn achievements!'
                : `No ${filter} achievements yet. Keep working towards your goals!`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
