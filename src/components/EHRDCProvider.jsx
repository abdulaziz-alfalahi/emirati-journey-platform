import React, { createContext, useContext, useState, useEffect } from 'react';

const EHRDCContext = createContext();

export const EHRDCProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    language: 'en', // 'en' | 'ar'
    textDirection: 'ltr', // 'ltr' | 'rtl'
    fontSize: 'normal', // 'small' | 'normal' | 'large'
    highContrast: false,
    reducedMotion: false,
    theme: 'light' // 'light' | 'dark'
  });

  const [user, setUser] = useState({
    name: '',
    role: 'job-seeker', // 'job-seeker' | 'employer' | 'counselor' | 'government'
    isAuthenticated: false,
    emiratiStatus: 'citizen' // 'citizen' | 'resident' | 'visitor'
  });

  const toggleLanguage = () => {
    setPreferences(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'ar' : 'en',
      textDirection: prev.language === 'en' ? 'rtl' : 'ltr'
    }));
  };

  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const updateUser = (newUser) => {
    setUser(prev => ({ ...prev, ...newUser }));
  };

  // Apply preferences to document
  useEffect(() => {
    document.documentElement.dir = preferences.textDirection;
    document.documentElement.lang = preferences.language;
    
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (preferences.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
  }, [preferences]);

  const value = {
    preferences,
    user,
    toggleLanguage,
    toggleTheme,
    updatePreferences,
    updateUser
  };

  return (
    <EHRDCContext.Provider value={value}>
      <div className={`ehrdc-app ${preferences.highContrast ? 'high-contrast' : ''}`}>
        {children}
      </div>
    </EHRDCContext.Provider>
  );
};

export const useEHRDC = () => {
  const context = useContext(EHRDCContext);
  if (!context) {
    throw new Error('useEHRDC must be used within EHRDCProvider');
  }
  return context;
};

// Translation helper
export const translations = {
  en: {
    // Header
    'header.title': 'Emirati Human Resources Development Council',
    'header.subtitle': 'Empowering Emirati Talent',
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobs',
    'nav.profile': 'Profile',
    'nav.applications': 'Applications',
    'nav.ai-assistant': 'AI Assistant',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.export': 'Export',
    'common.import': 'Import',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to EHRDC Platform',
    'dashboard.overview': 'Overview',
    'dashboard.recent-activity': 'Recent Activity',
    'dashboard.quick-actions': 'Quick Actions',
    'dashboard.statistics': 'Statistics',
    
    // Job Seeker
    'jobseeker.profile-completion': 'Profile Completion',
    'jobseeker.job-recommendations': 'Job Recommendations',
    'jobseeker.application-status': 'Application Status',
    'jobseeker.skill-assessment': 'Skill Assessment',
    'jobseeker.career-path': 'Career Path',
    
    // Employer
    'employer.post-job': 'Post Job',
    'employer.manage-jobs': 'Manage Jobs',
    'employer.candidate-pipeline': 'Candidate Pipeline',
    'employer.company-profile': 'Company Profile',
    'employer.analytics': 'Analytics',
    
    // AI Assistant
    'ai.greeting': 'Hello! I\'m your EHRDC AI Career Assistant. How can I help you today?',
    'ai.placeholder': 'Type your message...',
    'ai.send': 'Send',
    'ai.thinking': 'Thinking...',
    'ai.error': 'Sorry, I encountered an error. Please try again.',
    
    // Accessibility
    'a11y.skip-to-content': 'Skip to main content',
    'a11y.toggle-language': 'Toggle language',
    'a11y.toggle-theme': 'Toggle theme',
    'a11y.menu': 'Menu',
    'a11y.close': 'Close',
    'a11y.open': 'Open'
  },
  ar: {
    // Header
    'header.title': 'مجلس تنمية الموارد البشرية الإماراتية',
    'header.subtitle': 'تمكين المواهب الإماراتية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.jobs': 'الوظائف',
    'nav.profile': 'الملف الشخصي',
    'nav.applications': 'الطلبات',
    'nav.ai-assistant': 'المساعد الذكي',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.submit': 'إرسال',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بك في منصة مجلس تنمية الموارد البشرية الإماراتية',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.recent-activity': 'النشاط الأخير',
    'dashboard.quick-actions': 'إجراءات سريعة',
    'dashboard.statistics': 'الإحصائيات',
    
    // Job Seeker
    'jobseeker.profile-completion': 'إكمال الملف الشخصي',
    'jobseeker.job-recommendations': 'توصيات الوظائف',
    'jobseeker.application-status': 'حالة الطلب',
    'jobseeker.skill-assessment': 'تقييم المهارات',
    'jobseeker.career-path': 'المسار المهني',
    
    // Employer
    'employer.post-job': 'نشر وظيفة',
    'employer.manage-jobs': 'إدارة الوظائف',
    'employer.candidate-pipeline': 'قائمة المرشحين',
    'employer.company-profile': 'ملف الشركة',
    'employer.analytics': 'التحليلات',
    
    // AI Assistant
    'ai.greeting': 'مرحباً! أنا مساعدك الذكي للمهن في مجلس تنمية الموارد البشرية الإماراتية. كيف يمكنني مساعدتك اليوم؟',
    'ai.placeholder': 'اكتب رسالتك...',
    'ai.send': 'إرسال',
    'ai.thinking': 'أفكر...',
    'ai.error': 'عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.',
    
    // Accessibility
    'a11y.skip-to-content': 'انتقل إلى المحتوى الرئيسي',
    'a11y.toggle-language': 'تبديل اللغة',
    'a11y.toggle-theme': 'تبديل المظهر',
    'a11y.menu': 'القائمة',
    'a11y.close': 'إغلاق',
    'a11y.open': 'فتح'
  }
};

export const useTranslation = () => {
  const { preferences } = useEHRDC();
  
  const t = (key, fallback = key) => {
    return translations[preferences.language]?.[key] || fallback;
  };
  
  return { t };
};

