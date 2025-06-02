
import { useMemo } from 'react';
import {
  LayoutDashboard,
  User,
  FileText,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  BookOpen,
  Monitor,
  CheckSquare,
  Users,
  UserCheck,
  Search,
  Award,
  Shield,
  BarChart3,
  School
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const useNavItems = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Portfolio', href: '/portfolio', icon: FileText },
    { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
    { name: 'Career Journey', href: '/career-journey', icon: MapPin },
    { name: 'Summer Camps', href: '/summer-camps', icon: Calendar },
    { name: 'School Programs', href: '/school-programs', icon: School },
    { name: 'Scholarships', href: '/scholarships', icon: GraduationCap },
    { name: 'Internships', href: '/internships', icon: Briefcase },
    { name: 'Training', href: '/training', icon: BookOpen },
    { name: 'LMS', href: '/lms', icon: Monitor },
    { name: 'Assessments', href: '/assessments', icon: CheckSquare },
    { name: 'Collaborative Assessments', href: '/collaborative-assessments', icon: Users },
    { name: 'Career Advisory', href: '/career-advisory', icon: UserCheck },
    { name: 'Job Matching', href: '/job-matching', icon: Search },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'Mentorship', href: '/mentorship', icon: UserCheck },
    { name: 'Skills Marketplace', href: '/skills-marketplace', icon: Users },
    { name: 'Credentials', href: '/credentials', icon: Award },
    { name: 'Blockchain Credentials', href: '/blockchain-credentials', icon: Shield },
    { name: 'Success Stories', href: '/success-stories', icon: Award },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 }
  ];

  const authenticatedNavItems = useMemo(() => {
    if (!user) {
      return [];
    }

    return navItems;
  }, [user]);

  return authenticatedNavItems;
};

export const useNavGroups = () => {
  const navItems = useNavItems();
  
  return useMemo(() => {
    const groups = [
      {
        id: 'education',
        title: 'Education Pathway',
        items: navItems.filter(item => 
          ['Summer Camps', 'School Programs', 'Scholarships', 'Training', 'LMS'].includes(item.name)
        )
      },
      {
        id: 'career',
        title: 'Career Development', 
        items: navItems.filter(item => 
          ['Career Journey', 'Internships', 'Career Advisory', 'Job Matching'].includes(item.name)
        )
      },
      {
        id: 'skills',
        title: 'Skills & Assessment',
        items: navItems.filter(item => 
          ['Assessments', 'Collaborative Assessments', 'Skills Marketplace', 'Portfolio'].includes(item.name)
        )
      },
      {
        id: 'community',
        title: 'Community & Recognition',
        items: navItems.filter(item => 
          ['Communities', 'Mentorship', 'Success Stories', 'Credentials', 'Blockchain Credentials'].includes(item.name)
        )
      }
    ].filter(group => group.items.length > 0);
    
    return groups;
  }, [navItems]);
};

export default useNavItems;
