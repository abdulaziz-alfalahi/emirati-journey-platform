
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavItems } from '@/hooks/use-nav-items';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const MainNav = () => {
  const { user, roles } = useAuth();
  const { navGroups } = useNavItems();
  const location = useLocation();

  if (!user || navGroups.length === 0) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navGroups.map((group) => (
          <NavigationMenuItem key={group.title}>
            <NavigationMenuTrigger className="h-9">
              {group.title}
              <ChevronDown className="ml-1 h-3 w-3" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {group.items.map((item) => (
                  <div key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          location.pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
