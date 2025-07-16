# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- `npm run dev`: Start development server with turbopack
- `npm run build`: Build production-ready app
- `npm run start`: Run production build
- `npm run lint`: Run ESLint for code linting

## Project Architecture

This is a Next.js 15 App Router application with Supabase authentication and Stripe subscriptions.

### Key Technologies

- **Next.js 15** with App Router
- **React 19** with hooks and functional components
- **Supabase** for authentication and database
- **Stripe** for payment processing and subscriptions
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Core Architecture Components

#### Authentication & Database

- Supabase client configuration in `src/utils/supabase/`
- Authentication middleware in `src/app/middleware.ts`
- User provider and hooks in `src/utils/providers/userProvider.tsx`

#### Subscription System

- Plans defined in `src/config/plans.json` with free, pro, team, and enterprise tiers
- Feature-based access control using `FeatureGuard` component and `useFeature` hook
- Stripe integration in `src/utils/stripe/` with webhook handlers in `src/app/api/stripe/`
- Admin sync functionality at `/admin/plans` to sync plans with Stripe

#### Feature Access Control

- `FeatureGuard` component at `src/components/ui/FeatureGuard.tsx` provides declarative feature gating
- `useFeature` hook at `src/utils/hooks/useFeature.ts` for programmatic access checking
- Plans support different features like projects, templates, AI generation, export formats, team members

#### Directory Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components
- `src/utils/` - Utilities, hooks, and providers
- `src/config/` - Configuration files including plans.json
- `supabase/` - Database migrations and functions

#### API Routes

- `/api/stripe/` - Stripe webhook, checkout, and portal endpoints
- `/api/subscription/` - Subscription management endpoints
- `/api/admin/` - Admin functionality for syncing plans

## Environment Setup

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_APP_URL`: App URL for redirects

## Database

- Use `npx supabase db push` to apply migrations
- Initial schema in `supabase/migrations/20250429_initial_schema.sql`

## Development Workflow

- Use the `useFeature` hook to check feature access before rendering components
- Wrap premium features with `FeatureGuard` for automatic upgrade prompts
- All subscription plans are defined in `src/config/plans.json`
- Use TanStack Query for all data fetching operations

## Testing & Quality Assurance

- **Unit Testing**: Use Vitest with React Testing Library for component testing
- **E2E Testing**: Use Playwright for end-to-end testing
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks ensure code quality
- **Performance**: Monitor Web Vitals and use bundle analysis
- **Error Handling**: Use ErrorBoundary components and structured logging

## Performance & Monitoring

- **Bundle Analysis**: Use `pnpm run analyze` to analyze bundle size
- **Performance Monitoring**: Web Vitals tracking with `src/utils/monitoring/performance.ts`
- **Error Tracking**: Structured logging system in `src/utils/monitoring/logger.ts`
- **Load Testing**: Performance components with render time tracking

## Security Features

- **Security Headers**: CSP, HSTS, X-Frame-Options configured in middleware
- **Environment Validation**: Comprehensive validation in `src/utils/stripe/env.ts`
- **Data Access Layer**: Centralized auth checks in `src/utils/auth/dal.ts`
- **Input Sanitization**: Proper validation and sanitization throughout

## Code Style Guidelines

- **TypeScript**: Use strict typing with proper interfaces/types
- **Imports**: Use absolute imports with path aliases `@/*` for src directory
- **Component Structure**: Follow Next.js App Router conventions
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch for async operations
- **Styling**: Use Tailwind CSS for styling components
- **React**: Use React 19 features including hooks and functional components
- **ESLint**: Follow Next.js core-web-vitals and TypeScript rules
- **File Organization**: Keep related files in appropriate directories under src/
