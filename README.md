# Next.js SaaS Template

A production-ready Next.js 15 application template with Supabase authentication, Stripe subscriptions, comprehensive testing, and developer tools.

## 🚀 Features

### Core Stack

- **Next.js 15** with App Router and React 19
- **Supabase** for authentication and database
- **Stripe** for payments and subscriptions
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Developer Experience

- **Comprehensive testing** with Vitest and Playwright
- **Code quality** with ESLint, Prettier, and Husky
- **Performance monitoring** with Web Vitals tracking
- **Error boundaries** and structured logging
- **VS Code** configuration with recommended extensions
- **CI/CD** with GitHub Actions

### Production Ready

- **Security headers** (CSP, HSTS, X-Frame-Options)
- **Environment validation** with helpful error messages
- **Performance optimizations** and bundle analysis
- **Error handling** and monitoring
- **Feature-based access control**

## 📋 Prerequisites

- **Node.js 18+** (recommended: 20+)
- **pnpm** (recommended package manager)
- **Supabase account** and project
- **Stripe account** for payments

## 🛠 Quick Start

### 1. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Setup

Run the SQL migrations in your Supabase project:

```bash
npx supabase db push
```

Or manually execute the SQL in `supabase/migrations/20250429_initial_schema.sql`.

### 3. Installation

```bash
pnpm install
```

### 4. Development

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

### Development

```bash
pnpm run dev          # Start development server with Turbopack
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run format       # Format code with Prettier
pnpm run format:check # Check code formatting
```

### Testing

```bash
pnpm run test         # Run unit tests
pnpm run test:watch   # Run tests in watch mode
pnpm run test:ui      # Run tests with UI
pnpm run test:coverage # Run tests with coverage
pnpm run test:e2e     # Run E2E tests
pnpm run test:e2e:ui  # Run E2E tests with UI
```

### Analysis

```bash
pnpm run analyze      # Analyze bundle size
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (marketing-pages)/ # Marketing pages
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   ├── admin/            # Admin components
│   └── pricing/          # Pricing components
├── utils/                # Utilities
│   ├── auth/             # Authentication utilities
│   ├── hooks/            # Custom hooks
│   ├── providers/        # Context providers
│   ├── stripe/           # Stripe utilities
│   ├── supabase/         # Supabase utilities
│   ├── monitoring/       # Logging and monitoring
│   └── security/         # Security utilities
├── config/               # Configuration files
└── test/                 # Test utilities
```

## 🔐 Authentication & Authorization

### Supabase Authentication

- User registration and login
- Email verification
- Password reset
- Row Level Security (RLS) policies

### Feature Access Control

Use the `FeatureGuard` component for UI-level access control:

```tsx
<FeatureGuard feature="ai_generation">
  <AIGenerationButton />
</FeatureGuard>
```

Use the `useFeature` hook for programmatic access checks:

```tsx
const { hasAccess } = useFeature('ai_generation');

if (!hasAccess) {
  return <UpgradePrompt />;
}
```

## 💳 Subscription System

### Plans Configuration

Plans are defined in `src/config/plans.json`:

```json
{
  "free": {
    "name": "Free",
    "price": 0,
    "features": {
      "projects": 3,
      "ai_generation": false
    }
  },
  "pro": {
    "name": "Pro",
    "price": 19,
    "features": {
      "projects": 20,
      "ai_generation": true
    }
  }
}
```

### Stripe Integration

- Automatic plan synchronization with Stripe
- Webhook handling for subscription events
- Customer portal for subscription management

### Webhook Setup

For local development:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Required webhook events:

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## 🧪 Testing

### Unit Testing (Vitest)

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

### E2E Testing (Playwright)

```bash
# Run E2E tests
pnpm run test:e2e

# Run E2E tests with UI
pnpm run test:e2e:ui
```

### Writing Tests

- Unit tests: `src/**/__tests__/*.test.tsx`
- E2E tests: `e2e/*.spec.ts`

Example unit test:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

## 📊 Performance & Monitoring

### Performance Monitoring

- Web Vitals tracking (LCP, FID, CLS)
- Bundle size analysis
- React component render tracking

### Error Handling

- Error boundaries for React errors
- Structured logging system
- Performance tracking

### Bundle Analysis

```bash
pnpm run analyze
```

## 🔧 Development Tools

### Code Quality

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

### VS Code Integration

- Recommended extensions in `.vscode/extensions.json`
- Workspace settings in `.vscode/settings.json`
- Debug configurations in `.vscode/launch.json`

### Git Hooks

Pre-commit hooks automatically:

- Run ESLint with auto-fix
- Format code with Prettier
- Run type checking

## 🚀 Deployment

### CI/CD Pipeline

GitHub Actions workflows:

- **CI**: Tests, linting, and builds on every PR
- **Deploy**: Automated deployment on main branch

### Environment Variables

Required in production:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_APP_URL
```

### Deployment Platforms

- **Vercel** (recommended)
- **Netlify**
- **Docker** with `output: 'standalone'`

## 📚 Key Concepts

### Data Access Layer

Centralized authentication checks in `src/utils/auth/dal.ts` for security.

### Feature System

- Plans defined in JSON configuration
- Feature access controlled at multiple levels
- Automatic upgrade prompts

### Performance

- React 19 optimizations
- Image optimization
- Bundle splitting
- Query optimization

### Security

- Security headers (CSP, HSTS, etc.)
- Environment validation
- Input sanitization
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm run test`
5. Submit a pull request

### Development Workflow

```bash
# Start development
pnpm run dev

# Run tests
pnpm run test:watch

# Check code quality
pnpm run lint
pnpm run format:check

# Build for production
pnpm run build
```

## 📖 Documentation

- **CLAUDE.md**: Claude Code AI instructions
- **API documentation**: In-code JSDoc comments
- **Component documentation**: Storybook (add if needed)

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Check `.env.local` file exists
   - Verify variable names match exactly
   - Restart development server

2. **Database connection issues**
   - Verify Supabase URL and key
   - Check RLS policies
   - Ensure migrations are applied

3. **Stripe webhook issues**
   - Check webhook secret
   - Verify endpoint URL
   - Test with Stripe CLI

### Getting Help

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation
3. Check logs for error messages

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy coding!** 🎉
