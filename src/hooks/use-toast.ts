
import { useState } from 'react';
import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
}

interface ToastState {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: React.ReactNode;
}

export const toast = ({ title, description, variant = 'default', duration }: ToastProps) => {
  if (variant === 'destructive') {
    sonnerToast.error(title, { description, duration });
  } else {
    sonnerToast.success(title, { description, duration });
  }
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  return { 
    toast,
    toasts
  };
};
