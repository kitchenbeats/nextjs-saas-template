// Environment variable validation
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  
  return value;
}

// Stripe environment variables
export const STRIPE_SECRET_KEY = getEnv('STRIPE_SECRET_KEY');
export const STRIPE_WEBHOOK_SECRET = getEnv('STRIPE_WEBHOOK_SECRET');

// Supabase environment variables
export const SUPABASE_URL = getEnv('NEXT_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// App URL for callbacks
export const APP_URL = getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');