import React, { createContext, useContext } from 'react';
import { useAuth as useSupabaseAuth } from '../context/AuthContext';
import { useErrorHandler } from '../hooks/useErrorHandler';

// Create adapter context
const AuthAdapterContext = createContext();

// Auth adapter provider that bridges new components with existing Supabase auth
export const AuthAdapterProvider = ({ children }) => {
  const supabaseAuth = useSupabaseAuth();
  const { handleError, showSuccess } = useErrorHandler();

  // Adapt Supabase auth to our new interface
  const adaptedAuth = {
    // State mapping
    user: supabaseAuth?.user ? {
      id: supabaseAuth.user.id,
      email: supabaseAuth.user.email,
      firstName: supabaseAuth.user.user_metadata?.firstName || supabaseAuth.user.user_metadata?.first_name || 'User',
      lastName: supabaseAuth.user.user_metadata?.lastName || supabaseAuth.user.user_metadata?.last_name || '',
      fullName: supabaseAuth.user.user_metadata?.fullName || 
                `${supabaseAuth.user.user_metadata?.firstName || supabaseAuth.user.user_metadata?.first_name || 'User'} ${supabaseAuth.user.user_metadata?.lastName || supabaseAuth.user.user_metadata?.last_name || ''}`.trim(),
      phone: supabaseAuth.user.user_metadata?.phone || supabaseAuth.user.phone || '',
      emiratesId: supabaseAuth.user.user_metadata?.emiratesId || '',
      role: supabaseAuth.roles?.[0]?.role || 'job_seeker',
      verified: supabaseAuth.user.email_confirmed_at ? true : false,
      avatar: supabaseAuth.user.user_metadata?.avatar_url || null,
      preferences: {
        language: supabaseAuth.user.user_metadata?.language || 'en',
        notifications: supabaseAuth.user.user_metadata?.notifications !== false,
        theme: supabaseAuth.user.user_metadata?.theme || 'light'
      }
    } : null,
    
    isAuthenticated: !!supabaseAuth?.user,
    isLoading: supabaseAuth?.isLoading || false,
    token: supabaseAuth?.session?.access_token || null,
    refreshToken: supabaseAuth?.session?.refresh_token || null,
    loginMethod: supabaseAuth?.user?.app_metadata?.provider || 'email',
    lastActivity: new Date().toISOString(),
    sessionExpiry: supabaseAuth?.session?.expires_at ? new Date(supabaseAuth.session.expires_at * 1000).toISOString() : null,

    // Method adaptations
    login: async (credentials, method = 'email') => {
      try {
        const result = await supabaseAuth.signIn(credentials.email, credentials.password);
        if (result.error) throw result.error;
        
        showSuccess('Welcome back! You have been successfully logged in.');
        return {
          user: result.user,
          token: result.session?.access_token,
          refreshToken: result.session?.refresh_token,
          loginMethod: method,
          sessionExpiry: result.session?.expires_at ? new Date(result.session.expires_at * 1000).toISOString() : null
        };
      } catch (error) {
        handleError(error, 'Login failed. Please check your credentials and try again.');
        throw error;
      }
    },

    register: async (userData) => {
      try {
        const result = await supabaseAuth.signUp(userData.email, userData.password, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          emiratesId: userData.emiratesId
        });
        
        if (result.error) throw result.error;
        
        showSuccess('Account created successfully! Please check your email for verification.');
        return {
          user: result.user,
          token: result.session?.access_token,
          refreshToken: result.session?.refresh_token,
          loginMethod: 'email',
          sessionExpiry: result.session?.expires_at ? new Date(result.session.expires_at * 1000).toISOString() : null
        };
      } catch (error) {
        handleError(error, 'Registration failed. Please try again.');
        throw error;
      }
    },

    loginWithUAEPass: async (uaePassData) => {
      try {
        // For now, simulate UAE Pass login by creating a user with UAE Pass data
        // In production, this would integrate with actual UAE Pass OAuth
        const result = await supabaseAuth.signUp(uaePassData.email, 'uaepass_' + Date.now(), {
          firstName: uaePassData.fullName.split(' ')[0],
          lastName: uaePassData.fullName.split(' ').slice(1).join(' '),
          fullName: uaePassData.fullName,
          phone: uaePassData.phone,
          emiratesId: uaePassData.emiratesId,
          uaePassId: uaePassData.uaePassId,
          provider: 'uaepass'
        });

        if (result.error) throw result.error;
        
        showSuccess('Welcome! You have been successfully authenticated with UAE Pass.');
        return {
          user: result.user,
          token: result.session?.access_token,
          refreshToken: result.session?.refresh_token,
          loginMethod: 'uaepass',
          sessionExpiry: result.session?.expires_at ? new Date(result.session.expires_at * 1000).toISOString() : null
        };
      } catch (error) {
        handleError(error, 'UAE Pass authentication failed. Please try again.');
        throw error;
      }
    },

    logout: async () => {
      try {
        await supabaseAuth.signOut();
        showSuccess('You have been successfully logged out.');
      } catch (error) {
        handleError(error, 'Logout completed with warnings.');
      }
    },

    updateUser: async (updates) => {
      try {
        // Update user metadata in Supabase
        const { error } = await supabaseAuth.user.update({
          data: updates
        });
        
        if (error) throw error;
        
        showSuccess('Profile updated successfully.');
        return { ...adaptedAuth.user, ...updates };
      } catch (error) {
        handleError(error, 'Failed to update profile.');
        throw error;
      }
    },

    // Utility methods
    hasRole: (role) => {
      return supabaseAuth?.roles?.some(r => r.role === role) || false;
    },

    isVerified: () => {
      return !!supabaseAuth?.user?.email_confirmed_at;
    },

    getTimeUntilExpiry: () => {
      if (!supabaseAuth?.session?.expires_at) return null;
      const expiry = new Date(supabaseAuth.session.expires_at * 1000);
      const now = new Date();
      return Math.max(0, expiry.getTime() - now.getTime());
    },

    clearAuthData: () => {
      // Supabase handles this automatically
      return supabaseAuth.signOut();
    }
  };

  return (
    <AuthAdapterContext.Provider value={adaptedAuth}>
      {children}
    </AuthAdapterContext.Provider>
  );
};

// Custom hook to use the adapted auth
export const useAuth = () => {
  const context = useContext(AuthAdapterContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthAdapterProvider');
  }
  return context;
};

export default AuthAdapterContext;

