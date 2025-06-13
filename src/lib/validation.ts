/**
 * Comprehensive Input Validation and Sanitization Library
 * Provides secure validation schemas and utilities for all user inputs
 */

import { z } from 'zod';

// =================
// BASE VALIDATION SCHEMAS
// =================

// UUID validation
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Email validation with sanitization
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .toLowerCase()
  .trim();

// Phone number validation (international format)
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .transform((val) => val.replace(/\D/g, ''));

// Secure text input with sanitization
export const sanitizedTextSchema = (minLength = 1, maxLength = 500) =>
  z
    .string()
    .min(minLength, `Text must be at least ${minLength} characters`)
    .max(maxLength, `Text cannot exceed ${maxLength} characters`)
    .trim()
    .transform((val) => 
      // Remove potentially dangerous characters but preserve normal punctuation
      val.replace(/[<>{}]/g, '').replace(/\s+/g, ' ')
    );

// Rich text content validation
export const richTextSchema = (maxLength = 10000) =>
  z
    .string()
    .max(maxLength, `Content cannot exceed ${maxLength} characters`)
    .refine((val) => {
      // Basic XSS prevention - reject common script patterns
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /<object/i,
        /<embed/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(val));
    }, 'Content contains potentially unsafe elements');

// URL validation with protocol restriction
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .refine((url) => {
    const allowedProtocols = ['http:', 'https:'];
    try {
      const parsed = new URL(url);
      return allowedProtocols.includes(parsed.protocol);
    } catch {
      return false;
    }
  }, 'Only HTTP and HTTPS URLs are allowed');

// File upload validation
export const fileUploadSchema = z.object({
  filename: z
    .string()
    .min(1, 'Filename is required')
    .max(255, 'Filename too long')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Filename contains invalid characters'),
  size: z
    .number()
    .min(1, 'File size must be greater than 0')
    .max(50 * 1024 * 1024, 'File size cannot exceed 50MB'), // 50MB limit
  mimeType: z
    .string()
    .refine((type) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain'
      ];
      return allowedTypes.includes(type);
    }, 'File type not allowed')
});

// =================
// SCHOLARSHIP APPLICATION SCHEMAS
// =================

export const scholarshipApplicationSchema = z.object({
  scholarshipId: uuidSchema,
  personalStatement: richTextSchema(2000),
  academicRecords: z.array(z.object({
    institution: sanitizedTextSchema(1, 200),
    degree: sanitizedTextSchema(1, 100),
    gpa: z.number().min(0).max(4.0),
    graduationYear: z.number().min(1900).max(new Date().getFullYear() + 10)
  })).max(10, 'Cannot exceed 10 academic records'),
  documents: z.array(fileUploadSchema).max(5, 'Cannot exceed 5 documents'),
  contactInformation: z.object({
    email: emailSchema,
    phone: phoneSchema.optional(),
    address: sanitizedTextSchema(1, 500).optional()
  })
});

// =================
// USER PROFILE SCHEMAS
// =================

export const userProfileSchema = z.object({
  fullName: sanitizedTextSchema(2, 100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: richTextSchema(1000).optional(),
  dateOfBirth: z.date().optional().refine((date) => {
    if (!date) return true;
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 13 && age <= 120;
  }, 'Invalid date of birth'),
  location: sanitizedTextSchema(1, 100).optional(),
  website: urlSchema.optional()
});

// =================
// ASSESSMENT SCHEMAS
// =================

export const assessmentSubmissionSchema = z.object({
  assessmentId: uuidSchema,
  responses: z.array(z.object({
    questionId: uuidSchema,
    answer: z.union([
      sanitizedTextSchema(1, 1000), // Text answers
      z.number(), // Numeric answers
      z.array(z.string()).max(10), // Multiple choice
      z.boolean() // Yes/No questions
    ])
  })).min(1, 'At least one response is required'),
  timeSpent: z.number().min(1, 'Time spent must be positive'),
  metadata: z.record(z.unknown()).optional()
});

// =================
// FINANCIAL DATA SCHEMAS
// =================

export const financialGoalSchema = z.object({
  title: sanitizedTextSchema(1, 100),
  description: sanitizedTextSchema(1, 500).optional(),
  targetAmount: z.number().min(0.01, 'Amount must be positive').max(1000000000, 'Amount too large'),
  currentAmount: z.number().min(0, 'Current amount cannot be negative').max(1000000000, 'Amount too large'),
  deadline: z.date().optional().refine((date) => {
    if (!date) return true;
    return date > new Date();
  }, 'Deadline must be in the future'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['savings', 'investment', 'debt_payoff', 'major_purchase', 'emergency_fund', 'other'])
});

// =================
// API REQUEST SCHEMAS
// =================

export const paginationSchema = z.object({
  page: z.number().int().min(1).max(1000).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: sanitizedTextSchema(1, 50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const searchSchema = z.object({
  query: sanitizedTextSchema(1, 100).optional(),
  filters: z.record(z.unknown()).optional(),
  ...paginationSchema.shape
});

// =================
// VALIDATION UTILITIES
// =================

/**
 * Validates and sanitizes input data against a schema
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map(issue => 
        `${issue.path.join('.')}: ${issue.message}`
      );
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - remove dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
}

/**
 * Rate limiting utility for API endpoints
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
  
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

/**
 * Input sanitization for database operations
 */
export function sanitizeForDatabase(input: unknown): unknown {
  if (typeof input === 'string') {
    // Prevent SQL injection patterns
    return input
      .replace(/['";\\]/g, '') // Remove dangerous characters
      .trim()
      .substring(0, 10000); // Limit length
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeForDatabase);
  }
  
  if (input && typeof input === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      // Sanitize keys to prevent injection
      const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 100);
      if (cleanKey) {
        sanitized[cleanKey] = sanitizeForDatabase(value);
      }
    }
    return sanitized;
  }
  
  return input;
}

/**
 * Audit log entry schema
 */
export const auditLogSchema = z.object({
  userId: uuidSchema.optional(),
  action: z.enum(['create', 'read', 'update', 'delete', 'login', 'logout']),
  resource: sanitizedTextSchema(1, 100),
  resourceId: uuidSchema.optional(),
  details: z.record(z.unknown()).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: sanitizedTextSchema(1, 500).optional(),
  timestamp: z.date().default(() => new Date())
});

export type AuditLogEntry = z.infer<typeof auditLogSchema>;