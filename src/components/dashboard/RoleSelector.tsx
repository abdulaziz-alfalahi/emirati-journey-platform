
import React from 'react';
import { UserRole } from '@/types/auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, GraduationCap, Users, Building, Heart, Lightbulb, Crown } from 'lucide-react';

interface RoleSelectorProps {
  availableRoles: UserRole[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

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

const roleIcons: Record<UserRole, React.ComponentType<any>> = {
  school_student: GraduationCap,
  national_service_participant: User,
  university_student: GraduationCap,
  intern: Briefcase,
  full_time_employee: Briefcase,
  part_time_employee: Briefcase,
  gig_worker: Briefcase,
  jobseeker: User,
  lifelong_learner: GraduationCap,
  entrepreneur: Lightbulb,
  retiree: Heart,
  educational_institution: Building,
  parent: Users,
  private_sector_recruiter: Users,
  government_representative: Building,
  retiree_advocate: Heart,
  training_center: Building,
  assessment_center: Building,
  mentor: Users,
  career_advisor: Users,
  platform_operator: Crown,
  administrator: Crown,
  super_user: Crown
};

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  availableRoles, 
  currentRole, 
  onRoleChange 
}) => {
  if (availableRoles.length <= 1) {
    return (
      <Badge variant="secondary" className="flex items-center gap-2">
        {React.createElement(roleIcons[currentRole], { className: "h-4 w-4" })}
        {roleLabels[currentRole]}
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Switch Role:</span>
      <Select value={currentRole} onValueChange={onRoleChange}>
        <SelectTrigger className="w-60">
          <SelectValue>
            <div className="flex items-center gap-2">
              {React.createElement(roleIcons[currentRole], { className: "h-4 w-4" })}
              {roleLabels[currentRole]}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map((role) => {
            const Icon = roleIcons[role];
            return (
              <SelectItem key={role} value={role}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {roleLabels[role]}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
