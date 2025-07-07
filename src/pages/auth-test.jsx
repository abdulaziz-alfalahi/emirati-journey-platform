import React from 'react';
import DubaiLoginForm from '../components/auth/DubaiLoginForm';
import { useAuth } from '../adapters/AuthAdapter';

const AuthTestPage = () => {
  const { login, user, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication Test
          </h1>
          <p className="text-gray-600">
            Testing Dubai Government Authentication System
          </p>
        </div>

        {isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              ✅ Authentication Successful!
            </h2>
            <div className="space-y-2">
              <p><strong>User ID:</strong> {user?.id}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Name:</strong> {user?.fullName}</p>
              <p><strong>Role:</strong> {user?.role}</p>
              <p><strong>Verified:</strong> {user?.verified ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Dubai Government Login
            </h2>
            <DubaiLoginForm
              onSubmit={handleLogin}
              loading={isLoading}
              onForgotPassword={() => console.log('Forgot password')}
              onRegister={() => console.log('Register')}
            />
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Authentication Status: {isAuthenticated ? 'Logged In' : 'Not Logged In'}
          </p>
          {isLoading && (
            <p className="text-sm text-blue-600 mt-2">
              Loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;

