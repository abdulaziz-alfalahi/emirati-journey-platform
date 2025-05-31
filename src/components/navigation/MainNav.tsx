
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Activity, ChevronDown, GraduationCap, BookOpen, Award, Users, Briefcase, Calendar, FileText, User } from 'lucide-react';
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

  // Default navigation groups for Student Services and Professional Development
  const defaultNavGroups: NavGroup[] = [
    {
      id: 'student-services',
      name: 'Student Services',
      items: [
        { name: 'Scholarships', href: '/scholarships', icon: Award },
        { name: 'Summer Camps', href: '/summer-camps', icon: Calendar },
        { name: 'Career Journey', href: '/career-journey', icon: FileText },
        { name: 'Assessments', href: '/assessments', icon: FileText },
        { name: 'Communities', href: '/communities', icon: Users },
      ]
    },
    {
      id: 'professional-development',
      name: 'Professional Development',
      items: [
        { name: 'Training', href: '/training', icon: BookOpen },
        { name: 'LMS', href: '/lms', icon: GraduationCap },
        { name: 'Internships', href: '/internships', icon: Briefcase },
        { name: 'Mentorship', href: '/mentorship', icon: Users },
        { name: 'Skills Marketplace', href: '/skills-marketplace', icon: Users },
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
      <Link
        to="/analytics"
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80",
          pathname === "/analytics" ? "text-foreground" : "text-foreground/60"
        )}
      >
        <Activity className="h-3 w-3" />
        Analytics
      </Link>
    </nav>
  );
};

export default MainNav;
