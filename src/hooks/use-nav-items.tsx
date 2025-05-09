
import React from 'react';
import { BarChart, Compass, BookText, Calendar, Award, BadgeCheck, Briefcase, HelpingHand, Wrench } from 'lucide-react';
import { NavItem } from '@/components/layout/types';
import { UserRole } from '@/types/auth';

export function useNavItems() {
  const getMainNavItems = () => {
    const items: NavItem[] = [];
    
    // Dashboard is for everyone
    items.push({
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart className="h-5 w-5 mr-2" />,
    });

    // Add Services link for the homepage that scrolls to services section
    items.push({
      name: 'Services',
      href: '/',
      onClick: () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      icon: <Wrench className="h-5 w-5 mr-2" />,
    });
    
    // Add common navigation items
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
