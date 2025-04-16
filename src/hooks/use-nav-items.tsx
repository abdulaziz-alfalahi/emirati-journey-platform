
import React from 'react';
import { BarChart, Compass, BookText, Calendar, Award, BadgeCheck, Briefcase, HelpingHand } from 'lucide-react';
import { NavItem } from '@/components/layout/types';
import { UserRole } from '@/types/auth';

export function useNavItems(
  isAuthenticated: boolean, 
  isRecruiter: boolean, 
  isTrainingCenter: boolean, 
  isParent: boolean,
  roles: UserRole[]
) {
  const getMainNavItems = () => {
    const items: NavItem[] = [];
    
    // Dashboard is for everyone
    items.push({
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart className="h-5 w-5 mr-2" />,
    });
    
    // Different navigation items based on user role
    if (isTrainingCenter) {
      // Training Center only needs dashboard and assessments
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
    } else if (isRecruiter) {
      // Recruiter specific items
      items.push({
        name: 'Career Exploration',
        href: '/job-matching',
        icon: <Compass className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Recruiter Dashboard',
        href: '/recruiter',
        icon: <Briefcase className="h-5 w-5 mr-2" />,
      });
    } else if (isParent) {
      // Parent specific navigation
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Scholarships',
        href: '/scholarships',
        icon: <Award className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Summer Camps',
        href: '/summer-camps',
        icon: <Calendar className="h-5 w-5 mr-2" />,
      });
    } else {
      // Standard student/user navigation
      items.push({
        name: 'Career Exploration',
        href: '/job-matching',
        icon: <Compass className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Portfolio Builder',
        href: '/cv-builder',
        icon: <BookText className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Work Experience',
        href: '/internships',
        icon: <HelpingHand className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Summer Camps',
        href: '/summer-camps',
        icon: <Calendar className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Scholarships',
        href: '/scholarships',
        icon: <Award className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
    }
    
    return items;
  };

  return getMainNavItems();
}

