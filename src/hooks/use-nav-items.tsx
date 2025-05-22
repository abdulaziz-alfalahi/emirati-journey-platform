import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  BadgeCheck, 
  BookText, 
  Briefcase, 
  Calendar, 
  Compass, 
  FileText, 
  HelpingHand 
} from 'lucide-react';
import { NavItem, NavGroup } from '@/components/layout/types';
import { UserRole } from '@/types/auth';

export function useNavItems() {
  const getMainNavGroups = (): NavGroup[] => {
    const groups: NavGroup[] = [
      {
        id: 'student-services',
        name: 'Student Services',
        items: [
          {
            name: 'Summer Camps',
            href: '/summer-camps',
            icon: <Calendar className="h-5 w-5 mr-2" />,
          },
          {
            name: 'Scholarships',
            href: '/scholarships',
            icon: <Award className="h-5 w-5 mr-2" />,
          },
          {
            name: 'Internships',
            href: '/internships',
            icon: <HelpingHand className="h-5 w-5 mr-2" />,
          },
        ],
      },
      {
        id: 'professional-development',
        name: 'Professional Development',
        items: [
          {
            name: 'Assessments',
            href: '/assessments',
            icon: <BadgeCheck className="h-5 w-5 mr-2" />,
          },
          {
            name: 'Training',
            href: '/training',
            icon: <GraduationCap className="h-5 w-5 mr-2" />,
          },
          {
            name: 'Portfolio Builder',
            href: '/cv-builder',
            icon: <FileText className="h-5 w-5 mr-2" />,
          },
        ],
      },
      {
        id: 'career-management',
        name: 'Career Management',
        items: [
          {
            name: 'Career Exploration',
            href: '/job-matching',
            icon: <Compass className="h-5 w-5 mr-2" />,
          },
        ],
      },
      {
        id: 'retirement-services',
        name: 'Retirement Services',
        items: [
          {
            name: 'Retiree Services',
            href: '/retiree',
            icon: <Briefcase className="h-5 w-5 mr-2" />,
          },
        ],
      },
    ];
    
    return groups;
  };

  // Keep a flat list of all nav items for mobile view and other uses
  const getAllNavItems = (): NavItem[] => {
    const groups = getMainNavGroups();
    return groups.flatMap(group => group.items);
  };

  return {
    navGroups: getMainNavGroups(),
    navItems: getAllNavItems()
  };
}
