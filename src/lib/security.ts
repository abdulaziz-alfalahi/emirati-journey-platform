/**
 * Comprehensive Security Configuration and Utilities
 * Provides security headers, rate limiting, and protection mechanisms
 */

export interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Content-Type-Options': string;
  'X-Frame-Options': string;
  'X-XSS-Protection': string;
  'Strict-Transport-Security': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
  'X-DNS-Prefetch-Control': string;
}

export interface RateLimitConfig {
  windowMs: number;
  maxAttempts: number;
  blockDurationMs: number;
  progressiveMultiplier?: number;
}

export interface SecurityConfig {
  headers: SecurityHeaders;
  rateLimits: {
    auth: RateLimitConfig;
    api: RateLimitConfig;
    upload: RateLimitConfig;
    sensitive: RateLimitConfig;
  };
  captcha: {
    enabled: boolean;
    threshold: number;
    siteKey?: string;
  };
}

// Production Security Headers Configuration
export const SECURITY_HEADERS: SecurityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.mapbox.com",
    "frame-src 'self' https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()',
    'ambient-light-sensor=()'
  ].join(', '),
  'X-DNS-Prefetch-Control': 'off'
};

// Rate Limiting Configurations
export const RATE_LIMIT_CONFIGS: SecurityConfig['rateLimits'] = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 5,
    blockDurationMs: 30 * 60 * 1000, // 30 minutes
    progressiveMultiplier: 2
  },
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxAttempts: 100,
    blockDurationMs: 5 * 60 * 1000, // 5 minutes
  },
  upload: {
    windowMs: 60 * 1000, // 1 minute
    maxAttempts: 10,
    blockDurationMs: 10 * 60 * 1000, // 10 minutes
  },
  sensitive: {
    windowMs: 60 * 1000, // 1 minute
    maxAttempts: 5,
    blockDurationMs: 60 * 60 * 1000, // 1 hour
    progressiveMultiplier: 3
  }
};

// Advanced Rate Limiter with Progressive Blocking
export class AdvancedRateLimiter {
  private attempts = new Map<string, { count: number; firstAttempt: number; blockUntil?: number }>();
  private suspiciousIPs = new Set<string>();

  constructor(private config: RateLimitConfig) {}

  async checkLimit(identifier: string, clientIP?: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    requiresCaptcha: boolean;
    blockReason?: string;
  }> {
    const now = Date.now();
    const key = `${identifier}:${clientIP || 'unknown'}`;
    
    // Check if IP is blocked
    if (clientIP && this.suspiciousIPs.has(clientIP)) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: now + this.config.blockDurationMs,
        requiresCaptcha: true,
        blockReason: 'Suspicious activity detected'
      };
    }

    let record = this.attempts.get(key);
    
    // Initialize or reset if window expired
    if (!record || now - record.firstAttempt > this.config.windowMs) {
      record = { count: 0, firstAttempt: now };
      this.attempts.set(key, record);
    }

    // Check if currently blocked
    if (record.blockUntil && now < record.blockUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.blockUntil,
        requiresCaptcha: true,
        blockReason: 'Rate limit exceeded'
      };
    }

    // Increment attempt count
    record.count++;

    // Check if limit exceeded
    if (record.count > this.config.maxAttempts) {
      // Progressive blocking
      const multiplier = this.config.progressiveMultiplier || 1;
      const blockDuration = this.config.blockDurationMs * Math.pow(multiplier, Math.floor(record.count / this.config.maxAttempts) - 1);
      
      record.blockUntil = now + blockDuration;
      
      // Mark IP as suspicious after multiple violations
      if (clientIP && record.count > this.config.maxAttempts * 3) {
        this.suspiciousIPs.add(clientIP);
      }

      return {
        allowed: false,
        remaining: 0,
        resetTime: record.blockUntil,
        requiresCaptcha: true,
        blockReason: `Rate limit exceeded. Blocked for ${Math.round(blockDuration / 60000)} minutes`
      };
    }

    return {
      allowed: true,
      remaining: this.config.maxAttempts - record.count,
      resetTime: record.firstAttempt + this.config.windowMs,
      requiresCaptcha: record.count > this.config.maxAttempts * 0.7 // Require CAPTCHA at 70% of limit
    };
  }

  // Reset rate limit for identifier (useful after successful CAPTCHA)
  reset(identifier: string, clientIP?: string): void {
    const key = `${identifier}:${clientIP || 'unknown'}`;
    this.attempts.delete(key);
  }

  // Clean up expired records
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now - record.firstAttempt > this.config.windowMs && (!record.blockUntil || now > record.blockUntil)) {
        this.attempts.delete(key);
      }
    }
  }

  // Get suspicious IPs for monitoring
  getSuspiciousIPs(): string[] {
    return Array.from(this.suspiciousIPs);
  }

  // Clear suspicious IP (admin action)
  clearSuspiciousIP(ip: string): void {
    this.suspiciousIPs.delete(ip);
  }
}

