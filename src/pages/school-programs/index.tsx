import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { BookOpen, Users, Award, Target, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SchoolProgramsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load translation files dynamically
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Load English translations
        const enTranslations = await import('@/locales/en/school-programs.json');
        // Load Arabic translations  
        const arTranslations = await import('@/locales/ar/school-programs.json');

        // Add translations to i18n
        i18n.addResourceBundle('en', 'school-programs', enTranslations.default);
        i18n.addResourceBundle('ar', 'school-programs', arTranslations.default);

        setTranslationsLoaded(true);
      } catch (error) {
        console.error('Failed to load school-programs translations:', error);
        setTranslationsLoaded(true); // Still set to true to show fallback content
      }
    };

    loadTranslations();
  }, [i18n]);

  // Use school-programs namespace after translations are loaded
  const { t: tSchool } = useTranslation(translationsLoaded ? 'school-programs' : undefined);

  // Helper function to get translation with fallback
  const getText = (key: string, fallback: string) => {
    if (!translationsLoaded) return fallback;
    const translation = tSchool(key);
    return translation === key ? fallback : translation;
  };

  // Fallback content (same as before)
  const fallbackContent = {
    en: {
      title: "School Programs",
      description: "Specialized educational programs designed to enhance learning experiences in partnership with schools",
      stats: {
        partnerSchools: { value: "50+", label: "Partner Schools" },
        studentsEnrolled: { value: "5,000+", label: "Students Enrolled" },
        specializedPrograms: { value: "20+", label: "Specialized Programs" },
        successRate: { value: "95%", label: "Success Rate" }
      },
      programs: {
        advancedStem: {
          title: "Advanced STEM Program",
          description: "Accelerated science and mathematics curriculum for gifted students",
          duration: "Full Academic Year",
          ageGroup: "Grades 9-12",
          location: "15 Partner Schools",
          price: "Free"
        },
        leadershipDevelopment: {
          title: "Leadership Development",
          description: "Building tomorrow's leaders through practical leadership experiences",
          duration: "Semester Program",
          ageGroup: "Grades 10-12",
          location: "25 Partner Schools",
          price: "Free"
        },
        innovationLab: {
          title: "Innovation Lab",
          description: "Hands-on technology and engineering projects",
          duration: "Year-round",
          ageGroup: "Grades 6-12",
          location: "30 Partner Schools",
          price: "Free"
        }
      },
      ui: {
        search: { placeholder: "Search school programs..." },
        buttons: { learnMore: "Learn More", browseProgramsShort: "Browse Programs", registerEarly: "Register Early" },
        tabs: {
          programs: { label: "Available Programs" },
          myRegistrations: { label: "My Registrations" },
          resources: { label: "Resources", title: "Program Resources" }
        }
      },
      info: { duration: "Duration", price: "Price", academicYear: "2024-2025" }
    },
    ar: {
      title: "البرامج المدرسية",
      description: "برامج تعليمية متخصصة مصممة لتعزيز تجارب التعلم بالشراكة مع المدارس",
      stats: {
        partnerSchools: { value: "50+", label: "المدارس الشريكة" },
        studentsEnrolled: { value: "5,000+", label: "الطلاب المسجلين" },
        specializedPrograms: { value: "20+", label: "البرامج المتخصصة" },
        successRate: { value: "95%", label: "معدل النجاح" }
      },
      programs: {
        advancedStem: {
          title: "برنامج العلوم والتكنولوجيا المتقدم",
          description: "منهج متسارع في العلوم والرياضيات للطلاب الموهوبين",
          duration: "العام الدراسي الكامل",
          ageGroup: "الصفوف 9-12",
          location: "15 مدرسة شريكة",
          price: "مجاني"
        },
        leadershipDevelopment: {
          title: "تطوير القيادة",
          description: "بناء قادة المستقبل من خلال تجارب القيادة العملية",
          duration: "برنامج فصل دراسي",
          ageGroup: "الصفوف 10-12",
          location: "25 مدرسة شريكة",
          price: "مجاني"
        },
        innovationLab: {
          title: "مختبر الابتكار",
          description: "مشاريع تكنولوجية وهندسية عملية",
          duration: "على مدار السنة",
          ageGroup: "الصفوف 6-12",
          location: "30 مدرسة شريكة",
          price: "مجاني"
        }
      },
      ui: {
        search: { placeholder: "البحث في البرامج المدرسية..." },
        buttons: { learnMore: "اعرف المزيد", browseProgramsShort: "تصفح البرامج", registerEarly: "سجل مبكراً" },
        tabs: {
          programs: { label: "البرامج المتاحة" },
          myRegistrations: { label: "تسجيلاتي" },
          resources: { label: "الموارد", title: "موارد البرامج" }
        }
      },
      info: { duration: "المدة", price: "السعر", academicYear: "2024-2025" }
    }
  };

  // Get current language content with fallback
  const currentLang = i18n.language === 'ar' ? 'ar' : 'en';
  const content = fallbackContent[currentLang];

  const stats = [
    { 
      value: getText('stats.partnerSchools.value', content.stats.partnerSchools.value), 
      label: getText('stats.partnerSchools.label', content.stats.partnerSchools.label), 
      icon: BookOpen 
    },
    { 
      value: getText('stats.studentsEnrolled.value', content.stats.studentsEnrolled.value), 
      label: getText('stats.studentsEnrolled.label', content.stats.studentsEnrolled.label), 
      icon: Users 
    },
    { 
      value: getText('stats.specializedPrograms.value', content.stats.specializedPrograms.value), 
      label: getText('stats.specializedPrograms.label', content.stats.specializedPrograms.label), 
      icon: Award 
    },
    { 
      value: getText('stats.successRate.value', content.stats.successRate.value), 
      label: getText('stats.successRate.label', content.stats.successRate.label), 
      icon: Target 
    }
  ];

  const programs = [
    {
      title: getText('programs.advancedStem.title', content.programs.advancedStem.title),
      description: getText('programs.advancedStem.description', content.programs.advancedStem.description),
      duration: getText('programs.advancedStem.duration', content.programs.advancedStem.duration),
      ageGroup: getText('programs.advancedStem.ageGroup', content.programs.advancedStem.ageGroup),
      location: getText('programs.advancedStem.location', content.programs.advancedStem.location),
      price: getText('programs.advancedStem.price', content.programs.advancedStem.price)
    },
    {
      title: getText('programs.leadershipDevelopment.title', content.programs.leadershipDevelopment.title),
      description: getText('programs.leadershipDevelopment.description', content.programs.leadershipDevelopment.description),
      duration: getText('programs.leadershipDevelopment.duration', content.programs.leadershipDevelopment.duration),
      ageGroup: getText('programs.leadershipDevelopment.ageGroup', content.programs.leadershipDevelopment.ageGroup),
      location: getText('programs.leadershipDevelopment.location', content.programs.leadershipDevelopment.location),
      price: getText('programs.leadershipDevelopment.price', content.programs.leadershipDevelopment.price)
    },
    {
      title: getText('programs.innovationLab.title', content.programs.innovationLab.title),
      description: getText('programs.innovationLab.description', content.programs.innovationLab.description),
      duration: getText('programs.innovationLab.duration', content.programs.innovationLab.duration),
      ageGroup: getText('programs.innovationLab.ageGroup', content.programs.innovationLab.ageGroup),
      location: getText('programs.innovationLab.location', content.programs.innovationLab.location),
      price: getText('programs.innovationLab.price', content.programs.innovationLab.price)
    }
  ];

  const tabs = useMemo(() => [
    {
      id: "available",
      label: getText('tabs.programs.label', content.ui.tabs.programs.label),
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={getText('ui.search.placeholder', content.ui.search.placeholder)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {program.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {program.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>{getText('info.duration', content.info.duration)}:</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target:</span>
                      <span>{program.ageGroup}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Availability:</span>
                      <span>{program.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{getText('info.price', content.info.price)}:</span>
                      <span>{program.price}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    {getText('ui.buttons.learnMore', content.ui.buttons.learnMore)}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "registered",
      label: getText('tabs.myRegistrations.label', content.ui.tabs.myRegistrations.label),
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No registrations found.</p>
        </div>
      )
    },
    {
      id: "managed",
      label: getText('tabs.resources.label', content.ui.tabs.resources.label),
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{getText('tabs.resources.title', content.ui.tabs.resources.title)}</h2>
            <Button>
              {getText('ui.buttons.registerEarly', content.ui.buttons.registerEarly)}
            </Button>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Resources will be available soon.</p>
          </div>
        </div>
      )
    }
  ], [searchQuery, programs, content, getText]);

  return (
    <EducationPathwayLayout
      title={getText('meta.title', content.title)}
      description={getText('meta.description', content.description)}
      icon={<BookOpen className="h-12 w-12 text-green-600" />}
      stats={stats}
      tabs={tabs}
      defaultTab="available"
      actionButtonText={getText('ui.buttons.browseProgramsShort', content.ui.buttons.browseProgramsShort)}
      actionButtonHref="#available"
      academicYear={getText('info.academicYear', content.info.academicYear)}
    />
  );
};

export default SchoolProgramsPage;