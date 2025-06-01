
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Activity, ChevronDown, GraduationCap, BookOpen, Award, Users, Briefcase, Calendar, FileText, User, MapPin, UserCheck, Search, BarChart3, Shield } from 'lucide-react';
import { NavGroup } from '@/components/layout/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MainNavProps {
  navGroups?: NavGroup[];
}

const MainNav: React.FC<MainNavProps> = ({ navGroups = [] }) => {
  const { pathname } = useLocation();
  const { roles } = useAuth();

  // Navigation groups organized by life stage and purpose
  const defaultNavGroups: NavGroup[] = [
    {
      id: 'student-services',
      name: 'Student Services',
      items: [
        { name: 'Scholarships', href: '/scholarships', icon: Award },
        { name: 'Summer Camps', href: '/summer-camps', icon: Calendar },
        { name: 'Assessments', href: '/assessments', icon: FileText },
        { name: 'Training', href: '/training', icon: BookOpen },
        { name: 'LMS', href: '/lms', icon: GraduationCap },
      ]
    },
    {
      id: 'professional-development',
      name: 'Professional Development',
      items: [
        { name: 'Internships', href: '/internships', icon: Briefcase },
        { name: 'Mentorship', href: '/mentorship', icon: Users },
        { name: 'Skills Marketplace', href: '/skills-marketplace', icon: Users },
        { name: 'Communities', href: '/communities', icon: Users },
        { name: 'Credentials', href: '/credentials', icon: Award },
      ]
    },
    {
      id: 'career-management',
      name: 'Career Management',
      items: [
        { name: 'Career Journey', href: '/career-journey', icon: MapPin },
        { name: 'Career Advisory', href: '/career-advisory', icon: UserCheck },
        { name: 'Job Matching', href: '/job-matching', icon: Search },
        { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
        { name: 'Portfolio', href: '/portfolio', icon: User },
      ]
    },
    {
      id: 'retirement-services',
      name: 'Retirement Services',
      items: [
        { name: 'Success Stories', href: '/success-stories', icon: Award },
        { name: 'Blockchain Credentials', href: '/blockchain-credentials', icon: Shield },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
      ]
    }
  ];

  // Combine default groups with any additional groups passed as props
  const getNavGroups = () => {
    const groups = [...defaultNavGroups, ...navGroups];
    
    if (roles.includes('administrator') || roles.includes('super_user')) {
      // Add admin navigation group or items if needed
    }

    return groups;
  };

  const displayNavGroups = getNavGroups();

  return (
    <nav className="hidden md:flex gap-6">
      {displayNavGroups.map((group) => (
        <DropdownMenu key={group.id}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 outline-none">
            {group.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-white">
            {group.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex w-full items-center gap-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "text-foreground font-medium" : "text-foreground/70"
                    )}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      <Link
        to="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Dashboard
      </Link>
    </nav>
  );
};

export default MainNav;
