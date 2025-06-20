
import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface Camp {
  title: string;
  description: string;
  duration: string;
  ageGroup: string;
  location: string;
  price: string;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface MemoizedSummerCampsContentProps {
  stats: Stat[];
  camps: Camp[];
  t: (key: string) => string;
  onApplyClick: (campIndex: number) => void;
}

const MemoizedSummerCampsContent: React.FC<MemoizedSummerCampsContentProps> = memo(({
  stats,
  camps,
  t,
  onApplyClick
}) => {
  const { isRTL } = useLanguage();

  const memoizedStats = useMemo(() => stats.map((stat, index) => {
    const IconComponent = stat.icon;
    return (
      <Card key={`stat-${index}`} className="text-center">
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
  }), [stats, isRTL]);

  const memoizedCamps = useMemo(() => camps.map((camp, index) => (
    <Card key={`camp-${index}`} className={cn(
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
        <Button 
          className={cn(
            "w-full",
            isRTL && "rtl:font-arabic"
          )}
          onClick={() => onApplyClick(index)}
        >
          {t('ui.buttons.applyNow')}
        </Button>
      </CardContent>
    </Card>
  )), [camps, t, isRTL, onApplyClick]);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {memoizedStats}
      </div>

      {/* Camps Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memoizedCamps}
      </div>
    </>
  );
});

MemoizedSummerCampsContent.displayName = 'MemoizedSummerCampsContent';

export default MemoizedSummerCampsContent;
