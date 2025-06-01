
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  Activity, ChevronDown, GraduationCap, BookOpen, Award, Users, 
  Briefcase, Calendar, FileText, User, MapPin, UserCheck, Search, 
  BarChart3, Shield, School, Lightbulb, Building, Heart, 
  Landmark, Rocket, Compass, Laptop, Handshake, Sparkles
} from 'lucide-react';
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

  // Navigation groups reorganized by Emirati journey stages
  const defaultNavGroups: NavGroup[] = [
    {
      id: 'education-pathway',
      name: 'Education Pathway',
      items: [
        // Early Education
        { name: 'Summer Camps', href: '/summer-camps', icon: Calendar },
        { name: 'School Programs', href: '/school-programs', icon: School },
        { name: 'Youth Development', href: '/youth-development', icon: Sparkles },
        
        // Higher Education
        { name: 'Scholarships', href: '/scholarships', icon: Award },
        { name: 'University Programs', href: '/university-programs', icon: Building },
        { name: 'Academic Assessments', href: '/assessments', icon: FileText },
        { name: 'Learning Management', href: '/lms', icon: GraduationCap },
        
        // Specialized Training
        { name: 'Vocational Training', href: '/training', icon: BookOpen },
        { name: 'Certifications', href: '/certifications', icon: Shield },
        { name: 'Skills Development', href: '/skills-development', icon: Laptop },
      ]
    },
    {
      id: 'career-entry',
      name: 'Career Entry',
      items: [
        // Career Exploration
        { name: 'Career Journey Map', href: '/career-journey', icon: MapPin },
        { name: 'Career Advisory', href: '/career-advisory', icon: UserCheck },
        { name: 'Industry Exploration', href: '/industries', icon: Compass },
        
        // Work Experience
        { name: 'Internships', href: '/internships', icon: Briefcase },
        { name: 'National Service', href: '/national-service', icon: Shield },
        { name: 'Entry-Level Jobs', href: '/entry-jobs', icon: Building },
        
        // Job Readiness
        { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
        { name: 'Portfolio', href: '/portfolio', icon: User },
        { name: 'Interview Prep', href: '/interview-preparation', icon: Users },
        { name: 'Job Matching', href: '/job-matching', icon: Search },
      ]
    },
    {
      id: 'professional-growth',
      name: 'Professional Growth',
      items: [
        // Skills Enhancement
        { name: 'Skills Marketplace', href: '/skills-marketplace', icon: Handshake },
        { name: 'Professional Certs', href: '/professional-certifications', icon: Award },
        { name: 'Leadership Dev', href: '/leadership', icon: Users },
        { name: 'Blockchain Credentials', href: '/blockchain-credentials', icon: Shield },
        
        // Career Advancement
        { name: 'Mentorship', href: '/mentorship', icon: Users },
        { name: 'Communities', href: '/communities', icon: Users },
        { name: 'Networking', href: '/networking', icon: Activity },
        { name: 'Career Transition', href: '/career-transition', icon: Compass },
        
        // Entrepreneurship
        { name: 'Business Development', href: '/business-development', icon: Rocket },
        { name: 'Startup Resources', href: '/startup', icon: Lightbulb },
        { name: 'Innovation Support', href: '/innovation', icon: Sparkles },
      ]
    },
    {
      id: 'lifelong-engagement',
      name: 'Lifelong Engagement',
      items: [
        // Knowledge Transfer
        { name: 'Mentoring Opportunities', href: '/become-mentor', icon: Users },
        { name: 'Success Stories', href: '/success-stories', icon: Award },
        { name: 'Advisory Roles', href: '/advisory-roles', icon: Landmark },
        
        // Retirement Planning
        { name: 'Financial Planning', href: '/financial-planning', icon: BarChart3 },
        { name: 'Post-Career Options', href: '/post-career', icon: Compass },
        { name: 'Retirement Benefits', href: '/retirement-benefits', icon: Shield },
        
        // Community Contribution
        { name: 'Volunteer Programs', href: '/volunteer', icon: Heart },
        { name: 'Legacy Projects', href: '/legacy-projects', icon: Landmark },
        { name: 'Community Leadership', href: '/community-leadership', icon: Users },
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
