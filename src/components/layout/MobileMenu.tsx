
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Menu, LogIn } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import UserMenu from './UserMenu';
import { NavItem } from './types';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
  isAuthenticated: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  navItems,
  isAuthenticated,
  closeMenu
}) => {
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-6">
        <SheetHeader className="pl-6 pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center p-2 text-lg font-semibold hover:bg-secondary/50"
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                closeMenu();
              }}
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
  );
};

export default MobileMenu;
