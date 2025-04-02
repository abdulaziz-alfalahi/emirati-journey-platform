
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { createInternship } from '@/services/internshipService';
import { Form } from '@/components/ui/form';
import { 
  BasicInfoFields,
  DateFields, 
  CompensationFields, 
  DescriptionFields,
  SkillsAndContactFields 
} from './form/InternshipFormFields';
import { 
  internshipFormSchema, 
  InternshipFormValues, 
  defaultFormValues 
} from './form/InternshipFormSchema';

interface InternshipsCreateProps {
  onSuccess: () => void;
}

export const InternshipsCreate: React.FC<InternshipsCreateProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: defaultFormValues,
  });
  
  const onSubmit = async (values: InternshipFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create an internship listing",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Ensure all required fields are present
      const internshipData = {
        title: values.title,
        company: values.company,
        location: values.location,
        description: values.description,
        industry: values.industry,
        department: values.department,
        start_date: values.start_date?.toISOString(),
        end_date: values.end_date?.toISOString(),
        application_deadline: values.application_deadline.toISOString(),
        is_paid: values.is_paid,
        stipend_amount: values.stipend_amount,
        currency: values.currency,
        requirements: values.requirements,
        skills_required: values.skills_required,
        education_level: values.education_level,
        contact_email: values.contact_email || undefined,
        contact_phone: values.contact_phone,
        website_url: values.website_url || undefined,
        is_active: true,
        created_by: user.id
      };
      
      await createInternship(internshipData);
      
      toast({
        title: "Internship created",
        description: "Your internship listing has been successfully created",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating internship:', error);
      toast({
        title: "Error",
        description: "Failed to create internship listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Post New Internship</DialogTitle>
      </DialogHeader>
      
      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <BasicInfoFields />
            <DateFields />
            <CompensationFields />
            <DescriptionFields />
            <SkillsAndContactFields />
            
            <DialogFooter>
              <Button type="submit">Post Internship</Button>
            </DialogFooter>
          </form>
        </Form>
      </FormProvider>
    </DialogContent>
  );
};
