import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../adapters/AuthAdapter';
import DubaiLoginForm from '../../components/auth/DubaiLoginForm';
import { UAEPassInfo } from '../../components/auth/UAEPassButton';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithUAEPass, isAuthenticated, isLoading } = useAuth();
  const { handleError, showSuccess } = useErrorHandler();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Handle email/password login
  const handleLogin = async (formData) => {
    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      }, 'email');

      showSuccess('Welcome back! You have been successfully logged in.');
      
      // Navigate to intended page or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the form component via useErrorHandler
      throw error;
    }
  };

  // Handle UAE Pass login
  const handleUAEPassLogin = async (uaePassData) => {
    try {
      await loginWithUAEPass(uaePassData);
      
      showSuccess('Welcome! You have been successfully authenticated with UAE Pass.');
      
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      handleError(error, 'UAE Pass authentication failed. Please try again.');
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Handle register navigation
  const handleRegister = () => {
    navigate('/register', { state: { from: location.state?.from } });
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* UAE Pass Information */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <UAEPassInfo />
        </div>
      </div>

      {/* Login Form */}
      <DubaiLoginForm
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onRegister={handleRegister}
        loading={isLoading}
      />

      {/* Additional Information */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#1B365D] mb-4">
              New to Dubai Government Services?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Create your account to access employment opportunities, career development programs, 
              and government services designed for UAE nationals and residents.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#228B22] rounded-full mr-3"></span>
                Access to exclusive job opportunities
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#228B22] rounded-full mr-3"></span>
                Career development and training programs
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#228B22] rounded-full mr-3"></span>
                Government services integration
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#228B22] rounded-full mr-3"></span>
                Secure UAE Pass authentication
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Information */}
      <div className="sr-only">
        <h1>Dubai Government Login</h1>
        <p>
          Sign in to access the Emirati Pathways Platform. 
          You can use your email and password or authenticate securely with UAE Pass.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

