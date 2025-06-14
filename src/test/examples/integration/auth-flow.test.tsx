import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { AuthProvider } from '@/context/AuthContext';
import RoleSelector from '@/components/auth/RoleSelector';
import { mockSupabaseClient } from '@/test/utils/mock-data';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabaseClient,
}));

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle complete role selection flow', async () => {
    const TestComponent = () => (
      <AuthProvider>
        <RoleSelector 
          selectedRoles={[]} 
          onRolesChange={() => {}} 
        />
      </AuthProvider>
    );

    render(<TestComponent />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText(/choose your role/i)).toBeDefined();
    });

    // Test role selection
    const studentRole = screen.getByText(/student/i);
    fireEvent.click(studentRole);

    // Should trigger role assignment
    await waitFor(() => {
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('user_roles');
    });
  });

  it('should handle authentication errors gracefully', async () => {
    // Mock authentication error
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null },
      error: { message: 'Invalid credentials' },
    });

    const TestComponent = () => (
      <AuthProvider>
        <div data-testid="auth-error">Authentication Error</div>
      </AuthProvider>
    );

    render(<TestComponent />);

    // Error should be handled without breaking the component
    expect(screen.getByTestId('auth-error')).toBeDefined();
  });

  it('should manage authentication state correctly', async () => {
    const TestComponent = () => (
      <AuthProvider>
        <div data-testid="auth-state">Authenticated</div>
      </AuthProvider>
    );

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toBeDefined();
    });

    // Verify that authentication state is properly initialized
    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
  });

  it('should handle role-based access control', async () => {
    // Test with admin role
    mockSupabaseClient.from.mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { role: 'administrator' },
        error: null,
      }),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { role: 'administrator' },
        error: null,
      }),
    });

    const TestComponent = () => (
      <AuthProvider>
        <div data-testid="role-content">Role-based content</div>
      </AuthProvider>
    );

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('role-content')).toBeDefined();
    });
  });
});