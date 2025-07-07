import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../adapters/AuthAdapter';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';
import { DDSButton } from '../dds/DDSButton';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireVerification = false,
  allowedRoles = [],
  fallbackPath = '/login',
  showLoader = true
}) => {
  const { isAuthenticated, isLoading, user, hasRole, isVerified } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading && showLoader) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#1B365D] animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#1B365D] mb-2">
            Verifying Authentication
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your credentials...
          </p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Check verification requirement
  if (requireVerification && !isVerified()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
            Account Verification Required
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your account needs to be verified before you can access this feature. 
            Please check your email for verification instructions or contact support.
          </p>
          
          <div className="space-y-3">
            <DDSButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => window.location.href = '/verify-account'}
            >
              Verify Account
            </DDSButton>
            
            <DDSButton
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => window.location.href = '/support'}
            >
              Contact Support
            </DDSButton>
          </div>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
            Access Restricted
          </h2>
          
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. 
            Your current role: <span className="font-semibold">{user?.role || 'Unknown'}</span>
          </p>
          
          <div className="space-y-3">
            <DDSButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => window.history.back()}
            >
              Go Back
            </DDSButton>
            
            <DDSButton
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </DDSButton>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need different access? 
              <a href="/support" className="text-[#1B365D] hover:text-[#B8860B] font-medium ml-1">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // All checks passed, render the protected content
  return children;
};

// Higher-order component for protecting routes
export const withAuth = (Component, options = {}) => {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Specific role-based route components
export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute 
    allowedRoles={['admin', 'super_admin']} 
    requireVerification={true}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export const EmployerRoute = ({ children, ...props }) => (
  <ProtectedRoute 
    allowedRoles={['employer', 'admin']} 
    requireVerification={true}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export const JobSeekerRoute = ({ children, ...props }) => (
  <ProtectedRoute 
    allowedRoles={['job_seeker', 'admin']} 
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export const VerifiedRoute = ({ children, ...props }) => (
  <ProtectedRoute 
    requireVerification={true}
    {...props}
  >
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;

