
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import UserMenu from './UserMenu';
import { NavItem, NavGroup } from './types';
import MainNav from '@/components/navigation/MainNav';

interface DesktopMenuProps {
  navItems?: NavItem[];
  navGroups?: NavGroup[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, navGroups = [] }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      {/* Brand name/logo */}
      <Link to="/" className="flex items-center space-x-2 mr-6">
        <span className="font-semibold text-lg text-ehrdc-teal">Emirati Gateway</span>
      </Link>

      <MainNav navGroups={navGroups} />

      <div className="ml-auto flex items-center space-x-4">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <div className="hidden md:flex space-x-4">
            <Link
              to="/auth?tab=sign-in"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              to="/auth?tab=sign-up"
              className="text-sm font-medium text-primary"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
