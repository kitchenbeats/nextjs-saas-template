// Environment variable validation with detailed error messages
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    console.error(
      `📝 Please check your .env.local file and ensure ${key} is set.`
    );
    console.error(`📖 See .env.example for reference.`);
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

// Validate environment variables at startup
export function validateEnvironment(): void {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ];

  const missingVars = requiredVars.filter(key => !process.env[key]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(key => console.error(`  - ${key}`));
    console.error('📝 Please check your .env.local file.');
    console.error('📖 See .env.example for reference.');
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }

  // Validate URL format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must start with https://');
  }

  // Validate Stripe key format
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey && !stripeKey.startsWith('sk_')) {
    throw new Error('STRIPE_SECRET_KEY must start with sk_');
  }

  console.log('✅ Environment variables validated successfully');
}

// Stripe environment variables
export const STRIPE_SECRET_KEY = getEnv('STRIPE_SECRET_KEY');
export const STRIPE_WEBHOOK_SECRET = getEnv('STRIPE_WEBHOOK_SECRET');

// Supabase environment variables
export const SUPABASE_URL = getEnv('NEXT_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// App URL for callbacks
export const APP_URL = getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
