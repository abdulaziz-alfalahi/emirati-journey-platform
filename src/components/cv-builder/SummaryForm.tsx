
import React, { useEffect } from 'react';
import { useCV } from '@/context/CVContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const SummaryForm: React.FC = () => {
  const { cvData, updateSummary, saveCV, isSaving } = useCV();
  const [summary, setSummary] = React.useState('');

  useEffect(() => {
    setSummary(cvData.summary || '');
    console.log('SummaryForm loaded data:', cvData.summary);
  }, [cvData.summary]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleBlur = () => {
    updateSummary(summary);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSummary(summary);
    await saveCV();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <p className="text-sm text-muted-foreground">
          Provide a concise overview of your professional background, key skills, and career goals.
          This is often the first section recruiters read, so make it compelling.
        </p>
        <Textarea
          id="summary"
          value={summary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Dedicated software engineer with 5+ years of experience developing web applications using React and Node.js. Strong problem-solving skills and a track record of delivering projects on time and within budget."
          className="min-h-[200px]"
          aria-label="Professional Summary"
        />
      </div>

      <Button type="submit" disabled={isSaving} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Save Summary
      </Button>
    </form>
  );
};

export default SummaryForm;
