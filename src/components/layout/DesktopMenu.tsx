
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './UserMenu';
import { NavItem, NavGroup } from './types';
import MainNav from '@/components/navigation/MainNav';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';

interface DesktopMenuProps {
  navItems?: NavItem[];
  navGroups?: NavGroup[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, navGroups }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      {/* Main Navigation */}
      <MainNav />

      {/* Right side actions - Language toggle, Theme toggle and user menu */}
      <div className="ml-auto flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        {isAuthenticated && <UserMenu />}
      </div>
    </>
  );
};
