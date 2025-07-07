import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../adapters/AuthAdapter';
import DubaiRegistrationForm from '../../components/auth/DubaiRegistrationForm';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated, isLoading } = useAuth();
  const { handleError, showSuccess } = useErrorHandler();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  // Handle registration
  const handleRegister = async (formData) => {
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        emiratesId: formData.emiratesId,
        password: formData.password,
        termsAccepted: formData.termsAccepted,
        privacyAccepted: formData.privacyAccepted,
        marketingAccepted: formData.marketingAccepted
      });

      showSuccess(
        'Account created successfully! Welcome to the Dubai Government Emirati Pathways Platform.'
      );
      
      // Navigate to dashboard or intended page
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by the form component via useErrorHandler
      throw error;
    }
  };

  // Handle login navigation
  const handleLogin = () => {
    navigate('/login', { state: { from: location.state?.from } });
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Registration Form */}
      <DubaiRegistrationForm
        onSubmit={handleRegister}
        onLogin={handleLogin}
        loading={isLoading}
      />

      {/* Additional Information */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#1B365D] mb-4">
              Why Join Dubai Government Services?
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Career Opportunities</h4>
                <p>Access exclusive job openings in government and private sectors across Dubai.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Professional Development</h4>
                <p>Participate in training programs and skill development initiatives.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Government Integration</h4>
                <p>Seamless access to various Dubai Government services and benefits.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Secure Platform</h4>
                <p>Your data is protected with government-grade security standards.</p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">
              Privacy & Data Protection
            </h4>
            <p className="text-xs text-blue-700">
              Your personal information is protected in accordance with UAE data protection laws 
              and Dubai Government privacy policies. We use your data only for providing 
              government services and will never share it without your consent.
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility Information */}
      <div className="sr-only">
        <h1>Dubai Government Registration</h1>
        <p>
          Create your account to access the Emirati Pathways Platform. 
          Fill out the registration form with your personal information and create a secure password.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

