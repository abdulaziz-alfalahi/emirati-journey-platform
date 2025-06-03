
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCard {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface EducationHeroProps {
  title: string;
  description: string;
  stats: StatCard[];
}

export const EducationHero: React.FC<EducationHeroProps> = ({
  title,
  description,
  stats
}) => {
  return (
    <div className="bg-gradient-to-br from-ehrdc-teal to-ehrdc-light-teal rounded-lg p-8 mb-8 text-white">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl opacity-90 mb-6">
          {description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <IconComponent className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">{stat.title}</h3>
                <p className="text-sm opacity-90">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
