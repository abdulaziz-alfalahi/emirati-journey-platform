
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
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const useNavItems = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Portfolio', href: '/portfolio', icon: FileText },
    { label: 'Resume Builder', href: '/resume-builder', icon: FileText },
    { label: 'Career Journey', href: '/career-journey', icon: MapPin },
    { label: 'Summer Camps', href: '/summer-camps', icon: Calendar },
    { label: 'Scholarships', href: '/scholarships', icon: GraduationCap },
    { label: 'Internships', href: '/internships', icon: Briefcase },
    { label: 'Training', href: '/training', icon: BookOpen },
    { label: 'LMS', href: '/lms', icon: Monitor },
    { label: 'Assessments', href: '/assessments', icon: CheckSquare },
    { label: 'Collaborative Assessments', href: '/collaborative-assessments', icon: Users },
    { label: 'Career Advisory', href: '/career-advisory', icon: UserCheck },
    { label: 'Job Matching', href: '/job-matching', icon: Search },
    { label: 'Mentorship', href: '/mentorship', icon: UserCheck },
    { label: 'Skills Marketplace', href: '/skills-marketplace', icon: Users },
    { label: 'Credentials', href: '/credentials', icon: Award },
    { label: 'Blockchain Credentials', href: '/blockchain-credentials', icon: Shield },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 }
  ];

  const authenticatedNavItems = useMemo(() => {
    if (!user) {
      return [];
    }

    return navItems;
  }, [user]);

  return authenticatedNavItems;
};

export default useNavItems;
