
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ScholarshipsCreateProps {
  onSuccess: () => void;
}

export const ScholarshipsCreate: React.FC<ScholarshipsCreateProps> = ({ onSuccess }) => {
  const { user, roles } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    provider: '',
    provider_type: '',
    amount: '',
    currency: 'AED',
    application_deadline: '',
    requirements: '',
    contact_email: '',
    contact_phone: '',
    website_url: '',
  });

  const getDefaultProviderType = () => {
    if (roles.includes('government_representative')) return 'government';
    if (roles.includes('educational_institution')) return 'university';
    if (roles.includes('private_sector_recruiter')) return 'private_sector';
    return '';
  };

  React.useEffect(() => {
    const defaultProviderType = getDefaultProviderType();
    if (defaultProviderType) {
      setFormData(prev => ({ ...prev, provider_type: defaultProviderType }));
    }
  }, [roles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'You must be logged in to create a scholarship.',
          variant: 'destructive',
        });
        return;
      }

      // Process requirements as an array
      const requirementsArray = formData.requirements
        .split('\n')
        .map(req => req.trim())
        .filter(req => req !== '');

      const { error } = await supabase
        .from('scholarships')
        .insert({
          title: formData.title,
          description: formData.description,
          provider: formData.provider,
          provider_type: formData.provider_type,
          amount: formData.amount ? parseFloat(formData.amount) : null,
          currency: formData.currency,
          application_deadline: formData.application_deadline || null,
          requirements: requirementsArray.length > 0 ? requirementsArray : null,
          contact_email: formData.contact_email || null,
          contact_phone: formData.contact_phone || null,
          website_url: formData.website_url || null,
          created_by: user.id,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: 'Scholarship Created',
        description: 'Your scholarship has been created successfully.',
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating scholarship:', error);
      toast({
        title: 'Error Creating Scholarship',
        description: 'There was a problem creating your scholarship.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Create New Scholarship</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Scholarship Title *</Label>
            <Input 
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. STEM Excellence Scholarship"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provider">Provider Name *</Label>
            <Input 
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              placeholder="e.g. Ministry of Education"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="provider_type">Provider Type *</Label>
            <Select
              value={formData.provider_type}
              onValueChange={(value) => handleSelectChange('provider_type', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="private_sector">Private Sector</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount"
                name="amount"
                type="number"
                min="0"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleSelectChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AED">AED</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a detailed description of the scholarship, including its purpose and benefits."
            rows={4}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="application_deadline">Application Deadline</Label>
            <Input 
              id="application_deadline"
              name="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL</Label>
            <Input 
              id="website_url"
              name="website_url"
              type="url"
              value={formData.website_url}
              onChange={handleInputChange}
              placeholder="e.g. https://example.com/scholarship"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input 
              id="contact_email"
              name="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={handleInputChange}
              placeholder="e.g. scholarships@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact_phone">Contact Phone</Label>
            <Input 
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              placeholder="e.g. +971 4 123 4567"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="requirements">
            Requirements (Enter each requirement on a new line)
          </Label>
          <Textarea 
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="e.g. Minimum 3.0 GPA&#10;UAE Citizen&#10;Letter of recommendation"
            rows={4}
          />
        </div>
        
        <DialogFooter>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              'Create Scholarship'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
