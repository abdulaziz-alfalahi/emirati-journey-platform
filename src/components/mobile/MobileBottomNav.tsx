
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useOfflineStorage } from '@/hooks/use-offline-storage';
import { 
  Home, 
  Briefcase, 
  FileText, 
  MessageCircle, 
  User,
  WifiOff,
  Smartphone
} from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { isOnline, hasUnsyncedData } = useOfflineStorage();
  
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      color: 'text-emirati-teal'
    },
    {
      icon: Briefcase,
      label: 'Jobs',
      path: '/job-matching',
      color: 'text-emirati-navy'
    },
    {
      icon: FileText,
      label: 'CV',
      path: '/cv-builder',
      color: 'text-emirati-gold'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      path: '/messages',
      color: 'text-emirati-green'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      color: 'text-emirati-red'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      {/* Offline indicator bar */}
      {(!isOnline || hasUnsyncedData) && (
        <div className="bg-orange-100 border-b border-orange-200 px-4 py-1">
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="h-3 w-3 text-orange-600" />
            <span className="text-xs text-orange-700">
              {!isOnline ? 'Working offline' : `${hasUnsyncedData ? 'Syncing data...' : ''}`}
            </span>
          </div>
        </div>
      )}
      
      <nav className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
                "touch-manipulation min-h-[48px]", // Ensure touch target is at least 48px
                isActive
                  ? `${item.color} bg-gray-50`
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? item.color : "")} />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
