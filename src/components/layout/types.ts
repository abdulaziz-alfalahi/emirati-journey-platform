import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface NavGroup {
  id: string;
  name: string;
  description: string;
  items: NavItem[];
}