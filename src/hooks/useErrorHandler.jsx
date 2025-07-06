import { useState, useCallback, useContext, createContext } from 'react';

// Error types for better categorization
export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  NOT_FOUND: 'not_found',
  SERVER: 'server',
  CLIENT: 'client',
  UNKNOWN: 'unknown'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Error Context for global error state management
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addError = useCallback((error) => {
    const errorWithId = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: new Date().toISOString(),
      ...error
    };
    
    setErrors(prev => [...prev, errorWithId]);
    
    // Auto-remove low severity errors after 5 seconds
    if (error.severity === ERROR_SEVERITY.LOW) {
      setTimeout(() => {
        removeError(errorWithId.id);
      }, 5000);
    }
    
    return errorWithId.id;
  }, []);

  const removeError = useCallback((errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const value = {
    errors,
    isLoading,
    setIsLoading,
    addError,
    removeError,
    clearErrors
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook for error handling
export const useErrorHandler = () => {
  const context = useContext(ErrorContext);
  
  if (!context) {
    throw new Error('useErrorHandler must be used within an ErrorProvider');
  }

  const { addError, removeError, clearErrors, errors, isLoading, setIsLoading } = context;

  // Helper function to create user-friendly error messages
  const createUserFriendlyMessage = (error, type) => {
    const messages = {
      [ERROR_TYPES.NETWORK]: {
        title: 'Connection Problem',
        message: 'Please check your internet connection and try again.',
        action: 'Retry'
      },
      [ERROR_TYPES.VALIDATION]: {
        title: 'Invalid Information',
        message: error.message || 'Please check your input and try again.',
        action: 'Fix'
      },
      [ERROR_TYPES.AUTHENTICATION]: {
        title: 'Authentication Required',
        message: 'Please log in to continue.',
        action: 'Log In'
      },
      [ERROR_TYPES.AUTHORIZATION]: {
        title: 'Access Denied',
        message: 'You don\'t have permission to perform this action.',
        action: 'Contact Support'
      },
      [ERROR_TYPES.NOT_FOUND]: {
        title: 'Not Found',
        message: 'The requested resource could not be found.',
        action: 'Go Back'
      },
      [ERROR_TYPES.SERVER]: {
        title: 'Server Error',
        message: 'Our servers are experiencing issues. Please try again later.',
        action: 'Retry Later'
      },
      [ERROR_TYPES.CLIENT]: {
        title: 'Application Error',
        message: 'Something went wrong. Please refresh the page.',
        action: 'Refresh'
      },
      [ERROR_TYPES.UNKNOWN]: {
        title: 'Unexpected Error',
        message: 'An unexpected error occurred. Please try again.',
        action: 'Try Again'
      }
    };

    return messages[type] || messages[ERROR_TYPES.UNKNOWN];
  };

  // Main error handling function
  const handleError = useCallback((error, options = {}) => {
    const {
      type = ERROR_TYPES.UNKNOWN,
      severity = ERROR_SEVERITY.MEDIUM,
      context = '',
      showToUser = true,
      logToService = true
    } = options;

    // Create user-friendly message
    const userMessage = createUserFriendlyMessage(error, type);

    // Create error object
    const errorObj = {
      originalError: error,
      type,
      severity,
      context,
      userMessage,
      showToUser,
      technical: {
        message: error.message,
        stack: error.stack,
        name: error.name
      }
    };

    // Log to console for development
    console.error(`[${severity.toUpperCase()}] ${type} error in ${context}:`, error);

    // Log to external service in production
    if (logToService && process.env.NODE_ENV === 'production') {
      // In a real app, send to error tracking service
      console.log('Would log to error service:', errorObj);
    }

    // Add to error state if should show to user
    if (showToUser) {
      return addError(errorObj);
    }

    return null;
  }, [addError]);

  // Async operation wrapper with error handling
  const withErrorHandling = useCallback(async (asyncFn, options = {}) => {
    const { 
      loadingState = true,
      errorOptions = {}
    } = options;

    try {
      if (loadingState) setIsLoading(true);
      const result = await asyncFn();
      return { success: true, data: result, error: null };
    } catch (error) {
      const errorId = handleError(error, errorOptions);
      return { success: false, data: null, error, errorId };
    } finally {
      if (loadingState) setIsLoading(false);
    }
  }, [handleError, setIsLoading]);

  // Network request wrapper
  const handleApiCall = useCallback(async (apiCall, options = {}) => {
    return withErrorHandling(apiCall, {
      ...options,
      errorOptions: {
        type: ERROR_TYPES.NETWORK,
        context: 'API Call',
        ...options.errorOptions
      }
    });
  }, [withErrorHandling]);

  return {
    errors,
    isLoading,
    handleError,
    withErrorHandling,
    handleApiCall,
    removeError,
    clearErrors,
    ERROR_TYPES,
    ERROR_SEVERITY
  };
};

export default useErrorHandler;