// Security utilities
export class SecurityUtils {
  // Validate and sanitize IP address
  static sanitizeIP(ip: string): string | null {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^[0-9a-fA-F:]+$/;
    
    if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
      return ip;
    }
    return null;
  }

  // Detect suspicious patterns in user input
  static detectSuspiciousInput(input: string): {
    suspicious: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];
    
    // SQL injection patterns
    if (/(\bselect\b|\binsert\b|\bdelete\b|\bdrop\b|\bunion\b)/i.test(input)) {
      reasons.push('Potential SQL injection');
    }

    // XSS patterns
    if (/<script|javascript:|on\w+\s*=/i.test(input)) {
      reasons.push('Potential XSS attempt');
    }

    // Path traversal
    if (/\.\.[\/\\]/.test(input)) {
      reasons.push('Path traversal attempt');
    }

    // Command injection
    if (/[;&|`$(){}]/.test(input)) {
      reasons.push('Potential command injection');
    }

    return {
      suspicious: reasons.length > 0,
      reasons
    };
  }

  // Generate secure random string - FIXED VERSION
  static generateSecureToken(length: number = 32): string {
    // Use crypto.getRandomValues for proper randomization
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const randomArray = new Uint8Array(length);
    
    // Generate cryptographically secure random values
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomArray);
    } else {
      // Fallback for Node.js environment
      const nodeCrypto = require('crypto');
      const randomBytes = nodeCrypto.randomBytes(length);
      for (let i = 0; i < length; i++) {
        randomArray[i] = randomBytes[i];
      }
    }
    
    for (let i = 0; i < length; i++) {
      result += chars[randomArray[i] % chars.length];
    }
    return result;
  }

  // Hash sensitive data for logging
  static hashForLogging(data: string): string {
    return btoa(data).substring(0, 8) + '...';
  }

  // Validate environment security
  static auditEnvironment(): {
    secure: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for development mode in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      // Production checks
      if (!window.location.protocol.startsWith('https')) {
        issues.push('Site not served over HTTPS');
        recommendations.push('Configure HTTPS for production deployment');
      }
    }

    // Check for secure configurations
    if (typeof document !== 'undefined') {
      // Check if CSP is properly set
      const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
      if (metaTags.length === 0) {
        recommendations.push('Consider adding Content Security Policy meta tag');
      }
    }

    return {
      secure: issues.length === 0,
      issues,
      recommendations
    };
  }
}

// Rate limiter instances
export const authRateLimiter = new AdvancedRateLimiter(RATE_LIMIT_CONFIGS.auth);
export const apiRateLimiter = new AdvancedRateLimiter(RATE_LIMIT_CONFIGS.api);
export const uploadRateLimiter = new AdvancedRateLimiter(RATE_LIMIT_CONFIGS.upload);
export const sensitiveRateLimiter = new AdvancedRateLimiter(RATE_LIMIT_CONFIGS.sensitive);

// Cleanup interval (run every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    authRateLimiter.cleanup();
    apiRateLimiter.cleanup();
    uploadRateLimiter.cleanup();
    sensitiveRateLimiter.cleanup();
  }, 5 * 60 * 1000);
}

