
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCard {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface StatCardsProps {
  cards: StatCard[];
}

export const StatCards: React.FC<StatCardsProps> = ({ cards }) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          {cards.map((card, index) => (
            <div key={index} className={`${card.bgColor} p-4 rounded-lg flex items-center`}>
              <card.icon className={`h-10 w-10 ${card.iconColor} mr-4`} />
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
