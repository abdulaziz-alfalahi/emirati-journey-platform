import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfessionalGrowthLayout, StatItem, TabItem } from '@/components/professional-growth/ProfessionalGrowthLayout';
import { ProfessionalGrowthTabContent } from '@/components/professional-growth/ProfessionalGrowthTabContent';
import { 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Award, 
  Users, 
  TrendingUp, 
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DigitalSkillsDevelopmentPage: React.FC = () => {
  const { t } = useTranslation('digital-skills-development');
  const [selectedSkillTrack, setSelectedSkillTrack] = useState<string | null>(null);

  const stats: StatItem[] = [
    {
      value: t('stats.availableCourses'),
      label: t('stats.availableCoursesLabel'),
      icon: BookOpen
    },
    {
      value: t('stats.certifiedLearners'),
      label: t('stats.certifiedLearnersLabel'),
      icon: Users
    },
    {
      value: t('stats.skillTracks'),
      label: t('stats.skillTracksLabel'),
      icon: TrendingUp
    },
    {
      value: t('stats.completionRate'),
      label: t('stats.completionRateLabel'),
      icon: Award
    }
  ];

  const skillCategories = [
    {
      id: 'programming',
      title: t('skillCategories.programming'),
      icon: <Code className="h-6 w-6" />,
      description: t('skillCategories.programmingDescription'),
      courses: 45,
      level: t('levels.beginner')
    },
    {
      id: 'data-science',
      title: t('skillCategories.dataScience'),
      icon: <Database className="h-6 w-6" />,
      description: t('skillCategories.dataScienceDescription'),
      courses: 32,
      level: t('levels.intermediate')
    },
    {
      id: 'mobile-development',
      title: t('skillCategories.mobileDevelopment'),
      icon: <Smartphone className="h-6 w-6" />,
      description: t('skillCategories.mobileDevelopmentDescription'),
      courses: 28,
      level: t('levels.intermediate')
    },
    {
      id: 'web-development',
      title: t('skillCategories.webDevelopment'),
      icon: <Globe className="h-6 w-6" />,
      description: t('skillCategories.webDevelopmentDescription'),
      courses: 38,
      level: t('levels.beginner')
    }
  ];

  const featuredCourses = [
    {
      id: '1',
      title: t('courses.python.title'),
      description: t('courses.python.description'),
      duration: t('courses.python.duration'),
      level: t('levels.beginner'),
      rating: 4.8,
      students: 1250,
      progress: 0
    },
    {
      id: '2',
      title: t('courses.dataAnalysis.title'),
      description: t('courses.dataAnalysis.description'),
      duration: t('courses.dataAnalysis.duration'),
      level: t('levels.intermediate'),
      rating: 4.9,
      students: 890,
      progress: 0
    },
    {
      id: '3',
      title: t('courses.webDev.title'),
      description: t('courses.webDev.description'),
      duration: t('courses.webDev.duration'),
      level: t('levels.beginner'),
      rating: 4.7,
      students: 2100,
      progress: 0
    }
  ];

  const tabs: TabItem[] = [
    {
      id: "courses",
      label: t('tabs.courses.label'),
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title={t('tabs.courses.title')}
          icon={<BookOpen className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description={t('tabs.courses.description')}
        >
          <div className="space-y-6">
            {/* Skill Categories */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skillCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{category.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {category.courses} {t('common.courses')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {category.level}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('sections.featuredCourses')}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                          <span className="text-muted-foreground">
                            {course.students} {t('common.students')}
                          </span>
                        </div>

                        {course.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{t('common.progress')}</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        )}

                        <Button className="w-full" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          {course.progress > 0 ? t('actions.continue') : t('actions.start')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "skill-tracks",
      label: t('tabs.skillTracks.label'),
      icon: <TrendingUp className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title={t('tabs.skillTracks.title')}
          icon={<TrendingUp className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description={t('tabs.skillTracks.description')}
        >
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('comingSoon.title')}</h3>
            <p className="text-muted-foreground">
              {t('comingSoon.skillTracks')}
            </p>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "certifications",
      label: t('tabs.certifications.label'),
      icon: <Award className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title={t('tabs.certifications.title')}
          icon={<Award className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description={t('tabs.certifications.description')}
        >
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('comingSoon.title')}</h3>
            <p className="text-muted-foreground">
              {t('comingSoon.certifications')}
            </p>
          </div>
        </ProfessionalGrowthTabContent>
      )
    },
    {
      id: "progress",
      label: t('tabs.progress.label'),
      icon: <CheckCircle className="h-4 w-4" />,
      content: (
        <ProfessionalGrowthTabContent
          title={t('tabs.progress.title')}
          icon={<CheckCircle className="h-5 w-5 text-[rgb(var(--pg-secondary))]" />}
          description={t('tabs.progress.description')}
        >
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('signInRequired.title')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('signInRequired.description')}
            </p>
            <Button>
              {t('signInRequired.action')}
            </Button>
          </div>
        </ProfessionalGrowthTabContent>
      )
    }
  ];

  return (
    <ProfessionalGrowthLayout
      title={t('heroTitle')}
      description={t('heroDescription')}
      icon={<Code className="h-12 w-12 text-white" />}
      stats={stats}
      tabs={tabs}
      defaultTab="courses"
    />
  );
};

export default DigitalSkillsDevelopmentPage;

