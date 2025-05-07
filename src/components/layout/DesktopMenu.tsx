
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
        <span className="font-semibold text-lg">Career Edge</span>
      </Link>

      <NavigationMenu className="hidden md:flex flex-1">
        <NavigationMenuList>
          {navItems.map((item) =>
            item.items ? (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger className="h-9">{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                    {item.items.map((subItem) => (
                      <li key={subItem.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={subItem.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {subItem.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {subItem.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.href}>
                <Link to={item.href} className={cn(
                  "flex h-9 items-center px-4 text-sm font-medium transition-colors hover:text-primary"
                )}>
                  {item.title}
                </Link>
              </NavigationMenuItem>
            )
          )}
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
