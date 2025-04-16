import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Menu, X, LogIn, Compass, BookText, Calendar, Award, BadgeCheck, Briefcase, GraduationCap, HelpingHand, BarChart, Home } from 'lucide-react';
import UserMenu from './UserMenu';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/theme-toggle';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Portfolio Builder', href: '/cv-builder' },
  { name: 'Career Exploration', href: '/job-matching' },
  { name: 'Scholarships', href: '/scholarships' },
  { name: 'Internships', href: '/internships' },
  { name: 'Summer Camps', href: '/summer-camps' },
  { name: 'Assessments', href: '/assessments' },
  { name: 'Recruiter', href: '/recruiter' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, roles } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isAuthenticated = !!user;
  const isRecruiter = roles.includes('private_sector_recruiter') || 
                      (user?.email && user.email.includes('recruit'));
  const isTrainingCenter = roles.includes('training_center') || 
                      (user?.email && (user.email.includes('training-center') || user.email.includes('training_center')));
  const isParent = roles.includes('parent') || 
                      (user?.email && user.email.includes('parent'));

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getMainNavItems = () => {
    const items = [];
    
    // Home is for everyone
    items.push({
      name: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5 mr-2" />,
    });
    
    // Dashboard is for everyone
    items.push({
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart className="h-5 w-5 mr-2" />,
    });
    
    // Different navigation items based on user role
    if (isTrainingCenter) {
      // Training Center only needs dashboard and assessments
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
    } else if (isRecruiter) {
      // Recruiter specific items
      items.push({
        name: 'Career Exploration',
        href: '/job-matching',
        icon: <Compass className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Recruiter Dashboard',
        href: '/recruiter',
        icon: <Briefcase className="h-5 w-5 mr-2" />,
      });
    } else if (isParent) {
      // Parent specific navigation
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Scholarships',
        href: '/scholarships',
        icon: <Award className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Summer Camps',
        href: '/summer-camps',
        icon: <Calendar className="h-5 w-5 mr-2" />,
      });
    } else {
      // Standard student/user navigation
      items.push({
        name: 'Career Exploration',
        href: '/job-matching',
        icon: <Compass className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Portfolio Builder',
        href: '/cv-builder',
        icon: <BookText className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Work Experience',
        href: '/internships',
        icon: <HelpingHand className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Summer Camps',
        href: '/summer-camps',
        icon: <Calendar className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Scholarships',
        href: '/scholarships',
        icon: <Award className="h-5 w-5 mr-2" />,
      });
      items.push({
        name: 'Assessments',
        href: '/assessments',
        icon: <BadgeCheck className="h-5 w-5 mr-2" />,
      });
    }
    
    return items;
  };

  const mainNavItems = getMainNavItems();

  return (
    <div className="bg-background border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Emirati Careers
        </Link>
        
        {isMobile ? (
          <>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 pt-6">
                <SheetHeader className="pl-6 pb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center p-2 text-lg font-semibold hover:bg-secondary/50"
                      onClick={closeMenu}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t" />
                  <div className="flex flex-col gap-2 px-6">
                    <ThemeToggle />
                    {isAuthenticated ? (
                      <UserMenu />
                    ) : (
                      <Link to="/auth">
                        <Button variant="outline" className="w-full justify-center" onClick={closeMenu}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-6">
              {mainNavItems.map((item) => (
                <Link key={item.href} to={item.href} className="flex items-center text-sm font-medium hover:underline">
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/auth">
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
