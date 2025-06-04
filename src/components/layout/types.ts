
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name?: string;
  href?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  group?: 'early' | 'advanced';
  type?: 'separator';
  label?: string;
}

export interface NavGroup {
  id: string;
  name: string;
  items: NavItem[];
}
