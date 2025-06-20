
import React, { useCallback, useMemo, Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslationLoader } from '@/hooks/useTranslationLoader';
import TranslationLoadingState from '@/components/summer-camps/TranslationLoadingState';
import MemoizedSummerCampsContent from '@/components/summer-camps/MemoizedSummerCampsContent';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const SummerCampsPage: React.FC = () => {
  const { isRTL, direction } = useLanguage();
  const { 
    t, 
    isLoading, 
    error,
    loadedLanguages 
  } = useTranslationLoader({ 
    namespace: 'summer-camps',
    preloadLanguages: ['en', 'ar'],
    cacheExpiry: 10 * 60 * 1000 // 10 minutes cache
  });

  // Enhanced translation function that ensures string return
  const getSafeTranslation = useCallback((key: string): string => {
    const translation = t(key);
    return typeof translation === 'string' ? translation : String(translation);
  }, [t]);

  // Memoized stats to prevent re-computation
  const stats = useMemo(() => [
    { 
      value: getSafeTranslation('stats.summerPrograms.value'), 
      label: getSafeTranslation('stats.summerPrograms.label'), 
      icon: Calendar 
    },
    { 
      value: getSafeTranslation('stats.studentsEnrolled.value'), 
      label: getSafeTranslation('stats.studentsEnrolled.label'), 
      icon: Users 
    },
    { 
      value: getSafeTranslation('stats.partnerInstitutions.value'), 
      label: getSafeTranslation('stats.partnerInstitutions.label'), 
      icon: Award 
    },
    { 
      value: getSafeTranslation('stats.emiratesCovered.value'), 
      label: getSafeTranslation('stats.emiratesCovered.label'), 
      icon: MapPin 
    }
  ], [getSafeTranslation]);

  // Memoized camps to prevent re-computation
  const camps = useMemo(() => [
    {
      title: getSafeTranslation('camps.stemInnovation.title'),
      description: getSafeTranslation('camps.stemInnovation.description'),
      duration: getSafeTranslation('camps.stemInnovation.duration'),
      ageGroup: getSafeTranslation('camps.stemInnovation.ageGroup'),
      location: getSafeTranslation('camps.stemInnovation.location'),
      price: getSafeTranslation('camps.stemInnovation.price')
    },
    {
      title: getSafeTranslation('camps.entrepreneurshipBootcamp.title'),
      description: getSafeTranslation('camps.entrepreneurshipBootcamp.description'),
      duration: getSafeTranslation('camps.entrepreneurshipBootcamp.duration'),
      ageGroup: getSafeTranslation('camps.entrepreneurshipBootcamp.ageGroup'),
      location: getSafeTranslation('camps.entrepreneurshipBootcamp.location'),
      price: getSafeTranslation('camps.entrepreneurshipBootcamp.price')
    },
    {
      title: getSafeTranslation('camps.digitalArtsDesign.title'),
      description: getSafeTranslation('camps.digitalArtsDesign.description'),
      duration: getSafeTranslation('camps.digitalArtsDesign.duration'),
      ageGroup: getSafeTranslation('camps.digitalArtsDesign.ageGroup'),
      location: getSafeTranslation('camps.digitalArtsDesign.location'),
      price: getSafeTranslation('camps.digitalArtsDesign.price')
    }
  ], [getSafeTranslation]);

  // Memoized apply handler to prevent re-renders
  const handleApplyClick = useCallback((campIndex: number) => {
    console.log(`Applying for camp: ${camps[campIndex]?.title}`);
    // Application logic would go here
  }, [camps]);

  // Error fallback component
  const ErrorFallback = ({ error }: { error?: Error }) => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error?.message || 'An unexpected error occurred'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  );

  // Memoized tabs to prevent re-computation
  const tabs = useMemo(() => [
    {
      id: "programs",
      label: getSafeTranslation('tabs.programs.label'),
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<TranslationLoadingState />}>
            <MemoizedSummerCampsContent
              stats={stats}
              camps={camps}
              t={getSafeTranslation}
              onApplyClick={handleApplyClick}
            />
          </Suspense>
        </ErrorBoundary>
      )
    }
  ], [getSafeTranslation, stats, camps, handleApplyClick]);

  // Show loading state during initial translation loading
  if (isLoading && loadedLanguages.length === 0) {
    return <TranslationLoadingState />;
  }

  // Show error state if translation loading failed
  if (error && loadedLanguages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Translation Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen",
      isRTL && "rtl:font-arabic"
    )} dir={direction}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <EducationPathwayLayout
          title={getSafeTranslation('meta.title')}
          description={getSafeTranslation('meta.description')}
          icon={<Calendar className="h-12 w-12 text-orange-600" />}
          stats={stats}
          tabs={tabs}
          defaultTab="programs"
          actionButtonText={getSafeTranslation('ui.buttons.browseProgramsShort')}
          actionButtonHref="#programs"
          announcements={[
            {
              id: "1",
              title: getSafeTranslation('announcements.earlyBird.title'),
              message: getSafeTranslation('announcements.earlyBird.message'),
              type: "info",
              date: new Date(),
              urgent: false
            }
          ]}
          academicYear={getSafeTranslation('info.academicYear')}
        />
      </ErrorBoundary>
    </div>
  );
};

export default SummerCampsPage;
