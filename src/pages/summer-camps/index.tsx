
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

  // Memoized stats to prevent re-computation
  const stats = useMemo(() => [
    { 
      value: t('stats.summerPrograms.value'), 
      label: t('stats.summerPrograms.label'), 
      icon: Calendar 
    },
    { 
      value: t('stats.studentsEnrolled.value'), 
      label: t('stats.studentsEnrolled.label'), 
      icon: Users 
    },
    { 
      value: t('stats.partnerInstitutions.value'), 
      label: t('stats.partnerInstitutions.label'), 
      icon: Award 
    },
    { 
      value: t('stats.emiratesCovered.value'), 
      label: t('stats.emiratesCovered.label'), 
      icon: MapPin 
    }
  ], [t]);

  // Memoized camps to prevent re-computation
  const camps = useMemo(() => [
    {
      title: t('camps.stemInnovation.title'),
      description: t('camps.stemInnovation.description'),
      duration: t('camps.stemInnovation.duration'),
      ageGroup: t('camps.stemInnovation.ageGroup'),
      location: t('camps.stemInnovation.location'),
      price: t('camps.stemInnovation.price')
    },
    {
      title: t('camps.entrepreneurshipBootcamp.title'),
      description: t('camps.entrepreneurshipBootcamp.description'),
      duration: t('camps.entrepreneurshipBootcamp.duration'),
      ageGroup: t('camps.entrepreneurshipBootcamp.ageGroup'),
      location: t('camps.entrepreneurshipBootcamp.location'),
      price: t('camps.entrepreneurshipBootcamp.price')
    },
    {
      title: t('camps.digitalArtsDesign.title'),
      description: t('camps.digitalArtsDesign.description'),
      duration: t('camps.digitalArtsDesign.duration'),
      ageGroup: t('camps.digitalArtsDesign.ageGroup'),
      location: t('camps.digitalArtsDesign.location'),
      price: t('camps.digitalArtsDesign.price')
    }
  ], [t]);

  // Memoized apply handler to prevent re-renders
  const handleApplyClick = useCallback((campIndex: number) => {
    console.log(`Applying for camp: ${camps[campIndex]?.title}`);
    // Application logic would go here
  }, [camps]);

  // Memoized tabs to prevent re-computation
  const tabs = useMemo(() => [
    {
      id: "programs",
      label: t('tabs.programs.label'),
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <ErrorBoundary>
          <Suspense fallback={<TranslationLoadingState />}>
            <MemoizedSummerCampsContent
              stats={stats}
              camps={camps}
              t={t}
              onApplyClick={handleApplyClick}
            />
          </Suspense>
        </ErrorBoundary>
      )
    }
  ], [t, stats, camps, handleApplyClick]);

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
      <ErrorBoundary>
        <EducationPathwayLayout
          title={t('meta.title')}
          description={t('meta.description')}
          icon={<Calendar className="h-12 w-12 text-orange-600" />}
          stats={stats}
          tabs={tabs}
          defaultTab="programs"
          actionButtonText={t('ui.buttons.browseProgramsShort')}
          actionButtonHref="#programs"
          announcements={[
            {
              id: "1",
              title: t('announcements.earlyBird.title'),
              message: t('announcements.earlyBird.message'),
              type: "info",
              date: new Date(),
              urgent: false
            }
          ]}
          academicYear={t('info.academicYear')}
        />
      </ErrorBoundary>
    </div>
  );
};

export default SummerCampsPage;
