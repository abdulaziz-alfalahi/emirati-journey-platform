
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Menu, LogIn, ChevronDown, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import UserMenu from './UserMenu';
import { NavGroup, NavItem } from './types';
import { useAuth } from '@/context/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileMenuProps {
  navItems?: NavItem[];
  navGroups?: NavGroup[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems = [], navGroups = [] }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-6 overflow-y-auto max-h-screen">
        <SheetHeader className="pl-6 pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="grid gap-2">
          <Link
            to="/dashboard"
            className="flex items-center p-2 pl-6 text-lg font-semibold hover:bg-secondary/50"
            onClick={closeMenu}
          >
            Dashboard
          </Link>

          <Accordion type="multiple" className="w-full">
            {navGroups.map((group) => (
              <AccordionItem key={group.id} value={group.id} className="border-0">
                <AccordionTrigger className="py-2 px-6 text-lg font-semibold hover:bg-secondary/50">
                  {group.name}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center p-2 pl-10 hover:bg-secondary/50"
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                          closeMenu();
                        }}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Link
            to="/analytics"
            className="flex items-center p-2 pl-6 text-lg font-semibold hover:bg-secondary/50"
            onClick={closeMenu}
          >
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </Link>
          
          <div className="border-t my-4" />
          
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
