# Themer

A Next.js application with Supabase authentication and Stripe subscriptions.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account and project
- Stripe account

### Environment Variables

Copy the `.env.example` file to `.env.local` and fill in the required environment variables:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_APP_URL`: Your app URL (for redirects)

### Database Setup

The application requires several tables in your Supabase database. Run the SQL migrations to set up the required tables:

```bash
npx supabase db push
```

Or manually execute the SQL in `supabase/migrations/20250429_initial_schema.sql`.

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

### Production Build

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## Features

- Next.js 15 App Router
- React 19
- Supabase Authentication
- TanStack Query for data fetching
- Stripe Subscriptions
- Feature Access Control

## Subscription System

The subscription system is designed to be flexible and reusable:

1. **Plans Configuration**: Defined in `src/config/plans.json`
2. **Feature Access Control**: Use the `FeatureGuard` component and `useFeature` hook
3. **Admin Panel**: Available at `/admin/plans` for syncing plans with Stripe
4. **Stripe Integration**: Webhooks, checkout, and customer portal

## Webhook Setup

For local development, use the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

In production, create a webhook endpoint in your Stripe dashboard pointing to `/api/stripe/webhook` with the following events:

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## License

MIT
