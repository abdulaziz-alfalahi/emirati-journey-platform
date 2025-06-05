import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  Activity, ChevronDown, GraduationCap, BookOpen, Award, Users, 
  Briefcase, Calendar, FileText, User, MapPin, UserCheck, Search, 
  BarChart3, Shield, School, Sparkles, Building, Heart, 
  Landmark, Rocket, Compass, Laptop, Handshake, Lightbulb, Globe
} from 'lucide-react';
import { NavGroup } from '@/components/layout/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MainNavProps {
  navGroups?: NavGroup[];
}

const MainNav: React.FC<MainNavProps> = ({ navGroups = [] }) => {
  const { pathname } = useLocation();
  const { roles } = useAuth();

  // Enhanced navigation groups with chronological ordering and visual grouping
  const defaultNavGroups: NavGroup[] = [
    {
      id: 'education-pathway',
      name: 'Education Pathway',
      items: [
        // Group 1 - Early Education/Administrative (chronological order)
        { name: 'Summer Camps', href: '/summer-camps', icon: Calendar, group: 'early' },
        { name: 'School Programs', href: '/school-programs', icon: School, group: 'early' },
        { name: 'Scholarships', href: '/scholarships', icon: Award, group: 'early' },
        { name: 'Academic Assessments', href: '/assessments?context=academic', icon: FileText, group: 'early' },
        { name: 'Learning Management', href: '/lms', icon: GraduationCap, group: 'early' },
        { name: 'Vocational Training', href: '/training', icon: BookOpen, group: 'early' },
        
        // Separator
        { type: 'separator', label: 'Advanced Education' },
        
        // Group 2 - Advanced Education/Exploratory (chronological order)
        { name: 'Youth Development', href: '/youth-development', icon: Sparkles, group: 'advanced' },
        { name: 'University Programs', href: '/university-programs', icon: Building, group: 'advanced' },
        { name: 'Professional Certifications', href: '/professional-certifications', icon: Shield, group: 'advanced' },
        { name: 'Digital Skills Development', href: '/digital-skills', icon: Laptop, group: 'advanced' },
      ]
    },
    {
      id: 'career-entry',
      name: 'Career Entry',
      items: [
        // Career Exploration & Planning
        { name: 'Career Journey Map', href: '/career-journey', icon: MapPin },
        { name: 'Career Advisory', href: '/career-advisory', icon: UserCheck },
        { name: 'Industry Exploration', href: '/industries', icon: Compass },
        { name: 'Skills Assessment', href: '/assessments?context=career', icon: BarChart3 },
        
        // Work Experience & National Service
        { name: 'Internships', href: '/internships', icon: Briefcase },
        { name: 'National Service', href: '/national-service', icon: Shield },
        { name: 'Graduate Programs', href: '/graduate-programs', icon: GraduationCap },
        
        // Job Readiness & Application
        { name: 'CV Builder', href: '/resume-builder', icon: FileText },
        { name: 'Portfolio', href: '/portfolio', icon: User },
        { name: 'Interview Preparation', href: '/interview-preparation', icon: Users },
        { name: 'Job Matching', href: '/job-matching', icon: Search },
      ]
    },
    {
      id: 'professional-growth',
      name: 'Professional Growth',
      items: [
        // Skills Enhancement & Development
        { name: 'Skills Marketplace', href: '/skills-marketplace', icon: Handshake },
        { name: 'Advanced Certifications', href: '/professional-certifications', icon: Award },
        { name: 'Leadership Development', href: '/leadership', icon: Users },
        { name: 'Blockchain Credentials', href: '/blockchain-credentials', icon: Shield },
        
        // Career Advancement & Networking
        { name: 'Mentorship', href: '/mentorship', icon: Users },
        { name: 'Professional Communities', href: '/communities', icon: Users },
        { name: 'Industry Networks', href: '/networking', icon: Activity },
        { name: 'Career Transition', href: '/career-transition', icon: Compass },
        
        // Innovation & Entrepreneurship
        { name: 'Business Development', href: '/business-development', icon: Rocket },
        { name: 'Startup Ecosystem', href: '/startup', icon: Lightbulb },
        { name: 'Innovation Hub', href: '/innovation', icon: Sparkles },
      ]
    },
    {
      id: 'lifelong-engagement',
      name: 'Lifelong Engagement',
      items: [
        // Knowledge Transfer & Mentoring
        { name: 'Become a Mentor', href: '/become-mentor', icon: Users },
        { name: 'Share Success Stories', href: '/success-stories', icon: Award },
        { name: 'Advisory Positions', href: '/advisory-roles', icon: Landmark },
        { name: 'Thought Leadership', href: '/thought-leadership', icon: Lightbulb },
        
        // Retirement Planning & Transition
        { name: 'Financial Planning', href: '/financial-planning', icon: BarChart3 },
        { name: 'Post-Career Options', href: '/post-career', icon: Compass },
        { name: 'Retirement Benefits', href: '/retirement-benefits', icon: Shield },
        
        // Community Contribution & Legacy
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
      groups.push({
        id: 'administration',
        name: 'Administration',
        items: [
          { name: 'System Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'User Management', href: '/admin/users', icon: Users },
          { name: 'Platform Settings', href: '/admin/settings', icon: Shield },
        ]
      });
    }

    return groups;
  };

  const displayNavGroups = getNavGroups();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {displayNavGroups.map((group) => (
        <DropdownMenu key={group.id}>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-ehrdc-teal focus:text-ehrdc-teal outline-none group">
            <span className="text-ehrdc-neutral-dark group-hover:text-ehrdc-teal group-focus:text-ehrdc-teal transition-colors">
              {group.name}
            </span>
            <ChevronDown className="h-4 w-4 text-ehrdc-neutral-dark group-hover:text-ehrdc-teal group-focus:text-ehrdc-teal transition-colors" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 bg-white border border-ehrdc-neutral-light shadow-lg">
            <DropdownMenuLabel className="text-ehrdc-teal font-semibold border-b border-ehrdc-neutral-light">
              {group.name}
            </DropdownMenuLabel>
            {group.items.map((item, index) => {
              // Handle separator
              if (item.type === 'separator') {
                return (
                  <div key={`separator-${index}`} className="py-2 px-2">
                    <div className="h-px bg-ehrdc-neutral-light/70 mb-2"></div>
                    {item.label && (
                      <div className="text-xs text-ehrdc-neutral-dark/60 font-medium px-2 py-1 uppercase tracking-wide">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              }
              
              const IconComponent = item.icon!;
              const isActive = pathname === item.href;
              
              // Apply different styles based on group
              const groupStyles = item.group === 'early' 
                ? "hover:bg-[var(--group-early-bg)] focus:bg-[var(--group-early-bg)]" 
                : item.group === 'advanced'
                ? "hover:bg-[var(--group-advanced-bg)] focus:bg-[var(--group-advanced-bg)]"
                : "hover:bg-ehrdc-light-teal/20 focus:bg-ehrdc-light-teal/20";
              
              const groupTextStyles = item.group === 'early'
                ? "hover:text-[var(--group-early-text)] focus:text-[var(--group-early-text)]"
                : item.group === 'advanced'
                ? "hover:text-[var(--group-advanced-text)] focus:text-[var(--group-advanced-text)]"
                : "hover:text-ehrdc-teal focus:text-ehrdc-teal";
              
              const activeStyles = isActive && (
                item.group === 'early'
                  ? "text-[var(--group-early-text)] bg-[var(--group-early-bg)] font-medium"
                  : item.group === 'advanced'
                  ? "text-[var(--group-advanced-text)] bg-[var(--group-advanced-bg)] font-medium"
                  : "text-ehrdc-teal bg-ehrdc-light-teal/20 font-medium"
              );
              
              const borderStyles = item.group === 'early'
                ? "border-l-2 border-[var(--group-early-border)]"
                : item.group === 'advanced'
                ? "border-l-2 border-[var(--group-advanced-border)]"
                : "";
              
              const iconStyles = item.group === 'early'
                ? "text-[var(--group-early-text)]/70"
                : item.group === 'advanced'
                ? "text-[var(--group-advanced-text)]/70"
                : "text-ehrdc-teal/70";

              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    to={item.href!}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-sm transition-all rounded-sm",
                      groupStyles,
                      groupTextStyles,
                      borderStyles,
                      activeStyles || "text-ehrdc-neutral-dark"
                    )}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                  >
                    <IconComponent className={cn(
                      "h-4 w-4 flex-shrink-0",
                      iconStyles
                    )} />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
      
      {/* Dashboard Link */}
      <Link
        to="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-ehrdc-teal focus:text-ehrdc-teal",
          pathname === "/dashboard" ? "text-ehrdc-teal font-semibold" : "text-ehrdc-neutral-dark"
        )}
      >
        Dashboard
      </Link>

      {/* Analytics Link (for authorized users) */}
      {(roles.includes('administrator') || roles.includes('super_user') || roles.includes('training_center')) && (
        <Link
          to="/analytics"
          className={cn(
            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-ehrdc-teal focus:text-ehrdc-teal",
            pathname === "/analytics" ? "text-ehrdc-teal font-semibold" : "text-ehrdc-neutral-dark"
          )}
        >
          <Activity className="h-4 w-4" />
          Analytics
        </Link>
      )}
    </nav>
  );
};

export default MainNav;
