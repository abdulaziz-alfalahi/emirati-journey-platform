import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { DDSButton } from '../dds/DDSButton';
import AuthLayout from './AuthLayout';

const DubaiRegistrationForm = ({ onSubmit, onLogin, loading = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emiratesId: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { handleError } = useErrorHandler();

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^(\+971|0)?[0-9]{9}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid UAE phone number';
        return '';
      case 'emiratesId':
        if (!value) return 'Emirates ID is required';
        if (!/^784-[0-9]{4}-[0-9]{7}-[0-9]$/.test(value)) return 'Please enter a valid Emirates ID (784-YYYY-NNNNNNN-N)';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'termsAccepted':
        if (!value) return 'You must accept the Terms and Conditions';
        return '';
      case 'privacyAccepted':
        if (!value) return 'You must accept the Privacy Policy';
        return '';
      default:
        return '';
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === 'checkbox' ? checked : value;
    
    // Format Emirates ID
    if (name === 'emiratesId') {
      fieldValue = formatEmiratesId(value);
    }
    
    // Format phone number
    if (name === 'phone') {
      fieldValue = formatPhoneNumber(value);
    }
    
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

    // Validate confirm password when password changes
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  // Format Emirates ID
  const formatEmiratesId = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `784-${numbers.slice(3)}`;
    if (numbers.length <= 14) return `784-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    return `784-${numbers.slice(3, 7)}-${numbers.slice(7, 14)}-${numbers.slice(14, 15)}`;
  };

  // Format phone number
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('971')) return `+${numbers}`;
    if (numbers.startsWith('0')) return numbers;
    return numbers;
  };

  // Handle field blur
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

  // Validate current step
  const validateStep = (step) => {
    const stepFields = {
      1: ['firstName', 'lastName', 'email', 'phone', 'emiratesId'],
      2: ['password', 'confirmPassword'],
      3: ['termsAccepted', 'privacyAccepted']
    };

    const fieldsToValidate = stepFields[step] || [];
    const newErrors = {};
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    setTouched(prev => {
      const newTouched = { ...prev };
      fieldsToValidate.forEach(field => {
        newTouched[field] = true;
      });
      return newTouched;
    });

    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      handleError(new Error('Please complete all required fields'), 'Registration validation failed');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      handleError(error, 'Registration failed. Please try again.');
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
    maxLength
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
            maxLength={maxLength}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {hasError && <AlertCircle className="h-5 w-5 text-[#C41E3A]" />}
            {isValid && <CheckCircle className="h-5 w-5 text-[#228B22]" />}
          </div>
        </div>
        {hasError && (
          <p className="text-sm text-[#C41E3A] flex items-center" role="alert">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            step < currentStep 
              ? "bg-[#228B22] text-white" 
              : step === currentStep 
                ? "bg-[#1B365D] text-white"
                : "bg-gray-200 text-gray-600"
          )}>
            {step < currentStep ? '✓' : step}
          </div>
          {step < 3 && (
            <div className={cn(
              "w-12 h-1 mx-2",
              step < currentStep ? "bg-[#228B22]" : "bg-gray-200"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Dubai Government Emirati Pathways Platform"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <StepIndicator />

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="firstName"
                placeholder="First Name"
                icon={User}
                required
                autoComplete="given-name"
              />
              <InputField
                name="lastName"
                placeholder="Last Name"
                icon={User}
                required
                autoComplete="family-name"
              />
            </div>

            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={Mail}
              required
              autoComplete="email"
            />

            <InputField
              name="phone"
              type="tel"
              placeholder="Phone Number"
              icon={Phone}
              required
              autoComplete="tel"
            />

            <InputField
              name="emiratesId"
              placeholder="Emirates ID (784-YYYY-NNNNNNN-N)"
              icon={CreditCard}
              required
              maxLength={18}
            />

            <DDSButton
              type="button"
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="w-full"
            >
              Continue
            </DDSButton>
          </div>
        )}

        {/* Step 2: Account Security */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Account Security</h3>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-[#C41E3A] ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={cn(
                    "h-5 w-5",
                    touched.password && errors.password ? "text-[#C41E3A]" : "text-gray-400"
                  )} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                  className={cn(
                    "block w-full pl-10 pr-10 py-3 border rounded-lg text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B]",
                    touched.password && errors.password ? "border-[#C41E3A] bg-red-50" : "border-gray-300"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-[#C41E3A] flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-[#C41E3A] ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={cn(
                    "h-5 w-5",
                    touched.confirmPassword && errors.confirmPassword ? "text-[#C41E3A]" : "text-gray-400"
                  )} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className={cn(
                    "block w-full pl-10 pr-10 py-3 border rounded-lg text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B]",
                    touched.confirmPassword && errors.confirmPassword ? "border-[#C41E3A] bg-red-50" : "border-gray-300"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-[#C41E3A] flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <DDSButton
                type="button"
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                className="flex-1"
              >
                Back
              </DDSButton>
              <DDSButton
                type="button"
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="flex-1"
              >
                Continue
              </DDSButton>
            </div>
          </div>
        )}

        {/* Step 3: Terms and Conditions */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Terms & Agreements</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#1B365D] focus:ring-[#B8860B] border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="termsAccepted" className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#1B365D] hover:text-[#B8860B] font-medium">
                    Terms and Conditions
                  </a>
                  <span className="text-[#C41E3A] ml-1">*</span>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#1B365D] focus:ring-[#B8860B] border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="privacyAccepted" className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#1B365D] hover:text-[#B8860B] font-medium">
                    Privacy Policy
                  </a>
                  <span className="text-[#C41E3A] ml-1">*</span>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="marketingAccepted"
                  name="marketingAccepted"
                  type="checkbox"
                  checked={formData.marketingAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#1B365D] focus:ring-[#B8860B] border-gray-300 rounded mt-1"
                />
                <label htmlFor="marketingAccepted" className="ml-3 text-sm text-gray-700">
                  I would like to receive updates about Dubai Government services and opportunities
                </label>
              </div>
            </div>

            {(errors.termsAccepted || errors.privacyAccepted) && (
              <div className="text-sm text-[#C41E3A] flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Please accept the required terms and conditions
              </div>
            )}

            <div className="flex space-x-4">
              <DDSButton
                type="button"
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                className="flex-1"
              >
                Back
              </DDSButton>
              <DDSButton
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="flex-1"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </DDSButton>
            </div>
          </div>
        )}

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="font-medium text-[#1B365D] hover:text-[#B8860B] transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default DubaiRegistrationForm;

