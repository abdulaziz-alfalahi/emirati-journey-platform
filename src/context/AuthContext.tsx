
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, UserRole } from '@/types/auth';
import { useFetchUserRoles } from '@/hooks/use-fetch-user-roles';
import { useAuthOperations } from '@/hooks/use-auth-operations';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { fetchUserRoles } = useFetchUserRoles();
  const { signIn, signUp, signOut } = useAuthOperations(setIsLoading);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        // Don't do any async operations directly in the callback
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with auth callbacks
          setTimeout(() => {
            fetchUserRoles(currentSession.user.id, currentSession.user)
              .then(userRoles => setRoles(userRoles));
          }, 0);
        } else {
          setRoles([]);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserRoles(currentSession.user.id, currentSession.user)
          .then(userRoles => setRoles(userRoles));
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasRole = (role: UserRole) => {
    return roles.includes(role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { UserRole } from '@/types/auth';
