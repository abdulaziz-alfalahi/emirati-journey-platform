# Testing Framework Documentation

This directory contains the comprehensive testing framework for the application, including unit tests, component tests, integration tests, and end-to-end tests.

## Framework Setup

### Testing Tools
- **Vitest**: Fast unit test runner with native TypeScript support
- **React Testing Library**: Component testing with accessibility focus
- **Playwright**: End-to-end testing across multiple browsers
- **Jest DOM**: Custom matchers for DOM assertions

### Configuration Files
- `vitest.config.ts`: Vitest configuration
- `playwright.config.ts`: Playwright configuration
- `src/test/setup.ts`: Global test setup and mocks

## Directory Structure

```
src/test/
├── utils/              # Testing utilities and helpers
│   ├── test-utils.tsx     # Custom render function with providers
│   ├── mock-data.ts       # Mock data for tests
│   ├── mock-providers.tsx # Mock context providers
│   └── custom-matchers.ts # Custom testing matchers
├── examples/           # Example tests demonstrating patterns
│   ├── unit/              # Unit test examples
│   ├── component/         # Component test examples
│   └── integration/       # Integration test examples
├── types/              # TypeScript definitions for tests
└── README.md          # This file

e2e/                   # End-to-end tests
├── example.spec.ts       # Example E2E tests
└── ...                   # Additional E2E test files
```

## Running Tests

### Unit and Component Tests
```bash
npm run test                # Run tests once
npm run test:watch         # Run tests in watch mode
npm run test:ui            # Run tests with UI
npm run test:coverage      # Run tests with coverage report
```

### End-to-End Tests
```bash
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Run E2E tests with UI
npm run test:e2e:debug     # Run E2E tests in debug mode
npm run playwright:install # Install Playwright browsers
```

## Testing Patterns

### Unit Tests
- Test individual functions and utilities
- Focus on business logic and data transformations
- Mock external dependencies
- Example: `src/test/examples/unit/security.test.ts`

### Component Tests
- Test component rendering and user interactions
- Verify accessibility and proper ARIA attributes
- Test different props and states
- Example: `src/test/examples/component/button.test.tsx`

### Integration Tests
- Test component interactions with contexts and services
- Verify data flow between components
- Test authentication and authorization flows
- Example: `src/test/examples/integration/auth-flow.test.tsx`

### End-to-End Tests
- Test complete user journeys
- Verify critical application workflows
- Test across different browsers and devices
- Example: `e2e/example.spec.ts`

## Testing Utilities

### Custom Render Function
```typescript
import { render } from '@/test/utils/test-utils';

// Automatically wraps components with necessary providers
render(<YourComponent />);
```

### Mock Data
```typescript
import { mockUser, mockMFAStatus } from '@/test/utils/mock-data';

// Use predefined mock objects in tests
```

### Custom Matchers
```typescript
import '@/test/utils/custom-matchers';

// Use custom accessibility matchers
expect(element).toHaveAccessibleName('Submit');
expect(element).toBeVisuallyHidden();
```

## Best Practices

### Accessibility Testing
- Always test keyboard navigation
- Verify ARIA attributes and roles
- Test screen reader compatibility
- Use semantic HTML elements

### Component Testing
- Test user interactions, not implementation details
- Use accessible queries (getByRole, getByLabelText)
- Test error states and edge cases
- Verify loading states

### Mock Management
- Keep mocks minimal and focused
- Reset mocks between tests
- Use factory functions for complex mock data
- Mock at the boundary level (API calls, not internal functions)

### Performance Testing
- Test component render times
- Verify memory leaks in complex interactions
- Test with large datasets
- Monitor bundle size impact

## Security Testing
- Test input validation and sanitization
- Verify authentication and authorization
- Test rate limiting and security headers
- Validate MFA flows and security measures

## Continuous Integration
- All tests must pass before merging
- Coverage threshold: 80% minimum
- E2E tests run on multiple browsers
- Performance regression testing