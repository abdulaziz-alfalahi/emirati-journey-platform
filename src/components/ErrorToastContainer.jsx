import React from 'react';
import ErrorToast from './ErrorToast';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const ErrorToastContainer = () => {
  const { errors, removeError } = useErrorHandler();

  // Only show errors that should be displayed to user
  const visibleErrors = errors.filter(error => error.showToUser);

  const handleAction = (error) => {
    // Handle different action types
    switch (error.userMessage.action) {
      case 'Retry':
        // Trigger retry logic
        window.location.reload();
        break;
      case 'Log In':
        // Redirect to login
        window.location.href = '/login';
        break;
      case 'Go Back':
        // Go back in history
        window.history.back();
        break;
      case 'Refresh':
        // Refresh the page
        window.location.reload();
        break;
      case 'Contact Support':
        // Open support contact
        window.open('mailto:support@emiratipathways.ae', '_blank');
        break;
      default:
        // Default action - just dismiss
        removeError(error.id);
    }
  };

  if (visibleErrors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-h-screen overflow-y-auto">
      {visibleErrors.map((error) => (
        <ErrorToast
          key={error.id}
          error={error}
          onDismiss={removeError}
          onAction={handleAction}
        />
      ))}
    </div>
  );
};

export default ErrorToastContainer;

