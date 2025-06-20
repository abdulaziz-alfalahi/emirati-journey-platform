
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export interface EducationStat {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface EducationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface EducationPageLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: EducationStat[];
  tabs: EducationTab[];
  defaultTab?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaActionLabel?: string;
  ctaActionHref?: string;
}

export const EducationPageLayout: React.FC<EducationPageLayoutProps> = ({
  title,
  description,
  icon,
  stats,
  tabs,
  defaultTab = tabs[0]?.id,
  ctaTitle,
  ctaDescription,
  ctaActionLabel,
  ctaActionHref
}) => {
  const { isRTL } = useLanguage();

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-blue-50 to-white", isRTL && "rtl:font-arabic")}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            {icon}
          </div>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            isRTL && "rtl:font-arabic"
          )}>
            {title}
          </h1>
          <p className={cn(
            "text-xl opacity-90 max-w-3xl mx-auto",
            isRTL && "rtl:font-arabic rtl:leading-relaxed"
          )}>
            {description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className={cn(
                      "text-2xl font-bold text-gray-900 mb-1",
                      isRTL && "rtl:font-arabic"
                    )}>
                      {stat.value}
                    </div>
                    <div className={cn(
                      "text-sm text-gray-600",
                      isRTL && "rtl:font-arabic"
                    )}>
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tabs Section */}
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className={cn(
            "grid w-full",
            `grid-cols-${tabs.length}`
          )}>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex items-center gap-2",
                  isRTL && "rtl:flex-row-reverse rtl:font-arabic"
                )}
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        {ctaTitle && ctaDescription && ctaActionLabel && (
          <section className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className={cn(
                  "text-2xl",
                  isRTL && "rtl:font-arabic rtl:text-right"
                )}>
                  {ctaTitle}
                </CardTitle>
                <p className={cn(
                  "text-muted-foreground",
                  isRTL && "rtl:font-arabic rtl:text-right rtl:leading-relaxed"
                )}>
                  {ctaDescription}
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  size="lg"
                  className={cn(isRTL && "rtl:font-arabic")}
                  onClick={() => {
                    if (ctaActionHref) {
                      window.location.href = ctaActionHref;
                    }
                  }}
                >
                  {ctaActionLabel}
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};
