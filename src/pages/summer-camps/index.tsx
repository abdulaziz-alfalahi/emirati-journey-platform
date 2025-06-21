
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useAccessibilityAndSEO } from '@/hooks/useAccessibilityAndSEO';
import { useTranslation } from 'react-i18next';
import { TranslationLoadingState } from '@/components/summer-camps/TranslationLoadingState';

const MemoizedSummerCampsContent = React.lazy(() => 
  import('@/components/summer-camps/MemoizedSummerCampsContent').then(module => ({
    default: module.MemoizedSummerCampsContent
  }))
);

const SummerCampsPage: React.FC = () => {
  const { t, ready } = useTranslation('summer-camps');
  
  const { generateStructuredData } = useAccessibilityAndSEO({
    title: t('meta.pageTitle', 'Summer Camps - Emirati Gateway'),
    description: t('meta.description', 'Engage in exciting educational summer programs designed to inspire learning and personal growth'),
    keywords: 'summer camps, youth programs, education, UAE, skills development',
    canonicalUrl: window.location.href
  });

  if (!ready) {
    return <TranslationLoadingState />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<TranslationLoadingState />}>
        <MemoizedSummerCampsContent />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SummerCampsPage;
