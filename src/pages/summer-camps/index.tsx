
import React, { useState, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslationLoader } from '@/hooks/useTranslationLoader';
import { useAccessibilityAndSEO } from '@/hooks/useAccessibilityAndSEO';
import { AccessibilityManager } from '@/components/accessibility/AccessibilityManager';
import { EducationPageLayout } from '@/components/education/EducationPageLayout';
import TranslationLoadingState from '@/components/summer-camps/TranslationLoadingState';
import MemoizedSummerCampsContent from '@/components/summer-camps/MemoizedSummerCampsContent';
import { useLanguage } from '@/context/LanguageContext';
import { Tent, Users, Calendar, Award } from 'lucide-react';

// Error fallback component
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-xl font-bold text-red-800 mb-2">
          {language === 'ar' ? 'حدث خطأ' : 'Something went wrong'}
        </h2>
        <p className="text-red-600 mb-4">
          {language === 'ar' ? 'نعتذر، حدث خطأ في تحميل المحتوى' : 'Sorry, there was an error loading the content'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {language === 'ar' ? 'إعادة تحميل' : 'Reload'}
        </button>
      </div>
    </div>
  );
};

const SummerCampsPage: React.FC = () => {
  const { language } = useLanguage();
  const [appliedCamps, setAppliedCamps] = useState<Set<number>>(new Set());

  // Translation loading with enhanced features
  const { t, isLoading, error } = useTranslationLoader({
    namespace: 'pages',
    preloadLanguages: ['en', 'ar'],
    cacheExpiry: 10 * 60 * 1000 // 10 minutes
  });

  // Handle camp application
  const handleApplyClick = useCallback((campIndex: number) => {
    setAppliedCamps(prev => new Set([...prev, campIndex]));
    console.log(`Applied to camp ${campIndex}`);
  }, []);

  // Memoized data preparation
  const { stats, camps, tabs } = useMemo(() => {
    // Stats data
    const statsData = [
      { value: t('summerCamps.stats.camps.value'), label: t('summerCamps.stats.camps.label'), icon: Tent },
      { value: t('summerCamps.stats.participants.value'), label: t('summerCamps.stats.participants.label'), icon: Users },
      { value: t('summerCamps.stats.programs.value'), label: t('summerCamps.stats.programs.label'), icon: Calendar },
      { value: t('summerCamps.stats.satisfaction.value'), label: t('summerCamps.stats.satisfaction.label'), icon: Award }
    ];

    // Camps data
    const campsData = [
      {
        title: t('summerCamps.camps.techExplorer.title'),
        description: t('summerCamps.camps.techExplorer.description'),
        duration: t('summerCamps.camps.techExplorer.duration'),
        ageGroup: t('summerCamps.camps.techExplorer.ageGroup'),
        location: t('summerCamps.camps.techExplorer.location'),
        price: t('summerCamps.camps.techExplorer.price')
      },
      {
        title: t('summerCamps.camps.scienceAdventure.title'),
        description: t('summerCamps.camps.scienceAdventure.description'),
        duration: t('summerCamps.camps.scienceAdventure.duration'),
        ageGroup: t('summerCamps.camps.scienceAdventure.ageGroup'),
        location: t('summerCamps.camps.scienceAdventure.location'),
        price: t('summerCamps.camps.scienceAdventure.price')
      },
      {
        title: t('summerCamps.camps.artCreativity.title'),
        description: t('summerCamps.camps.artCreativity.description'),
        duration: t('summerCamps.camps.artCreativity.duration'),
        ageGroup: t('summerCamps.camps.artCreativity.ageGroup'),
        location: t('summerCamps.camps.artCreativity.location'),
        price: t('summerCamps.camps.artCreativity.price')
      }
    ];

    // Tabs data
    const tabsData = [
      {
        id: 'available',
        label: t('summerCamps.tabs.available'),
        icon: <Tent className="h-4 w-4" />,
        content: (
          <ErrorBoundary fallback={<ErrorFallback error={new Error('Content error')} />}>
            <MemoizedSummerCampsContent
              stats={statsData}
              camps={campsData}
              t={t}
              onApplyClick={handleApplyClick}
            />
          </ErrorBoundary>
        )
      },
      {
        id: 'registered',
        label: t('summerCamps.tabs.registered'),
        icon: <Users className="h-4 w-4" />,
        content: (
          <ErrorBoundary fallback={<ErrorFallback error={new Error('Content error')} />}>
            <MemoizedSummerCampsContent
              stats={statsData}
              camps={campsData}
              t={t}
              onApplyClick={handleApplyClick}
            />
          </ErrorBoundary>
        )
      },
      {
        id: 'calendar',
        label: t('summerCamps.tabs.calendar'),
        icon: <Calendar className="h-4 w-4" />,
        content: (
          <ErrorBoundary fallback={<ErrorFallback error={new Error('Content error')} />}>
            <MemoizedSummerCampsContent
              stats={statsData}
              camps={campsData}
              t={t}
              onApplyClick={handleApplyClick}
            />
          </ErrorBoundary>
        )
      }
    ];

    return { stats: statsData, camps: campsData, tabs: tabsData };
  }, [t, handleApplyClick]);

  // SEO and accessibility setup
  const { generateStructuredData } = useAccessibilityAndSEO({
    title: t('summerCamps.meta.title'),
    description: t('summerCamps.meta.description'),
    keywords: t('summerCamps.meta.keywords'),
    canonicalUrl: `${window.location.origin}/summer-camps`
  });

  // Handle loading state
  if (isLoading) {
    return <TranslationLoadingState />;
  }

  // Handle error state
  if (error) {
    return <ErrorFallback error={new Error(error)} />;
  }

  // Generate structured data for SEO
  const structuredData = generateStructuredData(camps);

  return (
    <AccessibilityManager
      pageTitle={t('summerCamps.meta.title')}
      pageDescription={t('summerCamps.meta.description')}
      mainContentId="summer-camps-content"
    >
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <ErrorBoundary fallback={<ErrorFallback error={new Error('Component error')} />}>
        <EducationPageLayout
          title={t('summerCamps.hero.title')}
          description={t('summerCamps.hero.description')}
          icon={<Tent className="h-8 w-8" />}
          stats={stats}
          tabs={tabs}
          defaultTab="available"
          ctaTitle={t('summerCamps.cta.title')}
          ctaDescription={t('summerCamps.cta.description')}
          ctaActionLabel={t('summerCamps.cta.actionLabel')}
          ctaActionHref="/summer-camps/register"
        />
      </ErrorBoundary>
    </AccessibilityManager>
  );
};

export default SummerCampsPage;
