import { useQuery } from '@tanstack/react-query';
import { createClient } from '../supabase/client';
import { useUser } from '../providers/userProvider';

// Type definition for subscription data
export interface Subscription {
  id: string;
  user_id: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  price_id: string;
  plan_id: string;
  current_period_end: string;
  current_period_start: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

// Hook to get the current user's subscription (active or otherwise)
export function useSubscription() {
  const { user } = useUser();
  const supabase = createClient();
  
  return useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async (): Promise<Subscription | null> => {
      if (!user) return null;
      
      // Get all subscriptions for the user
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      // No subscriptions found
      if (!data || data.length === 0) {
        return null;
      }
      
      const subscription = data[0];
      
      // Check subscription status and handle appropriately
      switch (subscription.status) {
        case 'active':
        case 'trialing':
          // Valid subscription
          return subscription;
        
        case 'past_due':
        case 'unpaid':
          // Payment issues - could add notification logic here
          console.warn(`Subscription ${subscription.id} has payment issues`);
          return subscription;
        
        case 'canceled':
        case 'incomplete':
        case 'incomplete_expired':
          // Invalid subscription - but return it for UI handling
          return subscription;
        
        default:
          // Unknown status
          console.warn(`Unknown subscription status: ${subscription.status}`);
          return subscription;
      }
    },
    enabled: !!user,
  });
}