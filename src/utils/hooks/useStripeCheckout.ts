import { useState } from 'react';
import { useUser } from '../providers/userProvider';

export interface UseStripeCheckoutOptions {
  successUrl?: string;
  cancelUrl?: string;
  returnUrl?: string;
}

export interface UseStripeCheckoutResult {
  createCheckoutSession: (priceId: string) => Promise<string>;
  createBillingPortalSession: () => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useStripeCheckout(options: UseStripeCheckoutOptions = {}): UseStripeCheckoutResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  
  // Default URLs
  const defaultSuccessUrl = `${window.location.origin}/account?checkout=success`;
  const defaultCancelUrl = `${window.location.origin}/pricing?checkout=canceled`;
  const defaultReturnUrl = `${window.location.origin}/account`;
  
  // Create a checkout session for subscription
  const createCheckoutSession = async (priceId: string): Promise<string> => {
    if (!user) {
      throw new Error('User must be logged in to create a checkout session');
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: options.successUrl || defaultSuccessUrl,
          cancelUrl: options.cancelUrl || defaultCancelUrl,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      
      const { sessionUrl } = await response.json();
      
      if (!sessionUrl) {
        throw new Error('No session URL returned');
      }
      
      return sessionUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start checkout process';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create a billing portal session for managing subscription
  const createBillingPortalSession = async (): Promise<string> => {
    if (!user) {
      throw new Error('User must be logged in to create a billing portal session');
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnUrl: options.returnUrl || defaultReturnUrl,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create billing portal session');
      }
      
      const { sessionUrl } = await response.json();
      
      if (!sessionUrl) {
        throw new Error('No session URL returned');
      }
      
      return sessionUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access subscription management';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    createCheckoutSession,
    createBillingPortalSession,
    isLoading,
    error,
  };
}