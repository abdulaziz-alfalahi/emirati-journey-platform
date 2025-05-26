
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  FileText, 
  MessageSquare,
  Bell,
  User,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface MobileDashboardProps {
  user: any;
  roles: string[];
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ user, roles }) => {
  const navigate = useNavigate();

  const quickActions = [
    { 
      icon: FileText, 
      label: 'CV Builder', 
      path: '/cv-builder',
      color: 'bg-blue-500'
    },
    { 
      icon: Briefcase, 
      label: 'Jobs', 
      path: '/job-matching',
      color: 'bg-green-500'
    },
    { 
      icon: GraduationCap, 
      label: 'Training', 
      path: '/training',
      color: 'bg-purple-500'
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: '/messages',
      color: 'bg-orange-500'
    },
  ];

  const stats = [
    { label: 'Profile Complete', value: '85%', icon: User },
    { label: 'Job Matches', value: '12', icon: TrendingUp },
    { label: 'Next Session', value: 'Tomorrow', icon: Calendar },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-emirati-teal to-emirati-navy text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-white/80">Your Emirati Journey continues</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {roles.slice(0, 2).map((role) => (
              <Badge key={role} variant="secondary" className="bg-white/20 text-white">
                {role.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.path}
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => navigate(action.path)}
              >
                <div className={`p-2 rounded-full ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <stat.icon className="h-5 w-5 text-emirati-teal" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-emirati-navy">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;
