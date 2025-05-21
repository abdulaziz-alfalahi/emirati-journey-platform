
import React from 'react';
import { Compass, BookText, Calendar, Award, BadgeCheck, Briefcase, HelpingHand } from 'lucide-react';
import { NavItem } from '@/components/layout/types';
import { UserRole } from '@/types/auth';

export function useNavItems() {
  const getMainNavItems = () => {
    const items: NavItem[] = [];
    
    // Add common navigation items (removed Dashboard and Services)
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
      name: 'Internships',
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
    
    return items;
  };

  return getMainNavItems();
}
