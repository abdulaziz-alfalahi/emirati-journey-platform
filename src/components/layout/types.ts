
import { ReactNode } from 'react';

export interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface NavGroup {
  id: string;
  name: string;
  items: NavItem[];
}
