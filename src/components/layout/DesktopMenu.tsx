
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import UserMenu from './UserMenu';
import { NavItem } from './types';

interface DesktopMenuProps {
  navItems: NavItem[];
  isAuthenticated: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, isAuthenticated }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href} 
            className="flex items-center text-sm font-medium hover:underline"
          >
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
  );
};

export default DesktopMenu;
