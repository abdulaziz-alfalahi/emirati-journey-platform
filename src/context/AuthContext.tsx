
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '@/types/auth';

interface User {
  id: string;
  email: string;
  name: string;
  app_metadata?: any;
  user_metadata?: any;
  aud?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  roles: UserRole[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<UserRole[]>(['student']);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        email,
        name: 'Demo User',
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {}
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock sign up
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        email,
        name,
        created_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: {}
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setRoles(['student']);
  };

  const hasRole = (role: UserRole) => {
    return roles.includes(role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      roles,
      isLoading,
      signIn,
      signUp,
      signOut,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
