import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const ERROR_SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error, context = {}) => {
    // Generate unique error ID
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log error details
    console.error('Error handled by useErrorHandler:', {
      errorId,
      error: error?.message || error,
      stack: error?.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Determine error message
    let errorMessage = 'حدث خطأ غير متوقع / An unexpected error occurred';
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      // Map common error types to user-friendly messages
      if (error.message.includes('Network Error') || error.message.includes('fetch')) {
        errorMessage = 'خطأ في الاتصال بالشبكة / Network connection error';
      } else if (error.message.includes('Unauthorized') || error.message.includes('401')) {
        errorMessage = 'انتهت صلاحية الجلسة / Session expired';
      } else if (error.message.includes('Forbidden') || error.message.includes('403')) {
        errorMessage = 'غير مصرح لك بهذا الإجراء / Access denied';
      } else if (error.message.includes('Not Found') || error.message.includes('404')) {
        errorMessage = 'الصفحة غير موجودة / Page not found';
      } else if (error.message.includes('Validation') || error.message.includes('Invalid')) {
        errorMessage = 'بيانات غير صحيحة / Invalid data provided';
      } else {
        errorMessage = error.message;
      }
    }

    // Set error state
    const errorObject = {
      message: errorMessage,
      originalError: error,
      context,
      errorId,
      timestamp: new Date().toISOString()
    };
    
    setError(errorObject);

    // Show toast notification if requested
    if (context.showToast !== false) {
      const toastOptions = {
        id: errorId,
        description: context.description || 'يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني',
        duration: context.duration || 5000,
        action: context.action || {
          label: 'إعادة المحاولة',
          onClick: () => {
            if (context.onRetry) {
              context.onRetry();
            }
            clearError();
          }
        }
      };

      // Show different toast types based on error severity
      if (context.severity === 'warning') {
        toast.warning(errorMessage, toastOptions);
      } else if (context.severity === 'info') {
        toast.info(errorMessage, toastOptions);
      } else {
        toast.error(errorMessage, toastOptions);
      }
    }

    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production' && context.reportError !== false) {
      // Example: Send to error monitoring service
      // errorMonitoringService.captureException(error, { errorId, context });
    }

    return errorObject;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = useCallback(async (asyncFunction, context = {}) => {
    setIsLoading(true);
    try {
      const result = await asyncFunction();
      clearError(); // Clear any previous errors on success
      return result;
    } catch (error) {
      const errorObject = handleError(error, {
        ...context,
        operation: context.operation || 'async operation'
      });
      throw errorObject; // Re-throw for caller to handle if needed
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError]);

  const handleAsyncError = useCallback(async (promise, context = {}) => {
    return executeWithErrorHandling(() => promise, context);
  }, [executeWithErrorHandling]);

  // Utility function for form validation errors
  const handleValidationError = useCallback((validationErrors, context = {}) => {
    const errorMessage = Array.isArray(validationErrors) 
      ? validationErrors.join(', ')
      : validationErrors;
    
    return handleError(new Error(errorMessage), {
      ...context,
      severity: 'warning',
      type: 'validation'
    });
  }, [handleError]);

  // Utility function for network errors
  const handleNetworkError = useCallback((error, context = {}) => {
    return handleError(error, {
      ...context,
      type: 'network',
      description: 'يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى'
    });
  }, [handleError]);

  // Utility function for authentication errors
  const handleAuthError = useCallback((error, context = {}) => {
    return handleError(error, {
      ...context,
      type: 'authentication',
      description: 'يرجى تسجيل الدخول مرة أخرى',
      action: {
        label: 'تسجيل الدخول',
        onClick: () => {
          window.location.href = '/auth/login';
        }
      }
    });
  }, [handleError]);

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
    handleAsyncError,
    handleValidationError,
    handleNetworkError,
    handleAuthError
  };
};

