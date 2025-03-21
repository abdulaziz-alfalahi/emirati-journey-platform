
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Role label mapping
  const roleLabels: {[key: string]: string} = {
    school_student: 'School Student',
    national_service_participant: 'National Service Participant', 
    university_student: 'University Student',
    intern: 'Internship Trainee',
    full_time_employee: 'Full-Time Employee',
    part_time_employee: 'Part-Time Employee',
    gig_worker: 'Gig Worker',
    jobseeker: 'Jobseeker',
    lifelong_learner: 'Lifelong Learner',
    entrepreneur: 'Entrepreneur/Business Owner',
    retiree: 'Retiree',
    educational_institution: 'Educational Institution',
    parent: 'Parent',
    private_sector_recruiter: 'Private Sector Recruiter',
    government_representative: 'Government Representative',
    retiree_advocate: 'Retiree Advocate',
    training_center: 'Training Center',
    assessment_center: 'Assessment Center',
    mentor: 'Mentor/Coach',
    career_advisor: 'Career Advisor',
    administrator: 'Platform Administrator',
    super_user: 'Super User'
  };

  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
    
    // Set initial form values
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name as string);
    }
  }, [user, isLoading, navigate]);
  
  // Get initials for avatar
  const getInitials = () => {
    if (!user) return 'U';
    
    if (!user.user_metadata || !user.user_metadata.full_name) {
      return user.email?.substring(0, 2).toUpperCase() || 'U';
    }
    
    const fullName = user.user_metadata.full_name as string;
    const names = fullName.split(' ');
    
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    
    return fullName.substring(0, 2).toUpperCase();
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      
      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Profile update failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-emirati-teal">
              <AvatarFallback className="bg-emirati-teal text-white text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-xl text-center">{fullName || 'Your Name'}</CardTitle>
            <CardDescription className="text-center">{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span 
                      key={role} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emirati-teal/10 text-emirati-teal"
                    >
                      {roleLabels[role] || role}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Created</h3>
                <p className="text-sm">{user ? new Date(user.created_at).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Edit Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Email address cannot be changed.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveProfile} 
              disabled={isSaving || !fullName}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
