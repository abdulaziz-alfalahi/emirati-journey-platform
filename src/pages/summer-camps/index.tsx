
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EducationPathwayLayout } from '@/components/layouts/EducationPathwayLayout';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SummerCampsPage: React.FC = () => {
  const { t } = useTranslation('summer-camps');

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
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{camp.title}</CardTitle>
                <p className="text-muted-foreground">{camp.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{t('info.duration')}:</span>
                    <span>{camp.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('ui.filters.ageGroup')}:</span>
                    <span>{camp.ageGroup}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t('ui.filters.location')}:</span>
                    <span>{camp.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t('info.price')}:</span>
                    <Badge variant="secondary">{camp.price}</Badge>
                  </div>
                </div>
                <Button className="w-full">{t('ui.buttons.applyNow')}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }
  ];

  return (
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
  );
};

export default SummerCampsPage;
