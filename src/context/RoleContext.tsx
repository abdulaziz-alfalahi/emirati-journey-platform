
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';

interface RoleContextType {
  activeRole: UserRole | null;
  setActiveRole: (role: UserRole) => void;
  availableRoles: UserRole[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { roles } = useAuth();
  const [activeRole, setActiveRoleState] = useState<UserRole | null>(null);

  // Initialize active role when roles are loaded
  useEffect(() => {
    if (roles.length > 0 && !activeRole) {
      // Check localStorage for previously selected role
      const savedRole = localStorage.getItem('activeRole') as UserRole;
      if (savedRole && roles.includes(savedRole)) {
        setActiveRoleState(savedRole);
      } else {
        // Default to first role if no saved role or saved role is invalid
        setActiveRoleState(roles[0]);
      }
    }
  }, [roles, activeRole]);

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    localStorage.setItem('activeRole', role);
  };

  return (
    <RoleContext.Provider 
      value={{
        activeRole,
        setActiveRole,
        availableRoles: roles
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
