import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SecurityUtils, AdvancedRateLimiter, RATE_LIMIT_CONFIGS } from '@/lib/security';

describe('SecurityUtils', () => {
  describe('detectSuspiciousInput', () => {
    it('should detect SQL injection patterns', () => {
      const maliciousInput = "'; DROP TABLE users; --";
      const result = SecurityUtils.detectSuspiciousInput(maliciousInput);
      
      expect(result.suspicious).toBe(true);
      expect(result.reasons).toContain('Potential SQL injection');
    });

    it('should detect XSS patterns', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const result = SecurityUtils.detectSuspiciousInput(maliciousInput);
      
      expect(result.suspicious).toBe(true);
      expect(result.reasons).toContain('Potential XSS attempt');
    });

    it('should detect path traversal patterns', () => {
      const maliciousInput = '../../../etc/passwd';
      const result = SecurityUtils.detectSuspiciousInput(maliciousInput);
      
      expect(result.suspicious).toBe(true);
      expect(result.reasons).toContain('Path traversal attempt');
    });

    it('should allow safe input', () => {
      const safeInput = 'Hello, this is a normal message!';
      const result = SecurityUtils.detectSuspiciousInput(safeInput);
      
      expect(result.suspicious).toBe(false);
      expect(result.reasons).toHaveLength(0);
    });
  });

  describe('generateSecureToken', () => {
    it('should generate token of specified length', () => {
      const token = SecurityUtils.generateSecureToken(16);
      expect(token).toHaveLength(16);
    });

    it('should generate different tokens on multiple calls', () => {
      const token1 = SecurityUtils.generateSecureToken();
      const token2 = SecurityUtils.generateSecureToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('hashForLogging', () => {
    it('should hash sensitive data for logging', () => {
      const sensitiveData = 'user@example.com';
      const hashed = SecurityUtils.hashForLogging(sensitiveData);
      
      expect(hashed).not.toBe(sensitiveData);
      expect(hashed).toContain('...');
      expect(hashed.length).toBeLessThan(sensitiveData.length);
    });
  });
});

describe('AdvancedRateLimiter', () => {
  let rateLimiter: AdvancedRateLimiter;

  beforeEach(() => {
    rateLimiter = new AdvancedRateLimiter(RATE_LIMIT_CONFIGS.auth);
  });

  it('should allow requests within limit', async () => {
    const result = await rateLimiter.checkLimit('test-user', '127.0.0.1');
    
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4); // 5 - 1
    expect(result.requiresCaptcha).toBe(false);
  });

  it('should block requests after limit exceeded', async () => {
    const identifier = 'test-user-blocked';
    const clientIP = '127.0.0.1';
    
    // Exhaust the limit
    for (let i = 0; i < 6; i++) {
      await rateLimiter.checkLimit(identifier, clientIP);
    }
    
    const result = await rateLimiter.checkLimit(identifier, clientIP);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should require CAPTCHA near limit threshold', async () => {
    const identifier = 'test-user-captcha';
    const clientIP = '127.0.0.1';
    
    // Get close to limit (70% threshold)
    for (let i = 0; i < 4; i++) {
      await rateLimiter.checkLimit(identifier, clientIP);
    }
    
    const result = await rateLimiter.checkLimit(identifier, clientIP);
    expect(result.requiresCaptcha).toBe(true);
  });

  it('should reset rate limit for identifier', async () => {
    const identifier = 'test-user-reset';
    const clientIP = '127.0.0.1';
    
    // Make some requests
    await rateLimiter.checkLimit(identifier, clientIP);
    await rateLimiter.checkLimit(identifier, clientIP);
    
    // Reset
    rateLimiter.reset(identifier, clientIP);
    
    // Should be back to full limit
    const result = await rateLimiter.checkLimit(identifier, clientIP);
    expect(result.remaining).toBe(4);
  });
});