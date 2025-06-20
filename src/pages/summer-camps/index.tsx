
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SummerCampsPage: React.FC = () => {
  const { t } = useTranslation('summer-camps');
  const { isRTL, direction } = useLanguage();

  // Dynamic stats from translations
  const stats = [
    { 
      value: t('stats.summerPrograms.value'), 
      label: t('stats.summerPrograms.label'), 
      icon: Calendar 
    },
    { 
      value: t('stats.studentsEnrolled.value'), 
      label: t('stats.studentsEnrolled.label'), 
      icon: Users 
    },
    { 
      value: t('stats.partnerInstitutions.value'), 
      label: t('stats.partnerInstitutions.label'), 
      icon: Award 
    },
    { 
      value: t('stats.emiratesCovered.value'), 
      label: t('stats.emiratesCovered.label'), 
      icon: MapPin 
    }
  ];

  // Dynamic camps from translations
  const camps = [
    {
      title: t('camps.stemInnovation.title'),
      description: t('camps.stemInnovation.description'),
      duration: t('camps.stemInnovation.duration'),
      ageGroup: t('camps.stemInnovation.ageGroup'),
      location: t('camps.stemInnovation.location'),
      price: t('camps.stemInnovation.price')
    },
    {
      title: t('camps.entrepreneurshipBootcamp.title'),
      description: t('camps.entrepreneurshipBootcamp.description'),
      duration: t('camps.entrepreneurshipBootcamp.duration'),
      ageGroup: t('camps.entrepreneurshipBootcamp.ageGroup'),
      location: t('camps.entrepreneurshipBootcamp.location'),
      price: t('camps.entrepreneurshipBootcamp.price')
    },
    {
      title: t('camps.digitalArtsDesign.title'),
      description: t('camps.digitalArtsDesign.description'),
      duration: t('camps.digitalArtsDesign.duration'),
      ageGroup: t('camps.digitalArtsDesign.ageGroup'),
      location: t('camps.digitalArtsDesign.location'),
      price: t('camps.digitalArtsDesign.price')
    }
  ];

  const tabs = [
    {
      id: "programs",
      label: t('tabs.programs.label'),
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp, index) => (
            <Card key={index} className={cn(
              "transition-all duration-300 hover:shadow-lg",
              isRTL && "rtl:text-right"
            )}>
              <CardHeader className={cn(
                isRTL && "rtl:text-right"
              )}>
                <CardTitle className={cn(
                  "text-lg",
                  isRTL && "rtl:text-right rtl:font-arabic"
                )}>{camp.title}</CardTitle>
                <p className={cn(
                  "text-muted-foreground",
                  isRTL && "rtl:text-right rtl:font-arabic rtl:leading-relaxed"
                )}>{camp.description}</p>
              </CardHeader>
              <CardContent className={cn(
                isRTL && "rtl:text-right"
              )}>
                <div className={cn(
                  "space-y-2 mb-4",
                  isRTL && "rtl:space-y-2"
                )}>
                  <div className={cn(
                    "flex justify-between text-sm",
                    isRTL && "rtl:flex-row-reverse rtl:text-right"
                  )}>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{t('info.duration')}:</span>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{camp.duration}</span>
                  </div>
                  <div className={cn(
                    "flex justify-between text-sm",
                    isRTL && "rtl:flex-row-reverse rtl:text-right"
                  )}>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{t('ui.filters.ageGroup')}:</span>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{camp.ageGroup}</span>
                  </div>
                  <div className={cn(
                    "flex justify-between text-sm",
                    isRTL && "rtl:flex-row-reverse rtl:text-right"
                  )}>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{t('ui.filters.location')}:</span>
                    <span className={cn(isRTL && "rtl:font-arabic")}>{camp.location}</span>
                  </div>
                  <div className={cn(
                    "flex justify-between items-center",
                    isRTL && "rtl:flex-row-reverse rtl:text-right"
                  )}>
                    <span className={cn(
                      "text-sm",
                      isRTL && "rtl:font-arabic"
                    )}>{t('info.price')}:</span>
                    <Badge variant="secondary" className={cn(
                      isRTL && "rtl:font-arabic"
                    )}>{camp.price}</Badge>
                  </div>
                </div>
                <Button className={cn(
                  "w-full",
                  isRTL && "rtl:font-arabic"
                )}>{t('ui.buttons.applyNow')}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className={cn(
      "min-h-screen",
      isRTL && "rtl:font-arabic"
    )} dir={direction}>
      <EducationPathwayLayout
        title={t('meta.title')}
        description={t('meta.description')}
        icon={<Calendar className="h-12 w-12 text-orange-600" />}
        stats={stats}
        tabs={tabs}
        defaultTab="programs"
        actionButtonText={t('ui.buttons.browseProgramsShort')}
        actionButtonHref="#programs"
        announcements={[
          {
            id: "1",
            title: t('announcements.earlyBird.title'),
            message: t('announcements.earlyBird.message'),
            type: "info",
            date: new Date(),
            urgent: false
          }
        ]}
        academicYear={t('info.academicYear')}
      />
    </div>
  );
};

export default SummerCampsPage;
