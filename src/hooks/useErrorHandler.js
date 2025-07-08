import { useState, useCallback, createContext, useContext } from 'react';
import { toast } from 'sonner';

export const ERROR_SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  SERVER: 'server',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  UNKNOWN: 'unknown'
};

// Create Error Context
const ErrorContext = createContext(null);

// Error Provider Component
export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addError = useCallback((error) => {
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const errorObject = {
      id: errorId,
      message: error.message || error,
      type: error.type || ERROR_TYPES.UNKNOWN,
      severity: error.severity || ERROR_SEVERITY.MEDIUM,
      timestamp: new Date().toISOString(),
      showToUser: error.showToUser !== false,
      userMessage: {
        title: error.userMessage?.title || 'Error',
        message: error.userMessage?.message || error.message || 'An error occurred',
        action: error.userMessage?.action
      }
    };
    
    setErrors(prev => [...prev, errorObject]);
    return errorObject;
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

// Updated useErrorHandler hook to use context
export const useErrorHandler = () => {
  const context = useContext(ErrorContext);
  
  if (!context) {
    throw new Error('useErrorHandler must be used within an ErrorProvider');
  }

  const { errors, isLoading, setIsLoading, addError, removeError, clearErrors } = context;

  const handleError = useCallback((error, options = {}) => {
    return addError({
      ...error,
      ...options,
      message: error?.message || error
    });
  }, [addError]);

  const executeWithErrorHandling = useCallback(async (asyncFunction, options = {}) => {
    setIsLoading(true);
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      const errorObject = handleError(error, {
        ...options,
        operation: options.operation || 'async operation'
      });
      throw errorObject;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, setIsLoading]);

  const handleAsyncError = useCallback(async (promise, options = {}) => {
    return executeWithErrorHandling(() => promise, options);
  }, [executeWithErrorHandling]);

  const handleValidationError = useCallback((validationErrors, options = {}) => {
    const errorMessage = Array.isArray(validationErrors) 
      ? validationErrors.join(', ')
      : validationErrors;
    
    return handleError(new Error(errorMessage), {
      ...options,
      severity: ERROR_SEVERITY.LOW,
      type: ERROR_TYPES.VALIDATION
    });
  }, [handleError]);

  const handleNetworkError = useCallback((error, options = {}) => {
    return handleError(error, {
      ...options,
      type: ERROR_TYPES.NETWORK,
      severity: ERROR_SEVERITY.HIGH
    });
  }, [handleError]);

  const handleAuthError = useCallback((error, options = {}) => {
    return handleError(error, {
      ...options,
      type: ERROR_TYPES.AUTHENTICATION,
      severity: ERROR_SEVERITY.HIGH
    });
  }, [handleError]);

  return {
    errors,
    isLoading,
    handleError,
    removeError,
    clearErrors,
    executeWithErrorHandling,
    handleAsyncError,
    handleValidationError,
    handleNetworkError,
    handleAuthError
  };
};

// Higher-order function for wrapping components with error handling
export const withErrorHandling = (WrappedComponent) => {
  return function ErrorHandledComponent(props) {
    const { handleError } = useErrorHandler();
    
    return <WrappedComponent {...props} onError={handleError} />;
  };
};

