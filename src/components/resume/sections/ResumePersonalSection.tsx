
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Personal } from '../types';
import PersonalInfoFields from './PersonalInfoFields';

interface ResumePersonalSectionProps {
  data: Personal;
  onChange: (data: Personal) => void;
}

const ResumePersonalSection: React.FC<ResumePersonalSectionProps> = ({
  data,
  onChange
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <PersonalInfoFields 
          data={data}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

export default ResumePersonalSection;
