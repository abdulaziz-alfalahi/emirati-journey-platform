
import { z } from 'zod';
import { UserRole } from '@/types/auth';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email format');
export const emiratesIdSchema = z.string().regex(
  /^\d{3}-\d{4}-\d{7}-\d{1}$/,
  'Emirates ID must be in format: 784-XXXX-XXXXXXX-X'
);
export const phoneSchema = z.string().regex(
  /^[\+]?[1-9][\d]{0,15}$/,
  'Invalid phone number format'
);
export const urlSchema = z.string().url('Invalid URL format');

// Text sanitization utilities
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  // Remove HTML tags and encode HTML entities
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Length validation
export const validateLength = (text: string, min: number, max: number): boolean => {
  return text.length >= min && text.length <= max;
};

// User role validation - using the actual UserRole type to ensure consistency
export const USER_ROLES: readonly UserRole[] = [
  'school_student',
  'national_service_participant', 
  'university_student',
  'intern',
  'full_time_employee',
  'part_time_employee',
  'gig_worker',
  'jobseeker',
  'lifelong_learner',
  'entrepreneur',
  'retiree',
  'educational_institution',
  'parent',
  'private_sector_recruiter',
  'government_representative',
  'retiree_advocate',
  'training_center',
  'assessment_center',
  'mentor',
  'career_advisor',
  'platform_operator',
  'administrator',
  'super_user'
] as const;

export const isValidUserRole = (role: string): role is UserRole => {
  return (USER_ROLES as readonly string[]).includes(role);
};

// Common form validation schemas
export const profileFormSchema = z.object({
  full_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeText),
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .transform(sanitizeText)
    .optional(),
});

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message must be less than 2000 characters')
    .transform(sanitizeText),
});

export const searchSchema = z.object({
  query: z.string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query must be less than 100 characters')
    .transform(sanitizeText),
});
