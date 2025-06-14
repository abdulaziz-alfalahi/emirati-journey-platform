import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import { MFAStatusIndicator } from '@/components/auth/mfa/MFAStatusIndicator';
import { MFAStatus } from '@/types/mfa';

describe('MFAStatusIndicator Component', () => {
  const baseMFAStatus: MFAStatus = {
    enabled: false,
    required: false,
    setup_required: false,
    available_methods: ['totp', 'sms'],
    verified_factors: [],
  };

  it('shows setup required status', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      setup_required: true,
    };

    render(<MFAStatusIndicator status={status} />);
    
    expect(screen.getByText('MFA Setup Required')).toBeInTheDocument();
    expect(screen.getByText('Multi-factor authentication must be configured')).toBeInTheDocument();
  });

  it('shows active MFA status with verified factors', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      enabled: true,
      verified_factors: [
        {
          id: '1',
          factor_type: 'totp',
          status: 'verified',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ],
    };

    render(<MFAStatusIndicator status={status} />);
    
    expect(screen.getByText('MFA Active (1 method)')).toBeInTheDocument();
    expect(screen.getByText('Protected with: Authenticator')).toBeInTheDocument();
  });

  it('shows required status when MFA is mandatory', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      required: true,
    };

    render(<MFAStatusIndicator status={status} />);
    
    expect(screen.getByText('MFA Required')).toBeInTheDocument();
    expect(screen.getByText('Your role requires multi-factor authentication')).toBeInTheDocument();
  });

  it('shows grace period information', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      setup_required: true,
      grace_period_remaining: 12,
    };

    render(<MFAStatusIndicator status={status} />);
    
    expect(screen.getByText('Setup Required (12h remaining)')).toBeInTheDocument();
  });

  it('renders without text when showText is false', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      enabled: true,
    };

    render(<MFAStatusIndicator status={status} showText={false} />);
    
    expect(screen.queryByText('MFA Active')).not.toBeInTheDocument();
    // Icon should still be present
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      enabled: true,
    };

    const { rerender } = render(<MFAStatusIndicator status={status} size="sm" />);
    expect(screen.getByText('MFA Optional')).toHaveClass('text-xs');

    rerender(<MFAStatusIndicator status={status} size="lg" />);
    expect(screen.getByText('Additional security available')).toBeInTheDocument();
  });

  it('shows multiple verified factors correctly', () => {
    const status: MFAStatus = {
      ...baseMFAStatus,
      enabled: true,
      verified_factors: [
        {
          id: '1',
          factor_type: 'totp',
          status: 'verified',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '2',
          factor_type: 'phone',
          status: 'verified',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ],
    };

    render(<MFAStatusIndicator status={status} size="lg" />);
    
    expect(screen.getByText('MFA Active (2 methods)')).toBeInTheDocument();
    expect(screen.getByText('Protected with: Authenticator, SMS')).toBeInTheDocument();
  });
});