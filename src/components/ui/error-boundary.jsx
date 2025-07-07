import React from 'react';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    });
    
    // Log error to console (in production, send to monitoring service)
    console.error('Error caught by boundary:', {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error monitoring service
      // errorMonitoringService.captureException(error, { errorId, errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200">
            {/* Header with UAE government styling */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3" />
                <div>
                  <h2 className="text-lg font-semibold">خطأ في النظام</h2>
                  <p className="text-sm opacity-90">System Error</p>
                </div>
              </div>
            </div>

            {/* Error content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-gray-600 mb-4">
                  <p className="text-sm mb-2">
                    نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.
                  </p>
                  <p className="text-sm text-gray-500">
                    We apologize for this error. Please try again or contact technical support.
                  </p>
                </div>
                
                {this.state.errorId && (
                  <div className="bg-gray-100 rounded-md p-3 mb-4">
                    <p className="text-xs text-gray-600">
                      Error ID: <span className="font-mono">{this.state.errorId}</span>
                    </p>
                  </div>
                )}

                {/* Development mode error details */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <summary className="text-sm font-medium text-red-800 cursor-pointer">
                      Development Error Details
                    </summary>
                    <div className="mt-2 text-xs text-red-700">
                      <p className="font-semibold">Error: {this.state.error.message}</p>
                      <pre className="mt-2 whitespace-pre-wrap text-xs overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  </details>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  إعادة المحاولة / Try Again
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={this.handleGoHome}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    الرئيسية
                  </button>
                  
                  <button
                    onClick={this.handleReload}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    إعادة تحميل
                  </button>
                </div>

                {/* Support contact */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-2">
                    إذا استمر الخطأ، يرجى الاتصال بالدعم الفني
                  </p>
                  <button
                    onClick={() => window.open('mailto:support@emirati-platform.ae?subject=Error Report&body=Error ID: ' + this.state.errorId, '_blank')}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    الاتصال بالدعم / Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

