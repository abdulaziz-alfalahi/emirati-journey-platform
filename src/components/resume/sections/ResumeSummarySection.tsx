
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ResumeSummarySectionProps {
  value: string;
  onChange: (value: string) => void;
}

const ResumeSummarySection: React.FC<ResumeSummarySectionProps> = ({ value, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Provide a concise overview of your professional background, key skills, and career goals.
            This is often the first section recruiters read, so make it compelling.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g., Dedicated software engineer with 5+ years of experience developing web applications using React and Node.js. Strong problem-solving skills and a track record of delivering projects on time and within budget."
              className="min-h-[200px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeSummarySection;
