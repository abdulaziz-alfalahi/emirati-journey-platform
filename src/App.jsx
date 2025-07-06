import React, { Suspense, lazy, createContext, useContext, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Zap, Users, TrendingUp, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorToastContainer from '@/components/ErrorToastContainer';
import { ErrorProvider, useErrorHandler, ERROR_TYPES, ERROR_SEVERITY } from '@/hooks/useErrorHandler';
import { UAEButton } from '@/components/ui/uae-button';
import { UAECard, UAECardHeader, UAECardTitle, UAECardDescription, UAECardContent, UAECardFooter } from '@/components/ui/uae-card';
import { Button } from '@/components/ui/button';
import './App.css';

// Create PhaseContext to fix the usePhase error
const PhaseContext = createContext();

export const usePhase = () => {
  const context = useContext(PhaseContext);
  if (!context) {
    // Return default values instead of throwing error to prevent crashes
    return {
      currentPhase: 'dashboard',
      setCurrentPhase: () => {},
      phaseData: {},
      setPhaseData: () => {},
      isLoading: false,
      error: null
    };
  }
  return context;
};

const PhaseProvider = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState('dashboard');
  const [phaseData, setPhaseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    currentPhase,
    setCurrentPhase,
    phaseData,
    setPhaseData,
    isLoading,
    setIsLoading,
    error,
    setError
  };

  return (
    <PhaseContext.Provider value={value}>
      {children}
    </PhaseContext.Provider>
  );
};

// Lazy load heavy components with error handling
const CVBuilder = lazy(() => 
  import('@/components/cv-builder/CVBuilder').catch(() => ({
    default: () => <div className="p-4 text-center">CV Builder is not available</div>
  }))
);

const JobSearch = lazy(() => 
  import('@/components/job-search/JobSearch').catch(() => ({
    default: () => <div className="p-4 text-center">Job Search is not available</div>
  }))
);

const ProfileManager = lazy(() => 
  import('@/components/profile/ProfileManager').catch(() => ({
    default: () => <div className="p-4 text-center">Profile Manager is not available</div>
  }))
);

const ApplicationTracker = lazy(() => 
  import('@/components/applications/ApplicationTracker').catch(() => ({
    default: () => <div className="p-4 text-center">Application Tracker is not available</div>
  }))
);

const SkillAssessment = lazy(() => 
  import('@/components/skills/SkillAssessment').catch(() => ({
    default: () => <div className="p-4 text-center">Skill Assessment is not available</div>
  }))
);

const CareerGuidance = lazy(() => 
  import('@/components/career/CareerGuidance').catch(() => ({
    default: () => <div className="p-4 text-center">Career Guidance is not available</div>
  }))
);

// Loading component with UAE branding
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-600 rounded-full animate-spin" style={{animationDelay: '150ms'}}></div>
    </div>
    <p className="text-blue-600 font-medium">{message}</p>
    <p className="text-sm text-gray-500">Powered by EHRDC</p>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetError }) => (
  <UAECard variant="default" className="border-red-200 bg-red-50">
    <UAECardHeader>
      <UAECardTitle className="text-red-700 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Something went wrong
      </UAECardTitle>
      <UAECardDescription className="text-red-600">
        {error?.message || 'An unexpected error occurred'}
      </UAECardDescription>
    </UAECardHeader>
    <UAECardFooter>
      <UAEButton onClick={resetError} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
        Try Again
      </UAEButton>
    </UAECardFooter>
  </UAECard>
);

