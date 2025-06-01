
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronUp, 
  ChevronDown, 
  Home, 
  Briefcase, 
  FileText, 
  GraduationCap,
  Users,
  UserCheck,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import DubaiGovFooterIcons from './DubaiGovFooterIcons';

const DubaiGovStickyBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { user } = useAuth();

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const primaryNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Jobs', href: '/job-matching', icon: Briefcase },
    { name: 'CV Builder', href: '/cv-builder', icon: FileText },
    { name: 'Training', href: '/training', icon: GraduationCap },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Mentorship', href: '/mentorship', icon: UserCheck },
  ];

  const journeyNavItems = [
    { name: 'Career Journey', href: '/career-journey', category: 'Planning' },
    { name: 'Scholarships', href: '/scholarships', category: 'Education' },
    { name: 'Internships', href: '/internships', category: 'Experience' },
    { name: 'Summer Camps', href: '/summer-camps', category: 'Development' },
    { name: 'Assessments', href: '/assessments', category: 'Evaluation' },
    { name: 'Portfolio', href: '/portfolio', category: 'Showcase' },
    { name: 'Success Stories', href: '/success-stories', category: 'Inspiration' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path === '/dashboard' && location.pathname.startsWith('/dashboard'));
  };

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className={cn(
        "transition-all duration-300",
        isCollapsed ? "h-12" : "h-16 md:h-20"
      )} />

      {/* Sticky Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ehrdc-neutral-light shadow-[0_-4px_20px_rgba(0,110,109,0.1)] transition-all duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        isCollapsed ? "h-12" : "h-16 md:h-20"
      )}>
        {/* Collapse/Expand Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border border-ehrdc-neutral-light rounded-t-lg px-3 py-1 text-ehrdc-teal hover:bg-ehrdc-teal/5 shadow-sm"
          aria-label={isCollapsed ? "Expand navigation bar" : "Collapse navigation bar"}
        >
          {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Main Bar Content */}
        <div className={cn(
          "dubai-container flex items-center justify-between h-full transition-all duration-300",
          isCollapsed && "opacity-50"
        )}>
          {/* Left: EHRDC Logo and Branding */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/e4ab7695-235d-451a-a304-556e2bb2b7e8.png"
                alt="EHRDC"
                className={cn(
                  "transition-all duration-300",
                  isCollapsed ? "h-6" : "h-8 md:h-10"
                )}
              />
              {!isCollapsed && (
                <div className="hidden lg:block">
                  <span className="text-sm font-semibold text-ehrdc-teal">Emirati Gateway</span>
                </div>
              )}
            </Link>
          </div>

          {/* Center: Primary Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {primaryNavItems.slice(0, isCollapsed ? 4 : 7).map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal",
                    isActive
                      ? "bg-ehrdc-teal text-white shadow-sm"
                      : "text-ehrdc-neutral-dark"
                  )}
                  aria-label={item.name}
                >
                  <Icon className={cn(
                    "transition-all duration-200",
                    isCollapsed ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}

            {/* Journey Navigation Dropdown */}
            {!isCollapsed && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-ehrdc-neutral-dark hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal transition-all duration-200">
                  <Menu className="h-4 w-4" />
                  <span>More</span>
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 bg-white border border-ehrdc-neutral-light shadow-lg">
                  <div className="px-3 py-2 text-xs font-medium text-ehrdc-neutral-dark/70 uppercase tracking-wide">
                    Journey Navigation
                  </div>
                  <DropdownMenuSeparator />
                  {journeyNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="flex items-center justify-between px-3 py-2 text-sm hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal transition-colors"
                      >
                        <span>{item.name}</span>
                        <span className="text-xs text-ehrdc-neutral-dark/50">{item.category}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-ehrdc-teal hover:bg-ehrdc-teal/10"
              aria-label="Open mobile navigation"
            >
              {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Right: User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-ehrdc-neutral-dark hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-ehrdc-teal/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-ehrdc-teal">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {!isCollapsed && <span>Profile</span>}
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth?tab=sign-in"
                  className="px-3 py-2 text-sm font-medium text-ehrdc-neutral-dark hover:text-ehrdc-teal transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?tab=sign-up"
                  className="px-3 py-2 bg-ehrdc-teal text-white text-sm font-medium rounded-lg hover:bg-ehrdc-dark-teal transition-colors"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isNavOpen && (
          <div className="md:hidden absolute bottom-full left-0 right-0 bg-white border border-ehrdc-neutral-light shadow-lg max-h-80 overflow-y-auto">
            <div className="p-4 space-y-2">
              {[...primaryNavItems, ...journeyNavItems].map((item) => {
                const Icon = 'icon' in item ? item.icon : null;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal",
                      isActive
                        ? "bg-ehrdc-teal text-white"
                        : "text-ehrdc-neutral-dark"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                    {'category' in item && (
                      <span className="ml-auto text-xs opacity-60">{item.category}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dubai Government Footer Icons - Positioned relative to sticky bar */}
      <div className={cn(
        "fixed right-4 transition-all duration-300 z-40",
        isVisible && !isCollapsed ? "bottom-24 md:bottom-28" : "bottom-6"
      )}>
        <DubaiGovFooterIcons />
      </div>
    </>
  );
};

export default DubaiGovStickyBar;
