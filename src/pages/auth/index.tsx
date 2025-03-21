
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AUTH_TABS = {
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
};

type PersonaOption = {
  value: UserRole;
  label: string;
};

const personaOptions: PersonaOption[] = [
  { value: 'school_student', label: 'School Student' },
  { value: 'national_service_participant', label: 'National Service Participant' },
  { value: 'university_student', label: 'University Student' },
  { value: 'intern', label: 'Internship Trainee' },
  { value: 'full_time_employee', label: 'Full-Time Employee' },
  { value: 'part_time_employee', label: 'Part-Time Employee' },
  { value: 'gig_worker', label: 'Gig Worker' },
  { value: 'jobseeker', label: 'Jobseeker' },
  { value: 'lifelong_learner', label: 'Lifelong Learner' },
  { value: 'entrepreneur', label: 'Entrepreneur/Business Owner' },
  { value: 'retiree', label: 'Retiree' },
  { value: 'educational_institution', label: 'Educational Institution' },
  { value: 'parent', label: 'Parent' },
  { value: 'private_sector_recruiter', label: 'Private Sector Recruiter' },
  { value: 'government_representative', label: 'Government Representative' },
  { value: 'retiree_advocate', label: 'Retiree Advocate' },
  { value: 'training_center', label: 'Training Center' },
  { value: 'assessment_center', label: 'Assessment Center' },
  { value: 'mentor', label: 'Mentor/Coach' },
  { value: 'career_advisor', label: 'Career Advisor' },
  { value: 'administrator', label: 'Platform Administrator' },
  { value: 'super_user', label: 'Super User' },
];

const AuthPage = () => {
  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState(AUTH_TABS.SIGN_IN);
  
  // Sign in form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  
  // Loading states
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSigningIn(true);
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!fullName || !newEmail || !newPassword || !confirmPassword || !selectedRole) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSigningUp(true);
      await signUp(newEmail, newPassword, fullName, selectedRole as UserRole);
      
      // After successful signup, switch to sign in tab
      setActiveTab(AUTH_TABS.SIGN_IN);
      setEmail(newEmail);
      setPassword('');
      
      toast({
        title: "Registration Successful",
        description: "You can now sign in with your credentials",
      });
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsSigningUp(false);
    }
  };
  
  // For quick account creation
  const createTestAccount = async (persona: PersonaOption) => {
    // Use gmail.com domain which is always valid
    const email = `${persona.value.replace(/_/g, '-')}@gmail.com`;
    const password = "journey123!";
    
    try {
      setIsSigningUp(true);
      
      // Check if user already exists
      const { data, error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!checkError && data.user) {
        toast({
          title: "Account exists",
          description: `${persona.label} account already exists. You can sign in.`,
        });
        setEmail(email);
        setPassword(password);
        setActiveTab(AUTH_TABS.SIGN_IN);
        return;
      }
      
      // If the check fails with "Invalid login" we assume the user doesn't exist
      // and try to create it using our edge function
      try {
        const { error } = await supabase.functions.invoke('create-test-account', {
          body: {
            email,
            password,
            fullName: persona.label,
            role: persona.value
          }
        });
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Test Account Created",
          description: `You can now sign in with email: ${email} and password: ${password}`,
        });
        
        // Switch to sign in and pre-fill credentials
        setActiveTab(AUTH_TABS.SIGN_IN);
        setEmail(email);
        setPassword(password);
      } catch (error) {
        console.error('Error creating test account:', error);
        toast({
          title: "Error Creating Test Account",
          description: "Failed to create test account. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Create test account error:', error);
      toast({
        title: "Error",
        description: "Failed to create or find test account",
        variant: "destructive"
      });
    } finally {
      setIsSigningUp(false);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emirati-navy">Emirati Journey</h1>
          <p className="text-gray-600 mt-2">Sign in to access your personal journey</p>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value={AUTH_TABS.SIGN_IN}>Sign In</TabsTrigger>
            <TabsTrigger value={AUTH_TABS.SIGN_UP}>Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value={AUTH_TABS.SIGN_IN}>
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value={AUTH_TABS.SIGN_UP}>
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Your Role</Label>
                    <Select
                      value={selectedRole}
                      onValueChange={(value) => setSelectedRole(value as UserRole)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {personaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-gray-500">Quick Test Accounts</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                {personaOptions.map((persona) => (
                  <Button
                    key={persona.value}
                    variant="outline"
                    size="sm"
                    onClick={() => createTestAccount(persona)}
                    disabled={isSigningUp}
                    className="text-xs h-auto py-1 justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {persona.label}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
