import { cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';

/**
 * Data Access Layer for Authentication
 * Centralizes all authentication checks to prevent bypass vulnerabilities
 */

// Cache the auth check for the duration of a request
export const verifyAuth = cache(
  async (): Promise<{ user: User | null; error: string | null }> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data.user, error: null };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }
);

// Get user profile with authentication check
export const getUserProfile = cache(async (userId: string) => {
  const { user, error } = await verifyAuth();

  if (error || !user) {
    throw new Error('Authentication required');
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized access');
  }

  const supabase = await createClient();
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    throw new Error(`Profile fetch failed: ${profileError.message}`);
  }

  return profile;
});

// Get user subscription with authentication check
export const getUserSubscription = cache(async (userId: string) => {
  const { user, error } = await verifyAuth();

  if (error || !user) {
    throw new Error('Authentication required');
  }

  if (user.id !== userId) {
    throw new Error('Unauthorized access');
  }

  const supabase = await createClient();
  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (subscriptionError && subscriptionError.code !== 'PGRST116') {
    throw new Error(`Subscription fetch failed: ${subscriptionError.message}`);
  }

  return subscription;
});

// Check if user has specific feature access
export const checkFeatureAccess = cache(
  async (
    userId: string,
    feature: string,
    requestedValue: number | boolean | string = true
  ) => {
    const { user, error } = await verifyAuth();

    if (error || !user) {
      return false;
    }

    if (user.id !== userId) {
      return false;
    }

    try {
      const profile = await getUserProfile(userId);
      const userPlanId = profile?.active_plan || 'free';

      // Import the feature check logic here to avoid circular dependencies
      const { hasAccess } = await import('@/utils/stripe/config');
      return hasAccess(userPlanId, feature, requestedValue);
    } catch {
      return false;
    }
  }
);

// Admin-only data access
export const requireAdmin = cache(async () => {
  const { user, error } = await verifyAuth();

  if (error || !user) {
    throw new Error('Authentication required');
  }

  const supabase = await createClient();
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || profile.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return { user, profile };
});
