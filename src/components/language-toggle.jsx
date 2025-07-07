import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');
  const [isTestMode, setIsTestMode] = React.useState(false);
  const [diagnostics, setDiagnostics] = React.useState<string[]>([]);

  // Add diagnostic logging
  const addDiagnostic = (message: string) => {
    console.log('🔍 DIAGNOSTIC:', message);
    setDiagnostics(prev => [...prev.slice(-10), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  React.useEffect(() => {
    addDiagnostic(`LanguageToggle mounted - current language: ${language}`);
    addDiagnostic(`i18n language: ${i18n.language}`);
    addDiagnostic(`i18n isInitialized: ${i18n.isInitialized}`);
    addDiagnostic(`Translation test: ${t('accessibility.toggleLanguage')}`);
    addDiagnostic(`Document lang: ${document.documentElement.lang}`);
    addDiagnostic(`Document dir: ${document.documentElement.dir}`);
  }, [language, t]);

  const handleLanguageChange = async (newLanguage: 'en' | 'ar') => {
    addDiagnostic(`🚀 Language change initiated: ${language} → ${newLanguage}`);
    
    try {
      // Test if setLanguage function exists and is callable
      if (typeof setLanguage !== 'function') {
        addDiagnostic('❌ ERROR: setLanguage is not a function');
        return;
      }

      addDiagnostic('✅ setLanguage function exists, calling...');
      await setLanguage(newLanguage);
      
      addDiagnostic(`✅ setLanguage completed`);
      
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
            style={{ margin: '2px', padding: '4px 8px', fontSize: '11px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Normal Toggle ({language === 'en' ? 'to Arabic' : 'to English'})
          </button><br/>
          
          <button 
            onClick={() => forceLanguageChange('ar')}
            style={{ margin: '2px', padding: '4px 8px', fontSize: '11px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Force Arabic (with refresh)
          </button>
          
          <button 
            onClick={() => forceLanguageChange('en')}
            style={{ margin: '2px', padding: '4px 8px', fontSize: '11px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Force English (with refresh)
          </button><br/>
          
          <button 
            onClick={() => setIsTestMode(false)}
            style={{ margin: '2px', padding: '4px 8px', fontSize: '11px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
      {/* Simple button toggle - bypasses dropdown completely */}
      <Button 
        variant="outline" 
        size="icon" 
        className="bg-background"
        onClick={toggleLanguage}
        title={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        <Languages className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle Language</span>
      </Button>
      
      {/* Diagnostic mode toggle */}
      <button
        onClick={() => setIsTestMode(true)}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          fontSize: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Open Language Diagnostics"
      >
        ?
      </button>
      
      {/* Current language indicator */}
      <div style={{
        position: 'absolute',
        bottom: '-6px',
        right: '-6px',
        backgroundColor: language === 'ar' ? '#10b981' : '#3b82f6',
        color: 'white',
        fontSize: '8px',
        padding: '1px 4px',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        {language.toUpperCase()}
      </div>
    </div>
  );
}

