import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccessibility } from './AccessibilityProvider';
import { 
  Eye, 
  Type, 
  Zap, 
  Volume2, 
  Languages, 
  RotateCcw, 
  Settings,
  X,
  Minus,
  Plus,
  Keyboard
} from 'lucide-react';

export const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleReducedMotion,
    toggleScreenReaderMode,
    toggleLanguage,
    resetSettings,
    isHighContrast,
    fontSize,
    isReducedMotion,
    isScreenReaderMode,
    language,
    isRTL
  } = useAccessibility();

  const toggleToolbar = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleToolbar}
        className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        size="sm"
        data-accessibility-toggle
        aria-label={isRTL ? "فتح شريط أدوات إمكانية الوصول" : "Open accessibility toolbar"}
      >
        <Settings className="h-4 w-4 mr-2" />
        {isRTL ? "إمكانية الوصول" : "Accessibility"}
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 left-4 z-50 shadow-xl border-2 border-blue-200 bg-white">
      <CardContent className="p-4 w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            {isRTL ? "إعدادات إمكانية الوصول" : "Accessibility Settings"}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleToolbar}
            aria-label={isRTL ? "إغلاق شريط الأدوات" : "Close toolbar"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "التباين العالي" : "High Contrast"}
              </span>
            </div>
            <Button
              variant={isHighContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              aria-pressed={isHighContrast}
              aria-label={isRTL ? 
                (isHighContrast ? "إيقاف التباين العالي" : "تفعيل التباين العالي") :
                (isHighContrast ? "Disable high contrast" : "Enable high contrast")
              }
            >
              {isHighContrast ? (isRTL ? "مفعل" : "ON") : (isRTL ? "معطل" : "OFF")}
            </Button>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Type className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "حجم الخط" : "Font Size"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={decreaseFontSize}
                disabled={fontSize === 'normal'}
                aria-label={isRTL ? "تصغير الخط" : "Decrease font size"}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded min-w-[60px] text-center">
                {fontSize === 'normal' ? (isRTL ? "عادي" : "Normal") :
                 fontSize === 'large' ? (isRTL ? "كبير" : "Large") :
                 (isRTL ? "كبير جداً" : "X-Large")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={increaseFontSize}
                disabled={fontSize === 'extra-large'}
                aria-label={isRTL ? "تكبير الخط" : "Increase font size"}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "تقليل الحركة" : "Reduced Motion"}
              </span>
            </div>
            <Button
              variant={isReducedMotion ? "default" : "outline"}
              size="sm"
              onClick={toggleReducedMotion}
              aria-pressed={isReducedMotion}
              aria-label={isRTL ? 
                (isReducedMotion ? "إيقاف تقليل الحركة" : "تفعيل تقليل الحركة") :
                (isReducedMotion ? "Disable reduced motion" : "Enable reduced motion")
              }
            >
              {isReducedMotion ? (isRTL ? "مفعل" : "ON") : (isRTL ? "معطل" : "OFF")}
            </Button>
          </div>

          {/* Screen Reader Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Volume2 className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "وضع قارئ الشاشة" : "Screen Reader"}
              </span>
            </div>
            <Button
              variant={isScreenReaderMode ? "default" : "outline"}
              size="sm"
              onClick={toggleScreenReaderMode}
              aria-pressed={isScreenReaderMode}
              aria-label={isRTL ? 
                (isScreenReaderMode ? "إيقاف وضع قارئ الشاشة" : "تفعيل وضع قارئ الشاشة") :
                (isScreenReaderMode ? "Disable screen reader mode" : "Enable screen reader mode")
              }
            >
              {isScreenReaderMode ? (isRTL ? "مفعل" : "ON") : (isRTL ? "معطل" : "OFF")}
            </Button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Languages className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "اللغة" : "Language"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              aria-label={isRTL ? "تغيير اللغة إلى الإنجليزية" : "Switch to Arabic"}
            >
              {language === 'ar' ? "English" : "العربية"}
            </Button>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="pt-2 border-t">
            <div className="flex items-center mb-2">
              <Keyboard className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">
                {isRTL ? "اختصارات لوحة المفاتيح" : "Keyboard Shortcuts"}
              </span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Alt + M: {isRTL ? "الانتقال للمحتوى الرئيسي" : "Skip to main content"}</div>
              <div>Alt + N: {isRTL ? "الانتقال للتنقل" : "Skip to navigation"}</div>
              <div>Alt + A: {isRTL ? "فتح قائمة إمكانية الوصول" : "Open accessibility menu"}</div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full"
              aria-label={isRTL ? "إعادة تعيين جميع الإعدادات" : "Reset all settings"}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isRTL ? "إعادة تعيين" : "Reset All"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t text-xs text-gray-500 text-center">
          {isRTL ? 
            "للمساعدة في إمكانية الوصول، اتصل بالدعم الفني" :
            "For accessibility help, contact technical support"
          }
        </div>
      </CardContent>
    </Card>
  );
};

