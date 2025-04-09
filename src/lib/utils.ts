
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short'
  };
  
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}
