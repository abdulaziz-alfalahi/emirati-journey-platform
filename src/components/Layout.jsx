import React from 'react';
import { Menu, X, User, Bell, Search, Globe } from 'lucide-react';
import { UAEButton } from '@/components/ui/uae-button';
import { UAECard } from '@/components/ui/uae-card';
import { Button } from '@/components/ui/button';

const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6">
            {showSidebar && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-uae-gold rounded-full flex items-center justify-center">
                <span className="text-uae-navy font-bold text-sm">EP</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-uae-navy">
                  {language === 'en' ? 'Emirati Pathways' : 'المسارات الإماراتية'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Career Development Platform' : 'منصة تطوير المهن'}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search opportunities...' : 'البحث عن الفرص...'}
                className="input-uae w-full pl-10 pr-4"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-uae-green rounded-full text-xs"></span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            <aside className={`
              fixed md:sticky top-16 z-50 h-[calc(100vh-4rem)] w-64 
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 bg-sidebar border-r
            `}>
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-sidebar-foreground">
                      {language === 'en' ? 'Navigation' : 'التنقل'}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {language === 'en' ? 'Main' : 'الرئيسية'}
                    </h3>
                    <a href="#" className="nav-link-active block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                    </a>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Opportunities' : 'الفرص'}
                    </a>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Profile' : 'الملف الشخصي'}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {language === 'en' ? 'Tools' : 'الأدوات'}
                    </h3>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'AI Assistant' : 'المساعد الذكي'}
                    </a>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Skills Assessment' : 'تقييم المهارات'}
                    </a>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Career Path' : 'المسار المهني'}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {language === 'en' ? 'Support' : 'الدعم'}
                    </h3>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Help Center' : 'مركز المساعدة'}
                    </a>
                    <a href="#" className="nav-link block px-3 py-2 rounded-md">
                      {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
                    </a>
                  </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t">
                  <UAECard variant="default" className="p-3">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-uae-green rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === 'en' ? 'Profile 85% Complete' : 'الملف الشخصي مكتمل 85%'}
                      </p>
                      <UAEButton size="sm" variant="outline" className="w-full text-xs">
                        {language === 'en' ? 'Complete Profile' : 'إكمال الملف'}
                      </UAEButton>
                    </div>
                  </UAECard>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? 'md:ml-0' : ''}`}>
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-uae-navy mb-3">
                {language === 'en' ? 'Emirati Pathways' : 'المسارات الإماراتية'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Empowering UAE nationals with career opportunities and professional development.'
                  : 'تمكين المواطنين الإماراتيين بالفرص المهنية والتطوير المهني.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">
                {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="nav-link">{language === 'en' ? 'About Us' : 'من نحن'}</a></li>
                <li><a href="#" className="nav-link">{language === 'en' ? 'Careers' : 'الوظائف'}</a></li>
                <li><a href="#" className="nav-link">{language === 'en' ? 'Resources' : 'الموارد'}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">
                {language === 'en' ? 'Support' : 'الدعم'}
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="nav-link">{language === 'en' ? 'Help Center' : 'مركز المساعدة'}</a></li>
                <li><a href="#" className="nav-link">{language === 'en' ? 'Contact' : 'اتصل بنا'}</a></li>
                <li><a href="#" className="nav-link">{language === 'en' ? 'Privacy' : 'الخصوصية'}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">
                {language === 'en' ? 'Connect' : 'تواصل معنا'}
              </h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'LinkedIn' : 'لينكد إن'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Twitter' : 'تويتر'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>
              {language === 'en' 
                ? '© 2024 Emirati Pathways Platform. All rights reserved.'
                : '© 2024 منصة المسارات الإماراتية. جميع الحقوق محفوظة.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

