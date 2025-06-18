
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
  const [initialized, setInitialized] = useState(false);
  
  const { fetchUserRoles } = useFetchUserRoles();
  const { signIn, signUp, signOut } = useAuthOperations(setIsLoading);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          try {
            const userRoles = await fetchUserRoles(currentSession.user.id, currentSession.user);
            if (mounted) {
              setRoles(userRoles);
            }
          } catch (error) {
            console.error('Error fetching user roles:', error);
            if (mounted) {
              setRoles([]);
            }
          }
        } else {
          setRoles([]);
        }
        
        if (!initialized) {
          setInitialized(true);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setIsLoading(false);
            setInitialized(true);
          }
          return;
        }
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          try {
            const userRoles = await fetchUserRoles(currentSession.user.id, currentSession.user);
            if (mounted) {
              setRoles(userRoles);
            }
          } catch (error) {
            console.error('Error fetching user roles:', error);
            if (mounted) {
              setRoles([]);
            }
          }
        }
        
        if (mounted) {
          setInitialized(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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
