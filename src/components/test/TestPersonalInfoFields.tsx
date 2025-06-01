
import React from 'react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

const TestPersonalInfoFields = () => {
  const [data, setData] = React.useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: ''
  });
  
  const [submittedData, setSubmittedData] = React.useState<PersonalInfo | null>(null);

  const handleInputChange = (field: keyof PersonalInfo) => (value: string) => {
    console.log(`Updating ${field} to:`, value);
    
    setData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    console.log("Current state after update request:", data);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting data:", data);
    setSubmittedData(data);
  };

  console.log("Component rendering with data:", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Info Test Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Full Name"
            description="Enter your complete name"
            required
          >
            <Input
              value={data.fullName}
              onChange={(e) => handleInputChange('fullName')(e.target.value)}
              placeholder="John Doe"
            />
          </FormField>

          <FormField
            label="Email"
            description="Your email address"
            required
          >
            <Input
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email')(e.target.value)}
              placeholder="john.doe@example.com"
            />
          </FormField>

          <FormField
            label="Phone"
            description="Your contact number"
            required
          >
            <Input
              value={data.phone}
              onChange={(e) => handleInputChange('phone')(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </FormField>
          
          <Button type="submit">Submit</Button>
        </form>
        
        {submittedData && (
          <div className="mt-6 p-4 border rounded-md bg-slate-50">
            <h3 className="font-medium mb-2">Submitted Personal Info:</h3>
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestPersonalInfoFields;
