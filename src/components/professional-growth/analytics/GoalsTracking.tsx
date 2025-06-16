
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Calendar, Plus, CheckCircle, Clock, Pause } from 'lucide-react';
import { ProfessionalGoal } from '@/types/professionalGrowthAnalytics';

interface GoalsTrackingProps {
  goals: ProfessionalGoal[];
  onGoalUpdate: () => void;
}

export const GoalsTracking: React.FC<GoalsTrackingProps> = ({ goals, onGoalUpdate }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all');

  const filteredGoals = filter === 'all' ? goals : goals.filter(goal => goal.status === filter);
  
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'default';
      case 'paused': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'active': return <Clock className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Professional Goals</h3>
          <p className="text-muted-foreground">Track your professional development objectives and milestones</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Goals Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-sm text-muted-foreground">Total Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {Math.round((completedGoals.length / goals.length) * 100) || 0}%
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed', 'paused'] as const).map(status => (
          <Button 
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === 'all' ? 'All Goals' : status}
          </Button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(goal.status)} className="flex items-center gap-1">
                    {getStatusIcon(goal.status)}
                    {goal.status}
                  </Badge>
                  <Badge variant="outline">{goal.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                </div>

                {/* Target Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>

                {/* Milestones */}
                <div>
                  <h5 className="font-medium mb-2">Milestones</h5>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${
                          milestone.completed ? 'text-green-500' : 'text-gray-300'
                        }`} />
                        <span className={`text-sm ${
                          milestone.completed ? 'line-through text-muted-foreground' : ''
                        }`}>
                          {milestone.title}
                        </span>
                        {milestone.completed && milestone.completedDate && (
                          <span className="text-xs text-muted-foreground">
                            ({new Date(milestone.completedDate).toLocaleDateString()})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Edit Goal
                  </Button>
                  {goal.status === 'active' && (
                    <Button variant="outline" size="sm">
                      Update Progress
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Goals Found</h3>
            <p className="text-muted-foreground mb-4">
              {filter === 'all' 
                ? 'Set your first professional development goal to get started!'
                : `No ${filter} goals found.`
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
