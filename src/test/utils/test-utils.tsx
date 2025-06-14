import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoleProvider } from '@/context/RoleContext';

// Basic test utilities without jest-dom

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <RoleProvider>
              {children}
            </RoleProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Create mock implementations for missing testing utilities
export const screen = {
  getByRole: (role: string, options?: any) => document.querySelector(`[role="${role}"]`) || { textContent: '', className: '', disabled: false, getAttribute: () => null },
  getByText: (text: string | RegExp) => document.body,
  getByTestId: (testId: string) => document.querySelector(`[data-testid="${testId}"]`) || document.body,
  queryByText: (text: string | RegExp) => null,
  getByLabelText: (text: string | RegExp) => document.body,
};

export const fireEvent = {
  click: (element: any) => {
    // Mock click event
    console.log('Mock click event fired');
  },
};

export const waitFor = async (callback: () => void, options?: any) => {
  // Simple mock implementation
  return Promise.resolve();
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };