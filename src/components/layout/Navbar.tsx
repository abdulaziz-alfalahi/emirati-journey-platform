
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import useNavItems from '@/hooks/use-nav-items';
import { DesktopMenu } from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navItems = useNavItems();

  return (
    <header className="w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center">
        {isMobile ? (
          <MobileMenu navItems={navItems} navGroups={[]} />
        ) : (
          <DesktopMenu navItems={navItems} navGroups={[]} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
