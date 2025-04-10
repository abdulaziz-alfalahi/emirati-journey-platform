
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Activity } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MainNavProps {
  items?: {
    title: string;
    href: string;
    description?: string;
  }[];
}

const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const { pathname } = useLocation();
  const { roles } = useAuth();

  // Default navigation items that are available to all users
  const defaultNavItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      description: 'Your personalized overview'
    },
    {
      title: 'CV Builder',
      href: '/cv-builder',
      description: 'Create and manage your CVs'
    },
    {
      title: 'Portfolio',
      href: '/portfolio',
      description: 'Showcase your achievements'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      description: 'Data-driven insights'
    }
  ];

  // Add role-specific navigation items
  const getNavItemsByRole = () => {
    const navItems = [...defaultNavItems];
    
    if (roles.includes('administrator') || roles.includes('super_user')) {
      navItems.push({
        title: 'Admin Panel',
        href: '/admin',
        description: 'Manage users and settings'
      });
    }

    return navItems;
  };

  const navItems = items || getNavItemsByRole();

  return (
    <nav className="hidden md:flex gap-6">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60",
            item.href === "/analytics" && "flex items-center gap-1"
          )}
        >
          {item.href === "/analytics" && <Activity className="h-3 w-3" />}
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
