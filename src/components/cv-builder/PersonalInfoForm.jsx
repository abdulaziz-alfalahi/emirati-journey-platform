
import React, { useEffect } from 'react';
import { useCV, Personal } from '@/context/CVContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonal, saveCV, isSaving } = useCV();
  
  const [formData, setFormData] = React.useState<Personal>({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  });

  // Load data from context when component mounts
  useEffect(() => {
    setFormData({
      fullName: cvData.personal.fullName || '',
      jobTitle: cvData.personal.jobTitle || '',
      email: cvData.personal.email || '',
      phone: cvData.personal.phone || '',
      location: cvData.personal.location || '',
      linkedin: cvData.personal.linkedin || '',
      website: cvData.personal.website || ''
    });
    console.log('PersonalInfoForm loaded data:', cvData.personal);
  }, [cvData.personal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = () => {
    updatePersonal(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(formData);
    await saveCV();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            aria-label="Full Name"
          />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Software Engineer"
            aria-label="Job Title"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john.doe@example.com"
            aria-label="Email Address"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 123-4567"
            aria-label="Phone Number"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="San Francisco, CA"
          aria-label="Location"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://linkedin.com/in/johndoe"
            aria-label="LinkedIn Profile URL"
          />
        </div>
        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://johndoe.com"
            aria-label="Personal Website URL"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Save Personal Info
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
