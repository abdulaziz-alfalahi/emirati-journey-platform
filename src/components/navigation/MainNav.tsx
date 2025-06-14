
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NavGroup } from '@/components/layout/types';
import { useTranslation } from 'react-i18next';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NotificationIcon } from '@/components/notifications/NotificationIcon';

interface MainNavProps {
  navGroups: NavGroup[];
}

const MainNav: React.FC<MainNavProps> = ({ navGroups }) => {
  const { user } = useAuth();
  const { t } = useTranslation('common');
  const location = useLocation();

  return (
    <div className="flex items-center space-x-6">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="font-bold text-xl text-ehrdc-teal">{t('menu.emiratiGateway')}</div>
      </Link>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          {navGroups.map((group) => (
            <NavigationMenuItem key={group.name}>
              <NavigationMenuTrigger className="text-ehrdc-neutral-dark hover:text-ehrdc-teal">
                {group.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ehrdc-light-teal/50 to-ehrdc-teal p-6 no-underline outline-none focus:shadow-md"
                        to={group.items[0]?.href || '/'}
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          {group.name}
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          {group.description || `Explore ${group.name.toLowerCase()} opportunities`}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  {group.items.map((item) => (
                    <NavigationMenuLink key={item.name} asChild>
                      <Link
                        to={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-ehrdc-light-teal/10 hover:text-ehrdc-teal focus:bg-ehrdc-light-teal/10 focus:text-ehrdc-teal"
                      >
                        <div className="text-sm font-medium leading-none">{item.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description || `Access ${item.name.toLowerCase()}`}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side items */}
      <div className="flex items-center space-x-4 ml-auto">
        {user && <NotificationIcon />}
        
        {/* Dashboard link for authenticated users */}
        {user && (
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-ehrdc-teal ${
              location.pathname === '/dashboard' ? 'text-ehrdc-teal' : 'text-ehrdc-neutral-dark'
            }`}
          >
            {t('nav.dashboard')}
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainNav;
