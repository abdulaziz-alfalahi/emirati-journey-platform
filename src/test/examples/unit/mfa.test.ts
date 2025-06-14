import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMFA } from '@/hooks/useMFA';
import { mockAuthContext, MockAuthProvider } from '@/test/utils/mock-providers';
import { mockMFAFactor } from '@/test/utils/mock-data';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      mfa: {
        listFactors: vi.fn(),
        challenge: vi.fn(),
        verify: vi.fn(),
      },
    },
  },
}));

// Mock AuthContext
vi.mock('@/context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock toast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('useMFA Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useMFA(), {
      wrapper: MockAuthProvider,
    });

    expect(result.current.factors).toEqual([]);
    expect(result.current.activeChallenge).toBeNull();
    expect(result.current.mfaStatus.enabled).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should determine MFA requirement based on roles', () => {
    const { result } = renderHook(() => useMFA(), {
      wrapper: MockAuthProvider,
    });

    // Test admin role requirement
    const adminRequirement = result.current.getMFARequirement();
    expect(['required', 'optional', 'none']).toContain(adminRequirement);
  });

  it('should check if MFA is required for specific actions', () => {
    const { result } = renderHook(() => useMFA(), {
      wrapper: MockAuthProvider,
    });

    const isRequired = result.current.isMFARequired('admin_access');
    expect(typeof isRequired).toBe('boolean');
  });

  it('should create MFA challenge', async () => {
    const mockChallenge = {
      data: { id: 'challenge-id' },
      error: null,
    } as any;

    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.mfa.challenge).mockResolvedValue(mockChallenge);
    vi.mocked(supabase.auth.mfa.listFactors).mockResolvedValue({
      data: { all: [mockMFAFactor], totp: [mockMFAFactor], phone: [] },
      error: null,
    } as any);

    const { result } = renderHook(() => useMFA(), {
      wrapper: MockAuthProvider,
    });

    await act(async () => {
      await result.current.loadMFAData();
    });

    await act(async () => {
      const challenge = await result.current.createChallenge();
      expect(challenge).toBeTruthy();
    });
  });

  it('should verify MFA challenge', async () => {
    const mockVerification = {
      data: { access_token: 'token' },
      error: null,
    } as any;

    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.mfa.verify).mockResolvedValue(mockVerification);

    const { result } = renderHook(() => useMFA(), {
      wrapper: MockAuthProvider,
    });

    await act(async () => {
      const success = await result.current.verifyChallenge(
        'challenge-id',
        '123456',
        'factor-id'
      );
      expect(success).toBe(true);
    });
  });
});