
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';
import React from 'react';

// Import components directly instead of using require
import {
  AdminDashboard,
  StudentDashboard,
  EducationalInstitutionDashboard,
  ParentDashboard,
  RecruiterDashboard,
  DefaultDashboard,
  GovRepDashboard,
  EntrepreneurDashboard,
  RetireeDashboard,
  MentorDashboard,
  TrainingCenterDashboard,
  AssessmentCenterDashboard
} from '@/components/dashboard/role-dashboards';

/**
 * Determines which dashboard component to render based on user email or roles
 */
export const getDashboardComponentByUserProfile = (
  user: User | null, 
  roles: UserRole[], 
  activeTab: string
): React.ReactNode => {
  // For testing, if email contains specific keywords, use appropriate dashboard regardless of roles
  if (user?.email) {
    // Check for career advisor emails with both formats (hyphen and underscore)
    if (user.email.includes('career-advisor') || user.email.includes('career_advisor')) {
      console.log("Email-based rendering: MentorDashboard");
      return <MentorDashboard activeTab={activeTab} />;
    }
  
    // Check for assessment center email with both formats (hyphen and underscore)
    if (user.email.includes('assessment-center') || user.email.includes('assessment_center')) {
      console.log("Email-based rendering: AssessmentCenterDashboard");
      return <AssessmentCenterDashboard activeTab={activeTab} />;
    }
    
    // Check for training center email with both formats (hyphen and underscore)
    if (user.email.includes('training-center') || user.email.includes('training_center')) {
      console.log("Email-based rendering: TrainingCenterDashboard");
      return <TrainingCenterDashboard activeTab={activeTab} />;
    }
    
    if (user.email.includes('student')) {
      console.log("Email-based rendering: StudentDashboard");
      return <StudentDashboard activeTab={activeTab} />;
    }
    
    if (user.email.includes('admin')) {
      console.log("Email-based rendering: AdminDashboard");
      return <AdminDashboard activeTab={activeTab} />;
    }
    
    if (user.email.includes('school') || user.email.includes('edu')) {
      console.log("Email-based rendering: EducationalInstitutionDashboard");
      return <EducationalInstitutionDashboard activeTab={activeTab} />;
    }
    
    if (user.email.includes('parent')) {
      console.log("Email-based rendering: ParentDashboard");
      return <ParentDashboard activeTab={activeTab} />;
    }
    
    if (user.email.includes('recruit')) {
      console.log("Email-based rendering: RecruiterDashboard");
      return <RecruiterDashboard activeTab={activeTab} />;
    }
  }

  // Check based on actual roles
  if (roles.includes('administrator') || roles.includes('super_user')) {
    console.log("Rendering AdminDashboard");
    return <AdminDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('school_student')) {
    console.log("Rendering StudentDashboard");
    return <StudentDashboard activeTab={activeTab} />;
  }

  if (roles.includes('educational_institution')) {
    console.log("Rendering EducationalInstitutionDashboard");
    return <EducationalInstitutionDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('parent')) {
    console.log("Rendering ParentDashboard");
    return <ParentDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('private_sector_recruiter')) {
    console.log("Rendering RecruiterDashboard");
    return <RecruiterDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('government_representative')) {
    console.log("Rendering GovRepDashboard");
    return <GovRepDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('entrepreneur')) {
    console.log("Rendering EntrepreneurDashboard");
    return <EntrepreneurDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('retiree') || roles.includes('retiree_advocate')) {
    console.log("Rendering RetireeDashboard");
    return <RetireeDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('mentor') || roles.includes('career_advisor')) {
    console.log("Rendering MentorDashboard based on role");
    return <MentorDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('training_center')) {
    console.log("Rendering TrainingCenterDashboard based on role");
    return <TrainingCenterDashboard activeTab={activeTab} />;
  }
  
  if (roles.includes('assessment_center')) {
    console.log("Rendering AssessmentCenterDashboard based on role");
    return <AssessmentCenterDashboard activeTab={activeTab} />;
  }
  
  // Default dashboard if no role matches
  console.log("Rendering DefaultDashboard with first role:", roles[0] || "no-role");
  if (roles.length > 0) {
    return <DefaultDashboard userRole={roles[0]} activeTab={activeTab} />;
  } else {
    // If email contains assessment-center, assessment_center, training-center, or training_center but no roles assigned,
    // show the appropriate dashboard
    if (user?.email) {
      if (user.email.includes('assessment-center') || user.email.includes('assessment_center')) {
        console.log("Email-based fallback: AssessmentCenterDashboard");
        return <AssessmentCenterDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('training-center') || user.email.includes('training_center')) {
        console.log("Email-based fallback: TrainingCenterDashboard");
        return <TrainingCenterDashboard activeTab={activeTab} />;
      }
      
      if (user.email.includes('career-advisor') || user.email.includes('career_advisor')) {
        console.log("Email-based fallback: MentorDashboard");
        return <MentorDashboard activeTab={activeTab} />;
      }
    }
    
    // Default to student dashboard as a fallback
    return <StudentDashboard activeTab={activeTab} />;
  }
};
