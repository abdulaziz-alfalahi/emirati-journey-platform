
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavItems } from '@/hooks/use-nav-items';
import { DesktopMenu } from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const navItems = useNavItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        {isMobile ? (
          <MobileMenu navItems={navItems} />
        ) : (
          <DesktopMenu navItems={navItems} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
