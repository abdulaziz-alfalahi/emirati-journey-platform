
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  Users,
  Award,
  Target,
  Lightbulb,
  BarChart3,
  Star,
  BookOpen,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { useTouchInteractions } from '@/hooks/use-touch-interactions';

interface MobileProfessionalGrowthNavProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

interface NavItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
  progress?: number;
}

export const MobileProfessionalGrowthNav: React.FC<MobileProfessionalGrowthNavProps> = ({
  onNavigate,
  activeSection
}) => {
  const { handleTouchStart, handleTouchEnd, triggerHaptic } = useTouchInteractions();

  const navItems: NavItem[] = [
    {
      id: 'skills-assessment',
      title: 'Skills Assessment',
      description: 'Evaluate your current capabilities',
      icon: Target,
      color: 'bg-blue-500',
      badge: 'New',
      progress: 75
    },
    {
      id: 'mentorship',
      title: 'Find Mentors',
      description: 'Connect with industry experts',
      icon: Users,
      color: 'bg-green-500',
      badge: '5 matches'
    },
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Earn professional credentials',
      icon: Award,
      color: 'bg-orange-500',
      progress: 40
    },
    {
      id: 'innovation',
      title: 'Innovation Hub',
      description: 'Join collaborative projects',
      icon: Lightbulb,
      color: 'bg-purple-500',
      badge: '3 active'
    },
    {
      id: 'networking',
      title: 'Networking Events',
      description: 'Build professional connections',
      icon: Calendar,
      color: 'bg-pink-500',
      badge: 'This week'
    },
    {
      id: 'leadership',
      title: 'Leadership Development',
      description: 'Enhance leadership skills',
      icon: TrendingUp,
      color: 'bg-indigo-500',
      progress: 60
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'Get inspired by others',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      id: 'analytics',
      title: 'Progress Analytics',
      description: 'Track your development',
      icon: BarChart3,
      color: 'bg-teal-500'
    }
  ];

  const handleItemPress = (itemId: string) => {
    triggerHaptic('medium');
    onNavigate(itemId);
  };

  return (
    <div className="px-4 pb-20 space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Professional Growth</h2>
        <p className="text-muted-foreground text-sm">
          Continue your professional development journey
        </p>
      </div>

      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Card 
            key={item.id}
            className={`shadow-md transition-all duration-200 touch-manipulation ${
              isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg active:scale-98'
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, () => handleItemPress(item.id))}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-full ${item.color} flex-shrink-0`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base truncate">{item.title}</h3>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Progress bar for items with progress */}
                  {item.progress !== undefined && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chevron */}
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
