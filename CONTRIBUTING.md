# Contributing to Streaming App Base Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this Next.js base template.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm package manager
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/streaming-app.git
   cd streaming-app
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```
5. Run the development server:
   ```bash
   pnpm run dev
   ```

## 🔧 Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines

3. Write or update tests:

   ```bash
   # Run unit tests
   pnpm run test

   # Run E2E tests
   pnpm run test:e2e
   ```

4. Ensure code quality:

   ```bash
   # Lint code
   pnpm run lint

   # Format code
   pnpm run format

   # Type check
   pnpm run build
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Maintenance tasks

Examples:

```
feat: add user profile management
fix: resolve authentication redirect issue
docs: update installation instructions
test: add unit tests for subscription service
```

## 🧪 Testing Guidelines

### Unit Tests

- Use Vitest with React Testing Library
- Write tests for new components and utilities
- Place tests in `src/**/__tests__/*.test.tsx`
- Aim for good test coverage

Example test structure:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Tests

- Use Playwright for end-to-end testing
- Place tests in `e2e/*.spec.ts`
- Test critical user flows
- Mock external services when needed

### Running Tests

```bash
# Unit tests
pnpm run test
pnpm run test:watch
pnpm run test:coverage

# E2E tests
pnpm run test:e2e
pnpm run test:e2e:ui
```

## 📝 Code Style Guidelines

### TypeScript

- Use strict typing with proper interfaces/types
- Prefer `interface` over `type` for object shapes
- Use proper JSDoc comments for functions and components

### React

- Use functional components with hooks
- Prefer custom hooks for reusable logic
- Use proper TypeScript props interfaces

### File Organization

- Use absolute imports with `@/*` alias
- Keep related files in appropriate directories
- Use consistent naming conventions:
  - Components: `PascalCase`
  - Functions/variables: `camelCase`
  - Files: `kebab-case` or `PascalCase` for components

### Styling

- Use Tailwind CSS for styling
- Follow responsive design principles
- Use semantic HTML elements

## 🔒 Security Guidelines

### Environment Variables

- Never commit sensitive data
- Use `.env.local` for local development
- Validate environment variables in `src/utils/stripe/env.ts`

### Authentication

- Use the Data Access Layer pattern
- Implement proper access controls
- Follow security best practices

### Input Validation

- Validate all user inputs
- Sanitize data before processing
- Use proper error handling

## 📚 Documentation

### Code Documentation

- Write clear JSDoc comments
- Document complex logic
- Include usage examples for utilities

### Component Documentation

- Document props and usage
- Include examples when helpful
- Keep README.md updated

## 🚀 Deployment

### CI/CD

- All PRs must pass CI checks
- Tests must pass
- Code must be properly formatted
- Build must succeed

### Production Considerations

- Follow security best practices
- Optimize for performance
- Test in production-like environment

## 🐛 Issue Reporting

### Bug Reports

Include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, browser, etc.)
- Screenshots if applicable

### Feature Requests

Include:

- Clear description of the feature
- Use case and rationale
- Proposed implementation (if any)
- Acceptance criteria

## 📋 Pull Request Process

1. **Fork and Branch**: Create a feature branch from `main`
2. **Implement**: Make your changes with tests
3. **Test**: Ensure all tests pass
4. **Document**: Update documentation if needed
5. **Submit**: Create a pull request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Checklist of changes made

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🏆 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check README.md and code comments

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this template better! 🎉
