import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { DDSButton } from '../dds/DDSButton';
import AuthLayout from './AuthLayout';

const DubaiLoginForm = ({ onSubmit, onForgotPassword, onRegister, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { handleError } = useErrorHandler();

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      handleError(new Error('Please correct the errors below'), 'Form validation failed');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      handleError(error, 'Login failed. Please check your credentials and try again.');
    }
  };

  // Input field component
  const InputField = ({ 
    name, 
    type = 'text', 
    placeholder, 
    icon: Icon, 
    required = false,
    autoComplete,
    'aria-describedby': ariaDescribedBy
  }) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name];

    return (
      <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {placeholder}
          {required && <span className="text-[#C41E3A] ml-1">*</span>}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={cn(
              "h-5 w-5",
              hasError ? "text-[#C41E3A]" : isValid ? "text-[#228B22]" : "text-gray-400"
            )} />
          </div>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={ariaDescribedBy}
            className={cn(
              "block w-full pl-10 pr-10 py-3 border rounded-lg text-sm",
              "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B]",
              "transition-colors duration-200",
              hasError 
                ? "border-[#C41E3A] bg-red-50" 
                : isValid 
                  ? "border-[#228B22] bg-green-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
            )}
          />
          {/* Validation icon */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {hasError && (
              <AlertCircle className="h-5 w-5 text-[#C41E3A]" />
            )}
            {isValid && (
              <CheckCircle className="h-5 w-5 text-[#228B22]" />
            )}
          </div>
        </div>
        {/* Error message */}
        {hasError && (
          <p 
            id={`${name}-error`}
            className="text-sm text-[#C41E3A] flex items-center"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Dubai Government account"
    >
      <form onSubmit={handleSubmit} className="space-y-6" id="auth-form">
        {/* Email Field */}
        <InputField
          name="email"
          type="email"
          placeholder="Email Address"
          icon={Mail}
          required
          autoComplete="email"
          aria-describedby="email-error"
        />

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
            <span className="text-[#C41E3A] ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={cn(
                "h-5 w-5",
                touched.password && errors.password 
                  ? "text-[#C41E3A]" 
                  : touched.password && !errors.password && formData.password
                    ? "text-[#228B22]"
                    : "text-gray-400"
              )} />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              autoComplete="current-password"
              required
              aria-invalid={touched.password && errors.password ? 'true' : 'false'}
              aria-describedby="password-error"
              className={cn(
                "block w-full pl-10 pr-10 py-3 border rounded-lg text-sm",
                "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B]",
                "transition-colors duration-200",
                touched.password && errors.password 
                  ? "border-[#C41E3A] bg-red-50" 
                  : touched.password && !errors.password && formData.password
                    ? "border-[#228B22] bg-green-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {touched.password && errors.password && (
            <p 
              id="password-error"
              className="text-sm text-[#C41E3A] flex items-center"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#1B365D] focus:ring-[#B8860B] border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-[#1B365D] hover:text-[#B8860B] font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <DDSButton
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </DDSButton>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* UAE Pass Button - Placeholder for now */}
        <DDSButton
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => handleError(new Error('UAE Pass integration coming soon'), 'UAE Pass login will be available soon')}
        >
          <span className="mr-2">🇦🇪</span>
          Sign in with UAE Pass
        </DDSButton>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onRegister}
              className="font-medium text-[#1B365D] hover:text-[#B8860B] transition-colors"
            >
              Create account
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default DubaiLoginForm;

