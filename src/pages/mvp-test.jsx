import React, { useState } from 'react';
import { DDSButton } from '@/components/dds/DDSButton';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Settings, Zap, Eye, Type } from 'lucide-react';

const MVPTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const { handleError, handleAsyncError, isLoading } = useErrorHandler();
  const { 
    isHighContrast, 
    fontSize, 
    isReducedMotion, 
    language, 
    toggleHighContrast,
    increaseFontSize,
    toggleLanguage 
  } = useAccessibility();

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result]);
  };

  const testErrorHandling = () => {
    try {
      throw new Error('Test error for MVP demonstration');
    } catch (error) {
      handleError(error, {
        description: 'This is a test error to demonstrate error handling',
        severity: 'warning'
      });
      addTestResult('✅ Error handling test completed');
    }
  };

  const testAsyncError = async () => {
    try {
      await handleAsyncError(
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Async test error')), 1000)
        ),
        {
          description: 'Testing async error handling',
          operation: 'async test'
        }
      );
    } catch (error) {
      addTestResult('✅ Async error handling test completed');
    }
  };

  const testAccessibilityFeatures = () => {
    addTestResult(`✅ Accessibility test - High Contrast: ${isHighContrast ? 'ON' : 'OFF'}`);
    addTestResult(`✅ Accessibility test - Font Size: ${fontSize}`);
    addTestResult(`✅ Accessibility test - Reduced Motion: ${isReducedMotion ? 'ON' : 'OFF'}`);
    addTestResult(`✅ Accessibility test - Language: ${language}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {language === 'ar' ? 'اختبار تحسينات اليوم الأول' : 'Day 1 MVP Enhancements Test'}
          </h1>
          <p className="text-blue-100">
            {language === 'ar' 
              ? 'اختبار معالجة الأخطاء وإمكانية الوصول ونظام التصميم الحكومي'
              : 'Testing Error Handling, Accessibility, and Dubai Design System'
            }
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Handling Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              {language === 'ar' ? 'اختبار معالجة الأخطاء' : 'Error Handling Tests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DDSButton 
              onClick={testErrorHandling}
              variant="danger"
              className="w-full"
            >
              {language === 'ar' ? 'اختبار معالجة الأخطاء' : 'Test Error Handling'}
            </DDSButton>
            
            <DDSButton 
              onClick={testAsyncError}
              variant="warning"
              loading={isLoading}
              className="w-full"
            >
              {language === 'ar' ? 'اختبار الأخطاء غير المتزامنة' : 'Test Async Error'}
            </DDSButton>

            <div className="text-sm text-gray-600">
              {language === 'ar' 
                ? 'انقر على الأزرار أعلاه لاختبار نظام معالجة الأخطاء المحسن'
                : 'Click the buttons above to test the enhanced error handling system'
              }
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-500" />
              {language === 'ar' ? 'اختبار إمكانية الوصول' : 'Accessibility Tests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DDSButton 
              onClick={toggleHighContrast}
              variant={isHighContrast ? "primary" : "outline"}
              icon={<Eye className="h-4 w-4" />}
              className="w-full"
            >
              {language === 'ar' ? 'تبديل التباين العالي' : 'Toggle High Contrast'}
            </DDSButton>
            
            <DDSButton 
              onClick={increaseFontSize}
              variant="secondary"
              icon={<Type className="h-4 w-4" />}
              className="w-full"
            >
              {language === 'ar' ? 'زيادة حجم الخط' : 'Increase Font Size'}
            </DDSButton>

            <DDSButton 
              onClick={toggleLanguage}
              variant="outline"
              className="w-full"
            >
              {language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            </DDSButton>

            <DDSButton 
              onClick={testAccessibilityFeatures}
              variant="success"
              className="w-full"
            >
              {language === 'ar' ? 'اختبار الميزات' : 'Test Features'}
            </DDSButton>
          </CardContent>
        </Card>

        {/* Dubai Design System Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              {language === 'ar' ? 'نظام التصميم الحكومي' : 'Dubai Design System'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <DDSButton variant="primary" size="small">Primary</DDSButton>
              <DDSButton variant="secondary" size="small">Secondary</DDSButton>
              <DDSButton variant="success" size="small">Success</DDSButton>
              <DDSButton variant="warning" size="small">Warning</DDSButton>
              <DDSButton variant="danger" size="small">Danger</DDSButton>
              <DDSButton variant="outline" size="small">Outline</DDSButton>
            </div>
            
            <div className="text-sm text-gray-600">
              {language === 'ar' 
                ? 'أزرار متوافقة مع معايير الحكومة الإماراتية'
                : 'UAE Government compliant button components'
              }
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              {language === 'ar' ? 'نتائج الاختبار' : 'Test Results'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  {language === 'ar' 
                    ? 'لا توجد نتائج اختبار بعد. ابدأ الاختبار!'
                    : 'No test results yet. Start testing!'
                  }
                </p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="text-sm bg-green-50 text-green-800 p-2 rounded">
                    {result}
                  </div>
                ))
              )}
            </div>
            
            {testResults.length > 0 && (
              <DDSButton 
                onClick={() => setTestResults([])}
                variant="outline"
                size="small"
                className="mt-4 w-full"
              >
                {language === 'ar' ? 'مسح النتائج' : 'Clear Results'}
              </DDSButton>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-8 text-center text-gray-600">
        <p className="text-sm">
          {language === 'ar' 
            ? 'تم تطوير هذه الصفحة لاختبار تحسينات اليوم الأول من خطة MVP'
            : 'This page was created to test Day 1 MVP enhancements'
          }
        </p>
        <p className="text-xs mt-2">
          {language === 'ar' 
            ? 'استخدم شريط أدوات إمكانية الوصول في الزاوية العلوية اليسرى للمزيد من الخيارات'
            : 'Use the accessibility toolbar in the top-left corner for more options'
          }
        </p>
      </div>
    </div>
  );
};

export default MVPTestPage;

