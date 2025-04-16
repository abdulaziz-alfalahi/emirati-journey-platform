
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavItems } from '@/hooks/use-nav-items';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const mainNavItems = useNavItems(isAuthenticated, isRecruiter, isTrainingCenter, isParent, roles);

  return (
    <div className="bg-background border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl">
          Emirati Careers
        </Link>
        
        {isMobile ? (
          <MobileMenu 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navItems={mainNavItems}
            isAuthenticated={isAuthenticated}
            closeMenu={closeMenu}
          />
        ) : (
          <DesktopMenu 
            navItems={mainNavItems}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
