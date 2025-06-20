
import React, { useCallback, useMemo, Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslationLoader } from '@/hooks/useTranslationLoader';
import { useAccessibilityAndSEO } from '@/hooks/useAccessibilityAndSEO';
import { AccessibilityManager } from '@/components/accessibility/AccessibilityManager';
import TranslationLoadingState from '@/components/summer-camps/TranslationLoadingState';
import MemoizedSummerCampsContent from '@/components/summer-camps/MemoizedSummerCampsContent';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const SummerCampsPage: React.FC = () => {
  const { isRTL, direction, language } = useLanguage();
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

  // SEO data with proper translation
  const seoData = useMemo(() => ({
    title: getSafeTranslation('meta.pageTitle'),
    description: getSafeTranslation('meta.description'),
    keywords: language === 'ar' 
      ? 'المخيمات الصيفية، تعليم، إمارات، تطوير المهارات'
      : 'summer camps, education, emirates, skills development',
    canonicalUrl: `https://emiratigateway.gov.ae/summer-camps?lang=${language}`
  }), [getSafeTranslation, language]);

  // Initialize accessibility and SEO enhancements
  const { generateStructuredData } = useAccessibilityAndSEO(seoData, {
    skipLinkTarget: '#main-content',
    mainContentId: 'main-content',
    navigationId: 'navigation'
  });

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
    const campTitle = camps[campIndex]?.title;
    console.log(`Applying for camp: ${campTitle}`);
    
    // Announce action to screen readers
    const announcement = language === 'ar' 
      ? `تم النقر على التقديم للمخيم: ${campTitle}`
      : `Apply button clicked for camp: ${campTitle}`;
    
    // Create temporary live region for announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 3000);
    
    // Application logic would go here
  }, [camps, language]);

  // Error fallback component
  const ErrorFallback = ({ error }: { error?: Error }) => (
    <div className="min-h-screen flex items-center justify-center" role="alert">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {language === 'ar' ? 'حدث خطأ ما' : 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-4" aria-describedby="error-message">
          <span id="error-message">
            {error?.message || (language === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred')}
          </span>
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={language === 'ar' ? 'إعادة تحميل الصفحة' : 'Reload page'}
        >
          {language === 'ar' ? 'إعادة تحميل الصفحة' : 'Reload Page'}
        </button>
      </div>
    </div>
  );

  // Memoized tabs to prevent re-computation
  const tabs = useMemo(() => [
    {
      id: "programs",
      label: getSafeTranslation('tabs.programs.label'),
      icon: <Calendar className="h-4 w-4" aria-hidden="true" />,
      content: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<TranslationLoadingState />}>
            <section aria-labelledby="programs-heading">
              <h2 id="programs-heading" className="sr-only">
                {getSafeTranslation('tabs.programs.title')}
              </h2>
              <MemoizedSummerCampsContent
                stats={stats}
                camps={camps}
                t={getSafeTranslation}
                onApplyClick={handleApplyClick}
              />
            </section>
          </Suspense>
        </ErrorBoundary>
      )
    }
  ], [getSafeTranslation, stats, camps, handleApplyClick, language]);

  // Generate and inject structured data
  React.useEffect(() => {
    const structuredData = generateStructuredData(camps);
    
    let scriptElement = document.querySelector('#structured-data');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'structured-data';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    
    scriptElement.textContent = JSON.stringify(structuredData);
    
    return () => {
      const element = document.querySelector('#structured-data');
      if (element) {
        element.remove();
      }
    };
  }, [camps, generateStructuredData]);

  // Show loading state during initial translation loading
  if (isLoading && loadedLanguages.length === 0) {
    return <TranslationLoadingState />;
  }

  // Show error state if translation loading failed
  if (error && loadedLanguages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="alert">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'ar' ? 'خطأ في الترجمة' : 'Translation Error'}
          </h2>
          <p className="text-gray-600 mb-4" aria-describedby="translation-error">
            <span id="translation-error">{error}</span>
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={language === 'ar' ? 'إعادة المحاولة' : 'Retry loading'}
          >
            {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <AccessibilityManager
      pageTitle={getSafeTranslation('meta.title')}
      pageDescription={getSafeTranslation('meta.description')}
      mainContentId="main-content"
    >
      <div className={cn(
        "min-h-screen",
        isRTL && "rtl:font-arabic"
      )} dir={direction}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <EducationPathwayLayout
            title={getSafeTranslation('meta.title')}
            description={getSafeTranslation('meta.description')}
            icon={<Calendar className="h-12 w-12 text-orange-600" aria-hidden="true" />}
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
    </AccessibilityManager>
  );
};

export default SummerCampsPage;
