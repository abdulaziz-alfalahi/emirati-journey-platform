
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTouchInteractions } from '@/hooks/use-touch-interactions';
import { useOfflineStorage } from '@/hooks/use-offline-storage';
import MobilePullToRefresh from './MobilePullToRefresh';
import MobileSwipeableCard from './MobileSwipeableCard';
import MobileOfflineIndicator from './MobileOfflineIndicator';
import { 
  Briefcase, 
  GraduationCap, 
  FileText, 
  MessageSquare,
  User,
  TrendingUp,
  Calendar,
  Heart,
  BookmarkPlus,
  Share,
  Trash2,
  WifiOff
} from 'lucide-react';

interface MobileTouchOptimizedDashboardProps {
  user: any;
  roles: string[];
}

const MobileTouchOptimizedDashboard: React.FC<MobileTouchOptimizedDashboardProps> = ({ 
  user, 
  roles 
}) => {
  const navigate = useNavigate();
  const { triggerHaptic } = useTouchInteractions();
  const { isOnline } = useOfflineStorage();

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    triggerHaptic('light');
  };

  const handleQuickAction = (path: string) => {
    triggerHaptic('light');
    navigate(path);
  };

  // Update quick actions based on offline status
  const quickActions = [
    { 
      icon: FileText, 
      label: 'CV Builder', 
      path: '/cv-builder',
      color: 'bg-blue-500',
      offline: true // Available offline
    },
    { 
      icon: Briefcase, 
      label: isOnline ? 'Jobs' : 'Saved Jobs', 
      path: isOnline ? '/job-matching' : '/mobile-offline',
      color: 'bg-green-500',
      offline: false // Limited offline functionality
    },
    { 
      icon: GraduationCap, 
      label: 'Training', 
      path: '/training',
      color: 'bg-purple-500',
      offline: false
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: '/messages',
      color: 'bg-orange-500',
      offline: false
    },
  ];

  const stats = [
    { label: 'Profile Complete', value: '85%', icon: User },
    { label: 'Job Matches', value: isOnline ? '12' : 'Offline', icon: TrendingUp },
    { label: 'Next Session', value: 'Tomorrow', icon: Calendar },
  ];

  const mockNotifications = [
    {
      id: '1',
      title: isOnline ? 'New Job Match' : 'Offline Mode Active',
      message: isOnline ? 'Software Developer at Emirates Group' : 'Your data is saved locally',
      time: '2h ago'
    },
    {
      id: '2',
      title: 'Training Reminder',
      message: 'AWS Certification course starts tomorrow',
      time: '4h ago'
    }
  ];

  return (
    <MobilePullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6 p-4">
        {/* Offline Indicator */}
        <MobileOfflineIndicator />

        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-emirati-teal to-emirati-navy text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">
                Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
              </h2>
              {!isOnline && (
                <WifiOff className="h-5 w-5 text-white/80" />
              )}
            </div>
            <p className="text-white/80">
              {isOnline ? 'Your Emirati Journey continues' : 'Working offline - data saved locally'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {roles.slice(0, 2).map((role) => (
                <Badge key={role} variant="secondary" className="bg-white/20 text-white">
                  {role.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Touch-Optimized Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.path}
                  variant="outline"
                  className="h-24 flex-col space-y-2 touch-manipulation relative"
                  style={{ minHeight: '48px' }}
                  onClick={() => handleQuickAction(action.path)}
                  disabled={!isOnline && !action.offline}
                >
                  <div className={`p-3 rounded-full ${action.color} ${!isOnline && !action.offline ? 'opacity-50' : ''}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                  {!isOnline && !action.offline && (
                    <WifiOff className="h-3 w-3 absolute top-2 right-2 text-gray-400" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Swipeable Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.map((stat) => (
                <MobileSwipeableCard
                  key={stat.label}
                  rightActions={[
                    {
                      icon: Share,
                      label: 'Share',
                      color: 'blue',
                      action: () => triggerHaptic('light')
                    }
                  ]}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <stat.icon className="h-5 w-5 text-emirati-teal" />
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold text-emirati-navy">{stat.value}</span>
                  </div>
                </MobileSwipeableCard>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Swipeable Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <MobileSwipeableCard
                  key={notification.id}
                  leftActions={[
                    {
                      icon: Heart,
                      label: 'Like',
                      color: 'green',
                      action: () => triggerHaptic('medium')
                    },
                    {
                      icon: BookmarkPlus,
                      label: 'Save',
                      color: 'blue',
                      action: () => triggerHaptic('medium')
                    }
                  ]}
                  rightActions={[
                    {
                      icon: Trash2,
                      label: 'Delete',
                      color: 'red',
                      action: () => triggerHaptic('heavy')
                    }
                  ]}
                >
                  <div className="p-4">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {notification.time}
                    </span>
                  </div>
                </MobileSwipeableCard>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobilePullToRefresh>
  );
};

export default MobileTouchOptimizedDashboard;
