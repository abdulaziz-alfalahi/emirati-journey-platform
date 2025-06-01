
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
      {/* Brand name/logo with EHRDC styling */}
      <Link to="/" className="flex items-center space-x-3 mr-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-ehrdc-teal rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">EG</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-ehrdc-teal leading-none">Emirati Gateway</span>
            <span className="text-xs text-ehrdc-neutral-dark opacity-75 leading-none">EHRDC Platform</span>
          </div>
        </div>
      </Link>

      {/* Main Navigation */}
      <MainNav navGroups={navGroups} />

      {/* Right side actions */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Language Switcher - Dubai Government Standard */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-ehrdc-neutral-dark hover:text-ehrdc-teal transition-colors rounded-md hover:bg-ehrdc-light-teal/10">
            <Globe className="h-4 w-4" />
            <span>العربية</span>
            <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem className="hover:bg-ehrdc-light-teal/20 hover:text-ehrdc-teal">
              <span className="font-medium">العربية</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-ehrdc-light-teal/20 hover:text-ehrdc-teal">
              <span>English</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Authentication Actions */}
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/auth?tab=sign-in"
              className="text-sm font-medium text-ehrdc-neutral-dark hover:text-ehrdc-teal transition-colors px-3 py-2 rounded-md hover:bg-ehrdc-light-teal/10"
            >
              Sign In
            </Link>
            <Link
              to="/auth?tab=sign-up"
              className="ehrdc-button-primary text-sm px-4 py-2 rounded-md font-medium"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
