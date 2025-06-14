
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Briefcase, 
  FileText, 
  MessageCircle, 
  User,
  Menu,
  Bell
} from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation('common');
  
  const navItems = [
    {
      icon: Home,
      labelKey: 'nav.home',
      path: '/',
      color: 'text-ehrdc-teal'
    },
    {
      icon: Briefcase,
      labelKey: 'nav.jobs',
      path: '/job-matching',
      color: 'text-ehrdc-teal'
    },
    {
      icon: FileText,
      labelKey: 'nav.cvBuilder',
      path: '/cv-builder',
      color: 'text-ehrdc-teal'
    },
    {
      icon: MessageCircle,
      labelKey: 'nav.messages',
      path: '/messages',
      color: 'text-ehrdc-teal'
    },
    {
      icon: User,
      labelKey: 'nav.profile',
      path: user ? '/dashboard' : '/auth',
      color: 'text-ehrdc-teal'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-ehrdc-neutral-light shadow-lg z-50 safe-area-pb">
      <nav className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/dashboard' && location.pathname.startsWith('/dashboard'));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-all duration-200",
                "min-h-[44px] min-w-[44px] px-2 py-2", // Ensure 44px touch targets
                "active:scale-95 touch-manipulation", // Better touch feedback
                isActive
                  ? "text-ehrdc-teal bg-ehrdc-teal/10 border-t-2 border-ehrdc-teal"
                  : "text-ehrdc-neutral-dark hover:text-ehrdc-teal hover:bg-ehrdc-teal/5"
              )}
              aria-label={t(item.labelKey)}
            >
              <Icon className={cn(
                "h-5 w-5 transition-all duration-200", 
                isActive ? "text-ehrdc-teal scale-110" : ""
              )} />
              <span className={cn(
                "leading-none text-[10px] font-medium",
                isActive ? "text-ehrdc-teal" : ""
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
