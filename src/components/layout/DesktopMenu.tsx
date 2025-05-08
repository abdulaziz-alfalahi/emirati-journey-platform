
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
import { NavItem } from './types';

interface DesktopMenuProps {
  navItems: NavItem[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      <Link to="/" className="flex items-center space-x-2 mr-6">
        <span className="font-semibold text-lg">Emirati Gateway</span>
      </Link>

      <NavigationMenu className="hidden md:flex flex-1">
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              {item.onClick ? (
                <Link to={item.href} className={cn(
                  "flex h-9 items-center px-4 text-sm font-medium transition-colors hover:text-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                }}>
                  {item.name}
                </Link>
              ) : (
                <Link to={item.href} className={cn(
                  "flex h-9 items-center px-4 text-sm font-medium transition-colors hover:text-primary"
                )}>
                  {item.name}
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

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
