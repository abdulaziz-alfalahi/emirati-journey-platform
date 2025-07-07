import React, { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

export function AccessibilityToolbar() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');
  const [isTestMode, setIsTestMode] = React.useState(false);
  const [diagnostics, setDiagnostics] = React.useState<string[]>([]);
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'normal',
    language: language
  });

  // Add diagnostic logging
  const addDiagnostic = (message: string) => {
    console.log('🔍 DIAGNOSTIC:', message);
    setDiagnostics(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  React.useEffect(() => {
    addDiagnostic(`AccessibilityToolbar mounted - current language: ${language}`);
    addDiagnostic(`i18n language: ${i18n.language}`);
    addDiagnostic(`Document lang: ${document.documentElement.lang}`);
    addDiagnostic(`Document dir: ${document.documentElement.dir}`);
  }, [language]);

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    addDiagnostic(`🚀 Language change initiated: ${language} → ${newLanguage}`);
    
    try {
      if (typeof setLanguage !== 'function') {
        addDiagnostic('❌ ERROR: setLanguage is not a function');
        return;
      }

      addDiagnostic('✅ setLanguage function exists, calling...');
      await setLanguage(newLanguage);
      
      addDiagnostic(`✅ setLanguage completed`);
      
      // Update local settings
      setSettings(prev => ({ ...prev, language: newLanguage }));
      
      // Check if changes took effect
      setTimeout(() => {
        addDiagnostic(`📊 After change - Context language: ${language}`);
        addDiagnostic(`📊 After change - i18n language: ${i18n.language}`);
        addDiagnostic(`📊 After change - Document lang: ${document.documentElement.lang}`);
        addDiagnostic(`📊 After change - Document dir: ${document.documentElement.dir}`);
      }, 200);
      
    } catch (error) {
      addDiagnostic(`❌ ERROR in language change: ${error}`);
      console.error('Language change error:', error);
    }
  };

  // Simple toggle function
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    addDiagnostic(`🔄 Toggle clicked: ${language} → ${newLanguage}`);
    handleLanguageChange(newLanguage);
  };

  // Test function to bypass everything and directly manipulate DOM
  const forceLanguageChange = (newLanguage: 'en' | 'ar') => {
    addDiagnostic(`🔧 FORCE CHANGE: Directly setting ${newLanguage}`);
    
    // Direct DOM manipulation
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Direct i18n change
    i18n.changeLanguage(newLanguage).then(() => {
      addDiagnostic(`🔧 FORCE CHANGE: i18n changed to ${i18n.language}`);
    }).catch(error => {
      addDiagnostic(`🔧 FORCE CHANGE ERROR: ${error}`);
    });
    
    // Direct localStorage
    try {
      localStorage.setItem('language', newLanguage);
      addDiagnostic(`🔧 FORCE CHANGE: localStorage set to ${newLanguage}`);
    } catch (error) {
      addDiagnostic(`🔧 FORCE CHANGE localStorage ERROR: ${error}`);
    }
    
    // Force page refresh to see changes
    setTimeout(() => {
      addDiagnostic(`🔧 FORCE CHANGE: Refreshing page to apply changes`);
      window.location.reload();
    }, 1000);
  };

  const toggleHighContrast = () => {
    const newValue = !settings.highContrast;
    setSettings(prev => ({ ...prev, highContrast: newValue }));
    
    if (newValue) {
      document.body.style.filter = 'contrast(150%) brightness(1.2)';
    } else {
      document.body.style.filter = '';
    }
  };

  const changeFontSize = (size: string) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
    
    const root = document.documentElement;
    switch (size) {
      case 'large':
        root.style.fontSize = '18px';
        break;
      case 'xlarge':
        root.style.fontSize = '20px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: 'normal',
      language: 'en'
    });
    
    document.body.style.filter = '';
    document.documentElement.style.fontSize = '16px';
    handleLanguageChange('en');
  };

  if (isTestMode) {
    return (
      <div style={{
        position: 'fixed',
        top: '60px',
        right: '20px',
        zIndex: 9999,
        backgroundColor: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        width: '400px',
        maxHeight: '500px',
        overflow: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '14px' }}>
          🔍 Language System Diagnostics
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <strong>Current State:</strong><br/>
          Context Language: {language}<br/>
          i18n Language: {i18n.language}<br/>
          Document Lang: {document.documentElement.lang}<br/>
          Document Dir: {document.documentElement.dir}<br/>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong>Test Actions:</strong><br/>
          <button 
            onClick={toggleLanguage}
            style={{ 
              margin: '2px', 
              padding: '4px 8px', 
              fontSize: '11px', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Normal Toggle ({language === 'en' ? 'to Arabic' : 'to English'})
          </button><br/>
          
          <button 
            onClick={() => forceLanguageChange('ar')}
            style={{ 
              margin: '2px', 
              padding: '4px 8px', 
              fontSize: '11px', 
              backgroundColor: '#dc2626', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Force Arabic (with refresh)
          </button>
          
          <button 
            onClick={() => forceLanguageChange('en')}
            style={{ 
              margin: '2px', 
              padding: '4px 8px', 
              fontSize: '11px', 
              backgroundColor: '#dc2626', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Force English (with refresh)
          </button><br/>
          
          <button 
            onClick={() => setIsTestMode(false)}
            style={{ 
              margin: '2px', 
              padding: '4px 8px', 
              fontSize: '11px', 
              backgroundColor: '#6b7280', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Close Diagnostics
          </button>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong>Diagnostic Log:</strong>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '8px', 
            borderRadius: '4px', 
            maxHeight: '200px', 
            overflow: 'auto',
            fontSize: '10px'
          }}>
            {diagnostics.map((msg, i) => (
              <div key={i} style={{ marginBottom: '2px' }}>{msg}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Main accessibility button */}
      <button
        onClick={() => setIsTestMode(true)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          backgroundColor: '#1B365D',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2c5282';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#1B365D';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        title="Open Accessibility Options"
      >
        ♿ Accessibility
      </button>

      {/* Language indicator */}
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '140px',
        zIndex: 1000,
        backgroundColor: language === 'ar' ? '#10b981' : '#3b82f6',
        color: 'white',
        fontSize: '12px',
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        {language === 'ar' ? 'العربية' : 'English'}
      </div>

      {/* Quick language toggle */}
      <button
        onClick={toggleLanguage}
        style={{
          position: 'fixed',
          top: '16px',
          left: '220px',
          zIndex: 1000,
          backgroundColor: '#B8860B',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 10px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#9a7209';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#B8860B';
        }}
        title={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        {language === 'en' ? 'عربي' : 'EN'}
      </button>
    </div>
  );
}

