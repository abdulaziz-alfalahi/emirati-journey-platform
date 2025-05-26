
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';

const MobileQuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { roles } = useAuth();

  const getQuickActions = () => {
    const baseActions = [
      {
        icon: FileText,
        label: 'Update CV',
        path: '/cv-builder',
        description: 'Keep your CV current',
        color: 'bg-blue-500'
      },
      {
        icon: Briefcase,
        label: 'Find Jobs',
        path: '/job-matching',
        description: 'Discover opportunities',
        color: 'bg-green-500'
      },
    ];

    // Add role-specific actions
    if (roles.includes('school_student') || roles.includes('university_student')) {
      baseActions.push({
        icon: GraduationCap,
        label: 'Scholarships',
        path: '/scholarships',
        description: 'Apply for funding',
        color: 'bg-purple-500'
      });
    }

    if (roles.includes('jobseeker') || roles.includes('intern')) {
      baseActions.push({
        icon: TrendingUp,
        label: 'Assessments',
        path: '/assessments',
        description: 'Test your skills',
        color: 'bg-orange-500'
      });
    }

    baseActions.push(
      {
        icon: Calendar,
        label: 'Career Advisory',
        path: '/career-advisory',
        description: 'Book a session',
        color: 'bg-indigo-500'
      },
      {
        icon: Award,
        label: 'Training',
        path: '/training',
        description: 'Enhance skills',
        color: 'bg-pink-500'
      }
    );

    return baseActions.slice(0, 6); // Limit to 6 actions for mobile
  };

  const quickActions = getQuickActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.path}
              variant="outline"
              className="h-24 flex-col space-y-2 text-left p-3"
              onClick={() => navigate(action.path)}
            >
              <div className={`p-2 rounded-full ${action.color} self-center`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileQuickActions;
