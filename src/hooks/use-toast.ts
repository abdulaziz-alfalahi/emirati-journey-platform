
import { useState } from 'react';
import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastState {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const toast = ({ title, description, variant = 'default' }: ToastProps) => {
  if (variant === 'destructive') {
    sonnerToast.error(title, { description });
  } else {
    sonnerToast.success(title, { description });
  }
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  return { 
    toast,
    toasts
  };
};
