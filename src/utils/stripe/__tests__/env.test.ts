import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getEnv, validateEnvironment } from '../env';

describe('Environment Variables', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEnv', () => {
    it('returns environment variable value', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getEnv('TEST_VAR')).toBe('test-value');
    });

    it('returns default value when env var is not set', () => {
      delete process.env.TEST_VAR;
      expect(getEnv('TEST_VAR', 'default')).toBe('default');
    });

    it('throws error when required env var is missing', () => {
      delete process.env.TEST_VAR;
      expect(() => getEnv('TEST_VAR')).toThrow(
        'Missing environment variable: TEST_VAR'
      );
    });
  });

  describe('validateEnvironment', () => {
    it('passes validation with all required vars', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
      process.env.STRIPE_SECRET_KEY = 'sk_test_key';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';

      expect(() => validateEnvironment()).not.toThrow();
    });

    it('throws error for missing required vars', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;

      expect(() => validateEnvironment()).toThrow(
        'Missing environment variables'
      );
    });

    it('validates Supabase URL format', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://invalid-url';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
      process.env.STRIPE_SECRET_KEY = 'sk_test_key';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';

      expect(() => validateEnvironment()).toThrow(
        'NEXT_PUBLIC_SUPABASE_URL must start with https://'
      );
    });

    it('validates Stripe key format', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
      process.env.STRIPE_SECRET_KEY = 'invalid-key';
      process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test';

      expect(() => validateEnvironment()).toThrow(
        'STRIPE_SECRET_KEY must start with sk_'
      );
    });
  });
});
