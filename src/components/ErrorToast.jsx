import React from 'react';
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ERROR_SEVERITY } from '@/hooks/useErrorHandler';

const ErrorToast = ({ error, onDismiss, onAction }) => {
  const { severity, userMessage, type } = error;

  // Get appropriate icon and colors based on severity
  const getToastConfig = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.CRITICAL:
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          textColor: 'text-red-700'
        };
      case ERROR_SEVERITY.HIGH:
        return {
          icon: AlertCircle,
          bgColor: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600',
          titleColor: 'text-orange-900',
          textColor: 'text-orange-700'
        };
      case ERROR_SEVERITY.MEDIUM:
        return {
          icon: AlertCircle,
          bgColor: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          textColor: 'text-yellow-700'
        };
      case ERROR_SEVERITY.LOW:
        return {
          icon: Info,
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
          textColor: 'text-blue-700'
        };
      default:
        return {
          icon: AlertCircle,
          bgColor: 'bg-gray-50 border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-900',
          textColor: 'text-gray-700'
        };
    }
  };

  const config = getToastConfig(severity);
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} border rounded-lg p-4 shadow-lg max-w-md w-full animate-in slide-in-from-right-full duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${config.titleColor}`}>
            {userMessage.title}
          </h4>
          <p className={`text-sm mt-1 ${config.textColor}`}>
            {userMessage.message}
          </p>
          
          {userMessage.action && onAction && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction(error)}
                className="text-xs"
              >
                {userMessage.action}
              </Button>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onDismiss(error.id)}
          className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;

