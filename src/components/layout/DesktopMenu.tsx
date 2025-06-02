
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './UserMenu';
import { NavItem, NavGroup } from './types';
import MainNav from '@/components/navigation/MainNav';

interface DesktopMenuProps {
  navItems?: NavItem[];
  navGroups?: NavGroup[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, navGroups = [] }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <>
      {/* Main Navigation */}
      <MainNav />

      {/* Right side actions - Only user menu for authenticated users */}
      <div className="ml-auto flex items-center">
        {isAuthenticated && <UserMenu />}
      </div>
    </>
  );
};
