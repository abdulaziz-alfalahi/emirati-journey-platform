
import React, { useState } from 'react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const roleLabels: Record<UserRole, string> = {
  school_student: 'School Student',
  national_service_participant: 'National Service Participant',
  university_student: 'University Student',
  intern: 'Internship Trainee',
  full_time_employee: 'Full-Time Employee',
  part_time_employee: 'Part-Time Employee',
  gig_worker: 'Gig Worker',
  jobseeker: 'Jobseeker',
  lifelong_learner: 'Lifelong Learner',
  entrepreneur: 'Entrepreneur',
  retiree: 'Retiree',
  educational_institution: 'Educational Institution',
  parent: 'Parent',
  private_sector_recruiter: 'Private Sector Recruiter',
  government_representative: 'Government Representative',
  retiree_advocate: 'Retiree Advocate',
  training_center: 'Training Center',
  assessment_center: 'Assessment Center',
  mentor: 'Mentor',
  career_advisor: 'Career Advisor',
  platform_operator: 'Platform Operator',
  administrator: 'Administrator',
  super_user: 'Super User'
};

const UserMenu: React.FC = () => {
  const { user, roles, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // If no user, show sign in button
  if (!user) {
    return (
      <div>
        <Button onClick={() => navigate('/auth')} variant="outline">
          Sign In
        </Button>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = () => {
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

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-emirati-teal">
            <AvatarFallback className="bg-emirati-teal text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Roles:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {roles.map((role) => (
                <span 
                  key={role} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emirati-teal/10 text-emirati-teal"
                >
                  {roleLabels[role]}
                </span>
              ))}
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="cursor-pointer"
        >
          Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => navigate('/dashboard')}
          className="cursor-pointer"
        >
          Dashboard
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
          disabled={isSigningOut}
        >
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
