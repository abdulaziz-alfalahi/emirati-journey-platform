
import React from 'react';
import { Label } from '@/components/ui/label';
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

  const handleInputChange = (field: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`Updating ${field} to:`, value);
    
    // Use a functional update to ensure we're working with the latest state
    setData(prevData => ({
      ...prevData,
      [field]: value
    }));
    
    // Log the state after update (this will show the previous state due to React's batching)
    console.log("Current state after update request:", data);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting data:", data);
    setSubmittedData(data);
  };

  // For debugging - log whenever the component renders
  console.log("Component rendering with data:", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Info Test Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={handleInputChange('fullName')}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={handleInputChange('email')}
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
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