// Demo component to test error handling
const ErrorTestComponent = () => {
  const { handleError, withErrorHandling, ERROR_TYPES, ERROR_SEVERITY } = useErrorHandler();

  const triggerNetworkError = () => {
    const error = new Error('Failed to fetch user data from server');
    handleError(error, {
      type: ERROR_TYPES.NETWORK,
      severity: ERROR_SEVERITY.HIGH,
      context: 'User Profile Loading'
    });
  };

  const triggerValidationError = () => {
    const error = new Error('Email format is invalid');
    handleError(error, {
      type: ERROR_TYPES.VALIDATION,
      severity: ERROR_SEVERITY.MEDIUM,
      context: 'Profile Form Validation'
    });
  };

  const triggerCriticalError = () => {
    const error = new Error('Database connection lost');
    handleError(error, {
      type: ERROR_TYPES.SERVER,
      severity: ERROR_SEVERITY.CRITICAL,
      context: 'System Health Check'
    });
  };

  const triggerAsyncError = async () => {
    const result = await withErrorHandling(
      async () => {
        throw new Error('Async operation failed');
      },
      {
        errorOptions: {
          type: ERROR_TYPES.CLIENT,
          severity: ERROR_SEVERITY.LOW,
          context: 'Background Task'
        }
      }
    );
    
    if (!result.success) {
      console.log('Async operation failed gracefully');
    }
  };

  return (
    <UAECard variant="default" className="mb-6">
      <UAECardHeader>
        <UAECardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Error Handling Demo
        </UAECardTitle>
        <UAECardDescription>
          Test the enhanced error handling system with different error types and severities.
        </UAECardDescription>
      </UAECardHeader>
      <UAECardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UAEButton onClick={triggerNetworkError} variant="outline" className="w-full">
            Network Error (High)
          </UAEButton>
          <UAEButton onClick={triggerValidationError} variant="outline" className="w-full">
            Validation Error (Medium)
          </UAEButton>
          <UAEButton onClick={triggerCriticalError} variant="outline" className="w-full">
            Critical Error
          </UAEButton>
          <UAEButton onClick={triggerAsyncError} variant="outline" className="w-full">
            Async Error (Low)
          </UAEButton>
        </div>
      </UAECardContent>
    </UAECard>
  );
};

// Dashboard component showcasing UAE design system
const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  
  const stats = [
    {
      title: 'Active Applications',
      value: '12',
      change: '+3 this week',
      icon: TrendingUp,
      color: 'text-green-600',
      action: () => setActiveView('applications')
    },
    {
      title: 'Profile Views',
      value: '248',
      change: '+15% this month',
      icon: Users,
      color: 'text-yellow-500',
      action: () => setActiveView('profile')
    },
    {
      title: 'Skills Verified',
      value: '8',
      change: '2 pending',
      icon: Award,
      color: 'text-blue-600',
      action: () => setActiveView('skills')
    },
    {
      title: 'AI Recommendations',
      value: '5',
      change: 'Updated today',
      icon: Zap,
      color: 'text-green-600',
      action: () => setActiveView('career')
    }
  ];

  // Render different views based on activeView state
  const renderActiveView = () => {
    switch (activeView) {
      case 'cv-builder':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading CV Builder..." />}>
              <CVBuilder />
            </Suspense>
          </ErrorBoundary>
        );
      case 'job-search':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading Job Search..." />}>
              <JobSearch />
            </Suspense>
          </ErrorBoundary>
        );
      case 'profile':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading Profile Manager..." />}>
              <ProfileManager />
            </Suspense>
          </ErrorBoundary>
        );
      case 'applications':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading Application Tracker..." />}>
              <ApplicationTracker />
            </Suspense>
          </ErrorBoundary>
        );
      case 'skills':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading Skill Assessment..." />}>
              <SkillAssessment />
            </Suspense>
          </ErrorBoundary>
        );
      case 'career':
        return (
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner message="Loading Career Guidance..." />}>
              <CareerGuidance />
            </Suspense>
          </ErrorBoundary>
        );
      default:
        return <DashboardHome stats={stats} setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
        <UAEButton 
          onClick={() => setActiveView('dashboard')} 
          variant={activeView === 'dashboard' ? 'primary' : 'outline'}
          size="sm"
        >
          Dashboard
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('cv-builder')} 
          variant={activeView === 'cv-builder' ? 'primary' : 'outline'}
          size="sm"
        >
          CV Builder
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('job-search')} 
          variant={activeView === 'job-search' ? 'primary' : 'outline'}
          size="sm"
        >
          Job Search
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('profile')} 
          variant={activeView === 'profile' ? 'primary' : 'outline'}
          size="sm"
        >
          Profile
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('applications')} 
          variant={activeView === 'applications' ? 'primary' : 'outline'}
          size="sm"
        >
          Applications
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('skills')} 
          variant={activeView === 'skills' ? 'primary' : 'outline'}
          size="sm"
        >
          Skills
        </UAEButton>
        <UAEButton 
          onClick={() => setActiveView('career')} 
          variant={activeView === 'career' ? 'primary' : 'outline'}
          size="sm"
        >
          Career Guidance
        </UAEButton>
      </div>

      {/* Dynamic Content Area */}
      {renderActiveView()}
    </div>
  );
};

