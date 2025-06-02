
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import useNavItems from '@/hooks/use-nav-items';
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
  const { user } = useAuth();
  const navItems = useNavItems();
  const location = useLocation();

  if (!user || navItems.length === 0) {
    return null;
  }

  // Group nav items by category for the dropdown structure
  const navGroups = [
    {
      title: 'Education Pathway',
      items: navItems.filter(item => 
        ['Summer Camps', 'School Programs', 'Scholarships', 'Training', 'LMS'].includes(item.name)
      ).map(item => ({
        title: item.name,
        href: item.href,
        description: getItemDescription(item.name)
      }))
    },
    {
      title: 'Career Development',
      items: navItems.filter(item => 
        ['Career Journey', 'Internships', 'Career Advisory', 'Job Matching'].includes(item.name)
      ).map(item => ({
        title: item.name,
        href: item.href,
        description: getItemDescription(item.name)
      }))
    },
    {
      title: 'Skills & Assessment',
      items: navItems.filter(item => 
        ['Assessments', 'Collaborative Assessments', 'Skills Marketplace', 'Portfolio'].includes(item.name)
      ).map(item => ({
        title: item.name,
        href: item.href,
        description: getItemDescription(item.name)
      }))
    },
    {
      title: 'Community & Recognition',
      items: navItems.filter(item => 
        ['Communities', 'Mentorship', 'Success Stories', 'Credentials', 'Blockchain Credentials'].includes(item.name)
      ).map(item => ({
        title: item.name,
        href: item.href,
        description: getItemDescription(item.name)
      }))
    }
  ].filter(group => group.items.length > 0);

  function getItemDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'Summer Camps': 'Explore exciting summer programs and activities',
      'School Programs': 'Discover K-12 educational programs',
      'Scholarships': 'Find funding opportunities for your education',
      'Training': 'Enhance your skills with professional training',
      'LMS': 'Access our learning management system',
      'Career Journey': 'Plan and track your career progression',
      'Internships': 'Discover internship opportunities',
      'Career Advisory': 'Get expert career guidance',
      'Job Matching': 'Find jobs that match your skills',
      'Assessments': 'Take skill and aptitude assessments',
      'Collaborative Assessments': 'Participate in team evaluations',
      'Skills Marketplace': 'Exchange skills with peers',
      'Portfolio': 'Build and showcase your achievements',
      'Communities': 'Connect with like-minded individuals',
      'Mentorship': 'Find mentors and mentorship opportunities',
      'Success Stories': 'Read inspiring career stories',
      'Credentials': 'Manage your professional credentials',
      'Blockchain Credentials': 'Secure digital credentials'
    };
    return descriptions[name] || `Access ${name.toLowerCase()} features`;
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
                  <NavigationMenuLink key={item.href} asChild>
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