// Dashboard Home Component (extracted for better organization)
const DashboardHome = ({ stats, setActiveView }) => {
  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-yellow-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed!</h1>
            <p className="text-white/90">
              You have 3 new opportunities matching your profile. Let's explore them together.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <UAEButton 
            onClick={() => setActiveView('job-search')}
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-white/90"
          >
            View Opportunities
          </UAEButton>
          <UAEButton 
            onClick={() => setActiveView('profile')}
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Update Profile
          </UAEButton>
        </div>
      </div>

      {/* Error Testing Section */}
      <ErrorTestComponent />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <UAECard 
            key={index} 
            variant="default" 
            className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={stat.action}
          >
            <UAECardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
            </UAECardContent>
          </UAECard>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UAECard variant="default">
          <UAECardHeader>
            <UAECardTitle>Recent Applications</UAECardTitle>
            <UAECardDescription>
              Track your latest job applications and their status.
            </UAECardDescription>
          </UAECardHeader>
          <UAECardContent>
            <div className="space-y-4">
              {[
                { company: 'Emirates Airlines', position: 'Software Engineer', status: 'Interview Scheduled', color: 'bg-green-500' },
                { company: 'ADNOC', position: 'Data Analyst', status: 'Under Review', color: 'bg-yellow-500' },
                { company: 'Dubai Municipality', position: 'Project Manager', status: 'Application Sent', color: 'bg-blue-500' }
              ].map((app, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <div className={`w-3 h-3 rounded-full ${app.color}`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{app.position}</p>
                    <p className="text-xs text-gray-600">{app.company}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white rounded-full border">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </UAECardContent>
          <UAECardFooter>
            <UAEButton 
              onClick={() => setActiveView('applications')}
              variant="outline" 
              className="w-full"
            >
              View All Applications
            </UAEButton>
          </UAECardFooter>
        </UAECard>

        <UAECard variant="default">
          <UAECardHeader>
            <UAECardTitle>AI Recommendations</UAECardTitle>
            <UAECardDescription>
              Personalized career opportunities based on your profile.
            </UAECardDescription>
          </UAECardHeader>
          <UAECardContent>
            <div className="space-y-4">
              {[
                { title: 'Senior Developer Role', match: '95%', company: 'Technology Innovation Institute' },
                { title: 'Product Manager', match: '88%', company: 'Careem' },
                { title: 'UX Designer', match: '82%', company: 'Noon' }
              ].map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-xs text-gray-600">{rec.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">{rec.match}</span>
                    <p className="text-xs text-gray-600">match</p>
                  </div>
                </div>
              ))}
            </div>
          </UAECardContent>
          <UAECardFooter>
            <UAEButton 
              onClick={() => setActiveView('career')}
              variant="primary" 
              className="w-full"
            >
              Explore Recommendations
            </UAEButton>
          </UAECardFooter>
        </UAECard>
      </div>

      {/* Design System Showcase */}
      <UAECard variant="featured">
        <UAECardHeader>
          <UAECardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Phase 2A: Foundation Enhancement Complete
          </UAECardTitle>
          <UAECardDescription>
            Enhanced error handling system and UAE-inspired design system successfully implemented.
          </UAECardDescription>
        </UAECardHeader>
        <UAECardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gray-100">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-medium text-blue-600">Error Boundaries</h4>
              <p className="text-xs text-gray-600">Graceful error handling</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-100">
              <Info className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-blue-600">Toast Notifications</h4>
              <p className="text-xs text-gray-600">User-friendly messages</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-100">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-blue-600">UAE Design System</h4>
              <p className="text-xs text-gray-600">Cultural design elements</p>
            </div>
          </div>
        </UAECardContent>
        <UAECardFooter className="justify-between">
          <div className="text-sm text-gray-600">
            Ready for Phase 2B: UI/UX Enhancement
          </div>
          <UAEButton variant="success">
            Continue to Phase 2B
          </UAEButton>
        </UAECardFooter>
      </UAECard>
    </>
  );
};

// Main App component
function App() {
  return (
    <ErrorProvider>
      <PhaseProvider>
        <ErrorBoundary fallback={ErrorFallback}>
          <Layout>
            <Suspense fallback={<LoadingSpinner message="Loading EHRDC Platform..." />}>
              <Dashboard />
            </Suspense>
            <ErrorToastContainer />
          </Layout>
        </ErrorBoundary>
      </PhaseProvider>
    </ErrorProvider>
  );
}

export default App;
